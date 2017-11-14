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
var cur_image = 0;
var image_length;
var TIME_INTERVAL = 3500; // screen refresh interval in milliseconds
var intervalTimer; // holds interval timer
var sequential = 1;
var starter = 1;

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

		// Find image length
		image_length = image_nodes.length;

		// Cycle through all images and stores them in a Json array
		for (var i = 0; i < image_length; ++i) {
			var image_node = image_nodes[i].children;

			images.slide.push({
				"name" : "noir/" + image_node[0].innerHTML + ".jpg",
				"caption" : image_node[1].innerHTML
			});
		}

		// Displays the very first image
		displayImage(images.slide[0].name, images.slide[0].caption);
	}
}

// Main Call function to display image
function displayImage(img_name, img_caption) {

	// Find transformation value
	var alt = document.getElementsByName("transformations");
	var cur_trans = alt[0].value;

	// Make image object, load it, and draw it
	var temp_image = new Image();
	temp_image.src = img_name;
	temp_image.onload = function() {
		draw(this, cur_trans);
	};

	// Grab output element that contains the caption
	var output = document.getElementById("box");

	// Set the caption
	var caption = document.getElementById("caption");
	caption.innerHTML = img_caption;

	// Append the caption to the output
	output.appendChild(caption);
}

// Draws and sets the image
function draw(image_obj, transformation) {

	// Gets the canvas element details, sets measurements, and draws initial image
	var canvas = document.getElementById("myimage");
	var context = canvas.getContext("2d");
	canvas.width = image_obj.width;
	canvas.height = image_obj.height;
	context.drawImage(image_obj, 0, 0, image_obj.width, image_obj.height,
								 0, 0, canvas.width, canvas.height);

	// Checks if there is a need to transform image
	if (transformation != 0) {

		// Get Picture details
		var imageData = context.getImageData(0, 0, image_obj.width, image_obj.height);
		var pixels = imageData.data;

		// Greyscale formula
		if (transformation == 1) {
			for (var i = 0; i < pixels.length; i += 4) {
				var average = (pixels[i] * 0.30 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11).toFixed(0);
				pixels[i] = average;
				pixels[i + 1] = average;
				pixels[i + 2] = average;
			}
		}
		// Transparency
		else if (transformation == 2) {
			for (var i = 3; i < pixels.length; i += 4) {
				pixels[i] = 125;
			}
		}
		// Brightness control
		else {
			// Darken
			if (transformation == 3) {
				var multi = 0.5;
			}
			// Brighter
			else if (transformation == 4) {
				var multi = 1.5;
			}
			// Bright!
			else {
				var multi = 3;
			}
			// Sets the defined brightness
			for (var i = 0; i < pixels.length; i += 4) {
				pixels[i] *= multi;
				pixels[i + 1] *= multi;
				pixels[i + 2] *= multi;
			}
		}
		// Transforms the image on the canvas
		context.putImageData(imageData, 0, 0);
	}
} // end function draw

// Move slideshow in certain direction
function slidemove(dir) {

	// Move image in correct direction
	cur_image += dir;
	cur_image += image_length;
	cur_image = cur_image % 20;
	
	// Draws the image
	displayImage(images.slide[cur_image].name, images.slide[cur_image].caption);
}

// Automation function for slideshow
function automated() {

	// Checks if it is sequential or not based on user choice
	update_sequential();
	if (sequential == 0) {

		// Sequential move
		slidemove(1);
	}
	else {

		// Random move
		slidemove(Math.floor(Math.random() * 20));
	}
}

// Slideshow control
function slideshow() {

	// Checks if slideshow is starting or stopping
	if (starter == 1) {

		// Start automation, reset starter, and change button display
		startTimer();
		starter = 0;
		document.getElementById("control").innerHTML = "Stop";
	}
	else {

		// Start automation, reset starter, and change button display
		stopTimer();
		starter = 1;
		document.getElementById("control").innerHTML = "Start";
	}
}

// Update user choice
function update_sequential() {

	// Grab sequential ordering choice from user
	var seq = document.getElementsByName("order");
	for (var i = 0; i < seq.length; ++i) {

		// Finds the user selection
		if (seq[i].checked) {
			sequential = seq[i].value;
			break;
		}
	}
}

// Set up interval timer to update game
function startTimer() {
	intervalTimer = window.setInterval(automated, TIME_INTERVAL);
}

// Terminate interval timer
function stopTimer() {
	window.clearInterval(intervalTimer);
}

// Triggered function based on radio change
function action_change(radio) {

	// Hides or Shows Forward and Backward control based on sequential selection
	var seqential_change1 = document.getElementById("forward");
	var seqential_change2 = document.getElementById("backwards");

	if (radio == 0) {
		seqential_change1.setAttribute("class", "control_menu");
		seqential_change2.setAttribute("class", "control_menu");
	}
	else {
		seqential_change1.setAttribute("class", "hidden");
		seqential_change2.setAttribute("class", "hidden");
	}
}

// Initial setup function
function start() {
	getContent("images.xml");

	// Stop timer if document unload event occurs
	document.addEventListener("unload", stopTimer, false);

	// Control system for main slideshow control
   	document.getElementById("control").addEventListener(
   		"click", slideshow, false);
 
	document.getElementById("forward").addEventListener(
		"click", function() { slidemove(1); }, false);

	document.getElementById("backwards").addEventListener(
		"click", function() { slidemove(-1); }, false);

	// Sequential radio button change triggers
	var seq = document.getElementsByName("order");
	seq[0].addEventListener("click", function() { action_change(0); }, false);
	seq[1].addEventListener("click", function() { action_change(1); }, false);

	// Transformation triggers
	var alt = document.getElementsByName("transformations");
	alt[0].addEventListener("click", function() { slidemove(0); }, false);
}

// Start after page loads
window.addEventListener("load", start, false);