#!/home/photosoc/bin/js
load("quentin.ljs");
var p = Quentin.env.path || ["index"],
template = Quentin.template.load("template.tjs"),
page, path;
[page,path] = Quentin.go.load("pages.tjs",p);

template.print({
	"path": path,
	"content": page.out(JSON.load('data.json'))
});
