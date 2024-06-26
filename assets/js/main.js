function owlCarouselInit() {
    "use strict";
    var t = $("#main-slider"),
        e = $(".about-slider"),
        o = $(".partner-slider"),
        n = $(".testimonial-slider"),
        a = '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        l = '<i class="fa fa-angle-left" aria-hidden="true"></i>';

    t.length && t.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        navText: [l, a],
        dots: true,
        autoplay: false,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    e.length && e.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        navText: [l, a],
        dots: false,
        autoplay: false,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    n.length && n.owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        navText: [l, a],
        dots: true,
        autoplay: false,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    o.length && o.owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        navText: [l, a],
        dots: false,
        autoplay: true,
        responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 4 }
        }
    });
}

function initMap() {
    "use strict";
    var t = $("#gmap_canvas");
    if (t.length) {
        var e = {
            zoom: 5,
            scrollwheel: false,
            draggable: true,
            center: new google.maps.LatLng(22.9623, 76.0508),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var o = new google.maps.Map(document.getElementById("gmap_canvas"), e);
        var n = new google.maps.Marker({
            map: o,
            position: new google.maps.LatLng(22.9623, 76.0508)
        });
        var a = new google.maps.InfoWindow({
            content: "<strong>ITGEEkS</strong>"
        });
        google.maps.event.addListener(n, "click", function () {
            a.open(o, n)
        });
        a.open(o, n)
    }
}

function comingsoonInt() {
    "use strict";
    var t = new Date("Dec 24, 2024 15:37:25").getTime();
    setInterval(function () {
        var e = (new Date).getTime(),
            o = t - e,
            n = Math.floor(o / 864e5),
            a = Math.floor(o % 864e5 / 36e5),
            l = Math.floor(o % 36e5 / 6e4),
            i = Math.floor(o % 6e4 / 1e3);
        document.getElementById("days").innerHTML = n,
            document.getElementById("hours").innerHTML = a,
            document.getElementById("seconds").innerHTML = i,
            document.getElementById("minutes").innerHTML = l
    }, 1e3)
}

$(window).on("load", function () {
    "use strict";
    var t = $(".preloader"),
        e = $(".count-number"),
        o = $("#coming-soon-timer"),
        n = $("#mixItUp"),
        a = $(".progress-bar"),
        l = $('[data-toggle="tooltip"]'),
        i = $(".sticky-nav"),
        r = $("#scroll-top"),
        s = $('a[href*="#"]'),
        c = $("html, body");

    i.length && $(window).on("scroll", function () {
        $(this).scrollTop() > 30 ? i.addClass("sticky-header") : i.removeClass("sticky-header")
    });

    t.length && t.addClass("loaderout");

    e.appear(function () {
        $(this).each(function () {
            var t = $(this).attr("data-count");
            $(this).find(".counter").delay(6e3).countTo({
                from: 10,
                to: t,
                speed: 8e3,
                refreshInterval: 50
            })
        })
    });

    owlCarouselInit();

    o.length && comingsoonInt();

    r.length && (r.on("click", function () {
        c.animate({ scrollTop: 0 }, 2e3)
    }), $(window).on("scroll", function () {
        $(this).scrollTop() > 500 ? r.addClass("showScrollTop") : r.removeClass("showScrollTop")
    }));

    s.on("click", function (t) {
        t.preventDefault(), c.animate({ scrollTop: $($(this).attr("href")).offset().top }, 1e3, "linear")
    });

    n.length && n.mixItUp();

    a.length && a.appear(function () {
        l.tooltip({ trigger: "manual" }).tooltip("show");
        a.each(function () {
            var t = $(this).attr("aria-valuenow");
            $(this).width(t + "%")
        })
    })
});

var pieChart = $(".chart");
if (pieChart.length) {
    var drawPieChart = function (t, e) {
        var o = document.getElementById("pie"),
            n = o.getContext("2d"),
            a = o.width / 2;
        y = o.height / 2;
        for (var l, i, r, s = getTotal(t), c = 0; c < t.length; c++)
            l = e[c],
                i = calculateStart(t, c, s),
                r = calculateEnd(t, c, s),
                n.beginPath(),
                n.fillStyle = l,
                n.moveTo(a, y),
                n.arc(a, y, y - 20, i, r),
                n.fill()
    },
        calculatePercent = function (t, e) {
            return (t / e * 100).toFixed(2)
        },
        getTotal = function (t) {
            for (var e = 0, o = 0; o < t.length; o++)
                e += t[o].value;
            return e
        },
        calculateStart = function (t, e, o) {
            return 0 === e ? 0 : calculateEnd(t, e - 1, o)
        },
        calculateEndAngle = function (t, e, o) {
            var n = t[e].value / o * 360,
                a = 0 === e ? 0 : calculateEndAngle(t, e - 1, o);
            return n + a
        },
        calculateEnd = function (t, e, o) {
            return degreeToRadians(calculateEndAngle(t, e, o))
        },
        degreeToRadians = function (t) {
            return t * Math.PI / 180
        },
        data = [
            { label: "Won", value: 90 },
            { label: "Compro", value: 80 },
            { label: "Lose", value: 5 },
            { label: "Leave", value: 5 }
        ],
        colors = ["#3eb36d", "#3ca7ab", "#e37d39", "#de4e4e"];
    drawPieChart(data, colors)
}

var locationMap = $(".itg_map_location");
if (locationMap.length) {
    $(function () {
        var t = {
            paris: { latitude: 48.86, longitude: 2.3444444444444, tooltip: { content: "Paris" } },
            tokyo: { latitude: 35.689488, longitude: 139.691706, tooltip: { content: "Tokyo" } },
            moscow: { latitude: 55.755786, longitude: 37.617633, tooltip: { content: "Moscow" } },
            los_angeles: { latitude: 34.052234, longitude: -118.243685, tooltip: { content: "Los Angeles" } },
            punta_arenas: { latitude: -53.163833, longitude: -70.917068, tooltip: { content: "Punta Arenas" } },
            aukland: { latitude: -36.84846, longitude: 174.763332, tooltip: { content: "Aukland" } },
            kiruna: { latitude: 67.855737, longitude: 20.225231, tooltip: { content: "Kiruna" } },
            reykjavik: { latitude: 64.135338, longitude: -21.89521, tooltip: { content: "Reykjavík" } },
            alert: { latitude: 82.516305, longitude: -62.308482, tooltip: { content: "Alert" } },
            wales: { latitude: 65.609167, longitude: -168.0875, tooltip: { content: "Wales" } },
            tiksi: { latitude: 71.625094, longitude: 128.872883, tooltip: { content: "Tiksi" } },
            pretoria: { latitude: -25.746019, longitude: 28.18712, tooltip: { content: "Pretoria" } },
            india: { latitude: 20.5937, longitude: 78.9629, tooltip: { content: "India" } }
        },
            e = function (t) { return $(t.node).attr("data-id") };

        $(".mapcontainer_equi").mapael({
            map: { name: "world_countries", defaultArea: { tooltip: { content: e } } },
            plots: t
        });

        $(".mapcontainer_merc").mapael({
            map: { name: "world_countries_mercator", defaultArea: { tooltip: { content: e } } },
            plots: t
        });

        $(".mapcontainer_miller").mapael({
            map: { name: "world_countries_miller", defaultArea: { tooltip: { content: e } }, defaultPlot: { size: 9 } },
            plots: t
        });
    });
}
