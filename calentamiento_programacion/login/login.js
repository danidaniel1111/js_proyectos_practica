let array_usuarios = [
    { usuario: "Daniel", codigo: 1111, intentos: 5, bloqueado: false },
    { usuario: "Adrian", codigo: 2222, intentos: 5, bloqueado: false },
	{ usuario: "Gabriel", codigo: 3333, intentos: 5, bloqueado: true },
	{ usuario: "Lucas", codigo: 4444, intentos: 5, bloqueado: false },
];

function asignar_eventos(){
	document.getElementById("boton_login").addEventListener("click",comprobar_usu);
}
function comprobar_usu(){
	document.getElementById("contenedor_mensaje").innerHTML="";
	let usuario_input=document.getElementById("usuario").value.trim();
	let usuario_mayus=usuario_input[0].toUpperCase() + usuario_input.substring(1);
	let pass_input=parseInt(document.getElementById("codigo").value.trim());
	if(valida_input(usuario_mayus,pass_input)){
		console.log("user y pass types estan bien");
		let usuario_actual=array_usuarios.find(u => u.usuario===usuario_mayus);
		if(usuario_actual){
			console.log("usuario en sistema");
			let usuario_logueo=array_usuarios.find(u => u.usuario===usuario_mayus && u.codigo === pass_input);
			if(usuario_logueo){
				console.log("puede loguearse");
				//COMPROBAR SI ESTA BLOQUEADO O NO
				if(usuario_logueo.bloqueado){
					bloquear_usuario(usuario_logueo.usuario);	
				}
				else{
					document.getElementById("contenedor_mensaje").innerHTML="<p>Estas loqueado en el sistema</p>";	
				}
			}
			else{
				console.log("Codigo mal introducido, RESTAR INTENTO");
				usuario_actual.intentos--;
				document.getElementById("contenedor_mensaje").innerHTML="<p>Error en la introducion de la contraseña para el usuario "+usuario_actual.usuario+" , quedan "+usuario_actual.intentos+" intentos</p>";
				if(usuario_actual.intentos<=0){
					usuario_actual.bloqueado=true;
					document.getElementById("contenedor_mensaje").innerHTML="";
					bloquear_usuario(usuario_actual.usuario);
				}
				
			}
		}
		else{
			document.getElementById("contenedor_mensaje").innerHTML="<p>Usuario fuera del sistema</p>";
		}
	
	}
	else{
		document.getElementById("contenedor_mensaje").innerHTML="<p>Usuario y Codigo no texto/numerico</p>";			
	}
}
function bloquear_usuario(usuario=""){
	let contenedor_bloqueo=document.getElementById("contenedor_mensaje");
	let todos_inputs=document.querySelectorAll("input");
	todos_inputs.forEach((input_bloqueo) => {
		input_bloqueo.disabled=true;
	});
	let parrafo_bloqueo=document.createElement("p");
	if(usuario.length>1){
		parrafo_bloqueo.textContent="Se ha bloqueado su usuario: "+usuario+" por los multiples intentos";
	}
	else{
		parrafo_bloqueo.textContent="Se ha bloqueado su usuario por los multiples intentos";
	}
	contenedor_bloqueo.appendChild(parrafo_bloqueo);
	let boton_bloqueo=document.createElement("button");
	boton_bloqueo.textContent="Volver atrás";
	boton_bloqueo.setAttribute("id","boton_bloqueo");
	contenedor_bloqueo.appendChild(boton_bloqueo);	
	document.getElementById("boton_bloqueo").addEventListener("click",recarga_pagina);
	document.getElementById("boton_login").removeEventListener("click",comprobar_usu);
}
function recarga_pagina(){
	location.reload();	
}
function valida_input(usuario,pass){
	const patron_texto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
	const patron_numeros = /^[0-9]+$/;
	let valido=true;
	if(!patron_texto.test(usuario) || !patron_numeros.test(pass)){
		valido=false;
	}
	return valido;
}


document.addEventListener('DOMContentLoaded', asignar_eventos);