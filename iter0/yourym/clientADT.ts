/*
Your client web page must use another client ADT to manage its state (for example, what puzzle is being played, using the puzzle ADT) and operations (for example, in reaction to user input). Its design is entirely up to you.
The client web page must: request a blank puzzle, display the puzzle on screen, allow the user to add stars anywhere on the grid, display those stars, allow the user to remove stars they have added, and inform the user if and when they have solved the puzzle.

On startup, any instructions needed by the user should be shown on the web page.

The client must support clicking on the puzzle to add stars.

[for now] The client may use only canvas drawing, and may not use any other HTML elements.

[for now] The client must request and play the single puzzle given by the PUZZLE constant at the top of StarbClient.

[for now] Clicking on an added star must remove it.

The client may either determine that the puzzle is solved on its own, or it may request a determination from the server.

No other interactions or capabilities are required (for example, marking empty cells is not required, even if it makes solving more fun).

The particular graphical presentation is entirely up to you (for example, you could indicate regions with background colors instead of outlines, or draw smiley faces instead of stars).

Keep in mind that puzzle files have (row, col) coordinates, not (x, y) coordinates.

*/

class Client {

    grid:Array<{star:boolean, left:boolean, right:boolean, top:boolean, bottom:boolean}>;

    // Probably use some kind of BFS to get these regions?
    // Like start at 0,0, find all points reachable from that, then
    // loop over array until you find point that has not been reached yet
    // do this until all points have been reached
    regionToSquaresMap:Map<string, Array<{row:number, col:number}>>;


    // AF, RI, SRE
    // AF
    /*
        AF(grid, regionToSquaresMap) =>
            A star puzzle of size 10 x 10 such that
            for every index [i][j] in grid, square (i,j) has
                a star if grid[i][j].star otherwise a blank space
                its left border bolded iff grid[i][j].left
                its right border bolded iff grid[i][j].right
                its top border bolded iff grid[i][j].top
                its bottom border bolded iff grid[i][j].bottom
            and for every region in the grid, where regions are numbered
            in the order that they appear in the puzzle going from left to right
            top to bottom, regionsToSquaresMap.get(region) returning
            [{x1, y1}, {x2, y2}....{xn, yn}] indicates that the (row,col)
            coordinates (x1,y1)...(xn,yn) are contained within that region

    */

    // RI
    /*
        RI:
            grid
                length = 10
                For every subarray in grid, subarray.length = 10

            regionToSquaresMap
                Has exactly 10 keys
                If a (xi, yi) is in regionToSquaresMap.get(regionA), then
                for all otherRegion's in regionToSquaresMap,
                regionToSquaresMap.get(otherRegion) does not have (xi,yi)
                For every possible (row, col), where 0<= row, col < 10,
                there is exactly one key in regionToSquaresMap such that
                regionToSquaresMap.get(key).includes((row,col)) is true
                Must never be mutated by any operations beyond the constructor



    */

    // methods

    /**
     * creates a deep copy of the grid returned by the web call
     */
    public constructor(
    ){

    }

    private checkRep():void{

    }

    //assuming these are called by event listener on the actual DOM

    /**
     * Draws a star centered in the square that the mouse clicked on,
     * updates fields to update our state
     * and signals the Client to redraw the puzzle on the screen.
     * Notifies the user if they have won
     * @param xCoord The x Coordinate of where the mouse clicked
     * @param yCoord The y Coordinate of where the mouse clicked
     * @throws if x or y is negative or greater than the dimensions of the puzzle
     * @throws if there is a star in that location
     */
    public addStar(xCoord:number, yCoord:number):void{

    }

    /**
     * Removes the star in the square that the mouse clicked on
     * updates [fields] to update our state,
     * and signals the Client to redraw the puzzle on the screen.
     * Notifies the user if they have won
     * @param xCoord The x Coordinate of where the mouse clicked
     * @param yCoord The y Coordinate of where the mouse clicked
     * @throws if x or y is negative or greater than the dimensions of the puzzle
     * @throws if there is no star in that location
     */
    public removeStar(xCoord:number, yCoord:number):void{

    }

    private checkIfSolved():boolean{

    }



    /**
     *
     * @param xCoord The x Coordinate of where the mouse clicked
     * @param yCoord The y Coordinate of where the mouse clicked
     * @returns The square in the puzzle in (row, col) format, with the
     * top left of the screen being at (0,0), that contains (xCoord,yCoord)
     */
    private coordToSquare(xCoord:number, yCoord:number):{row:number, col:number}{

    }

    /**
     * @returns A map labeling regions of the grid (numbered left to right top to bottom)
     *          with arrays of all the (row, col) coordinates contained within
     *          that region
     */
    private createRegionsMap():Map<string, Array<{row:number, col:number}>>{

    }


    /**
     *
     * @param starRow The row of the square from which we start exploring
     *                  Must be an integer in [0,9]
     * @param starCol The column of the square from which we start exploring
     *                  Must be an integer in [0,9]
     * @returns A list of all the coordinates that can be reached from
     *          (starRow, startCol) using up/down/left/right moves that
     *          do not cross region border described in grid
     */
    private bfs(starRow:number, starCol:number):Array<{row:number, col:number}>{
        
    }



}
