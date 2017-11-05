<?xml version = "1.0"?>

<!-- COMP466 Assignment 1: Part 1 - resume.xml	-->
<!-- Name: Kevin Wong							-->
<!-- ID: 3339323								-->

<!-- reference XSL style sheet URI -->
<xsl:stylesheet version = "1.0" xmlns:comp466kw = "urn:comp466kw:part1" xmlns:xsl = "http://www.w3.org/1999/XSL/Transform">

	<xsl:output method = "html" doctype-system = "about:legacy-compat" />

	<!-- match root element -->
	<xsl:template match = "/"> 
		<html>
			<xsl:apply-templates/>
		</html>
	</xsl:template>

	<!-- match resume-->
	<xsl:template match = "comp466kw:resume">
		<head>
   			<meta charset = "utf-8"/>
   			<link rel = "stylesheet" type = "text/css" href = "../shared/style.css"/>
   			<title><xsl:value-of select = "generalinfo/name/firstname"/>&#160;<xsl:value-of select = "generalinfo/name/lastname"/> - Resume</title>
   		</head>

   		<body>
   			<h1><xsl:value-of select = "generalinfo/name/firstname"/>&#160;<xsl:value-of select = "generalinfo/name/lastname"/></h1>
   			<div class = "tabbed">
	   			<p><xsl:value-of select = "generalinfo/address/housenumber"/>&#160;<xsl:value-of select = "generalinfo/address/streetnumber"/>ST</p>
	   			<p><xsl:value-of select = "generalinfo/address/city"/>,
	   			<xsl:value-of select = "generalinfo/address/province"/>&#160;<xsl:value-of select = "generalinfo/address/postalcode"/></p>
	   			<p><xsl:value-of select = "generalinfo/phonenumber"/></p>
	   			<p><xsl:value-of select = "generalinfo/email"/></p>
   			</div>
   			<br/>

   			<h3>Education</h3>
   			<div class = "tabbed">
	   			<p><xsl:value-of select = "academicinfo/postsecondaryeducation/university"/></p>
	   			<p><xsl:value-of select = "academicinfo/postsecondaryeducation/degree"/>,
	   				<xsl:value-of select = "academicinfo/postsecondaryeducation/graduationyear"/></p>
	   			<p>GPA: <xsl:value-of select = "academicinfo/postsecondaryeducation/gradepointaverage"/>&#47;4.0</p>
   			</div>
   			<br/>

   			<h3>Educational Achievements</h3>
   			<div class = "tabbed">
	   			<xsl:for-each select = "academicinfo/educationalachievements/educationalaward">
	   				<p>
	   					<xsl:value-of select = "awardtitle"/>, <xsl:value-of select = "awardyear"/>
	   				</p>
	   			</xsl:for-each>
   			</div>
   			<br/>

   			<h3>Computer Experience</h3>
   			<ul>
	   			<xsl:for-each select = "academicinfo/computerexperience/cmpexperience">
	   				<li><xsl:value-of select = "text()"/></li>
	   			</xsl:for-each>
   			</ul>
   			<br/>

   			<h3>Work Experience</h3>
   			<br/>
   			<div class = "tabbed">
	   			<xsl:for-each select = "workexperience/experience">
	   				<p><xsl:value-of select = "companyname"/>, <xsl:value-of select = "city"/>, 
	   				<xsl:value-of select = "province"/>&#160;&#160;&#160;&#160;
	   				<em><xsl:value-of select = "startdate"/> - <xsl:value-of select = "enddate"/></em></p>
	   				<p><strong><xsl:value-of select = "title"/></strong></p>
	   				<ul>
		   				<xsl:for-each select = "responsibilities/responsibility">
		   					<li><xsl:value-of select = "text()"/></li>
		   				</xsl:for-each>
	   				</ul>
	   				<br/>
	   			</xsl:for-each>
   			</div>

   			<h3>Additional Information</h3>
   			<div class = "tabbed">
	   			<h4>Volunteer Information</h4>
	   			<ul>
		   			<xsl:for-each select = "additionalinfo/volunteeractivities/volunteerexperience">
		   				<li><xsl:value-of select = "title"/>&#160;&#160;&#160;&#160;<xsl:value-of select = "date"/></li>
		   			</xsl:for-each>
	   			</ul>
	   			<h4>Other</h4>
	   			<ul>
		   			<xsl:for-each select = "additionalinfo/other/otherinfo">
		   				<li><xsl:value-of select = "text()"/></li>
		   			</xsl:for-each>
	   			</ul>
   			</div>
   			<br/>
   			<h3>REFERENCES AVAILABLE UPON REQUEST</h3>
   		</body>
	</xsl:template>
</xsl:stylesheet>
