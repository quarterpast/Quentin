<?php
// header.php, pull a random image from the PhotoSoc Flickr Group and display it with awesomeness.
require_once('../includes/phpFlickr.php');
header('Content-type: image/png');


/*
 Imagerotate replacement. ignore_transparent is work for png images
 Also, have some standard functions for 90, 180 and 270 degrees.
 Rotation is clockwise
 */

if(!function_exists("imagerotate")) {
	function imagerotate($srcImg, $angle, $bgcolor, $ignore_transparent = 0) {
		function rotateX($x, $y, $theta){
			return $x * cos($theta) - $y * sin($theta);
		}
		function rotateY($x, $y, $theta){
			return $x * sin($theta) + $y * cos($theta);
		}
	
		$srcw = imagesx($srcImg);
		$srch = imagesy($srcImg);
	
		//Normalize angle
		$angle %= 360;
	
		if($angle == 0) {
			if ($ignore_transparent == 0) {
				imagesavealpha($srcImg, true);
			}
			return $srcImg;
		}
	
		// Convert the angle to radians
		$theta = deg2rad ($angle);
	
		//Standart case of rotate
		if ( (abs($angle) == 90) || (abs($angle) == 270) ) {
			$width = $srch;
			$height = $srcw;
			if ( ($angle == 90) || ($angle == -270) ) {
				$minX = 0;
				$maxX = $width;
				$minY = -$height+1;
				$maxY = 1;
			} else if ( ($angle == -90) || ($angle == 270) ) {
				$minX = -$width+1;
				$maxX = 1;
				$minY = 0;
				$maxY = $height;
			}
		} else if (abs($angle) === 180) {
			$width = $srcw;
			$height = $srch;
			$minX = -$width+1;
			$maxX = 1;
			$minY = -$height+1;
			$maxY = 1;
		} else {
			// Calculate the width of the destination image.
			$temp = array (rotateX(0, 0, 0-$theta),
			rotateX($srcw, 0, 0-$theta),
			rotateX(0, $srch, 0-$theta),
			rotateX($srcw, $srch, 0-$theta)
			);
			$minX = floor(min($temp));
			$maxX = ceil(max($temp));
			$width = $maxX - $minX;
	
			// Calculate the height of the destination image.
			$temp = array (rotateY(0, 0, 0-$theta),
			rotateY($srcw, 0, 0-$theta),
			rotateY(0, $srch, 0-$theta),
			rotateY($srcw, $srch, 0-$theta)
			);
			$minY = floor(min($temp));
			$maxY = ceil(max($temp));
			$height = $maxY - $minY;
		}
	
		$destimg = imagecreatetruecolor($width, $height);
		if ($ignore_transparent == 0) {
			imagefill($destimg, 0, 0, imagecolorallocatealpha($destimg, 255,255, 255, 127));
			imagesavealpha($destimg, true);
		}
	
		// sets all pixels in the new image
		for($x=$minX; $x<$maxX; $x++) {
			for($y=$minY; $y<$maxY; $y++) {
				// fetch corresponding pixel from the source image
				$srcX = round(rotateX($x, $y, $theta));
				$srcY = round(rotateY($x, $y, $theta));
				if($srcX >= 0 && $srcX < $srcw && $srcY >= 0 && $srcY < $srch) {
					$color = imagecolorat($srcImg, $srcX, $srcY );
				} else {
					$color = $bgcolor;
				}
				imagesetpixel($destimg, $x-$minX, $y-$minY, $color);
			}
		}
		return $destimg;
	}
}
$im = imagecreatefrompng('phototop.png');
$f = new phpFlickr('3fc5f6f5d6595faef9754fee54243846','f0f491654aa6fcb2');
//$f->enableCache('fs','/home/photosoc/cache');
$p = $f->groups_pools_getPhotos('696232@N23');
do {
	$r = $p['photo'][rand(0,count($p['photo'])-1)];
	$s = $f->photos_getSizes($r['id']);
	$m = $s[3]['source'];
	$fl = imagecreatefromjpeg($m);
	list($w,$h) = getimagesize($m);
} while($w < $h);
if(file_exists($cached = ('/home/photosoc/cache_i/'.md5($m)))) {
	echo file_get_contents($cached);
} else {
	$fr = imagerotate($fl, -5, $b = imagecolorallocatealpha($fl, 0, 0, 0, 127));
	imagealphablending($fr, true);
	imagesavealpha($fr, true);
	$fs = imagecreatetruecolor(334,209);
	imagefill($fs, 0, 0, $b);
	$rw = $w*cos(deg2rad(5))+$h*sin(deg2rad(5));
	$rh = $h*cos(deg2rad(5))+$w*sin(deg2rad(5));
	$y = 195-315*$rh/$rw;
	imagecopyresampled($fs, $fr, 11, $y, 0, 0, 315, 315*$rh/$rw, $rw, $rh);
	imagealphablending($fs, true);
	imagesavealpha($fs, true);
	imagepng($fs,$cached);
	imagepng($fs);
}
?>
