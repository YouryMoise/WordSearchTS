import { Canvas } from "canvas";
import { gridEntry } from "./GridADT.js";
import { Grid } from "./GridADT.js";
import assert from "assert";

/**
 * 
 * @param entry The letter and background color to draw at that point
 * @param canvas A canvas object to mutate and draw on
 * @param startX The x coordinate of the top left corner of the square
 * @param startY The y coordinate of the top left corner of the square
 */
function drawSquare(entry:gridEntry, canvas:HTMLCanvasElement, startX:number, startY:number):void{
    // planning to have width and height be constant for now
    const context = canvas.getContext('2d');
    assert(context, "No context");
    const totalWidth = canvas.width;
    const totalHeight = canvas.height;
    //wipe the canvas to restart
    context.clearRect(0,0,totalWidth,totalHeight);
    context.beginPath();
    context.rect(0,0,100,100);
    context.stroke();

}

/**
 * 
 * @param grid A grid of letters in word search
 * @param canvas A canvas object to mutate and draw on
 */
export function drawGrid(grid:Grid,canvas:HTMLCanvasElement):void{
    drawSquare({letter:'l', color:0}, canvas, 0,0);
}