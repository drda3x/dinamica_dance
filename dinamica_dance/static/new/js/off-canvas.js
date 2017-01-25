$(function ($) {
    var offCanvas = $('#off-canvas');
    $('.mobile-menu-trigger').on("click", function () {
        openOffCanvas();
    });
    $(document).on('click touchstart', function (event) {
        if ($(event.target).closest(offCanvas).length) return;
        closeOffCanvas();
    });
    $('#off-canvas a').on("click", function () {
        closeOffCanvas();
    });
    function openOffCanvas() {
            offCanvas
                .removeClass('offCanvasClose')
                .addClass('offCanvasOpen')
                .css('visibility', 'visible');
            $('body')
                .css('overflow', 'hidden')
                .append("<div id='off-canvas-overlay'></div>");
            $("#off-canvas-overlay").animate({opacity: 1}, 400, function () {
                offCanvas.removeClass('offCanvasOpen')
            });
    }

    function closeOffCanvas() {
        if ($('#off-canvas-overlay').css('opacity') == 1) {
            offCanvas
                .addClass('offCanvasClose');
            $("#off-canvas-overlay").animate({opacity: 0}, 400, function () {
                $("#off-canvas-overlay").remove();
                $('body').css('overflow', 'auto');
                offCanvas.css('visibility', 'hidden');
            });
        }
    }
});