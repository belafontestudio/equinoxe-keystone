var slidesInterval, filters = {}, values= {};
var timer, timer2;
values.minp = 5000;
values.maxp = 500000;
values.ming = 1;
values.maxg = 34;
values.a = "";
values.t = "";
values.minl = "";
values.maxl = "";

var pathname = location.pathname;
var touch = Modernizr.touch;
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

  resizeMap();
});


var imgLoad = imagesLoaded( 'body' );



function resizeMap(){
    var windowHeight = $(window).height();

    $(".section.inner-map").height(windowHeight-40);
}

function backToList(){
    params = window.location.search.substring(1);
    if(!$.isEmptyObject(urlParams) ){
        if(urlParams.a == "Charter"){
            $(".back-to-yachts").attr("href","/yachts/Charter?"+params)
        }
        if(urlParams.a == "Sale"){
            $(".back-to-yachts").attr("href","/yachts/Sale?"+params)
        }

    }else{
        var referrer =  document.referrer;
        if(referrer ){
        $(".back-to-yachts").attr("href",referrer)
        }
    }
}

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
    emptyGrid();
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

            populateYachts(yachts,q);
          });
        }else{
          $.get( "/api/yachts/filter", function( yachts ) {

            populateYachts(yachts,q);
          });
        }


    },2000);
}

$(document).ready(function() {
      var headhesive = new Headhesive('.subMenu', options);

      if(touch){
        $(".down").hide();
      }
      submitModals()
      backToList()
      checkPage()
      var top_ofset = $('header').height() - 1;
        $(document).on('click', 'a.down', function(e) {
            e.preventDefault();
            $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - top_ofset
          }, 1000);
        });

        // $("#gallery1 #slides1").skippr();
        // $("#gallery2 #slides2").skippr();

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
        $('.img-holder').imageScroll({coverRatio: 1,extraHeight: 0, touch: touch,holderMinHeight: 600});
        $('.img-holder-scroll').imageScroll({coverRatio: 0.7,extraHeight: 0, touch: touch, holderMinHeight: 600});

    });

    $.scrollUp({
      scrollName: 'scrollUp', // Element ID
      topDistance: '400', // Distance from top before showing element (px)
      topSpeed: 300, // Speed back to top (ms)
      animation: 'fade', // Fade, slide, none
      animationInSpeed: 200, // Animation in speed (ms)
      animationOutSpeed: 200, // Animation out speed (ms)
      scrollText: '', // Text for element
      activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });

    resizeMap();
    filterMenu();
    rangeSlider();
    guestSlider();
    //availabilityFilter();
    lenghtFilter();
    typeFilter();

    toggleFilters();
    mediaqueriesjs();
    clickFilters()

    sliderKey();

    owl = $("#slides1");

    owl.owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      lazyLoad : true,
      rewindNav : true
    });

    $("#next-arrow").click(function(){
      owl.trigger('owl.next');
    });
    $("#back-arrow").click(function(){
      owl.trigger('owl.prev');
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



function checkPage(){
    var pathArray = window.location.pathname.split( '/' );

    if (pathArray[1] === ""){
        homeSlides();
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
                    clearTimeout(timer);
                    clearTimeout(timer2);
                    timer = setTimeout(function () {

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
                                if(id != "m0"){
                                    hideSlides(target);
                                    hideStatements(target);
                                    hideCTA(target);
                                    activeItem(target);
                                }
                            }

                        }
                    },300);

            }).mouseleave(function(e){
                clearTimeout(timer);
                clearTimeout(timer2);
                clearInterval(slidesInterval);
                timer2 = setTimeout(function () {
                    var id = e.target.id;
                    if(id != "m0"){
                            var target = parseInt(id.slice(-1));
                            timerSlidesHome(target+1);
                        }
                },2000);
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
      }, 3000);
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
Handlebars.registerHelper('numeral', function(price,currency,options) {

  var num = numeral(price).format('0,0[.]00' )+currency;
  return num;
});
Handlebars.registerHelper('ifOr', function(v1, v2, options) {
  if(v1 || v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
function emptyGrid(){

    var yachts_grid = $("ul#yachts-list-grid");
    yachts_grid.children().fadeOut(500, function() {
        yachts_grid.empty();
    });
}
function fillGrid(yachts,template,q){
    var list = yachts.list;
    list.q= q;
    var yachts_grid = $("ul#yachts-list-grid");
    if(list.total > 0){
      yachts_grid.html(template(list)).fadeIn(500);
    }else{
      yachts_grid.html('<p id="no-yacht-found">Too bad. No yachts meet your requirements.<br><br>Use reset button to start again</p>').fadeIn(500);
    }


}
function populateYachts(yachts,q){

    if(pathname == "/yachts/Charter"){
      var source   = $("#charter-card-template").html();
    }
    if(pathname == "/yachts/Sale"){
      var source   = $("#sale-card-template").html();
    }
    var template = Handlebars.compile(source);
    fillGrid(yachts,template,q)
}


/////////////////////////

function toggleFilters(){

  $('#toggle-btn').click(function() {
    $('.filter-toggle').slideToggle("fast", function() {
    // Animation complete.
    });

    $('.filter-opened-section').fadeOut();

  });



}

function mediaqueriesjs(){

  enquire.register("screen and (max-width:600px)", {
    match : function() {
      $('#heritage-img').attr('src', '/images/equinoxe_infografica-mobile.png');
    },
    unmatch : function() {
      $('#heritage-img').attr('src', '/images/equinoxe_infografica.png');
    }
});
}


function clickFilters(){
  $('#filter-yacht').click(function() {
    $('#filter-yacht>h2').css('color','#F4BB3B');
    $('#filter-super-yacht>h2').css('color','white');
    $('#filter-mega-yacht>h2').css('color','white');
    filters.minl = "0";
    filters.maxl = "24";
    collectYachtFilter();
    $("a#f4 span").text("0-24m");
  });

  $('#filter-super-yacht').click(function() {
    $('#filter-super-yacht>h2').css('color','#F4BB3B');
    $('#filter-yacht>h2').css('color','white');
    $('#filter-mega-yacht>h2').css('color','white');
    filters.minl = "24";
    filters.maxl = "40";
    collectYachtFilter();
    $("a#f4 span").text("24-40m");
  });

  $('#filter-mega-yacht').click(function() {
    $('#filter-mega-yacht>h2').css('color','#F4BB3B');
    $('#filter-yacht>h2').css('color','white');
    $('#filter-super-yacht>h2').css('color','white');
    filters.minl = "40";
    filters.maxl = "150";
    collectYachtFilter();
    $("a#f4 span").text("40m+");
  });
}




function sliderKey(){
  jQuery(document.documentElement).keyup(function (event) {

    var owl = jQuery(".owl-carousel");




    // handle cursor keys
    if (event.keyCode == 37) {
       // go left
       owl.trigger('owl.prev');
    } else if (event.keyCode == 39) {
       // go right
       owl.trigger('owl.next');
    }

  });
}

function submitModals(){
    $("#enquire_form").submit(function()
    {
        var email = $(".enquire_email").val(); // get email field value
        var name = $(".enquire_name").val(); // get name field value
        var surname = $(".enquire_surname").val(); // get name field value

        var check0 = $("#checkboxes-0").val(); // get name field value
        var check1 = $("#checkboxes-1").val(); // get name field value
        var check2 = $("#checkboxes-2").val(); // get name field value
        var check3 = $("#checkboxes-3").val(); // get name field value
        var check4 = $("#checkboxes-4").val(); // get name field value

        var msg = $(".enquire_msg").val(); // get message field value
        $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'LSCHLKdc1EZKgi47pzZ7yg',
                'message': {
                    'from_email': email,
                    'from_name': name+" "+surname,
                    'headers': {
                        'Reply-To': email
                    },
                    'subject': name +" "+ surname +'Website Contact Form',
                    'text': check0 +" "+ check1 + " "+ check2 +" "+ check3 + " " + check4 +"   "+msg,
                    'to': [
                    {
                        'email': 'piermaria@belafonte.co',
                        'name': 'Piermaria Cosina',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            alert('Your message has been sent. Thank you!'); // show success message
            $("#name").val(''); // reset field after successful submission
            $("#email").val(''); // reset field after successful submission
            $("#msg").val(''); // reset field after successful submission
        })
        .fail(function(response) {
            alert('Error sending message.');
        });
        return false; // prevent page refresh
    });

$("#yacht_modal").submit(function()
    {
        var email = $(".modal_email").val(); // get email field value
        var name = $(".modal_name").val(); // get name field value
        var surname = $(".modal_surname").val(); // get name field value

        var theyacht = $('h1').text(); // get name field value


        var msg = $(".modal_msg").val(); // get message field value
        $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'LSCHLKdc1EZKgi47pzZ7yg',
                'message': {
                    'from_email': email,
                    'from_name': name+" "+surname,
                    'headers': {
                        'Reply-To': email
                    },
                    'subject': theyacht + " "+name +" "+ surname +'Website Contact Form',
                    'text':  theyacht +"   "+msg,
                    'to': [
                    {
                        'email': 'piermaria@belafonte.co',
                        'name': 'Piermaria Cosina',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            alert('Your message has been sent. Thank you!'); // show success message
            $("#name").val(''); // reset field after successful submission
            $("#email").val(''); // reset field after successful submission
            $("#msg").val(''); // reset field after successful submission
        })
        .fail(function(response) {
            alert('Error sending message.');
        });
        return false; // prevent page refresh
    });
}
