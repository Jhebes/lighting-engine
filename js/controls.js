// Manages the buttons at the bottom to demonstrate bubbling and capturing

document.getElementById( "bubblespan" ).addEventListener( "click", function( event ){
    console.log( "I execute second, because I execute in the bubble phase" );
}, false);

document.getElementById( "bubblebutton" ).addEventListener( "click", function( event ){
    console.log( "I execute first, because I run in the target phase" );
});


document.getElementById( "capturespan" ).addEventListener( "click", function( event ){
    console.log( "I execute first, because I run in the capture phase" );
}, true);

document.getElementById( "capturebutton" ).addEventListener( "click", function( event ){
    console.log( "I execute second, because I run in the target phase" );
});
