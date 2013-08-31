(function() {

  var origin = window.location.origin.toString();
  var targetOrigin = "http://filer.io";

  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", targetOrigin + "/iframe/?origin=" + origin);
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  var queue = {};

  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    }).toUpperCase();
  };

  function Request(method, args) {
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

  function sendMessage(rpc, callback) {
    iframe.postMessage(rpc.message, targetOrigin, rpc.transfer);
    queue[rpc.id] = callback;
  };

  function receiveMessage(event) {
    if(targetOrigin !== event.origin ||
       iframe !== event.source) {
      return;
    }

    var data = event.data;
    if(!queue.hasOwnProperty(data.id)) {
      return;
    }

    queue[data.id].apply(undefined, data.args);
    delete queue[data.id];
  };

  function FileSystemProxy() {
  };
  FileSystemProxy.prototype.stat = function stat(path, callback) {
    sendMessage(new Request("stat", [path]));
  };

  window.filer = new FileSystemProxy();
  window.addEventListener('message', receiveMessage, false);

})();