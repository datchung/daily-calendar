// Inspired by http://stackoverflow.com/a/23230280
// Wrapped in a module and made more reusable.

var swipe = (function (my) {
	function getDefault(func) {
		return typeof func !== 'undefined' ?  func : function() {};
	}

	/**
	 * Begin listening for swipes with actions in response to swipes.
	 * @param  {function} left  [description]
	 * @param  {function} right [description]
	 * @param  {function} up    [description]
	 * @param  {function} down  [description]
	 */
	my.listen = function(left, right, up, down) {
		console.log('listening for swipes');

		left = getDefault(left);
		right = getDefault(right);
		up = getDefault(up);
		down = getDefault(down);

		var xDown = null;                                                        
		var yDown = null;                                                        

		document.addEventListener('touchstart', handleTouchStart, false);        
		document.addEventListener('touchmove', handleTouchMove, false);

		function handleTouchStart(evt) {
		    xDown = evt.touches[0].clientX;                                      
		    yDown = evt.touches[0].clientY;   
		    left = getDefault(left);
		    left = getDefault(left);                                   
		}

		function handleTouchMove(evt) {
		    if ( ! xDown || ! yDown ) {
		        return;
		    }

		    var xUp = evt.touches[0].clientX;                                    
		    var yUp = evt.touches[0].clientY;

		    var xDiff = xDown - xUp;
		    var yDiff = yDown - yUp;

		    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
		        if ( xDiff > 0 ) {
		            console.log('left');
		            left();
		        } else {
		            console.log('right');
		            right();
		        }                       
		    } else {
		        if ( yDiff > 0 ) {
		            console.log('up');
		            up();
		        } else { 
		            console.log('down');
		            down();
		        }                                                                 
		    }
		    
		    xDown = null;
		    yDown = null;                                             
		}
	};

	return my;
}(swipe || {}));
