import assert from 'assert';
import { Parser, ParseTree, compile, visualizeAsUrl } from 'parserlib';
// import { ImageExpr, Caption, SideGlue, TopGlue, BotOverlay, TopOverlay, Resize, } from './ExpressionImpl.js';




/**
 * Parser for puzzles
 */

// bar is optional??, see empty 

// the grammar
const grammar = `
@skip whitespace {
    expression ::= dimensions (regionStars "|" regionCells){10};
    dimensions ::= number 'x' number
    regionStars ::= (coordinate coordinate)?
    regionCells ::= coordinate*
}
coordinate ::= number ',' number
number ::= [0-9]+;
whitespace ::= [ \\t\\r\\n]+;
`;




// ps3 reference
// const grammar = `
// @skip whitespace {
//     expression ::= sideGlue (topToBottomOperator sideGlue)*;
//     sideGlue ::= botOverlay ('|' botOverlay)*;
//     botOverlay ::= topOverlay ('_' topOverlay)*;
//     topOverlay ::= resize ('^' resize)*;
//     resize ::= primitive (('@' number 'x' number) | ('@' number 'x' question) | ('@' question 'x' number))*;
//     primitive ::= filename | caption |'(' expression ')';
// }
// topToBottomOperator ::= '---' '-'*;
// filename ::= [A-Za-z0-9.][A-Za-z0-9._-]*;
// caption ::= '"' [^"\\n]* '"';
// number ::= [0-9]+;
// question ::= '?';
// whitespace ::= [ \\t\\r\\n]+;
// `;
