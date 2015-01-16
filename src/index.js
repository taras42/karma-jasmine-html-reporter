var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initReporter = function(files,  baseReporterDecorator) {

  baseReporterDecorator(this);

  files.unshift(createPattern(__dirname + '/lib/adapter.js'));
  files.unshift(createPattern(__dirname + '/lib/html.jasmine.reporter.js'));
  files.unshift(createPattern(__dirname + '/css/jasmine.css'));
};

initReporter.$inject = ['config.files',  'baseReporterDecorator'];

module.exports = {
  'reporter:html': ['type', initReporter]
};