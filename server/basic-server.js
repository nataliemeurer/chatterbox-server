/* Import node's http module: */
var http = require("http");
var handle = require('./request-handler.js');
var path = require('path');
var url = require('url');


var port = 3000;

var ip = "127.0.0.1";

var paths = {
  "/classes/messages": handle.handleRequest,
  "/log": handle.handleRequest
}


var server = http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  if(paths[path]){
    paths[path](request,response);
  } else {
    response.writeHead(404);
    response.end("Error: 404 Not Found")
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
