import HexagonifyElement from "./HexagonifyElement";
import HexCell from "./HexCell";
import {offsetLayouter, gridOffsetSize, circularLayouter, getCircularLayoutSize  } from "./GridLayouters";
import HexSvg from "./HexSvg";

export default class HexagonifGrid {
    constructor (el, options) {
       this.Dom = {
            el: el,
       }
       this.options = Object.assign({
            size: 100,
            borderRadius: 0,
            isFlatTop: false,
            cellSeletor: '.hex-cell',
            gridGap: 0,
            columns: 4,
            layouter: 'offsetLayouter'
        }, options); 

        this.layouters = {
            'offsetLayouter' : offsetLayouter,
            'circularLayouter' : circularLayouter
        }
        
        this.cells = [];
        this.Dom.el.style.position = 'relative';
        this.init();
    }

    init() {
        const cells = this.Dom.el.querySelectorAll(this.options.cellSeletor);
         

        let mask = new HexSvg({
            size: this.options.size,
            borderRadius: this.options.borderRadius,
            isFlatTop: this.options.isFlatTop,
            isMask: true
        });
        this.Dom.el.appendChild(mask.svg);
        const maskSelector = `#clip-mask-${mask.id}`;

        cells.forEach((cell, index) => {
           let hexEl = new HexagonifyElement(cell, {
                size: this.options.size,
                isFlatTop: this.options.isFlatTop,
                borderRadius: this.options.borderRadius,
                maskSelector: maskSelector
             }); 
              
             this.cells.push( new HexCell(hexEl, {}));
        }); 

        if(this.layouters[this.options.layouter]) {
            const layouter = this.layouters[this.options.layouter];
            this.gridCords = layouter(this.cells,this.options);
        } else {
            this.gridCords = offsetLayouter(this.cells, this.options);
        }
        
        let gridSize = {};
        if(this.options.layouter === 'offsetLayouter') 
            gridSize = gridOffsetSize(this.cells, this.options);
        else if(this.options.layouter === 'circularLayouter') {
            gridSize = getCircularLayoutSize(this.cells.length, this.options.size +  this.options.gridGap, this.options.isFlatTop)
            
        }
        this.Dom.el.style.width = gridSize.width + 'px';
        this.Dom.el.style.height = gridSize.height + 'px';
    }
 
}