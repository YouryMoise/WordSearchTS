import { Grid } from './GridADT.js';
import { drawGrid } from './Draw.js';
import { parseFromText } from './GridADT.js';
/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This code is loaded into starb-client.html, see the `npm compile` and
//   `npm watch-client` scripts.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser.

import assert from 'assert';

/**
 * Puzzle to request and play.
 * Project instructions: this constant is a [for now] requirement in the project spec.
 */
const PUZZLE: string = "kd-1-1-1";
const GRIDTEXT:string = `0 | hi\n1 | he\nWord Bank: hi\nhe\n`;
const REALEXAMPLE:string = `0|vbreefishrachp\n1|anacrocodileeb\n2|aostrichtegrda\n3|iaddhcheetahgd\n4|bhrodraveneneg\n5|eywdlsamolelhe\n6|artpvprcbolror\n7|rhtoaahcrowagh\n8|ccannoriazebra\n9|hanytaekninawa\nWord Bank: fish\nbat\ncrocodile\nhedgehog\naardvark\nostrich\nbadger\ndolphin\ncheetah\nbear\nraven\neel\nmole\npony\nant\ncrow\nzebra\n`

/**
 * runs the star battle game
 */
// async function autoFill(grid:Grid, counter:number){
//     if(counter === 20) return;
//     grid.solveStep();
//     setTimeout(()=>autoFill(grid, counter+1), 0)

// }
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
async function autoFill(grid:Grid, canvas:HTMLCanvasElement){
    while(!grid.isSolved()){
        grid.solveStep();
        drawGrid(grid, canvas);
        await delay(100);
    }
}
async function main(): Promise<void> {
    const instructions:string = `Welcome to Star Puzzle!
Click on a square to add or remove a star.
The objective of this game is to fill the grid with 20 stars such that every row, column, and region (outlined in bold lines) has exactly 2 stars and no
stars are adjacent horizontally, vertically, or diagonally.`;

    // const clientADT:ClientADT = new ClientADT();
    const grid:Grid = parseFromText(REALEXAMPLE);
    console.log("running main");



    // output area for printing
    // const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // outputArea.textContent = instructions;
    // canvas for drawing
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement ?? assert.fail('missing drawing canvas');
    const autoFillButton = document.getElementById('autofill') as HTMLButtonElement ?? assert.fail("missing button");
    const nextStepButton = document.getElementById('nextStep') as HTMLButtonElement ?? assert.fail("missing button");
    const previousStepButton = document.getElementById('previousStep') as HTMLButtonElement ?? assert.fail("missing button");
    autoFillButton.addEventListener("click", (event:MouseEvent)=>{
        autoFill(grid, canvas);
    });
    nextStepButton.addEventListener("click", (event:MouseEvent)=>{
        grid.solveStep();
        drawGrid(grid, canvas);
    });
    previousStepButton.addEventListener("click", (event:MouseEvent)=>{
        grid.unsolveStep();
        drawGrid(grid, canvas);

    });
    // drawPuzzle(canvas, clientADT.toString());


    drawGrid(grid, canvas);
    // autoFill(grid, canvas);

    

    // when the user clicks on the drawing canvas...
    canvas.addEventListener('click', (event: MouseEvent) => {
        console.log("Hello");
        // grid.solveStep();
        // drawGrid(grid, canvas);
        // const rowCol = mouseCoordToRowCol(canvas, event.x, event.y);
        // const row = rowCol.row-1;
        // const col = rowCol.col-1;
        // clientADT.updatePuzzle(row, col);
        // drawPuzzle(canvas, clientADT.toString());
        // if (clientADT.solvedStatus()){
        //     console.log("the puzzle is solved");
        //     outputArea.textContent += "\n\nThe puzzle is solved! Congratulations!";

        // }else{
        //     outputArea.textContent = instructions;
        // }


    });

}
/**
 * @param canvas Canvas on which the mouse is clicking
 * @param x The x coordinate of the mouse's clicking
 * @param y The y coordinate of the mouse's clicking
 * @returns A {row, column} where row is which corresponding row the mouse is clicking on and column is the corresponding column the mouse is clicking on in the grid.
 */
function mouseCoordToRowCol(canvas:HTMLCanvasElement, x:number, y:number):{row:number, col:number}{
    const totalWidth = canvas.width;
    const totalHeight = canvas.height;
    const row = Math.floor(y/totalHeight*10);
    const col = Math.floor(x/totalWidth*10);
    return {row:row, col:col};
}

main();
