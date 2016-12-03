// preparacion de la base mongo, en local o en mlab

// fichero de configuracion y contraseñas
var config = require('./../config/k.config')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var preguntaSchema = new Schema({
	pId    : Number,
	TemaId : Number,
	TemaTitulo: String,
	Año    : String,
	Pregunta: String,
	Respuesta : [],
	Explicaciones : [{
	  eId: Number,
	  Apellido : String,
	  Nombre : String,
	  Email : String,
	  Fecha : String,
	  Texto : String,
	  Votos : Number
	}]
});
  
var tareaSchema = new Schema({
	tId : Number,
	titulo : String,
	subtitulo : String,
	quote : String,
	nq : Number,
	aleatorio : Number,
	visible : Number,
	enabled : Number,
	query : String
});	

mongoose.model('preguntas', preguntaSchema);
mongoose.model('tareas', tareaSchema);
mongoose.Promise = global.Promise;

//conexion local
mongoose.connect('mongodb://localhost/kmongo');

// conexion con mongolab
//mongoose.connect(config.mLabUrl);
