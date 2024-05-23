/**
 * A client ADT to manage the state of the client web page (what puzzle is being played) and operations. 
 */
export class client{
    // Abstraction function:
    // AF(currentBoard, fileName) = currentBoard is a star battle puzzle being played and the anme of the puzzle is fileName. 
    // 
    // Representation invariant:
    //    currentBoard is a 10x10 puzzle
    //  
    // Safety from rep exposure:
    //    fileName and currentBoard are both immutable objects and are private. fileName is readonly.
    //

    /**
     * @param currentBoard is the current puzzle being worked on by the client. 
     * @param fileName is the string file name of the puzzle. 
     */
    public constructor(private currentBoard: puzzle, private readonly fileName: string){
        this.checkRep();
    }

    /**
     * Checks to ensure the rep invariant is true
     * @throws an error if the rep invariant is false
     */
    private checkRep(): void{
    }

    /**
     * @returns true if this.currentBoard is solved and false otherwise. 
     */
    public solvedStatus(): boolean{
        this.checkRep();
    }

    /**
     * updates the puzzle after a user input results in a board change. 
     * @param newPuzzle the new puzzle state.
     * @returns Returns a boolean true if the puzzle is now solved after the update and false otherwise. 
     */
    public updatedPuzzle(newPuzzle): boolean{
        this.checkRep();
    }

    /**
     * @returns the name of the current puzzle being played. 
     */
    public currentPuzzleName(): string{
        this.checkRep();
    }

    /**
     * @returns the current layout of the puzzle being worked on by the client in the form of a string. 
     */
    public currentPuzzleStatus(): string{
        this.checkRep();
    }
}