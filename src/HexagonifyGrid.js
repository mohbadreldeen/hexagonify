
import HexagonifyElement from "./HexagonifyElement";
import HexCell from "./HexCell";
import {offsetLayouter, gridOffsetSize } from "./GridLayouters";

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
        }, options); 
        this.cells = [];
        this.Dom.el.style.position = 'relative';
        this.init();
    }

    init() {
        const cells = this.Dom.el.querySelectorAll(this.options.cellSeletor);
         
        cells.forEach((cell, index) => {
           let hexEl = new HexagonifyElement(cell, {
                size: this.options.size,
                isFlatTop: this.options.isFlatTop,
                borderRadius: this.options.borderRadius
             }); 
              
             this.cells.push( new HexCell(hexEl, {}));
        }); 

        this.gridCords = offsetLayouter(this.cells,this.options);
        const gridSize = gridOffsetSize(this.cells, this.options);
        this.Dom.el.style.width = gridSize.width + 'px';
        this.Dom.el.style.height = gridSize.height + 'px';
    }
 
}