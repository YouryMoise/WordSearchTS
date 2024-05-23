import { parseExpression } from "./Parser.js";
import assert from 'assert';

/**
 * Represents a grid of squares with r rows and c columns, 
 * where each square has a letter
 * There is a given list of words, and the letters in the squares
 * can come together horizontally, vertically, or diagonally
 * to make the words in the list
 * Squares with a white background have not yet been found to
 * be part of a solution
 * Squares with a colored background have been found to 
 * be part of a solution
 * Each word must have a distinct color, but letters shared by words
 * are assigned the color of the word whose first letter comes first
 * in the grid (by row then column)
 * While solving, we should see cells marked with colors because they
 * are potential solutions, but those colors should disappear if they
 * are found to not be parts of solution
 * Assumes the given puzzle has a solution
 * For first iteration, just solve puzzle beforehand and 
 * only color the ones that have been found in solution
 */
export type gridEntry = { readonly letter:string, color:number};

export const enum colors {
    WHITE = 0, 
    RED = 1,
    BLUE = 2,
    GREEN = 3,
    PURPLE = 4,
    ORANGE = 5
}

export class Grid{
    /*
        AF


        RI
            wordGrid
                Every subarray has the same number of entries
                There is at least one row
                There is at least one entry in each row
            wordBank
                Never mutated




        SRE



    */


    private readonly wordGrid:Array<Array<gridEntry>> = [];
    

    public constructor(inputGrid:Array<Array<gridEntry>>/* , private readonly wordBank:Set<gridEntry> */){
        for(const row of inputGrid){
            this.wordGrid.push([]);
            for(const entry of row){
                this.wordGrid[this.wordGrid.length-1]?.push(entry);
            }
        }
        this.checkRep();

    }

    private checkRep():void{
        assert(this.wordGrid.length > 0);
        const numEntriesInRowZero:number = this.wordGrid[0]!.length;
        assert(numEntriesInRowZero > 0);
        for(const row of this.wordGrid){
            assert(row.length === numEntriesInRowZero);
        }
    }

    /**
     * Mutates the wordGrid to reflect the next step in solving
     *  @returns
     */
    public solveStep():void{

    }

    /**
     * Returns true iff the puzzle is solved
     */
    public isSolved():boolean{
        return false;
    }

    /**
     * @returns a deepcopy of wordGrid
     */
    public currentState():Array<Array<gridEntry>>{
        const deepGridCopy:Array<Array<gridEntry>> = [];
        for(const row of this.wordGrid){
            deepGridCopy.push([]);
            for(const entry of row){
                deepGridCopy[deepGridCopy.length-1]?.push(entry);
            }
        }
        return deepGridCopy;
    }

    public toString():string{
        return "";
    }

    

}
export function parseFromText(input:string):Grid{
    return parseExpression(input);
        
}