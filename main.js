import HexSvg from "./src/HexSvg.js";
import { svgNode, svgGradient, deg2rad, uid } from "./src/Utils.js";
import HexagonifyElement from "./src/HexagonifyElement.js";
import HexagonifyGrid from "./src/HexagonifyGrid.js";

const fillCellsWithCords = (grid) => {
   grid.cells.forEach((cell, index) => {
     cell.el.Dom.el.innerHTML =
       cell.el.Dom.el.innerHTML +
       grid1.gridCords[index]._x +
       "," +
       grid1.gridCords[index]._y;
   });
 };
 
new HexagonifyElement(document.querySelector("#demo-01"), {
  size: 100,
  borderRadius: 10,
});
new HexagonifyElement(document.querySelector("#demo-02"), {
  size: 100,
  isFlatTop: true,
  borderRadius: 10,
});
const grid1 = new HexagonifyGrid(document.getElementById("demo-03"), {
  size: 100,
  gridGap: 1,
  borderRadius: 10,
  isFlatTop: true,
  columns: 3,
});
fillCellsWithCords(grid1);

const grid2 = new HexagonifyGrid(document.getElementById("demo-04"), {
  size: 100,
  gridGap: 1,
  borderRadius: 10,
  isFlatTop: false,
  columns: 3,
});
fillCellsWithCords(grid2);


