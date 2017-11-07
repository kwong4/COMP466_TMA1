/*
COMP466 Assignment 1: Part 2 - tutorial.js
Name: Kevin Wong							
ID: 3339323								
*/

// Global variables
var unit_number;
var asyncRequest;
var cur_questions;

// Set up and send the asynchronous request to get the XML file
function getContent(url, tab) {

	// Set the global unit number
	unit_number = tab;

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
	if (asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML && unit_number != -1) {

		// Clear current content
		clearContent();

		// Get the units from the responseXML and set to correct unit
		var units = asyncRequest.responseXML.getElementsByTagName("unit");
		units = units[unit_number].children;

		// Get the placeholder div name content
		var output = document.getElementById("content");
		output.setAttribute("class", "");

		// Set the title for the current unit
		var title = document.getElementById("title");
		title.innerHTML = units[0].innerHTML;

		// Cycle through all the elements in the unit
		for (var i = 1; i < units.length; ++i) {

			// Create a h3 element for each section title
			var section_title = document.createElement("h3");

			// Get the content from the unit
			var unit = units[i].children;

			// Set the h3 section title element
			section_title.id = "sectiontitle_" + i;
			section_title.setAttribute("class", "section_portion");
			section_title.innerHTML = unit[0].innerHTML;

			// Append the section title element to the HTML5 node
			output.appendChild(section_title);

			// Cycle through all of the sections
			for (var j = 1; j < unit.length; ++j) {

				// Create a p element for each description
				var description_entry = document.createElement("p");
				description_entry.id = "p_" + i;
				description_entry.setAttribute("class", "description_para");
				description_entry.innerHTML = unit[j].innerHTML;

				// Append the element to output div element
				output.appendChild(description_entry);
			}
		}

		// Get the placeholder div name quiz
		output = document.getElementById("quiz");

		// Create a h2 element for the Quiz heading
		var quiz_heading = document.createElement("h2");
		quiz_heading.id = "quiz_heading";
		quiz_heading.innerHTML = "Quiz";

		// Append the Quiz heading to the quiz div
		output.appendChild(quiz_heading);

		// Obtain the correct quiz data
		var quizes = asyncRequest.responseXML.getElementsByTagName("quiz");
		quizes = quizes[unit_number].children;

		// Set global variable for quiz for answer checking later
		cur_questions = quizes;

		// Cycle through the questions of the quiz
		for (var i = 0; i < quizes.length; ++i) {

			// Define each question element in the quiz
			var question = quizes[i].children;

			// Create a h4 element for each question title
			var question_title = document.createElement("h4");

			// Create the question title and append to output div
			question_title.id = "questiontitle_" + i;
			question_title.innerHTML = question[0].innerHTML;
			output.appendChild(question_title);

			// Cycle through the answers
			for (var j = 1; j < question.length; ++j) {

				// Create an input radio button element with correct info
				var answer_entry = document.createElement("input");
				answer_entry.id = "q_" + i + "_a" + j;
				answer_entry.setAttribute("class", "answer_radio");
				answer_entry.setAttribute("type", "radio");
				answer_entry.setAttribute("name", "question" + i);
				answer_entry.setAttribute("value", question[j].attributes[0].value)
				output.appendChild(answer_entry);

				// Create an label element with the correct answer
				var text = document.createElement("label");
				text.id = "q_" + i + "_a" + j + "_text";
				text.setAttribute("class", "answer");
				text.innerHTML = question[j].innerHTML;

				// Append to output and formatting
				output.appendChild(text);
				output.appendChild(document.createElement("br"));
			}
		}

		// Create the submit button
		var submit_button = document.createElement("input");
		submit_button.id = "submit_button";
		submit_button.setAttribute("class", "submit");
		submit_button.setAttribute("type", "button");
		submit_button.setAttribute("value", "Submit");

		// Create Event Listener for when user wants to validate quiz
		submit_button.addEventListener(
			"click", validateAnswers, false);
		output.appendChild(submit_button);
	}

	// Check if initial setup
	if (asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML && unit_number == -1) {
		home();
	}
}

// Clear the content in the page
function clearContent() {

	// Clear the content and quiz div elements of the page
	document.getElementById("content").innerHTML = "";
	document.getElementById("quiz").innerHTML = "";
}

// Validate answers from quiz
function validateAnswers() {

	// Sets initial variables
	var correct = 0;
	var total = 0;

	// Cycles through each question on the current unit
	for (var i = 0; i < cur_questions.length; ++i) {

		// Cycles through each answer on the quiz
		var cur_question = cur_questions[i].children;
		for (var j = 1; j < cur_question.length; ++j) {

			// Checks if answer is correct
			if (cur_question[j].attributes[0].value == "*") {

				// Check if user input correct answer
				if (document.getElementById("q_" + i + "_a" + j).checked) {

					// Keep track of correct answers
					correct++;
				}

				// Highlight correct answers
				document.getElementById("q_" + i + "_a" + j + "_text").setAttribute("class", "highlight");
			}
		}
		// Keep track of total answers
		total++;
	}
	// Alert user of Percentage of quiz
	alert("Quiz Percentage: " + correct / total * 100 + "%");
}

// Home Tab
function home() {

	// Clear current content
	clearContent();

	// Set the title for the current unit
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 Tutorial";

	// get the placeholder div name content
	var output = document.getElementById("content");
	output.setAttribute("class", "bulk");

	// Create a welcoming heading title
	var heading = document.createElement("h2");
	heading.innerHTML = "Welcome!"
	output.appendChild(heading);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Hello! Welcome to my COMP466 Tutorial. This application is meant to teach you about the following units from COMP466.";
	output.appendChild(paragraph);

	// Create List for Units to be displayed
	var list = document.createElement("ul");

	// Adds the units to the list
	var titles = asyncRequest.responseXML.getElementsByTagName("title");
	for (var i = 0; i < titles.length; ++i) {

		// Create a new list item
		var item = document.createElement("li");
		item.setAttribute("class", "important");
		item.innerHTML = titles[i].innerHTML;
		list.appendChild(item);
	}
	output.appendChild(list);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "These units are accessible by clicking on the desired unit with the banner at the top of the screen.";
	output.appendChild(paragraph);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Each Unit has a quiz to test the skills and knowledge you have learned.";
	output.appendChild(paragraph);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "It is hoped that you will obtain a mix of both high and low level knowledge after taking these units! :)";
	output.appendChild(paragraph);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Made by: Kevin Wong";
	output.appendChild(paragraph);
}

// Initial setup function
function start() {

	// Obtain information from XML and start home page
	getContent("tutorial.xml", -1);

	// Home page
	document.getElementById("home").addEventListener(
		"click", home, false);

	// Unit 1
	document.getElementById("tutorial_1").addEventListener(
		"click", function() { getContent("tutorial.xml", 0); }, false);

	// Unit 2
	document.getElementById("tutorial_2").addEventListener(
		"click", function() { getContent("tutorial.xml", 1); }, false);

	// Unit 3
	document.getElementById("tutorial_3").addEventListener(
		"click", function() { getContent("tutorial.xml", 2); }, false);
}

// Start after page loads
window.addEventListener("load", start, false);