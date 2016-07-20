# hot-instance

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> A helper library to keep a js file "hot" by watching the file for changes.

```npm install hot-instance```

## A quick demo

**```live.js```**

```js
module.exports = function() {
  return 'Update this string value to watch it reload automatically!';
}
```

**```index.js```**

```js
var express = require('express');
var app = express();
var hot = require('hot-instance');

var testJsFile = hot(require.resolve('./live')); // full paths required

// "instance" is exported from "live.js". It will be auto-reloaded when the file changes.
console.log(testJsFile.instance());

app.get('/', function (req, res) {
  // let the user know what the value is now
  res.send(testJsFile.instance());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

## Documentation

```hot``` is a function. It takes a single arguement, ```module```, which must be a fully qualified path to the javascript file you wish to load and watch. It returns a ```LiveInstance``` object.

### ```LiveInstance```
#### ```instance``` - This is the actual exported contents of your hot file. This will be auto-updated as your file changes. If the file you are watching is deleted, it will be ```null```. It will continue watching for the file to re-appear.
#### ```exists``` - A ```bool``` that indicates if the file you are watching currently exists. If the file you are watching becomes deleted, this will be ```false```, and ```instance``` will be ```null```.

[npm-image]: https://badge.fury.io/js/hot-instance.svg
[npm-url]: https://npmjs.org/package/hot-instance
[daviddm-image]: https://david-dm.org/pauldotknopf/hot-instance.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/pauldotknopf/hot-instance
