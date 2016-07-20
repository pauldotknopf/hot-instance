var express = require('express');
var app = express();
var hotInstance = require('../index.js');

var testJsFile = hotInstance(require.resolve('./live'));

app.get('/', function (req, res) {
  res.send(testJsFile.instance());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
