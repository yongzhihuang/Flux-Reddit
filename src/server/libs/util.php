<?php 
require_once('twitterAPI/TwitterAPIExchange.php'); //get it from https://github.com/J7mbo/twitter-api-php

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/


function getFollowerCount($twitterHandle) {

	$settings = array(
		'oauth_access_token' => "ACCESS_TOKEN",
		'oauth_access_token_secret' => "ACCESS_TOKEN_SECRET",
		'consumer_key' => "CONSUMER_KEY",
		'consumer_secret' => "CONSUMER_SERCRET"
	);

	$ta_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
	$getfield = '?screen_name='.$twitterHandle;
	$requestMethod = 'GET';
	$twitter = new TwitterAPIExchange($settings);
	$follow_count=$twitter->setGetfield($getfield)
	->buildOauth($ta_url, $requestMethod)
	->performRequest();
	$data = json_decode($follow_count, true);
	$followers_count=$data[0]['user']['followers_count'];
	return $followers_count;
}

 function sanitize($input) {
    if (is_array($input)) {
        foreach($input as $var=>$val) {
            $output[$var] = sanitize($val);
        }
    }
    else {
        if (get_magic_quotes_gpc()) {
            $input = stripslashes($input);
        }
        $input  = cleanInput($input);
        $output = mysql_real_escape_string($input);
    }
    return $output;
}

function multiexplode ($delimiters,$string) {
    
    //usage:
    //$text = "here is a sample: this text, and this will be exploded. this also | this one too :)";
    //$exploded = multiexplode(array(",",".","|",":"),$text);
    
    $ready = str_replace($delimiters, $delimiters[0], $string);
    $launch = explode($delimiters[0], $ready);
    return  $launch;
}

?>
