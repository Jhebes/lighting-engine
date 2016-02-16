# Lighting Engine
A 2D lighting engine rendered entirely in Javascript

## What is this?
**Short Story**: This is a *really* simple 2D lighting engine built on A*. Your mouse is the light source, and you can click and drag to create walls that block the light. 

**Longer version**: This is makes use of four major event handlers:
  - mousemove
  - click
  - DOMContentLoaded
  - resize
I use DOMContentLoaded and resize to generate a grid of cells onto a canvas element. The state of these cells is maintained in a 2D array of objects that contain the color and the geometry, as well as a function needed for the cell to draw itself. The resize listener ensures that the grid is always the exact size of your browser window. 

Once this is done, I listen for mousemove events and determine which cell the mouse is over. I set the color of this cell to 255 white. In order to appropriately light the other cells, I then path to every other cell with A* and set the brightness based on the length of the path. In this example, brightness falls off at a ratio proportional to the inverse square-root of the distance. Sort of. I found inverse square-root to fall off too quickly to be interesting, so the power of the denominator is actually around 1.1, which is approaching a linear fall off. As you can see, the pattern of light falloff is actually less circular than natural, and that's the reason. 

Finally, I've bound up click to start the process for creating walls, which ends when the mouse is released. These walls act as obstructions, preventing "light" from passing through them.

##Why A*?
There's probably better lighting pattern algorithms somewhere, but I picked A* for a few reasons. Primarily A* doesn't need to preprocess the graph. This is pretty huge, as creating an optimal route table for every cell to every other cell could be pretty costly, and I didn't want to have the page take a few seconds to load in. Additionally, as soon as you place a wall, _every_single_table_ would have to update. That's really just not practical. Something like A* can run on the fly for each node and be reasonably speedy. It may be possible to run something like Dijkstra's for each node, but I haven't done the calculations to determine if this is faster than running A* to every other node on the graph. However, the choice of algorithm here I think is beyond the scope of what I'm trying to accomplish here, as the end product will be the same either way; it will only affect how many cells I can reasonably have in my grid. Right now, I find I really can't better do than ~30x30 on my machine without lag. 

