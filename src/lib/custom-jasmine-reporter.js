(function customJasmineReporter() {
  var requestAnimationFrameId = null;
  var total = null;
  var count = 0;
  var passed = 0;
  var failed = 0;
  var skipped = 0;
  var jasmineBar = document.createElement('span');
  var testBar = document.createElement('span');
  jasmineBar.classList.add('jasmine-bar', 'jasmine-skipped', 'running-status');
  testBar.classList.add('jasmine-bar', 'jasmine-passed', 'running-test');

  function specSummary(current) {
    return 'Processing ' + current + ' of ' + total + ' specs';
  }

  function testSummary() {
    return passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped';
  }

  function updateTestBar() {
    var passedBar = document.querySelector('.jasmine-passed');
    if (failed > 0 && passedBar) {
      passedBar.classList.remove('jasmine-passed');
      passedBar.classList.add('jasmine-failed');
    }
  }

  function trackTestCounts(opts) {
    var status = opts.status;
    switch (status) {
      case 'failed':
        failed += 1;
        break;
      case 'passed':
        passed += 1;
        break;
      default:
        skipped += 1;
    }
  }

  function removeDisabledSuites(nodes) {
    [].forEach.call(nodes, function (node) {
      if (node.querySelectorAll('li[id^=spec-spec].jasmine-disabled').length === node.querySelectorAll('li[id^=spec-spec]').length) {
        node.parentNode.removeChild(node);
      } else {
        var remainingSuites = [].slice.call(node.childNodes).filter(function (suiteNode) {
          var classes = suiteNode.getAttribute('class').split(' ');
          return classes.indexOf('jasmine-suite') !== -1;
        });

        removeDisabledSuites(remainingSuites);
      }
    });
  }

  // Reporter doesn't play well with PhantomJS
  if (/PhantomJS/.test(window.navigator.userAgent)) {
    // When running PhantomJS locally, the Jasmine reporter swallows the errors up.
    // Only needed when running Phantom locally.
    return jasmine.getEnv().addReporter({
      jasmineDone: function jasmineDone() {
        window.callPhantom({
          command: 'exit',
          reason: 'User Request.',
          testSummary: testSummary()
        });
      },
      specStarted: function specStarted() {
        count += 1;
      },
      specDone: function specDone(opts) {
        trackTestCounts(opts);
        if (opts.status === 'failed') {
          opts.failedExpectations.forEach(function (exp) {
            /* eslint-disable no-console, dot-notation */
            console['log'](exp.message);
            console['log'](exp.stack);
            /* eslint-enable no-console, dot-notation */
          });
        }
      }
    });
  }

  return jasmine.getEnv().addReporter({
    jasmineStarted: function jasmineStarted(suiteInfo) {
      var jasmineAlert = document.querySelector('.jasmine-alert');

      total = suiteInfo.totalSpecsDefined;

      jasmineAlert.appendChild(jasmineBar);
      jasmineAlert.appendChild(testBar);
    },
    specStarted: function specStarted() {
      count += 1;
    },
    specDone: function specDone(opts) {
      trackTestCounts(opts);
      updateTestBar();
    },
    suiteDone: function suiteDone() {
      window.cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = window.requestAnimationFrame(function () {
        var statusEl = document.querySelector('.running-status');
        if (statusEl) {
          statusEl.innerText = specSummary(count);
        }

        var testEl = document.querySelector('.running-test');
        if (testEl) {
          testEl.innerText = testSummary();
        }
      });
    },
    jasmineDone: function jasmineDone() {
      var statusEl = document.querySelector('.running-status');
      statusEl.parentNode.removeChild(statusEl);

      var testEl = document.querySelector('.running-test');
      testEl.parentNode.removeChild(testEl);

      // TODO: Make the Jasmine options work.
      var options = document.querySelector('.jasmine-run-options');
      options.parentNode.removeChild(options);

      removeDisabledSuites(document.querySelectorAll('.jasmine-summary > .jasmine-suite'));
    }
  });
})();
