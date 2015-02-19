<?php 
	include('access-origin.php');
	include('config.php');
	include('libs/util.php');

	//echo getFollowerCount('shareonfb');
	$conn = new mysqli($DBServer, $DBUser, $DBPass, $DBName);

	//check connection
	if ($conn->connect_error) {
	  echo 'ERROR: DB connection failed';
	}

	//Fetch a list of Twitter handles from DB
	//With each Twitter handle, go fetch twitter count, and store it in DB
	$twitterHandlesSql = 'SELECT * FROM twitter_accounts';

	$results = $conn->query($twitterHandlesSql);

	$rows_returned = $results->num_rows;

	if($rows_returned == 0) {
		echo 'ERROR: No twitter accounts found';
	} else {
		//Get a list of twitter handles
		while($row = $results->fetch_assoc()) {
		    $handle = $row['handle'];
		    $count = getFollowerCount($handle);

			//fetch their value and insert into DB with today's datestamp
			$insertTwitterStatSql = "INSERT INTO stats(date, handle, followers) VALUES (NOW(), '$handle','$count')";
			$resultsInsertQuery = $conn->query($insertTwitterStatSql);
		}

		echo 'Success';
	}
?>
