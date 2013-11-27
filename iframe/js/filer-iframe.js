(function() {
  var targetOrigin = window.location.toString().split('?')[1].split('=')[1];
	var fs = new IDBFS.FileSystem('filer', 'FORMAT');

  function receiveMessage(event) {
    console.info('iframe:', event.origin, event.data);
    console.info('iframe:', document.domain)

    if(targetOrigin !== event.origin) {
      return
    }

    var source = event.source;
    var data = event.data;
    var rpcId = data['id'];
    var method = data['method'];
    var args = data['args'];

    args.push(function() {
      rArgs = Array.prototype.slice.call(arguments);
      source.postMessage({
        'id': rpcId,
        'rArgs': rArgs
        }, targetOrigin);
    });
    fs[method].apply(fs, args);
  };

	window.addEventListener('message', receiveMessage, false);
})();