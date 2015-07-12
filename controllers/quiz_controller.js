// control de paso de programa
//console.log('entra en quiz_controller.js');

// Importa el modelo para acceder a la BBDD
var models= require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().success(
		function(quiz) {
			res.render('quizes/question', {pregunta: quiz[0].pregunta})
		}	
	)
};

// GET /quizes/answer
exports.answer = function(req, res) {
	models.Quiz.findAll().success(
		function(quiz) {
			if (req.query.respuesta.toUpperCase() === quiz[0].respuesta.toUpperCase()) {
				res.render('quizes/answer', {respuesta: 'Correcto'});
			} else {
				res.render('quizes/answer', {respuesta: 'Incorrecto'});
			}
		}
	)
};

// GET /quizes/author
exports.author = function(req, res) {
	res.render('author');
};

// control de paso de programa
//console.log('sale de quiz_controller.js');
