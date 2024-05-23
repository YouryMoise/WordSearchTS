
const PUZZLE_SIZE = 10
/**
 * An immutable puzzle ADT that can represent valid unsolved, partially-solved, and fully-solved puzzles.
 */
export class Puzzle {
    // Abstraction function
    //      AF(grid, regions) = a PUZZLE_SIZE x PUZZLE_SIZE grid divided into n regions, where "regions"[i] for 0 <= i < PUZZLE_SIZE
    //      consists of the array of coordinates that compose the ith region, where each coordinate is an array of two numbers.
    //      The puzzle grid is represented by a flattened array "grid", where the cell at (i, j) in the 2-D grid contains a star iff the cell contained in
    //      array[i * col + j] is true, with 0 <= i < PUZZLE_SIZE, 0 <= j < PUZZLE_SIZE.
    //
    // Rep invariant
    //     - grid.length must be PUZZLE_SIZE * PUZZLE_SIZE
    //     - regions.length must be PUZZLE_SIZE, regions[i].length must be 2 for all valid i
    //     - there must be <= 2 stars in every row of the 2-D grid, that is, for every row i, only two booleans in grid[i], grid[i+1], grid[i+2],...grid[i+9]
    //       can be true
    //     - there must be <= 2 stars in every col of the 2-D grid, that is, for every col j, only two booleans in grid[j], grid[j+1*PuzzleSize], grid[j+2*PuzzleSize],...grid[j+3*PuzzleSize]
    //       can be true
    //     - each region must have only up to 2 trues - need elaboration to make concrete
    //     - may be more that I'm missing
    //
    // Safety from rep exposure
    //     all fields are private
    //     All parameters and return values are immutable objects (string, number, boolean)
    //

    // rep depends on easiest implementation of isSolved
    private grid: Array<boolean>;
    private regions: Array<[number, number]>;


    public constructor(private readonly filename: string) {
    }


    private checkRep(): void {
    }

    /**
     *
     * Add a star at location (row, column) in the grid, coordinates are 1-indexed
     *
     * @param row 1 <= row <= PUZZLE_SIZE
     * @param col 1 <= col <= PUZZLE_SIZE
     * @throws Error if makes puzzle invalid
     */
    public addStar(row:number, col:number): void {

    }

    /**
     *
     * Removes a star at location (row, column) in the grid, coordinates are 1-indexed
     *
     * @param row 1 <= row <= PUZZLE_SIZE
     * @param col 1 <= col <= PUZZLE_SIZE
     */
    public removeStar(row:number, col:number): void {

    }

    // Used after parsing the solved adt to be able to send the empty puzzle to the client?
    /**
     * Empties grid of all stars
     */
    public emptyStars(): void{

    }

    /**
     * @returns true iff the puzzle is solved, i.e., the grid has a placement of 2n stars such that each row, each column,
     *          and each region of the puzzle has exactly 2 stars,
     *          and no stars are vertically, horizontally, or diagonally adjacent
     */
    public isSolved(): boolean{

    }

    /**
     * @returns a string parsable representation of the puzzle to display on the screen? - how display?
     */
    public toString(): string {

    }
}
