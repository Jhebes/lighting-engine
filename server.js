// Josh Hebert

var express = require( "express" );
var app = express();


// For now, give whatever you need
app.get( '/*', function( req, res ){
    res.sendFile( __dirname + req.url );
                               
});

// Launch the server
var port = process.env.PORT || 5000;
app.listen( port, function( ) {
    console.log( "Listening on " + port );
});
