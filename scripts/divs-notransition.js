var DivsNotransition = $.inherit(DivsClock, {
    draw: function (domElem) {
        $(domElem).html('<div class="layer plate"></div>\n<div class="layer hours"></div>\n<div class="layer minutes"></div>\n<div class="layer seconds notransition"></div>\n<div class="layer over"></div>');
        this.seconds = $(domElem).find('.seconds');
        this.minutes = $(domElem).find('.minutes');
        this.hours = $(domElem).find('.hours');
    },

    tick: function() {
        //do nothing
    },

    smallTick: function(e, utctime) {
        this.showTime(utctime)
    }
});