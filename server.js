var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var api = express.Router();

var port = process.env.PORT || 8080;

var configDB = require('./server/config/database');
mongoose.connect(configDB.url, function(err, res) {
	if(err){
		console.log('Nao foi possivel conectar a:' + configDB.url + ' com o erro: ' + err);
	}else{
		console.log('Conectado a ' + configDB.url);
	}
});

require('./server/config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({secret: 'anystringoftext', saveUninitialized: true, resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'public', 'site'));

app.use(express.static(path.resolve(__dirname, 'public')));

// Site
app.get('/', function(req, res){
	res.render('./index.ejs', { message: req.flash('loginMessage'), message: req.flash('signupMessage') });
});

// App
require('./server/routes/app')(api);
app.use('/', api);

// API
require('./server/routes/api')(api, passport);
app.use('/api', api);

// Handle 404
app.use(function(req, res) {
	res.send('404: Page not Found', 404);
});

// Handle 500
app.use(function(error, req, res, next) {
	res.send('500: Internal Server Error', 500);
});

app.listen(port, function(){
	console.log('Rodando em ' + port);
});