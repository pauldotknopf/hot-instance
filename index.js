var chokidar = require('chokidar');
var fs = require('fs');
var reload = require('require-reload')(require);

function LiveInstance(module) {

  this.module = module;
  this.moduleLocation = require.resolve(module);

  if(!fs.existsSync(this.moduleLocation)) {
    this.error = 'The module ' + this.module + ' could not be located';
    return;
  }

  // let's load the module now, and begin watching it for changes
  this.instance = require(module);

  this.watcher = chokidar.watch(this.moduleLocation).on('all', (event, path) => {
    this.instance = reload(this.module);
  });
}

module.exports = function(module) {
  return new LiveInstance(module);
}
