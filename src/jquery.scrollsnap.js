(function( $ ) {

    /**
     * Underscore.js 1.5.2
     * http://underscorejs.org
     * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Underscore may be freely distributed under the MIT license.
     */
    function debounce (func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        return function() {
            context = this;
            args = arguments;
            timestamp = new Date();
            var later = function() {
                var last = (new Date()) - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) result = func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) result = func.apply(context, args);
            return result;
        };
    }

    $.fn.scrollsnap = function( options ) {

        var settings = $.extend( {
            'direction': 'y',
            'snaps' : '*',
            'proximity' : 12,
            'offset' : 0,
            'duration' : 200,
            'latency' : 250,
            'easing' : 'swing',
            'onSnapEvent' : 'scrollsnap', // triggered on the snapped DOM element
            'onSnap' : function ($snappedElement) { }, // callback when an element was snapped
            'onSnapWait' : 50 // wait for redundant snaps before firing event / calling callback
        }, options);

        var leftOrTop = settings.direction === 'x' ? 'Left' : 'Top',
            offsetLT = 'offset' + leftOrTop,
            scrollLT = 'scroll' + leftOrTop;

        return this.each(function() {

            var scrollingEl = this,
                $scrollingEl = $(scrollingEl);

            if (scrollingEl[scrollLT] !== undefined) {
                // scrollingEl is DOM element (not document)

                $scrollingEl.css('position', 'relative');

                var handler = function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $scrollingEl.find(settings.snaps).each(function() {
                        var snappingEl = this,
                            dy = Math.abs(snappingEl[offsetLT] + settings.offset - scrollingEl[scrollLT]);

                        if (dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        var endScroll = matchingEl[offsetLT] + settings.offset,
                            animateProp = {};
                        animateProp[scrollLT] = endScroll;
                        if ($scrollingEl[scrollLT]() != endScroll) {
                            $scrollingEl.animate(animateProp, settings.duration, settings.easing, debounce(function () {
                                var $matchingEl = $(matchingEl);

                                if (settings.onSnap) {
                                    settings.onSnap($matchingEl);
                                }

                                $matchingEl.trigger(settings.onSnapEvent);

                            }, settings.onSnapWait));
                        }
                    }

                };

                $scrollingEl.bind('scrollstop', {latency: settings.latency}, handler);

            } else if (scrollingEl.defaultView) {
                // scrollingEl is DOM document

                var handler = function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $scrollingEl.find(settings.snaps).each(function() {
                        var snappingEl = this,
                            $snappingEl = $(snappingEl),
                            dy = Math.abs(($snappingEl.offset()[leftOrTop.toLowerCase()] + settings.offset) - scrollingEl.defaultView['scroll'+settings.direction.toUpperCase()]);

                        if (dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        var $matchingEl = $(matchingEl),
                            endScroll = $matchingEl.offset()[leftOrTop.toLowerCase()] + settings.offset,
                            animateProp = {};
                        animateProp[scrollLT] = endScroll;
                        if ($scrollingEl[scrollLT]() != endScroll) {
                            $('html, body').animate(animateProp, settings.duration, settings.easing, debounce(function () {
                                if (settings.onSnap) {
                                    settings.onSnap($matchingEl);
                                }

                                $matchingEl.trigger(settings.onSnapEvent)
                            }, settings.onSnapWait));
                        }
                    }
                };

                $scrollingEl.bind('scrollstop', {latency: settings.latency}, handler);
                $(window).bind('resize', {latency: settings.latency}, handler);
            }
        });
    };

})( jQuery );
