// TODO allow for x scrollsnapping
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

        return this.each(function() {

            var scrollingEl = this;

            if (settings.direction === "x") {
              var offsetDirection = 'offsetLeft';
              var scrollDirection = 'scrollLeft';
            } else {
              var offsetDirection = 'offsetTop';
              var scrollDirection = 'scrollTop';
            }

            $.fn.scrollSomewhere = function() {
              if (settings.direction === "x") {
                $(this).scrollLeft();
              } else {
                $(this).scrollTop();
              }
            }

            if (scrollingEl[scrollDirection] !== undefined) {
                // scrollingEl is DOM element (not document)
                $(scrollingEl).css('position', 'relative');

                $(scrollingEl).bind('scrollstop', function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $(scrollingEl).find(settings.snaps).each(function() {
                        var snappingEl = this,
                            dy = Math.abs(snappingEl[offsetDirection] + settings.offset - scrollingEl[scrollDirection]);

                        if (dy <= settings.proximity && dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        var endScroll = matchingEl[offsetDirection] + settings.offset;
                        if (settings.direction === "x") {
                          var animateObj = {scrollLeft: endScroll};
                        } else {
                          var animateObj = {scrollTop: endScroll};
                        }
                        if($(scrollingEl).scrollSomewhere() != endScroll) {
                            $(scrollingEl).animate(animateObj, settings.duration, settings.easing);
                        }
                    }

                });

            } else if (scrollingEl.defaultView) {
                // scrollingEl is DOM document
                $(scrollingEl).bind('scrollstop', function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $(scrollingEl).find(settings.snaps).each(function() {
                        var snappingEl = this;

                        var dy = Math.abs(($(snappingEl).offset().top + settings.offset) - scrollingEl.defaultView.scrollY);

                        if (dy <= settings.proximity && dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        var endScroll = $(matchingEl).offset().top + settings.offset;
                        if (settings.direction === "x") {
                          var animateObj = {scrollLeft: endScroll};
                        } else {
                          var animateObj = {scrollTop: endScroll};
                        }
                        if($(scrollingEl).scrollSomewhere() != endScroll) {
                            $('html, body').animate(animateObj, settings.duration, settings.easing);
                        }
                    }

                });
            }

        });

    };

})( jQuery );
