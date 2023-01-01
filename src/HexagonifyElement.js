 
import HexSvg from "./HexSvg";
import {hexWidth, hexHeight, hexSizeByWidth } from "./Utils";

export default class HexagonifyElement {
    constructor(el, options) {
        this.options = Object.assign({
            size: 100,
            borderRadius: 0,
            isFlatTop: false,
            maskSelector: null,
            conentSelector: null,
        }, options);    

       this.Dom = {
            el: el,
       }
       this.init();
    }

    init() {
        this.Dom.el.classList.add("hexagonify-element");
        let maskSelector = this.options.maskSelector;
        if(!maskSelector) {
            let mask = new HexSvg({
                size: this.options.size,
                borderRadius: this.options.borderRadius,
                isFlatTop: this.options.isFlatTop,
                isMask: true
            });
            this.Dom.el.appendChild(mask.svg);
            maskSelector = `#clip-mask-${mask.id}`;
        }

        const width = hexWidth(this.options.size, this.options.isFlatTop);
        const height = hexHeight(this.options.size, this.options.isFlatTop);
        this.Dom.el.style.width = width + "px";
        this.Dom.el.style.height = height + "px";
        console.log(this.options.contentSelector);
        if(this.options.contentSelector) {
        
            let content = this.Dom.el.querySelector(this.options.contentSelector);
            content.style.clipPath =  `url(${maskSelector})`;
        } else {
            this.Dom.el.style.clipPath =  `url(${maskSelector})`;
        }

        if(this.options.strokeElement) {
            this.applyStroke();
        }
    }
    
    applyStroke() {
        this.Dom.el.style.overflow = "visible";
        const strokeSize = this.options.strokeElement.size || 1;
        const strokeRadius = this.options.strokeElement.borderRadius || this.options.borderRadius;
        // console.log(strokeRadius)
        const strokeColor = this.options.strokeElement.fill || "#000";

        let parentWidth = hexWidth(this.options.size, this.options.isFlatTop);
        let parentHeight = hexHeight(this.options.size, this.options.isFlatTop);
        let strokeElementSize = hexSizeByWidth(parentWidth + strokeSize  * 2, this.options.isFlatTop);
        
        let svg = new HexSvg({
            size: strokeElementSize,
            borderRadius: strokeRadius,
            isFlatTop: this.options.isFlatTop,
        });


        const strokeElementWidth = hexWidth(strokeElementSize, this.options.isFlatTop) ;
        const strokeElementHeight = hexHeight(strokeElementSize, this.options.isFlatTop)
        const strokeTop = strokeElementHeight/2 - parentHeight/2;
        const strokeLeft = strokeElementWidth/2 - parentWidth/2;

        svg.svg.style.position = 'absolute';
        svg.svg.style.width = strokeElementWidth + "px";
        svg.svg.style.height = strokeElementHeight + "px";
        svg.svg.style.zIndex = 1;
        svg.svg.style.top = -strokeTop+ "px";
        svg.svg.style.left = -strokeLeft + "px";
        svg.svg.querySelector('path').style.fill = strokeColor;

        this.Dom.el.appendChild(svg.svg);

    }
}