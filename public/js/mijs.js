// Este fichero controla en comportamiento en jquery de los cuestionarios
// -------------------------------------------------------------------

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

// -------------------------------------------------------------------

$(document).ready(function(){
	console.log(data);
	console.log(data.length);
	// un array para controlar en que explicacion estamos
	var ctrExp = new Array(data.length);
	ctrExp.fill(0);
//	console.log(ctrExp.length, ctrExp[2])

	// oculta las k explicaciones de los alumnos
	$("[id$=_kex_boton]").hide();

	// oculta los iconos de los radios
	$("[id*=_radio_icono_]").hide();


	// oculta los botones izquierdos de las explicaciones
	$('[id$=_bizq]').hide();

	// Esta parte carga los contenidos
	$.each(data, function (i, pregunta){

			// enunciados de las preguntas
			$("#p_"+i+"_enunciado").text(pregunta.Pregunta);
			
			// alternativas de respuesta aleatorizadas
			var misufle = Shuffle([0, 1, 2]);
			console.log(misufle);
			$.each(pregunta.Respuesta , function (j){
				$("#p_"+i+"_radio_value_"+j).val(misufle[j]);
				$("#p_"+i+"_radio_texto_"+j).text(pregunta.Respuesta[misufle[j]]);
			});


			// explicaciones de los alumnos
			// se ordenan por numero de votos

			// Se comprueba que al menos tenga una explicacion
			if(pregunta.Explicaciones.length > 0){
				pregunta.Explicaciones.sort(function(a, b){ // sort object by age field
					return b.Votos-a.Votos;
				})


				// se carga la 0 y luego se van cambiando dinamicamente
				$("#p_"+i+"_kex_texto").text(pregunta.Explicaciones[0].Texto)
				$("#p_"+i+"_kex_votos").text(pregunta.Explicaciones[0].Votos);
				$("#p_"+i+"_kex_nombre").text(pregunta.Explicaciones[0].Nombre);
				$("#p_"+i+"_kex_fecha").text(pregunta.Explicaciones[0].Fecha);
				$("#p_"+i+"_kex_nid").text("1");
				$("#p_"+i+"_kex_ntotal").text(pregunta.Explicaciones.length);
				$("#p_"+i+"_kex_n").text(pregunta.Explicaciones.length);

				// oculta el boton derecho si no tiene mas de una explicacion
				if( pregunta.Explicaciones.length < 2) $("#p_"+i+"_kex_bder").hide();
			} else {
				$("#p_"+i+"_kex_texto").text("Lo sentimos, todavía no hay explicaciones")
				$("#p_"+i+"_kex_votos").text("0");
				$("#p_"+i+"_kex_nombre").text("undefined");
				$("#p_"+i+"_kex_fecha").text("undefined");
				$("#p_"+i+"_kex_nid").text("undefined");
				$("#p_"+i+"_kex_ntotal").text("undefined");
				$("#p_"+i+"_kex_n").text("0");
				$("#p_"+i+"_kex_bder").hide();
			}
	});





	// al elegir una opcion el icono de "editado" se hace visible
	$('input:radio').change(function(){
		var cad = $(this).attr('name').replace("_radio","_iconW")
		$('#'+cad).attr("style","color:white");
	});

	// al pinchar en el icono "editado" se elimina la eleccion y el icono desaparece
	$('[id$=iconW]').click(function(){
		$(this).attr("style","color:transparent");
		var cad = $(this).attr('id').replace("_iconW","_radio_value_");
		$('[id^='+cad+']').attr('checked', false);
	});


	// Se corrige el cuestionario
	$("#corregir").click(function(){
		// por ahora no se calculan aciertos y fallos
		// var naciertos = 0;
		// var nfallos = 0;

		// desaparecen cosas:
		//		El icono de write
		// 		los radios
		//		se colapsan todas las preguntas
		//		el boton corregir
		$('[id$=iconW]').attr("style","color:transparent");
		$('input:radio').hide();
		$('.panel-collapse.in').collapse('hide');
		$('#corregir').hide();

		// aparecen cosas:
		//		Los botones de K explicaciones
		//		Los iconos de aciertos y fallos
		//		La pagina se va al top
		$("[id*=_radio_icono_]").show();
		$("[id$=_kex_boton]").show();
		$(window).scrollTop(0);


		// se corrige cada pregunta
		$.each(data, function (i){

			// Rval es el valor marcado, Rid el id del radio marcado y Cid es el id de la respuesta
			// correcta
			var Rval = $('input[name=p_' +i+ '_radio]:checked').val();
			var Rid = $('input[name=p_' +i+ '_radio]:checked').attr('id');
			var Cid = $('input[name=p_' +i+ '_radio][value=0]').attr('id');

			console.log(Rval, Rid, Cid);
			if ( !Rval ) {
				// OMISION --------------------------------------------
				// se marca la respuesta correcta
				var cad = '#'+Cid.replace('_value','_icono');
				$(cad).removeAttr("style");	
				$(cad).removeClass('glyphicon glyphicon-thumbs-up');
				$(cad).addClass('glyphicon glyphicon-hand-right text-primary');

				$('#p_'+i+'_panel').removeClass('panel panel-primary');
				$('#p_'+i+'_panel').addClass('panel panel-default')



			} else if (Rval!=0) {
				
				// FALLO ---------------------------------
				
				//nfallos++;
				//console.log("es un fallo");

				// se marca la respuesta correcta
				var cad = '#'+Cid.replace('_value','_icono');
				$(cad).removeAttr("style");	
				$(cad).removeClass('glyphicon glyphicon-thumbs-up');
				$(cad).addClass('glyphicon glyphicon-hand-right text-primary');

				// se marca la respuesta del sujeto con rojo
				var cad = '#'+Rid.replace('_value','_icono');
				$(cad).removeAttr("style");	
				$(cad).removeClass('glyphicon glyphicon-thumbs-up ');
				$(cad).addClass('glyphicon glyphicon-remove text-danger');

				// se cambia el color del panel
				$('#p_'+i+'_panel').removeClass('panel panel-primary');
				$('#p_'+i+'_panel').addClass('panel panel-danger')
				// $('#p_'+i+'_head').css("background", "#FF5A51");

			} else {
				// ACIERTO --------------------------------------
				//naciertos++;
				//console.log("es un acierto");

				// se marca la respuesta correcta con un simbolo
				var cad = '#'+Rid.replace('_value','_icono');
				$(cad).removeAttr("style");	
				$(cad).removeClass('glyphicon glyphicon-thumbs-up');
				$(cad).addClass('glyphicon glyphicon-ok text-success');
				
				$('#p_'+i+'_panel').removeClass('panel panel-primary');
				$('#p_'+i+'_panel').addClass('panel panel-success')
			}
		});

	});


	// Control de las explicaciones ---------------------------------------
	// botones que controlan las explicaciones
	$('[id$=_bder]').click(function(){
		var i = $(this).attr('id');
		i = i.substring(2, i.indexOf("_kex_bder"));
		i = parseInt(i);

		ctrExp[i]++;
		// control de boton izquiero y derecho
		console.log(ctrExp[i],data[i].Explicaciones.length-1);
		$("#p_"+i+"_kex_bizq").show();
		if (ctrExp[i] == data[i].Explicaciones.length-1){
			$("#p_"+i+"_kex_bder").hide();
		}
		if (ctrExp[i]<data[i].Explicaciones.length){
			console.log(ctrExp[i]);
			$("#p_"+i+"_kex_texto").text(data[i].Explicaciones[ctrExp[i]].Texto)
			$("#p_"+i+"_kex_votos").text(Math.abs(data[i].Explicaciones[ctrExp[i]].Votos));
			$("#p_"+i+"_kex_nombre").text(data[i].Explicaciones[ctrExp[i]].Nombre);
			$("#p_"+i+"_kex_fecha").text(data[i].Explicaciones[ctrExp[i]].Fecha);
			$("#p_"+i+"_kex_nid").text(ctrExp[i]+1);
			$("#p_"+i+"_kex_ntotal").text(data[i].Explicaciones.length);
		}	
	});

	$('[id$=_bizq]').click(function(){
		var i = $(this).attr('id');
		i = i.substring(2, i.indexOf("_kex_bizq"));
		i = parseInt(i);

		ctrExp[i]--;
		// control de boton izquiero y derecho
		console.log(ctrExp[i],data[i].Explicaciones.length);
		$("#p_"+i+"_kex_bder").show();
		if (ctrExp[i] == 0){
			$("#p_"+i+"_kex_bizq").hide();
		}
		if (ctrExp[i]>=0){
			console.log(ctrExp[i]);
			$("#p_"+i+"_kex_texto").text(data[i].Explicaciones[ctrExp[i]].Texto)
			$("#p_"+i+"_kex_votos").text(Math.abs(data[i].Explicaciones[ctrExp[i]].Votos));
			$("#p_"+i+"_kex_nombre").text(data[i].Explicaciones[ctrExp[i]].Nombre);
			$("#p_"+i+"_kex_fecha").text(data[i].Explicaciones[ctrExp[i]].Fecha);
			$("#p_"+i+"_kex_nid").text(ctrExp[i]+1);
			$("#p_"+i+"_kex_ntotal").text(data[i].Explicaciones.length);
		}	
	});

	// el boton de me gusta
	$('[id$=_kex_okicon]').click(function(){
		var i = $(this).attr('id');
		i = i.substring(2, i.indexOf("_kex_okicon"));
		i = parseInt(i);

		if( data[i].Explicaciones[ctrExp[i]].Votos < 0){
			$("#textomodal").text("Tú no has votado ya aquí?");
			$('#mimodal').modal('show');
		} else {
			data[i].Explicaciones[ctrExp[i]].Votos++;
			data[i].Explicaciones[ctrExp[i]].Votos*=-1;
			$("#p_"+i+"_kex_votos").text(Math.abs(data[i].Explicaciones[ctrExp[i]].Votos));
			// aqui mandarlo al servidor
			var parameters = { pId: data[i].pId, eId: data[i].Explicaciones[ctrExp[i]].eId };
		 	$.get( '/manda', parameters, function(data, status) {
		 		console.log(data, status)
			    // $('#results').html(data);
			});
		}
	});

	$("#enviar").click(function(){
		var parameters = { pId: 1, eId: 0 };
	 	$.get( '/manda', parameters, function(data, status) {
	 		console.log(data, status)
		    // $('#results').html(data);
		});
	});

}); 

