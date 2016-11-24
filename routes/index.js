var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JADE-Bootstrap' });
});



router.get('/q', function(req, res, next) {
  pr = 	[
  		{
  			enunciado:"enunciado1 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de", 
  			respuesta: 
        [
          "respuesta 1 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de", 
          "distractor1.1 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de", 
          "distractor1.2 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de"
        ],
        explicaciones: [
          {
            texto: "explicacion 1.1 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2016",
            votos: 8
          },
          {
            texto: "explicacion 1.2 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2015",
            votos: 10
          },
          {
            texto: "explicacion 1.3 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2015",
            votos: 10
          },
          {
            texto: "explicacion 1.4 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2015",
            votos: 10
          }
          ]
      },
  		{
  			enunciado:"enunciado2", 
        respuesta: ["respuesta 2", "distractor2.1", "distractor2.2"],
        explicaciones: [
          {
            texto: "explicacion 2.1 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2016",
            votos: 8
          },
          {
            texto: "explicacion 2.2 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2015",
            votos: 10
          }]
      },
  		{
  			enunciado:"enunciado3", 
        respuesta: ["respuesta 3", "distractor3.1", "distractor3.2"],
        explicaciones: [
          {
            texto: "explicacion 3.1 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2016",
            votos: 8
          },
          {
            texto: "explicacion 3.2 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas  las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
            nombre: "Sara Fernandez",
            fecha: "2015",
            votos: 10
          }]
  		}];
  console.log(pr)
//  res.render('q2', { title: 'K-Cuestionario' });
  res.render('q3', pr);
});




router.get('/m', function(req, res, next) {

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
  
  var col3 = mongoose.model('col3', preguntaSchema);

  mongoose.connect('mongodb://localhost/migueldb');
    var db = mongoose.connection;
// para mongoose
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  // we're connected!
    console.log("hemos conectado");
    col3.find({'pId' : { $in: [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10]}}, '', function (err, person) {
      if (err) return handleError(err);
      console.log("consola1:", person.length);

      var pr = person;
      res.render('q3', {pr : pr});
    });
  });

 // console.log("pruebas con mongo");
 // res.render('sacaconsola', { cadena: 'Pruebas con mongo' });
});

module.exports = router;
