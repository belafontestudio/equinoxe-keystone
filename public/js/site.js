var slidesInterval, filters = {}, values= {};

values.minp = 5000;
values.maxp = 500000;
values.ming = 1;
values.maxg = 34;
values.a = "";
values.t = "";
values.minl = "";
values.maxl = "";

var pathname = location.pathname;

 // Set options
        var options = {
            offset: 700,
            classes: {
                clone:   'banner--clone',
                stick:   'banner--stick',
                unstick: 'banner--unstick'
            }
        };

        // Initialise with options
var headhesive = new Headhesive('.subMenu', options);

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();



//Resize
$( window ).resize(function() {

  $.modal.resize();
  if($(".fullpage-wrapper")[0]){
    $.fn.fullpage.reBuild();
  }
  centerImagesInGrid();
  resizeMap();
});


var imgLoad = imagesLoaded( 'body' );



function resizeMap(){
    var windowHeight = $(window).height();

    $(".section.inner-map").height(windowHeight-40);
}

enquire.register("screen and (max-width:480px)", {

    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
        console.log("match mobile");
        checkPage("mobile");
    },
    unmatch : function() {
        console.log("unmatch mobile");
        if($(".fullpage-wrapper")[0]){
          $.fn.fullpage.destroy('all');
        }
    }

});
enquire.register("screen and (min-width: 480px)", {
    match : function() {
        console.log("match web");

        checkPage("web");
    },
    unmatch : function() {
        console.log("unmatch web");
        if($(".fullpage-wrapper")[0]){
         $.fn.fullpage.destroy('all');
        }
    }
});

function filterMenu(){
    updateFilterMenu();

    $("a.filter").each(function(){
        $(this).click(function(e){
            e.stopPropagation();
            var id = $(this).attr('id');
            var target = id.slice(-1);

            activeFS(target-1);
            activeLI(target-1);
            e.preventDefault();
            $("div.filter-opened-section").slideDown();

        });
    });

    $("a.close-filter").click(function(e){
        e.stopPropagation();
        closeFS();
        e.preventDefault();
    });

}

function closeFS(){
  activeFS()
  activeLI()
  $("div.filter-opened-section").slideUp();
}
function activeFS(target){
  target = (typeof target !== 'undefined' )? target : 0;
    var counter = 1;

        $('section.filter-hide').each(function(){
            if (counter != target){
                $(this).fadeOut(0);

            }else{
                $(this).delay(500).fadeIn(1000);

            }

            counter++;
        });
}
function activeLI(target){
  target = (typeof target !== 'undefined' )? target : 0;
    var counter = 1;

        $('a.filter').each(function(){
            if (counter != target){
                $(this).parent().removeClass("active");

            }else{
                $(this).parent().addClass("active");

            }

            counter++;
        });
};
function guestSlider(){
    $( "#slider-guest" ).slider({
      range: true,
      min: 1,
      max: 15,
      step: 1,
      values: [ values.ming, values.maxg],
      slide: function( event, ui ) {
        $( "p.min-guest" ).text( ui.values[ 0 ] + "guests" );
        $( "p.max-guest" ).text( ui.values[ 1 ] + "guests");
        $("a#f3 span").text(ui.values[ 0 ]+"-"+ui.values[ 1 ]);

      },
      stop: function( event, ui ) {
        filters.ming = ui.values[ 0 ];
        filters.maxg = ui.values[ 1 ];
        collectYachtFilter()
      }
    });
    $( "p.min-guest" ).text( $( "#slider-guest" ).slider( "values", 0 )+ "guests");
    $( "p.max-guest" ).text( $( "#slider-guest" ).slider( "values", 1 )+ "guests");
}
function rangeSlider(){
    $( "#slider-range" ).slider({
      range: true,
      min: 5000,
      max: 500000,
      step: 1000,
      values: [ values.minp, values.maxp ],
      slide: function( event, ui ) {
        $( "p.min-price" ).text( "€" + ui.values[ 0 ] );
        $( "p.max-price" ).text( "€" + ui.values[ 1 ]);
        $("a#f2 span").text(ui.values[ 0 ]+"-"+ui.values[ 1 ]);
      },
      stop: function( event, ui ) {
        filters.minp = ui.values[ 0 ];
        filters.maxp = ui.values[ 1 ];
        collectYachtFilter()
      }
    });
    $( "p.min-price" ).text( "€" + $( "#slider-range" ).slider( "values", 0 ));
    $( "p.max-price" ).text( "€" + $( "#slider-range" ).slider( "values", 1 ));
}

// function availabilityFilter(){
//   $(document).on('click', 'a#sale', function(e) {
//             e.preventDefault();
//             $("a#sale").addClass("active");
//             $("a#charter").removeClass("active");
//             filters.a = "Sale";
//             collectYachtFilter();
//             $("a#f6 span").text(filters.a);
//         });
//   $(document).on('click', 'a#charter', function(e) {
//             e.preventDefault();
//             $("a#charter").addClass("active");
//             $("a#sale").removeClass("active");
//             filters.a = "Charter";
//             collectYachtFilter();
//             $("a#f6 span").text(filters.a);
//         });
// }

function lenghtFilter(){
  $(document).on('click', 'a#small', function(e) {
            e.preventDefault();
            $(this).addClass("active");
            $("a#super").removeClass("active");
            $("a#mega").removeClass("active");
            filters.minl = "0";
            filters.maxl = "24";
            collectYachtFilter();
            $("a#f4 span").text("0-24m");
        });
  $(document).on('click', 'a#super', function(e) {
            e.preventDefault();
            $("a#small").removeClass("active");
            $(this).addClass("active");
            $("a#mega").removeClass("active");
            filters.minl = "24";
            filters.maxl = "40";
            collectYachtFilter();
            $("a#f4 span").text("24-40m");
        });
  $(document).on('click', 'a#mega', function(e) {
            e.preventDefault();
            $("a#small").removeClass("active");
            $("a#super").removeClass("active");
            $(this).addClass("active");
            filters.minl = "40";
            filters.maxl = "150";
            collectYachtFilter();
            $("a#f4 span").text("40m+");
        });
}

function typeFilter(){
  $(document).on('click', 'a#motor', function(e) {
            e.preventDefault();
            $(this).addClass("active");
            $("a#sail").removeClass("active");
            $("a#gulet").removeClass("active");
            filters.t = "Power";
            collectYachtFilter();
            $("a#f5 span").text(filters.t);
        });
  $(document).on('click', 'a#sail', function(e) {
            e.preventDefault();
            $("a#motor").removeClass("active");
            $(this).addClass("active");
            $("a#gulet").removeClass("active");
            filters.t = "Sails";
            collectYachtFilter();
            $("a#f5 span").text(filters.t);
        });
  $(document).on('click', 'a#gulet', function(e) {
            e.preventDefault();
            $("a#motor").removeClass("active");
            $("a#sail").removeClass("active");
            $(this).addClass("active");
            filters.t = "Gulet";
            collectYachtFilter();
            $("a#f5 span").text(filters.t);
        });
}

function updateFilterMenu(){
  if(!$.isEmptyObject(urlParams) ){

    if(urlParams.minp){
      values.minp = urlParams.minp/1000;

    }
    if(urlParams.maxp){
      values.maxp = urlParams.maxp/1000;
    }
    if(urlParams.ming){
      values.ming = urlParams.ming;
    }
    if(urlParams.maxg){
      values.maxg = urlParams.maxg;
    }


    // if(urlParams.a){
    //   values.a = urlParams.a;
    // }
    if(urlParams.t){
      values.t = urlParams.t;
    }
    if(urlParams.minl){
      values.minl = urlParams.minl;
    }
    if(urlParams.minl){
      values.minl = urlParams.minl;
    }


  }
   if(pathname == "/yachts/Charter"){

      values.a = "Charter";
      filters.a = "Charter";
    }
    if(pathname == "/yachts/Sale"){
      values.a = "Sale";
      filters.a = "Sale";
    }

  $("a#f3 span").text(values.ming+"-"+values.maxg);
  $("a#f6 span").text(values.a);
  $("a#f4 span").text(values.minl);
  $("a#f5 span").text(values.t);
  $("a#f2 span").text(values.minp+"-"+values.maxp);

}
function collectYachtFilter(){
    timer = setTimeout(function () {
        clearTimeout(timer);
        console.log("filter called");
        var q = "";

        if(filters.minp){
          q += "&minp="+filters.minp;
        }
        if(filters.maxp){
          q += "&maxp="+filters.maxp;
        }
        if(filters.ming){
          q += "&ming="+filters.ming;
        }
        if(filters.maxg){
          q += "&maxg="+filters.maxg;
        }


         if(pathname == "/yachts/Charter"){

          filters.a = "Charter";
          q += "&a="+filters.a;
        }
        if(pathname == "/yachts/Sale"){

          filters.a = "Sale";
          q += "&a="+filters.a;
        }
        if(filters.t){
          q += "&t="+filters.t;
        }
        if(filters.minl){
          q += "&minl="+filters.minl;
        }
        if(filters.maxl){
          q += "&maxl="+filters.maxl;
        }
        console.log(q)
        if(q != ""){
          console.log("query filled: " + q);
          $.get( "/api/yachts/filter?" + q, function( yachts ) {

            populateYachts(yachts);
          });
        }else{
          $.get( "/api/yachts/filter", function( yachts ) {

            populateYachts(yachts);
          });
        }


    },2000);
}

$(document).ready(function() {

      var top_ofset = $('header').height() - 1;
        $(document).on('click', 'a.down', function(e) {
            e.preventDefault();
            $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - top_ofset
          }, 1000);
        });

        $("#gallery1 #slides1").skippr();
        $("#gallery2 #slides2").skippr();

        $(document).on('click', '.reset-button a', function(e) {
            e.preventDefault();
            values.minp = 0;
            values.maxp = 500;
            values.ming = 1;
            values.maxg = 15;
            values.a = "";
            values.t = "";
            values.minl = "";
            values.maxl = "";

            filters.minp = "";
            filters.maxp = "";
            filters.ming = "";
            filters.maxg = "";
            filters.a = "";
            filters.t = "";
            filters.minl = "";
            filters.maxl = "";

            updateFilterMenu();
            $( "#slider-guest" ).slider({values: [ 1, 15]});
            $( "#slider-range" ).slider({values: [ 0, 500]});
            collectYachtFilter();
        });


    imgLoad.on( 'done', function( instance ) {

      centerImagesInGrid();
      var pathArray = window.location.pathname.split( '/' );
      if (pathArray[2] == "single_yacht.html"){
        $('.img-holder').imageScroll({coverRatio: 1,extraHeight: 0});
        }else if (pathArray[2] == "single_expedition.html"){
          $('.img-holder').imageScroll({coverRatio: 1,extraHeight: 0});
        }else{
            console.log("imgscroll")
          $('.img-holder').imageScroll({coverRatio: 1,extraHeight: 0});
          $('.img-holder-scroll').imageScroll({coverRatio: 0.7,extraHeight: 0});
        }
    });

    resizeMap();
    filterMenu();
    rangeSlider();
    guestSlider();
    //availabilityFilter();
    lenghtFilter();
    typeFilter();
    $( "#slider-single" ).slider({
         min: 0,
         max: 2,
         step: 1,
         slide: function( event, ui ) {
          switch (ui.value){
            case 0:
              $("#filter-yacht").fadeIn(1000);
              $("#filter-super-yacht").fadeOut(400);
              $("#filter-mega-yacht").fadeOut(400);
            break;
            case 1:
              $("#filter-yacht").fadeOut(400);
              $("#filter-super-yacht").fadeIn(1000);
              $("#filter-mega-yacht").fadeOut(400);
            break;
            case 2:
              $("#filter-yacht").fadeOut(400);
              $("#filter-super-yacht").fadeOut(400);
              $("#filter-mega-yacht").fadeIn(1000);
            break;
          }



        }
       });

    $('#enquire-modal').on($.modal.OPEN, function(event, modal) {

        if($(".fullpage-wrapper")[0]){
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
        }
        $.sidr("close");
    });
    $('#enquire-modal').on($.modal.CLOSE, function(event, modal) {
        if($(".fullpage-wrapper")[0]){
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        }
    });


    $('#simple-menu').sidr(
      {
        displace: true,
        onOpen : menuOpen(),
        onClose : menuClose()
    });


    function menuOpen() {

        var menu = $('a#simple-menu');
        menu.addClass('hide');
        if (menu.hasClass('show')){
            menu.removeClass('show');
        }
        var hmenu = $('div#landing-menu div.center');

        if (!hmenu.hasClass('hide')){
            hmenu.addClass('hide');
        }
        if (hmenu.hasClass('show')){
            hmenu.removeClass('show');
        }


    };
    function menuClose() {
      console.log('funzia');
        var menu = $('a#simple-menu');
        menu.addClass('show');
        if (menu.hasClass('hide')){
            menu.removeClass('hide');
        }
        var hmenu = $('div#landing-menu div.center');

        if (!hmenu.hasClass('show')){
            hmenu.addClass('show');
        }
        if (hmenu.hasClass('hide')){
            hmenu.removeClass('hide');
        }
    };

    $('a#closeMenu').click(function(){
        $.sidr("close");
    });

});
function createLanding(){
    $('#onepage').fullpage({
        menu: '#anchor-menu',
        anchors:['landing','yacht-charter', 'sale-purchase','expeditions', 'bareboat', 'heritage'],
        resize: false,
        autoScrolling: true,
        scrollOverflow: true,
        scrollBar: false,
        responsive: 480,
        loopTop: false,
        loopHorizontal: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        afterLoad: function(anchorLink, index){
            var hmenu = $('div#landing-menu div.center')
            //using anchorLink


                if (!hmenu.hasClass('show')){
                    hmenu.addClass('show');
                }
                if (hmenu.hasClass('fast-hide')){
                    hmenu.removeClass('fast-hide');
                }


        },
        onLeave: function(index, nextIndex, direction){
            var hmenu = $('div#landing-menu div.center')

                hmenu.addClass('fast-hide');
                if (hmenu.hasClass('show')){
                    hmenu.removeClass('show');
                }



        }

    });
}
function hasFullPage(page){
    $(arrayFullPage).each(function(){

    });
}
function webSlide(){
    $("#onepage").load("slides/yacht_size_web.html",function(data){
      homeSlides();
      //createLanding();
    });
}
function mobileSlide(){
    $("#onepage").load("slides/yacht_size_mobile.html",function(data){
        homeSlides();
        //createLanding();
    });
}


function checkPage(size){
    var pathArray = window.location.pathname.split( '/' );
    //console.log(pathArray)
    if (pathArray[1] === ""){

        if (size == "web"){
            webSlide();
        }else if (size == "mobile"){
           mobileSlide();
        }



    }else if(pathArray[2] == "single_yacht.html"){
        $('#onepage').fullpage({

            resize: false,
            autoScrolling: false,
            scrollOverflow: true,
            scrollBar: false,
            responsive: 480,
            loopTop: false,
            loopHorizontal: false,
            slidesNavigation: true,
            slidesNavPosition: 'bottom'


        });
    }else if(pathArray[2] == "single_expedition.html"){
        $('#onepage').fullpage({

            resize: false,
            autoScrolling: false,
            scrollOverflow: true,
            scrollBar: false,
            responsive: 480,
            loopTop: false,
            loopHorizontal: false,
            slidesNavigation: true,
            slidesNavPosition: 'bottom'


        });
    }else{
        $("html").css("overflow","visible");
        $("body").css("overflow","visible");

    }

}
function hideCTA(target){
   var counter = 1;

        $('div.cta').each(function(){
            $(this).fadeOut(0, function(){
                     if (counter == target){
                        $(this).fadeIn(1000);
                    }
                });

            counter++;
        });
}

function hideStatements(target){
    var counter = 1;

        $('p.statement').each(function(){

                $(this).fadeOut(0, function(){
                     if (counter == target){
                        $(this).fadeIn(1000);
                    }
                });


            counter++;
        });
};

function centerImagesInGrid(){
    height = 400;
    var container_width = $('ul#latest-yachts-imgbackground li').width();
    $('ul#latest-yachts-imgbackground li img').height(height);

    $('ul#latest-yachts-imgbackground li img').each(function(){
        var width = $(this).width();
        $(this).css("left",-(width*0.5));
        $(this).css("marginLeft", container_width*0.5);

    });
}

function homeSlides(){
    $('div#hslide1').fadeIn(1000);
    $('p#statement1').fadeIn(1000);
    $('div#cta1').fadeIn(1000);
    var charter = $('a#m1').parent()
    charter.addClass("current");


    timerSlidesHome();
    menuSlidesHome()

}


function menuSlidesHome(){
  var menu = $('.subMenu:eq(1)');
    $(menu).find('li.item').each(function(){
        if($(this).attr("id") != "m0"){
            $(this).find('a').mouseover(function(e){
                    timer = setTimeout(function () {
                        clearTimeout(timer);
                        clearInterval(slidesInterval);

                        var id = e.target.id;

                        var target = id.slice(-1);
                        if (!$(this).parent().hasClass("current")){
                            if (target > 3){
                                target--;

                                hideSlides(target+1);
                                hideStatements(target);
                                hideCTA(target);
                                activeItem(target);

                            }
                            else
                            {
                                hideSlides(target);
                                hideStatements(target);
                                hideCTA(target);
                                activeItem(target);

                            }

                        }
                    },300);

            });
            $(this).mouseleave(function(e){
                clearTimeout(timer);
                var id = e.target.id;
                if(id != "m0"){
                    var target = parseInt(id.slice(-1));


                    timerSlidesHome(target);
                }
            });
        }
    });
}
function timerSlidesHome(counter){
    counter = (typeof counter !== 'undefined' )? counter : 2;
    var menu = $('.subMenu:eq(1)');
    slidesInterval = setInterval(function() {

        if( counter >= $(menu).find('li.item').length+1){
            counter = 1;
        }
         if(counter == 3){
          hideSlides(counter);
        }else if (counter > 3){

                    hideSlides(counter);
                    hideStatements(counter-1);
                    hideCTA(counter-1);
                    activeItem(counter-1);

                }

        else
        {
           hideStatements(counter);
            hideCTA(counter);
            hideSlides(counter);
            activeItem(counter);

        }


        counter++
      }, 5000);
}
function activeItem(target){
    var counter = 0;
        var menu = $('.subMenu:eq(1)');
        $(menu).find('li.item').each(function(){
            if (counter != target){
                $(this).removeClass("current");
            }else{
                $(this).addClass("current");
            }
            counter++;
        });
};
function hideSlides(target){
        var counter = 1;

        $('div.hslide').each(function(){
            if (counter != target){
                $(this).fadeOut(1000);

            }else{
                $(this).fadeIn(1000);

            }

            counter++;
        });
    }


Handlebars.registerHelper('ifCond', function(v1, v2, options) {

  if(v1 && v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('ifOr', function(v1, v2, options) {
  if(v1 || v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

function populateYachts(yachts){
    var yachts_grid = $("ul#yachts-list-grid");
    yachts_grid.empty();
    var list = yachts.list;



    if(pathname == "/yachts/Charter"){
      var source   = $("#charter-card-template").html();
    }
    if(pathname == "/yachts/Sale"){
      var source   = $("#sale-card-template").html();
    }
    var template = Handlebars.compile(source);

    console.log(list)
    yachts_grid.html(template(list));

}
