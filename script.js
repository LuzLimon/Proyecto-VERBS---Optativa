// Estos son los elementos que nos permite verlos verbos
const showVerb = document.getElementById('showVerb');
const showImage = document.getElementById('showImage');
const showAudio = document.getElementById('showAudio');
// Estas son las opciones de respuesta
const first = document.getElementById('first-verb');
const second = document.getElementById('second-verb');
const third = document.getElementById('third-verb');
const fourth = document.getElementById('fourth-verb');

// Elementos auxiliares
const play = document.getElementById('next');
const restart = document.getElementById('restart');
const verbsCounter = document.getElementById('verbs-counter');
const allRightCounter = document.getElementById('all-right-answers');
const verbsContainer = document.getElementById('verbs-container');

const numberOfVerbs = verbs.length;
// Declaramos que solo se tenga una respuesta correcta y tres respuestas erroneas
let answerRoullete = [0,1,1,1];

let everyNumberOfVerbs = [];
let rightAnswer;
let RightAnswersCounter = 0;
restart.style.display = 'none';
// Aqui le damos la indicación que despues de dar play en la pagina principal se pase al juego.
play.addEventListener('click', function(){
    ponerVerbo();
    play.style.display = 'none';
    restart.style.display = 'flex';
});

//FUNCION PARA REGRESAR O SALIR DEL JUEGO
restart.addEventListener('click', function(){
    location.reload();
});
   

// Aqui obtenemos una lista de manera aleatoria de los verbos que se mostraran
makeRandomList();
// Mandamos la indicación de iniciar en la última posición
let lastPosition = everyNumberOfVerbs.length-1;
// Enesta función damos la indicación de que tenga la misma candidad de verbos en la lista y mostrarlos de manera aleatoria
function makeRandomList(){
    for(var i = 0; i < numberOfVerbs; i++){
        everyNumberOfVerbs.push(i);
    }
    everyNumberOfVerbs = everyNumberOfVerbs.sort(()=>Math.random()-0.5);
}

// Con esta funcion le mandamos la indicación de pintar las respuestas correctas de color verde y las respuestas incorrectas de color rojo añadiendo classList para el estilo.
function buttonEffect(itsRight, button){
    if(itsRight){
        button.classList.add('rightAnswer');
        setTimeout(function(){
            button.classList.remove('rightAnswer');
        },1000);
        RightAnswersCounter = RightAnswersCounter + 1;
    }else{
        button.classList.add('wrongAnswer');
        setTimeout(function(){
            button.classList.remove('wrongAnswer');
        },1000);
    }
    setTimeout(function(){
        ponerVerbo();
    },1000);
}

first.addEventListener('click', function(){
    buttonEffect(isItRigth_(first.innerHTML), this);
});

second.addEventListener('click', function(){
    buttonEffect(isItRigth_(second.innerHTML), this);
});

third.addEventListener('click', function(){
    buttonEffect(isItRigth_(third.innerHTML), this);
});

fourth.addEventListener('click', function(){
    buttonEffect(isItRigth_(fourth.innerHTML), this);
});
// Aqui obtenemos diferentes opciones de respuesta por verbo de manera aleatoria
function shuffleAnswers(array){
    let numberOfAnswersButtons = array.length;
    let randomIndex;

    while(numberOfAnswersButtons != 0){
        randomIndex = Math.floor(Math.random()*numberOfAnswersButtons);
        numberOfAnswersButtons--;
        [array[numberOfAnswersButtons], array[randomIndex]] = [array[randomIndex], array[numberOfAnswersButtons]];
    }
    return array;
}
// Esta funcion nos indicara la respuesta correcta.
function isItRigth_(answer){
    return answer == rightAnswer?true:false;
}
// Esta función nos ayuda en obtener una respuesta incorrecta para el botón.
function randomVerbo(notThisOne){
    theOne = Math.floor(Math.random()*verbos.length);
    return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo(){
    answerRoullete = shuffleAnswers(answerRoullete); // Respuestas aleatorias.

    let randomPosition = everyNumberOfVerbs[lastPosition];
    let imgText = "<img src='img/"+verbs[randomPosition]+".jpg'";
    imgText += " height='140px' width='100px'>";


    // first.classList.add("btn", "btn-outline-primary", "btn-md");
    // second.classList.add("btn", "btn-outline-primary", "btn-md");
    // third.classList.add("btn", "btn-outline-primary", "btn-md");
    // fourth.classList.add("btn", "btn-outline-primary", "btn-md");

    //Mejora de refactorizacion de codigo - forEach utilizado para recorrer los botones y darles estilo
    const button = [...document.querySelectorAll(".verbs-answer")];
        button.forEach(function(elemento) {
            elemento.classList.add("btn", "btn-outline-dark", "btn-md");
    });
    

    if (lastPosition >= 0){
        var just_position = lastPosition+1;
        verbsCounter.innerHTML = ''+just_position+' / '+numberOfVerbs;
        allRightCounter.innerHTML = "Right answers: "+RightAnswersCounter;
    
        showVerb.innerHTML = verbs[randomPosition];
        showImage.innerHTML = imgText;
        showAudio.src = "audio/"+verbs[randomPosition]+".mp3";
        showAudio.play();
    
        first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    
        rightAnswer = verbos[randomPosition];
        lastPosition = lastPosition - 1;
    }else{
        verbsCounter.innerHTML = "0 / " + numberOfVerbs;
        allRightCounter.innerHTML = "Right answers: " + RightAnswersCounter;
        showVerb.innerHTML = "Thank you !"; //Este es el mensaje que muestra una vez finalizado con el juego.
        verbsContainer.innerHTML = ""; //Aqui ocultamos el contenido del juego de los verbos.
    }
}
