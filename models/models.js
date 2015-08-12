console.log('entra en models.js'); // control de paso de programa

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla Quiz en quiz.js
var Comment = sequelize.import(path.join(__dirname, 'comment'));

// Relacionar 1 Quiz con N Comment
Comment.belongsTo(Quiz, {onDelete: 'cascade'});
Quiz.hasMany(Comment, {onDelete: 'cascade'});

// exportar la definición de la tabla Quiz
exports.Quiz = Quiz; 

// exportar la definición de la tabla Comment
exports.Comment = Comment; 

// sequelize.sync() crea e inicializa la tabla de preguntas en la BBDD
sequelize.sync().then(
	function() {
		//console.log('inicio sync'); // control de paso de programa
		Quiz.count().then( //then(...) ejecuta el manejador una vez creada la tabla
			function (count) {
			// en función del número de filas de la tabla se añaden unas u otras filas, actualizando la tabla 
			// según el número de veces que se arranca la aplicación.
			// para cada pregunta a añadir se indican los pares "nombre columna": "valor columna"
				if (count===0) {
					console.log('La tabla Quiz esta vacía. Se procede a llenarla con la pregunta inicial'); // control de paso de programa
					Quiz.create({ tematica: 'Humanidades', pregunta: 'Capital de Italia',   respuesta:'Roma' })
						.then( function(){console.log('... tabla Quiz inicializada')} );
				} else if (count===1) {
					console.log('La tabla Quiz tiene 2 filas, se le añade la tercera'); // control de paso de programa
					Quiz.create({ tematica: 'Humanidades', pregunta: 'Capital de Portugal', respuesta:'Lisboa' })
						.then( function(){console.log('... tabla Quiz ampliada a 2 preguntas')} );
				} else if (count===2) {
					console.log('La tabla Quiz tiene 2 filas, se le añade la tercera'); // control de paso de programa
					Quiz.create({ tematica: 'Humanidades', pregunta: 'Capital de Inglaterra', respuesta:'Londres' })
						.then( function(){console.log('... tabla Quiz ampliada a 3 preguntas')} );
				} else {
					console.log('La tabla Quiz tiene datos. No se modifica.'); // control de paso de programa
					//Quiz.addcolumn(tematica:  { type: DataTypes.STRING, validate: {notEmpty: { msg: "-> Falta Temática"} } })
				};
			}
		);
	}
);

// control de paso de programa
console.log('sale de models.js');