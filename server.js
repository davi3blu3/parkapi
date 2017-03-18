var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var PARKS_COLLECTION = 'parks';

var app = express();
app.use(bodyParser.json());
var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database){
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log('database connection ready');

    var server = app.listen(process.env.PORT || 8080, function(){
        var port = server.address().port;
        console.log('App listening on port', port);
    })
})

// API Route
