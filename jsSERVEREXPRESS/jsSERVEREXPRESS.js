var express = require('express');
var app = express();

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

//ifferent path
app.get('/cats', function (req, res, next) {
  var content = "<html>";
  content += "<body>";
  content += "<h1>Welcome to our Cats page</h1>";
  content += "</body>";
  content += "</html>";

  //terminates request section and sends response
  res.status(200).send(content);
});

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
