$(function () {
    $.ajaxSetup({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
    });


    $('.trener__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        //adaptiveHeight: true,
    });
    $('.gallery__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        //adaptiveHeight: true,
    });

    //################ PLAN SELECT MOBILE
    $('.plan__nav-mobile select').on("change", function () {
        var index = this.selectedIndex;
        $('.plan__block-item').hide();
        $('.plan__block-item').eq(index).fadeIn();
    });
    $('.plan__md a').on("click", function () {
        var index = $(this).parent('li').index();
        $('.plan__md li').removeClass('select');
        $(this).parent('li').addClass('select');
        $('.plan__block-item').hide();
        $('.plan__block-item').eq(index).fadeIn();
    });


    $('.plan__btn-wrap-1 a').on("click", function () {
        var row = $(this).parents('.plan__block-item-row');
        var id1 = $(row).find('.plan__text-1').text();
        var id2 = $(row).find('.plan__text-2').text();
        var id3 = $(row).find('.plan__text-3 span').eq(0).text() + ' и ' + $(row).find('.plan__text-3 span').eq(1).text();
        var id4 = 'м. ' + $(row).find('.plan__text-4').text();
        var id5 = id1 + ' ' + id2 + ' ' + id3 + ' ' + id4;
        $('.modal-title-desc').eq(0).text(id1);
        $('.modal-title-desc').eq(1).text(id2);
        $('.modal-title-desc').eq(2).text(id3);
        $('.modal-title-desc').eq(3).text(id4);
        $('#modal-detail2').val(id5);
    });

    $(function () {
        $(document).on({
            ajaxStart: function () {
                $('body').append("<div id='ajax-loading'></div>");
            },
            ajaxStop: function () {
                $('#ajax-loading').remove();
            }
        });
    });

    $(window).on('hashchange', function () {
        if (window.location.hash) {
            var hash = window.location.hash.substring(1);
            if (hash.indexOf('ajax') + 1) {
                $.ajax({
                    type: 'POST',
                    url: hash,
                    data: '',
                    success: function (data) {
                        $('body').append(data);
                        $('#js-modal-ajax-plan').modal('show');
                    }
                    ,
                    error: function (xhr, str) {
                        alert('Возникла ошибка, попробуйте ещё раз!');
                    }
                });
            }
        }
    });
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        if (hash.indexOf('ajax') + 1) {
            $.ajax({
                type: 'POST',
                url: hash,
                data: '',
                success: function (data) {
                    $('body').append(data);
                    $('#js-modal-ajax-plan').modal('show');

                }
                ,
                error: function (xhr, str) {
                    alert('Возникла ошибка, попробуйте ещё раз!');
                }
            });
        }
        if (hash.indexOf('tab1') + 1) {
            $('.plan__md ul li:nth-child(1) a').click();
            $('select option:nth-child(1)').prop('selected', true);
        }
        if (hash.indexOf('tab2') + 1) {
            $('.plan__md ul li:nth-child(2) a').click();
            $('select option:nth-child(2)').prop('selected', true);
        }
        if (hash.indexOf('tab3') + 1) {
            $('.plan__md ul li:nth-child(3) a').click();
            $('select option:nth-child(3)').prop('selected', true);
        }
        if (hash.indexOf('tab4') + 1) {
            $('.plan__md ul li:nth-child(4) a').click();
            $('select option:nth-child(4)').prop('selected', true);
        }
    }

    $('.plan__btn-wrap-2 a').on("click", function () {
        var row = $(this).parents('.plan__block-item-row');
        var id1 = $(row).find('.plan__text-1').text();
        var id2 = $(row).find('.plan__text-2').text();
        var id3 = $(row).find('.plan__text-3 span').eq(0).text() + ' и ' + $(row).find('.plan__text-3 span').eq(1).text();
        var id4 = 'м. ' + $(row).find('.plan__text-4').text();
        var id5 = id1 + ' ' + id2 + ' ' + id3 + ' ' + id4;
        $('#modal-detail2').val(id5);
    });
    $(document).ajaxComplete(function () {
        initialise();
        $('#modal-detail').val($('#modal-detail2').val());
    });

    if (!navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1|4.2.2))|(Windows Phone (OS  7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
        $(".js-mask-phone").mask("+7 (999) 999-99-99");
    }

    $('.form-ajax').each(function () {
        var $this = $(this),
            action = $this.prop('action'),
            method = $this.prop('method');
        $(this).submit(function (event) {
            event.preventDefault();
            var ok = 1;
            var form = $(this);
            $('.required', form).each(function () {
                var stl = '';
                if ($(this).val()) {
                    //stl += 'green';
                    $(this).parent().find('.alert').remove();
                    $(this).removeClass('checkAlert');
                } else {
                    stl += '#d36061';
                    if (!$(this).hasClass('checkAlert')) {
                        //$(this).after('<div class="alert">Это поле обязательно для заполнения</div>');
                        $(this).addClass('checkAlert');
                    }
                    ok = 2;
                }
                $(this).css('border-color', stl);
                $(this).addClass('filled');
            });
            if (ok == 2) return false;
            if (ok == 1) {
                var yac = $this.find("input[name='yandex_c']").val();
                var gc = $this.find("input[name='google_c']").val();
                //yaCounter34798545.reachGoal('click1');
                // sendForm('call_form');
                $.ajax({
                    type: method,
                    url: action,
                    data: $this.serialize(),
                    success: function (data) {
                        if ($('.modal').is(':visible')) {
                            $('.modal').modal('hide');
                            $('.modal').not('#js-modal-success').on('hidden.bs.modal', function (e) {
                                $('#js-modal-success').modal('show');
                                $('.modal').unbind('hidden.bs.modal');
                            });
                        } else {
                            $('#js-modal-success').modal('show');
                        }
                        $('form').find("input[type=text], textarea").val("");
                    }
                    ,
                    error: function (xhr, str) {
                        alert('Возникла ошибка, попробуйте ещё раз!');
                    }
                })
                ;
            }
        });
    });
    function initialise() {
        if (!navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1|4.2.2))|(Windows Phone (OS  7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
            $("#js-modal-ajax-plan .js-mask-phone").mask("+7 (999) 999-99-99");
        }

        $('#js-modal-ajax-plan .form-ajax').each(function () {
            var $this = $(this),
                action = $this.prop('action'),
                method = $this.prop('method');
            $(this).submit(function (event) {
                event.preventDefault();
                var ok = 1;
                var form = $(this);
                $('.required', form).each(function () {
                    var stl = '';
                    if ($(this).val()) {
                        //stl += 'green';
                        $(this).parent().find('.alert').remove();
                        $(this).removeClass('checkAlert');
                    } else {
                        stl += '#d36061';
                        if (!$(this).hasClass('checkAlert')) {
                            //$(this).after('<div class="alert">Это поле обязательно для заполнения</div>');
                            $(this).addClass('checkAlert');
                        }
                        ok = 2;
                    }
                    $(this).css('border-color', stl);
                    $(this).addClass('filled');
                });
                if (ok == 2) return false;
                if (ok == 1) {
                    var yac = $this.find("input[name='yandex_c']").val();
                    var gc = $this.find("input[name='google_c']").val();
                    //yaCounter34798545.reachGoal('click1');
                    // sendForm('call_form');
                    $.ajax({
                        type: method,
                        url: action,
                        data: $this.serialize(),
                        success: function (data) {
                            if ($('.modal').is(':visible')) {
                                $('.modal').modal('hide');
                                $('.modal').not('#js-modal-success').on('hidden.bs.modal', function (e) {
                                    $('#js-modal-success').modal('show');
                                    $('.modal').unbind('hidden.bs.modal');
                                });
                            } else {
                                $('#js-modal-success').modal('show');
                            }
                            $('form').find("input[type=text], textarea").val("");
                        }
                        ,
                        error: function (xhr, str) {
                            alert('Возникла ошибка, попробуйте ещё раз!');
                        }
                    })
                    ;
                }
            });
        });
    }


    $('.js-scroll, .js-scroll a').smoothScroll('800');


    $(window).load(function () {
        var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
        $.fn.modal.Constructor.prototype.setScrollbar = function () {
            oldSSB.apply(this);
            if (this.bodyIsOverflowing && this.scrollbarWidth) {
                $('header').css('padding-right', this.scrollbarWidth);
            }
        }

        var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
        $.fn.modal.Constructor.prototype.resetScrollbar = function () {
            oldRSB.apply(this);
            $('header').css('padding-right', '');
        }
    });


    $('#end__clock').countdown('2017/1/20', function (event) {
        var $this = $(this).html(event.strftime('' + '<div><span>%d</span> дни</div>' + '<div><span>%H</span> часы</div>' + '<div><span>%M</span> минуты</div>' + '<div><span>%S</span> секунды</div>'));
    });


    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    var myMap,
        coords = [{
                "name": "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442",
                "time_to_come": 3,
                "lon": 55.72232478,
                "station": "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0438\u0439 \u043f\u0440-\u0442",
                "address": "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 32 \u0441\u0442\u0440. 8",
                "lat": 37.6889795,
                "prise": 1500,
                "id": 4
            }, {
                "name": "\u0428\u0430\u0431\u043e\u043b\u043e\u0432\u0441\u043a\u0430\u044f",
                "time_to_come": 5,
                "lon": 55.71847628,
                "station": "\u0428\u0430\u0431\u043e\u043b\u043e\u0432\u0441\u043a\u0430\u044f",
                "address": "\u041c\u0430\u043b\u044b\u0439 \u041a\u0430\u043b\u0443\u0436\u0441\u043a\u0438\u0439 \u043f\u0435\u0440\u0435\u0443\u043b\u043e\u043a 15 \u0441\u0442\u0440 16",
                "lat": 37.6021395,
                "prise": 2250,
                "id": 5
            }, {
                "name": "\u041a\u0440\u0430\u0441\u043d\u043e\u043f\u0440\u0435\u0441\u043d\u0435\u043d\u0441\u043a\u0430\u044f",
                "time_to_come": 3,
                "lon": 55.76063628,
                "station": "\u041a\u0440\u0430\u0441\u043d\u043e\u043f\u0440\u0435\u0441\u043d\u0435\u043d\u0441\u043a\u0430\u044f",
                "address": "\u041f\u0440\u0435\u0441\u043d\u0435\u043d\u0441\u043a\u0438\u0439 \u043f\u0435\u0440, \u0434. 2",
                "lat": 37.5714885,
                "prise": 1200,
                "id": 6
            }, {
                "name": "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0438\u0439 \u043f\u0440-\u0442 \u0412\u042b\u0425",
                "time_to_come": 2,
                "lon": 55.72232478,
                "station": "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0438\u0439 \u043f\u0440-\u0442",
                "address": "\u0412\u043e\u043b\u0433\u043e\u0433\u0440\u0430\u0434\u0441\u043a\u0438\u0439 \u043f\u0440\u043e\u0441\u043f\u0435\u043a\u0442 32 \u0441\u0442\u0440. 8",
                "lat": 37.6889795,
                "prise": 1050,
                "id": 10
            }, {
                "name": "\u0423\u043b\u0438\u0446\u0430 1905 \u0433\u043e\u0434\u0430",
                "time_to_come": 3,
                "lon": 55.767038,
                "station": "\u0423\u043b\u0438\u0446\u0430 1905 \u0433\u043e\u0434\u0430",
                "address": "\u041f\u0440\u0435\u0441\u043d\u0435\u043d\u0441\u043a\u0438\u0439 \u0432\u0430\u043b 7",
                "lat": 37.564302,
                "prise": 1800,
                "id": 11
            }] || [];

    function init() {
        myMap = new ymaps.Map("hall_map", {
            center: [55.75, 37.64],

            zoom: 11
        });
        myMap.behaviors.disable('scrollZoom');
        if (isMobile.any()) {
            myMap.behaviors.disable('drag');
        }
        for (var i = coords.length - 1; i >= 0; i--) {
            myMap.geoObjects.add(
                new ymaps.Placemark([coords[i].lon, coords[i].lat], {hintContent: coords[i].station})
            );
        }
    }

    ymaps.ready(init);

});