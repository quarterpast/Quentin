Event.observe(window,"load",function() {
	$('loading').remove();
	$$('.photo').each(function(t) {
		console.log(t.down(".meta").innerHTML);
		var u = t.href, i = t.down('img'), s=i.src,
		m = JSON.parse(t.down(".meta").innerHTML),
		z=new Element('p').insert(new Element('img',{src:'images/zoom.png'}));

		t.setStyle({"display":"inline-block","width":"75px","height":"75px","background":"url("+s+")"});
		t.insert(z);
		i.remove();
		t.observe('click',function(e) {
			e.stop();
			$$('.preview').invoke("remove");
			var a = new Element('a',{className: "preview","href":u,"target":"_blank"}),
			p = new Element('img',{src: s.replace(/_s\.jpg$/,'.jpg')}),
			l = new Element('img',{src:"images/loading.gif"}).setStyle({"margin":"30px 16px"});
			t.insert({before: a.insert(p)});
			t.insert(l);
			z.remove();
			p.observe('load',function(){
				var h = p.measure('height')-p.measure('height')%75,
				w = p.measure('width')-p.measure('width')%75;
				a.setStyle({
					"height":h+'px',
					"width":w+'px',
					"float":m.side?"left":"right",
					"overflow":"hidden",
					"backgroundImage":"url("+p.src+")",
					"backgroundPosition": (-p.measure('width')%75)+"px "+(-p.measure('height')%75)+"px",
				}).update(new Element('p').update((m.title||"Untitled")+" by "+m.ownername));
				l.remove();
				t.insert(z);
			});
			p.hide();
		});
	});
});