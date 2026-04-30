
function asignar_eventos(){
    document.getElementsByClassName('img_puntero')[0].addEventListener('animationend',poner_video);


    

}


function poner_video(){
    console.log("Animación terminada");
    let contenedor_video=document.getElementsByClassName('video_youtube')[0];
    contenedor_video.innerHTML="";
    contenedor_video.innerHTML=`
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src="https://www.youtube.com/embed/wH_jJLRQrck?autoplay=1" 
                                    frameborder="0" 
                                    allow="autoplay; encrypted-media" 
                                    allowfullscreen>
                                </iframe>
                            `;
    document.querySelector('.img_puntero').remove();
}

document.addEventListener('DOMContentLoaded', asignar_eventos);



    /*

        const caja = document.getElementById('caja');

        caja.addEventListener('animationend', () => {
            // Cambiar estilos
            caja.style.background = 'blue';
            caja.style.borderRadius = '50%';
            
            // Agregar contenido
            caja.innerText = "¡TERMINADO!";
            
            // Agregar un nuevo elemento al HTML
            const texto = document.createElement('p');
            texto.innerText = "JS ha modificado esto al final.";
            document.body.appendChild(texto);
        });



    */