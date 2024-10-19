const express = require('express');
const api = require('./api');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(cors());


app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data (no need for body-parser package)
app.use(express.urlencoded({ extended: true }));

// Parses the text as json (no need for body-parser package)
app.use(express.json());

app.use('/api', api);
