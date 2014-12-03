window.app = {
    init: function () {
        var self = this;
        for (var i = 0; i < 10; i++) {
            var domElem = $('.clock').get(i);
            var offset = i * 1000 * 60 * 60; //i hours
            var clock = new DivsClock(domElem, offset, Date.now());
            self.clocks.push(clock);
        }

        //tick every 1s
        setInterval(function () {
            self.tick(Date.now())
        }, 1000);
    },

    tick: function (utctime) {
        var self = this;
        self.clocks.forEach(function (clock) {
            clock.showTime(utctime, 1000)
        });
    },

    clocks: []
};

$(function () {
    app.init();
});



//var strategies = {
//    everyFrame: function () {
//        function repaintInNextFrame() {
//            self.tick();
//            requestAnimationFrame(repaintInNextFrame, self.domElem);
//        }
//
//        repaintInNextFrame();
//    },
//    withInterval: function () {
//        function repaintInNextFrame() {
//            requestAnimationFrame(function () {
//                self.tick()
//            }, self.domElem);
//        }
//        setInterval(repaintInNextFrame, 100); //to have 25 fps
//    },
//    onTick: function () {
//        BEM.channel('sys').on('tick', self.tick, self);
//    },
//    everySecond: function () {
//        function rep() {
//            var difference = new Date() - self.timestamp;
//            if (difference > 1000) {
//                self.time = new Date(self.time.getTime() + difference);
//                self.timestamp = new Date(self.timestamp.getTime() + difference);
//                self.tick(self.time);
//            }
//        }
//
//        BEM.channel('sys').on('tick', rep);
//    }
//}