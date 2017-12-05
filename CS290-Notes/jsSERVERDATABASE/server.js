var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var peopleData = require('./peopleData');
var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST || 'classmongo.engr.oregonstate.edu';
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoConnection = null;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).render('homePage');
});

app.get('/people', function (req, res) {
  var peopleDataCollection = mongoConnection.collection('peopleData');
  peopleDataCollection.find({}).toArray(function (err, results) {  //specifies all data and transforms it into an array
      if(err) {
        res.status(500).send("Error fetching people from database");
      } else {
        console.log("== query results:", results);
        res.status(200).render('peoplePage', {
          people: results;
        });
      }
  });

  // res.status(200).render('peoplePage', {
  //   people: peopleData
  // });
});

app.get('/people/:personId', function(req, res, next) {
  var peopleDataCollection = mongoConnection.collection('peopleData');

  peopleDataCollection.find({personId: req.params.personId}).toArray(function (err, results) {  //specifies all data and transforms it into an array
      if(err) {
        res.status(500).send("Error fetching person from database");
      } else if (results.length > 0) {

        res.status(200).render('personPage', {
          people: results[0]; //assuming index 0 is the correct person
        });
      } else {
        next();
      }
  });

  // if (peopleData[personId]) {
  //   var person = peopleData[personId];
  //   res.status(200).render('personPage', person);
  // }
  // else {
  //   next();
  // }
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');
});

/* STARTING TO USE POSTS */
app.post('/people/:personId/addPhoto', function(req, res, next) {

  if(req.body && req.body.photoURL) {
    var peopleDataCollection = mongoConnection.collection('peopleData');
    var photoObj = {
      photoURL: req.body.photoURL,
      caption: req.body.caption
    };

    peopleDataCollection.updateOne(
      {personId: req.params.personId},
      { $push: {photos: photoObj} },
      function(err, result) {
        if(err){
          res.status(500).send("Error fetching person from database");
        } else {
          res.status(200).send("Sucess");
        }
      }
    );
  } else {
    res.status.send("Request body needs a 'photoURL' filed.")
  }


  // var personId = req.params.personId;
  // if(peopleData[personId]) {
  //   console.log("== request body:", req.body);
  //   peopleData[personId].photos.push({
  //     photoURL: req.body.photoURL,
  //     caption: req.body.caption
  //   });
  //   console.log("== new person data:", peopleData[personId]);
  //   res.status(200).send("Success");
  // }
  // else {
  //   next();
  // }
});

app.post('*', function(req, res){
  res.status(404).send("POST not allowed");
});

//Mongo DB connection
MongoClient.connect(mongoURL, function(err, connection){
  if(err) {
    throw err;
  }
  mongoConnection = connection;
  app.listen(port, function () {
    console.log("== Server listening on port:", port);
  });
});
