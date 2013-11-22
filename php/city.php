<?php
if(strpos(strtolower($_SERVER['HTTP_HOST']), "watchandrepeat") !== FALSE)
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

$mysqli = new mysqli($host,$username,$password,$database);

if ($result = $mysqli->query("SELECT IP FROM Users WHERE City='None' AND IP !='None'")) 
{
    printf ("UPDATING USERS TABLE<br><br>");
    while ($row = $result->fetch_row()) {
        printf ("%s ->", $row[0]);
        $ip = $row[0];
        $json = file_get_contents("http://ipinfo.io/{$ip}");
        error_log($json);
        $details = json_decode($json);
        $city = $details->city.", ".$details->region.", ".$details->country;
        error_log("City=".$details->city.", Country=".$details->country);
        printf ("%s<br>", $city);
        if ($city != "Limit Exceeded, Limit Exceeded, Limit Exceeded")
          $mysqli->query("UPDATE Users SET City='$city' WHERE IP='$ip'");
    }

    /* free result set */
    $result->close();
}

if ($result = $mysqli->query("SELECT IP FROM Visits WHERE City='None'")) 
{
    printf ("UPDATING VISITORS TABLE<br><br>");
    while ($row = $result->fetch_row()) {
        $ip = $row[0];
        printf ("%s -> ", $ip);

        $city = $mysqli->query("SELECT City FROM Users WHERE IP='$ip'");
        $city = $city->fetch_row();
        $city = $city[0];
        printf ("%s<br>", $city);
        $mysqli->query("UPDATE Visits SET City='$city' WHERE IP='$ip'");
    }

    /* free result set */
    $result->close();
}

/* close connection */
$mysqli->close();
?>