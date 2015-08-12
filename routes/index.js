console.log('entra en index.js'); // control de paso de programa

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId o :commentId
router.param('quizId', quizController.load);		// con :quizId
router.param('commentId', commentController.load);	// con :commentId

// Definición de rutas de sesión
router.get('/login', sessionController.new); // presentar el formulario login
router.post('/login', sessionController.create); // crear la sesión
router.get('/logout', sessionController.destroy); // destruir la sesión

// Definición de rutas de Quizes
router.get('/quizes', quizController.filterquestions);												// presentar la lista de preguntas según el filtro guardado
router.get('/quizes/all', quizController.allquestions);												// presentar la lista de TODAS las presentas
router.get('/quizes/filter', quizController.filter, quizController.filterquestions);				// actualizar el filtro de preguntas y presentar la lista de preguntas según éste
router.get('/quizes/:quizId(\\d+)', quizController.show);											// presentar el formulario PREGUNTA
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);									// presentar el resultado de validar la respuesta
router.get('/quizes/new', sessionController.loginRequired, quizController.new);						// presentar el formulario de alta de preguntas
router.post('/quizes/create', sessionController.loginRequired, quizController.create);				// INSERTAR la pregunta en BBDD y volver a la lista de preguntas
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);		// presentar el formulario de modificación de preguntas
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);		// ACTUALIZAR la pregunta y volver a la lista de preguntas
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);	// BORRAR la pregunta y volver a la lista de preguntas

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/delete', sessionController.loginRequired, commentController.destroy);

// Definición de rutas de créditos
router.get('/quizes/author', quizController.author);

// Definición de rutas de estadísticas
router.get('/quizes/statistics', statisticsController.statistics);

module.exports = router;

console.log('sale de index.js'); // control de paso de programa
