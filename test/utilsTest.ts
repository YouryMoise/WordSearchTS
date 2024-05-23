import assert from "assert";
import { parseFromText } from "../src/GridADT.js";
import { Grid } from "../src/GridADT.js";
import { letterBFS } from "../src/utils.js";

describe("bfs", function(){

    /*
        Partition by 
            number of letters
                1. Done
                2. Done
                +2. Done
            type of path
                horizontal. Done
                vertical. Done
                diagonal. Done
            direction of path
                horizontal
                    Left. Done
                    Right. Done
                Vertical
                    Up. Done
                    Down. Done
                Diagonal
                    Up and to the right. Done
                    Up and to the left. Done
                    Down and to the right. Done
                    Down and to the left. Done
            false positive letters
                first letter
                    only 1 place with the correct first letter. Done
                    +1 places with correct first letter. Done
                beyond first letter
                    only 1 with correct second letter. Done
                    +1 places with correct second letter. Done
        

    */
    const inputString:string = `0 | hit\n1 | ahe\n2 | tbe\nWord Bank: hi\nhe\nbe\n`;
    const inputString2:string = `0 | hit\n1 | ahe\n2 | lbe\nWord Bank: hi\nhe\nbe\n`;
    const inputString3:string = `0 | hab\n1 | aha\n2 | lbd\nWord Bank: hi\nhe\nbe\n`;
    const inputString4:string = `0 | li\n1 | he\nWord Bank: hi\nhe\n`;
    const inputString5:string = `0 | hi\n1 | he\nWord Bank: hi\nhe\n`;



    function testInput(inputText:string, targetWord:string, expectedPath:Array<{row:number, column:number}>):void{
        const grid:Grid = parseFromText(inputText);
        const state = grid.currentState();
        const path = letterBFS(state, targetWord);
        assert.deepStrictEqual(path, expectedPath);
        // this may never be true because it might be looking for reference equality for coords?

    }
    
    it("covers 1 letter path", function(){
        const targetWord = "e";
        const expectedPath = [{row:1, column:2}];
        testInput(inputString, targetWord, expectedPath);
    });

    it("covers 2 letter horizontal (right) path with 1 false positive for 1st letter", function(){
        const targetWord = "he";
        const expectedPath = [{row:1, column:0}, {row:1, column:1}];
        testInput(inputString, targetWord, expectedPath);

    });
    
    it("covers 2 letter horizontal (right) path with 1 false positive for 1st letter", function(){
        const targetWord = "he";
        const expectedPath = [{row:1, column:0}, {row:1, column:1}];
        testInput(inputString4, targetWord, expectedPath);

    });

    it.only("covers 2 letter horizontal (right) path with 1 false positive for 1st letter", function(){
        const targetWord = "hi";
        const expectedPath = [{row:0, column:0}, {row:0, column:1}];
        testInput(inputString5, targetWord, expectedPath);

    });


    it("covers +2 letter horizontal (left) path", function(){
        const targetWord = "tih";
        const expectedPath = [{row:0, column:2}, {row:0, column:1},{row:0, column:0}];
        testInput(inputString, targetWord, expectedPath);

    });

    it("covers vertical (down) path", function(){
        const targetWord = "hat";
        const expectedPath = [{row:0, column:0}, {row:1, column:0},{row:2, column:0}];
        testInput(inputString, targetWord, expectedPath);

    });

    it("covers vertical (up) path", function(){
        const targetWord = "eet";
        const expectedPath = [{row:2, column:2}, {row:1, column:2},{row:0, column:2}];
        testInput(inputString, targetWord, expectedPath);

    });

    it("covers diagonal (down right) path", function(){
        const targetWord = "hhe";
        const expectedPath = [{row:0, column:0}, {row:1, column:1},{row:2, column:2}];
        testInput(inputString, targetWord, expectedPath);

    });

    it("covers diagonal (up left) path", function(){
        const targetWord = "ehh";
        const expectedPath = [{row:2, column:2}, {row:1, column:1},{row:0, column:0}];
        testInput(inputString, targetWord, expectedPath);

    });

    it("covers diagonal (down left) path", function(){
        const targetWord = "thl";
        const expectedPath = [{row:0, column:2}, {row:1, column:1},{row:2, column:0}];
        testInput(inputString2, targetWord, expectedPath);

    });

    it("covers diagonal (up right) path", function(){
        const targetWord = "lht";
        const expectedPath = [{row:2, column:0}, {row:1, column:1},{row:0, column:2}];
        testInput(inputString2, targetWord, expectedPath);

    });

    it("covers path with second letter false positive", function(){
        const targetWord = "bad";
        const expectedPath = [{row:0, column:2}, {row:1, column:2},{row:2, column:2}];
        testInput(inputString3, targetWord, expectedPath);

    });
    
});