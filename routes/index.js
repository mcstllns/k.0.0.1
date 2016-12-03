var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  var mongoose = require('mongoose');
  var colT = mongoose.model('tareas');
  colT.find({"visible" : 1} , '', function (err, tareas) {
    if (err) return handleError(err);
    //console.log('Tareas:', tareas.length);
    //var pr = tareas;
    res.render('index', {pr : tareas});
  });
});



router.get('/q', function(req, res, next) {
// vacio
});




router.post('/m', function(req, res, next) {
  var mongoose = require('mongoose');
  require('mongoose-query-random');
  console.log("bodypost",req.body.tId)
  var colT = mongoose.model('tareas');
  colT.find({"tId" : req.body.tId} , '', function (err, tarea) {
    if (err) return handleError(err);
    var colP = mongoose.model('preguntas');
    colP.find(JSON.parse(tarea[0].query)).random(tarea[0].nq, true, function (err, cuestionario) {
        if (err) return handleError(err);
        res.render('cuestionario', {pr : cuestionario, titulo : tarea[0].titulo, 
          subtitulo : tarea[0].subtitulo, quote : tarea[0].quote});
      });
  });
});

// ejemplo para una llamada a una lista concreta de preguntas
//colP.find({'pId' : { $in: [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10]}}, '', function (err, person) {

router.get('/manda', function(req, res){
  var mongoose = require('mongoose');
  var colP = mongoose.model('preguntas');

  var cad = 'Explicaciones.' + req.query.eId + '.Votos';
  var obj = {};
  obj[cad] = 1;

  colP.update({ 'pId': req.query.pId }, { $inc: obj }, function (err, result) {
    if (err) return handleError(err); 
    res.send("Ok");
  });


});

module.exports = router;
