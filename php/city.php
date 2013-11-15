<?php
if($_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'] == "watchandrepeat.com/city.php")
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
        $tags = get_meta_tags('http://www.geobytes.com/IpLocator.htm?GetLocation&template=php3.txt&IpAddress='."$ip");
        $city = $tags['city'].", ".$tags['region'].", ".$tags['country'];
        printf ("%s<br>", $city);
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