function queryToJson(query) {
  var arr = query.split('&');
  var ret = {};
  arr.forEach(function (value) {
    var param = value.split('=');
    var k = param[0];
    var v = param[1];
    if (ret[k] === undefined) {
      ret[k] = v;
    }
  });
  ret.src = decodeURIComponent(ret.src);
  return ret;
}

function extend(target, source) {
  for (var p in source) {
    if (source.hasOwnProperty(p)) {
      target[p] = source[p];
    }
  }

  return target;
}

videojs.options.flash.swf = "./video-js.swf"

var query = window.location.search.replace('?', '');
var params = queryToJson(query);
var video = document.getElementsByTagName('video')[0];
var source = document.createElement('source');
source.src = params.src;
params.src = undefined; // clear params.src
video.appendChild(source)

var options = {
  'controls': true,
  'autoplay': false,
  'preload': 'auto'
};
options = extend(options, params);

var player = videojs('PLAYER', options);
