/*
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

*/
const producto_array=[];
let contador_id=0;
function asignar_eventos(){
	document.getElementById("formulario_registro").addEventListener("submit",paro_form);
}
function paro_form(e){
	e.preventDefault(); 
	console.log("formulario parado");
	let nombre_registro=document.getElementById("nombre_registro").value.trim();
	let cantidad_registro=document.getElementById("cantidad_registro").value.trim();
	let precio_registro=document.getElementById("precio_registro").value.trim();
	if(filtrar_datos(nombre_registro,cantidad_registro,precio_registro)){
		let producto = {
		  id: contador_id,
		  nombre: nombre_registro,
		  cantidad: cantidad_registro,
		  precio: precio_registro,
		  calculo : function() {
				return this.cantidad * this.precio;
			}
		};
		contador_id++;
		producto_array.push(producto);
		console.log(producto.calculo());
		pintar_registros();
	}
	else{
		alert("Error en la introduccion de datos");
	}
	document.getElementById("nombre_registro").value="";
	document.getElementById("cantidad_registro").value="";
	document.getElementById("precio_registro").value="";
}
function filtrar_datos(nombre_registro,cantidad_registro,precio_registro){
	const patron_texto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
	const patron_numeros = /^[0-9]+$/;
	let valido=true;
	if(!patron_texto.test(nombre_registro) || !patron_numeros.test(cantidad_registro) || !patron_numeros.test(precio_registro)){
		valido=false;
	}
	return valido;
}
function pintar_registros(){
	//Pintamos los titulos
	let contenedor_lista_registros=document.getElementById("contenedor_lista_registros");
	contenedor_lista_registros.innerHTML="";
	let tabla=document.createElement("table");
	tabla.setAttribute("id","tabla_lista_registros");
	let titulos=["Nombre","Cantidad","Precio","Total"];
	let fila=document.createElement("tr");
	titulos.forEach((titulo) =>{
		let columna_titulo=document.createElement("th");
		columna_titulo.textContent=titulo;
		fila.appendChild(columna_titulo);
	});
	tabla.appendChild(fila);
	//Pintamos los productos en si
	producto_array.forEach((producto) => {
		fila=document.createElement("tr");
		let columna_nombre=document.createElement("td");
		columna_nombre.textContent=producto.nombre;
		columna_nombre.dataset.index = producto.id;
		fila.appendChild(columna_nombre);	
		let columna_cantidad=document.createElement("td");
		columna_cantidad.textContent=producto.cantidad;
		columna_cantidad.dataset.index = producto.id;
		fila.appendChild(columna_cantidad);
		let columna_precio=document.createElement("td");
		columna_precio.textContent=producto.precio;
		columna_precio.dataset.index = producto.id;
		fila.appendChild(columna_precio);
		let columna_calculo=document.createElement("td");
		columna_calculo.textContent=producto.calculo();
		columna_calculo.dataset.index = producto.id;
		fila.appendChild(columna_calculo);
		tabla.appendChild(fila);
	});
	contenedor_lista_registros.appendChild(tabla);
	pinta_resultados();

}
function pinta_resultados(){
	//Pintamos la tabla con los resultados
	let contenedor_resultados_registros=document.getElementById("contenedor_resultado_registros");
	contenedor_resultados_registros.innerHTML="";
	let parrafo=document.createElement("p");
	let producto_regis_sum=0;
	let producto_cant_sum=0;
	let producto_precio_sum=0;
	producto_array.forEach((producto) => {
		producto_regis_sum++;
		producto_cant_sum+=parseInt(producto.cantidad);
		producto_precio_sum+=parseInt(producto.precio);
		
	});
	parrafo.textContent="Número total de registros: "+producto_regis_sum+" Suma total de cantidades: "+producto_cant_sum+" Importe total acumulado: "+producto_precio_sum;
	contenedor_resultados_registros.appendChild(parrafo);	
}













/*
document.getElementById("miFormulario").addEventListener("submit", function(event) {
  event.preventDefault(); 

*/
document.addEventListener('DOMContentLoaded', asignar_eventos);