//console.log('entra en comment.js'); // control de paso de programa

// Definici�n el modelo de Comment con validaci�n
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Comment',
		{	texto:  { type: DataTypes.STRING, validate: {notEmpty: { msg: "-> Falta Comentario"} } }
		}
	);
}

//console.log('sale de comment.js'); // control de paso de programa
