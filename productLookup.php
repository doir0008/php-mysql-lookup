<?php
	// Define variable to hold the request input string.
	$inputValue;
	// Make a string variable to hold the number returned for the database.
	$outputValue = "0";
	
	// Set the $inputValue to the 'productName' parameter of the $_REQUEST super global array if it set.
	if ($_REQUEST != null){
        $inputValue = $_REQUEST['productName'];
    }
	// Check if the $inputValue was NOT set; if not, have the output set to an error massage.
    if ($inputValue == null){
        //output error
        echo '<p>Error! No Data.</p>';
    } else {
    // Else the $inputValue was set, so query the database with the users input.
	   //echo $inputValue;
		// Create a PDO connection to the database.
        $db_host = "localhost";
        $db_name = "testdb";
        $db_user = "root";
        $db_password = "root";

        $pdo_link = new PDO("mysql:host=$db_host;dbname=$db_name",$db_user,$db_password);

		// Write a select query on the `products` table, concatenating the $inputValue into it.
		$sqlQuery = "SELECT product_quantity FROM products WHERE product_name=\"" . $inputValue . "\"";
		// Pass the select query to the PDO's query() method, and store the results returned.
		$result = $pdo_link->query($sqlQuery);
		// If there are results, set $outputValue to the 'product_quantity' value returned from the fetched data.
		if ($result != null){
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $outputValue = $row['product_quantity'];
        } else {
		// If there were no results, then set $outputValue to the pdo error info
		  $outputValue = $pdo_link->errorInfo()[2];
        }
		// Close the connection to the database by setting the object to NULL.   
        $pdo_link = NULL;
    }
	// Echo out the calculated $ouputValue as a response to the client.
	echo $outputValue;
	
?>