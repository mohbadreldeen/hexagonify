import HexSvg from "./src/HexSvg.js";
import { svgNode, svgGradient, deg2rad, uid } from "./src/Utils.js";
import HexagonifyElement from "./src/HexagonifyElement.js";
import HexagonifyGrid from "./src/HexagonifyGrid.js";

const fillCellsWithCords = (grid) => {
   grid.cells.forEach((cell, index) => {
     cell.el.Dom.el.innerHTML =
       cell.el.Dom.el.innerHTML +
       grid.gridCords[index]._x +
       "," +
       grid.gridCords[index]._y;
   });
 };
 
new HexagonifyElement(document.querySelector("#demo-01"), {
  size: 100,
  borderRadius: 10,
  contentSelector: '.hex-content',
  strokeElement: {
      size: 10,
     
      fill: '#ea698b'
  }
  
});
new HexagonifyElement(document.querySelector("#demo-02"), {
  size: 100,
  isFlatTop: false,
  borderRadius: 10,
});
new HexagonifyElement(document.querySelector("#demo-01-1"), {
  size: 100,
  isFlatTop: false,
  borderRadius: 0
});

const grid1 = new HexagonifyGrid(document.getElementById("demo-03"), {
  size: 100,
  gridGap: 1,
  borderRadius: 10,
  isFlatTop: true,
  columns: 4,
});
fillCellsWithCords(grid1);

const grid2 = new HexagonifyGrid(document.getElementById("demo-04"), {
  size: 100,
  gridGap: 1,
  borderRadius: 10,
  isFlatTop: false,
  columns: 4
});
fillCellsWithCords(grid2);

const grid3 = new HexagonifyGrid(document.getElementById("demo-05"), {
  size: 100,
  gridGap: 1,
  borderRadius: 10,
  isFlatTop: false,
  columns: 3,
  layouter: 'circularLayouter'
});
console.log(grid3);
fillCellsWithCords(grid3);




