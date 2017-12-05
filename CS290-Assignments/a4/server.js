/*
 * Name: Gregory Sanchez
 * Description: Simple node server implementation
 * Date: 11/13/17
 */
var http = require ('http');
var fs = require('fs');

var indexHTML = fs.readFileSync('./public/index.html');
var indexCSS = fs.readFileSync('./public/style.css');
var indexJS = fs.readFileSync('./public/index.js');
var index404 = fs.readFileSync('./public/404.html');
var indexIMG = fs.readFileSync('./public/benny.jpg');

var port = process.env.PORT;
if (!port) { port = 3000; }

var server = http.createServer(function (req, res) {

	switch(req.url) {
		case '/':
		case '/index.html':
			res.writeHead(200, { "Content-Type": "text/html" });
			res.write(indexHTML);
		break;
		case '/style.css':
			res.writeHead(200, { "Content-Type": "text/css" });
			res.write(indexCSS);
		break;
		case '/index.js':
			res.writeHead(200, { "Content-Type": "application/javascript" });
			res.write(indexJS);
		break;
		case '/benny.jpg':
			res.writeHead(200, { "Content-Type": "image/jpeg" });
			res.write(indexIMG);
		break;
		default:
			res.writeHead(404, { "Content-Type": "text/html" });
			res.write(index404);
		break;
	}	

	res.end();
});

server.listen(port, function() {
	console.log("== Server listening on port", port);
});
