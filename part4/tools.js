/*
COMP466 Assignment 1: Part 4 - tools.js
Name: Kevin Wong							
ID: 3339323						
*/

// Global variables
var tool_set = ["Unit Converter", "Mortgage Calculator", "GPA Calculator"];
var current_tool;
var previous_unit;
var current_unit = 0;
var course_number = 0;
var units = ["Weight", "Length", "Area", "Volume"];
var lengths = ["Meter", "Kilometer", "Centimeter", "Millimeter", "Nanometer", "Mile", "Yard", "Foot", "Inch"];
var weights = ["Kilogram", "Gram", "Milligram", "Tonne", "Pound", "Ounce"];
var areas = ["Square Meter", "Square Kilometer", "Square Mile", "Square Yard", "Square Foot", "Square Inch", "Hectare", "Acre"];
var volumes = ["Cubic Meter", "Cubic Foot", "Cubic Inch", "Liter", "Milliliter"];

// Length Conversion Formulas
var length_conversion = [
[1, 0.001, 100, 1000, 1000000000, 0.000621371, 1.09361, 3.28084, 39.3701],
[1000, 1, 100000, 1000000, 1000000000000, 0.621371, 1093.61, 3280.84, 39370.1],
[0.01, 0.00001, 1, 10, 1000000, 0.00000621371, 0.0109361, 0.0328084, 0.393701],
[0.001, 0.000001, 0.1, 1, 1000000, 0.000000621371, 0.00109361, 0.00328084, 0.0393701],
[0.000000001, 0.000000000001, 0.0000001, 0.000001, 1, 0.000000000000621371, 0.00000000109361, 0.00000000328084, 0.0000000393701],
[1609.34, 1.60934, 160934, 1609340, 1609340000000, 1, 1760, 5280, 63360],
[0.9144, 0.0009144, 91.44, 914.4, 914400000, 0.000568182, 1, 3, 36],
[0.3048, 0.0003048, 30.48, 304.8, 304800000, 0.000189394, 0.333333, 1, 12],
[0.0254, 0.0000254, 2.54, 25.4, 25400000, 0.000015783, 0.0277778, 0.0833333, 1]
];

// Weight Conversion Formulas
var weight_conversion = [
[1, 1000, 1000000, 0.001, 2.20462, 35.274],
[0.001, 1, 1000, 0.000001, 0.00220462, 0.035274],
[0.000001, 0.001, 1, 0.000000001, 0.00000220462, 0.000035274],
[1000, 1000000, 1000000000, 1, 2204.62, 35274],
[0.453592, 453.592, 453592, 0.000453592, 1, 16],
[0.0283495, 28.3495, 28349.5, 0.0000283495, 0.0625, 1]
];

// Area Conversion Formulas
var area_conversion = [
[1, 0.000001, 0.0000003561, 1.19599, 10.7639, 1550, 0.0001, 0.000247105], 
[1000000, 1, 0.386102, 1196000, 10760000, 1550000000, 100, 247.105],
[2590000, 2.58999, 1, 3098000, 27880000, 401400000, 258.999, 640],
[0.836127, 0.000000836127, 0.00000032283, 1, 9, 1296, 0.000083613, 0.000206612],
[0.092903, 0.000000092903, 0.00000003587, 0.111111, 1, 144, 0.0000092903, 0.000022957],
[0.00064516, 0.00000000064516, 0.0000000002491, 0.000771605, 0.00694444, 1, 0.000000064516, 0.00000015942],
[10000, 0.01, 0.00386102, 11959.9, 107639, 15500000, 1, 2.47105],
[4046.86, 0.00404686, 0.0015625, 4840, 43560, 6273000, 1]
];

// Volume Conversion Formulas
var volume_conversion = [
[1, 35.3147, 61023.7, 1000, 1000000],
[0.0283168, 1, 1728, 28.3168, 28316.8],
[0.000016387, 0.000578704, 1, 0.0163871, 16.3871],
[0.001, 0.0353147, 61.0237, 1, 1000],
[0.000001, 0.0000353147, 0.0610237, 0.001, 1]
];

// Grade grades to values
var course_grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
var course_value = [4, 4, 3.7, 3.3, 3, 2.7, 2.3, 2, 1.7, 1.3, 1, 0.7, 0];

// Clear the content in the page
function clearContent() {

	// Clear the content and quiz div elements of the page
	document.getElementById("content").innerHTML = "";
}

// Main homepage
function home() {

	// Clear main page
	clearContent();

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 Tools";

	// Get the placeholder div name content
	var output = document.getElementById("content");
	output.setAttribute("class", "bulk");

	// Create a Welcoming heading title
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

// Create the Unit Converter Page
function create_unit_converter() {

	// Reset the Converter box
	var converter_content = document.getElementById("converter_content");
	converter_content.innerHTML = "";

	// Reset the Converted box
	var converted_content = document.getElementById("converted_content");
	converted_content.innerHTML = "";

	// Converter Title
	var heading = document.createElement("h3");
	heading.innerHTML = "Current Measurement";
	converter_content.appendChild(heading);

	// Converted Title
	var heading = document.createElement("h3");
	heading.innerHTML = "Converted Measurement";
	converted_content.appendChild(heading);

	// Line break
	var line_break = document.createElement("br");
	converter_content.appendChild(line_break);

	// Line break
	var line_break = document.createElement("br");
	converted_content.appendChild(line_break);

	// Create measurement input
	var curr_unit_input = document.createElement("input");
	curr_unit_input.setAttribute("type", "text");
	curr_unit_input.id = "curr_unit_input";
	converter_content.appendChild(curr_unit_input);

	// Create measurement result
	var converted_unit_input = document.createElement("input");
	converted_unit_input.setAttribute("type", "text");
	converted_unit_input.id = "converted_unit_input";
	converted_content.appendChild(converted_unit_input);

	// Create initial measurement dropdown
	var curr_unit = document.createElement("select");
	curr_unit.setAttribute("class", "select_menu");
	curr_unit.setAttribute("name", "curr_unit");

	// Create result measurement dropdown
	var curr_converted_unit = document.createElement("select");
	curr_converted_unit.setAttribute("class", "select_menu");
	curr_converted_unit.setAttribute("name", "curr_converted_unit");

	// Find out which units the user has selected
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

	// Fill in the select menus with the selected units
	for (var i = 0; i < selected_units.length; ++i) {

		// Create options
		var unit = document.createElement("option");
		var converted_unit = document.createElement("option");

		// Set their value
		unit.value = i;
		converted_unit.value = i;

		// Name accordingly
		unit.innerHTML = selected_units[i];
		converted_unit.innerHTML = selected_units[i];

		// Select the first element in the list
		if (i == 0) {
			unit.selected = true;
			converted_unit.selected = true;
		}

		// Append the result
		curr_unit.appendChild(unit);
		curr_converted_unit.appendChild(converted_unit);
	}

	// Line break
	var line_break = document.createElement("br");
	converter_content.appendChild(line_break);

	// Line break
	var line_break = document.createElement("br");
	converter_content.appendChild(line_break);

	// Line break
	var line_break = document.createElement("br");
	converted_content.appendChild(line_break);

	// Line break
	var line_break = document.createElement("br");
	converted_content.appendChild(line_break);

	// Append elements to the webpage
	converter_content.appendChild(curr_unit);
	converted_content.appendChild(curr_converted_unit);
}

// Conversion
function convert_it() {

	// Find user measurement input
	var curr_unit_input = document.getElementById("curr_unit_input");
	var user_input = parseFloat(curr_unit_input.value);
	
	// Checks if the user inputs a valid input
	if (isNaN(user_input)) {
		alert("Invalid input. Please enter a correct input");
	}
	else {

		// Grab output element
		var conv_unit_input = document.getElementById("converted_unit_input");

		// Obtain the initial unit and converted units
		var curr_measurement = document.getElementsByName("curr_unit");
		curr_measurement = curr_measurement[0].value;

		var conv_measurement = document.getElementsByName("curr_converted_unit");
		conv_measurement = conv_measurement[0].value;

		// Grabs result of conversion based on unit selection
		if (current_unit == 0) {
			var result = user_input * weight_conversion[curr_measurement][conv_measurement];
		}
		else if (current_unit == 1) {
			var result = user_input * length_conversion[curr_measurement][conv_measurement];
		}
		else if (current_unit == 2) {
			var result = user_input * area_conversion[curr_measurement][conv_measurement];
		}
		else {
			var result = user_input * volume_conversion[curr_measurement][conv_measurement];
		}

		// Sets the converted result
		conv_unit_input.value = result;
	}
}

// Updates the content if the units are switched
function update_unit_converter() {

	// Checks if the current tool has changed
	var select_menu = document.getElementsByName("tool_menu");
	previous_unit = current_unit;
	current_unit = select_menu[0].value;

	// If tools has changed, update content
	if (previous_unit != current_unit) {
		create_unit_converter();
	}

}

// Conversion landing portion
function converter() {

	// Clears the content
	clearContent();

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 Unit Converter";

	// Get the placeholder div name content
	var output = document.getElementById("content");
	output.setAttribute("class", "bulk");

	// Instruction heading
	var title = document.createElement("h3");
	title.innerHTML = "Instructions: ";
	output.appendChild(title);

	// Instructions
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "1.  To use the Unit Converter, Select the desired Unit Metric under <em>Current Unit:</em>";
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
	paragraph.innerHTML = "<em>Note: Any Non-Numeric characters after valid numeric characters will be ignorged</em>";
	output.appendChild(paragraph);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Current Unit selection
	var unit_title = document.createElement("label");
	unit_title.innerHTML = "Current Unit: ";
	output.appendChild(unit_title);

	var select_menu = document.createElement("select");
	select_menu.setAttribute("class", "select_menu");
	select_menu.setAttribute("name", "tool_menu");
	select_menu.addEventListener("click", update_unit_converter, false);

	// Creates the options for the Unit selection
	for (var i = 0; i < units.length; ++i) {

		// Creates an unit option
		var unit = document.createElement("option");
		unit.value = i;
		unit.innerHTML = units[i];

		// Selects the first unit choice
		if (i == 0) {
			unit.selected = true;
		}

		// Appends the option to the Unit selection
		select_menu.appendChild(unit);
	}

	// Appends the Unit selection
	output.appendChild(select_menu);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Initial Conversion box
	var converter_content = document.createElement("div");
	converter_content.id = "converter_content";
	converter_content.setAttribute("class", "box_curr_unit");
	output.appendChild(converter_content);

	// Result Conversion box
	var converter_content = document.createElement("div");
	converter_content.id = "converted_content";
	converter_content.setAttribute("class", "box_curr_unit");
	output.appendChild(converter_content);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Submit button
	var submit_conversion = document.createElement("button");
	submit_conversion.id = "submit_conversion";
	submit_conversion.setAttribute("type", "button");
	submit_conversion.setAttribute("class", "submit_it");
	submit_conversion.innerHTML = "Submit";
	submit_conversion.addEventListener("click", convert_it, false);
	output.appendChild(submit_conversion);

	// Create Unit Converter content
	create_unit_converter();
}

// Create Mortgage Calculator
function create_mortgage_calculator() {

	// Reset Content
	var mortgage_content = document.getElementById("mortgage_content");
	mortgage_content.innerHTML = "";

	// Heading Title
	var heading = document.createElement("h3");
	heading.innerHTML = "Mortgage Calculator";
	mortgage_content.appendChild(heading);

	// House Price input
	var input_title = document.createElement("label");
	input_title.innerHTML = "House Price (before Down Payment): ";
	mortgage_content.appendChild(input_title);
	
	var curr_input_title = document.createElement("input");
	curr_input_title.setAttribute("type", "text");
	curr_input_title.id = "house_price";
	mortgage_content.appendChild(curr_input_title);

	// Line Break
	var line_break = document.createElement("br");
	mortgage_content.appendChild(line_break);

	// Down Payment input
	var input_title = document.createElement("label");
	input_title.innerHTML = "Down Payment: ";
	mortgage_content.appendChild(input_title);
	
	var curr_input_title = document.createElement("input");
	curr_input_title.setAttribute("type", "text");
	curr_input_title.id = "down_payment";
	mortgage_content.appendChild(curr_input_title);

	// Line Break
	var line_break = document.createElement("br");
	mortgage_content.appendChild(line_break);

	// Mortgage Rate % input
	var input_title = document.createElement("label");
	input_title.innerHTML = "Mortgage Rate (%): ";
	mortgage_content.appendChild(input_title);
	
	var curr_input_title = document.createElement("input");
	curr_input_title.setAttribute("type", "text");
	curr_input_title.id = "mortgage_rate";
	mortgage_content.appendChild(curr_input_title);

	// Line Break
	var line_break = document.createElement("br");
	mortgage_content.appendChild(line_break);

	// Term Length input
	var input_title = document.createElement("label");
	input_title.innerHTML = "Term Length (Years): ";
	mortgage_content.appendChild(input_title);
	
	var curr_input_title = document.createElement("input");
	curr_input_title.setAttribute("type", "text");
	curr_input_title.id = "term_length";
	mortgage_content.appendChild(curr_input_title);
}

// Mortgage calculation
function mortgage_it() {

	// Obtain and parse User inputs
	var house_price = parseFloat(document.getElementById("house_price").value);
	var down_payment = parseFloat(document.getElementById("down_payment").value);
	var mortgage_rate = parseFloat(document.getElementById("mortgage_rate").value);
	var term_length = parseInt(document.getElementById("term_length").value);

	// Checks if there are any errors
	if (isNaN(house_price)) {
		alert("Invalid House Price");
	}
	else if (isNaN(down_payment)) {
		alert("Invalid Down Payment");
	}
	else if (isNaN(mortgage_rate)) {
		alert("Invalid Mortgage Rate");
	}
	else if (isNaN(term_length)) {
		alert("Invalid Term Length");
	}
	else {

		// Clear the Mortgage Result
		var mortgage_result = document.getElementById("mortgage_result");
		mortgage_result.setAttribute("class", "box_curr_unit");
		mortgage_result.innerHTML = "";

		// Create the Mortgage heading
		var heading = document.createElement("h3");
		heading.innerHTML = "Mortgage Results";
		mortgage_result.appendChild(heading);

		// Calculate the Loan Amount
		var loan_amount = (house_price - down_payment);

		// Show the Loan Amount 
		var paragraph = document.createElement("p");
		paragraph.innerHTML = "Loan Amount: $ " + loan_amount.toFixed(2);
		mortgage_result.appendChild(paragraph);

		// Calculate the Interest per Month
		var interest_per_month = mortgage_rate / 12 / 100;

		// Calculate the Monthly Payment
		var monthly_payment = (loan_amount * Math.pow(1 + interest_per_month, term_length * 12) * interest_per_month) / (Math.pow(1 + interest_per_month, term_length * 12) - 1);

		// Show the Loan Length
		var paragraph = document.createElement("p");
		paragraph.innerHTML = "Loan Length: (Years) " + term_length;
		mortgage_result.appendChild(paragraph);

		// Show the Monthly Payment 
		var paragraph = document.createElement("p");
		paragraph.innerHTML = "Monthly Payment: $ " + monthly_payment.toFixed(2);
		mortgage_result.appendChild(paragraph);

		// Show the Total Interest Paid
		var paragraph = document.createElement("p");
		paragraph.innerHTML = "Total Interest Paid: $ " + (monthly_payment * 12 * term_length - loan_amount).toFixed(2);
		mortgage_result.appendChild(paragraph);

		// Show the Total Price Paid
		var paragraph = document.createElement("p");
		paragraph.innerHTML = "Total Price Paid: $ " + (monthly_payment * 12 * term_length + down_payment).toFixed(2);
		mortgage_result.appendChild(paragraph);
	}
}

// Mortgage landing portion
function mortgage() {

	// Clear the content
	clearContent();

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 Mortgage Calculator";

	// Get the placeholder div name content
	var output = document.getElementById("content");
	output.setAttribute("class", "bulk");

	// Instruction Header
	var title = document.createElement("h3");
	title.innerHTML = "Instructions: ";
	output.appendChild(title);

	// Instructions
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "1.  To use the Mortgage Calculator, Enter the required fields with valid inputs";
	output.appendChild(paragraph);

	// Instructions
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "<em>Note: Any Non-Numeric characters after valid numeric characters will be ignorged</em>";
	output.appendChild(paragraph);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Mortgage Content box
	var mortgage_content = document.createElement("div");
	mortgage_content.id = "mortgage_content";
	mortgage_content.setAttribute("class", "box_curr_unit");
	output.appendChild(mortgage_content);

	// Mortgage Result box
	var mortgage_result = document.createElement("div");
	mortgage_result.id = "mortgage_result";
	mortgage_result.setAttribute("class", "hidden");
	output.appendChild(mortgage_result);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Submit Button
	var submit_mortgage = document.createElement("button");
	submit_mortgage.id = "submit_mortgage";
	submit_mortgage.setAttribute("type", "button");
	submit_mortgage.setAttribute("class", "calculate_it");
	submit_mortgage.innerHTML = "Calculate Mortgage";
	submit_mortgage.addEventListener("click", mortgage_it, false);
	output.appendChild(submit_mortgage);

	// Create the Mortgage Content
	create_mortgage_calculator();
}

// Adds a course to the GPA page
function add_course() {

	// Obtains gpa content element
	var gpa_content = document.getElementById("gpa_content");

	// Create course box
	var course_div = document.createElement("div");
	course_div.id = "course_" + course_number;
	course_div.setAttribute("class", "box_curr_course");

	// Create the course name
	var course = document.createElement("label");
	course.innerHTML = "Course Name:   ";
	course_div.appendChild(course);

	// Adds the course name input
	var curr_course_input = document.createElement("input");
	curr_course_input.setAttribute("type", "text");
	curr_course_input.id = "curr_course_input_" + course_number;
	course_div.appendChild(curr_course_input);

	// Adds the course grade label
	var course = document.createElement("label");
	course.innerHTML = "      Grade:   ";
	course_div.appendChild(course);

	// Adds the course grade selection
	var curr_select_input = document.createElement("select");
	curr_select_input.setAttribute("name", "curr_select_input_" + course_number);

	// Add the course grade options
	for (var i = 0; i < course_grades.length; ++i) {
		var grade = document.createElement("option");
		grade.value = course_value[i];
		grade.innerHTML = course_grades[i];
		curr_select_input.appendChild(grade);
	}
	course_div.appendChild(curr_select_input);

	// Adds the course credit label
	var course = document.createElement("label");
	course.innerHTML = "      Credits:   ";
	course_div.appendChild(course);

	// Adds the course credit input
	var curr_course_input = document.createElement("input");
	curr_course_input.setAttribute("type", "text");
	curr_course_input.id = "curr_course_credit_" + course_number;
	course_div.appendChild(curr_course_input);

	// Checks if there are any existing course inputs
	if (course_number != 0) {

		// Finds the last course input
		var last_course = document.getElementById("course_" + (course_number - 1));
		
		// Inserts a line break from last input
		var line_break = document.createElement("br");
		gpa_content.insertBefore(line_break, last_course.nextSibling);

		// Inserts the course input before the submit button
		gpa_content.insertBefore(course_div, last_course.nextSibling.nextSibling);
	}
	else {

		// Append the first course input
		gpa_content.appendChild(course_div);
	}

	// Increase course number
	course_number++;
}

// Create GPA content
function create_gpa_calculator() {

	// Clears the GPA content
	var gpa_content = document.getElementById("gpa_content");
	gpa_content.innerHTML = "";

	// Creates the GPA Calculator heading
	var heading = document.createElement("h3");
	heading.innerHTML = "GPA Calculator";
	gpa_content.appendChild(heading);

	// Adds four initial course inputs
	for (var i = 0; i < 4; ++i) {
		add_course();
	}

	// Line Break
	var line_break = document.createElement("br");
	gpa_content.appendChild(line_break);

	// Adds "Add Anpther Course" button
	var add_button = document.createElement("button");
	add_button.id = "add_course";
	add_button.setAttribute("type", "button");
	add_button.setAttribute("class", "add_course");
	add_button.innerHTML = "Add Another Course";
	add_button.addEventListener("click", add_course, false);
	gpa_content.appendChild(add_button);
}

// Calculates the GPA
function calc_gpa() {

	// Valid and total variables
	var valid = true;
	var credit_total = 0;
	var grade_total = 0;

	// Cycle through all of the course inputs
	for (var i = 0; i < course_number; ++i) {

		// Checks if current course is valid to include in calculations - has name
		var course = document.getElementById("curr_course_input_" + i);
		if (course.value == "") {
			break;
		}
		else {

			// Checks if the current course credit is valid
			var credit = document.getElementById("curr_course_credit_" + i);
			credit = parseFloat(credit.value);
			if (isNaN(credit)) {
				valid = false;
				break;
			}
			else {

				// Checks if the input is negative
				if (credit < 0) {
					valid = false;
					break;
				}

				// Adds the total credits
				credit_total += credit;

				// Finds grade value
				var grade = document.getElementsByName("curr_select_input_" + i);
				grade = grade[0].value;

				// Calculates Grade total
				grade_total += grade * credit;
			}
		}
	}

	// Checks if credit total is 0
	if (credit_total == 0) {
		valid = false;
	}

	// Checks if valid input
	if (valid) {

		// Computes final GPA
		var final_gpa = (grade_total / credit_total).toFixed(2);

		// Resets the GPA result content and sets the attribute
		var gpa_result = document.getElementById("gpa_result");
		gpa_result.innerHTML = "";
		gpa_result.setAttribute("class", "box_curr_unit");

		// Sets the GPA's label and result
		var header2 = document.createElement("h2");
		header2.innerHTML = "GPA: " + final_gpa;
		gpa_result.appendChild(header2);
	}
	else {
		alert("Invalid Credit Entry. Please try again.");
	}
}

// GPA content 
function gpa() {

	// Clears the content
	clearContent();

	// Sets the initial course number to 0
	course_number = 0;

	// Set the title for the current tool
	var title = document.getElementById("title");
	title.innerHTML = "COMP 466 GPA Calculator";

	// get the placeholder div name content
	var output = document.getElementById("content");
	output.setAttribute("class", "bulk");

	// Instruction header
	var title = document.createElement("h3");
	title.innerHTML = "Instructions: ";
	output.appendChild(title);

	// Instruction
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "1.  To use the GPA Calculator, Enter the required fields with valid inputs";
	output.appendChild(paragraph);

	// Instruction
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "2.  Only Courses with Course Names will be considered";
	output.appendChild(paragraph);

	// Instruction
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "3.  Feel free to add any additional courses if needed.";
	output.appendChild(paragraph);

	// Instruction
	var paragraph = document.createElement("p");
	paragraph.innerHTML = "<em>Note: Any Non-Numeric characters after valid numeric characters will be ignorged if the field was meant for numbers</em>";
	output.appendChild(paragraph);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// GPA Initial Content box
	var gpa_content = document.createElement("div");
	gpa_content.id = "gpa_content";
	gpa_content.setAttribute("class", "box_curr_unit");
	output.appendChild(gpa_content);

	// GPA Result Content box
	var gpa_result = document.createElement("div");
	gpa_result.id = "gpa_result";
	gpa_result.setAttribute("class", "hidden");
	output.appendChild(gpa_result);

	// Line Break
	var line_break = document.createElement("br");
	output.appendChild(line_break);

	// Submit Button
	var submit_gpa = document.createElement("button");
	submit_gpa.id = "submit_gpa";
	submit_gpa.setAttribute("type", "button");
	submit_gpa.setAttribute("class", "calculate_it");
	submit_gpa.innerHTML = "Calculate GPA";
	submit_gpa.addEventListener("click", calc_gpa, false);
	output.appendChild(submit_gpa);

	// Create GPA Calculator
	create_gpa_calculator();
}

// Initial setup function
function start() {

	// Start home page
	home();

	// Home page trigger
	document.getElementById("home").addEventListener(
		"click", home, false);

	// Tool 1 trigger
	document.getElementById("tool_1").addEventListener(
		"click", converter, false);

	// Tool 2 trigger
	document.getElementById("tool_2").addEventListener(
		"click", mortgage, false);

	// Tool 3 trigger
	document.getElementById("tool_3").addEventListener(
		"click", gpa, false);
}

// Start after page loads
window.addEventListener("load", start, false);