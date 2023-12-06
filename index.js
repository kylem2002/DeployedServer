const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import CORS module

const app = express();

// Use CORS middleware (Allow all origins for simplicity. Adjust as needed.)
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to serve data from db.json
app.get('/api', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error: Unable to read db.json');
        } else {
            // Format the JSON data with indentation for readability
            const formattedData = JSON.stringify(JSON.parse(data), null, "\n");
            res.send(formattedData);
        }
    });
});

// All other GET requests not handled before will return your app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
