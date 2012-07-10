var pageG;
var pageD;

var w, h;

var pageNb;

$(document).ready(function(){
    pageG = $('#pageG')[0].getContext("2d");
    pageD = $('#pageD')[0].getContext("2d");
    w = 299;
    h = 423;

    $('.fiche').click(ficheClick0);
});

function drawImage(context, src) {
    if (src)
        context.drawImage(src, 0, 0);
}

function forceIt (count, functionCall, params) {

}

function drawBook(event) {
    var images = $('.book-' + event.data.bookNb);

    $('#pgNbG')[0].innerHTML =  event.data.pgNb + 1;
    $('#pgNbD')[0].innerHTML =  event.data.pgNb + 2;

    pageG.clearRect(0, 0, w, h);
    pageD.clearRect(0, 0, w, h);

    if (images[event.data.pgNb]) {
        pageG.drawImage(images[event.data.pgNb],
                        (w - images[event.data.pgNb].naturalWidth)/2,
                        (h - images[event.data.pgNb].naturalHeight)/2,
                        images[event.data.pgNb].naturalWidth,
                        images[event.data.pgNb].naturalHeight);
//        pageG.drawImage(images[event.data.pgNb], 0, 0, 299, 224);
    }
    if (images[event.data.pgNb+1]) {
        pageD.drawImage(images[event.data.pgNb+1],
                        (w - images[event.data.pgNb+1].naturalWidth)/2,
                        (h - images[event.data.pgNb+1].naturalHeight)/2,
                        images[event.data.pgNb+1].naturalWidth,
                        images[event.data.pgNb+1].naturalHeight);
//        pageD.drawImage(images[event.data.pgNb+1], 0, 50, 299, 224);
    }

    // Set buttons values according to the categorie
    if (images.length > event.data.pgNb + 2)
    {
        $('#btnD').addClass('active');
        $('#btnD').bind("click",
                        { bookNb: event.data.bookNb, pgNb: event.data.pgNb + 2},
                        drawBook);
    } else {
        $('#btnD')[0].setAttribute('class', '');
        $('#btnD').bind("click", null, null);
    }

    if(event.data.pgNb >= 2) {
        $('#btnG').addClass('active');
        $('#btnG').bind("click",
                        { bookNb: event.data.bookNb, pgNb: event.data.pgNb - 2},
                        drawBook);
    } else {
        $('#btnG')[0].setAttribute('class', '');
        $('#btnG').bind("click", null, null);
    }
}

function clearCanvases() {
    pageG.clearRect(0, 0, w, h);
    pageD.clearRect(0, 0, w, h);
}

//function setNames(valD, valG) {
//    $('#btnD').addClass(''+valD);
//    $('#btnG').addClass(''+valG);
//}

function fadeOut () {
    $('#pageG').fadeOut(250);
    $('#pageD').fadeOut(250);
}

function fadeIn() {
    $('#pageG').fadeIn(250);
    $('#pageD').fadeIn(250);
}

//function btnDClick() {
//
//}

//function manageNext(bkNb, pgNb) {
//    if($('#pageG-' + bkNb + '-' + pgNb || $('#pageD-' + bkNb + '-' + pgNb))) {
//        setNames(pgNb, '');
//        $('#btnD').addClass('active');
//        $('#btnD').click (function() {
//            fadeOut();
//            //draw next
//            //****
//            setTimeout(function () {
//                fadeIn();
//            }, 250);
//        });
//    }
//}

function Dummy (i, j) {
    this.data = new DummyData(i, j);
}

function DummyData (i, j) {
    this.bookNb = i;
    this.pgNb = j;
}

function ficheClick0() {
    pageNb = 0;
    var i = $(this).attr('id').split('iche')[1];

//    $('#pageD').addClass('grow');
//    $('#pageG').addClass('grow');

    // todo: redraw canvases -- instead
//    clearCanvases();
//    drawImage(pageG, $('#pageG-' + i + '-' + pageNb)[0]);
//    drawImage(pageD, $('#pageD-' + i + '-' + pageNb)[0]);
    var e = new Dummy(i, 0);
    drawBook(e);


    //        if($(this).hasClass('focus'))
    //            return;

    //        $('#flashSnd')[0].play();

    //        $('.bubble.focus').removeClass('focus');
    //        $(this).addClass('focus');


    $('#book').addClass('shrink');
    $('#openBook').addClass('grow');

    setTimeout(function() {
        $('#book').addClass('loadFade').removeClass('shrink');
//        $('#openBook').addClass('grow');
    }, 1600);
    //        glassPane(i);

    $('#bodyContainer').click(function() {
        $('#openBook').addClass('fadeOut');
//        $('#pageG').addClass('fadeOut');
//        $('#pageD').addClass('fadeOut');
        $('#book').addClass('fadeIn');

        setTimeout(function() {
//            $('#book').removeClass('fadeIn loadFade');
            $('#openBook').removeClass('grow fadeOut');
//            $('#pageG').removeClass('grow fadeOut');
//            $('#pageD').removeClass('grow fadeOut');
        }, 500);
    });


    $('#openBook').click(function() {return false;});

    return false;

    //        setTimeout(function(){
    //            $('.smallPhotoOut.print.out').removeClass('print out').addClass('hidden');
    //            setTimeout(function(){$('.smallPhotoOut.hidden').removeClass('hidden');}, 1000);
    //        },1200);
}

function glassPane (i) {
    $('#glassPane').addClass('fadeIn');
    $('#bookVierge' + i).addClass('grow');

    $('#glassPane').click(function () {
        // close popup + fadeout
        $('#glassPane').removeClass('fadeIn');
        $('#knowMore' + i).removeClass('grow');
        $('#book').removeClass('shrink');

        $('#glassPane').click(function(){}); // reset glassPane click handler
    });
}