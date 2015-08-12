// control de paso de programa
console.log('entra en comment_controller.js');

// Importa el modelo para acceder a la BBDD
var models= require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
	models.Comment.find({where: {id: Number(commentId)}} )
	.then(function(comment){
		if (comment) {
			req.comment = comment;
			next();
		} else {
			next(new Error('No existe commentId=' + commentId))
		}})
	.catch(function(error){next(error)});
};

// GET /quizes/:id/comments/new
exports.new = function(req, res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: [] })
};

// POST /quizes/:id/comments
exports.create = function(req, res) {
	// crea objeto Comment
	var comment = models.Comment.build( { 
		texto: req.body.comment.texto,
		QuizId: req.params.quizId 
	} );
	// se valida el objeto comment
	comment.validate().then(
		function(err) {
			if (err) {
				// Informa del error de datos del formulario
				res.render('comments/new.ejs', {quizid: req.params.quizId, errors: err.errors});
			} else {
				// Guarda en la base de datos los campos comentario y pregunta a la que se asocia
				comment.save().then(function(){
					// redirecciona a HTTP (URL relativo) lista de preguntas
					res.redirect('/quizes/' + req.params.quizId)
				})
			}
		}
	).catch(function(error){next(error)});
};

// DELETE /quizes/:quizId/comments/:commentId/desrroy
exports.destroy = function(req, res) {
	req.comment.destroy()
		.then(function() {res.redirect('/quizes/' + req.params.quizId); })
		.catch(function(error) {next(error)} );
};

// GET /quizes/:quizId/comments/:commentId/publish
exports.publish = function(req, res) {
	req.comment.publicado = true;
	req.comment.save( {fields: ["publicado"]} )
		.then(function(){ res.redirect('/quizes/' + req.params.quizId); })
		.catch(function(error){next(error)});
};

// control de paso de programa
console.log('sale de comment_controller.js');
