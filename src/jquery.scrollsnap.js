(function( $ ) {

    $.fn.scrollsnap = function( options ) {

        var settings = $.extend( {
            'direction': 'y',
            'snaps' : '*',
            'proximity' : 12,
            'offset' : 0,
            'duration' : 200,
            'easing' : 'swing',
        }, options);

        var leftOrTop = settings.direction === 'x' ? 'Left' : 'Top';

        return this.each(function() {

            var scrollingEl = this;

            if (scrollingEl['scroll'+leftOrTop] !== undefined) {
                // scrollingEl is DOM element (not document)
                $(scrollingEl).css('position', 'relative');

                $(scrollingEl).bind('scrollstop', function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $(scrollingEl).find(settings.snaps).each(function() {
                        var snappingEl = this,
                            dy = Math.abs(snappingEl['offset'+leftOrTop] + settings.offset - scrollingEl['scroll'+leftOrTop]);

                        if (dy <= settings.proximity && dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        var endScroll = matchingEl['offset'+leftOrTop] + settings.offset,
                            animateProp = {};
                        animateProp['scroll'+leftOrTop] = endScroll;
                        if ($(scrollingEl)['scroll'+leftOrTop]() != endScroll) {
                            $(scrollingEl).animate(animateProp, settings.duration, settings.easing);
                        }
                    }

                });

            } else if (scrollingEl.defaultView) {
                // scrollingEl is DOM document
                $(scrollingEl).bind('scrollstop', function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $(scrollingEl).find(settings.snaps).each(function() {
                        var snappingEl = this,
                            dy = Math.abs(($(snappingEl).offset()[leftOrTop.toLowerCase()] + settings.offset) - scrollingEl.defaultView['scroll'+settings.direction.toUpperCase()]);

                        if (dy <= settings.proximity && dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        var endScroll = $(matchingEl).offset()[leftOrTop.toLowerCase()] + settings.offset,
                            animateProp = {};
                        animateProp['scroll'+leftOrTop] = endScroll;
                        if ($(scrollingEl)['scroll'+leftOrTop]() != endScroll) {
                            $('html, body').animate(animateProp, settings.duration, settings.easing);
                        }
                    }

                });
            }

        });

    };

})( jQuery );
