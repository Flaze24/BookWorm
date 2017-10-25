var loginForm= document.querySelector("#loginForm");

loginForm.addEventListener("submit", function(e){
		e.preventDefault();
		var logCorreo=document.querySelector("#logCorreo").value;
		var logPass=document.querySelector("#logPass").value;

		return validarLogForm(correo, password);

})


function validarLogForm(correo, password){
	if(validarCorreo(correo)&&
		validarPass(password))
	{
			alertify.success("Usuario Valido",2);
	}else{
		 	alertify.error("Usuario Invalido", 2);
	}
}

function validarCorreo(correo){
	var atSearch=(correo).indexOf("@");
	if(atSearch ==-1){
		alertify.error("El correo requiere un arroba (@)",2);
	} else if (atSearch == 0){
		alertify.error("Es necesario texto antes del arroba",2);
	}else if(atSearch == (correo.length)-1){
		alertify.error("Es necesario texto despues del arroba",2);
	}else{
		alertify.success("Correo Ingresado existosamente");
	}
}

function compararClave(clave1, clave2){
	if(clave1 != clave2){
		alertify.error("Las claves no coinciden",2);
	}
}
