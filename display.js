var keywords = [ 'booty', 'Booty' ];


// get the output div using the classname
var poem_output = document.getElementsByClassName( 'poemdisplay' );
poem_output = poem_output[ 0 ];

var poem_html = '';
for ( var i=0; i < azlyrics.length; i++ )
  poem_html += azlyrics[ i ] + '<br/>';

for ( var i=0; i<keywords.length; i++ )
  poem_html = poem_html.split( keywords[ i ] )
                       .join( '<span class="highlight">' + keywords[ i ] + '</span>' );

poem_output.innerHTML = poem_html;
