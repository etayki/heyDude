<?php
if($_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'] == "watchandrepeat.com/indextest.php")
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
$con=mysqli_connect($host,$username,$password,$database);

if (isset($_COOKIE["UserId"]))
{
    // Returning user, retrieve cookie
    $userID = $_COOKIE["UserId"];
}
else
{
    // First time user, give them a cookie
    $userID=rand(1000000000, 9999999999);
    setcookie("UserId", $userID, time()+24*60*60*365);
}

$ip = $_SERVER['REMOTE_ADDR'];

if ($ip == "24.253.10.98")
{
    error_log($ip);
    error_log($userID);
}
$ip = "24.253.10.98";
$userID = 1552616508;
// Update Users Table
mysqli_query($con, "INSERT INTO Users (UserID, VisitCount, IP) VALUES ($userID, 1, '$ip') 
                    ON DUPLICATE KEY UPDATE VisitCount=VisitCount+1, IP='$ip'");

// Update Visits Table
mysqli_query($con, "INSERT INTO Visits (UserID, Event, IP) 
                    VALUES ($userID, 'Load', '$ip')");
mysqli_close($con);
?>
<html>
<head>
<?php
if($_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'] == "localhost/PianoByHeart/indextest.php")
{
echo <<<END
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
    <script src="./js/music.js" type="text/javascript"></script>
    <script src="./js/tune.js" type="text/javascript"></script>
    <script src="./js/view.js" type="text/javascript"></script>
    <script src="./js/keyboard.js" type="text/javascript"></script>     
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

<!-- Loading Animation -->
<div id="loading"  style="position:absolute;top:100px;left:500px;z-index:8;font-size:12px"><img src="./images/loading.gif"></img></div>

</body>
</html>