#!/home/photosoc/bin/js
load("quentin.ljs");
var p = "PATH_INFO" in environment ? environment.PATH_INFO.split('/').filter(function(a) a) : ["index"];
Quentin.options.template = {
	"home": {
		"index": i = function() "Welcome to Warwick PhotoSoc!",
		"news": function(d) {
			return <section class="news">
				{$.foreach(d.news, function(n) <article>{n.title}</article>)}
			</section>
		}
	},
	"index": i
};
Quentin.init();
Quentin.go(p).print(JSON.load('data.json'));
