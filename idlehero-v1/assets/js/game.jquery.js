$(document).ready(function() {
	var d = document;

	$("#Game").click(function() {

	});

	$.getJSON("data.json", function(data) {
		var items = [];
		$.each(data, function(key, val) {
			items.push("<li id='" + key + "'>" + key + val + "</li>");
		});

		$("<ul/>", {
			"class" : "my-new-list",
			html : items.join("")
		}).appendTo("body");
	});

});

$.fn.createFactory = function() {
	//alert('createFactory function called');
	var root = $("#Game");
	var html = $("<div></div>").addClass('card');
	html.append($("<div></div>").addClass("card-block").text("card block here"));
	html.append($("<div></div>").addClass("card-block").text("card block here"));

	root.append(html);
};
