
// const express = require('express');
import express from 'express';

// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
// cac tham so query, params

// const viewEngine = require('./config/viewEngine');
import viewEngine from './config/viewEngine';
// const initWebRoutes = require('./route/web');
import initWebRoutes from './route/web';

import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors({ origin: true }));
app.use(cors({ credentials: true, origin: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 9090;

app.listen(port, async () => {
    console.log(`App listen at http://localhost:${port}`);
})
