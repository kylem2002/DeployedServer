const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 

const app = express();

// Use CORS middleware (Allow all origins for simplicity. Adjust as needed.)
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to serve data from db.json
app.get('/api', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error: Unable to read db.json');
        } else {
            // Parse data as JSON and send it
            res.json(JSON.parse(data));
        }
    });
});

// GET requests not handled before 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5501;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
