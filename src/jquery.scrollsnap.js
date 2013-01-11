// TODO allow for x scrollsnapping
(function( $ ) {

    $.fn.scrollsnap = function( options ) {

        var settings = $.extend( {
            'offset' : 0,
            'proximity' : 12,
            'snaps' : '*',
        }, options);

        return this.each(function() {

            var scrollingEl = this;

            if  (scrollingEl.scrollTop !== undefined) {
                // scrollingEl is DOM element
                $(scrollingEl).css('position', 'relative');

                $(scrollingEl).bind('scrollstop', function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $(scrollingEl).find(settings.snaps).each(function() {
                        var snappingEl = this,
                            dy = Math.abs(snappingEl.offsetTop - scrollingEl.scrollTop);

                        if (dy <= settings.proximity && dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        $(scrollingEl).animate({scrollTop: (matchingEl.offsetTop + settings.offset)}, 200);
                    }

                });

            } else if (scrollingEl.defaultView) {
                // scrollingEl is DOM document
                $(scrollingEl).bind('scrollstop', function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $(scrollingEl).find(settings.snaps).each(function() {
                        var snappingEl = this;

                        var dy = Math.abs($(snappingEl).offset().top - scrollingEl.defaultView.scrollY);

                        if (dy <= settings.proximity && dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        scrollingEl.defaultView.scrollTo(scrollingEl.scrollX, $(matchingEl).offset().top + settings.offset);
                    }

                });
            }

        });

    };

})( jQuery );
