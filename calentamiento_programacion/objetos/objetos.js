/*
const usuarios = [
  { id: 1, nombre: "Ana", edad: 25 },
  { id: 2, nombre: "Juan", edad: 30 }
];
*/
const tareas_array=[];
let contador_id=0;
let contenedor_vista=document.getElementById("contenedor_vista_array");
let titulos_tabla=["Tarea","Estado"];
let fila;
let columna;
let filtro;
function asignarEventos(){

	
		document.getElementById('boton_añadir_array').addEventListener('click', conseguir_datos); 
		document.getElementById('filtro_tareas').addEventListener('change', filtrado_datos);	
	
}
function conseguir_datos(){
	console.log("Conseguimos los datos de los inputs, y creamos el objeto");
	let contenido=document.getElementById("elemento_lista").value;
	console.log(contenido);
	let boolean_completado=document.getElementById("completado");
	if(boolean_completado.checked){
		console.log("Esta completado");
		boolean_completado=true;
	}
	else{
		console.log("NO esta completado");	
		boolean_completado=false;
	}
	crear_objeto(contenido,boolean_completado);
	document.getElementById("elemento_lista").value="";
}
function crear_objeto(contenido,boolean_completado){
	let tarea = {
	  id: contador_id,
	  contenido: contenido,
	  completado: boolean_completado,
	  muestra_todo : function() {
		if(boolean_completado){
			return this.contenido + " ,Completado";			
		}
		else{
			return this.contenido + " ,NO completado";			
		}
		}
	};
	contador_id++;
	tareas_array.push(tarea);
	pinta_tabla();
	mostrar_boton_filtrado();

}
function mostrar_boton_filtrado(){
	if(contenedor_vista.querySelector("table")){
		document.getElementById("contenedor_filtro_array").style.display="block";
	}
	else{
		document.getElementById("contenedor_filtro_array").style.display="none";		
	}	
}
function filtrado_datos(e){
	console.log(e.target.value);
	filtro=e.target.value;
	pinta_tabla(filtro);
	mostrar_boton_filtrado();
}

function pinta_tabla( filtro = "no"){
	contenedor_vista.innerHTML="";
	let tabla=document.createElement("table");
	tabla.setAttribute("id","tabla_tareas");
	fila=document.createElement("tr");
	titulos_tabla.forEach((titulo) => {
		columna=document.createElement("th");
		columna.textContent=titulo;
		fila.appendChild(columna);	
	});
	tabla.appendChild(fila);
	tareas_array.forEach((tarea) => {
		switch(filtro){
		case "no":
		case "todas":
			console.log("No hay filtro / todas seleccionadas");
			fila=document.createElement("tr");
			columna=document.createElement("td");
			columna.textContent=tarea.contenido;
			columna.dataset.index = tarea.id;
			fila.appendChild(columna);
			columna=document.createElement("td");
			if(tarea.completado){
				columna.textContent="Completado";			
			}
			else{
				columna.textContent="No completado";			
			}
			columna.dataset.index = tarea.id;
			fila.appendChild(columna);
			tabla.appendChild(fila);		
			break;
		case "hechas":
			console.log("Solo tareas completadas");
			if(tarea.completado){
				fila=document.createElement("tr");
				columna=document.createElement("td");
				columna.textContent=tarea.contenido;
				columna.dataset.index = tarea.id;
				fila.appendChild(columna);
				columna=document.createElement("td");
				columna.textContent="Completado";
				columna.dataset.index = tarea.id;				
				fila.appendChild(columna);
				tabla.appendChild(fila);		
				
			}
			break;
		case "pendientes":
			console.log("Solo tareas no completadas");
			if(!tarea.completado){
				fila=document.createElement("tr");
				columna=document.createElement("td");
				columna.textContent=tarea.contenido;
				columna.dataset.index = tarea.id;
				fila.appendChild(columna);
				columna=document.createElement("td");
				columna.textContent="No completado";
			    columna.dataset.index = tarea.id;				
				fila.appendChild(columna);
				tabla.appendChild(fila);		
			}
			break;
		}	
	});
	contenedor_vista.appendChild(tabla);	
	document.getElementById('tabla_tareas').addEventListener('click', cambio_estado); 
}

function cambio_estado(e){
	console.log(e.target.dataset.index);
	if(!e.target.dataset.index){
		console.log("se ha pulsado en el th");
	}
	else{
		if(tareas_array[e.target.dataset.index].completado){
			tareas_array[e.target.dataset.index].completado=false;
		}
		else{
			tareas_array[e.target.dataset.index].completado=true;
		}
		pinta_tabla(filtro);
	}
	
}

document.addEventListener('DOMContentLoaded', asignarEventos);