var express = require('express');
//var logger = require('./logger');
var app = express();

//app.use(logger);

// //doesnt use methods, non routing, applies for all requests
// app.use(function(req, res, next) {
//   console.log("== Got a request");
//   console.log("  - Method:", req.method);
//   console.log("  - Path:", req.url);
//   next(); //calls next middleware funciton
// });

app.use(function(req, res, next) {
  var now = new Date();

  req.timeStamp = now.toString();

  next();
});



//middle ware function that responds to get requests
//This responds to the root path
app.get('/', function (req, res, next) {
  var content = "<html>";
  content += "<body>";
  content += "<h1>Welcome to our page</h1>";
  content += "</body>";
  content += "</html>";

  //terminates request section and sends response
  res.status(200).send(content);
});

//different path
app.get('/cats', function (req, res, next) {
  var content = "<html>";
  content += "<body>";
  content += "<h1>Welcome to our Cats page</h1>";
  content += "</body>";
  content += "</html>";

  //res.redirect('https://google.com');
  //terminates request section and sends response
  res.status(200).send(content);
});

//different path
app.get('/photos/:userId/:photoId', function (req, res, next) {

  console.log("== Photo page requested, req.params:", req.params);

  var content = "<html>";
  content += "<body>";
  content += "<h1>Requested photo page.</h1>";
  content += "<h1>Requested user: " + req.params.userId + "</h1>";
  content += "<h1>Requested photo: " + req.params.photoId + "</h1>";
  content += "<h1>Requested at: " + req.timeStamp + "</h1>";
  content += "</body>";
  content += "</html>";

  res.status(200).send(content);
});

//does same as display pages but in one line
//public is random directory, displays every item in there when requested
// app.use(express.static('public'));


app.post('*', function (req, res, next) {
  //terminates request section and sends response
  res.status(405).send("Post not allowed");
});

//doesnt exist
//location in code does matter
app.get('*', function (req, res, next) {
  //terminates request section and sends response
  res.status(404).send("Requested page not found.");
});

//middleware function that responds to the psot requrests
//can use other methods for what is needed
//app.post();

app.listen(8000, function () {
  console.log("== Server listening on port 8000");
});
