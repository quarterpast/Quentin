#!/home/photosoc/bin/js
load("quentin.ljs");
var p = Quentin.env.path || ["index"],
template = Quentin.template.load("template.tjs"),
page = Quentin.go.load("pages.tjs",p);

template.print({
	"content": page
});
