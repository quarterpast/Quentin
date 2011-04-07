document.observe('dom:loaded', function() {
	var f = $$('footer.main')[0], b = $$('body')[0].getHeight(), c = false;
	if(b < document.viewport.getHeight()) {
		f.absolutize().setStyle({'top': (document.viewport.getHeight()-f.measure('margin-box-height'))+'px'});
		c = true;
	}
	(function(){
		if(c && b < $$('body')[0].getHeight()) {
			f.setStyle('position: static');
		}
	}).delay(1.5);
	//alert('iositsn');
});
