function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};




$(document).ready(function(){
	console.log(data);
	console.log(data.length);
	// un array para controlar en que explicacion estamos
	var ctrExp = new Array(data.length);
	ctrExp.fill(0);
//	console.log(ctrExp.length, ctrExp[2])

	// oculta lascd k explicaciones de los alumnos
	$("[id$=_kex_boton]").hide();
	$("[id*=_radio_icono_]").hide();

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
			// se carga la 0 y luego se van cambiando dinamicamente
			$("#p_"+i+"_kex_texto").text(pregunta.Explicaciones[0].Texto)
			$("#p_"+i+"_kex_votos").text(pregunta.Explicaciones[0].Votos);
			$("#p_"+i+"_kex_nombre").text(pregunta.Explicaciones[0].Nombre);
			$("#p_"+i+"_kex_fecha").text(pregunta.Explicaciones[0].Fecha);
			$("#p_"+i+"_kex_nid").text("1");
			$("#p_"+i+"_kex_ntotal").text(pregunta.Explicaciones.length);
			$("#p_"+i+"_kex_n").text(pregunta.Explicaciones.length);
	});

	// oculta los botones izquierdos de las explicaciones
	$('[id$=_bizq]').hide();

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



	// al corregir el cuestionario
	$("#miboton").click(function(){
		var naciertos = 0;
		var nfallos = 0;

		$('[id$=iconW]').attr("style","color:transparent");
		$('input:radio').hide();
		$("[id*=_radio_icono_]").show();
		$('.panel-collapse.in').collapse('hide');
		$("[id$=_kex_boton]").show();
		$(window).scrollTop(0);
		$.each(data, function (i){

			var Rval = $('input[name=p_' +i+ '_radio]:checked').val();
			var Rid = $('input[name=p_' +i+ '_radio]:checked').attr('id');
			var Cid = $('input[name=p_' +i+ '_radio][value=0]').attr('id');

			console.log(Rval, Rid, Cid);
			if ( !Rval ) {
				// no hay respuesta
				// se marca la respuesta correcta
				var cad = '#'+Cid.replace('_value','_icono');
				$(cad).removeAttr("style");	
				$(cad).removeClass('glyphicon glyphicon-thumbs-up');
				$(cad).addClass('glyphicon glyphicon-hand-right text-primary');

				$('#p_'+i+'_panel').removeClass('panel panel-primary');
				$('#p_'+i+'_panel').addClass('panel panel-default')



			} else if (Rval!=0) {
				// es un fallo
				nfallos++;
				console.log("es un fallo");

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
				// es un acierto
				naciertos++;
				console.log("es un acierto");
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
			// $("#p_"+i+"_kex_votos").attr("id","desactivado")
		}
	});

}); 




//		console.log($('input[name^="p_0"]').is(':checked'));
//		console.log($('input[name=p_0_radio]:checked').val());
/*		$.each(data, function (i, pregunta){
			


			console.log("pregunta nueva");
			$('input[name^="p_0"]').each(function (index) {
				console.log(index, $(this).is(':checked'));
			});

		});
*/

/*		$('input[name^="p_"]').each(function (index) {
			if($(this).attr('value')==0){
				naciertos++;
				console.log("aciert0", $(this).attr('id'));
			} else {
				nfallos--;
				console.log("fall0", $(this).attr('id'));
			}
			console.log(index, $(this).attr('name'), $(this).attr('value'),
				$(this).is(':checked'));

		});	*/
	




/*	$("#miboton").click(function(){
    	 $.each(data, function (i, pregunta){
   			$("#p_"+i+"_enunciado").text(pregunta.enunciado);
   			var misufle = Shuffle([0, 1, 2]);
   			console.log(misufle);
  			$.each(pregunta.respuesta , function (j){
  				$("#p_"+i+"_radio_value_"+j).val(misufle[j]);
  				$("#p_"+i+"_radio_texto_"+j).text(pregunta.respuesta[misufle[j]]);
  			});

    	 });
  	});*/

	//$("[id$=_iconW]").hide();
	//$("[id$=_kex_boton]").hide();

	// });
	//$("#p_0_iconW").hide();

	//$("[id$=_ricono]").hide();
	//$("#p_0_1_ricono").show();
	// $("#p_0_1_ricono").attr("style","color:red");
	
	// console.log(data.length);
	// $.each(data , function (index, value){
	// 	$('#p_' + index + '_iconW').hide();
 
 //  	});


// 	console.log(pr[0].enunciado);
//  	$('input:radio').click(function() { 
 		
//  		var iconName = "p_" + $(this).attr('name').substring(2,$(this).attr('name').length)
//  						+ "_iconW";
// //		alert(iconName);
// 		var foo = '#' + iconName;
// 		console.log(iconName, foo);

// 		$('#' + iconName).hide();

// 	});






//   $("button").click(function(){
//      console.log("hace click");
//     $("#hitem1").css("background-color", "yellow");       
//   });
//  $('input[type=radio][name=optradio]').change(function() {
//		$("#mi_icono").attr("class", "glyphicon glyphicon-thumbs-down text-success");
//   });