# Pokemon
Pokemon API project

TODO:
   Stabilize board dimensions to eliminate cell distortion as player moves
        -- make all cells same size
        -- make board fit on one screen to remove vertical scroll

   Make player stop disappearing when he reaches the edge of the board
        -- move function removes original class from player's cell even if he doesn't move to the new one
        -- fix that and it'll automatically work right

   Make the playing field a lightgreen (grassy) kind of color

   Prevent player from running over enemies
        -- collision detection
            -- triggers battle

   Make the enemies invisible until player runs into them
        -- they have a "visible" property
        -- either empty the cell and add the image when needed
           or leave the images already in the cells and set display: none

           
