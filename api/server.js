const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(session({
    name: 'cessaion',
    secret: 'Never go against a Sicilian when DEATH is on the line!',
    cookie: {
        maxAge:  90 *1000,
        secure: false, // changed to true if in production
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false, //set to false, will later be dynamically changed. GDPR laws
}));


server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
