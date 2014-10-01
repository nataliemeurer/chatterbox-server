
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

  switch(request.method){
    case 'OPTIONS':
      response.writeHead(200, headers);
      response.end();
      break;
    case 'GET':
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), getSuccessCode);
      break;
    case 'POST':
      postData(request, function(data){
        exports.messageStorage.unshift(JSON.parse(data));
      });
      returnResponse(response, JSON.stringify({results: exports.messageStorage}), postSuccessCode);
      break;
    default:
      returnResponse(response, null, 404);
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
