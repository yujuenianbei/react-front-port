/* config-overrides.js */
const rewireLess = require('react-app-rewire-less')
module.exports = function override(config, env) {
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@base-color': '#f44336' }
  })(config, env);

  return config;
}