/*
 * Testing strategy
 *
 * For addStar(row, col):
 *  partition on row=0, row=max, 0<row<max
 *  partition on column=0, column=max, 0<column<max
 *  partition on location already occupied, location not already occupied
 *  partition on valid placement, invalid placement
 *
 * For removeStar(row, col):
 *  partition on row=0, row=max, 0<row<max
 *  partition on column=0, column=max, 0<column<max
 *  partition on star exists at location, star doesn't exist at location
 *
 * For emptyStars():
 *  partition on no stars to empty, stars to empty
 *
 * For isSolved:
 *  partition on each row has exactly 2 stars, each row doesn't have exactly 2 stars
 *  partition on each column has exactly 2 stars, each column doesn't have exactly 2 stars
 *  partition on each region has exactly 2 stars, each region doesn't have exactly 2 stars
 */
