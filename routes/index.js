console.log('entra en index.js'); // control de paso de programa

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId

console.log('llama a autoload de quiz'); // control de paso de programa
router.param('quizId', quizController.load);		// con :quizId

console.log('llama a autoload de comment'); // control de paso de programa
router.param('commentId', commentController.load);	// con :commentId

console.log('... seguimos'); // control de paso de programa


// Definición de rutas de sesión
router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definición de rutas de Quizes
router.get('/quizes', quizController.index);
router.get('/quizes/filter', quizController.filter, quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/delete', sessionController.loginRequired, commentController.destroy);

// Definición de rutas de créditos
router.get('/quizes/author', quizController.author);

module.exports = router;

console.log('sale de index.js'); // control de paso de programa
