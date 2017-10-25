var regForm= document.querySelector("#regForm");

regForm.addEventListener("submit", function(e){
		e.preventDefault();
		var regNombre=document.querySelector("#regNombre").value;
		var regApellido=document.querySelector("#regApellido").value;
		var regCorreo=document.querySelector("#regCorreo").value;
		var regPass1=document.querySelector("#regPass1").value;
		var regPass2=document.querySelector("#regPass2").value;
		var fechaNa=document.querySelector("#fechaNa").value;
		var regMasculino=document.querySelector("#regMasculino").value;
		var regFemenino=document.querySelector("#regFemenino").value;

		validarRegForm(regNombre, regApellido, regCorreo, regPass1, regPass2, fechaNa, regMasculino, regFemenino);

})

function validarRegForm(nombre, apellido, correo, password1, password2, fecha, genero1, genero2){
	if(validarText(nombre)&&
		validarText(apellido)&&
		validarCorreo(correo)&&
		validarClave(password1)&&
		compararClave(password1,password2)&&
		valGenero(document.regForm.genero)&&
		valFecha(fecha)){

		alert("Se ha registrado con exito");
		window.location="index.html";
	}else{
		return alert("Hay errores en los siguientes campos");
	}
}

function valGenero(radio){
	var seleccionado=false;
	for (var i=0; i<2; i++){
		if(radio[i].checked){
			var seleccionado=true;
		}
	}
	if (seleccionado) {
		return true;
	} else{
		alertify.error("Escoja un Genero", 2);
		return false;
		
	}
}


function validarText(texto){
	
	if(texto===''){
			alertify.error("Ingrese Texto",2)
			return false;
	}else{
		var re= /^[a-z]*$/i;
		if(!re.test(texto)){
			alertify.error("Solo Letras",2)
			return false;
		}else{
			alertify.success("Texto Ingresado con Exito", 1);
			return true;
		}	
	}
}

function validarCorreo(correo){
	var atSearch=(correo).indexOf("@");
	if(atSearch ==-1){
		alertify.error("El correo requiere un arroba (@)",2);
		return false;
	} else if (atSearch == 0){
		alertify.error("Es necesario texto antes del arroba",2);
		return false;
	}else if(atSearch == (correo.length)-1){
		alertify.error("Es necesario texto despues del arroba",2);
		return false;
	}else{
		alertify.success("Correo Ingresado existosamente", 1);
		return true;
	}
}

function compararClave(clave1, clave2){
	if(clave1 != clave2){
		alertify.error("Las claves no coinciden",2);
		return false;
	}else{
		alertify.success("Claves estan chidas", 1);
		return true;
	}
}

function validarClave(clave){
	if(clave===''){
		alertify.error("La clave debe tener contenido", 1);
		return false;
	}else{
		var re=/^[A-Za-z]\w{7,14}$/
		if(!re.test(clave)){
			alertify.error("Su clave debe tener entre 7 a 14 caracteres y contener caracteres alfanumericos.", 1)
			return false;
		}else{
			return true;
		}
	}
}

function valFecha(date){

	if(date===''){
		alertify.error("Ingrese su fecha de nacimiento", 2);
		return false;
	}else{
		if(new Date(date) > new Date(todayIs())){
			alertify.error("La fecha es invalida", 2);
			return false;
		}else{
			alertify.success("Fecha correcta", 1);
			return true;
		}
	}

}

function todayIs(){
	var fecha= new Date();
	var mes= ((fecha.getMonth().length+1)===1)?(fecha.getMonth()+1):(fecha.getMonth()+1);
	return fecha.getFullYear()+"-"+("0"+mes).slice(-2)+"-"+fecha.getDate();
}

