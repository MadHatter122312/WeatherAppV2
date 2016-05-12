'use strict';

let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let app = express();

//.env
let dotenv = require('dotenv');
dotenv.load();

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/skycast')

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('mongoose connected');
})


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


let user = require('./controllers/usersController');
let weather = require('./controllers/weatherController');
let location = require('./controllers/locationsController');

app.use('/user', user);
app.use('/weather', weather);
app.use('/location', location);


app.use(express.static(path.join(__dirname, '/public')));

app.use('/scripts', express.static(__dirname + '/node_modules'));

let server = app.listen(process.env.PORT || 3000, () => {
  console.log('server running');
})
