(function() {

  var origin = window.location.origin.toString();

  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", "http://filer.io/api/");
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

    this.fstat = function fstat(path, callback) {

    };
  };

  iframe.addEventListener('load', function() {
    window.Filer = {
      FileSystem = FileSystemProxy;
    }
  });

})();