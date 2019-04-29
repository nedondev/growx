var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    port = process.env.PORT || 8000;
var sql_connect = require('./db.js');

app.listen(port);

console.log('GrowX RESTful API started on: ' + port );

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes');
routes(app);

