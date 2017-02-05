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
        var modalDetailVal = $('#modal-detail2').val() || $('#modal-detail').val();
        $('#modal-detail').val(modalDetailVal);
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
    

});
