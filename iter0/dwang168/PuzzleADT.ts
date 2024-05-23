export type coordinate = {row: number, column: number};

/**
 * A class representing a star battle puzzle were n=10. 
 */
export class puzzle{
    // Abstraction function:
    // AF(puzzleBoard, regions) = A star battle game with a 10x10 board where puzzleBoard represents the game's board. It is an array of arrays where each sub array represents a row of the board from top to bottom 
    //     (the ith sub array is the ith row of the puzzle board).
    //     If the number in row i of puzzleBoard and the jth entry of that row is 1 then the actual board at row i (0 indexing, row 0 on top of the board and increasing in number going down the board) and entry 
    //     j (0 indexing, column 0 on left of the board and increasing in number going right across the board) has a star. If the number is 0 then the actual board at row i+ and entry j+1 is empty. 
    //     regions is an array of arrays of type coordinate; each array of region represents a region of this game board. Each coordinate of the region has row (representing the row of puzzleBoard the coordinate cooresponds to) and 
    //     column (representing the entry in that row the coordinate corresponds to) where all coordinates of a subarray of regions belong to the same region. Different subarrays of regions represent different regions. 
    // 
    // Representation invariant:
    //    Each puzzle has a single solution
    //    No coordinate in regions appear in more than one subarray of regions. 
    //    puzzleBoard has 10 arrays, each of which has 10 entries. 
    //  
    // Safety from rep exposure:
    //    puzzleBoard is readonly and private. Each element in PuzzleBoard is another array and each element of those subarrays is a number (so immutability is ensured). We never return an alias to puzzleBoard so it is safe.
    //    regions is an array of arrays of coordinates; we never return an alias to regions. It is private and readonly. 
    //

    /**
     * @param regions an array of arrays of coordinates where each subarray of regions has all the coordinates for a region and no coordinate appears in more than one subarray of regions. Must have 100 total coordinates over all the subarrays. 
     * @param puzzleBoard an array of arrays where each sub array represents a row of the board from top to bottom (the ith sub array is the ith row of the puzzle board). Must have 10 arrays of 10 numbers each. 
     *     If the number in row i of puzzleBoard and the jth entry of that row is 1 then the actual board at row i (0 indexing, row 0 on top of the board and increasing in number going down the board) and entry 
     *     j (0 indexing, column 0 on left of the board and increasing in number going right across the board) has a star.
     */
    public constructor(private readonly puzzleBoard: Array<Array<number>> = [], private readonly regions: Array<Array<coordinate>> = []){
        this.checkRep();
    }

    /**
     * Checks to ensure the rep invariant is true
     * @throws an error if the rep invariant is false
     */
    private checkRep(): void{
    }

    /**
     * 
     * @param row the row to check (0 indexing, row 0 on top of the board and increasing in number going down the board). row is at least 0 and less than or equal to 9. 
     * @param column the column to check (0 indexing, column 0 on left of the board and increasing in number going right across the board). column is at least 0 and less than or equal to 9.
     * @returns true is a star is present on the puzzle board at that location and false otherwise. 
     */
    public starPresent (row:number, column: number): boolean{
        this.checkRep();
    }

    /**
     * 
     * @param row the row to add a star (0 indexing, row 0 on top of the board and increasing in number going down the board). row is at least 0 and less than or equal to 9. 
     * @param column the column to add a star (0 indexing, column 0 on left of the board and increasing in number going right across the board). column is at least 0 and less than or equal to 9.
     * @throws an error if the row and column to add a star already has a star. 
     * @returns a new Puzzle with a star added at the row and column inputted. 
     */
    public addStar(row: number, column: number): Puzzle{
        this.checkRep(); 
    }

    /**
     * 
     * @param row the row to remove a star (0 indexing, row 0 on top of the board and increasing in number going down the board). row is at least 0 and less than or equal to 9. 
     * @param column the column to remove a star (0 indexing, column 0 on left of the board and increasing in number going right across the board). column is at least 0 and less than or equal to 9.
     * @returns a new Puzzle with a star removed from the row and column inputted. 
     * @throws an error if the row and column to remove a star has no star. 
     */
    public removeStar(row: number, column: number): Puzzle{
        this.checkRep(); 
    }

    /**
     * true if the puzzle is solved wwith every row having two stars, every column having two stars, every region having two stars, and no stars are vertically, horizontally, or diagonally adjacent. false if it isn't solved. 
     */
    public solvedStatus(): boolean{
        this.checkRep();
    }

    /**
     * @returns a string representation of the puzzle, regions, and stars placed
     */
    public toString(): string{
        this.checkRep();
    }
}