(function( $ ) {
    $.fn.scrollsnap = function() {

        return this.each(function() {
            var y = 0,
                $this = this;

             $(document).scroll(function (e) {
                var y2 = $this.offsetTop - window.scrollY,
                    distance = Math.abs(y2),
                    crossed = y * y2 < 1;

                if (distance < 20) {
                    window.scrollTo(window.scrollX, $this.offsetTop);
                }

                //console.log($($this).html(), distance);

                y = y2;
            });
        });
    };
})( jQuery );
