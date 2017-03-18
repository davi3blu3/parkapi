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

// Error handler
function handleError(res, reason, message, code) {
    console.log("ERROR: ", reason);
    res.status(code || 500).json({"error": message});
}

// API Route
app.get("/api/parks.json", function(req, res) {
    db.collection(PARKS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to retrieve parks.");
        } else {
            res.status(200).json(docs);
        }
    })
})

// app.post("api/parks", function(req, res) {
//     db.collection(PARKS_COLLECTION).insertMany
// }
