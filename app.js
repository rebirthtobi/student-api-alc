var express = require('express');
var route = require('./routes');


var app = express();
var port = process.env.PORT || 8500;

app.listen(port);

route(app);