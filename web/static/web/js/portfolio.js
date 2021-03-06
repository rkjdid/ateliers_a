var startEventHandle;
var bookHandles = new Array(6);

$(document).ready(function(){
    // Get page indexes
    for (var i = 1; i <= 6; i++) {
        bookHandles[i-1] = $('#bookHandle'+i).html();
    }

    // URIs
    Hash.on('^page=([0-9]*|design|photo|web|com|marketo|marketd)$', {
        yep: function(path, parts) {
            var page = parts[1];

            switch(page) {
                case 'com':
                    page = bookHandles[0];
                    break;
                case 'marketo':
                    page = bookHandles[1];
                    break;
                case 'photo':
                    page = bookHandles[2];
                    break;
                case 'web':
                    page = bookHandles[3];
                    break;
                case 'design':
                    page = bookHandles[4];
                    break;
                case 'marketd':
                    page = bookHandles[5];
                    break;
            }

            if (page !== undefined) {
                $('#flipbook').turn('page', page);
                // Gets the range of pages that the book needs right now
                var range = $('#flipbook').turn('range', page);

                // Check if each page is within the book
                for (var p = range[0]; p<=range[1]; p++)
                    populatePage(p, $('#flipbook'));
            }
        },
        nop: function(path) {
        }
    });

    // Arrow keys
    $(window).bind('keydown', function(e){
        if (e.target && e.target.tagName.toLowerCase()!='input')
            if (e.keyCode==37)
                $('#flipbook').turn('previous');
            else if (e.keyCode==39)
                $('#flipbook').turn('next');
    });
});

function populatePage(page, book) {
    var p = $('#page-'+page);

    var data = $(p).find('.data');
    if (data.length == 0) // No content to fill
        return;

    var img = $(p).find('img');

    // Shit happens..
    if (img.length == 1) {
        $(p).find('.loader').remove();
        return;
    }

    if (img.length > 1)
        $(img[1]).remove();

    Dajaxice.adm.getImage
        (Dajax.process,
         {
             'selector' : 'page-' + $(data).find('.dataSelector').html(),
             'book'     : $(data).find('.dataBook').html(),
             'page'     : $(data).find('.dataPage').html(),
             'bEven'    : $(data).find('.dataEven').html()=='true'
         }
    );
}

function ajaxOnLoad(selector, url, p) {
    var img = $('<img class="pageBook loading" alt="Photo book" style="opacity: 0;"/>');
    $(img)[0].onload = function () {
        $('#' + selector + ' .loader').remove();
        $(img).appendTo('#' + selector);
        setTimeout(function() {
            $(img).css('opacity', '');
            $(img).removeClass("loading");
        }, 50);

        $(p).attr('data-load', '1');
    };

    img.attr('src', url);
}


function loadBook() {
    // FlipBook (flip.js)
    $("#flipbook").turn({
        acceleration: true,
        elevation: 50,
        gradients: !$.isTouch,
        when: {
            turning: function(e, page, view) {
                // Disable scrollbars during animation
                $('#bodyContainer').css('overflow', 'hidden');

                /* Book alignment */
                if(page == $(this).turn('pages')) {
                    $(this).removeClass('first').addClass('last');
                    $('#navTabs').removeClass('open');
                }
                else if (page > 1) {
                    $(this).removeClass('first last');
                    $('#navTabs').addClass('open');
                }
                else if (page == 1) {
                    $(this).removeClass('last').addClass('first');
                    $('#navTabs').removeClass('open');
                }


                $('#navBook li, #navTabs li').removeClass('active');
                if        (page > 3 && page < bookHandles[1]) {
                    $('#liDesign, #li2Design').addClass('active');
                } else if (page >= bookHandles[1] && page < bookHandles[2]) {
                    $('#liPhoto, #li2Photo').addClass('active');
                } else if (page >= bookHandles[2] && page < bookHandles[3]) {
                    $('#liWeb, #li2Web').addClass('active');
                } else if (page >= bookHandles[3] && page < bookHandles[4]) {
                    $('#liCom, #li2Com').addClass('active');
                } else if (page >= bookHandles[4] && page < bookHandles[5]) {
                    $('#liMarketo, #li2Marketo').addClass('active');
                } else if (page >= bookHandles[5] && page < $('#flipbook').turn('pages') - 2) {
                    $('#liMarketd, #li2Marketd').addClass('active');
                }

                window.location.hash = 'page=' + page;
            },

            turned: function(e, page) {
            },

            start: function(e, pageObject, corner) {
                if (corner == 'tr' || corner == 'tl')
                    e.preventDefault();

                // Disable scrollbars during animation
                $('#bodyContainer').css('overflow', 'hidden');

                // Gets the range of pages that the book needs right now
                var range = $(this).turn('range', pageObject.page);

                // Check if each page is within the book
                for (var p = range[0]; p<=range[1]; p++)
                    populatePage(p, $(this));

                // trickshot
                startEventHandle = e;
            },
            end: function(event, pageObject, turned) {
                // Enable scrollbars after animation --trickshot
                if (startEventHandle == null)
                    $('#bodyContainer').css('overflow', 'auto');
                else {
                    setTimeout(function() {
                        if (!$('#flipbook').turn('animating'))
                            $('#bodyContainer').css('overflow', 'auto');
                    }, 200);
                }
                startEventHandle = null;
            }
        }
    });
}
