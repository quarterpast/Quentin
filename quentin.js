Object.extend = function(d,s) {
	for(var k in s) {
		d[k] = s[k];
	}
	return d;
};
Object.isString = function(object) {
	return Object.prototype.toString.call(object) === '[object String]';
};
Object.isArray = function(object) {
	return Object.prototype.toString.call(object) === '[object Array]';
};
Object.isUndefined = function(object) {
	return (typeof object === 'undefined');
};
String.prototype.parseQuery = function() {
	var t = this.replace(/^.*?\?/,'').split('&'), r = {};
	t.forEach(function(p) {
		var k = p.substr(0,p.indexOf('=')).replace(/\[\]$/,''),
		v = p.substr(p.indexOf('=')+1).replace(/\+/g,' ');
		if(k in r) {
			if(Object.isArray(r[k])) {
				r[k].push(v);
			} else {
				r[k] = [r[k],v];
			}
		} else {
			r[k] = v;
		}
	});
	return r;
};
JSON.load = function(p) {
	return JSON.parse(read(p));
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
	error: {
		
	},
	init: function() {
		var t = Quentin.options.template, c, o;
		if(Object.isString(t)) {
			try {
				c = read(t);
				evalcx(t,o);
				Quentin._template = o.template;
			} catch(e) {
				throw e;
			}
		} else {
			try {
				Quentin._template = Quentin.options.template;
			} catch(e) {
				
			}
		}
	},
	go: function(p) {
		var args, r, o = Quentin._template;
		for each(let [i,a] in Iterator(p)) {
			if(Object.isUndefined(o[a])) {
				args = p.slice(i);
				break;
			} else {
				o = o[a];
			}
		}
		if(typeof o === 'function') {
			r = Quentin.template(o,args);
		} else if(p[0] in Quentin._template && typeof o['index'] === 'function') {
			r = Quentin.template(o['index'],args);
		} else {
			throw new Error('page not found');
		}
		return r;
	},
	env: {
		now: function() new Date(),
		get: environment.QUERY_STRING && environment.QUERY_STRING.parseQuery(),
		post: {},//TODO: find out where/if I can get this
		server: environment
	},
	template: function(m,path) {
		var out = function(d) {
			return m.apply(Quentin.env,[d,path]);
		},
		p = function(d) {
			print(out(d));
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

