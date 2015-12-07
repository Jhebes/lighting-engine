
// Load listeners that depend on elements being loaded
function loadHandlers( ){
    canvas.addEventListener( "mousemove", function( event ){
        // There's actually two big things happening here
        // First of all, we're converting the raw XY coords of the mouse to 
        // a relative postion on the canvas. In this way, we're agnostic to resizing
        // and scrolling.
        //
        // Secondly, getCellIndex() is using thes relative XY coords to translate to ANOTHER
        // set of XY coords which correspond to the XY index of a cell within the grid that the mouse
        // is on top of.
        var loc = getCellIndex( grid, event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop + document.body.scrollTop );
        // We check to see if we're still over the last cell we were last time the mouse was 
        // moved. I want to mitigate the amount of times I run A*, as it can get heavy
        // As such, we should only recompute when the index of the cell we're over changes.
        if( last == undefined || ( loc.x != last.x || loc.y != last.y ) ){
            last = loc;
            if( mousedown ){
                grid[ loc.x ][ loc.y ].wall = true;
                weight_graph[ loc.x ][ loc.y ] = 0;
                grid[ loc.x ][ loc.y ].color = {
                    r: 255,
                    g: 0,
                    b: 0
                };
                grid[ loc.x ][ loc.y ].render( );
            }else{ 
                var g = new Graph( weight_graph );
                if( grid[ loc.x ][ loc.y ].wall ){
                    for( var i = 0; i < X_CELLS; ++i ){
                        for( var j = 0; j < Y_CELLS; ++j ){
                            grid[ i ][ j ].color = {
                                r: 0,
                                g: 0,
                                b: 0
                            };
                            grid[ i ][ j ].render( );
                        }
                    }
                }else{
                    for( var i = 0; i < X_CELLS; ++i ){
                        for( var j = 0; j < Y_CELLS; ++j ){
                            if( grid[ i ][ j ].wall == false ){
                                var start = g.grid[ loc.x ][ loc.y ];
                                var end = g.grid[ i ][ j ]
                                    var dist = astar.search( g, start, end ).length; 
                                if( dist > 0 ){
                                    // Set intensity based on inverse square
                                    var light_transform = function( dist, pow ){
                                        return Math.floor( ( 1 / Math.pow( dist, pow ) ) * 255 );
                                    };
                                    grid[ i ][ j ].color = {
                                        r: light_transform( dist, 1.1 ),
                                        g: light_transform( dist, 1.1 ),
                                        b: light_transform( dist, 1.1 )
                                    };
                                }else{
                                    grid[ i ][ j ].color = {
                                        r: 0,
                                        g: 0,
                                        b: 0
                                    };
                                }
                                grid[ i ][ j ].render( );
                            }else{
                                grid[ i ][ j ].color = {
                                    r: 0,
                                    g: 0,
                                    b: 0
                                };
                                grid[ i ][ j ].render( );
                            }
                        }
                    }
                }    
                grid[ loc.x ][ loc.y ].color = { r:255, g:255, b:255 };
                grid[ loc.x ][ loc.y ].render( );
            }
        } 
    });

    document.getElementById( "reset-button" )
    .addEventListener( "click", function( ){
        // Essentially, reset our grid
        for( var i = 0; i < X_CELLS; ++i ){
            weight_graph[ i ] = [];
            for( var j = 0; j < Y_CELLS; ++j ){
                weight_graph[ i ][ j ] = 1;
            }
        }
        canvas = document.getElementById( "canvas" );
        grid = drawGrid( canvas, X_CELLS, Y_CELLS );
    });
        
}


// Run everything once the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    autosize(  );
    canvas = document.getElementById( "canvas" );
    grid = drawGrid( canvas, X_CELLS, Y_CELLS );
    for( var i = 0; i < X_CELLS; ++i ){
        weight_graph[ i ] = [];
        for( var j = 0; j < Y_CELLS; ++j ){
            if( grid[ i ][ j ].wall == false ){   
                weight_graph[ i ][ j ] = 1;
            }else{
                weight_graph[ i ][ j ] = 0;
            }
        }
    }
    // Load handlers for specific element
    loadHandlers( );

}, false);

// Do the same thing when the page is resized
window.addEventListener('resize', function(event){
    autosize( );
    canvas = document.getElementById( "canvas" );
    grid = drawGrid( canvas, X_CELLS, Y_CELLS );
});

// Track mouse button state
document.addEventListener( "mousedown", function( event ){
    mousedown = true;
});
document.addEventListener( "mouseup", function( event ){
    mousedown = false;
});


