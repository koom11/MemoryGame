const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let numFlipped = 0;
let unclickable = false;
let btn = document.querySelector('button');
let clicks = 0;
let numColors = 5;
const resetButton = document.querySelector('#reset-btn')
let COLORS = [];
let card = document.querySelectorAll('.card');



function init(){
  createDivsForColors(shuffledColors);
  reset();
}


resetButton.addEventListener('click', function(){
  reset();
});

function reset(){
  //generate random colors for game
  COLORS = generateRandomColors(numColors);
  for(var i = 0; i < card.length; i++){
    if (COLORS[i]){
      card[i].style.backgroundColor = COLORS[i];
    }
    else{
      card[i].style.display = 'none';
    }
  }  
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  COLORS = generateRandomColors();
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    //newDiv.classList.add(color);
    newDiv.classList.add('card');
    newDiv.style.color = randomColor();

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(unclickable) return;
  if (event.target.classList.contains("flipped")) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if(!card1 || !card2){
    clickedCard.classList.add('flipped');
    card1 = card1 || clickedCard;
    card2 = clickedCard === card1 ? null : clickedCard;
  }

  if(card1 && card2){
    unclickable = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      numFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      unclickable = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        unclickable = false;
      }, 1000);
    }    
    if(numFlipped === COLORS.length) console.log("Game Over!");
  }
}

// when the DOM loads
//createDivsForColors(shuffledColors);


function generateRandomColors(numColors){
  let arr = [];
  //add num random colors to array
  for(var i = 0; i < numColors; i++){
      //get random color and push into array
      arr.push(randomColor());
  }
  //return array
  return arr;
}

function randomColor(){
  //pick a "red" from 0-255
  var r = Math.floor(Math.random() * 256);
  //pick a "blue" from 0-255
  var b = Math.floor(Math.random() * 256);
  //pick a "green" from 0-255
  var g = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

init();