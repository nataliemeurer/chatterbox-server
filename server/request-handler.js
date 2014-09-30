/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */



exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  var getSuccessCode = 200;
  var postSuccessCode = 201;
  // Declare default headers to handle CORS
  var headers = defaultCorsHeaders;

  // OPTIONS REQUESTS
  if (request.method === 'OPTIONS') {
      console.log('!OPTIONS');
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400';
      headers["Access-Control-Allow-Headers"] = "X-Parse-Application-Id, X-Parse-REST-API-Key, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      response.writeHead(200, headers);
      response.end();
  }
  // GET REQUESTS
  if (request.method === 'GET'){
    if (request.url === "/log"){
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end('successful request');
    } else if( request.url === '/classes/room1' ){
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end(JSON.stringify({results: exports.messageStorage}));
    } else if(request.url === '/classes/messages') {
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end(JSON.stringify({results: exports.messageStorage}));
    } else if (request.url === '/'){
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end();
    } else {
      response.writeHead(404, headers);
      response.end('Error 404: Not Found!');
    }
  }

  // POST REQUESTS
  if (request.method === "POST"){
    if ( request.url === "/send" ){
      headers['Content-Type'] = "application/json";
      var data = "";
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        exports.messageStorage.unshift(JSON.parse(data));
        response.writeHead(postSuccessCode, headers);
        response.end(JSON.stringify({results: exports.messageStorage}));
      });
    } else if (request.url === "/classes/messages" ){
      headers['Content-Type'] = "application/json";
      var data = "";
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        // console.log(JSON.parse(data));
        exports.messageStorage.unshift(JSON.parse(data));
        response.writeHead(postSuccessCode, headers);
        response.end(JSON.stringify({results: exports.messageStorage}));
      });
    } else if (request.url === "/classes/room1" ){
      headers['Content-Type'] = "application/json";
      var data = "";
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        exports.messageStorage.unshift(JSON.parse(data));
        response.writeHead(postSuccessCode, headers);
        response.end(JSON.stringify({results: exports.messageStorage}));
      });
    } else {
      response.writeHead(404, headers);
      response.end('Error 404: Not Found!');
    }
  }
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "origin, x-csrftoken, content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.messageStorage = [];
