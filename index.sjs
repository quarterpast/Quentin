load("quentin.js");
var p = arguments[0].parseQuery().page.split('/');
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
