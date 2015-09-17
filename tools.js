tools = {};

tools.deepCopy = function(a) {
	var b = a;
  if (Array.isArray(a)) {
    b = [];
    for (var i=0; i<a.length; i++) b[i] = tools.deepCopy(a[i]);
  }
  else if (typeof(a) === 'object') {
    b = {};
    for (var key in a) if (a.hasOwnProperty(key)) b[key] = tools.deepCopy(a[key]);
  }
  return b;
}

tools.extend = function(a, b) {
  if (typeof(b) === 'object') for (var key in b) a[key] = b[key];
  return a;
}

tools.inherit = function(base, sub) {
  // Avoid instantiating the base class just to setup inheritance
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  // for a polyfill
  // Also, do a recursive merge of two prototypes, so we don't overwrite
  // the existing prototype, but still maintain the inheritance chain
  // Thanks to @ccnokes
  var origProto = sub.prototype;
  sub.prototype = Object.create(base.prototype);
  for (var key in origProto)  {
     sub.prototype[key] = origProto[key];
  }
  // Remember the constructor property was set wrong, let's fix it
  sub.prototype.constructor = sub;
  // In ECMAScript5+ (all modern browsers), you can make the constructor property
  // non-enumerable if you define it like this instead
  Object.defineProperty(sub.prototype, 'constructor', {
    enumerable: false,
    value: sub
  });
}

tools.shuffle = function(o) {
  o = o.slice();
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}