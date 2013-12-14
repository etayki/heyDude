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

if(isset($_SERVER['HTTP_REFERER']))
{
    error_log(date('Y-m-d H:i:s')." IP=".$ip.", event=Load, Referer=".$_SERVER['HTTP_REFERER']);
    $referer = $_SERVER['HTTP_REFERER'];
}
else
{
    error_log(date('Y-m-d H:i:s')." IP=".$ip.", event=Load");
    $referer = "None";
}

if(isset($_SERVER['HTTP_USER_AGENT']))
{
    error_log(date('Y-m-d H:i:s')." User Agent=".$_SERVER['HTTP_USER_AGENT']);
    if(strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "googlebot") !== FALSE)
    {
        $browser = "Googlebot";
        $city = "Mountain View, CA, US";
    }
    elseif (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "twitterbot") !== FALSE) 
    {
        $browser = "Twitterbot";
        $city = "San Francisco, CA, US";
    }
    elseif (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "yandexbot") !== FALSE) 
    {
        $browser = "YandexBot";
        $city = "Palo Alto, CA, US";
    }
    elseif (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "blexbot") !== FALSE) 
    {
        $browser = "BLEXBot";
        $city = "Chicago, Illinois, US";
    }
    elseif (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "crawler4j") !== FALSE) 
    {
        $browser = "crawler4j";
        $city = "Chicago, Illinois, US";
    }
    elseif (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "seoprofiler") !== FALSE) 
    {
        $browser = "seoprofiler";
        $city = "US";
    }
    elseif (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "ipad") !== FALSE) 
    {
        $browser = "iPad";
        $city = "None";
    }
    elseif (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), "android") !== FALSE) 
    {
        $browser = "Android";
        $city = "None";
    }
    else
    {
        $browser = "None";
        $city = "None";       
    }
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

// Update Visits Table
if (!$mysqli->query("INSERT INTO Visits (Event, IP, Referer, Browser, City)
                     VALUES ('Load', '$ip', '$referer', '$browser', '$city')")) {
    error_log(date('Y-m-d H:i:s')." Update Visits Error: ".$mysqli->error);
}

$mysqli->close();
?>
<html>
<head>
<?php
if($_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'] == "localhost/PianoByHeart/index.php")
{
echo <<<END
    <script src="http://localhost:35729/livereload.js"></script>
    <script src="./js/MIDI/AudioDetect.js" type="text/javascript"></script>
    <script src="./js/MIDI/LoadPlugin.js" type="text/javascript"></script>
    <script src="./js/MIDI/Plugin.js" type="text/javascript"></script>
    <script src="./js/MIDI/Player.js" type="text/javascript"></script>
    <script src="./js/Window/DOMLoader.XMLHttp.js" type="text/javascript"></script>
    <script src="./js/Window/DOMLoader.script.js" type="text/javascript"></script>
    <script src="./inc/Base64.js" type="text/javascript"></script>
    <script src="./inc/base64binary.js" type="text/javascript"></script>
    <script src="./js/jquery.min.js" type="text/javascript"></script>
    <script src="./js/utilities.js" type="text/javascript"></script>
    <script src="./js/tune.js" type="text/javascript"></script>
    <script src="./js/music.js" type="text/javascript"></script>
    <script src="./js/view.js" type="text/javascript"></script>
    <script src="./js/track.js" type="text/javascript"></script>
    <script src="./js/controls.js" type="text/javascript"></script>
END;
}
else 
{
echo <<<END
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-39749841-1', 'watchandrepeat.com');
      ga('send', 'pageview');
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> 
    <script src="./app.js"></script>
END;
}
?>
</head>
<body>
<title>Learn Moonlight Sonata</title>
<!-- Loading Animation -->
<div id="loading"  style="position:absolute;top:100px;left:500px;z-index:8;font-size:12px"><img src="./images/loading.gif"></img></div>
</body>
</html>