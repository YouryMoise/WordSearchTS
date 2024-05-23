/*
    Plan for manual testing 

    Start the game and request a blank puzzle from the server

    1.
        Try to add a star in each corner, then immediately try to remove each
        We should see a star appear and disappear in that exact sqaure.

    2. 
        Try to add a star on each side, then immediately try to remove each
        We should see a star appear and disappear in that exact sqaure.

    3. 
        Try to add a star in the center and remove it
        We should see a star appear and disappear in that exact sqaure.

    4. 
        Add stars in a winning configuration without removing any
        We should see the stars appear then get a signal from the ADT
        telling us that we have won.

    5. 
        Add stars in a winning configuration after having to remove some stars
        We should see the stars appear/disappear then get a signal from the ADT
        telling us that we have won.







*/