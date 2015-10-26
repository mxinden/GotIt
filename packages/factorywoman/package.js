Package.describe({
  name: 'factorywoman',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
//  api.use(['mongo', 'underscore', 'lai:collection-extensions']);
  api.addFiles('factorywoman.js');
  api.export('FactoryWoman');
  api.use('underscore');
});

Package.onTest(function(api) {
  api.use(['sanjo:jasmine@0.18.0', 'lai:collection-extensions']);
  api.use('factorywoman');
  api.use('underscore');
  api.use('autopublish');
  api.addFiles('tests/client/test.js', 'client');
  api.addFiles('tests/lib/db.js',['client', 'server']);

});
