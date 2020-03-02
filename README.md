# Pokemon
Pokemon API project

TODO:
   Stabilize board dimensions to eliminate cell distortion as player moves

        -- make all cells same size

                DONE

        -- make board fit on one screen to remove vertical scroll

                DONE

   Make player stop disappearing when he reaches the edge of the board

        -- move function removes original class from player's cell even if he doesn't move to the new one

        -- fix that and it'll automatically work right

                DONE

   Make the playing field a lightgreen (grassy) kind of color

                DONE

   Prevent player from running over enemies

        -- collision detection

                DONE

            -- triggers battle

   Make the enemies invisible until player runs into them

        -- they have a "visible" property

        -- either empty the cell and add the image when needed
           or leave the images already in the cells and set display: none

                DONE (set display:none)

New TODO:

   Add more enemies

        -- since making the board (20x30) instead of (10x30) we have increased the available
        cells to 600 instead of 300, so 20 enemies just ain't cuttin' it any more

           Maybe needs some more testing, because pikachu dies pretty fast already if you get 
           carried away with the arrow keys

   Show player and enemy pics in the stat panel when the player encounters an enemy

        -- I'm thinking player on the left, enemy on the right of the stats text

           DONE

   Add Ash at the game winning spot cell 

        -- add routine for the win
        
           DONE -- randomized Ash's location and hid his sprite so he's invisible until 
           Pikachu finds him

   Extra Credit:

        -- added randomly placed berries that give Pikachu extra health

        -- added a scrolling background in the message viewport window

        -- tightened the output divs so they wouldn't jump around when the output changed

        -- refactored the move and isValid routines into smaller functions

        -- fixed a hack where the player could highlight the entire gameboard with the 
        mouse and see what cells had hidden pokemon in them

   Celebrate with champagne. It's all tophats and limousines from here on out!
   

           

   
