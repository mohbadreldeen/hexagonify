import {map , svgNode, deg2rad, uid, hexWidth, hexSizeByWidth, hexHeight, hexSizeByHeight, addStyles, isOdd, isEven, pointyTopPath, flatTopPath} from '../src/Utils.js';
import {it, expect} from 'vitest';
 
it('map', () => {
    expect(map(5, 0, 10, 0, 100)).toBe(50);
    expect(map(5, 0, 10, 0, 100)).not.toBe(51);
    expect(map(5, 0, 10, 0, 100)).not.toBe(49);
});

it('svgNode', () => {
    const node = svgNode('rect', {x: 0, y: 0, width: 100, height: 100});
    expect(node.nodeName).toBe('RECT');
    expect(node.getAttribute('x')).toBe('0');
    expect(node.getAttribute('y')).toBe('0');
    expect(node.getAttribute('width')).toBe('100');
    expect(node.getAttribute('height')).toBe('100');
});

it('deg2rad', () => {
    expect(deg2rad(0)).toBe(0);
    expect(deg2rad(90)).toBe(Math.PI/2);
    expect(deg2rad(180)).toBe(Math.PI);
    expect(deg2rad(360)).toBe(Math.PI*2);
});

it('Should return unique id of 12 char length', () => {
    const id = uid();
    expect(id.length).toBe(12);
    expect(id).not.toBe(uid());
});

it('hexWidth', () => {
    const size = 10;
    const isFlatTop = true;
    expect(hexWidth(size, isFlatTop)).toBe(size * 2);
    expect(hexWidth(size, !isFlatTop)).toBe(size * Math.sqrt(3));
});

it('hexSizeByWidth', () => {
    const width = 10;
    const isFlatTop = true;
    expect(hexSizeByWidth(width, isFlatTop)).toBe(width / 2);
    expect(hexSizeByWidth(width, !isFlatTop)).toBe(width / Math.sqrt(3));
});

it('hexHeight', () => {
    const size = 10;
    const isFlatTop = true;
    expect(hexHeight(size, isFlatTop)).toBe(size * Math.sqrt(3));
    expect(hexHeight(size, !isFlatTop)).toBe(size * 2);
});

it('hexSizeByHeight', () => {
    const height = 10;
    const isFlatTop = true;
    expect(hexSizeByHeight(height, isFlatTop)).toBe(height / Math.sqrt(3));
    expect(hexSizeByHeight(height, !isFlatTop)).toBe(height / 2);
});

it('addStyles', () => {
    const node = document.createElement('div');
    const styles = {color: 'red', backgroundColor: 'blue'};
    addStyles(node, styles);
    expect(node.style.color).toBe('red');
    expect(node.style.backgroundColor).toBe('blue');
});

it('isOdd', () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(4)).toBe(false);
});

it('isEven', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isEven(4)).toBe(true);
});

it('Should return pointed top hexagonal path with 0 border radius ', () => {
    const size = 100;
    const borderRadius = 0;
    const path = pointyTopPath(size, borderRadius);
    expect(path).toBe('M86.60254037844386,0L173.20508075688772,50L173.20508075688772,150L86.60254037844386,200L0,150L0,50Z');
});

it('Should return pointed top hexagonal path with 10 border radius ', () => {
    const size = 100;
    const borderRadius = 10;
    const path = pointyTopPath(size, borderRadius);
    expect(path).toBe('M77.94228634059948,4.999999999999999Q86.60254037844386,0 95.26279441628824,4.999999999999999L164.54482671904333,45Q173.20508075688772,50 173.20508075688772,60L173.20508075688772,140Q173.20508075688772,150 164.54482671904333,155L95.26279441628824,195Q86.60254037844386,200 77.94228634059948,195L8.660254037844387,155Q0,150 0,140L0,60Q0,50 8.660254037844387,45Z');
});
it('Should return flat top hexagonal path with 0 border radius ', () => {
    const size = 100;
    const borderRadius = 0;
    const path = flatTopPath(size, borderRadius);
    expect(path).toBe('M50,0L150,0L200,86.60254037844386L150,173.20508075688772,L50,173.20508075688772,L0,86.60254037844386,Z');
});

it('Should return flat top hexagonal path with 10 border radius ', () => {
    const size = 100;
    const borderRadius = 10;
    const path = flatTopPath(size, borderRadius);
    expect(path).toBe('M45,10Q50,0 60,0L140,0Q150,0 155,8.660254037844386L195,76.60254037844386Q200,86.60254037844386 195,96.60254037844386L155,164.54482671904333,Q150,173.20508075688772 140,173.20508075688772L60,173.20508075688772,Q50,173.20508075688772 45,164.54482671904333L5.000000000000001,95.26279441628824,Q0,86.60254037844386 5.000000000000001,77.94228634059948Z');
});

 