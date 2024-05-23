/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

// This code is loaded into example-page.html, see the `npm watch-example` script.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser.

import assert from 'assert';

const BOX_SIZE = 16;

// categorical colors from
// https://github.com/d3/d3-scale-chromatic/tree/v2.0.0#schemeCategory10
const COLORS: Array<string> = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
];

// semitransparent versions of those colors
const BACKGROUNDS = COLORS.map( (color) => color + '60' );

/**
 * Draw the initial empty puzzle component
 * @param depending on what adt or data it has access to
 */
function setUpPuzzle(canvas: HTMLCanvasElement): void{
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');

    drawGrid(canvas)
    drawRegions(canvas)
}

/**
 * Draw an empty puzzle grid
 *
 */
function drawGrid(canvas: HTMLCanvasElement){
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');
    // used for referencehttps://stackoverflow.com/questions/11735856/draw-a-grid-on-an-html-5-canvas-element
    const p = 0; // padding
    for (let x = 0; x <= canvas.width; x += canvas.width / 10) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, canvas.width + p);
    }

    for (let x = 0; x <= canvas.height; x += canvas.height/10) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(canvas.height + p, 0.5 + x + p);
    }
    context.strokeStyle = "black";
    context.stroke();
}
/**
 * Draw the regions of the star battle puzzle
 * @param canvas canvas to draw on
 * // add puzzle adt param?
 */
function drawRegions(canvas:HTMLCanvasElement){
    // draw the regions of the puzzle, depending on which puzzle given, will be easier to implement when
    // we have the format of the regions stored in the puzzle adt, so will implement later
}

/**
 * Draw the a star
 * @param canvas canvas to draw on
 * // add puzzle adt param?
 */
function drawStar(canvas:HTMLCanvasElement, x: number, y:number){
    // will process drawing the star in puzzle adt?
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');
    // save original context settings before we translate and change colors
    context.save();

    context.fillStyle = "blue";
    context.beginPath();
    context.moveTo(108, 0.0);
    context.lineTo(141, 70);
    context.lineTo(218, 78.3);
    context.lineTo(162, 131);
    context.lineTo(175, 205);
    context.lineTo(108, 170);
    context.lineTo(41.2, 205);
    context.lineTo(55, 131);
    context.lineTo(1, 78);
    context.lineTo(75, 68);
    context.lineTo(108, 0);
    context.closePath();
    context.fill();

    // reset the origin and styles back to defaults
    context.restore();
}

function removeStar(){
    // remove the star at a cell,  will be easier to implement when
    // we have the format of the how we will track stars in puzzle adt, so will implement later
}

/**
 * Draw a black square filled with a random color.
 *
 * Note: this function is designed to draw on a <canvas> element in the browser,
 *   but we can adjust its signature so that it can be tested with Mocha in Node.
 *   See "How to test: canvas drawing" on the *Testing* page of the project handout.
 *
 * @param canvas canvas to draw on
 * @param x x position of center of box
 * @param y y position of center of box
 */
function drawBox(canvas: HTMLCanvasElement, x: number, y: number): void {
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');
    // save original context settings before we translate and change colors
    context.save();

    // translate the coordinate system of the drawing context:
    //  the origin of `context` will now be (x,y)
    context.translate(x, y);

    // draw the outer outline box centered on the origin (which is now (x,y))
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.strokeRect(-BOX_SIZE/2, -BOX_SIZE/2, BOX_SIZE, BOX_SIZE);

    // fill with a random semitransparent color
    context.fillStyle = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)] ?? assert.fail();
    context.fillRect(-BOX_SIZE/2, -BOX_SIZE/2, BOX_SIZE, BOX_SIZE);

    // reset the origin and styles back to defaults
    context.restore();
}

/**
 * Print a message by appending it to an HTML element.
 *
 * @param outputArea HTML element that should display the message
 * @param message message to display
 */
function printOutput(outputArea: HTMLElement, message: string): void {
    // append the message to the output area
    outputArea.innerText += message + '\n';

    // scroll the output area so that what we just printed is visible
    outputArea.scrollTop = outputArea.scrollHeight;
}

/**
 * Set up the example page.
 */
function main(): void {

    // output area for printing
    const outputArea: HTMLElement = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement ?? assert.fail('missing drawing canvas');


    setUpPuzzle(canvas);

    // when the user clicks on the drawing canvas...
    canvas.addEventListener('click', (event: MouseEvent) => {
        drawBox(canvas, event.offsetX, event.offsetY);
        // drawStar(canvas, event.offsetX, event.offsetY);
    });

    // add initial instructions to the output area
    printOutput(outputArea, `Click in the canvas above to choose a star`);
}

main();
