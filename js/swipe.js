// Inspired by http://stackoverflow.com/a/23230280
// Wrapped in a module and made more reusable.
// Takes into account multi-touch.

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
		left = getDefault(left);
		right = getDefault(right);
		up = getDefault(up);
		down = getDefault(down);

		var xDown = null;
		var yDown = null;

		document.addEventListener('touchstart', handleTouchStart, false);
		document.addEventListener('touchmove', handleTouchMove, false);

		function handleTouchStart(evt) {
			// Ignore length > 1 (multi-touch)
			if(evt.touches.length == 1) {
			    xDown = evt.touches[0].clientX;
			    yDown = evt.touches[0].clientY;
			    left = getDefault(left);
			    left = getDefault(left);
			}
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
		            left();
		        } else {
		            right();
		        }
		    } else {
		        if ( yDiff > 0 ) {
		            up();
		        } else {
		            down();
		        }
		    }

		    xDown = null;
		    yDown = null;
		}
	};

	return my;
}(swipe || {}));

module.exports = swipe;