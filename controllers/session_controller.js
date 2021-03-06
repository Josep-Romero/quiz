// control de paso de programa
console.log('entra en session_controller.js');

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};


// Get /login   -- Presentar el formulario de login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
    res.render('sessions/new', {errors: errors});
};


// POST /login   -- Crear la sesión si el usuario se autentica
exports.create = function(req, res) {
    var login     = req.body.login;
    var password  = req.body.password;
    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {
        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
            res.redirect("/login");        
            return;
        }
		timestamp = new Date();
        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};
        req.session.timeConnect = {timeConnect:timestamp.getTime()};
		// redirección al path anterior a login
        res.redirect(req.session.redir.toString());
    });
};


// DELETE /logout   -- Destruir sesión 
exports.destroy = function(req, res) {
    delete req.session.user;
    delete req.session.timeConnect;
    res.redirect(req.session.redir.toString()); // redirect al path anterior a login
};


// control de paso de programa
console.log('sale de session_controller.js');
