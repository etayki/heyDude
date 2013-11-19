<?php
parse_str($_SERVER['QUERY_STRING']);

// error_log($_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
// error_log(date('Y-m-d H:i:s')." ".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]);

error_log(date('Y-m-d H:i:s')." "."action.php: action=".$action);
error_log(date('Y-m-d H:i:s')." "."action.php: startMeasure=".$start); //- doesn't retrieve for some reason
error_log(date('Y-m-d H:i:s')." "."action.php: endMeasure=".$end); //- doesn't retrieve for some reason

if($_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'] == "watchandrepeat.com/action.php")
{
    $host = "mysql1301.ixwebhosting.com";
    $username = "yudaluz_etayluz";
    $password = "Et4ever";
    $database = "yudaluz_watchandrepeat";
}
else
{
    $host = "localhost";
    $username = "root";
    $password = "Et4ever";
    $database = "Etay1";
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

$ip = $_SERVER['REMOTE_ADDR'];

// Update Visits Table
if (!$mysqli->query("INSERT INTO Visits (IP, Event, StartMeasure, EndMeasure)
                     VALUES ('$ip', '$action', $start, $end)")) {
    error_log(date('Y-m-d H:i:s')." action.php Update Visits Error: ".$mysqli->error);
}

$mysqli->close();
?>