const http = require('http');
const url = require('url');

// Port to listen on
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;

    // Set default headers
    res.setHeader('Cache-Control', 'no-cache');

    if (path === '/nodejs/hello-html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const date = new Date();
        const ip = req.socket.remoteAddress;
        res.end(`<html><head><title>Hello HTML</title></head><body>
        <h1>Hello HTML NodeJS</h1>
        <p>Date: ${date}</p>
        <p>Your IP: ${ip}</p>
        </body></html>`);
    } 
    else if (path === '/nodejs/hello-json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const date = new Date();
        const ip = req.socket.remoteAddress;
        const message = { title: "Hello JSON", date, ip };
        res.end(JSON.stringify(message));
    } 
    else if (path === '/nodejs/env') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><head><title>Env Vars</title></head><body>');
        res.write('<h1>Environment Variables</h1><hr>');
        Object.keys(process.env).sort().forEach(key => {
            res.write(`<b>${key}:</b> ${process.env[key]}<br>`);
        });
        res.end('</body></html>');
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`NodeJS server running on port ${PORT}`);
});
