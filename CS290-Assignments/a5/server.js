/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Gregory Sanchez
 * Email: sanchegr@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');


var app = express();
var port = process.env.PORT || 3000;
var postData = require('./postData')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.status(200).render('postPage', postData);
});

app.get('/posts/:postId', function(req, res, next) {
    var postId = parseInt(req.params.postId);

    if(postId >= 0 && postId < postData.length){
      res.status(200).render('postPage', postData[postId]);
    } else {
      next();
    }
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');

});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
