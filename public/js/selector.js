// javascript que controla que tarea se va a ejecutar.
// se envia con post para mas seguridad
// utiliza una libreria llamada jquery.redirect.js de https://github.com/mgalante/jquery.redirect

// -------------------------------------------------------------------

$(document).ready(function(){
	$('[id=boton]').click(function(){
		$.redirect("/m", { tId: $(this).attr('tid')}); 
	});
});

