var OptimizedCanvasClock = $.inherit(Clock, {
    __constructor: function() {
        this.__base.apply(this,arguments);
        $(app).on('tick', this.tick.bind(this));
        $(app).on('smallTick', this.smallTick.bind(this));
    },

    draw: function (domElem) {
        // канвас для часовой и минутной стрелок
        this.hmCanvas = document.createElement('canvas');
        this.hmCanvas.width = 150;
        this.hmCanvas.height = 150;
        this.hmCtx = this.hmCanvas.getContext('2d');
        this.hmCtx.translate(75, 75);

        $(domElem).html('<div class="layer plate"></div><canvas class="layer" width="150" height="150"/>');

        var canvas = $(domElem).find('canvas').get(0);
        var ctx = this.context = canvas.getContext("2d");
        ctx.translate(75, 75);
    },

    // Копируем контексты в один
    smallTick: function(e, utctime) {
        this.context.clearRect(-75,-75,150,150);
        //this.context.rect(-75, -75, 150, 150);
        //this.context.lineWidth = utctime % 100;
        //this.context.stroke();

        this.context.drawImage(this.hmCanvas, -75, -75);
        this.context.drawImage(this.__self.secondsCanvas, -75, -75);
        //console.log('smalltick local', utctime);
    },

    // Раз в минуту рисуем черные стрелки в оффскрин-контексте
    tick: function (e, utctime) {
        var time = new Date(utctime + this.offset);
        var h = time.getUTCHours(), m = time.getUTCMinutes(), s = time.getUTCSeconds();
        //if (s == 0) {
        this.hmCtx.clearRect(-75, -75, 150, 150);
            this.__self.drawArrow(360 / 12 * ((h + m / 60) % 12), 'hours', this.hmCtx);
            this.__self.drawArrow(360 + 360 / 60 * m, 'minutes', this.hmCtx);
        //}
        //console.log('tick local');
    }
}, {
    globalInit: function () {
        $(app).on('smallTick', this.smallTick.bind(this));

        this.secondsCanvas = document.createElement('canvas');
        this.secondsCanvas.width = 150;
        this.secondsCanvas.height = 150;
        this.secondsCtx = this.secondsCanvas.getContext('2d');
        this.secondsCtx.translate(75, 75);
    },

    // 60 раз в секунду обновляем глобальную картинку с красной стрелкой
    smallTick: function(e, utctime) {
        var time = new Date(utctime);
        var s = time.getUTCSeconds(), ms = time.getUTCMilliseconds();

        this.secondsCtx.clearRect(-75, -75, 150, 150);
        this.drawArrow(360 / 60 * (s + ms/1000), 'seconds', this.secondsCtx);
        //console.log(utctime);
        //console.log(360 / 60 * (s + ms/1000));
        //console.log('smalltick global');
    },

    arrows: {
        seconds: {
            width: 2,
            color: 'red',
            start: -15,
            end: 75
        },
        minutes: {
            width: 3,
            color: 'black',
            start: -10,
            end: 60
        },
        hours: {
            width: 8,
            color: 'black',
            start: -10,
            end: 40
        }
    },

    drawArrow: function (angle, type, ctx) {
        var arrow = this.arrows[type];
        ctx.save();
        ctx.rotate(normalize(angle));
        ctx.strokeStyle = arrow.color;
        ctx.lineWidth = arrow.width;
        ctx.beginPath();
        ctx.moveTo(arrow.start, 0);
        ctx.lineTo(arrow.end, 0);
        ctx.stroke();
        ctx.restore();
    }
});

function normalize(angle) {
    return (angle - 90) / 180 * Math.PI
}

//if (this.time.m == 59 && m == 0) {
//    this.full.minutes++
//}
//if (this.time.s == 59 && s == 0) {
//    this.full.seconds++
//}
//this.time = {h:h, m:m, s:s};