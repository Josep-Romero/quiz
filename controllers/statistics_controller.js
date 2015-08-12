// control de paso de programa
console.log('entra en statistics_controller.js');

// Importa el modelo para acceder a la BBDD
var models = require('../models/models.js');

// GET /quizes/author
exports.statistics = function(req, res) {
	var est1= 0; // total preguntas
	var est2= 0; // total comentarios publicados
	var est3= 0; // media comentarios por pregunta
	var est4= 0; // preguntas sin comentarios
	var est5b= true; // auxiliar para calcular las preguntas con comentarios
	var est5= 0; // preguntas con comentarios
	var est6= 0; // total comentarios por publicar
	models.Quiz.findAll({
		include: [{model: models.Comment}]})
	.then(function (rows) {
		// a) número total de preguntas corresponde al número de filas recuperadas
		est1 = rows.length;
		for (i = 0; i < rows.length; i++) {
			if (rows[i].Comments.length === 0) {
				// b) preguntas sin ningún comentario
				est4 = est4 + 1;
			} else {
				// c) preguntas con comentarios. Atención: Pueden estar PUBLICADOS o no. 
				//    los comentarios no publicados se consoderan no existentes
				est5b = false;
				for (j = 0; j < rows[i].Comments.length; j++) {
					if (rows[i].Comments[j].publicado) {
						// acumula en comentarios publicados
						est2 = est2 + 1;
						est5b = true;
					} else {
						// acumula en comentarios pendientes publicar
						est6 = est6 + 1;
					}
				};
				// Verifica si se ha activado el indicador de 'comentarios publicados'
				if (est5b) {
					// c.1) Si hay 'algún' comentario publicado, acumula en "preguntas con comentarios"
					est5 = est5 + 1;
				} else {
					// c.1) Si no hay 'ningún' comentario publicado, acumula en "preguntas sin comentarios"
					est4 = est4 + 1;
				}
			}
		};
		// Calcula la media de comentarios (publicados) por pregunta
		est3 = (est2 / est1).toFixed(2);

		// Renderiza la página de estadísticas
		res.render('statistics', {est1: est1, est2: est2, est3: est3, est4: est4, est5: est5, est6: est6, errors: []});
	})
};

// control de paso de programa
console.log('sale de statistics_controller.js');
