/*const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Get the extension of the file
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
        // Add more cases for other file types if needed
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        // ... other file types
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); */

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to serve data from db.json
app.get('/api', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error: Unable to read db.json');
        } else {
            // Format the JSON data with indentation for readability
            const formattedData = JSON.stringify(JSON.parse(data), null, 4);
            res.send(formattedData);
        }
    });
});


// All other GET requests not handled before will return your app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
