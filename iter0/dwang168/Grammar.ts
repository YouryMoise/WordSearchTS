//needs to be able to reppresent blank puzzles! In that case, we have no '|' and only coordinates. Here, we would have to allow the first part of region to be empty. 

const grammar = `
@skip whitespaceOrComments {
    entirety ::= rowByColumn [\\r\\n] (region [\\r\\n])*; 
    rowByColumn ::= number 'x' number;
    region ::= (coordinate* '|' coordinate*) | coordinate*;
    coordinate ::= number ',' number;
}
number ::= [0-9]+;
whitespaceOrComments ::= [ \\t\\r\\n]+ | '#' [^\\r\\n]* [\\r\\n]+;
`;
