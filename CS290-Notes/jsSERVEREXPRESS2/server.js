var path = require('path'); //allows to build path for windows/linux
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData'); //loads .json file
var app = express();

//to render dynamic content and use handlebars in express
app.engine('handlebars', exphbs({defaultLayout: 'main'})); //(name of engine, instance of exphbs)
app.set('view engine', 'handlebars'); //sets default engine to handlebars

app.get('/', function(req, res) {
  res.status(200).render('homePage');
});

//displays people.html when url is /people/
app.get('/people', function(req, res) {
  res.status(200).sendFile(path.join(__dirname, 'public', 'people.html'));
});

//paramertizing the url
app.get('/people/:personId', function(req, res, next) {
  var personId = req.params.personId;

  if(peopleData[personId]) {
  //  res.status(200).sendFile(path.join(__dirname, 'public', 'people', personId + '.html'));
  var person = peopleData[personId];
    res.status(200).render('personPage', person); // knows to look in views for personpage with file extentoin .hbs || tells express to use template to send it back
  }
  else {
    next();
  }
});

app.use(express.static('public'));

app.use('*', function(req, res) {
  //res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  res.status(404).render('404');
});

app.listen(8000, function () {
  console.log("== Server listening on port 8000");
})
