var chokidar = require('chokidar');
var fs = require('fs');
var reload = require('require-reload')(require);

function LiveInstance(module) {

  this.module = module;

  if(!fs.existsSync(this.module)) {
    this.exists = false;
  } else {
    this.instance = require(this.module);
    this.exists = true;
  }

  // start watching the file
  this.watcher = chokidar.watch(this.module)
    .on('add', (event, path) => {
      this.instance = reload(this.module);
      this.exists = true;
    })
    .on('unlink', (event, path) => {
      this.exists = false;
      this.instance = null;
    })
    .on('change', (event, path) => {
      this.instance = reload(this.module);
      this.exists = true;
    });
}

module.exports = function(module) {
  return new LiveInstance(module);
}
