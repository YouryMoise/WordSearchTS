/**
 * Server accepts HTTP requests on port 8789 for puzzles identified by their filename, without extension and transmits "blank" puzzles to the client. 
 */
export class webComm{

    //must accept HTTP requests on port 8789
    private readonly PORT = 8789;
    
    /**
     * @param fileName Accepts an HTTP request on port 8789 for puzzle identified by the fileName, without extension, in the subdirectory puzzles. 
     * Sends the blank puzzle to the client. Instead of listing star locations separately, all locations in each region should be listed as empty.
     */
    public send(fileName: string){
    }

    /**
     * @param fileName requests the puzzle identified by the fileName, without extension, in the subdirectory puzzles. 
     */
    public request(fileName: string){
    }

}