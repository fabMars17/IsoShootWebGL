/* ============================================================
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/danro/jquery-easing/master/LICENSE
 * ======================================================== */
//also see here : http://easings.net/fr && http://www.robertpenner.com/easing/
//and here http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
//exemple easeOutBounce(speedcurvepre,0,1, 1); always 0,1,1 at the end
var easingfnl = {
	// t: current time, b: begInnIng value, c: change In value, d: duration

	easeInQuad: function (t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
};
//exemple easeOutBounce(speedcurvepre,0,1, 1); always 0,1,1 at the end
var easingfns = {
	// t: current time, b: begInnIng value, c: change In value, d: duration
        easeInQuad: function (t) {return t*t;},
	easeOutQuad: function (t) {return -t*(t-2);},
	easeInOutQuad: function (t) {return t<.5 ? 2*t*t : -1+(4-2*t)*t;},
	easeInCubic: function (t) {return t*t*t;},
	easeOutCubic: function (t) {return (--t)*t*t+1;},
	easeInOutCubic: function (t) {return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;},
	easeInQuart: function (t) {return t*t*t*t;},
	easeOutQuart: function (t) {return 1-(--t)*t*t*t ;},
	easeInOutQuart: function (t) {return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;},
	easeInQuint: function (t) {return t*t*t*t*t;},
	easeOutQuint: function (t) {return 1+(--t)*t*t*t*t;},
	easeInOutQuint: function (t) {return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t;},
        //so far factorization is good, after maybe we could fatorize more
	easeInSine: function (t) {return -1 * Math.cos(t * (Math.PI/2)) + 1;},
	easeOutSine: function (t) {return  Math.sin(t * (Math.PI/2)) ;},
	easeInOutSine: function (t) {return -1/2 * (Math.cos(Math.PI*t) - 1);},
	easeInExpo: function (t) {return (t===0) ? 0 : 1 * Math.pow(2, 10 * (t - 1));},
	easeOutExpo: function (t) {return (t===1) ? 1 : 1 * (-Math.pow(2, -10 * t) + 1);},
	easeInOutExpo: function (t) {
		if (t===0) return 0;
		if (t===1) return 1;
		if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
		return 1/2 * (-Math.pow(2, -10 * --t) + 2);
	},
	easeInCirc: function (t) {return -1 * (Math.sqrt(1 - t*t) - 1);},
	easeOutCirc: function (t) {return Math.sqrt(1 - (t=t-1)*t);},
	easeInOutCirc: function (t) {
		if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
		return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
	},
	easeInElastic: function (t) {
		var s=1.70158;var p=0;var a=1;
		if (t===0) return 0;  if (t===1) return 1;  if (!p) p=.3;
		if (a < Math.abs(1)) { var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (a);
		return -(Math.pow(2,15*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));//ref new 15 to old 10
	},
	easeOutElastic: function (t) {
		var s=1.70158;var p=0;var a=1;
		if (t===0) return 0;  if (t===1) return 1;  if (!p) p=.3;
		if (a < Math.abs(1)) { var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (1/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
	},
	easeInOutElastic: function (t) {
		var s=1.70158;var p=0;var a=1;
		if (t===0) return 0;  if ((t/=1/2)===2) return 1;  if (!p) p=(.3*1.5);
		if (a < Math.abs(1)) { var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (1/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
	},
	easeInBack: function (t, s) {
		if (s === undefined) s = 1.70158;
		return (t/=1)*t*((s+1)*t - s);
	},
	easeOutBack: function (t, s) {
		if (s === undefined) s = 1.70158;
		return ((t=t-1)*t*((s+1)*t + s) + 1);
	},
	easeInOutBack: function (t, s) {
		if (s === undefined) s = 1.70158; 
		if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
		return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
	},
	easeInBounce: function (t) {
		return 1 - easingfns.easeOutBounce ( 1-t);
	},
	easeOutBounce: function (t) {
		if (t < (1/2.75)) {
			return (7.5625*t*t);
		} else if (t < (2/2.75)) {
			return (7.5625*(t-=(1.5/2.75))*t + .75);
		} else if (t < (2.5/2.75)) {
			return (7.5625*(t-=(2.25/2.75))*t + .9375);
		} else {
			return (7.5625*(t-=(2.625/2.75))*t + .984375);
		}
	},
	easeInOutBounce: function (t) {
		if (t < 1/2) return easingfns.easeInBounce ( t*2) * .5;
		return easingfns.easeOutBounce ( t*2-1) * .5 + .5;
	}
};