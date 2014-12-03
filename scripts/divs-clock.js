var DivsClock = $.inherit(Clock, {
    draw: function (domElem) {
        $(domElem).html('<div class="layer plate"></div>\n<div class="layer hours"></div>\n<div class="layer minutes"></div>\n<div class="layer seconds"></div>\n<div class="layer over"></div>');
        this.seconds = $(domElem).find('.seconds');
        this.minutes = $(domElem).find('.minutes');
        this.hours = $(domElem).find('.hours');
    },
    setHours: function (angle) {
        this.hours.css({'transform':   'rotateZ(' + angle + 'deg)'})
    },

    setMinutes: function (angle) {
        this.minutes.css({'transform':   'rotateZ(' + angle + 'deg)'})
    },

    setSeconds: function (angle, duration) {
        this.seconds.css({'transform':   'rotateZ(' + angle + 'deg)'})
    }
});