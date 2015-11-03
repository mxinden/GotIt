Package.describe({
  name: 'fixtures',
  version: '0.0.1',
  /** no debugOnly because otherwise api.export is not working */
  //debugOnly: true,
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['underscore', 'mongo']);
  api.addFiles('fixtures.js');
  api.export('Fixtures');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('fixtures');
  api.addFiles('fixtures-tests.js');
});
