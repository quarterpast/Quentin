Object.extend = function(d,s) {
	for(var k in s) {
		d[k] = s[k];
	}
	return d;
};
$ = {
	foreach: function(min, max, arr, h, lev) {
		var k, ret=<></>, it = 1;
		lev = lev || 0;
		if(typeof min === 'number') {
			if(typeof max !== 'number') {
				[lev,h,arr,max,min]=[h,arr,max,min,1];
			}
		}	else {
			[lev,h,arr,max,min]=[arr,max,min,Number.POSITIVE_INFINITY,1];
		}
		if(h.length === 1) {
			for(k in arr) {
				if(it < min) {
					++it;
					continue;
				}
				if(it > max) {
					break;
				}
				ret+=h(arr[k], it, lev);
				++it;
			}
		}	else {
			for(k in arr) {
				if(it < min) {
					++it;
					continue;
				}
				if(it > max) {
					break;
				}
				ret+=h(k, arr[k], it, lev);
				++it;
			}
		}
		return ret;
	},
	_if: function(cond, h, _else) {
		if (cond && cond != undefined) {
			return h(cond);
		}	else if ($else) {
			return $else(cond);
		}
		return '';
	}
},
Quentin = {
	options: {
		"template": "templates.js"
	},
	init: function(p) {
		o && Quentin.options.extend(o);
		
	},
	template: function(m,path) {
		var env = {
			options: Quentin.options,
			now: function() new Date(),
			get: environment.QUERY_STRING && environment.QUERY_STRING.parseQuery(),
			post: {},//TODO: find out where I can get this
			server: environment
		},
		out = function(d) {
			return m.apply(env,[d,path]);
		},
		p = function(d) {
			print(m.apply(env,[d,path]));
		};
		return {
			out: out,
			print: p
		};
	}	
};

function news(data,path) {
	var x = <article class="news">
			<header><h1>{data.title}</h1><time>{data.timestamp}</time></header>
			{$.foreach(data.tags,function(t) <tag>{t}</tag>)}
			{data.content}
			</article>
	return x.toXMLString();
}


var t = Quentin.template(news);
t.print({title: "test",timestamp: 1234567890,content: "Testing Quentin!",tags:["test","quentin"]});
