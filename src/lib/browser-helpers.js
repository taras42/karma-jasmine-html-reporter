(function karmaHandlers() {
  if (/PhantomJS/.test(window.navigator.userAgent)) {
    return;
  }

  function appendCSS(path) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'base/' + path;
    document.head.appendChild(link);
  }

  var origStart = window.__karma__.start;
  window.__karma__.start = function karmaStart() {
    appendCSS('node_modules/karma-jasmine-html-reporter/src/css/jasmine.css');
    origStart.apply(window.__karma__, arguments);
  };
})();
