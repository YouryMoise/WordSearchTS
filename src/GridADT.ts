import { parseExpression } from "./Parser.js";
import assert from 'assert';
import { letterBFS } from "./utils.js";

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
export type gridEntry = { readonly letter:string, color:colors};

export const enum colors {
    WHITE = "white", 
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
    PURPLE = "purple",
    ORANGE = "orange"
}
const colorsArray = [colors.RED, colors.BLUE, 
                    colors.GREEN, colors.PURPLE, colors.ORANGE];

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
    private currentPath:number = 0;
    private currentPathIndex:number = 0;
    private readonly solution:Array<Array<{row:number, column:number}>>;
    private currentColor:number = 1;

    public constructor(inputGrid:Array<Array<gridEntry>>, private readonly wordBank:Set<string>){
        for(const row of inputGrid){
            this.wordGrid.push([]);
            for(const entry of row){
                this.wordGrid[this.wordGrid.length-1]?.push(entry);
            }
        }
        this.checkRep();
        this.solution  = this.solve();

    }

    private checkRep():void{
        assert(this.wordGrid.length > 0, "No elements in the grid");
        const numEntriesInRowZero:number = this.wordGrid[0]!.length;
        assert(numEntriesInRowZero > 0, "No entries in the first row");
        for(const row of this.wordGrid){
            assert(row.length === numEntriesInRowZero, "Row length inconsistent");
        }
    }

    public get numRows():number{
        return this.wordGrid.length;
    }

    public get numColumns():number{
        return this.wordGrid[0]!.length;
    }

    /**
     * Mutates the wordGrid to reflect the next step in solving
     *  @returns
     */
    public solveStep():void{
        const allPaths = this.solution;
        if(this.currentPath >= allPaths.length){
            alert("All words found"); //change this to be something that actually displays on the screen
        }
        const currentPath = allPaths[this.currentPath];

        assert(currentPath, "No current path");


        const currentCoord = currentPath[this.currentPathIndex];
        const row = currentCoord?.row;
        const col = currentCoord?.column;
        assert(row !== undefined, "Row undefined");
        assert(col !== undefined, "Col undefined");
        const currentRow = this.wordGrid[row];
        assert(currentRow, "Current row undefined");
        currentRow[col]!.color = colorsArray[this.currentColor]!;
        this.currentPathIndex = (this.currentPathIndex + 1)%currentPath.length;
        if(this.currentPathIndex === 0){
            this.currentPath++;
            this.currentColor = (this.currentColor+1)%colorsArray.length;
        }

    }

    public unsolveStep():void{
        // startig from the end, find the first coordinate that isn't white
        const allPaths = this.solution;
        for(let i = allPaths.length-1; i>=0; i--){
            const currentRow = allPaths[i];
            assert(currentRow, "Row missing");
            for(let j = currentRow?.length-1; j >= 0; j--){
                const coordinate = currentRow[j];
                assert(coordinate, "Coordinate undefined");
                const row:number = coordinate.row;
                const col:number = coordinate.column;
                const entry = this.wordGrid[row]![col];
                assert(entry);
                if(entry.color !== colors.WHITE){
                    console.log(this.currentState())
                    entry.color = colors.WHITE;
                    console.log(this.currentState())
                    if(this.currentPath === i+1){
                        this.currentColor = Math.max(this.currentColor-1, 0);
                    }
                    this.currentPath = i;
                    this.currentPathIndex = j;
                    
                    return;
                }

            }
        }
        // turn it white

        // return 
    }

    /**
     * Returns true iff the puzzle is solved
     */
    public isSolved():boolean{
        return this.currentPath >= this.solution.length;
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

    public equalValue(otherGrid:Grid):boolean{
        return false
    }

    private solve():Array<Array<{row:number, column:number}>>{
        console.log(this.currentState());
        const allPaths:Array<Array<{row:number, column:number}>> = [];
        for(const word of this.wordBank){
            
            const wordPath:Array<{row:number, column:number}> = letterBFS(this.currentState(), word);
            allPaths.push(wordPath);
        }

        return allPaths;
        
    }

    

}
export function parseFromText(input:string):Grid{
    return parseExpression(input);
        
}