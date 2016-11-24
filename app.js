const express = require('express');

const app = express();

var port = 3000;
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
});
