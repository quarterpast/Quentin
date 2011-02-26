#!/home/photosoc/bin/js
load("quentin.ljs");
var p = Quentin.env.path || ["index"];
Quentin.pages = {
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
Quentin.go(p).print(JSON.load('data.json'));
