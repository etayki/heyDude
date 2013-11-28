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
elseif(isset($pause))
    $query = "SELECT * FROM Visits WHERE Event LIKE '%Pause%' ORDER BY Timestamp DESC";
elseif(isset($play))
    $query = "SELECT * FROM Visits WHERE Event LIKE '%Play%' ORDER BY Timestamp DESC";
elseif(isset($i))
    $query = "SELECT * FROM Visits WHERE IP='$i' ORDER BY Timestamp DESC";
elseif(isset($r))
    $query = "SELECT * FROM Visits WHERE Referer<>'None' ORDER BY Timestamp DESC";
elseif(isset($d))
    $query = "SELECT * FROM Visits WHERE Timestamp LIKE '%-".$d."%' ORDER BY IP, Timestamp DESC";
else
    $query = "SELECT * FROM Visits ORDER BY Timestamp DESC";

if ($results = $mysqli->query($query))
{
    echo '<table border="1">';
    $visitTime = 0;
    while ($row = $results->fetch_row())
    {
        $timeStamp = $row[0];
        $IP = $row[1];
        $event = $row[2];
        $start = $row[3];
        $end = $row[4];
        $brsr = $row[5];
        $city = $row[6];
        $referer = $row[7];

        $format = '@^(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2}) (?P<hour>\d{2}):(?P<minute>\d{2}):(?P<second>\d{2})$@';
        preg_match($format, $timeStamp, $dateInfo);
        $timeStamp = mktime($dateInfo['hour'], $dateInfo['minute'], $dateInfo['second'],
                            date('n', strtotime($dateInfo['month'])), $dateInfo['day'], $dateInfo['year']//,
        );

        if(strpos(strtolower($event), "load") !== FALSE)
        {
            $color = "grey";
            //echo '<tr><td>'.gmdate("i:s", $visitTime). '</td></tr>';
            $loadTimeStamp = $timeStamp;
            if(isset($playTimeStamp))
            {
                $lapse = abs($playTimeStamp - $loadTimeStamp);
                if ($lapse > 15)
                    $lapse = 15;
                $visitTime += $lapse;
                //echo '<tr><td>'.gmdate("i:s", $lapse) . '</td></tr>';
            }            
            $row[3] = gmdate("i:s", $visitTime);
            if ($visitTime == 0 && isset($d))
                continue;
            $visitTime = 0;
            $playTimeStamp = $pauseTimeStamp = NULL;
        }
        elseif(strpos(strtolower($event), "play") !== FALSE)
        {
            $color = "orange";
            $playTimeStamp = $timeStamp;
            if(isset($pauseTimeStamp))
            {
                $lapse = abs($pauseTimeStamp - $playTimeStamp);
                if ($lapse > 5 * 60)
                    $lapse = 300;
                $visitTime += $lapse;
                //echo '<tr><td>'.gmdate("i:s", $lapse). '</td></tr>';
            }
            if(isset($l)) continue;
        }
        elseif(strpos(strtolower($event), "pause") !== FALSE)
        {
            $color = "pink";
            $pauseTimeStamp = $timeStamp;
            if(isset($playTimeStamp))
            {
                $lapse = abs($playTimeStamp - $pauseTimeStamp);
                if ($lapse > 5 * 60)
                    $lapse = 300;
                $visitTime += $lapse;
                //echo '<tr><td>'.gmdate("i:s", $lapse) . '</td></tr>';
            }
            if(isset($lapse)) continue;
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