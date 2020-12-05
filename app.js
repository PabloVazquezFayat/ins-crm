require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const connectToDataBase = require('./utility/database');
const cors = require('cors');

// routers
const accountRouter = require('./routes/account-routes');
const assetRouter = require('./routes/asset-routes');
const userRouter = require('./routes/user-routes');
const clientRouter = require('./routes/client-routes');
const claimRouter = require('./routes/claim-routes');
const noteRouter = require('./routes/note-routes');
const policyRouter = require('./routes/policy-routes');

const app = express();

//connect to database
connectToDataBase();

//middlewares
app.use(cors('*'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', accountRouter);
app.use('/', assetRouter);
app.use('/', userRouter);
app.use('/', clientRouter);
app.use('/', claimRouter);
app.use('/', noteRouter);
app.use('/', policyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send error message
    res.status(err.status || 500).json({message: err.status, errors: err});
});

module.exports = app;
