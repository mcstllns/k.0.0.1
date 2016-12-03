// Este fichero controla en comportamiento en jquery de los cuestionarios
// -------------------------------------------------------------------

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function actualizaKex(i, obj, nid, length){
	$("#p_"+i+"_kex_texto").text(obj.Texto)
	$("#p_"+i+"_kex_votos").text(Math.abs(obj.Votos));
	$("#p_"+i+"_kex_nombre").text(obj.Nombre);
	$("#p_"+i+"_kex_fecha").text(obj.Fecha);
	$("#p_"+i+"_kex_nid").text(nid);
	$("#p_"+i+"_kex_ntotal").text(length);
};

// -------------------------------------------------------------------

$(document).ready(function(){

	// un array para controlar en que explicacion estamos
	var ctrExp = new Array(data.length);
	ctrExp.fill(0);

	// oculta las k explicaciones de los alumnos
	$("[id$=_kex_boton]").hide();

	// oculta los iconos de los radios
	$("[id*=_radio_icono_]").hide();

	// oculta los botones izquierdos de las explicaciones
	$('[id$=_bizq]').hide();

	// oculta el boton de volver
	$('#inicio').hide();

	
	// 	CREA LOS CONTENIDOS ---------------------------------------------
	$.each(data, function (i, pregunta){

			// enunciados de las preguntas
			$("#p_"+i+"_enunciado").text(pregunta.Pregunta);
			
			// alternativas de respuesta aleatorizadas
			var misufle = Shuffle([0, 1, 2]);
			//console.log(misufle);
			$.each(pregunta.Respuesta , function (j){
				$("#p_"+i+"_radio_value_"+j).val(misufle[j]);
				$("#p_"+i+"_radio_texto_"+j).text(pregunta.Respuesta[misufle[j]]);
			});


			// explicaciones de los alumnos ordenadas por numeros de votos

			// Se comprueba que al menos tenga una explicacion
			if(pregunta.Explicaciones.length > 0){
				pregunta.Explicaciones.sort(function(a, b){
					return b.Votos-a.Votos;
				})

				// se carga la 0 y luego se van cambiando dinamicamente
				actualizaKex(i, pregunta.Explicaciones[0], 1, pregunta.Explicaciones.length)
				$("#p_"+i+"_kex_n").text(pregunta.Explicaciones.length);

				// oculta el boton derecho si no tiene mas de una explicacion
				if( pregunta.Explicaciones.length < 2) $("#p_"+i+"_kex_bder").hide();

			} else {
				// Si no tiene ninguna explicacion creamos un objeto dummy
				var obj = [];
				obj["Texto"] = "Lo sentimos, todavía no hay explicaciones :-(";
				obj["Votos"] = 0;
				obj["Nombre"] = "---";
				obj["Fecha"] = "---";

				actualizaKex(i, obj, 0, 0);
				$("#p_"+i+"_kex_n").text(0);

				// oculta el boton derecho
				$("#p_"+i+"_kex_bder").hide();
				// oculta el corazon
				$("#p_"+i+"_kex_okicon").hide();

			}
	});

	// CONTROL AL RESPONDER  -----------------------------------------------------------
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


	// CORRECCION DEL CUESTIONARIO  ---------------------------------------------------------------
	// Se corrige el cuestionario
	$("#corregir").click(function(){
		// por ahora no se calculan aciertos y fallos
		// var naciertos = 0;
		// var nfallos = 0;

		// desaparecen cosas:
		$('[id$=iconW]').attr("style","color:transparent");  	//	El icono de write
		$('input:radio').hide();								//  Los radios
		$('.panel-collapse.in').collapse('hide');				//  Se colapsan todas las preguntas
		$('#corregir').hide();									//  El boton corregir

		// aparecen cosas:
		$("[id*=_radio_icono_]").show();						//	Los botones de K explicaciones
		$("[id$=_kex_boton]").show();							//	Los iconos de aciertos y fallos
		$(window).scrollTop(0);									//	La pagina se va al top
		$('#inicio').show();									//	El boton de inicio
/*		$("#textomodal").text(`En su cuestionario las alternativas
			de respuesta están aleatorizadas. En las explicaciones la respuesta correcta
			siempre se refiere como A por lo que no coincidirán. Use el valor dado en la explicación
			para su interpretación.
			`);													//  Un modal 
		$('#mimodal').modal('show');
*/
		// se corrige cada pregunta
		$.each(data, function (i){

			// Rval es el valor marcado, Rid el id del radio marcado y Cid es el id de la respuesta correcta
			var Rval = $('input[name=p_' +i+ '_radio]:checked').val();
			var Rid = $('input[name=p_' +i+ '_radio]:checked').attr('id');
			var Cid = $('input[name=p_' +i+ '_radio][value=0]').attr('id');

			//console.log(Rval, Rid, Cid);
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
				$('#p_'+i+'_panel').addClass('panel panel-danger');

			} else {
				// ACIERTO --------------------------------------
				//naciertos++;

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


	// CONTROL DE LAS EXPLICACIONES ---------------------------------------
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
			actualizaKex(i, data[i].Explicaciones[ctrExp[i]], ctrExp[i]+1, data[i].Explicaciones.length)
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
			actualizaKex(i, data[i].Explicaciones[ctrExp[i]], ctrExp[i]+1, data[i].Explicaciones.length)
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
		 		// console.log(data, status)
			    // $('#results').html(data);
			});
		}
	});

}); 

