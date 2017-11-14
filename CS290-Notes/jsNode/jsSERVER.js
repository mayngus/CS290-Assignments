var http = require('http');

//function is request and response
var server = http.createServer(function (req, res) {
  console.log("== Request made");
  console.log(" - method:", req.method);
  console.log(" - path:", req.url);
  console.log(" - header:", req.headers);

  //res.statusCode = 200;
  // res.write("Hello World!");
  //res.setHeader("Content-Type", "text/html");
  res.writeHead(200, { //does both status code and header
    "Content-Type": "text/html"
  });
  res.write("<html>");
  res.write("<body>");
  res.write("<h1>Welcome to this site!</h1>");
  res.write("<p>You requested " + req.url + "</p>");
  res.write("</body>");
  res.write("</html>");
  res.end(); //done putting stuff into response, ready to send response
});

//claims port in our computer and starts the server
//web defaults are port 80, but u need power
//there are ports people use like 8000
server.listen(8000, function () {
  console.log("== Server listening on port 8000");
});
