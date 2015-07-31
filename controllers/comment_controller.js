// control de paso de programa
//console.log('entra en comment_controller.js');

// Importa el modelo para acceder a la BBDD
var models= require('../models/models.js');

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
				// Informa del error
				res.render('comments/new.ejs', {comment: comment, quizid: req.params.quizId, errors: err.errors});
			} else {
				// Guarda en la base de datos los campos comentario y pregunta a la que se asocia
				comment.save().then(function(){
					// redirecciona a HTTP (URL relativo) lista de preguntas
					res.redirect('/quizes/'+req.params.quizId)
				})
			}
		}
	).catch(function(error){next(error)});
};

// control de paso de programa
//console.log('sale de comment_controller.js');
