import { Grid } from "./GridADT.js";
import { gridEntry } from "./GridADT.js";
import assert from "assert";

// YOURY - completely forgot about this before, but paths can only
// go in one direction (can't have 90 degree turn or something)
// which makes this extremely simple
export function letterBFS(wordGrid:Array<Array<gridEntry>>, targetWord:string):Array<{row:number, column:number}>{
    const path:Array<{row:number, column:number}> = [];
    console.log(`targetWord is ${targetWord}`);
    for(let i = 0; i < wordGrid.length;i++){
        const currentRow:Array<gridEntry> | undefined = wordGrid[i];
        assert(currentRow);
        // console.log(currentRow);
        for(let j = 0; j < currentRow.length; j++){
            if(currentRow[j]?.letter === targetWord[0]){
                // console.log(i,j);
                // try up
                let word:string = "";
                for(let k = i; k > i - targetWord.length && k >= 0; k--){
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
                while(rowIndex >= 0 && colIndex < currentRow.length && word.length < targetWord.length){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex--;
                    colIndex++;
                }
                if(word === targetWord){
                    word = "";
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex >= 0 && colIndex < currentRow.length  && word.length < targetWord.length){
                        path.push({row:rowIndex, column:colIndex});
                        rowIndex--;
                        colIndex++;
                        word+=wordGrid[rowIndex]![colIndex]?.letter;
                    }
                    return path;
                }
                


                // try right
                word = "";
                if(targetWord === "cheetah"){
                    // console.log(`looking for ${targetWord}`)
                }
                for(let k = j; k < j + targetWord.length; k++){
                    word+=currentRow[k]?.letter;

                }
                // if(targetWord === "cheetah") console.log(`word is ${word}`);
                if(word === targetWord){
                    for(let k = j; k < j+ targetWord.length; k++){
                        path.push({row:i, column:k});
    
                    }
                    return path;
                }


                // try down-right
                console.log(`while down-right, targetWord is ${targetWord}`)                
                word = "";
                rowIndex = i;
                colIndex = j;
                while(rowIndex < wordGrid.length && colIndex < currentRow.length  && word.length < targetWord.length){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex++;
                    colIndex++;
                    if(targetWord === "bat"){
                        console.log(word);
                    }
                }
                if(word === targetWord){
                    word = "";
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex < wordGrid.length && colIndex < currentRow.length  && word.length < targetWord.length){
                        path.push({row:rowIndex, column:colIndex});
                        word+=wordGrid[rowIndex]![colIndex]?.letter;
                        rowIndex++;
                        colIndex++; 
                    }
                    return path;
                }

                // try down
                word = "";
                for(let k = i; k < i + targetWord.length; k++){
                    word+=wordGrid[k]![j]?.letter;

                }

                if(word === targetWord){
                    for(let k = i; k < i + targetWord.length; k++){
                        path.push({row:k, column:j});
    
                    }
                    return path;
                }

                // try down-left
                word = "";
                rowIndex = i;
                colIndex = j;
                while(rowIndex < wordGrid.length && colIndex >= 0  && word.length < targetWord.length){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex++;
                    colIndex--;
                }
                if(word === targetWord){
                    word = "";
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex < wordGrid.length && colIndex >= 0  && word.length < targetWord.length){
                        path.push({row:rowIndex, column:colIndex});
                        rowIndex++;
                        colIndex--;
                        word+=wordGrid[rowIndex]![colIndex]?.letter;
                    }
                    return path;
                }

                // try left
                word = "";
                for(let k = j; k > j-targetWord.length; k--){
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
                while(rowIndex >= 0 && colIndex >= 0  && word.length < targetWord.length){
                    word+=wordGrid[rowIndex]![colIndex]?.letter;
                    rowIndex--;
                    colIndex--;
                }
                if(word === targetWord){
                    word = "";
                    rowIndex = i;
                    colIndex = j;
                    while(rowIndex >= 0 && colIndex >= 0  && word.length < targetWord.length){
                        path.push({row:rowIndex, column:colIndex});
                        rowIndex--;
                        colIndex--;
                        word+=wordGrid[rowIndex]![colIndex]?.letter;
                    }
                    return path;
                }


            }


        }

    }



    return path;
    
}