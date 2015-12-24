// http://stackoverflow.com/a/23230280

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            console.log('left');
        } else {
            /* right swipe */
            console.log('right');
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            console.log('up');
        } else { 
            /* down swipe */
            console.log('down');
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}