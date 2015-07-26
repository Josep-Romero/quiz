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
			res.render('quizes/index.ejs', {quizes: quizes, errors: [] })
		}	
	).catch(
		function(error) { next(error);} 
	);
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: [] })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', errors: [] });
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', errors: [] });
	}
};

// GET /quizes/new
exports.new = function(req, res) {
	// crea objeto Quiz
	var quiz = models.Quiz.build( {pregunta:"", respuesta:""} );
	res.render('quizes/new', {quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function(req, res) {
	// crea objeto Quiz
	var quiz = models.Quiz.build( req.body.quiz );
	// se valida el objeto quiz
	quiz.validate().then(
		function(err) {
			if (err) {
				// Informa del error
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				// Guarda en la base de datos los campos pregunta y respuesta de quiz
				quiz.save( {fields: ["pregunta", "respuesta"] } ).then(function(){
					// redirecciona a HTTP (URL relativo) lista de preguntas
					res.redirect('/quizes');
				})
			}
		}
	);
};

// GET /quizes/author
exports.author = function(req, res) {
	res.render('author', {errors: []});
};

// control de paso de programa
//console.log('sale de quiz_controller.js');
