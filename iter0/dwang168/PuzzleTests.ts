/**
 * Testing strategy:
 * 
 * constructor():
 *    partition on regions having fewer than 100 coordinates, 100 coordinates, more than 100 coordinates.
 *    partition on puzzleBoard having fewer than 10 subarrays, 10 subarrays, more than 10 subarrays.
 *    partition on puzzleBoard having no subarray not with 10 entries, at least one subarray no with 10 entries.
 * 
 * starPresent():
 *    partition on row: row ===0, row===9, row between 0 and 9 exclusive
 *    partition on row: column ===0, column===9, column between 0 and 9 exclusive
 *    partition on star: star not being present at row and column inputted, star being present at row and column inputted
 * 
 * addStar():
 *    partition on row: row ===0, row===9, row between 0 and 9 exclusive
 *    partition on row: column ===0, column===9, column between 0 and 9 exclusive
 *    partition on star: star not being present at row and column inputted, star being present at row and column inputted
 * 
 * removeStar():
 *    partition on row: row ===0, row===9, row between 0 and 9 exclusive
 *    partition on row: column ===0, column===9, column between 0 and 9 exclusive
 *    partition on star: star not being present at row and column inputted, star being present at row and column inputted
 * 
 * solvedStatus():
 *    partition on if puzzle is solved: puzzle is unsolved, puzzle is solved
 * 
 */