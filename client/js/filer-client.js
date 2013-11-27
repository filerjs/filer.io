(function() {
  var origin = window.location.origin.toString();
  var targetOrigin = "http://filer.io";
  var iframeSrc = targetOrigin + "/iframe/?origin=" + origin;

  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", iframeSrc);
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  window.addEventListener('load', function() {
    var pending = {};

    function Filer() {
      var nextRpcId = 1;

      function send(data) {
        iframe.contentWindow.postMessage(data, targetOrigin);
      }

      this.stat = function stat(path, callback) {
        var rpcId = nextRpcId ++;
        pending[rpcId] = callback;
        send(
          {
            'id': rpcId,
            'method': 'stat',
            'args': [path]
          });
      }
    };

    window.filer = new Filer();

    function receiveMessage(event) {
      console.info('client:', event.origin, event.data);
      console.info('client:', document.domain)

      if(targetOrigin !== event.origin) {
        return
      }

      var data = event.data;
      var rpcId = data['id'];
      var rArgs = data['rArgs'];
      pending[rpcId].apply(undefined, rArgs);
      delete pending[rpcId];
    };

    window.addEventListener('message', receiveMessage, false);
  });
})();