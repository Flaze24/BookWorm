//Se inicializan las variables globales

emailjs.init("user_73Ka2tvBwnNUBtC9nAjZB");

let contactoForm= document.querySelector("#contactoForm");
let loginForm= document.querySelector("#loginForm");
let regForm= document.querySelector("#regForm");

//Ciclos para verificar cual formulario se ha enviado

if(contactoForm){
	contactoForm.addEventListener("submit", function(e){
			e.preventDefault();
			const conNombre=document.querySelector("#conNombre").value;
			const conApellido=document.querySelector("#conApellido").value;
			const conCorreo=document.querySelector("#conCorreo").value;
			const conMensaje=document.querySelector("#conMensaje").value;

			return validarconForm(conNombre, conApellido, conCorreo, conMensaje);

	})
}else if(loginForm)
	   {

			loginForm.addEventListener("submit", function(e){
					console.log("Hola");
					e.preventDefault();
					var logCorreo=document.querySelector("#logCorreo").value;
					var logPass=document.querySelector("#logPass").value;

					return validarLogForm(logCorreo, logPass);

		})
}else{
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
}

//Funcion para validar formulario de contactenos

let validarconForm=(nombre,apellido,correo,mensaje)=>{
	
	console.log(nombre+" "+correo+" "+apellido+" "+mensaje);
	if(!validarText(nombre)||
		!validarText(apellido)||
		!validarCorreo(correo)||
		!validarMensaje(mensaje))
	{
		return alert("Hay Errores en los siguientes campos");
		
	}else{
		enviarMensaje(nombre, correo, mensaje);
	}
}

//Funcion para validar formulario de login

let validarLogForm=(correo, password)=>{
	if(validarCorreo(correo)&&
		validarPass(password))
	{
			alertify.success("Usuario Valido",2);
	}else{
		 	alertify.error("Usuario Invalido", 2);
	}
}

//funcion para validar formulario de registro

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

//Validar genero

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


//Validar texto

let validarText=(texto)=>{
	if(texto===''){
			alertify.error("Ingrese Texto",2)
			return false;
	}else{
		var re= /^[a-z]*$/i;
		if(!re.test(texto)){
			alertify.error("Solo Letras",2)
			return false;
		}else{
			alertify.success("Texto Ingresado con Exito");
			return true;
		}	
	}
}

//Validar Mensaje
let validarMensaje=(mensaje)=>{
	if(mensaje===''){
		alertify.error("Debe ingresar un mensaje", 2);
		return false;
	}else{
		if(mensaje.length > 100){
			alertify.error("No puede excederse a 100 caracteres");
			return false;
		}else{
			alertify.success("El mensaje es valido");
			return true;
		}
	}
}

//Validar Correos

let validarCorreo=(correo)=>{
	var atSearch=(correo).indexOf("@");
	if(atSearch ==-1){
		alertify.error("El correo requiere un arroba (@)",2);
		return false;
	} else if (atSearch == 0){
		alertify.error("Es necesario texto antes del arroba",2);
		return false
	}else if(atSearch == (correo.length)-1){
		alertify.error("Es necesario texto despues del arroba",2);
		return false;
	}else{
		alertify.success("Correo Ingresado existosamente");
		return true;
	}
}

//Comparar Claves
function compararClave(clave1, clave2){
	if(clave1 != clave2){
		alertify.error("Las claves no coinciden",2);
		return false;
	}else{
		alertify.success("Claves estan chidas", 1);
		return true;
	}
}

//Validar Claves
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

//Valida la fecha ingresada para asegurarse de que no sea mayor a la actual
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

//Calcula y cambia el formato de la fecha actual
function todayIs(){
	var fecha= new Date();
	var mes= ((fecha.getMonth().length+1)===1)?(fecha.getMonth()+1):(fecha.getMonth()+1);
	return fecha.getFullYear()+"-"+("0"+mes).slice(-2)+"-"+fecha.getDate();
}

//Envio de correo al enviar formulario de contactenos
let enviarMensaje = (nombre, correo, mensaje)=>{
	emailjs.send("gmail", "contacto",{
		rec_name:nombre,
		rec_email:correo,
		message:mensaje
	})
}