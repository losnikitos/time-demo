var OptimizedCanvasClock = $.inherit(Clock, {

    draw: function (domElem) {
        // канвас для часовой и минутной стрелок
        this.hmCanvas = document.createElement('canvas');
        this.hmCanvas.width = 150;
        this.hmCanvas.height = 150;
        this.hmCtx = this.hmCanvas.getContext('2d');

        this.scale = getPixelRatio(this.hmCtx);
        this.hmCtx.translate(75, 75);

        $(domElem).html('<div class="layer plate"></div><canvas class="layer" width="150" height="150"/>');

        var canvas = $(domElem).find('canvas').get(0);
        var ctx = this.context = canvas.getContext("2d");
        ctx.translate(75, 75);
    },

    // Копируем контексты в один
    smallTick: function (e, utctime) {
        this.context.clearRect(-75, -75, 150, 150);
        this.context.drawImage(this.hmCanvas, this.scale*-75, this.scale*-75);
        this.context.drawImage(this.__self.secondsCanvas, this.scale*-75, this.scale*-75);
    },

    // Раз в минуту рисуем черные стрелки в оффскрин-контексте
    tick: function (e, utctime) {
        var time = new Date(utctime + this.offset);
        var h = time.getUTCHours(), m = time.getUTCMinutes(), s = time.getUTCSeconds();

        this.hmCtx.clearRect(-75, -75, 150, 150);
        this.__self.drawArrow(360 / 12 * ((h + m / 60) % 12), 'hours', this.hmCtx);
        this.__self.drawArrow(360 + 360 / 60 * m, 'minutes', this.hmCtx);
    }
}, {
    globalInit: function () {
        console.log('globalInit');
        $(app).on('smallTick', this.smallTick.bind(this));

        this.secondsCanvas = document.createElement('canvas');
        this.secondsCanvas.width = 150;
        this.secondsCanvas.height = 150;
        this.secondsCtx = this.secondsCanvas.getContext('2d');
        this.secondsCtx.translate(75, 75);

        //console.log('global scale=', getPixelRatio(this.secondsCtx));
    },

    // 60 раз в секунду обновляем глобальную картинку с красной стрелкой
    smallTick: function (e, utctime) {
        var time = new Date(utctime);
        var s = time.getUTCSeconds(), ms = time.getUTCMilliseconds();

        this.secondsCtx.clearRect(-75, -75, 150, 150);
        this.drawArrow(360 / 60 * (s + ms / 1000), 'seconds', this.secondsCtx);
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

var getPixelRatio = function (context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
};
