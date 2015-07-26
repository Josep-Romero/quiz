//console.log('entra en quiz.js'); // control de paso de programa

// Definición el modelo de Quiz
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{	pregunta:  { type: DataTypes.STRING, validate: {notEmpty: { msg: "-> Falta Pregunta"} } },
			respuesta: { type: DataTypes.STRING, validate: {notEmpty: { msg: "-> Falta Respuesta"} } }
		}
	);
}

//console.log('sale de quiz.js'); // control de paso de programa
