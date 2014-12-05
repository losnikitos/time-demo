var Clock = $.inherit({
    __constructor: function (domElem, offset, utctime) {
        {
            var self = this;
            self.offset = offset;
            self.full = {hours: 0, minutes: 0, seconds: 0};

            self.draw(domElem);
            self.showTime(utctime + offset, 0);

            //self.showTime(utctime + offset + 1000, 1000);
        }
    },

    tick: function (e, utctime) {
        var self = this;
        var localtime = utctime + self.offset;
        self.showTime(localtime, 1000);
    },

    showTime: function (localtime, duration) {
        var time = new Date(localtime + duration);
        var h = time.getUTCHours(), m = time.getUTCMinutes(), s = time.getUTCSeconds();

        //console.log(time, duration);
        if (m == 0) {
            this.full.minutes++
        }
        if (s == 0) {
            this.full.seconds++
        }

        this.setHours(360 / 12 * ((h + m / 60) % 12));
        this.setMinutes(this.full.minutes * 360 + 360 / 60 * m);
        this.setSeconds(this.full.seconds * 360 + 360 / 60 * s, duration);
    },

    smallTick: function(utctime) {
        //do nothing unless overridden
    },

    setHours: function(angle) {
        //override me
    },

    setMinutes: function(angle) {
        //override me
    },

    setSeconds: function(angle, duration) {
        //override me
    }
}, {
    globalInit: function() {
        //override me
    }
});