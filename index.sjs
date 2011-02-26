#!/home/photosoc/bin/js
load("quentin.ljs");
<<<<<<< HEAD
var p = "PATH_INFO" in environment ? environment.PATH_INFO.split('/').filter(function(a) a) : ["index"];
=======
var p = Quentin.env.path || ["home"];
>>>>>>> 7ed9ca8f49e675af275435ccdc39239fe2ebdcbb
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
