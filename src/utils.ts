import { Grid } from "./GridADT.js";
import { gridEntry } from "./GridADT.js";
import assert from "assert";

// YOURY - completely forgot about this before, but paths can only
// go in one direction (can't have 90 degree turn or something)
// which makes this extremely simple
export function letterBFS(wordGrid:Array<Array<gridEntry>>, targetWord:string):Array<{row:number, column:number}>{
    const path:Array<{row:number, column:number}> = [];
    for(let i = 0; i < wordGrid.length;i++){
        const currentRow:Array<gridEntry> | undefined = wordGrid[i];
        assert(currentRow);
        for(let j = 0; j < currentRow.length; j++){

            if(currentRow[j]?.letter === targetWord[0]){
                // try up
                let word:string = "";
                for(let k = i; k >= 0; k--){
                    word+=wordGrid[k]![j]?.letter;

                }
                if(word === targetWord){
                    for(let k = i; k > i-targetWord.length; k--){
                        path.push({row:k, column:j});
    
                    }
                    return path;
                }


                // try up-right
                word = "";
                let rowIndex = i;
                let colIndex = j;
                while(rowIndex >= 0 && colIndex < currentRow.length){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex--;
                    colIndex++;
                }
                if(word === targetWord){
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex >= 0 && colIndex < currentRow.length){
                        path.push({row:rowIndex, column:colIndex});
                        rowIndex--;
                        colIndex++;
                    }
                    return path;
                }
                


                // try right
                word = "";
                for(let k = j; k < currentRow.length; k++){
                    word+=currentRow[k]?.letter;

                }

                if(word === targetWord){
                    for(let k = j; k <= targetWord.length; k++){
                        path.push({row:i, column:k});
    
                    }
                    return path;
                }


                // try down-right
                word = "";
                rowIndex = i;
                colIndex = j;
                while(rowIndex < wordGrid.length && colIndex < currentRow.length){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex++;
                    colIndex++;
                }
                if(word === targetWord){
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex < wordGrid.length && colIndex < currentRow.length){
                        path.push({row:rowIndex, column:colIndex});
                        rowIndex++;
                        colIndex++;
                    }
                    return path;
                }

                // try down
                word = "";
                for(let k = i; k < wordGrid.length; k++){
                    word+=wordGrid[k]![j]?.letter;

                }

                if(word === targetWord){
                    for(let k = i; k < targetWord.length; k++){
                        path.push({row:k, column:j});
    
                    }
                    return path;
                }

                // try down-left
                word = "";
                rowIndex = i;
                colIndex = j;
                while(rowIndex < wordGrid.length && colIndex >= 0){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex++;
                    colIndex--;
                }
                if(word === targetWord){
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex < wordGrid.length && colIndex >= 0){
                        path.push({row:rowIndex, column:colIndex});
                        rowIndex++;
                        colIndex--;
                    }
                    return path;
                }

                // try left
                word = "";
                for(let k = j; k >= 0; k--){
                    word+=currentRow[k]?.letter;

                }

                if(word === targetWord){
                    for(let k = j; k > j-targetWord.length; k--){
                        path.push({row:i, column:k});
    
                    }
                    return path;
                }
                

                // try up-left
                word = "";
                rowIndex = i;
                colIndex = j;
                while(rowIndex >= 0 && colIndex >= 0){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex--;
                    colIndex--;
                }
                if(word === targetWord){
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex >= 0 && colIndex >= 0){
                        path.push({row:rowIndex, column:colIndex});
                        rowIndex--;
                        colIndex--;
                    }
                    return path;
                }


            }


        }

    }



    return path;
    
}