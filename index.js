const http = require('http');
const url = require('url');

const server = http.createServer(function (req, res) {
    let parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.path;
    let trimmedPath = path.replace(/^\/+|\/+$/g, "");

    res.end("hello world");
    console.log("Request is received on path: " + trimmedPath);
});

const port = 3000;
const hostName = "localhost";

server.listen(port, hostName, () => {
    console.log("Listening on port 3000");
});