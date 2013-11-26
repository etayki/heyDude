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
if(isset($load))
    $query = "SELECT * FROM Visits WHERE Event='Load' ORDER BY Timestamp DESC";
else
    $query = "SELECT * FROM Visits ORDER BY Timestamp DESC";

if ($results = $mysqli->query($query))
{
    echo '<table border="1">';
    while ($row = $results->fetch_row())
    {
        foreach($row as $field) {
            if(strpos(strtolower(htmlspecialchars($field)), "load") !== FALSE)
            {
                $color = "grey";
                break;
            }
            elseif(strpos(strtolower(htmlspecialchars($field)), "play") !== FALSE)
            {
                $color = "orange";
                break;
            }
            elseif(strpos(strtolower(htmlspecialchars($field)), "pause") !== FALSE)
            {
                $color = "pink";
                break;
            }
        }

        echo '<tr style="background-color:' . $color . '">';        
        foreach($row as $field) {
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