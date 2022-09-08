/*vamos a aprender el PATRON MODULO y su sintaxis se inicia con una funcion...ya sea de flecha o tradicional, si crea la funcion anonima y si necesitamos
invocarla mas adelante se coloca entre parentesis y otros parentesis al final....se conocen como funciones anonimas autoinvocadas:

(function () {
  
});

*/
const miModulo =(() => {

/**
 * 2C = dos de treboles
 * 2D = dos de diamantes
 * 2H = dos de corazones
 * 2S = dos de espadas
 */

  'use strict'//uso estricto para evaluar codigo                                                                                                                                              
   
let deck     = []; // esta sera la baraja de cartas
const tipos  = ["C", "D", "H", "S"],// estas son las pintas
      letras = ["J", "Q", "K", "A"];//cartas de letras o reyes

/**Vamops a contar los puntos creando variables inicializadas en cero*/

let puntosJugadores  = [];
/*let puntosJugador =  0,
    puntosTallador =  0; */     




/*REFERENCIAS HTML--para usar el DOM y los botones*/
//referencia para usar el boton detener newgame y pedircarta y calcular puntosd
const btnGimme = document.querySelector('#btnGimme'),
      btnStop = document.querySelector('#btnStop'),
      btnNewgame = document.querySelector('#btnNewgame');
      //referencia que crea la carta en el html
const divCartasJugadores = document.querySelectorAll('.divCartas'),
       puntosJhtml = document.querySelectorAll('small');
      //divCartasTallador = document.querySelector('#Tallador-cartas');





/**AQUI INICIA EDL JUEGO */
      const inicializarJuego = (numJugadores = 2)=>{
      deck = crearDeck();
      puntosJugadores = [];
      for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
        }
  
   //aqui vamos a dejar en blanco el div donde estan las cartas y el small
   puntosJhtml.forEach(elem => elem.innerText=0);
   divCartasJugadores.forEach(elem => elem.innerText='');     

    
    btnGimme.disabled = false;
    btnStop.disabled = false;
      
      }


//aqui creamos cartas y las incluimos en deck del 2 al 10 y todas las pintas
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
        deck.push(i+tipo);
    }
  }

  //aqui creamos las cartas de Reyes con todas las pintas y se incluyen en deck(baraja)
  for(let tipo of tipos){
      for(let letra of letras){
        deck.push(letra+tipo);
      }
  }
  // se importa libreria underscore en el index para con shuffle cargar aleatorio el deck
   
  return  _.shuffle(deck);
};





// esta funcion me pérmite tomar una carta y q ya no este en la baraja(deck)

const pedirCarta = () =>{

    if(deck.length === 0){
        throw 'No hay cartas en el maso';
    }

    return deck.pop();
      
     
}
/*for( let i=0;i<=100;i++){
pedirCarta();
}*/

/*ahora vamos a darle el valor q le corresponde a la carta
..NOTA: todos los string pueden trabajarse como un vector
isNaN (is not a number) evalua el parametro y nos define si es un numero o no
al revisar en consola un numero debe imprimir en morado...si es gris es pq es un string
una solucion para transformarlo es multiplicarlo por 1 */

const valorCarta = (carta)=>{
  const valor = carta.substring(0,carta.length-1);// de esta forma se extrae el numero obviando la ultima letra
  /*let puntos = 0;
  if(isNaN(valor)){
    console.log('No es un numero');
    puntos= ( valor === 'A')?11:10;
  }else{
    console.log('Es un numero');
    puntos = valor * 1;
  }
  console.log(puntos);*/

  return isNaN(valor)?
   valor==='A'?11:10 
   : valor*1;
}
//const valor = valorCarta(pedirCarta());
//console.log({valor});







//Turno : 0 es el primer jugador y el ultimo la computadora
const acumulaPuntos = (carta,turno)=>{
  puntosJugadores[turno] = puntosJugadores[turno]  + valorCarta(carta)//aqui acumulamos los puntos
  puntosJhtml[turno].innerText = puntosJugadores[turno];
  return puntosJugadores[turno];
}

const crearCarta= (carta,turno)=>{
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
 //aqui se le coloca la clase de html a la carta ya que aparecera muy grande
 imgCarta.classList.add('carta');
 //aqui se coloca la carta en el HTML usando la funcion append
 divCartasJugadores[turno].append(imgCarta);
}


const determinarGanador = ()=>{
  setTimeout(()=>{

    const [puntosMinimos,puntosTallador] = puntosJugadores;
    //aqui vamos a geneerar un alert que nos muestre el resultado del juego segun sus posibles resultados
    
    if (puntosTallador === puntosMinimos) {
      alert('Empatados :(');
    }else if (puntosMinimos > 21) {
      alert('Gana la talla :(');
      
    }else if (puntosTallador > 21) {
      alert('Haz ganado 21 BlackJack')
      
    }else{
      alert('Gana el Tallador')
    }
    
    },50);
}
/**
 * TURNO DEL TALLADOR (COMPUTADORA)
 * 
 * Aqui vamos a crear las cartas de la talla de la misma forma q creamos la del jugador
 * y tambien la logica que comparara quien gana.
 */

//aqui se crea el juego de la talla(computadora) y con el DOM se valida 
//que siempre intente obtener mas puntos que el jugador
const turnoComputadora = (puntosMinimos)=> {
  let puntosTallador = 0;
do {
  const carta = pedirCarta();
  
  puntosTallador = acumulaPuntos(carta,puntosJugadores.length-1);
  crearCarta(carta,puntosJugadores.length-1);
 //aqui apareceran las cartas se crea una elemento img y se trae la fuente usando los backtips y $
 /* const imgCarta = document.createElement('img');
 imgCarta.src = `assets/cartas/${carta}.png`;
 
//aqui se le coloca la clase de html a la carta ya que aparecera muy grande
imgCarta.classList.add('carta');

 //aqui se coloca la carta en el HTML usando la funcion append
divCartasTallador.append(imgCarta); */


//aqui se evalua si el jugador se paso de 21 para detener el ciclo de cartas de la talla

  
}while ((puntosTallador<puntosMinimos) && (puntosMinimos<=21)); 

determinarGanador();

//con este timeout vamos a tratar que muestre primero las cartas


}









/**
 * Eventos
PD: la funcion que se encuentra como argumento de otra funcion se llama CALLBACK 
aqui con  la funcion addEventListener pondremos el tipo de evento y usaremos la funcion
en este caso para peedir carta....luego veremos en consola que aparece una de las cartas
*/

btnGimme.addEventListener('click', ()=>{

  const carta = pedirCarta();
  const puntosJugador = acumulaPuntos(carta,0);
 //puntosJugador = puntosJugador + valorCarta(carta)//aqui acumulamos los puntos
 //puntosJhtml[0].innerText = puntosJugador;

 crearCarta(carta,0);
  
 

//aqui evaluaremos que el jugador no pase de 21 y desactivaremos el boton de pedir(btnGimme)
if(puntosJugador > 21 ){
  console.warn('Lo siento perdiste');
  btnGimme.disabled = true;
  btnStop.disabled = true;
  
  //con esta funciuon damos el turno a la talla con los puntos q hizo el jugador
  turnoComputadora(puntosJugador);
}else if(puntosJugador === 21){
  console.warn('lograste 21...Felicitaciones');
  btnStop.disabled = true;
  turnoComputadora(puntosJugador);
}



});


btnStop.addEventListener('click', ()=>{

  btnGimme.disabled = true;
  btnStop.disabled = true;
  turnoComputadora(puntosJugadores[0]);


})

btnNewgame.addEventListener('click', ()=>{

//aqui creamos una nueva baraja y ponemos en cero los puntos que se han acumulado
    
    inicializarJuego();
    

})

/* siempre al finalizar el modulo debe tener un return, aqui hicmos publica la funcion inicializar
enviada como objeto y en el html en un script la podemos invocar*/

return {nuevoJuego : inicializarJuego}
})();











