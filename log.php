<?php
date_default_timezone_set('America/New_York');
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

// Connect to database
$mysqli = new mysqli($host,$username,$password,$database);

// check connection
if ($mysqli->connect_errno) {
    error_log(date('Y-m-d H:i:s')." Connect failed: ".$mysqli->connect_error);
    error_log(date('Y-m-d H:i:s')." ".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
    error_log(date('Y-m-d H:i:s')." ".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]);
    exit();
} 

// Fetch Visits Table
if ($results = $mysqli->query("SELECT * FROM Visits"))
{
    echo '<table border="1">';
    while ($row = $results->fetch_row())
    {
        echo '<tr>';
        foreach($row as $field) {
            //echo "1";
            echo '<td>' . htmlspecialchars($field) . '</td>';
        }
        echo '</tr>';
    }
    echo '</table>';

}
else
{
    error_log(date('Y-m-d H:i:s')." Fetch Visits Error: ".$mysqli->error);
}



$mysqli->close();
?>