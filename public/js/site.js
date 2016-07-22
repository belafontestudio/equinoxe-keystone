/* @flow */
var slidesInterval, filters = {}, values= {};
var timer, timer2;
values.minp = 100000;
values.maxp = 10000000;
values.minpw = 5000;
values.maxpw = 900000;
values.ming = 1;
values.maxg = 34;
values.a = "";
values.t = "";
values.minl = "";
values.maxl = "";

var imgLoad = imagesLoaded( 'window' );

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
        if($('section.filter-hide').length == 1){
          $("section.zone").delay(500).fadeIn(1000);

        }
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
      max: 34,
      step: 1,
      values: [ values.ming, values.maxg],
      slide: function( event, ui ) {
        $( "p.min-guest" ).text( ui.values[ 0 ]);
        $( "p.max-guest" ).text( ui.values[ 1 ]);
        $("a#f3 span").text(ui.values[ 0 ]+"-"+ui.values[ 1 ]);

      },
      stop: function( event, ui ) {
        filters.ming = ui.values[ 0 ];
        filters.maxg = ui.values[ 1 ];
        collectFilter()
      }
    });
    $( "p.min-guest" ).text( $( "#slider-guest" ).slider( "values", 0 ));
    $( "p.max-guest" ).text( $( "#slider-guest" ).slider( "values", 1 ));
}
function rangeSliderWeek(){
  $( "#slider-rangeweek" ).slider({
      range: true,
      min: 5000,
      max: 900000,
      step: 1000,
      values: [ values.minpw, values.maxpw ],
      slide: function( event, ui ) {
        $( "p.min-priceweek" ).text( "€" + numeral(ui.values[ 0 ]).format('0,0[.]00' ));
        $( "p.max-priceweek" ).text( "€" + numeral(ui.values[ 1 ]).format('0,0[.]00' ));
        $("a#f2 span").text(numeral(ui.values[ 0 ]).format('0,0[.]00' )+"-"+ui.values[ 1 ]);
      },
      stop: function( event, ui ) {
        filters.minpw = ui.values[ 0 ];
        filters.maxpw = ui.values[ 1 ];
        collectFilter()
      }
    });
    $( "p.min-priceweek" ).text( "€" + numeral("5000").format('0,0[.]00' ));
    $( "p.max-priceweek" ).text( "€" + numeral("900000").format('0,0[.]00' ));
}
function rangeSlider(){
    $( "#slider-range" ).slider({
      range: true,
      min: 100000,
      max: 10000000,
      step: 1000,
      values: [ values.minp, values.maxp ],
      slide: function( event, ui ) {
        $( "p.min-price" ).text( "€" + numeral(ui.values[ 0 ]).format('0,0[.]00' ));
        $( "p.max-price" ).text( "€" + numeral(ui.values[ 1 ]).format('0,0[.]00' ));
        $("a#f2 span").text(numeral(ui.values[ 0 ]).format('0,0[.]00' )+"-"+ui.values[ 1 ]);
      },
      stop: function( event, ui ) {
        filters.minp = ui.values[ 0 ];
        filters.maxp = ui.values[ 1 ];
        collectFilter()
      }
    });

    $( "p.min-price" ).text( "€" + numeral("100000").format('0,0[.]00' ));
    $( "p.max-price" ).text( "€" + numeral("10000000").format('0,0[.]00' ));

}

// function availabilityFilter(){
//   $(document).on('click', 'a#sale', function(e) {
//             e.preventDefault();
//             $("a#sale").addClass("active");
//             $("a#charter").removeClass("active");
//             filters.a = "Sale";
//             collectFilter();
//             $("a#f6 span").text(filters.a);
//         });
//   $(document).on('click', 'a#charter', function(e) {
//             e.preventDefault();
//             $("a#charter").addClass("active");
//             $("a#sale").removeClass("active");
//             filters.a = "Charter";
//             collectFilter();
//             $("a#f6 span").text(filters.a);
//         });
// }

function resetFilters(){
  $(document).on('click', '.reset-button a', function(e) {
            e.preventDefault();
            values.minp = 100000;
            values.maxp = 10000000;
            values.minpw = 500;
            values.maxpw = 900000;
            values.ming = 1;
            values.maxg = 34;
            values.a = "";
            values.t = "";
            values.minl = "";
            values.maxl = "";

            filters.minp = "";
            filters.maxp = "";
            filters.minpw = "";
            filters.maxpw = "";
            filters.ming = "";
            filters.maxg = "";
            filters.a = "";
            filters.t = "";
            filters.minl = "";
            filters.maxl = "";
            filters.z = "";

            updateFilterMenu();
            $( "#slider-guest" ).slider({values: [ 1, 34]});
            $( "#slider-range" ).slider({values: [ 100000, 10000000]});
            $( "#slider-rangeweek" ).slider({values: [ 500, 900000]});

            $("a#small").removeClass("active");
            $("a#super").removeClass("active");
            $("a#mega").removeClass("active");

            $("a#power").removeClass("active");
            $("a#sail").removeClass("active");
            $("a#gulet").removeClass("active");

            $("a#arctic").removeClass("active");
            $("a#antarctic").removeClass("active");
            $("a#galapagos").removeClass("active");
            $("a#patagonia").removeClass("active");
            $("a#maldives").removeClass("active");
            $("a#newzeland").removeClass("active");
            $("a#australia").removeClass("active");

            $( "p.min-price" ).text( "€" + $( "#slider-range" ).slider( "values", 0 ));
            $( "p.max-price" ).text( "€" + $( "#slider-range" ).slider( "values", 1 ));
            $( "p.min-priceweek" ).text( "€" + $( "#slider-rangeweek" ).slider( "values", 0 ));
            $( "p.max-priceweek" ).text( "€" + $( "#slider-rangeweek" ).slider( "values", 1 ));
            $( "p.min-guest" ).text( $( "#slider-guest" ).slider( "values", 0 ));
            $( "p.max-guest" ).text( $( "#slider-guest" ).slider( "values", 1 ));
            collectFilter();
        });
}

function lenghtFilter(){
  $(document).on('click', 'a#small', function(e) {
            e.preventDefault();
            $(this).addClass("active");
            $("a#super").removeClass("active");
            $("a#mega").removeClass("active");
            filters.minl = "0";
            filters.maxl = "24";
            collectFilter();
            $("a#f4 span").text("0-24m");
        });
  $(document).on('click', 'a#super', function(e) {
            e.preventDefault();
            $("a#small").removeClass("active");
            $(this).addClass("active");
            $("a#mega").removeClass("active");
            filters.minl = "24";
            filters.maxl = "40";
            collectFilter();
            $("a#f4 span").text("24-40m");
        });
  $(document).on('click', 'a#mega', function(e) {
            e.preventDefault();
            $("a#small").removeClass("active");
            $("a#super").removeClass("active");
            $(this).addClass("active");
            filters.minl = "40";
            filters.maxl = "150";
            collectFilter();
            $("a#f4 span").text("40m+");
        });
}

function typeFilter(){
  $(document).on('click', 'a#motor', function(e) {
    e.preventDefault();
    $(this).addClass("active");
    $("a#sail").removeClass("active");
    $("a#gulet").removeClass("active");

    collectFilter();

    if(location.hostname ==  "equinoxe.it"){
      filters.t = "Motore";
    }else if(location.hostname ==  "equinoxeyachts.com"){
      filters.t = "Power";
    }

    $("a#f5 span").text(filters.t);

  });
  $(document).on('click', 'a#sail', function(e) {
    e.preventDefault();
    $("a#motor").removeClass("active");
    $(this).addClass("active");
    $("a#gulet").removeClass("active");

    collectFilter();
    if(location.hostname ==  "equinoxe.it"){
      filters.t = "Vela";
    }else if(location.hostname ==  "equinoxeyachts.com"){
      filters.t = "Sails";
    }
    $("a#f5 span").text(filters.t);

  });
  $(document).on('click', 'a#gulet', function(e) {
    e.preventDefault();
    $("a#motor").removeClass("active");
    $("a#sail").removeClass("active");
    $(this).addClass("active");

    collectFilter();
    if(location.hostname ==  "equinoxe.it"){
      filters.t = "Caicchi";
    }else if(location.hostname ==  "equinoxeyachts.com"){
      filters.t = "Gulet";
    }
    $("a#f5 span").text(filters.t);

  });
}

function zoneFilter(){

  $(document).on('click', 'a#arctic', function(e) {
            e.preventDefault();
            $(this).addClass("active");
            $("a#antarctic").removeClass("active");
            $("a#galapagos").removeClass("active");
            $("a#patagonia").removeClass("active");
            $("a#maldives").removeClass("active");
            $("a#newzeland").removeClass("active");
            $("a#australia").removeClass("active");
            filters.z = "Arctic";
            collectFilter();
            $("a#f7 span").text(filters.z);
        });
  $(document).on('click', 'a#antarctic', function(e) {
            e.preventDefault();
            $(this).addClass("active");
            $("a#arctic").removeClass("active");
            $("a#galapagos").removeClass("active");
            $("a#patagonia").removeClass("active");
            $("a#maldives").removeClass("active");
            $("a#newzeland").removeClass("active");
            $("a#australia").removeClass("active");
            filters.z = "Antarctic";
            collectFilter();
            $("a#f7 span").text(filters.z);
        });
  $(document).on('click', 'a#galapagos', function(e) {
            e.preventDefault();
            $("a#arctic").removeClass("active");
            $("a#antarctic").removeClass("active");
            $("a#patagonia").removeClass("active");
            $("a#maldives").removeClass("active");
            $("a#newzeland").removeClass("active");
            $("a#australia").removeClass("active");
            $(this).addClass("active");
            filters.z = "Galapagos";
            collectFilter();
            $("a#f7 span").text(filters.z);
        });
  $(document).on('click', 'a#patagonia', function(e) {
            e.preventDefault();
            $("a#arctic").removeClass("active");
            $("a#antarctic").removeClass("active");
            $("a#galapagos").removeClass("active");
            $("a#maldives").removeClass("active");
            $("a#newzeland").removeClass("active");
            $("a#australia").removeClass("active");
            $(this).addClass("active");
            filters.z = "Patagonia";
            collectFilter();
            $("a#f7 span").text(filters.z);
        });

  $(document).on('click', 'a#maldives', function(e) {
            e.preventDefault();
            $("a#arctic").removeClass("active");
            $("a#antarctic").removeClass("active");
            $("a#galapagos").removeClass("active");
            $("a#patagonia").removeClass("active");

            $("a#newzeland").removeClass("active");
            $("a#australia").removeClass("active");
            $(this).addClass("active");
            filters.z = "Maldives";
            collectFilter();
            $("a#f7 span").text(filters.z);
        });

  $(document).on('click', 'a#newzeland', function(e) {
            e.preventDefault();
            $("a#arctic").removeClass("active");
            $("a#antarctic").removeClass("active");
            $("a#galapagos").removeClass("active");
            $("a#patagonia").removeClass("active");
            $("a#maldives").removeClass("active");

            $("a#australia").removeClass("active");
            $(this).addClass("active");
            filters.z = "New Zeland";
            collectFilter();
            $("a#f7 span").text(filters.z);
        });

  $(document).on('click', 'a#australia', function(e) {
            e.preventDefault();
            $("a#arctic").removeClass("active");
            $("a#antarctic").removeClass("active");
            $("a#galapagos").removeClass("active");
            $("a#patagonia").removeClass("active");
            $("a#maldives").removeClass("active");
            $("a#newzeland").removeClass("active");

            $(this).addClass("active");
            filters.z = "Australia";
            collectFilter();
            $("a#f7 span").text(filters.z);
        });
}

function updateFilterMenu(){
  if(!$.isEmptyObject(urlParams) ){

    if(urlParams.minp){
      values.minp = urlParams.minp;

    }
    if(urlParams.maxp){
      values.maxp = urlParams.maxp;
    }
    if(urlParams.minpw){
      values.minpw = urlParams.minpw;

    }
    if(urlParams.maxpw){
      values.maxpw = urlParams.maxpw;
    }
    if(urlParams.ming){
      values.ming = urlParams.ming;
    }
    if(urlParams.maxg){
      values.maxg = urlParams.maxg;
    }
    if(urlParams.z){
      values.z = urlParams.z;
      filters.z = urlParams.z;
    }

    // if(urlParams.a){
    //   values.a = urlParams.a;
    // }
    if(urlParams.t){
      values.t = urlParams.t;
      filters.t = urlParams.t;
    }
    if(urlParams.minl){
      values.minl = urlParams.minl;
      filters.minl = urlParams.minl;
    }
    if(urlParams.maxl){
      values.maxl = urlParams.maxl;
      filters.maxl = urlParams.maxl;
    }


  }
   if(pathname == "/yachts/Charter"){
      $("a#f2 span").text(numeral(values.minpw).format('0,0[.]00' )+"-"+numeral(values.maxpw).format('0,0[.]00' ));
      values.a = "Charter";
      filters.a = "Charter";
    }
    if(pathname == "/yachts/Sale"){
      $("a#f2 span").text(numeral(values.minp).format('0,0[.]00' )+"-"+numeral(values.maxp).format('0,0[.]00' ));
      values.a = "Sale";
      filters.a = "Sale";
    }
    if(pathname == "/expeditions"){
      if(values.z != ""){
        $("a#f7 span").text("");
      }else{
        $("a#f7 span").text(values.z);
      }


    }

  if(values.minl == "0" && values.maxl == "24"){
    $("a#f4 span").text("0-24m");
    $("a#small").addClass("active");
    $("a#super").removeClass("active");
    $("a#mega").removeClass("active");
  }else if(values.minl == "24" && values.maxl == "40"){
    $("a#f4 span").text("24-40m");
    $("a#small").removeClass("active");
    $("a#super").addClass("active");
    $("a#mega").removeClass("active");
  }else if(values.minl == "40" && values.maxl == "150"){
    $("a#f4 span").text("40m+");
    $("a#small").removeClass("active");
    $("a#super").removeClass("active");
    $("a#mega").addClass("active");

  }


  if(values.t == "Power"){
    $("a#power").addClass("active");
    $("a#sail").removeClass("active");
    $("a#gulet").removeClass("active");
  }else if(values.t == "Sails"){
    $("a#power").removeClass("active");
    $("a#sail").addClass("active");
    $("a#gulet").removeClass("active");
  }else if(values.t == "Gulet"){
    $("a#power").removeClass("active");
    $("a#sail").removeClass("active");
    $("a#gulet").addClass("active");
  }

  if(values.z == "Arctic"){
    $("a#arctic").addClass("active");
    $("a#antarctic").removeClass("active");
    $("a#galapagos").removeClass("active");
    $("a#patagonia").removeClass("active");
    $("a#maldives").removeClass("active");
    $("a#newzeland").removeClass("active");
    $("a#australia").removeClass("active");
  }else if(values.z == "Antarctic"){
    $("a#arctic").removeClass("active");
    $("a#antarctic").addClass("active");
    $("a#galapagos").removeClass("active");
    $("a#patagonia").removeClass("active");
    $("a#maldives").removeClass("active");
    $("a#newzeland").removeClass("active");
    $("a#australia").removeClass("active");
  }else if(values.z == "Galapagos"){
    $("a#arctic").removeClass("active");
    $("a#antarctic").removeClass("active");
    $("a#galapagos").addClass("active");
    $("a#patagonia").removeClass("active");
    $("a#maldives").removeClass("active");
    $("a#newzeland").removeClass("active");
    $("a#australia").removeClass("active");
  }else if(values.z == "Patagonia"){
    $("a#arctic").removeClass("active");
    $("a#antarctic").removeClass("active");
    $("a#galapagos").removeClass("active");
    $("a#patagonia").addClass("active");
    $("a#maldives").removeClass("active");
    $("a#newzeland").removeClass("active");
    $("a#australia").removeClass("active");
  }else if(values.z == "Maldives"){
    $("a#arctic").removeClass("active");
    $("a#antarctic").removeClass("active");
    $("a#galapagos").removeClass("active");
    $("a#patagonia").removeClass("active");
    $("a#maldives").addClass("active");
    $("a#newzeland").removeClass("active");
    $("a#australia").removeClass("active");
  }else if(values.z == "New Zeland"){
    $("a#arctic").removeClass("active");
    $("a#antarctic").removeClass("active");
    $("a#galapagos").removeClass("active");
    $("a#patagonia").removeClass("active");
    $("a#maldives").removeClass("active");
    $("a#newzeland").addClass("active");
    $("a#australia").removeClass("active");
  }else if(values.z == "Australia"){
    $("a#arctic").removeClass("active");
    $("a#antarctic").removeClass("active");
    $("a#galapagos").removeClass("active");
    $("a#patagonia").removeClass("active");
    $("a#maldives").removeClass("active");
    $("a#newzeland").removeClass("active");
    $("a#australia").addClass("active");
  }


  $("a#f3 span").text(values.ming+"-"+values.maxg);
  $("a#f6 span").text(values.a);
  if(location.hostname ==  "equinoxe.it"){
    if(values.t == "Sails"){
      $("a#f5 span").text("Vela");
    }else if(values.t == "Power"){
      $("a#f5 span").text("Motore");
    }else if(values.t == "Gulet"){
      $("a#f5 span").text("Caicchi");
    }

  }else if(location.hostname ==  "equinoxeyachts.com"){
    $("a#f5 span").text(values.t);
  }



}
function submitSearch(){
  $("#search-yacht").submit(function(e){
    if($("#input-search").val().length < 3){
      e.preventDefault();
    }else{
      emptyGrid();
      var q = "";
      var searchtearm = $("#input-search").val();
      if(searchtearm){
        q += "&s="+searchtearm;
      }

      if(q != ""){
        console.log("query filled: " + q);
        var apiQuery = rightQuery();
        timer = setTimeout(function () {
          clearTimeout(timer);
          $.get( "/api/"+apiQuery+"/search?" + q, function( data ) {

            populateData(data,q);
          });
        },2000);
      }else{
        console.log("not found");
      }
    }
    return false; // prevent page refresh
  });
}
function collectFilter(){
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
        if(filters.minpw){
          q += "&minpw="+filters.minpw;
        }
        if(filters.maxpw){
          q += "&maxpw="+filters.maxpw;
        }
        if(filters.ming){
          q += "&ming="+filters.ming;
        }
        if(filters.maxg){
          q += "&maxg="+filters.maxg;
        }
        if(filters.z){
          q += "&z="+filters.z;
        }



        if(pathname == "/yachts/Charter"){

          filters.a = "Charter";
          q += "&a="+filters.a;
        }
        if(pathname == "/expeditions"){
          if (filters.z == ""){
            filters.z = "";
            q += "&z="+filters.z;
          }

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

        if(q != ""){
          console.log("query filled: " + q);
          var apiQuery = rightQuery();
          $.get( "/api/"+apiQuery+"/filter?" + q, function( data ) {

            populateData(data,q);
          });
        }else{
          $.get( "/api/"+apiQuery+"/filter", function( data ) {

            populateData(data,q);
          });
        }


    },2000);
}

function rightQuery(){
  if(pathname == "/yachts/Charter"){
    return "yachts"
  }
  if(pathname == "/yachts/Sale"){
    return "yachts"
  }
  if(pathname == "/expeditions"){
    return "expeditions"
  }
}


function searchFilter(){
  $('#f6').click(function(){

    $('html, body').animate({
        scrollTop: $(".filter-opened-section").offset().top
    }, 1000);

    $('#input-search').focus();

  })
}


$(document).ready(function() {
      var headhesive = new Headhesive('.subMenu', options);

      if(touch){
        $(".down").hide();
      }

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

        resetFilters();




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


    //validate();
    submitModals();

    resizeMap();
    filterMenu();
    rangeSlider();
    rangeSliderWeek();
    guestSlider();
    //availabilityFilter();
    lenghtFilter();
    typeFilter();
    zoneFilter();
    toggleFilters();
    mediaqueriesjs();
    clickFilters();
    searchFilter();
    submitSearch()
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
    //menuSlidesHome();

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
                    //hideStatements(counter-1);
                    //hideCTA(counter-1);
                    //activeItem(counter-1);

                }

        else
        {

           //hideStatements(counter);
            //hideCTA(counter);
            hideSlides(counter);
            //activeItem(counter);

        }


        counter++
      }, 8000);
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
    yachts_grid.children().fadeOut(100, function() {
        yachts_grid.empty();
    });
}
function fillGrid(data,template,q){

    var list = data.list;

    list.q= q;
    console.log(list)
    var data_grid = $("ul#yachts-list-grid");
    if(list.total > 0){

      data_grid.html(template(data)).fadeIn(500);

    }else{
      if(pathname == "/yachts/Charter"){
        data_grid.html('<p id="no-yacht-found">We’re sorry, but we couldn’t find a yacht meeting your requirements.<br><br>Change filters to try a new search.</p>').fadeIn(500);
      }
      if(pathname == "/yachts/Sale"){
        data_grid.html('<p id="no-yacht-found">We’re sorry, but we couldn’t find a yacht meeting your requirements.<br><br>Change filters to try a new search.</p>').fadeIn(500);
      }
      if(pathname == "/expeditions"){
        data_grid.html('<p id="no-yacht-found">We’re sorry, but we couldn’t find any expedition meeting your requirements.<br><br>Change filters to try a new search.</p>').fadeIn(500);
      }

    }


}
function populateData(data,q){

    if(pathname == "/yachts/Charter"){
      var source   = $("#charter-card-template").html();
    }
    if(pathname == "/yachts/Sale"){
      var source   = $("#sale-card-template").html();
    }
    if(pathname == "/expeditions"){
      var source   = $("#expedition-card-template").html();
    }

    var template = Handlebars.compile(source);

    fillGrid(data,template,q)
}




/////////////////////////

function toggleFilters(){
  var iconafilterToggle = false;

  $('#toggle-btn').click(function() {
    if(iconafilterToggle == false){
      $('.iconfilter').addClass('fa-plus-circle');
      $('.iconfilter').removeClass('fa-minus-circle');
      iconafilterToggle = true;
      console.log(iconafilterToggle)
    }else if(iconafilterToggle == true) {
      $('.iconfilter').removeClass('fa-plus-circle');
      $('.iconfilter').addClass('fa-minus-circle');
      iconafilterToggle = false;
    }
    $('.filter-toggle').slideToggle("fast", function() {

    });

    $('.filter-opened-section').fadeOut();

  });



}

function mediaqueriesjs(){

  enquire.register("screen and (max-width:600px)", {
    match : function() {

      $('#heritage-img-mob').show();
      $('#heritage-img-web').hide();

      $('.enquire-button').on('click', function(){
        $.scrollUp();
      })
    },
    unmatch : function() {
      $('#heritage-img-web').show();
      $('#heritage-img-mob').hide();
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
    collectFilter();
    $("a#f4 span").text("0-24m");
  });

  $('#filter-super-yacht').click(function() {
    $('#filter-super-yacht>h2').css('color','#F4BB3B');
    $('#filter-yacht>h2').css('color','white');
    $('#filter-mega-yacht>h2').css('color','white');
    filters.minl = "24";
    filters.maxl = "40";
    collectFilter();
    $("a#f4 span").text("24-40m");
  });

  $('#filter-mega-yacht').click(function() {
    $('#filter-mega-yacht>h2').css('color','#F4BB3B');
    $('#filter-yacht>h2').css('color','white');
    $('#filter-super-yacht>h2').css('color','white');
    filters.minl = "40";
    filters.maxl = "150";
    collectFilter();
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
function checkedCheckbox(){

}
function submitModals(){
    $("#enquire_form").submit(function()
    {
        var email = $(".enquire_email").val(); // get email field value
        var name = $(".enquire_name").val(); // get name field value
        var surname = $(".enquire_surname").val(); // get name field value
        var number = $(".enquire-phone").val(); // get name field value
        var tomail = '';


        if ($("#checkboxes-0").is(":checked") || $("#checkboxes-3").is(":checked")|| $("#checkboxes-4").is(":checked")|| $("#checkboxes-5").is(":checked")){
          tomail = "yachts@equinoxe.it";
        }else if($("#checkboxes-1").is(":checked") || $("#checkboxes-2").is(":checked")){
          tomail = "yachts@equinoxe.it";
        }else{
          tomail = "yachts@equinoxe.it";
        }
        console.log(tomail);

        var msg = $(".enquire_msg").val(); // get message field value

        var mail_text= name +" "+ surname +"\r\n "+ number +"\r\n "+ email+"\r\n services: "
        if($("#checkboxes-0").is(":checked")){
          mail_text+=$("#checkboxes-0").val()};
          mail_text+=" ";
        if($("#checkboxes-1").is(":checked")){
          mail_text+=$("#checkboxes-1").val()};
          mail_text+=" ";
        if($("#checkboxes-2").is(":checked")){
          mail_text+=$("#checkboxes-2").val()};
          mail_text+=" ";
        if($("#checkboxes-3").is(":checked")){
          mail_text+=$("#checkboxes-3").val()};
          mail_text+=" ";
        if($("#checkboxes-4").is(":checked")){
          mail_text+=$("#checkboxes-4").val()};
          mail_text+=" ";
        if($("#checkboxes-5").is(":checked")){
          mail_text+=$("#checkboxes-5").val()};
          mail_text+=" ";
        mail_text += "\r\n message: "+msg;
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
                    'subject': name +" "+ surname +' - website',
                    'text': mail_text,
                    'to': [
                    {
                        'email': 'yachts@equinoxe.it',
                        //'email': tomail,
                        'name': 'Equinoxe yacht',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            $('#response-true').fadeIn(); // show success message
            $("#name").val(''); // reset field after successful submission
            $("#email").val(''); // reset field after successful submission
            $("#msg").val(''); // reset field after successful submission
            $.modal.close();
        })
        .fail(function(response) {
          $('#response-false').fadeIn();
        });
        return false; // prevent page refresh
    });

$("#yacht_modal").submit(function()
    {
        var email = $(".modal_email").val(); // get email field value
        var name = $(".modal_name").val(); // get name field value
        var surname = $(".modal_surname").val(); // get name field value
        var tomail = "";
        var number = $(".modal_phone").val();
        var theyacht = $('h1').text(); // get name field value
        var availability = $("li.availability");
        if(availability == "Sale"){
          tomail = "yachts@equinoxe.it";
        }else{
          tomail = "yachts@equinoxe.it";
        }

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
                    'subject': theyacht+ " - "+name +" "+ surname +' - website',
                    'text':  "yacht request: "+theyacht +"   "+name+"  "+surname+"   "+number+"  "+msg,
                    'to': [
                    {
                        'email': tomail,
                        'name': 'Equinoxe yachts',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            $('#response-true').fadeIn(); // show success message
            $("#name").val(''); // reset field after successful submission
            $("#email").val(''); // reset field after successful submission
            $("#msg").val(''); // reset field after successful submission
            $.modal.close();
        })
        .fail(function(response) {
          $('#response-false').fadeIn();
        });
        return false; // prevent page refresh
    });
}



///////////// Form validation


// function validate()
// {
//
//   $('#submit-form').on('click', function(e){
//     e.preventDefault;
//
//     var inputnumber = $('.enquire-phone');
//     var phonefilter = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
//
//     var inputemail = $('.enquire_email');
//     var emailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//
//
//
//
//     if(!inputnumber.value.match(phonefilter))
//       {
//           alert("Not a valid phone number");
//           return false;
//       }
//     else if (!emailfilter.test(inputemail.value))
//       {
//         alert('Not a valid mail');
//         return false;
//       }
//     else
//       {
//         submitModals();
//       }
//
//   });
// }
