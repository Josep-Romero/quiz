var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('Quiz2015'));
app.use(session({ secret: 'Quiz2015', resave: false, saveUninitialized: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Helpers dinamicos
app.use(function(req, res, next) {
	// Inicializa req.session.redir para que no de error en caso que la primera transacción sea LOGIN
	req.session.redir = req.session.redir||'/';
	// guardat path en req.session.redir para después de login o logout
	if (req.method === 'GET' && !req.path.match(/\/login|\/logout/)) {
		req.session.redir = req.path;
	}
	// Hacer visible req.session en las vistas
	res.locals.session = req.session;
	next();
});

// Ver si session ha caducado
app.use(function(req, res, next) {
	// Captura la hora actual
	timestamp = new Date();
	// Verifica si hay una sesión activa
	if (req.session.user) {
		// En caso afirmativo, verifica si ha superado el tiempo límite sin operar
		if (timestamp.getTime() > req.session.timeConnect['timeConnect'] + 30000) {
			// En caso afirmativo, destruye la sesión
			console.log('sesion caducada ' + timestamp.getTime() + '/' + req.session.timeConnect['timeConnect'] + ', se destruyen las variables de sesión');
			delete req.session.user;
			delete req.session.timeConnect;
			req.session.errors = [{"message": 'La sesión ha expirado'}];
			next();
		} else {
			// Si no ha superado el tiempo límite sin operar, actualiza la hora de la última transacción
			console.log('sesion activa ' + timestamp.getTime() + '/' + req.session.timeConnect['timeConnect'] + ', se refresca timeConnect');
			req.session.timeConnect = {timeConnect:timestamp.getTime()};
			next();
		}
	} else {
		// Si no hay una sesión activa, no hace nada
		console.log('sin sesion ' + timestamp.getTime());
		next();
	};
});

// MW de comprobación. No es operativo, se ha usado para hacer un seguimiento de la lógica del proceso
app.use(function(req, res, next) {
	console.log('\ndespues de SESION y antes de ROUTES');
    next();
});

// Enrutamiento de las páginas
app.use('/', routes);

// MW de comprobación. No es operativo, se ha usado para hacer un seguimiento de la lógica del proceso
app.use(function(req, res, next) {
	console.log('\ndespues de ROUTES');
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log('\nerror 404');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
		console.log('\nver status en desarrollo');
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
			errors: []
        });
    });
}

// production error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
	console.log('\nver status en producción');
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
		errors: []
    });
});

module.exports = app;
