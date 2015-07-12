//console.log('entra en models.js'); // control de paso de programa

var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
// exportar la definición de la tabla Quiz
exports.Quiz = Quiz; 

// sequelize.sync() crea e inicializa la tabla de preguntas en la BBDD
sequelize.sync().success(
	function() {
		//console.log('inicio sync'); // control de paso de programa
		Quiz.count().success( //success(...) ejecuta el manejador una vez creada la tabla
			function (count) {
				if (count===0) {
					console.log('La tabla Quiz esta vacía. Se procede a llenarla con la pregunta inicial'); // control de paso de programa
					Quiz.create( // a continuación se indican los pares "nombre columna": "valor columna"
						{	pregunta: 'Capital de Italia',
							respuesta: 'Roma'
						}
					)
					.success(
						function(){console.log('... tabla Quiz inicializada correctamente')}
					);
				} else {
					console.log('La tabla Quiz tiene datos. No se modifica.'); // control de paso de programa
				};
			}
		);
	}
);

// control de paso de programa
//console.log('sale de models.js');