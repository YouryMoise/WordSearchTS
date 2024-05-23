/* Copyright (c) 2021-24 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */

import assert from 'assert';
import fs from 'fs';
import { Grid } from '../src/GridADT.js';
import { parseFromText } from '../src/GridADT.js';
import { gridEntry } from '../src/GridADT.js';
import { colors } from '../src/GridADT.js';


/**
 * Tests for the Board abstract data type.
 */
describe('Grid', function () {
    
  /*
    Partition by method
        ParseFromInput
            Invalid input
                Num cols per row not consistent
            Valid
                Num rows = num columns
                rows > cols
                rows < cols
        
        solveStep
            Intermediate step that does not result in uncoloring
            Intermediate step that results in 1 uncoloring
            Intermediate step that results in +1 uncolorings
            Step that finds a word

        isSolved
            solved
            not solved




  */
// YOURY - have to decide what I want to do with capitals
    const inconsistentGrid:string = 
    `0 | helloworld\n1 | hithere\nWord Bank: hello\nworld\nhi\nthere\n`;

    const rowLessColGrid:string = 
    `0 | helloworld\n1 | hithereaaa\nWord Bank: hello\nworld\nhi\nthere\n`;

    const rowGreaterColGrid:string = 
    `0 | hi\n1 | he\n2 | be\nWord Bank: hi\nhe\nbe\n`;

    const rowEqColGrid:string = 
    `0 | hi\n1 | he\nWord Bank: hi\nhe\n`;

    it("covers invalid input where cols per row is inconsistent", function(){
        assert.throws(()=>parseFromText(inconsistentGrid));
    });

    it("covers valid input where num rows = num columns", function(){
        const grid:Grid = parseFromText(rowEqColGrid);
        const expectedGrid:Array<Array<gridEntry>> = [
            [{letter:"h", color:colors.WHITE},{letter:"i", color:colors.WHITE}],
            [{letter:"h", color:colors.WHITE},{letter:"e", color:colors.WHITE}],

        ];
        assert.deepStrictEqual(expectedGrid, grid.currentState());
        
    });

    it("covers rows > cols", function(){
        const grid:Grid = parseFromText(rowGreaterColGrid);
        const expectedGrid:Array<Array<gridEntry>> = [
            [{letter:"h", color:colors.WHITE},{letter:"i", color:colors.WHITE}],
            [{letter:"h", color:colors.WHITE},{letter:"e", color:colors.WHITE}],
            [{letter:"b", color:colors.WHITE},{letter:"e", color:colors.WHITE}],

        ];
        assert.deepStrictEqual(expectedGrid, grid.currentState());
    });

    it("covers rows < cols", function(){
        const grid:Grid = parseFromText(rowLessColGrid);
        const expectedGrid:Array<Array<gridEntry>> = [
            [{letter:"h", color:colors.WHITE},{letter:"e", color:colors.WHITE},{letter:"l", color:colors.WHITE},{letter:"l", color:colors.WHITE},{letter:"o", color:colors.WHITE},{letter:"w", color:colors.WHITE},{letter:"o", color:colors.WHITE},{letter:"r", color:colors.WHITE},{letter:"l", color:colors.WHITE},{letter:"d", color:colors.WHITE}],
            [{letter:"h", color:colors.WHITE},{letter:"i", color:colors.WHITE},{letter:"t", color:colors.WHITE},{letter:"h", color:colors.WHITE},{letter:"e", color:colors.WHITE},{letter:"r", color:colors.WHITE},{letter:"e", color:colors.WHITE},{letter:"a", color:colors.WHITE},{letter:"a", color:colors.WHITE},{letter:"a", color:colors.WHITE},]

        ];
        assert.deepStrictEqual(expectedGrid, grid.currentState());

    });

    it("covers Intermediate step that does not result in uncoloring", function(){

    });

    it("covers Intermediate step that results in 1 uncoloring", function(){

    });

    it("covers Intermediate step that results in +1 uncolorings", function(){

    });

    it("covers isSolved on solved puzzle", function(){

    });

    it("covers isSolved on unsolved puzzle", function(){

    });

});

   


/**
 * Example test case that uses async/await to test an asynchronous function.
 * Feel free to delete these example tests.
 */
describe('async test cases', function () {

    it('covers reads a file asynchronously', async function () {
        const fileContents = (await fs.promises.readFile('boards/ab.txt')).toString();
        assert(fileContents.startsWith('5x5'));
    });
});
