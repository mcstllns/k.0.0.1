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
	TemaId : String,
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
  
mongoose.model('col3', preguntaSchema);
mongoose.connect('mongodb://localhost/migueldb');
