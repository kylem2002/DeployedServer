const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows access from any origin
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET'); // Allows only OPTIONS and GET methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // Handle API request
    if (req.url === '/api') {
        fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf-8',
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(content);
            }
        );
    } else {
        // Build file path
        let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

        // Extension of the file
        let extname = path.extname(filePath);

        // Initial content type
        let contentType = 'text/html';

        // Check ext and set content type
        switch (extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
        }

        if (contentType == "text/html" && extname == "") filePath += ".html";

        console.log(filePath);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    // Page not found
                    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    });
                } else {
                    // Some server error
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                // Success
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf8');
            }
        });
    }
});

const PORT = process.env.PORT || 5959;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
