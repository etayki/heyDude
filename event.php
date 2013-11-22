<?php
date_default_timezone_set('America/New_York');
parse_str($_SERVER['QUERY_STRING']);

if(strpos(strtolower($_SERVER['HTTP_HOST']), "watchandrepeat") !== FALSE)
{
    $host = "mysql1301.ixwebhosting.com";
    $username = "yudaluz_etayluz";
    $password = "Et4ever";
    $database = "yudaluz_watchandrepeat";
    $ip = $_SERVER['REMOTE_ADDR'];
    $ip = "66.65.103.106";

}
else
{
    $host = "localhost";
    $username = "root";
    $password = "Et4ever";
    $database = "Etay1";
    $ip = "66.65.103.106";
}

// Connect to database
$mysqli = new mysqli($host,$username,$password,$database);

// check connection
if ($mysqli->connect_errno) {
    error_log(date('Y-m-d H:i:s')." Connect failed: ".$mysqli->connect_error);
    error_log(date('Y-m-d H:i:s')." ".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
    error_log(date('Y-m-d H:i:s')." ".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]);
    exit();
}

$json = file_get_contents("http://ipinfo.io/{$ip}");
//error_log($json);
$details = json_decode($json);
error_log($details);
$city = $details->city.", ".$details->region.", ".$details->country;
error_log(date('Y-m-d H:i:s')." IP=".$ip.", event=".$event.", start=".$start.", end=".$end.", city=".$city);

// Update Visits Table
if (!$mysqli->query("INSERT INTO Visits (IP, Event, StartMeasure, EndMeasure, City)
                     VALUES ('$ip', '$event', $start, $end, '$city')")) {
    error_log(date('Y-m-d H:i:s')." event.php Update Visits Error: ".$mysqli->error);
}

$mysqli->close();
?>