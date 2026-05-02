
function asignar_eventos(){
    const zonas= document.querySelectorAll('[class^="zona_"]');
    zonas.forEach(zona => {
        zona.addEventListener('click', agregar_animacion);
    });
    


    

}
function agregar_animacion(){
    console.log(this.className);
    switch(this.className){
        case 'zona_1':
            this.classList.toggle('animacion_rotar_1'); 
            break;
        case 'zona_2':
            this.classList.toggle('animacion_rotar_2');
            break;    
    }
}
document.addEventListener('DOMContentLoaded', asignar_eventos);

