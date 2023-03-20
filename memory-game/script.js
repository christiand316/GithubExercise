//activeCard = onCardClicked
let clickedCard = null;
let target = null;
let completeCounter = 0;
let waitOnMe = 0;
let timeCounter = 0;
let finalTime= null;
const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "red",
  "yellow",
  "yellow",
  "blue",
  "blue",
  "green",
  "green",
  "purple",
  "purple",
  "pink",
  "pink",
  "orange",
  "orange",
  "white",
  "white",
];

function stopwatch() {
  if (completeCounter == 8) {
    console.log('you win');
    finalTime = timeCounter;
    document.getElementById('timer').innerHTML = 'YOU WON IN ' +finalTime +' SECONDS!';
    clearInterval();
    return;
  } else {
    timeCounter++;
    document.getElementById('timer').innerHTML = timeCounter;
  }
}

setInterval(stopwatch, 1000);

function cardReset() {
  target.className += ' color-hidden'
  clickedCard.className += ' color-hidden'
  clickedCard = null;
  waitOnMe = 0;
}

// known bug: double clicking causes overriding of waitonme?
function handleCardClick(e) {
  
  if (waitOnMe > 0) { // make sure there are no card in cooldown.
    return;
  }
  target = e.currentTarget;
  
  if (target.className.includes('done')) { // dont allow a completed card to be checked(will break completeCounter)
    return;
  }
   
  target.className = target.className.replace('color-hidden', '');
  
  if (!clickedCard) {
  clickedCard = target;
  } else if (clickedCard) {
    if(clickedCard.getAttribute('data-color') === target.getAttribute('data-color')) {
      clickedCard.className += ' done';
      target.className += ' done';
      clickedCard = null;
      completeCounter++;
    } else {
      waitOnMe = 1; // prevent another card to be checked for
      setTimeout(cardReset, 1000)
    }
  }
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

//creation of cards
let rowI = 1;
let indexCounter=0;
let addMe = document.getElementById('row'+rowI);
console.log(addMe);
function createDivsForColors(colorArray) {
  
  for (let color of colorArray) {
  const newDiv = document.createElement("div");
    
  if (indexCounter === 4) {
    indexCounter = 0
    rowI++;
    addMe = document.getElementById('row'+rowI);
  } 

  newDiv.classList.add('card');
  newDiv.classList.add(color);
  newDiv.classList.add('color-hidden');
  newDiv.setAttribute('data-color', color);
  newDiv.addEventListener("click", handleCardClick);

  addMe.append(newDiv)
  indexCounter++;
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

