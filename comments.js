// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

// Create web server
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Create in-memory database
const comments = [];

// GET /comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = uuid.v4();
    comments.push(comment);
    res.send(comment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === id);
    if (index >= 0) {
        const comment = comments[index];
        comments.splice(index, 1);
        res.send(comment);
    } else {
        res.status(404).send();
    }
});

// Start web server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Web server is listening on port ${port}...`));