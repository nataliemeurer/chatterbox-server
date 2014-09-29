/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */



exports.handleRequest = function(request, response) {

  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */
  // check type of request
  // array of messages
  // if GET, take the path and return the requested resource
  // if POST, add the resource
  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  console.log("Serving request type " + request.method + " for url " + request.url);
  var getSuccessCode = 200;
  var postSuccessCode = 201;
  console.log(request.url);
 /* Without this line, this server wouldn't work. See the note
   * below about CORS. */


   // GET REQUESTS
  var headers = defaultCorsHeaders;
  if (request.method === 'GET'){
    if (request.url === "/log"){
      headers['Content-Type'] = "application/json";
      response.writeHead(getSuccessCode, headers);
      response.end('successful request');
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
      exports.messageStorage.push(request._postdata);
      response.writeHead(postSuccessCode, headers);
      response.end('POST successful');
    } else if (request.url === "/classes/messages" ){
      headers['Content-Type'] = "application/json";
      exports.messageStorage.push(request._postdata);
      response.writeHead(postSuccessCode, headers);
      response.end('POST successful');
    } else {

    }
  }
  /* .writeHead() tells our server what HTTP status code to send back */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
//{ username: ,
  // text: ,

// }
exports.messageStorage = [];
