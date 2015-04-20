var slidesInterval;

//Resize
$( window ).resize(function() {

  $.modal.resize();
  if($(".fullpage-wrapper")[0]){
    $.fn.fullpage.reBuild();
  }
  centerImagesInGrid();
});


var imgLoad = imagesLoaded( 'body' );

imgLoad.on( 'done', function( instance ) {
  
  centerImagesInGrid();
  var pathArray = window.location.pathname.split( '/' );
  if (pathArray[2] == "single_yacht.html"){
    $('.img-holder').imageScroll({coverRatio: 1,extraHeight: 0});  
    }else if (pathArray[2] == "single_expedition.html"){
      $('.img-holder').imageScroll({coverRatio: 1,extraHeight: 0});  
    }else{
      $('.img-holder').imageScroll({coverRatio: 1,extraHeight: 0});
    }
});


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
    $("a.filter").each(function(){
        $(this).click(function(e){
            e.stopPropagation();
            var id = $(this).attr('id');
            var target = id.slice(-1);
            activeFS(target);
            activeLI(target);
            e.preventDefault();
            $("div.filter-opened-section").slideDown();

        });
    });
}
function activeFS(target){
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
      values: [ 1, 15],
      slide: function( event, ui ) {
        $( "p.min-guest" ).text( ui.values[ 0 ] + "guests" );
        $( "p.max-guest" ).text( ui.values[ 1 ] + "guests");

      }
    });
    $( "p.min-guest" ).text( $( "#slider-guest" ).slider( "values", 0 )+ "guests");
    $( "p.max-guest" ).text( $( "#slider-guest" ).slider( "values", 1 )+ "guests");
}
function rangeSlider(){
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      step: 5,
      values: [ 0, 500 ],
      slide: function( event, ui ) {
        $( "p.min-price" ).text( "€" + ui.values[ 0 ] + "k" );
        $( "p.max-price" ).text( "€" + ui.values[ 1 ] + "k");

      }
    });
    $( "p.min-price" ).text( "€" + $( "#slider-range" ).slider( "values", 0 )+ "k");
    $( "p.max-price" ).text( "€" + $( "#slider-range" ).slider( "values", 1 )+ "k");
}
$(document).ready(function() {

    


    filterMenu();
    rangeSlider();
    guestSlider();
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

    
    $('#simple-menu').sidr({
        displace: true,
        onOpen : menuOpen,
        onClose : menuClose
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
function webSlide(){
    $("#onepage").load("slides/yacht_size_web.html",function(data){ 
      homeSlides();
      createLanding();
    });
}
function mobileSlide(){
    $("#onepage").load("slides/yacht_size_mobile.html",function(data){ 
        homeSlides();
        createLanding();
    });
}

      
function checkPage(size){
    var pathArray = window.location.pathname.split( '/' );
    console.log(pathArray)
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
            if (counter != target){
                $(this).fadeOut(0);
                 
            }else{
                $(this).fadeIn(1000);
                
            }
            
            counter++;
        }); 
}

function hideStatements(target){
    var counter = 1;

        $('p.statement').each(function(){
            if (counter != target){
                $(this).fadeOut(0);
                 
            }else{
                $(this).fadeIn(1000);
                
            }
            
            counter++;
        });
};

function centerImagesInGrid(){
    height = $(window).height();
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
    $('a#m1').addClass("active");

    $('li.item').each(function(){
        $(this).find('a').hover(function(e){
            var id = e.target.id;
            var target = id.slice(-1);
            hideStatements(target);
            hideCTA(target);
            hideSlides(target);
            activeItem(target);
            clearInterval(slidesInterval);
        });
        $(this).mouseleave(function(e){
            var id = e.target.id;
            var target = parseInt(id.slice(-1))+1;
            timerSlidesHome(target);
        });
    });
    timerSlidesHome();
}
function timerSlidesHome(counter){
    counter = (typeof counter !== 'undefined' )? counter : 1;
    
    slidesInterval = setInterval(function() {
        if( counter == $('li.item').length+1){
            counter = 1;
        }
        console.log(counter);
        hideStatements(counter);
        hideCTA(counter);
        hideSlides(counter);
        activeItem(counter);

        counter++   
      }, 10000);
}
function activeItem(target){
    var counter = 1;

        $('#anchor-menu li.item').each(function(){
            $link = $(this).find('a')
            if (counter != target){
                $link.removeClass("active");
                 
            }else{
                $link.addClass("active");
                
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

