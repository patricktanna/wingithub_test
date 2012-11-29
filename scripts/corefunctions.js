// updated August 30th 2011

// overlay player config
feedUrl = "http://www.sonypictures.com/previews/movies/battlelosangeles.xml"; 
autocloseToggle = true; 
singlevideoToggle = false; 
callbackToggle = true;
clipName = 1757;
parentSwf = 'enterthesite-video';

var SplashUI = function() {
	
	// PRIVATE
	
	// any special styling that need to be done on load should be in this function
	function initStylesAndMethods() {	
		Cufon.replace('.cufon', { textShadow: '1px 1px #434d50', fontFamily: 'AkzidenzGroteskBE' });
		Cufon.replace('#release-date', { fontFamily: 'Helvetica Neue Medium' });
		$('#connect-share').removeClass('connect-expanded');
		$('#connect-share-extras, #arrow').hide();
		$('#share').css('opacity', 0.3);
		
		if(typeof popUpsAndTrackingFunctions != 'function') {
			$('a[rel="external"]').bind('click', function() {
				window.open($(this).attr('href'), '_blank');
				return false;
			});
		}
	}
	
	// use it only if you want to animate things
	function animation() {
	}
	
	// opens full screen window for the immersive - only used when enter the site button is active
	function enterTheSite() {
		$('#enterthesite, h1').bind('click', function() {
			var link = $('#enterthesite a').eq(0).attr('href');
			window.open(link, '', 'fullscreen=yes, scrollbars=yes, resizable=no, status=no, directories=no, toolbar=no');
			if(typeof sCode == 'object') {
				if($(this).attr('id') == 'enterthesite') {
					sCode.trackFeaturedContentClick(link, 'entersite_button');
				}				
			}
			return false;
		});
	}
	
	// video that goes into enter the site button - only used when enter the site button is active
	function embedVideo($width, $height) {
		var flashvars = {};
		var params = {
			wmode: 'opaque',
			allowscriptaccess: true
		};	
		var attributes = {};
		swfobject.embedSWF('media/video.swf', 'enterthesite-video', $width, $height, '10', '', flashvars, params, attributes);
	}
	
	// plays videos with rel tag that starts with "playvideo". To play specific clip, add dash then number. Example: rel="playvideo-3144"
	function playVideos() {
		$('#menu a[rel^="playvideo"]').bind('click', function() {
			var clipId = $(this).attr('rel').split('-')[1];
			if(document.getElementById('enterthesite-video')) {
				document.getElementById('enterthesite-video').pause();
			}
			if(clipId) {
				openOverlay(clipId);				
			} else {
				openOverlay();
			}
			return false;
		});
	}
	
	//opens the overlay player and plays a specified clip
	function autoPlay(clipId) {
		var autoPlayTrailer = setTimeout("openOverlay(" + clipId + ");", 5000);
		$('#menu, a').bind('click', function(){
			clearTimeout(autoPlayTrailer);
		});			
	}
	
	function embedTicketsWidget($widgetDivId, $width, $height) {
		var flashvars;
		var params = {
			allowscriptaccess:"always",
			allowfullscreen:"true",
			base:"media/",
			wmode:"transparent",
			salign: "left"
		};					
		var attributes = {
			id: $widgetDivId
		};										
		swfobject.embedSWF(params.base + "sa_widget.swf", $widgetDivId, $width, $height, "9.0.115", "", flashvars, params, attributes);
	}
	
	function registerPopup() {
		$('#register').bind('click', function() {
			window.open(this.href, '', 'width=620, height=680, scrollbars=yes, resizable=no');
			return false;
		});
	}
	
	// PUBLIC/PRIVILEGED 

	// Only include the functions that are going to get used
	this.init = function() {
		initStylesAndMethods();
		//enterTheSite();
		//embedVideo(232,94);
		//playVideos();		
		//embedTicketsWidget('getticketswidget', 257, 335);
		registerPopup();
	}	
		
}

var sui = new SplashUI();

$(function() {	
	sui.init();
});
