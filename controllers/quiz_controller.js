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

// Autoload Factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error) { next(error);} );
};

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes})
		}	
	).catch(function(error) { next(error);} );
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz})
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
console.log('entra en ANSWER');
	if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto'});
	}
};

// GET /quizes/author
exports.author = function(req, res) {
	res.render('author');
};

// control de paso de programa
//console.log('sale de quiz_controller.js');
