import {svgNode, uid, pointyTopPath, flatTopPath, hexWidth, hexHeight, svgGradient } from "./Utils";

/**
 * @typedef {Object} HexSvg
 * 
* @param {object} options
    * @property {number} [options.size=100]
    * @property {number} [options.borderRadius=0]
    * @property {boolean} [options.isFlatTop=false]
    * @property {boolean} [options.isMask=false]
    * @property {string} [options.fill="#000"]
    * @property {string} [options.stroke="#000"]
    * @property {number} [options.strokeWidth=0]
* @property {string} [id=uid()]
*
* 
* @description Creates a HexSvg object  
 * 
 */
export default class HexSvg {
    constructor(options) {
        this.options = Object.assign({
            size: 100,
            borderRadius: 0,
            isFlatTop: false,
            isMask: false,
            fill: "#000",
            stroke: "#000",
            strokeWidth: 0
        }, options);    
        
        this.id = uid();
        this.svg = null;

        this.init();
    }

    init() {
        let fill = '';
        let gradObj = null;
        let strokeGradObject = null;
        let stroke = '';
        let width = hexWidth(this.options.size, this.options.isFlatTop);
        let height = hexHeight(this.options.size, this.options.isFlatTop);
        if(!this.options.isMask) {
            if(typeof this.options.fill === 'object') {
                gradObj = svgGradient(this.options.fill, this.options.gradientAngle);
                fill = 'url(#gradient-' + gradObj.id + ')';
            } else {
                fill = this.options.fill;
            }

            if(typeof this.options.stroke === 'object') {
                strokeGradObject = this.svgGradient(this.options.stroke, this.options.strokeGradientAngle);
                stroke = 'url(#gradient-' + strokeGradObject.id + ')';
            } else {
                stroke = this.options.stroke;
            }
        }
        this.svg = svgNode("svg", {
            "preserveAspectRatio" : "xMidYMid meet",
            "viewBox"     : `0 0 ${width} ${height}`,
            "class"       : "svg",
            "stroke"      : stroke,
            "stroke-width": this.options.strokeWidth
        });
        this.path = svgNode("path");
        this.drawPath();

        this.path.setAttribute('fill', fill);
        if(this.options.isMask) {
            const defs = svgNode("defs");
            const clipPath = svgNode("clipPath", {
                id: `clip-mask-${this.id}`
            });
            clipPath.appendChild(this.path);
            defs.appendChild(clipPath);
            this.svg.appendChild(defs);
            this.svg.classList.add("svg-mask");
        }else {
            if(typeof this.options.fill === 'object'){
                this.svg.appendChild(gradObj.defs);
            }
            if(typeof this.options.stroke === 'object') {
                this.svg.appendChild(strokeGradObject.defs);
            }
            if(this.options.shadow){
                this.path.style.filter = `drop-shadow(${this.options.shadow})`;
            }
            this.svg.appendChild(this.path);
        }
    }
    drawPath() {
        const path = this.options.isFlatTop ?  flatTopPath(this.options.size, this.options.borderRadius) :  pointyTopPath(this.options.size, this.options.borderRadius);
        this.path.setAttribute('d', path);
    }
}