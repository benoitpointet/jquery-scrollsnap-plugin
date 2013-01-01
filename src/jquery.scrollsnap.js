(function( $ ) {

    $.fn.scrollsnap = function( options ) {

        var settings = $.extend( {
            'offset' : -0,
            'proximity' : 50,
        }, options);

        var snapTo = function (el) {
            window.scrollTo(window.scrollX, el.offsetTop + settings.offset);
        };

        return this.each(function() {

            var $this = this;

            $(window).bind('scrollstop', function(e) {
                var y2 = $this.offsetTop - window.scrollY,
                distance = Math.abs(y2);

                if (settings.type == 'proximity' && distance <= settings.proximity) {
                    snapTo($this);
                }

                //console.log(y2, $this, $this.offsetTop);
            });

        });

    };

})( jQuery );
