var chokidar = require('chokidar');
var fs = require('fs');
var reload = require('require-reload')(require);

function LiveInstance(module) {

  this.module = module;
  this.moduleLocation = require.resolve(module);

  if(!fs.existsSync(this.moduleLocation)) {
    this.exists = false;
    this.error = 'No module could be found for ' + module + '.';
    return;
  } else {
    this.instance = require(this.moduleLocation);
    this.exists = true;
  }

  // start watching the file
  this.watcher = chokidar.watch(this.moduleLocation)
    .on('add', (event, path) => {
      this.instance = reload(this.moduleLocation);
      this.exists = true;
    })
    .on('unlink', (event, path) => {
      this.exists = false;
      this.instance = null;
    })
    .on('change', (event, path) => {
      this.instance = reload(this.moduleLocation);
      this.exists = true;
    });
}

module.exports = function(module) {
  return new LiveInstance(module);
}
