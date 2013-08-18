(function() {

  var origin = window.location.origin.toString();

  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", "http://filer.io/api/?origin=" + origin);
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  function FileSystemProxy() {
    this.handleMessage = function handleMessage(event) {

    };

    function send(message) {
      window.postMessage
    };

    this.stat = function stat(path, callback) {

    };
  };

  iframe.addEventListener('load', function() {
    winder.filer = new FileSystemProxy();
  });

})();