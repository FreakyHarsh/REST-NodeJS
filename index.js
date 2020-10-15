const http = require('http');
const { StringDecoder } = require('string_decoder');
const server = http.createServer(function (req, res) {

    //------------- LEGACY METHOD ----------------
    // let parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl);
    // let path = parsedUrl.path;
    // console.log(path);
    // let trimmedPath = path.replace(/^\/+|\/+$/g, "");
    // console.log("Request is received on path: " + trimmedPath);
    // res.end("Req received");

    let myURL = new URL(req.url, "https://localhost:3000");
    let params = myURL.searchParams;
    let path = myURL.pathname;
    let method = req.method;
    let headers = req.headers;

    // Get the payload, if any 
    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();
        console.log(`Request receive with payload: ${buffer}`);

        let data = {
            'method': method,
            'headers': headers,
            'path': path,
            'payload': buffer,
            'params': params
        };
        let selectedHandler = typeof (router[path]) !== 'undefined' ? router[path] : handlers.notFound;

        selectedHandler(data, (statusCode = 404, payload = {} ) => {
            res.writeHead(statusCode);
            res.end(payload);
        });
        res.end('response Ends here');
    });
});

const port = 3000;
const hostName = "localhost";

server.listen(port, hostName, () => {
    console.log("Listening on port 3000");
});

// Request Handlers
const handlers = {};
handlers.getInfo = function (data, callback) {
    callback(202, {'data': 'This is the data'});
};

handlers.notFound = function () {
    console.log('404 error');
};

// Routing 
const router = {
    '/info': handlers.getInfo,
};