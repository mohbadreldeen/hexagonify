import HexSvg from './src/HexSvg.js';
import {svgNode,svgGradient,  deg2rad, uid} from './src/Utils.js';
import HexagonifyElement from './src/HexagonifyElement.js';
 
 
 


new HexagonifyElement(document.querySelector('.shape-pointed-top'),{
   size: 100,
   borderRadius: 10
});
new HexagonifyElement(document.querySelector('.shape-flat-top'),{
   size: 100,
   isFlatTop:true,
   borderRadius: 10
});
 
 
