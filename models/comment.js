console.log('entra en comment.js'); // control de paso de programa

// Definición del modelo de Comment con validación
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Comment', {
		texto:  { type: DataTypes.STRING, validate: {notEmpty: { msg: "-> Falta Comentario"} } },
		publicado:  { type: DataTypes.BOOLEAN, defaultValue: false }
	} );
}

console.log('sale de comment.js'); // control de paso de programa
