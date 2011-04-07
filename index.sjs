#!/home/photosoc/bin/js
load("quentin.ljs");
var p = Quentin.env.path || ["index"],
template = Quentin.template.load("template.tjs"),
page,path,kids,mine;
XML.ignoreWhitespace = false;
XML.prettyPrinting = false;
[page,path,kids,mine] = Quentin.go.load("pages.tjs",p);
print("<!doctype html>");
if(p[0] == 'index') {
print('<html><head><meta http-equiv="refresh" content="0;url=http://warwickphotosoc.co.uk/home">\n<meta name="google-site-verification" content="89e8RdxbnnGE6XEbxqXXGEJM6ZWvP1tnop_JrMBkrmI" /></head></html>');
}
template.print({
	"pages": {
		"all": $._(function(f,o) {
			var r = {};
			for each(let [k,v] in Iterator(o)) {
				if(k === 'index') continue;
				if(Object.isFunction(v) || Object.isString(v)) {
					r[k] = {};
				} else {
					r[k] = f(f,v);
				}
			}
			return r;
		}, Quentin.pages),
		"toplevels": Object.keys(Quentin.pages).without('index'),
		"mine": mine,
		"kids": kids && kids.without("index")
	},
	"path": path,
	"content": page.out(JSON.load('data.json'))
});
