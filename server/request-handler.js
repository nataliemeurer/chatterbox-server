/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var returnResponse = function(response, data, code) {
    response.writeHead(code, defaultCorsHeaders);
    response.end(data);
}

var postData = function(request, callback) {
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  var getSuccessCode = 200;
  var postSuccessCode = 201;
  // Declare default headers to handle CORS
  var headers = defaultCorsHeaders;

  // OPTIONS REQUESTS
  if (request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end();
  }
  // GET REQUESTS

  if (request.method === 'GET'){
    if (request.url === "/log"){
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), getSuccessCode);
    } else if( request.url === '/classes/room1' ){
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), getSuccessCode);
    } else if(request.url === '/classes/messages') {
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), getSuccessCode);
    } else {
      returnResponse(response, 'Error 404: Not Found!', 404)
    }
  }

  // POST REQUESTS
  if (request.method === "POST"){
    if ( request.url === "/send" ){
      postData(request, function(data){
        exports.messageStorage.unshift(JSON.parse(data));
      });
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), postSuccessCode);
    } else if (request.url === "/classes/messages" ){
      postData(request, function(data){
        exports.messageStorage.unshift(JSON.parse(data));
      });
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), postSuccessCode);
    } else if (request.url === "/classes/room1" ){
      postData(request, function(data){
        exports.messageStorage.unshift(JSON.parse(data));
      })
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), postSuccessCode);
    } else {
      returnResponse(response, 'Error 404: Not Found!', 404)
    }
  }
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "origin, x-csrftoken, content-type, accept",
  "access-control-max-age": 10,
  "content-type": "application/json"
};

exports.messageStorage = [];
