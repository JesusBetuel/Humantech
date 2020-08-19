$(document).ready(function(){

	var params={};
	window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value){
		params[key] = value;
		$('html, body').animate({
			scrollTop: $("#"+value).offset().top
		}, 500, function() {
            $('#'+value).animateCss('shake');
        });

	});

});


$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
