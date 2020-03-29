var clock = (() => {
    function Clock(container) {
        Clock.prototype.dateObject = new Date();
        Clock.prototype.templateHtml(container);
        Clock.prototype.startAutoUpdateClock();
    }
    Clock.prototype = {
        DOM: {
            getHr: () => document.querySelector(".clock__numbers .hours"),
            getMin: () => document.querySelector(".clock__numbers .minutes"),
            getSec: () => document.querySelector(".clock__numbers .seconds")
        },
        dateObject: null,
        date: {
            getHr: () => {
                let hr = Clock.prototype.dateObject.getHours();
                return Clock.prototype.addZeroBefore(hr) + hr;
            },
            getMin: () => {
                let min = Clock.prototype.dateObject.getMinutes();
                return Clock.prototype.addZeroBefore(min) + min;
            },
            getSec: () => {
                let sec = Clock.prototype.dateObject.getSeconds();
                return Clock.prototype.addZeroBefore(sec) + sec;
            }
        },
        addZeroBefore: (timeNum) => timeNum < 10 ? '0' : '',
        templateHtml: (container) => {
            let html = '<section class="clock">' +
                '<div class="clock__numbers">' +
                '<span class="hours">%hours%</span>' +
                '</div>' +
                '<span class="clock__colon">:</span>' +
                '<div class="clock__numbers">' +
                '<span class="minutes">%minutes%</span>' +
                '</div>' +
                '<span class="clock__colon">:</span>' +
                '<div class="clock__numbers">' +
                '<span class="seconds">%seconds%</span>' +
                '</div>' +
                '</section>'
            html = html.replace("%hours%", Clock.prototype.date.getHr());
            html = html.replace("%minutes%", Clock.prototype.date.getMin());
            html = html.replace("%seconds%", Clock.prototype.date.getSec());
            document.querySelector(container).insertAdjacentHTML('beforeend', html);
        },
        updateClock: () => {
            Clock.prototype.DOM.getHr().innerHTML = Clock.prototype.date.getHr();
            Clock.prototype.DOM.getMin().innerHTML = Clock.prototype.date.getMin();
            Clock.prototype.DOM.getSec().innerHTML = Clock.prototype.date.getSec();
        },
        clockInterval: null,
        startAutoUpdateClock: () => {
            Clock.prototype.clockInterval = setInterval(() => {
                Clock.prototype.dateObject = new Date();
                Clock.prototype.updateClock();
            }, 1000);
        },
        stopAutoUpdateClock: () => clearInterval(Clock.prototype.clockInterval)
    }

    return {
        init: () => {
            let clock = new Clock("main");
        }
    }
})();

clock.init();