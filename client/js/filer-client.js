(function() {
  var origin = window.location.origin.toString();
  var targetOrigin = "http://filer.io";
  var iframeSrc = targetOrigin + "/iframe/?origin=" + origin;

  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", iframeSrc);
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  window.addEventListener('load', function() {
    iframe.contentWindow.postMessage('hello world', '*');

    function Filer() {
    };
    Filer.prototype.stat = function stat(path, callback) {
      sendMessage(new Request("stat", [path]));
    };

    window.filer = new Filer();

    function receiveMessage(event) {
      console.info('client:', event.origin, event.data);
      console.info('client:', document.domain)

      if(targetOrigin !== event.origin) {
        return
      }
    };

    window.addEventListener('message', receiveMessage, false);
  });
})();