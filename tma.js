/*
COMP466 Assignment 1: Main Page - tma.js
Name: Kevin Wong							
ID: 3339323								
*/

// Hide the content in the page
function hideContent() {

	// Hide the content div elements of the page
	document.getElementById("home_content").setAttribute("class", "hidden");

	document.getElementById("resume_content").setAttribute("class", "hidden");

	document.getElementById("tutorial_content").setAttribute("class", "hidden");

	document.getElementById("slideshow_content").setAttribute("class", "hidden");
	
	document.getElementById("toolset_content").setAttribute("class", "hidden");
}

// Hide the content in the page
function showContent(id) {

	// Hide the content div elements of the page
	hideContent();

	// Show the correct content
	document.getElementById(id).setAttribute("class", "assignment_parts");
}


// Initial setup function
function start() {
	
	// Clear current content
	hideContent();

	// Show the home content
	showContent("home_content");


	document.getElementById("home").addEventListener("click", 
		function() {showContent("home_content");}, false);

	document.getElementById("tab_1").addEventListener("click", 
		function() {showContent("resume_content");}, false);

	document.getElementById("tab_2").addEventListener("click", 
		function() {showContent("tutorial_content");}, false);

	document.getElementById("tab_3").addEventListener("click", 
		function() {showContent("slideshow_content");}, false);

	document.getElementById("tab_4").addEventListener("click", 
		function() {showContent("toolset_content");}, false);
}

// Start after page loads
window.addEventListener("load", start, false);