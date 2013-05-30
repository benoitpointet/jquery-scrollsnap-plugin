// TODO allow for x scrollsnapping
(function( $ ) {

    $.fn.scrollsnap = function( options ) {

        var settings = $.extend( {
            'snaps' : '*',
            'proximity' : 12,
            'offset' : 0,
            'duration' : 200,
            'easing' : 'swing',
        }, options);

        return this.each(function() {

            var scrollingEl = this;

            if  (scrollingEl.scrollTop !== undefined) {
                // scrollingEl is DOM element (not document)
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
                        $(scrollingEl).animate({scrollTop: (matchingEl.offsetTop + settings.offset)}, settings.duration, settings.easing);
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
                        $('html, body').animate({scrollTop: ($(matchingEl).offset().top + settings.offset)}, settings.duration, settings.easing);
                    }

                });
            }

        });

    };

})( jQuery );
