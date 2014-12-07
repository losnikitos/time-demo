var CanvasClock = $.inherit(Clock, {

    draw: function (domElem) {
        $(domElem).html('<div class="layer plate"></div><canvas class="layer" width="150" height="150"/>');
        this.canvas = $(domElem).find('canvas').get(0);
        var ctx = this.context = this.canvas.getContext("2d");
        ctx.translate(75, 75);
    },

    tick: function() {
        //do nothing
    },

    smallTick: function(e,utctime) {
        this.showTime(utctime + this.offset);
    },

    showTime: function(localtime) {
        this.context.clearRect(-75,-75,150, 150);
        var time = new Date(localtime);
        var h = time.getUTCHours(), m = time.getUTCMinutes(), s = time.getUTCSeconds(), ms = time.getUTCMilliseconds();

        this.setHours(360 / 12 * ((h + m / 60) % 12));
        this.setMinutes(360 / 60 * m);
        this.setSeconds(360 / 60 * (s + ms/1000));
    },

    setHours: function (angle) {
        var ctx = this.context;
        ctx.save();
        ctx.rotate(normalize(angle));
        ctx.strokeStyle = "black";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(40, 0);
        ctx.stroke();
        ctx.restore();
    },

    setMinutes: function (angle) {
        var ctx = this.context;
        ctx.save();
        ctx.rotate(normalize(angle));
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.lineTo(60, 0);
        ctx.stroke();
        ctx.restore();
    },

    setSeconds: function (angle) {
        var ctx = this.context;
        ctx.save();
        ctx.rotate(normalize(angle));
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-15, 0);
        ctx.lineTo(75, 0);
        ctx.stroke();
        ctx.restore();
    }
});

function normalize(angle) {
    return (angle - 90) / 180 * Math.PI
}