/*
COMP466 Assignment 1: Part 3 - slideshow.js
Name: Kevin Wong							
ID: 3339323								
*/

// Global variables
var images = {
	slide: []
};
var asyncRequest;

// Set up and send the asynchronous request to get the XML file
function getContent(url) {

	// Attempt to create XMLHttpRequest object and make the request
	try {

		// Create request object
		asyncRequest = new XMLHttpRequest(); 

		// Register event handler
		asyncRequest.addEventListener("readystatechange", processResponse, false);
		asyncRequest.open("GET", url, true); // Prepare the request
		asyncRequest.send(null); // Send the request
	} // end try
	catch(exception) {
		alert("Request Failed");
	} // end catch
} // end function getContent

// Callback function for XMLHttpRequest
function processResponse() {

	// If request completed successfully and response XML is non-null
	if (asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML) {

		// Get the images from the responseXML and set to correct unit
		var image_nodes = asyncRequest.responseXML.getElementsByTagName("image");

		for (var i = 0; i < image_nodes.length; ++i) {
			var image_node = image_nodes[i].children;

			images.slide.push({
				"name" : "noir/" + image_node[0].innerHTML + ".jpg",
				"caption" : image_node[1].innerHTML
			});
		}

		displayImage(images.slide[0].name, images.slide[0].caption);
	}
}

function displayImage(img_name, img_caption) {
	var temp_image = new Image();
	temp_image.src = img_name;
	temp_image.onload = function() {
		draw(this);
	};

	var output = document.getElementById("box");

	var caption = document.createElement("p");
	caption.id = "caption";
	caption.setAttribute("class", "captions");
	caption.innerHTML = "test";

	box.appendChild(caption);
}

 function draw(image_obj) {
	var canvas = document.getElementById("myimage");
	var context = canvas.getContext("2d");
	canvas.width = image_obj.width;
	canvas.height = image_obj.height;
	context.drawImage(image_obj, 0, 0, image_obj.width, image_obj.height,
								 0, 0, canvas.width, canvas.height); 
} // end function draw

// Initial setup function
function start() {
	getContent("images.xml");
}

// Start after page loads
window.addEventListener("load", start, false);