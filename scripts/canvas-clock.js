var CanvasClock = $.inherit(Clock, {

    draw: function (domElem) {
        $(domElem).html('<canvas width="150" height="150"/>');
        this.canvas = $(domElem).find('canvas').get(0);
        var ctx = this.context = this.canvas.getContext("2d");
        ctx.translate(75, 75);
    },

    showTime: function() {
        this.context.clearRect(-75,-75,150, 150);
        this.__base.apply(this, arguments);
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

    setSeconds: function (angle, duration) {
        var ctx = this.context;
        ctx.save();
        ctx.rotate(normalize(angle));
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
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