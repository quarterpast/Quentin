<?php
header("Content-type: image/png");
$l = glob("top/*");
echo file_get_contents($l[array_rand($l)]);
?>