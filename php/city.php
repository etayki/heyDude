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
if ($result = $mysqli->query("SELECT IP FROM Users /*WHERE City='None' AND IP !='None'*/")) 
{
    printf ("UPDATING USERS TABLE<br><br>");
    while ($row = $result->fetch_row()) {
        $ip = $row[0];
        $response = file('http://api.hostip.info/get_html.php?ip='.$ip.'&position=true');
        $country = str_replace("Country: ","",$response[0]);
        $country = str_replace(" (US)","",$country);
        $city = str_replace("City: ","",$response[1]);
        //$city = $city.", ".$country;
        echo $city."<br>";
        if ($city != "Limit Exceeded, Limit Exceeded, Limit Exceeded")
          $mysqli->query("UPDATE Users SET City='$city' WHERE IP='$ip'");
    }

    /* free result set */
    $result->close();
}

if ($result = $mysqli->query("SELECT IP FROM Visits /*WHERE City='None'*/")) 
{
    printf ("<br>UPDATING VISITORS TABLE<br><br>");
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