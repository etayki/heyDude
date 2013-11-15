<?php
$ip = $_SERVER['REMOTE_ADDR'];
$ip = "66.65.103.106";
$tags = get_meta_tags('http://www.geobytes.com/IpLocator.htm?GetLocation&template=php3.txt&IpAddress="$ip"');
$city = $tags['city'].", ".$tags['region'].", ".$tags['country'];
echo $city;
?>