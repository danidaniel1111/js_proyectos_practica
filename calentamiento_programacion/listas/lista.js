let array_lista=[];
let contenedor_input;
let contenedor_lista;
let lista;
function asignarEventos(){

	if(document.readyState=='complete'){
		//contenedor_titulo = document.getElementById("contenedor_titulo");
		//document.getElementById('boton_evento').addEventListener('click', pulsa_boton); 
		contenedor_lista=document.getElementById("contenedor_lista");
		lista=document.createElement("ul");
		lista.setAttribute("id", "lista");	
		contenedor_lista.appendChild(lista);
		contenedor_lista.style.display="block";
		document.getElementById('boton_agregar').addEventListener('click', agrega_lista);
		document.getElementById('lista').addEventListener('click', interaccion_lista);
		document.getElementById('boton_borrar').addEventListener('click', borra_lista);
		document.getElementById('boton_cancelar').addEventListener('click', cancelar_borrado);
	}
}
function agrega_lista(){
	console.log("agregando a lista");
	let nuevo_dato=document.getElementById("elemento_lista").value;
	if(nuevo_dato.length>0){
		console.log(nuevo_dato);
		//borrar lista y volverla a crear? BORRAR SOLO LOS LI???
		array_lista.push(nuevo_dato);
		console.log("Lista completa: "+array_lista);
		document.getElementById("elemento_lista").value="";
		repintar_lista();
	}
	else{
		alert("Texto vacio, no se puede agregar");
	}
}
function repintar_lista(){
	console.log("Repintando lista");
	//Borramos lista antigua y volvemos a pintar todos los campos
	lista=document.getElementById("lista");
	lista.innerHTML="";
	let contador=0;
	array_lista.forEach(dato => {
		let dato_lista=document.createElement("li");
		dato_lista.textContent=dato;
		dato_lista.setAttribute("id", contador);
		contador++;
		lista.appendChild(dato_lista);
	});
}

function interaccion_lista(e){
	console.log(e.target);
	e.target.classList.toggle("lista_check");

}
function borra_lista(){
	document.getElementById("boton_cancelar").style.display="block";
	document.getElementById("boton_borrar").style.display="none";
	document.getElementById("boton_agregar").style.display="none";
	//quitar evento actual de lista, poner el de borrar, al salir, quitar el actual y poner el de ahora
	document.getElementById('lista').removeEventListener('click', interaccion_lista);
	document.getElementById('lista').addEventListener('click', cambiar_lista);
}
function cambiar_lista(e){
	console.log(e.target.id);
	/*	*/
	document.getElementById(e.target.id).innerHTML="";
	array_lista.splice(e.target.id, 1);
	repintar_lista();	
}
function cancelar_borrado(){
	document.getElementById("boton_cancelar").style.display="none";
	document.getElementById("boton_agregar").style.display="block";
	document.getElementById("boton_borrar").style.display="block";	
	document.getElementById('lista').removeEventListener('click', cambiar_lista);
	document.getElementById('lista').addEventListener('click', interaccion_lista);
}
document.addEventListener('readystatechange', asignarEventos, false);