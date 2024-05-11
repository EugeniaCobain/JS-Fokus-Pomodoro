//DECLARACIÓN DE VARIABLES
const html = document.querySelector('html');
/* Botón Enfoque y Descanso largo y corto */
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
/* Imagen */
const banner = document.querySelector('.app__image');
/* Títulos */
const titulo = document.querySelector('.app__title');
/* Clase active*/
const botones = document.querySelectorAll('.app__card-button');
/* Botón música */
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
/* Timer */
let tiempoTranscurridoSegundos = 1500; 
const botonComenzar = document.querySelector('#start-pause');
let idIntervalo = null;
/* Audio */
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')
/* Cambiar texto al botón "Comenzar" */
const textoIniciarPausar = document.querySelector('#start-pause span')
/* Íconos play y pause */
const iconoBoton = document.querySelector('.app__card-primary-butto-icon');
/* Mostrar reloj */
const tiempoEnPantalla = document.querySelector('#timer');


/* FUNCIÓN CUENTA REGRESIVA O TIMER */
const cuentaRegresiva = ()=>{
    if (tiempoTranscurridoSegundos <= 0) {
        audioTiempoFinalizado .play()
        alert('Tiempo final');
        
        return
    }
    //Cambiar el texto del botón
    textoIniciarPausar.textContent = 'Pausar';
    //Cambiar el ícono
    iconoBoton.setAttribute('src', './imagenes/pause.png');
    tiempoTranscurridoSegundos -=1;
    console.log("Temporizador: " + tiempoTranscurridoSegundos); // Muestra el tiempo actual
    console.log('Id: ' + idIntervalo); // Muestra el ID actual
    mostrarTiempo();
}

/* FUNCIÓN PARA INICIAR O PAUSAR EL TIMER */
botonComenzar.addEventListener('click', iniciarPausar);
function iniciarPausar() {
    if (idIntervalo) {
        audioPausa.play();
        reiniciar();
        return 
    }
    audioPlay.play(); 
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

/* FUNCIÓN REINICAR */
function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null
     //Cambiar el texto del botón
    textoIniciarPausar.textContent = 'Comenzar'
    //Cambiar el ícono
    iconoBoton.setAttribute('src', './imagenes/play_arrow.png')
}

/* FUNCIÓN PARA MOSTRAR TIEMPO EN PANTALLA */
function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoSegundos*1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-AR', {minute: '2-digit', second: '2-digit' })
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

/* FUNCIÓN PARA REPRODUCIR SONIDO */
inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    } else{
        musica.pause();
    }
});

musica.loop = true;

/* FUNCIÓN PARA CAMBIAR CONTEXTOS - FONDO E IMAGEN*/
function cambiarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)
    //Cambio de título
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = 
            `Optimizá tu productividad,<br>
                <strong class="app__title-strong">sumergite en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = 
            `¿Qué tal si tomás un respiro?<br>
                <strong class="app__title-strong">¡Hacé una pausa corta!</strong>`
            break;

        case "descanso-largo":
            titulo.innerHTML = 
            `Hora de volver a la superficia<br>
                    <strong class="app__title-strong">¡Hacé una pausa larga!<strong>`
            break;
    
        default:
                    alert("Contexto no válido: " + contexto);
         break;
    }

    //Resaltar botón y que se desmarquen los demás: Quitar la clase "active"
    botones.forEach(function(contexto) {
        contexto.classList.remove('active')
    })

    //Formatear el tiempo
    mostrarTiempo();
}

//CAMBIO DE CONTEXTO PARA BOTÓN ENFOQUE, DESCANSO CORTO Y DESCANSO LARGO
botonEnfoque.addEventListener('click', ()=> {
    //Cambiar tiempo a 25 minutos
    tiempoTranscurridoSegundos = 1500;
    //Cambiar contexto
    cambiarContexto('enfoque');
    /* Agregar la clase active */
    botonEnfoque.classList.add('active');
    
});
botonCorto.addEventListener('click', ()=> {
    //Cambiar tiempo a 5 minutos
    tiempoTranscurridoSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
    
});

botonLargo.addEventListener('click', ()=> {
   //Cambiar tiempo a 15 minutos
    tiempoTranscurridoSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');  
});

/* Como la función mostrarTiempo es una función auxiliar que se encarga específicamente de formatear y mostrar el tiempo en la interfaz, la llamados aquí abajo:*/
mostrarTiempo();

