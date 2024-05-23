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
function drawSquare(entry:gridEntry, canvas:HTMLCanvasElement, startX:number, startY:number, sideLength:number):void{
    // planning to have width and height be constant for now
    const context = canvas.getContext('2d');
    assert(context, "No context");
    const totalWidth = canvas.width;
    const totalHeight = canvas.height;
    //wipe the canvas to restart
    context.beginPath();
    context.fillStyle = entry.color;
    context.rect(startX,startY,100,100);
    context.fillRect(startX,startY,100,100);

    drawLetter(canvas, entry.letter, startX+sideLength/2, startY+sideLength/2);
    context.stroke();

}

function drawLetter(canvas: HTMLCanvasElement, letter: string, x: number, y: number) {
    const context = canvas.getContext('2d');
    assert(context, "No context");
    context.font = "30px Arial";
    context.fillStyle = "black";
    context.fillText(letter, x, y);
  }

/**
 * 
 * @param grid A grid of letters in word search
 * @param canvas A canvas object to mutate and draw on
 */
export function drawGrid(grid:Grid,canvas:HTMLCanvasElement):void{
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const padding = 100;

    canvas.width = screenWidth-2*padding;
    canvas.height = screenHeight-2*padding;

    const context = canvas.getContext('2d');
    assert(context, "No context");
    context.clearRect(0,0, canvas.width, canvas.height);
    const entryList:Array<Array<gridEntry>> = grid.currentState();
    
    const numColumns = grid.numColumns;
    const numRows = grid.numRows;
    const sideLength = 100;

    const totalGridWidth:number = numColumns*sideLength;
    const totalGridHeight:number = numRows*sideLength;

    const xOffset = (canvas.width - totalGridWidth)/2;
    const yOffset = (canvas.height - totalGridHeight)/2;

    let startx = xOffset;
    let starty = yOffset;

    console.log(entryList);
    for(const row of entryList){
        for(const entry of row){
            drawSquare(entry, canvas, startx, starty, sideLength);
            console.log("in here", entry);
            startx+=sideLength;
        }
        startx = xOffset;
        starty += sideLength;
    }
}