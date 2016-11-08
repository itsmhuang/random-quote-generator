getQuote();
//new quote when click button
$("#get-quote").on("click", function() {
	//remove previous quote
	$(".quote").empty();
	$(".quote-author").empty();
	getQuote();
});

//or new quote when click spacebar
$(window).on("keyup", function(event) {
	//if backspace on empty text input
	if(event.which === 32) {

		$(".quote").empty();
		$(".quote-author").empty();
		getQuote();
	}	
		event.stopPropagation();
});

function getQuote() {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
		"method": "GET",
		"dataType": "jsonp"
	};
	$.ajax(settings).fail(function(response) {
		console.log("this doesn't work");
	})

	.done(function (response) {
		$(".quote").append('"'+response.quoteText+'"');
		var quote = '"'+response.quoteText+'"';
		var quoteAuthor;
		var tweetURL;
		if(response.quoteAuthor){
			$(".quote-author").append("- "+response.quoteAuthor);
			quoteAuthor = response.quoteAuthor;
			tweetURL = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +quote+" - "+quoteAuthor;
		}
		else{
			tweetURL = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +quote;	
		}
		console.log(response);
		$("#tweet > a").attr("href", tweetURL);
	});
}





