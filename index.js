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
    
    req.on('end', function (){
        buffer += decoder.end();
        console.log(`Request receive with payload: ${buffer}`);
        res.end('response Ends here');
    });

});

const port = 3000;
const hostName = "localhost";

server.listen(port, hostName, () => {
    console.log("Listening on port 3000");
});