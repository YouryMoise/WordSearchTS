import assert from 'assert';
import { Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';
import { Grid } from './GridADT.js';
import { gridEntry } from './GridADT.js';
import { colors } from './GridADT.js';

const grammar = `
@skip whitespace {
    line ::= number '|' letter+ NEWLINE;
    layout ::= line*;
    bank ::= 'Word Bank: ' (word NEWLINE)+;
    entire ::= layout bank;

}
word ::= letter+;
letter ::= [a-z];
whitespace ::= [ \\t];
NEWLINE ::= '\\r'? '\\n';
number ::= [0-9]+;
`;

enum ExpressionGrammar {
    Entire, Line, Layout, Bank, Word, Letter, Whitespace, Newline, Number
}

const parser:Parser<ExpressionGrammar> = compile(grammar, ExpressionGrammar, ExpressionGrammar.Entire);

export function parseExpression(input:string):Grid{
    const parseTree:ParseTree<ExpressionGrammar> = parser.parse(input);

    const puzzle:Grid = makeAbstractSyntaxTree(parseTree);
    
    return puzzle;

}

function makeAbstractSyntaxTree(parseTree:ParseTree<ExpressionGrammar>):Grid{

    assert(parseTree.name === ExpressionGrammar.Entire, "Incomplete expression");

    const finalGrid:Array<Array<gridEntry>> = [];
    const wordBank:Set<string> = new Set([]);

    const allLettersArray = parseTree.childrenByName(ExpressionGrammar.Layout);
    assert(allLettersArray.length > 0, "No letters given");
    const allLetters = allLettersArray[0] as ParseTree<ExpressionGrammar>;

    const allLinesArray = allLetters.childrenByName(ExpressionGrammar.Line);

    for(const line of allLinesArray){
        finalGrid.push([]);
        const lineText:string = line.text;
        const lineTextSplit:Array<string> = lineText.split("|");
        assert(lineTextSplit.length > 0, "No letters in a line");
        const rowIndex:number = parseInt(lineTextSplit[0] as string);
        const letters:string = (lineTextSplit[1] as string).replace(/\s/g, "");
        for(const letter of letters){
            const newEntry = {letter:letter, color:colors.WHITE};
            finalGrid[finalGrid.length-1]?.push(newEntry);
        } 
    }

    const bank = parseTree.childrenByName(ExpressionGrammar.Bank)[0];
    const allWords = bank?.childrenByName(ExpressionGrammar.Word);
    for(const word of allWords!){
        const text = word.text;
        wordBank.add(text);
    }

    console.log("in here now, ",wordBank);

    const newGrid = new Grid(finalGrid, wordBank);
    return newGrid;
    

    


}