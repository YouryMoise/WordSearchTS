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
const DEFAULT:string = `0|vbreefishrachp\n1|anacrocodileeb\n2|aostrichtegrda\n3|iaddhcheetahgd\n4|bhrodraveneneg\n5|eywdlsamolelhe\n6|artpvprcbolror\n7|rhtoaahcrowagh\n8|ccannoriazebra\n9|hanytaekninawa\nWord Bank: fish\nbat\ncrocodile\nhedgehog\naardvark\nostrich\nbadger\ndolphin\ncheetah\nbear\nraven\neel\nmole\npony\nant\ncrow\nzebra\n`

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
    const inputStarterText:string = "Enter a parsable puzzle string or leave blank to use default puzzle";


    // const clientADT:ClientADT = new ClientADT();
    let grid:Grid;
    console.log("running main");



    // output area for printing
    // const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // outputArea.textContent = instructions;
    // canvas for drawing
    const body:HTMLBodyElement = document.getElementById('body') as HTMLBodyElement ?? assert.fail('missing drawing canvas');
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement ?? assert.fail('missing drawing canvas');
    const autoFillButton = document.getElementById('autofill') as HTMLButtonElement ?? assert.fail("missing button");
    const nextStepButton = document.getElementById('nextStep') as HTMLButtonElement ?? assert.fail("missing button");
    const previousStepButton = document.getElementById('previousStep') as HTMLButtonElement ?? assert.fail("missing button");
    const submitInputButton = document.getElementById('submitButton') as HTMLButtonElement ?? assert.fail("missing button");

    const inputBox = document.getElementById('userInput') as HTMLInputElement ?? assert.fail("missing input");
    inputBox.value = inputStarterText;
    
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
    submitInputButton.addEventListener("click", (event:MouseEvent)=>{
        const newPuzzle:string = inputBox.value === "" ? DEFAULT : inputBox.value;
        
        try{
            grid = parseFromText(newPuzzle);
        }catch{
            alert(`Unable to parse input ${inputBox.value}`);
        }
        drawGrid(grid, canvas);

    });
    inputBox.addEventListener("keydown", (event:KeyboardEvent)=>{
        if(event.key === "Enter"){
            const newPuzzle:string = inputBox.value === "" ? DEFAULT : inputBox.value;
        
        try{
            grid = parseFromText(newPuzzle);
        }catch{
            alert(`Unable to parse input ${inputBox.value}`);
        }
        drawGrid(grid, canvas);
        }
    })
    inputBox.addEventListener("click", ()=>{
        if(inputBox.value === inputStarterText) inputBox.value = "";
    })

    
    
    body.addEventListener("keydown", (event:KeyboardEvent)=>{
        // alert(event.key);
        const tagName = (event.target as HTMLElement).tagName;
        if(tagName !== "INPUT"){
        if(event.key === "ArrowRight"){
            // alert("hello")
            grid.solveStep();
            drawGrid(grid, canvas);
        }
        else if(event.key === "ArrowLeft"){
            grid.unsolveStep();
            drawGrid(grid, canvas);
        }
        else if(event.key === "a"){
            autoFill(grid, canvas);
        }
    }
    })
    // drawPuzzle(canvas, clientADT.toString());
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const padding = 100;

    canvas.width = screenWidth/2;
    canvas.height = screenHeight-2*padding;

    // drawGrid(grid, canvas);
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
