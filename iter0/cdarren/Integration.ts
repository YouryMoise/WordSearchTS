// Integration t.s. + tests
// plan for manual testing of entire client/server system (partitions and outline of manual test cases)
/* Partitions:
 * Partition on puzzle states:
 *  valid puzzle X| invalid puzzle X // ? can make more specific for each rule violated?
 *  Empty X| non-empty X
 *  Solved X| not solved X
 * Partition on user actions:
 *  adding stars to puzzle X| not adding stars to puzzle
 *  Removing stars from puzzle X| not removing stars from puzzle X
 *
 *
 *
 * Manual test: add and remove star to empty puzzle
 * Covers: add star to puzzle, empty puzzle, non-empty puzzle, not-solved, valid puzzle
 * 1. browse to home-page => assert that puzzle appears and is empty
 * 2. click on a grid cell to add star => assert that a star is added to the puzzle
 * 3. click on same grid cell to remove star => assert that a star is removed from the puzzle
 *
 * Manual test: add an illegal star to empty puzzle
 * Covers: invalid puzzle(row), not removing stars from puzzle
 * 1. browse to home-page => assert that puzzle appears and is empty
 * 2. click on adjacent cells horizontally so that there are 3 cells in the same row => assert that illegal behavior is observed // ? flesh out with actual behavior
 *
 * Manual test: solve puzzle
 * Covers: add stars to the puzzle to solve a puzzle
 * 1. browse to home-page => assert that puzzle appears and is empty
 * 2. click on cells successively so that the puzzle is solved => assert that solved behavior is observed // ? flesh out with actual behavior
 *
 */
