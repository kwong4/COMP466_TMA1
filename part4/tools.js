/*
COMP466 Assignment 1: Part 4 - tools.js
Name: Kevin Wong							
ID: 3339323								
*/

var tool_set = ["Unit Converter", "Mortgage Calculator", "GPA Calculator"];
var current_tool;
var previous_unit;
var current_unit = 0;
var units = ["Weight", "Length", "Area", "Volume"];
var lengths = ["Meter", "Kilometer", "Centimeter", "Millimeter", "Nanometer", "Mile", "Yard", "Foot", "Inch"];
var weights = ["Kilogram", "Gram", "Milligram", "Metric Ton", "Long Ton", "Short Ton", "Short Ton", "Pound", "Ounce", "Carrat"];
var areas = ["Square Meter", "Square Kilometer", "Square Millimeter", "Square Micrometer", "Hectare", "Square Mile", "Square Yard", "Square Foot", "Square Inch"];
var volumes = ["Cubic Meter", "Cubic Kilometer", "Cubic Centimeter", "Cubic Millimeter", "Liter", "Milliliter"];

// Clear the content in the page
function clearContent() {

	// Clear the content and quiz div elements of the page
	document.getElementById("content").innerHTML = "";
}

function home() {
	clearContent();

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 Tools";

	// get the placeholder div name content
	var output = document.getElementById("content");
	output.setAttribute("class", "bulk");

	// Create a welcoming heading title
	var heading = document.createElement("h2");
	heading.innerHTML = "Welcome!"
	output.appendChild(heading);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Hello! Welcome to my COMP466 Tool application webpage. This application is meant to provide you with useful utilities such as:";
	output.appendChild(paragraph);

	// Create List for Tools to be displayed
	var list = document.createElement("ul");

	// Adds the tools to the list
	for (var i = 0; i < tool_set.length; ++i) {

		// Create a new list item
		var item = document.createElement("li");
		item.setAttribute("class", "important");
		item.innerHTML = tool_set[i];
		list.appendChild(item);
	}
	output.appendChild(list);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "These tools are accessible by clicking on the desired tool with the banner at the top of the screen.";
	output.appendChild(paragraph);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Instructions to use each tool will be displayed on their landing page.";
	output.appendChild(paragraph);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "It is hoped that this tools will prove useful to you :)";
	output.appendChild(paragraph);

	// Welcome message
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Made by: Kevin Wong";
	output.appendChild(paragraph);
}

function create_unit_converter() {
	var converter_content = document.getElementById("converter_content");
	converter_content.innerHTML = "";

	var converted_content = document.getElementById("converted_content");
	converted_content.innerHTML = "";

	// Welcome message
	var heading = document.createElement("h3");
	heading.innerHTML = "Current Measurement";
	converter_content.appendChild(heading);

	var heading = document.createElement("h3");
	heading.innerHTML = "Converted Measurement";
	converted_content.appendChild(heading);

	var line_break = document.createElement("br");
	converter_content.appendChild(line_break);

	var line_break = document.createElement("br");
	converted_content.appendChild(line_break);

	var curr_unit_input = document.createElement("input");
	curr_unit_input.setAttribute("type", "text");
	curr_unit_input.id = "curr_unit_input";
	converter_content.appendChild(curr_unit_input);

	var converted_unit_input = document.createElement("input");
	converted_unit_input.setAttribute("type", "text");
	converted_unit_input.id = "converted_unit_input";
	converted_content.appendChild(converted_unit_input);

	var curr_unit = document.createElement("select");
	curr_unit.setAttribute("class", "select_menu");
	curr_unit.setAttribute("name", "curr_unit");

	var curr_converted_unit = document.createElement("select");
	curr_converted_unit.setAttribute("class", "select_menu");
	curr_converted_unit.setAttribute("name", "curr_converted_unit");

	if (current_unit == 0) {
		var selected_units = weights;
	}
	else if (current_unit == 1) {
		var selected_units = lengths;
	}
	else if (current_unit == 2) {
		var selected_units = areas;
	}
	else {
		var selected_units = volumes;
	}

	for (var i = 0; i < selected_units.length; ++i) {
		var unit = document.createElement("option");
		var converted_unit = document.createElement("option");
		unit.value = i;
		converted_unit.value = i;
		unit.innerHTML = selected_units[i];
		converted_unit.innerHTML = selected_units[i];
		if (i == 0) {
			unit.selected = true;
			converted_unit.selected = true;
		}
		curr_unit.appendChild(unit);
		curr_converted_unit.appendChild(converted_unit);
	}

	var line_break = document.createElement("br");
	converter_content.appendChild(line_break);

	var line_break = document.createElement("br");
	converter_content.appendChild(line_break);

	var line_break = document.createElement("br");
	converted_content.appendChild(line_break);

	var line_break = document.createElement("br");
	converted_content.appendChild(line_break);

	converter_content.appendChild(curr_unit);
	converted_content.appendChild(curr_converted_unit);
}

function convert_it() {
	var curr_unit_input = document.getElementById("curr_unit_input");
	
	var user_input = parseFloat(curr_unit_input.value);
	
	if (isNaN(user_input)) {
		alert("Invalid input. Please enter a correct input");
	}
	else {
		if (current_unit == 0) {

		}
		else if (current_unit == 1) {

		}
		else if (current_unit == 2) {

		}
		else {
			
		}
	}
}

function update_unit_converter() {
	var select_menu = document.getElementsByName("tool_menu");
	previous_unit = current_unit;
	current_unit = select_menu[0].value;

	if (previous_unit != current_unit) {
		create_unit_converter();
	}

}

function converter() {
	clearContent();

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 Unit Converter";

	// get the placeholder div name content
	var output = document.getElementById("content");
	output.setAttribute("class", "bulk");

	var title = document.createElement("h3");
	title.innerHTML = "Instructions: ";
	output.appendChild(title);

	var paragraph = document.createElement("p");
	paragraph.innerHTML = "1.  To use the Unit Converter. Select the desired Unit Metric under <em>Current Unit:</em>";
	output.appendChild(paragraph);

	var paragraph = document.createElement("p");
	paragraph.innerHTML = "2.  Then enter the starting unit and measurement under <em>Current Measurement</em>";
	output.appendChild(paragraph);

	var paragraph = document.createElement("p");
	paragraph.innerHTML = "3.  Finally select the desired final unit result under <em>Converted Measurement</em> and hit <em>Submit</em>";
	output.appendChild(paragraph);

	var paragraph = document.createElement("p");
	paragraph.innerHTML = "4.  The result should be shown under <em>Converted Measurement</em>";
	output.appendChild(paragraph);

	var paragraph = document.createElement("p");
	paragraph.innerHTML = "Note - <em>Any Non-Numeric characters after valid numeric characters will be ignorged</em>";
	output.appendChild(paragraph);

	var line_break = document.createElement("br");
	output.appendChild(line_break);

	var unit_title = document.createElement("label");
	unit_title.innerHTML = "Current Unit: ";
	output.appendChild(unit_title);

	var select_menu = document.createElement("select");
	select_menu.setAttribute("class", "select_menu");
	select_menu.setAttribute("name", "tool_menu");
	select_menu.addEventListener("click", update_unit_converter, false);

	for (var i = 0; i < units.length; ++i) {
		var unit = document.createElement("option");
		unit.value = i;
		unit.innerHTML = units[i];
		if (i == 0) {
			unit.selected = true;
		}
		select_menu.appendChild(unit);
	}

	output.appendChild(select_menu);

	var line_break = document.createElement("br");
	output.appendChild(line_break);

	var line_break = document.createElement("br");
	output.appendChild(line_break);

	var line_break = document.createElement("br");
	output.appendChild(line_break);

	var converter_content = document.createElement("div");
	converter_content.id = "converter_content";
	converter_content.setAttribute("class", "box_curr_unit");
	output.appendChild(converter_content);

	var converter_content = document.createElement("div");
	converter_content.id = "converted_content";
	converter_content.setAttribute("class", "box_curr_unit");
	output.appendChild(converter_content);

	var line_break = document.createElement("br");
	output.appendChild(line_break);

	var line_break = document.createElement("br");
	output.appendChild(line_break);

	var submit_conversion = document.createElement("button");
	submit_conversion.id = "submit_conversion";
	submit_conversion.setAttribute("type", "button");
	submit_conversion.setAttribute("class", "submit_conversion");
	submit_conversion.innerHTML = "Submit";
	submit_conversion.addEventListener("click", convert_it, false)
	output.appendChild(submit_conversion);

	create_unit_converter();
}

function mortgage() {
	clearContent();

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 Mortgage Calculator";
}

function gpa() {
	clearContent();

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 GPA Calculator";
}

// Initial setup function
function start() {

	home();

	// Home page
	document.getElementById("home").addEventListener(
		"click", home, false);

	// Tool 1
	document.getElementById("tool_1").addEventListener(
		"click", converter, false);

	// Tool 2
	document.getElementById("tool_2").addEventListener(
		"click", mortgage, false);

	// Ttool 3
	document.getElementById("tool_3").addEventListener(
		"click", gpa, false);
}

// Start after page loads
window.addEventListener("load", start, false);