import HexSvg from "./HexSvg";
import {hexWidth, hexHeight} from "./Utils";

export default class HexagonifyElement {
    constructor(el, options) {
        this.options = Object.assign({
            size: 100,
            borderRadius: 0,
            isFlatTop: false
        }, options);    

       this.Dom = {
            el: el,
       }
       this.init();
    }

    init() {
        this.Dom.el.classList.add("hexagonify-element");
        let mask = new HexSvg({
            size: this.options.size,
            borderRadius: this.options.borderRadius,
            isFlatTop: this.options.isFlatTop,
            isMask: true
        });
        
        this.Dom.el.appendChild(mask.svg);
        const maskSelector = `#clip-mask-${mask.id}`;
        const width = hexWidth(this.options.size, this.options.isFlatTop);
        const height = hexHeight(this.options.size, this.options.isFlatTop);
        this.Dom.el.style.width = width + "px";
        this.Dom.el.style.height = height + "px";
        this.Dom.el.style.clipPath =  `url(${maskSelector})`;
    }
   
}