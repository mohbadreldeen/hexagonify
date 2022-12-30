import { deg2rad, hexWidth, hexHeight, isEven, isOdd } from "./Utils";

const hexCubGridRadius = (itemsCount) => {
    let radius = 0;
    let i = 0;
    while (i < itemsCount) {
        radius++;
        i += (radius * 6);
    }
    
    if (i - (radius * 6) + 1 < itemsCount)
        radius++;
    return radius;
}

function HexCubCell(x, y, z){
    this._x = x;
    this._y = y;
    this._z = z;
}

function HexOffsetCell(x, y){
    this._x = x;
    this._y = y;
}

const getOffsetGridCords = (rowCount, colCount) => {
    let grid = [];
    let x = 0;
    let y = 0;
    for (let i = 0; i < rowCount; i++) {
        let row = [];
        for (let j = 0; j < colCount; j++) {
            grid.push(new HexOffsetCell(x, y));
            x++;
        }
       
        y++;
        x = 0;
    }
    return grid;
}

const oddr_offset_to_pixel = (cell, size ) => {
    let x = size * Math.sqrt(3) * (cell._x + 0.5 * (cell._y&1));
    let y = size * 3/2 * cell._y;
    return [x, y];
}

const evenr_offset_to_pixel = (cell, size ) => {
    let x = size * Math.sqrt(3) * (cell._x - 0.5 * (cell._y&1));
    let y = size * 3/2 * cell._y;
    return [x, y];
}

function oddq_offset_to_pixel(cell, size){
    let x = size * 3/2 * cell._x;
    let y = size * Math.sqrt(3) * (cell._y + 0.5 * (cell._x&1));
    return [x, y];
}

function evenq_offset_to_pixel(cell, size){
    let x = size * 3/2 * cell._x;
    let y = size * Math.sqrt(3) * (cell._y - 0.5 * (cell._x&1));
    return [x, y];
}

const pointedTopLayouter = (items, grid, options) => {
    const size = options.hexSize + options.gridGap;
    const columns = options.columns;
    const rows = Math.floor(items.length / columns) + 1;
    const itemHeight = hexHeight(size, false);
    const gridArray = getOffsetGridCords(rows, columns);
   
    for (let i = 0; i < gridArray.length; i++) {
        const cords = oddr_offset_to_pixel(gridArray[i], size);
        if(items[i]) {
           
            items[i].el.querySelector('.hex-content').innerHTML = `${gridArray[i]._x} , ${gridArray[i]._y}`;
            items[i].updateCords(cords[0] + itemHeight / 2  , cords[1]);
        }
    }
};

const offsetLayouter = (items, options) => {
    const size = options.size + options.gridGap;
    const columns = options.columns;
    const rows = Math.floor(items.length / columns) + 1;
    const itemHeight = hexHeight(size, options.isFlatTop);
    const itemWidth = hexWidth(size, options.isFlatTop);
    const gridArray = getOffsetGridCords(rows, columns);
    const gridOffsetX = 0;
    const gridOffsetY = 0;

    for (let i = 0; i < gridArray.length; i++) {
        // const cords = oddr_offset_to_pixel(gridArray[i], size);

        let cords = [0 ,0];
        let offset = {x: 0, y: 0};
        if(options.isFlatTop && options.shoveOdd) {
            cords = oddq_offset_to_pixel(gridArray[i], size);
        }
        if(options.isFlatTop && !options.shoveOdd) {
            cords = evenq_offset_to_pixel(gridArray[i], size);
            offset = {x: 0, y: itemHeight / 2};
        }
        if(!options.isFlatTop && options.shoveOdd) {
             cords = oddr_offset_to_pixel(gridArray[i], size);
        }
        if(!options.isFlatTop && !options.shoveOdd) {
            cords = evenr_offset_to_pixel(gridArray[i], size);
            offset = {x: itemWidth / 2, y: 0};
        }
        if(items[i]) {
            // items[i].el.querySelector('.hex-content').innerHTML = `${gridArray[i]._x} , ${gridArray[i]._y}`;
            items[i].updateCords(cords[0] + offset.x + gridOffsetX  , cords[1] + offset.y + gridOffsetY);
        }
    }
    return gridArray;
}


const getGridCoordinates = (radius) =>  {
    let gridArray = [];
    for(var i = 0; i < radius; i++){
        for(var j = -i; j <= i; j++)
        for(var k = -i; k <= i; k++)
        for(var l = -i; l <= i; l++)
            if(Math.abs(j) + Math.abs(k) + Math.abs(l) == i*2 && j + k + l == 0){
                gridArray.push(new HexCubCell(j, k, l));
            }
    }
    return gridArray;
}


const circularLayouter = (items, options) => {
    const size = options.size + options.gridGap;
    const itemHeight = hexHeight(size, options.flatTop);
    const itemWidth = hexWidth(size, options.flatTop);
    

    const gridSize = getCircularLayoutSize(items.length, size, options.flatTop);
     
    const centerX = gridSize.width / 2 - itemWidth / 2;
    const centerY = gridSize.height / 2 - itemHeight / 2;
   
    const gridCords = getGridCoordinates( hexCubGridRadius(items.length) );

    
    for (let i = 0; i < gridCords.length; i++) {
        const [x, y, z] = [gridCords[i]._x, gridCords[i]._y, gridCords[i]._z];
        let [posX , posY] = [0 , 0];
        if(options.isFlatTop) {
            [posX , posY] =[
                1.5 * x * size,
                size * (Math.sqrt(3)/2 * x  +  Math.sqrt(3) * y)
            ];
        } else {
            [posX , posY] =[
                size * (Math.sqrt(3) * x  +  Math.sqrt(3)/2 * y),
                1.5 * y * size
            ];
        }
        if(items[i]) {
            
            
            items[i].updateCords(posX + centerX  , posY + centerY);
        }
    }

    return gridCords;
}

const gridOffsetSize = (items, options) => {
    const {size, columns, isFlatTop} = options;
    const cellSize = size + options.gridGap;
    const rows = Math.ceil(items.length / columns) ;
    if(isFlatTop) {
        return {
            width: ( (columns * 0.75) + 0.25) * hexWidth(cellSize, isFlatTop), 
            height: (rows + 0.5) * hexHeight(cellSize, isFlatTop)
        }
    }else {
        return {
            width: (columns + 0.5) * hexWidth(cellSize, isFlatTop), 
            height: ((rows * 0.75) + 0.25) * hexHeight(cellSize, isFlatTop)
        }
    }
}


const getCircularLayoutSize = (itemsCount, cellSize, isFlatTop) => {
    const radius = hexCubGridRadius(itemsCount);
    const width = (radius - 1) * 2 + 1;
    
    if(isFlatTop) {
        return {
            width: hexWidth(cellSize, isFlatTop) * width,
            height: width *  1.5 * hexHeight(cellSize, isFlatTop)
        }

    } else {
        return {
            width: hexWidth(cellSize, isFlatTop) * width,
            height: ((width * 0.75) + 0.25) * hexHeight(cellSize, isFlatTop)
        }
    }
}

export {/* flatTopLayouter, */ pointedTopLayouter, circularLayouter, offsetLayouter, gridOffsetSize, getCircularLayoutSize}