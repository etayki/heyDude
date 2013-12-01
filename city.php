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
}
else
{
    $host = "localhost";
    $username = "root";
    $password = "Et4ever";
    $database = "Etay1";
    $ip = "66.65.103.106";
}

$mysqli = new mysqli($host,$username,$password,$database);

$json = file_get_contents("http://ipinfo.io/{$ip}/json");
$details = json_decode($json);
$city = $details->city.", ".$details->region.", ".$details->country;

if(strpos(strtolower($_SERVER['HTTP_HOST']), "iPad") !== FALSE)
{
    $brsr = "iPad";
}

if(strpos(strtolower($_SERVER['HTTP_HOST']), "iphone") !== FALSE)
{
    $brsr = "iPhone";
}

error_log(date('Y-m-d H:i:s')." IP=".$ip.", city=".$city.", browser=".$brsr);

if (!$mysqli->query("UPDATE Visits SET Browser='$brsr' WHERE IP='$ip' AND City='None'"))
    error_log(date('Y-m-d H:i:s')." city.php Update Visits Error: ".$mysqli->error);

if (!$mysqli->query("UPDATE Visits SET City='$city' WHERE IP='$ip'"))
    error_log(date('Y-m-d H:i:s')." city.php Update Visits Error: ".$mysqli->error);

/* close connection */
$mysqli->close();
?>