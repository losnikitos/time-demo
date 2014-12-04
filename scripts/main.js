window.app = {
    init: function () {
        var self = this;
        var type = [localStorage.getItem('clock-type') || 'svg'];
        this.showClocks(type);

        $('.nav .active').removeClass('active');
        $('.nav').find('li[data-type=' + type + ']').addClass('active');


        $('.nav li').click(function () {
            $('.nav .active').removeClass('active');
            $(this).addClass('active');
            var type = $(this).data('type');
            self.showClocks(type);
        });

        //tick every 1s
        setInterval(function () {
            self.tick(Date.now())
        }, 1000);
    },

    showClocks: function (type) {
        var clockClass = {
            'svg': SvgClock,
            'divs': DivsClock,
            'canvas': CanvasClock
        }[type];

        var now = Date.now();

        this.clocks = [];
        for (var i = 0; i < 10; i++) {
            var domElem = $('.clock').get(i);
            $(domElem).empty();
            var offset = i * 1000 * 60 * 60; //i hours
            var clock = new clockClass(domElem, offset, now);
            this.clocks.push(clock);
        }

        localStorage.setItem('clock-type', type);
    },

    tick: function (utctime) {
        var self = this;
        self.clocks.forEach(function (clock) {
            clock.tick(utctime)
        });
    }
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
