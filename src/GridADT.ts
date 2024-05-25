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

// YOURY - plan for making the squares have different colors
// gridEntry now has a field specifying which part should be colored (top, left, right, bottom)
// actually gridEntry may not need any extra info since the main differences are next step and prevStep
// actually Draw.ts uses gridEntry to determine color so would need it
// gridEntry = {letter, colorTopLeft, colorTopRight...}
// When calling next step, if all the regions are white, then change them all
// if all regions are same non-white color, find the word with letter in that square
//  find average x and y of both words, and choose which 2 regions to color
//  (only supporting 2 intersecting words for now)
// in Draw.ts, draw 4 small rectangles instead (should be simple change)

// give this a list of words that have used it to make it easier
export type gridEntry = { readonly letter:string, colorTopLeft:colors, colorTopRight:colors,
                                                  colorBottomLeft:colors, colorBottomRight:colors,
                                                  words:Array<string>,
};

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
    private readonly wordToCoordinatesMap:Map<string, Array<{row:number, column:number}>> = new Map();

    public constructor(inputGrid:Array<Array<gridEntry>>, private readonly wordBank:Set<string>){
        for(const row of inputGrid){
            this.wordGrid.push([]);
            for(const entry of row){
                this.wordGrid[this.wordGrid.length-1]?.push(entry);
            }
        }
        for(const word of this.wordBank){
            this.wordToCoordinatesMap.set(word, []);
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

    private setEntryColor(entry:gridEntry, colorTopLeft:colors, colorTopRight:colors,
        colorBottomLeft:colors, colorBottomRight:colors):void{
            entry.colorTopLeft = colorTopLeft;
            entry.colorTopRight = colorTopRight;
            entry.colorBottomLeft = colorBottomLeft;
            entry.colorBottomRight = colorBottomRight;
        }
    
    private isColored(entry:gridEntry):boolean{
        return (
            entry.colorTopLeft !== colors.WHITE ||
            entry.colorTopRight !== colors.WHITE ||
            entry.colorBottomLeft !== colors.WHITE ||
            entry.colorBottomRight !== colors.WHITE
        )
    }


    /**
     * Mutates the wordGrid to reflect the next step in solving
     *  @returns
     */
    public solveStep():void{
        let currentWord:string = "";
        
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
        for(const coord of currentPath){
            const entry:gridEntry|undefined = this.wordGrid[coord.row]![coord.column];
            currentWord += (entry?.letter);
        }
        // currentRow[col]!.color = colorsArray[this.currentColor]!;

        const entry = currentRow[col];
        assert(entry, "No entry found");
        // if entry has any colors
        let relevantCoordinates:Array<{row:number, column:number}> = [];
        if(this.isColored(entry)){
            let found:boolean = false;
            // find which word
            // for(const [word, coordinates] of this.wordToCoordinatesMap){
            //     for(const coordinate of coordinates){
            //         if(coordinate.row === row && coordinate.column === col){
            //             found = true;
            //             relevantCoordinates = coordinates;
            //             break;
            //         }
            //         if(found) break;
            //     }
            // }


        }

        if(entry.words.length > 1 && this.isColored(entry)){
            const word1 = currentWord;
            const word2:string|undefined = entry.words.filter((x)=>x!==word1)[0];
            assert(word2);
            console.log(word2);
            assert(word1 && word2);
            const word1Coordinates:Array<{row:number, column:number}>|undefined = this.wordToCoordinatesMap.get(word1);
            const word2Coordinates:Array<{row:number, column:number}>|undefined = this.wordToCoordinatesMap.get(word2);
            assert(word1Coordinates && word2Coordinates, "Coordinates either undefined or empty");
            const xAverage1 = word1Coordinates.reduce((prev:number, current:{row:number, column:number})=>{
                return prev+current.column;
            },0)/word1Coordinates.length;
            const xAverage2 = word2Coordinates.reduce((prev:number, current:{row:number, column:number})=>{
                return prev+current.column;
            },0)/word2Coordinates.length;

            const yAverage1 = word1Coordinates.reduce((prev:number, current:{row:number, column:number})=>{
                return prev+current.row;
            },0)/word1Coordinates.length;
            const yAverage2 = word2Coordinates.reduce((prev:number, current:{row:number, column:number})=>{
                return prev+current.row;
            },0)/word2Coordinates.length;

            const xDifference = xAverage1-xAverage2;
            const yDifference = yAverage1-yAverage2;
            const originalColor = entry.colorTopLeft;
            if(Math.abs(xDifference) >= Math.abs(yDifference)){
                if(xDifference < 0){
                    // preserve new colors while adding new ones
                    entry.colorTopLeft = colorsArray[this.currentColor] as colors;
                    entry.colorBottomLeft = colorsArray[this.currentColor] as colors;

                }
                else{
                    // preserve new colors while adding new ones
                    entry.colorTopRight = colorsArray[this.currentColor] as colors;
                    entry.colorBottomRight = colorsArray[this.currentColor] as colors;

                }
                
            }else{
                if(yDifference < 0){
                    // preserve new colors while adding new ones
                    entry.colorTopLeft = colorsArray[this.currentColor] as colors;
                    entry.colorTopRight = colorsArray[this.currentColor] as colors;

                }else{
                    entry.colorBottomLeft = colorsArray[this.currentColor] as colors;
                    entry.colorBottomRight = colorsArray[this.currentColor] as colors;
                }
            }
        }else{
            this.setEntryColor(entry, colorsArray[this.currentColor]!, colorsArray[this.currentColor]!,
                colorsArray[this.currentColor]!,colorsArray[this.currentColor]!
            );
        }

        // calculate average x and y coordinates (will need new data structure for this)
        
        // set squares according to averages

        
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
                // YOURY - change this to make sense later
                if(entry.colorTopLeft !== colors.WHITE){
                    // entry.color = colors.WHITE;
                    this.setEntryColor(entry, colors.WHITE,colors.WHITE,colors.WHITE,colors.WHITE);

                    if(this.currentPath === i+1){
                        this.currentColor = Math.max((this.currentColor-1)%colorsArray.length, 0);
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
        const allPaths:Array<Array<{row:number, column:number}>> = [];
        for(const word of this.wordBank){
            
            const wordPath:Array<{row:number, column:number}> = letterBFS(this.currentState(), word);
            const wordCoordinates:Array<{row:number, column:number}>|undefined = this.wordToCoordinatesMap.get(word);
            assert(wordCoordinates !== undefined, "Word not found in word bank");
            for(const coordinate of wordPath){
                wordCoordinates.push(coordinate);
            }

            allPaths.push(wordPath);
        }
        // console.log(this.wordToCoordinatesMap);
        return allPaths;
        
    }

    

}
export function parseFromText(input:string):Grid{
    return parseExpression(input);
        
}