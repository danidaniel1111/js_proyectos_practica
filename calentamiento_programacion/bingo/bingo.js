/*
Tabla 7x7 
Se tiene que generar 4 simbolos alatoriamente en esa tabla, No tienen que estar pegados
la primera linea se muestra siempre
una vez que "completemos algo", se mostraran las demas celdas que esten alrededor de esa celda
Para ganar, hay que descubrir los 4 simbolos

PARA RANDOM -> 

function numero_random(min, max) {
  return Math.random() * (max - min) + min;
}

randomEntero(1, 10); // número entre 1 y 10
PERO SOLO HAY 4 CIRCULOS, MIRAR ESO


element.classList.toggle("activo");

*/

let misiones_BOTW = [
  "Elimina 2 enemigos con un palo",
  "Cocina una comida sin ingredientes extra",
  "Derrota a un enemigo sin recibir daño",
  "Rompe un arma",
  "Usa una bomba para eliminar un enemigo",
  "Abre un cofre escondido",
  "Escala hasta un punto alto cercano",
  "Derrota a un Bokoblin",
  "Usa el arco y acierta a la cabeza",
  "Congela a un enemigo",
  "Quema hierba o madera",
  "Consigue un arma elemental",
  "Bloquea un ataque con el escudo",
  "Derrota a un enemigo desde sigilo",
  "Completa un santuario",
  "Activa una torre",
  "Cocina una receta con carne",
  "Cocina una receta con pescado",
  "Cocina una receta con fruta",
  "Recoge 3 setas",
  "Recoge 3 plantas curativas",
  "Elimina un enemigo con una bomba remota",
  "Rompe un barril",
  "Rompe una caja",
  "Nada hasta una orilla lejana",
  "Corre hasta vaciar la resistencia",
  "Planea durante 5 segundos",
  "Sobrevive a una caída alta",
  "Derrota a un enemigo usando fuego",
  "Derrota a un enemigo usando hielo",
  "Derrota a un enemigo usando electricidad",
  "Consigue un escudo nuevo",
  "Consigue un arco nuevo",
  "Cambia de ropa",
  "Mejora un corazón o resistencia",
  "Habla con un NPC",
  "Compra algo en una tienda",
  "Vende un objeto",
  "Recoge un ingrediente raro",
  "Activa una hoguera",
  "Espera hasta otro momento del día",
  "Descubre una nueva zona",
  "Derrota a un enemigo lanzándolo al agua",
  "Usa una roca para eliminar a un enemigo",
  "Activa un mecanismo usando electricidad",
  "Sobrevive a un combate solo con armas improvisadas",
  "Elimina a un enemigo usando el entorno",
  "Encuentra un cofre usando la visión de altura",
  "Elimina a Ganondorf desnudo y con un escudo"
];
let contador_misiones=0;
function crear_bingo(){
	let contenedor_bingo=document.getElementById("contenedor_bingo");
	let tabla=document.createElement("table");
	tabla.setAttribute("id","tabla_bingo");
	//FOR PARA CREACION DE LA TABLA 7X7, AGREGAMOS CLASE UNA VEZ SE CREA LA TABLA
	for (let cont_fila = 0; cont_fila < 7; cont_fila++) {
		let fila= document.createElement("tr");
		for (let cont_celda = 0; cont_celda < 7; cont_celda++) {
			let celda=document.createElement("td");
			//console.log(cont_fila);
			if(cont_fila !== 6){
				celda.setAttribute("class","oculto");
			}
			//console.log( "Mision Nº: "+contador_misiones);
			celda.textContent=misiones_BOTW[contador_misiones];
			contador_misiones++;
			fila.appendChild(celda);
		}
		tabla.appendChild(fila);
	}
	contenedor_bingo.appendChild(tabla);
	document.getElementById("tabla_bingo").addEventListener("click",evento_celdas);
}

function evento_celdas(e){
	const tabla = document.getElementById("tabla_bingo");
	let celda_actual=e.target.closest("td");
	celda_actual.setAttribute("class","completado");
	if (!celda_actual){ 
		return;
	}
	let fila_actual=celda_actual.parentElement;
	//console.log(fila_actual.rowIndex);
	if(fila_actual.rowIndex !== 6){
		celda_actual.classList.remove("oculto");
	}
	if(fila_actual.rowIndex == 0){								//	COMPROBAR SI SE HAN ENCONTRADO TODOS LOS LOGOS, Y SI EES ASI, GANAS
		alert("Ganaste wey");
		return;
	}
	//mostrar los que estan al lado
	let fila_celda=celda_actual.parentElement.rowIndex;
	let columna_celda=celda_actual.cellIndex;
	console.log("Posicion de celda pulsada: Fila: "+fila_celda+" ,Columna: "+columna_celda);
	// Arriba
	if (fila_celda > 0) {
		let celda_cambio=tabla.rows[fila_celda - 1].cells[columna_celda];
		celda_cambio.classList.remove("oculto");
	}

	// Abajo
	if (fila_celda < tabla.rows.length - 1) {
		let celda_cambio=tabla.rows[fila_celda + 1].cells[columna_celda];
		celda_cambio.classList.remove("oculto");
	}

	// Izquierda
	if (columna_celda > 0) {
		let celda_cambio=celda_actual.parentElement.cells[columna_celda - 1];
		celda_cambio.classList.remove("oculto");
	}

	// Derecha
	if (columna_celda < celda_actual.parentElement.cells.length - 1) {
		let celda_cambio=celda_actual.parentElement.cells[columna_celda + 1];
		celda_cambio.classList.remove("oculto");
	}
		
		
	
}


function asignar_eventos(){
	//document.getElementById().addEventListener("",);
	shuffle(misiones_BOTW);
	crear_bingo();
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
document.addEventListener('DOMContentLoaded', asignar_eventos);