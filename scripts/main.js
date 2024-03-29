window.app = {
    init: function () {
        var self = this;
        var type = [localStorage.getItem('clock-type') || 'svg'];
        this.showClocks(type);
        this.utctime = Date.now();
        this.fps = 0;
        this.avgFps = 0;
        this.avgCount = 0;

        this.enableMenu(type);
        this.startRepaint();
    },

    startRepaint: function() {
        var repaint = $('input[type=checkbox]')[0].checked;
        var self = this;

        (function animloop(){
            self.tickk(Date.now());
            if(repaint) {
                setTimeout(animloop);
            } else {
                requestAnimFrame(animloop);
            }
        })();

        $('input[type=checkbox]').change(function() {
            repaint = this.checked;
        })
    },

    enableMenu: function(type) {
        var self = this;
        $('.nav .active').removeClass('active');
        $('.nav').find('li[data-type=' + type + ']').addClass('active');

        $('.nav li').click(function () {
            $('.nav .active').removeClass('active');
            $(this).addClass('active');
            var type = $(this).data('type');
            self.showClocks(type);
        });
    },

    showClocks: function (type) {
        var clockClass = {
            'svg': SvgClock,
            'svg-attrs': SvgAttrs,
            'divs': DivsClock,
            'divs-notransition': DivsNotransition,
            'canvas': CanvasClock,
            'opt-canvas': OptimizedCanvasClock
        }[type];

        $(app).off('tick');
        $(app).off('smallTick');
        this.avgCount = 0;

        clockClass.globalInit();


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

    tickk: function (utctime) {
        this.fps++;
        var delta = utctime - this.utctime;
        var ms = (this.utctime % 1000) || 1000;
        this.utctime = utctime;

        // Синхронизация, если тики слишком редко
        if (delta > 2000 || delta < 0) {
            console.log('SYNC: delta too big', delta);
        }

        $(app).trigger('smallTick', utctime);

        if (ms + delta > 1000) {
            this.countFps();
            $(app).trigger('tick', utctime);
        }
    },

    countFps: function(){
        if(this.avgCount==0) {
            this.avgCount = 1;
            this.avgFps = 0;
            this.fps = 0;
            return;
        }
        this.avgFps+=this.fps;
        this.avgCount++;
        $('.fps').text(this.fps + ' fps');
        $('.avg').text('(' + Math.round(this.avgFps/this.avgCount) + ' avg)');

        this.fps = 0;
    }
};

$(function () {
    app.init();
});

// Shim layer with setTimeout fallback by Paul Irish
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.msRequestAnimationFrame     ||
        function (c) { window.setTimeout(c, 1000 / 60) }
})();

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
