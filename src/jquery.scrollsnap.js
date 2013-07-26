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

            if (scrollingEl.scrollTop !== undefined) {
                // scrollingEl is DOM element (not document)
                $(scrollingEl).css('position', 'relative');

                $(scrollingEl).bind('scrollstop', function(e) {

                    var matchingEl = null, matchingDy = settings.proximity + 1;

                    $(scrollingEl).find(settings.snaps).each(function() {
                        var snappingEl = this,
                            dy = Math.abs(snappingEl.offsetTop + settings.offset - scrollingEl.scrollTop);

                        if (dy <= settings.proximity && dy < matchingDy) {
                            matchingEl = snappingEl;
                            matchingDy = dy;
                        }
                    });

                    if (matchingEl) {
                        var endScrollTop = matchingEl.offsetTop + settings.offset;
                        if($(scrollingEl).scrollTop() != endScrollTop) {
                            $(scrollingEl).animate({scrollTop: endScrollTop}, settings.duration, settings.easing);
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
                        var endScrollTop = $(matchingEl).offset().top + settings.offset;
                        if($(scrollingEl).scrollTop() != endScrollTop) {
                            $('html, body').animate({scrollTop: endScrollTop}, settings.duration, settings.easing);
                        }
                    }

                });
            }

        });

    };

})( jQuery );
