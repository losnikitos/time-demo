var SvgClock = $.inherit(Clock, {
        draw: function (domElem) {
            var self = this;
            var svg = self.svg = SVG(domElem).viewbox(0, 0, 100, 100);

            var colors = {
                plate: '#F6F5F3',
                ticks: '#c5c5c4',
                arrows: '#212121',
                seconds: '#ED0600'
            };

            //plate
            svg.ellipse(100, 100)
                .fill('#F6F5F3');

            //ticks
            for (var i = 11; i >= 0; i--) {
                svg.rect(2.5, 5)
                    .move(48.75, 9)
                    .rotate(i * 30, 50, 50)
                    .fill(colors.ticks);
            }

            //arrows
            self.hours = svg.rect(3.25, 17)
                .move(48.375, 33)
                .attr('class', 'arrow')
                .fill(colors.arrows);

            self.minutes = svg.rect(3.25, 29)
                .move(48.375, 20)
                .attr('class', 'arrow')
                .fill(colors.arrows);

            // черная пипка
            svg.circle(7.5)
                .move(46.25, 46.25)
                .attr('class', 'arrow')
                .fill(colors.arrows);

            self.seconds = svg.rect(1.5, 31)
                .move(49.25, 19)
                .attr('class', 'arrow')
                .fill(colors.seconds);

            // красная пипка
            svg.circle(3.5)
                .move(48.25, 48.25)
                .attr('class', 'arrow')
                .fill(colors.seconds);
        },
        setHours: function (angle) {
            this.hours.rotate(angle, 50, 50);
        },
        setMinutes: function (angle) {
            this.minutes.rotate(angle, 50, 50);
        },
        setSeconds: function (angle, duration) {
            if (duration) {
                this.seconds.animate(duration, '-').rotate(angle, 50, 50);
            }
            else {
                this.seconds.rotate(angle, 50, 50);
            }
        }
    }
);