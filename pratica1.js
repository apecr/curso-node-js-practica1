var http = require('http');
var server = http.createServer(handleRequest);
server.listen(8000);

function handleRequest(request, response) {
	var started = Date.now();
    var data = '<html><body><h1>My web server</h1><p>Received request for'+ request.url +'</p></html></body>';
    console.log(request.url);
    if (request.url == '/ok' ){
    	response.statusCode = 200;
    } else {
    	response.statusCode = 302;
    }
    response.end(data);
    var elapsed = Date.now() - started;
    console.log('Tarde ' + elapsed + ' ms');
}
