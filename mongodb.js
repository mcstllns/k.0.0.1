// var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;

// var Comment = new Schema({
//     title : String,
// });

// mongoose.model('comments', Comment);

// mongoose.connect('mongodb://localhost/node-comment');

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
  
//mongoose.model('col3', preguntaSchema);
mongoose.model('preguntas', preguntaSchema);
mongoose.Promise = global.Promise;
//conexion local
//mongoose.connect('mongodb://localhost/migueldb');

// conexion con mongolab
mongoose.connect('mongodb://kuser:caoybnh4gMKLqRmgzxYj@ds163667.mlab.com:63667/kmongo');