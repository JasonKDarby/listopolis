const express = require('express');
//const path = require('path');

const app = express();

//app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
