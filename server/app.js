/* eslint-disable no-process-env */
/* eslint-disable no-undef */
// External Dependencies
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path');

// Internal Dependencies
const DefaultRoutes = require('./routes/DefaultRoutes');
// const MongoConfig = require('./config/MongoConfig');
const { buildReponse } = require('./utils/ResponseBuilder');
const { RETURN_CODE } = require('./config/Enum');
// Main app
const app = express();

// Express configuration
// app.use(morgan('tiny'));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Main APIs
app.use(DefaultRoutes.BASE_URL, require('./routes'));

app.use(express.static(path.join(__dirname, '/public')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// / 404 Error
app.use((_req, res) => {
    const err = new Error('Not Found');

    err.status = 404;

    res.send('404 NOT FOUND');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );

    next();
});

// Error Handling Middleware
// eslint-disable-next-line max-params
app.use((err, req, res, next) => {
    res.json(buildReponse(RETURN_CODE.FAILURE, err.toString()));
    next();
});

const DEFAULT_PORT = 3000;
const server = app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log(`[PORT:${server.address().port}] Server is running...`);
});
