var SvgAttrs = $.inherit(SvgClock, {
        tick: function (e, utctime) {
            //do nothing
        },

        smallTick: function (e, utctime) {
            var localtime = utctime + this.offset;
            this.showTime(localtime);
        },

        setHours: function (angle) {
            this.hours.attr('transform', 'rotate('+angle+' 50 50)');
        },
        setMinutes: function (angle) {
            this.minutes.attr('transform', 'rotate('+angle+' 50 50)');
        },
        setSeconds: function (angle) {
            this.seconds.attr('transform', 'rotate('+angle+' 50 50)');
        }
    }
);