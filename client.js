// JavaScript Document

function clearOutputs(){
	// Clear inventory p tag of any content
	document.getElementById('inventoryText').innerHTML = "";
	document.getElementById('stockText').innerHTML = "";
	// Set the html element's background color.
	document.getElementById('stockText').style.backgroundColor = "#FFFDEC";
}


function getInventory(formValue){
	// Clear inventory p tag of any content
	clearOutputs();
	
	// Check if the user string is empty and exit the function right away if it is.
	if (formValue.length==0){ 
		//If the string is empty exit the function and don't do the ajax request
		return;
	}
	else{
		// Output information about the selected value to the user.
		document.getElementById('inventoryText').innerHTML = "Number of " + formValue + "s in stock: ";
		// Display some text to the user while waiting for the server response.
		document.getElementById('stockText').innerHTML = "[ Thinking... ]";
		// Send the ajax request with a  key
		sendAjax(formValue);
	}
}


function sendAjax(value){
	// Make a variable that will hold our HTTP connection object
	var xmlhttp;
	
	// Initialize object for IE7 and up, and other modern browsers
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{// Or, initialize object for IE 6 and 5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// Append the query text that was passed to this function to the request url.
	xmlhttp.open("GET","productLookup.php?productName="+value,true);
	// Send the http request.
	xmlhttp.send();
	
	// Handle the response text from the server
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			// If the request was sent successfully output the response text
			outputInventoryText(xmlhttp.responseText);
		}
		else if (xmlhttp.readyState==4 && xmlhttp.status!=200){
			// Handle if something went wrong getting the server response.
			document.getElementById('stockText').innerHTML = 'Error getting data from server with HTTP.status=' + xmlhttp.status + " and HTTP.readyState=" + xmlhttp.readyState;
		}
	};
		
}


function outputInventoryText(outputText){
	// Create a variable to hold  the output backgound color.
	var bgColor = "#FF7777"; // Default color is red.
	
	// If the value passed in is a number greater than 0 the item is in stock.
	if(parseInt(outputText) > 0){
		bgColor = "#22FF22"; // Change the background to green.
	}
	
	// Set the html element's background color.
	document.getElementById('stockText').style.backgroundColor = bgColor;
	// Print the output in the inner html.
	document.getElementById('stockText').innerHTML = "[ " + outputText + " ]";
}