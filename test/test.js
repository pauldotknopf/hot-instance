var express = require('express');
var app = express();
var liveInstance = require('../index.js')(require.resolve('./live'));

app.get('/', function (req, res) {
  res.send(liveInstance.instance());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
