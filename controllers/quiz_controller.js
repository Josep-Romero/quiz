// control de paso de programa
//console.log('entra en quiz_controller.js');

// Importa el modelo para acceder a la BBDD
var models= require('../models/models.js');

// GET /quizes/question
//exports.question = function(req, res) {
//	models.Quiz.findAll().then(
//		function(quiz) {
//			res.render('quizes/question', {pregunta: quiz[0].pregunta})
//		}	
//	)
//};

// GET /quizes/answer
//exports.answer = function(req, res) {
//	models.Quiz.findAll().then(
//		function(quiz) {
//			if (req.query.respuesta.toUpperCase() === quiz[0].respuesta.toUpperCase()) {
//				res.render('quizes/answer', {respuesta: 'Correcto'});
//			} else {
//				res.render('quizes/answer', {respuesta: 'Incorrecto'});
//			}
//		}
//	)
//};

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes})
		}	
	)
};

// GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(
		function(quiz) {
			res.render('quizes/show', {quiz: quiz})
		}	
	)
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(
		function(quiz) {
			if (req.query.respuesta.toUpperCase() === quiz.respuesta.toUpperCase()) {
				res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
			} else {
				res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
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
