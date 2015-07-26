// control de paso de programa
//console.log('entra en quiz_controller.js');

// Importa el modelo para acceder a la BBDD
var models= require('../models/models.js');

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
	).catch(
		function(error) { next(error);} 
	);
};

// GET /quizes
exports.index = function(req, res) {
	// Se prepara la cadena de caracteres del texto a buscar, 
	// - con caracteres '%' al principio y al final
	// - sustituyendo los espacios por '%'
	// Si no se recibe el parámetro search se asume una cadena vacía, con lo que se mostrará la lista con todas las preguntas.
	textoABuscar = '%'+(req.query.search||'').replace(/ /g, '%')+'%';
	models.Quiz.findAll(
		{ where: {pregunta: {like: textoABuscar}}, order: ['pregunta'] }
//		{ where: {pregunta: {like: textoABuscar}} }
	).then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes})
		}	
	).catch(
		function(error) { next(error);} 
	);
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz})
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto'});
	}
};

// GET /quizes/new
exports.new = function(req, res) {
	// crea objeto Quiz
	var quiz = models.Quiz.build( {pregunta:"Pregunta", respuesta:"Respuesta"} );
	res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
	// crea objeto Quiz
	var quiz = models.Quiz.build( req.body.quiz );
	// guarda en BBDD los campos pregunta y respuesta de quiz
	quiz.save( {fields: ["pregunta", "respuesta"] } ).then(function(){
		// redirecciona a HTTP (URL relativo) lista de preguntas
		res.redirect('/quizes');
	})
};

// GET /quizes/author
exports.author = function(req, res) {
	res.render('author');
};

// control de paso de programa
//console.log('sale de quiz_controller.js');
