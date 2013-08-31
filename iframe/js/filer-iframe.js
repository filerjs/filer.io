(function() {
  var origin = "http://filer.io";
  var targetOrigin = window.location.toString().split('?')[1];
	var fs = new IDBFS.FileSystem('filer');

  function Response(args) {
    this.id = guid();
    this.transfer = [];

    args.forEach(function(arg) {
      if(arg instanceof ArrayBuffer) {
        this.transfer.push(arg);
      }
    });

    this.message = {
      method: method,
      args: args
    };
  };

  function sendMessage(target, rpc, callback) {
    target.postMessage(rpc.message, targetOrigin, rpc.transfer);
  };

  function receiveMessage(event) {
    if(targetOrigin !== event.origin) {
      return;
    }

    var source = event.source;
    var data = event.data;
    fs[data.message.method].apply(undefined, data.message.args,
      function() {
        sendMessage(source, new Response())
      }
    );
  };

	window.addEventListener('message', receiveMessage, false);
})();