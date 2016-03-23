/*
	Solid State by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	"use strict";

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

		// Menu.
			var $menu = $('#menu');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menu
				.appendTo($body)
				.on('click', function(event) {

					event.stopPropagation();

					// Hide.
						$menu._hide();

				})
				.find('.inner')
					.on('click', '.close', function(event) {

						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();

						// Hide.
							$menu._hide();

					})
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('click', 'a', function(event) {

						var href = $(this).attr('href');

						event.preventDefault();
						event.stopPropagation();

						// Hide.
							$menu._hide();

						// Redirect.
							window.setTimeout(function() {
								window.location.href = href;
							}, 350);

					});

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

				});


		$('.close').click(function(e){
			e.preventDefault();
			$('#enquire-modal').removeClass('animated fadeInUp').addClass('animated fadeOutDown');
			$("body").css("overflow-y", "auto")
		});

		$('.open').click(function(e){
			e.preventDefault();
			$('#enquire-modal').show().removeClass('animated fadeOutDown').addClass('animated fadeInUp');
			$("body").css("overflow-y", "hidden");
		})



	});
		// I only have one form on the page but you can be more specific if need be.

		$('#equinoxe_newsletter').ajaxChimp({
			url: '//equinoxeyachts.us13.list-manage.com/subscribe/post?u=b339c3a4e555e344d10f41436&amp;id=322fae06dc'
		});
	submitModals();
	function submitModals(){
	    $("#enquire_form").submit(function(){
	        var email = $(".enquire_email").val(); // get email field value
	        var name = $(".enquire_name").val(); // get name field value
	        var surname = $(".enquire_surname").val(); // get name field value
	        var number = $(".enquire-phone").val(); // get name field value
	        var tomail = 'yachts@equinoxe.it';

	        console.log(tomail);

	        var msg = $(".enquire_msg").val(); // get message field value

	        var mail_text= name +" "+ surname +"\r\n "+ number +"\r\n "+ email+"\r\n services: "
	        if($("#checkbox-0").is(":checked")){
	          mail_text+=$("#checkbox-6").val()};

	          mail_text+=" ";
	        if($("#checkbox-1").is(":checked")){
	          mail_text+=$("#checkbox-1").val()};

	          mail_text+=" ";
	        if($("#checkbox-2").is(":checked")){
	          mail_text+=$("#checkbox-2").val()};

	          mail_text+=" ";
	        if($("#checkbox-3").is(":checked")){
	          mail_text+=$("#checkbox-3").val()};

	          mail_text+=" ";
	        if($("#checkbox-4").is(":checked")){
	          mail_text+=$("#checkbox-4").val()};

	          mail_text+=" ";
	        if($("#checkbox-5").is(":checked")){
	          mail_text+=$("#checkbox-5").val()};

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
	            $('#enquire-modal').removeClass('animated fadeInUp').addClass('animated fadeOutDown');
	        })
	        .fail(function(response) {
	          $('#response-false').fadeIn();
	        });
	        return false; // prevent page refresh
	    });
		}

})(jQuery);
