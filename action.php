<?php
parse_str($_SERVER['QUERY_STRING']);

error_log("action.php: action=".$action);
//error_log("action.php: startMeasure=".$_GET["startmeasure"]);
//error_log("action.php: endMeasure=".$endmeasure);

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
    exit();
}

$ip = $_SERVER['REMOTE_ADDR'];

// Update Visits Table
if (!$mysqli->query("INSERT INTO Visits (IP, Event)
                     VALUES ('$ip', '$action')")) {
    error_log(date('Y-m-d H:i:s')." action.php Update Visits Error: ".$mysqli->error);
}

$mysqli->close();
?>