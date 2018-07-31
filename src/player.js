function queryToJson(query) {
  var arr = query.split("&");
  var ret = {};
  arr.forEach(function(value) {
    var param = value.split("=");
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

function getType(src) {
  if (/\.flv$/.test(src)) {
    return "video/x-flv";
  }
  return "video/mp4";
}

var query = window.location.hash.replace("#", "");
var params = queryToJson(query);
var video = document.getElementsByTagName("video")[0];
var source = document.createElement("source");
source.type = getType(params.src);
source.src = params.src;
params.src = undefined; // clear params.src
video.appendChild(source);

var options = {
  controls: true,
  autoplay: false,
  preload: "auto",
  techOrder: ["html5", "flvjs"]
};
options = extend(options, params);

var player = videojs("PLAYER", options);
