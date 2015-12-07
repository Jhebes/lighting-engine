// Functions for setting up and managing the grid

// How big to render
// I find that 50x35 is the best I can reasonably run on my system that
// looks good on a 1920x1080 screen
var X_CELLS = 50;
var Y_CELLS = 35;

var autosize = function( ){
    var docheight = window.innerHeight;
    var elem = document.getElementById( "canvas" );
    // Subtract the height of our menubar;
    // It would be better if I could do this dynamically
    docheight -= 50;

    // This is the height our doc should be
    elem.style.height = docheight;
};


function drawSquare( canvas, geometry, color ){
    if ( canvas.getContext ) {
        var context = canvas.getContext( '2d' );

        context.fillStyle = "rgb( " + color.r + ", " + color.g +", " + color.b + " )";
        context.fillRect (geometry.x, geometry.y, geometry.width, geometry.height );
    } else {
        // Browser doesn't support canvas
    }
}

// Returns an array of objects that correspond to the cells rendered
function drawGrid( canvas, x, y ){
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    canvas.width = width; 
    canvas.height = height;
    var cell_width = width / x;
    var cell_height = height / y;

    var cells = [];

    for( var i = 0; i < x; ++i ){
        cells[ i ] = [];
        for( var j = 0; j < y; ++j ){
            var geo = { x:i*cell_width, y:j*cell_height, width:cell_width, height: cell_height };
            var color = { r:0, g:0, b:0 };
            var cell = new Object();
            cell.geo = geo;
            cell.color = color;
            cell.wall = false;
            cell.render = function( ){
                drawSquare( canvas, this.geo, this.color );
            };
            cells[ i ][ j ] = cell;
        }
    }
    // Render all of the cells
    for( var i = 0; i < x; ++i ){
        for( var j = 0; j < y; ++j ){
            cells[ i ][ j ].render( );
        }
    }

    return cells;
}
// Based on an XY coordinate, return the cell that the mouse is over in terms
// of coordnates on the grid
function getCellIndex( cells, x, y ){
    // Get width and height of cells in the grid
    var w = cells[ 0 ][ 0 ].geo.width;
    var h = cells[ 0 ][ 0 ].geo.height;

    var index_x = 0;
    var index_y = 0;
    while( x > w ){
        x -= w;
        ++index_x;
    }
    while( y > h ){
        y -= h;
        ++index_y;
    }

    return { x:index_x, y:index_y };
}

