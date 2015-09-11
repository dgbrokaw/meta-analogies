tools = {};

tools.deepCopy = function(a) {
	var b = a;
  if (Array.isArray(a)) {
    b = [];
    for (var i=0; i<a.length; i++) b[i] = gmath.deepCopy(a[i]);
  }
  else if (typeof(a) === 'object') {
    b = {};
    for (var key in a) if (a.hasOwnProperty(key)) b[key] = gmath.deepCopy(a[key]);
  }
  return b;
}

tools.extend = function(a, b) {
  if (typeof(b) === 'object') for (var key in b) a[key] = b[key];
  return a;
}
