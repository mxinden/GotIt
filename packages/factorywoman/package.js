Package.describe({
  name: 'factorywoman',
  version: '0.0.1'
});

Package.on_use(function(api) {
  api.use(['mongo', 'underscore', 'lai:collection-extensions']);
  api.add_files('factorywoman.js');
  api.export('FactoryWoman', ['client', 'server']);
});
