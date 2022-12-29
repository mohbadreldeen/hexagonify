
export default class HexCell {
    constructor( el, options ) {
        this.el = el;
        this.Dom ={
            el: el.Dom.el
        }

        this.options = Object.assign({
            x:0,
            y:0
        }, options);

        this.Dom.el.style.position = 'absolute';
    }
    updateCords(x, y) {
        this.options.x = x;
        this.options.y = y;
        this.Dom.el.style.top = this.options.y + 'px';
        this.Dom.el.style.left = this.options.x + 'px';
    }
}