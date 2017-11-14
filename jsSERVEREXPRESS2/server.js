var path = require('path'); //allows to build path for windows/linux
var express = require('express');
var app = express();

var availablePeople = [
  'luke',
  'beyonce',
  'einstein',
  'ta-nahisi',
  'marie'
];

//displays people.html when url is /people/
app.get('/people', function(req, res) {
  res.status(200).sendFile(path.join(__dirname, 'public', 'people.html'));
});

//paramertizing the url
app.get('/people/:personId', function(req, res, next) {
  var personId = req.params.personId;

  if(availablePeople.indexOf(personId) !== -1) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'people', personId + '.html'));
  }
  else {
    next();
  }
});

app.use(express.static('public'));

app.use('*', function(req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(8000, function () {
  console.log("== Server listening on port 8000");
})
