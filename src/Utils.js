const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

const svgNode = (name, properties) => {
    let node = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var p in properties){
      node.setAttributeNS(null, p, properties[p]);
    }
    return node;
}

const deg2rad = deg => { return deg * Math.PI / 180; }

const uid = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(6,2);;
  return dateString + randomness;  
}

const hexWidth = (size, isFlatTop) => { return (isFlatTop)? size * 2 :  size * Math.sqrt(3); }
 
const hexSizeByWidth = (width, isFlatTop) => { return (isFlatTop) ? width / 2 : width / Math.sqrt(3); }

const hexHeight = (size, isFlatTop) => { return (isFlatTop) ? size * Math.sqrt(3) : size * 2; }

const hexSizeByHeight = (height, isFlatTop) => { return (isFlatTop) ? height / Math.sqrt(3) : height / 2; }

const addStyles = (node, styles) => { for (let s in styles) { node.style[s] = styles[s]; } }
 
const isOdd = (num) => { return num/2 > Math.floor(num/2) }

const isEven = (num) => { return num/2 === Math.floor(num/2) }

const pointyTopPath = (size, borderRadius) => {
  const width = size * Math.sqrt(3);
  const height = size * 2;
  const a    = size / 2;
  const b    = width / 2;
  const br   = borderRadius  ;
  const brx  = br * Math.cos(deg2rad(30));
  const bry  = br * Math.sin(deg2rad(30));
  return `M${b - brx},${bry}
          ${br?`Q${b},${0} ${b + brx},${0 + bry}`:``}
          L${width - brx},${a - bry}
          ${br?`Q${width},${a} ${width},${a + br}`:``}
          L${width},${a + size - br}
          ${br?`Q${width},${a + size} ${width - brx},${a + size  + bry}`:``}
          L${b + brx},${2 * size - bry}
          ${br?`Q${b},${height} ${b - brx},${height - bry}`:``}
          L${0 + brx},${a + size + bry}
          ${br?`Q${0},${a + size} ${0},${a + size - br}`:``}
          L${0},${a + br}
          ${br?`Q${0},${a } ${0 + brx},${a - bry}`:``}
          Z`.replace(/(\n)/g," ").replace(/  +/g, '');
}

const flatTopPath = (size, borderRadius) => {
  const br   = borderRadius ;
  const width = size * 2;
  const height = size * Math.sqrt(3);
  const a    = size / 2;;
  const b    = height / 2;
  const brx  = br * Math.cos(deg2rad(60) );
  const bry  = br * Math.sin(deg2rad(60) );
  return `M${a  - brx },${br }
          ${br?`Q${a},${0 } ${a + br },${0}`:``}
          L${a + size - br},${0}
          ${br?`Q${a + size },${0 } ${a + size + brx },${bry}`:``}
          L${width - brx },${b - br }
          ${br?`Q${width },${b } ${width - brx },${ b + br }`:``}  
          L${a + size + brx },${height - bry }, 
          ${br?`Q${a + size },${height } ${a + size - br },${ height }`:``} 
          L${a + br},${height },
          ${br?`Q${a},${height } ${a  - brx },${ height - bry}`:``} 
          L${brx},${b + bry },
          ${br?`Q${0 },${b } ${brx },${ b - bry }`:``} 
          Z`.replace(/(\n)/g," ").replace(/  +/g,'');
}
/**
 * 
 * @param {array} stops 
 * @param {Degry} gradientAngle 
 * @returns {Object} {defs, id} 
 * 
 * Input example: 
 * stops = [
 *    {offset: "0%", color: "red"},
 *    {offset: "100%", color: "blue"}
 *  ]
 *  gradientAngle = 45
 *
 */
const svgGradient = (stops, gradientAngle) => {
  const id = uid();
  const defs = svgNode("defs");
  const angle = gradientAngle ? gradientAngle : 0;
  var anglePI = (angle) * (Math.PI / 180);
  var gradientAttr = {
      id: `gradient-${id}`,
      'x1': Math.round(50 + Math.sin(anglePI) * 50) + '%',
      'y1': Math.round(50 + Math.cos(anglePI) * 50) + '%',
      'x2': Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
      'y2': Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%',
  }
  const gradient = svgNode("linearGradient", gradientAttr);
 
  stops.forEach((stop) => {
      gradient.appendChild(
          svgNode("stop", {
              offset: stop.offset,
              "stop-color": stop.color,
              "stop-opacity": stop.opacity ? stop.opacity : 1
          })
      );
  });
  defs.appendChild(gradient);

  return {
      id: id,
      defs: defs
  }
}

export {map , svgNode, deg2rad, uid, hexWidth, hexSizeByWidth, hexHeight, hexSizeByHeight, addStyles, isOdd, isEven, pointyTopPath, flatTopPath, svgGradient};