//console.log('entra en quiz.js'); // control de paso de programa

// Definici�n el modelo de Quiz
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{	pregunta: DataTypes.STRING,
			respuesta: DataTypes.STRING
		}
	);
}

//console.log('sale de quiz.js'); // control de paso de programa
