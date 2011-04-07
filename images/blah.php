<pre><?php
require_once('../includes/phpFlickr.php');

$f = new phpFlickr('3fc5f6f5d6595faef9754fee54243846','f0f491654aa6fcb2');
$a = $f->people_getPublicPhotos('36371660@N02');
$p = array_slice($a['photos']['photo'],0,76);
foreach($p as $r) {
	$s = $f->photos_getSizes($r['id']);
	list($t,$i,$u) = array($r['title'],$s[1]['source'],substr($s[1]['url'],0,-8));
	echo "[![$t]($i)]($u)\n";
}
?></pre>