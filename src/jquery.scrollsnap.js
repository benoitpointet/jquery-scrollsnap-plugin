(function( $ ) {
    $.fn.scrollsnap = function( options ) {

        return this.each(function() {
            var settings = $.extend( {
                'offset' : 0,
                'proximity' : 24,
                'type': 'proximity'
            }, options),
                y = 0,
                snap = false,
                $this = this;

            var snapTo = function (el, duration) {
                if (duration) {
                    snap = true;
                    window.setTimeout(function(){snap = false}, duration);
                }
                window.scrollTo(window.scrollX, el.offsetTop + settings.offset);
            };

            $(document).scroll(function (e) {
                var y2 = $this.offsetTop + settings.offset - window.scrollY,
                    distance = Math.abs(y2),
                    crossed = y * y2 < 0;

                if (snap && settings.type == 'mandatory') {
                    snapTo($this);
                } else {
                    if (settings.type == 'proximity' && distance <= settings.proximity) {
                        snapTo($this, 800);
                    }

                    if (settings.type == 'mandatory' && crossed) {
                        snapTo($this, 800);
                    }
                }


                y = y2;
            });
        });
    };
})( jQuery );
