/*
COMP466 Assignment 1: Part 2 - tutorial.js
Name: Kevin Wong							
ID: 3339323								
*/

var unit_number;
var asyncRequest;

// set up and send the asynchronous request to get the XML file
function getContent(url, tab) {

	unit_number = tab;

	// attempt to create XMLHttpRequest object and make the request
	try {
		asyncRequest = new XMLHttpRequest(); // create request object

		// register event handler
		asyncRequest.addEventListener("readystatechange", processResponse, false);
		asyncRequest.open("GET", url, true); // prepare the request
		asyncRequest.send(null); // send the request
	} // end try
	catch(exception) {
		alert("Request Failed");
	} // end catch
} // end function getContent

function processResponse() {

	// if request completed successfully and response XML is non-null
	if (asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML) {

		// Clear current content
		clearContent();

		// get the units from the responseXML and set to correct unit
		var units = asyncRequest.responseXML.getElementsByTagName("unit");
		units = units[unit_number].children;

		// get the placeholder div name content
		var output = document.getElementById("content");

		// Set the title for the current unit
		var title = document.getElementById("title");
		title.innerHTML = units[0].innerHTML;

		// place elements in the div
		for (var i = 1; i < units.length; ++i) {

			// Create a h3 element for each section title
			var section_title = document.createElement("h3");

			// get the content from the unit
			var unit = units[i].children;

			section_title.id = "sectiontitle_" + i;
			section_title.setAttribute("class", "section_title");
			section_title.innerHTML = unit[0].innerHTML;

			output.appendChild(section_title);

			for (var j = 1; j < unit.length; ++j) {

				// Create a p element for each description
				var description_entry = document.createElement("p");

				description_entry.id = "p_" + i;
				description_entry.setAttribute("class", "description_para");
				description_entry.innerHTML = unit[j].innerHTML;

				output.appendChild(description_entry);
			}
		}
	}
}

function clearContent() {
	document.getElementById("content").innerHTML = "";
}

function start() {
	document.getElementById("tutorial_1").addEventListener(
		"click", function() { getContent("tutorial.xml", 0); }, false);

	document.getElementById("tutorial_2").addEventListener(
		"click", function() { getContent("tutorial.xml", 1); }, false);

	document.getElementById("tutorial_3").addEventListener(
		"click", function() { getContent("tutorial.xml", 2); }, false);
}

window.addEventListener("load", start, false);