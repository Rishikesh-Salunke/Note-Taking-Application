var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./models/model")
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes.routes')
const loginRouter = require('./routes/login.routes')
const student = require('./controllers/user.controller')
const middleware = require('./middleware/jwt.middleware');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.sequelize.sync({});
app.use('/auth', loginRouter);
app.use('/users',notesRouter)


module.exports = app;