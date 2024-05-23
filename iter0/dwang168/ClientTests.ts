/**
 * Testing strategy:
 * 
 * constructor():
 *    partition on currentBoard: currentBoard is invalid, currentBoard is already solved, currentBoard is valid and unsolved
 * 
 * solvedStatus():
 *    partition on if puzzle is solved: puzzle is unsolved, puzzle is solved
 * 
 * updatedPuzzle():
 *    partition on newPuzzle: different from currentBoard, same as currentBoard
 * 
 * currentPuzzleName():
 *    partition on puzzleName: length=0, length=1, length>1
 * 
 * currentPuzzleStatus():
 *    partition on if puzzle is solved: puzzle is unsolved, puzzle is solved
 *    partition on if puzzle is empty, not empty
 * 
 */