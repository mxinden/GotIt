Package.describe({
  name: 'factorywoman',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['underscore', 'lai:collection-extensions']);
  api.addFiles(['client/factorywoman.js', 'client/factoryclosure.js', 'client/factory.js'], 'client');
  api.addFiles(['server/factorywoman.js'], 'server');
  api.export('FactoryWoman');
});

Package.onTest(function(api) {
  api.use(['sanjo:jasmine@0.18.0', 'factorywoman']);
  api.addFiles('tests/client/factorywoman_spec.js', 'client');
  api.addFiles('tests/lib/db.js', ['client', 'server']);
});
