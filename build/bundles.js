module.exports = {
  'bundles': {
    'dist/app-build': {
      'includes': [
        '**/*.js',
        '**/*.html!text',
        '**/*.css!text'
      ],
      'options': {
        'inject': true,
        'minify': true,
        'depCache': true,
        'rev': true
      }
    },
    'dist/aurelia': {
      'includes': [
        'aurelia-framework',
        'aurelia-bootstrapper',
        'aurelia-templating-binding',
        'aurelia-polyfills',
        'aurelia-templating-resources',
        'aurelia-templating-router',
        'aurelia-loader-default',
        'aurelia-history-browser',
        'aurelia-logging-console',
        'bootstrap/css/bootstrap.min.css!text'
      ],
      'options': {
        'inject': true,
        'minify': true,
        'depCache': true,
        'rev': true
      }
    }
  }
};
