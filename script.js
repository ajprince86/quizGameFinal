"use strict";

const game = document.querySelector("#game");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const playerOne = document.querySelector(".player--1"); //section for p1
const playerTwo = document.querySelector(".player--2"); //section for p2
const playerOneScore = document.querySelector("#score-1"); //score p1
const playerTwoScore = document.querySelector("#score-2"); // score p2
let score = 0;
const playerScoreTwo = document.querySelector("#scoreTwo");

let scores = 0;
let activePlayer;
let playing;

//==========STARTING THE GAME=========//
// const startGame = function () {
//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;
//   playerOneScore.textContent = 0;
//   playerTwoScore.textContent = 0;
//   playerOne.classList.remove("player--winner");
//   playerTwo.classList.remove("player--winner");
//   playerOne.classList.add("player--active");
//   playerTwo.classList.remove("player--active");
//   //Did not add current.textcontent
// };

const switchPlayer = function () {
  playerOne.classList.remove("player--active");
  playerTwo.classList.add("player--active");
};
switchPlayer();

const categories = [
  {
    name: "Sports",
    id: 21,
  },
  {
    name: "Video Games",
    id: 15,
  },
  {
    name: "Geography",
    id: 22,
  },

  {
    name: "Celebraties",
    id: 26,
  },
];

const levels = ["easy", "medium", "hard"];

function addCategorie(categorie) {
  const column = document.createElement("div");
  column.classList.add("categories_column");
  column.innerHTML = categorie.name;
  game.appendChild(column);
  console.log(column);
  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);
    if (level === "easy") {
      card.innerHTML = 200;
    } else if (level === "medium") {
      card.innerHTML = 400;
    } else {
      card.innerHTML = 600;
    }
    fetch(
      `https://opentdb.com/api.php?amount=1&category=${categorie.id}&difficulty=${level}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-wrong-0", data.results[0].incorrect_answers[0]);
        card.setAttribute("data-wrong-1", data.results[0].incorrect_answers[1]);
        card.setAttribute("data-wrong-2", data.results[0].incorrect_answers[2]);
        card.setAttribute("data-correct", data.results[0].correct_answer);

        card.setAttribute("data-value", card.getInnerHTML());
      })
      .then((done) => card.addEventListener("click", showCard));
  });
}

categories.forEach((genre) => addCategorie(genre));

function showCard() {
  console.log(this);
  console.log(this.innerHTML);
  this.innerHTML = ``;
  this.style.fontSize = this.style.fontSize = `18px`;
  console.log("clicked");
  const display = document.createElement("div");
  const buttonOne = document.createElement("button");
  const buttonTwo = document.createElement("button");
  const buttonThree = document.createElement("button");
  const buttonFour = document.createElement("button");
  buttonOne.innerHTML = this.getAttribute("data-wrong-0");
  buttonTwo.innerHTML = this.getAttribute("data-wrong-1");
  buttonThree.innerHTML = this.getAttribute("data-wrong-2");
  buttonFour.innerHTML = this.getAttribute("data-correct");
  buttonOne.addEventListener("click", getResult);
  buttonTwo.addEventListener("click", getResult);
  buttonThree.addEventListener("click", getResult);
  buttonFour.addEventListener("click", getResult);
  display.innerHTML = this.getAttribute("data-question");
  this.append(display, buttonOne, buttonTwo, buttonThree, buttonFour);

  const allCards = Array.from(document.querySelectorAll(".card")); //Grab all the div cards.
  allCards.forEach((card) => card.removeEventListener("click", showCard)); //remove the event listener for the other cards once one has already been clicked.
}

//==================================

function getResult() {
  //Giving the ability to select other boxes once a result has happened
  //For each card I added the event listener back into each div/card

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", showCard));
  //   const allCards = Array.from(document.querySelectorAll(".card"));
  //   allCards.forEach((card) => card.addEventListener("click", showCard));
  const cardOfButton = this.parentElement; // card of button is equal to the parent element of the button that is clicked which is the card div
  console.log(cardOfButton); // the card div
  if (cardOfButton.getAttribute("data-correct") === this.innerHTML) {
    console.log(`Correct My guy`);
    // score = score + parseInt(cardOfButton.getAttribute("data-value")); // add points to score based on the value of the question
    score += parseInt(cardOfButton.getAttribute("data-value")); // if you got the correct answer we are adding the data-value attribute for that question into the score total.
    playerOneScore.innerHTML = score;
    cardOfButton.classList.add("correct_answer");
    console.log(cardOfButton.firstChild); // checking for first child which is display 200
    //How to stop the correct answer from being pressed multiple times?
    setTimeout(() => {
      //if the div card has a first child please remove the last child of the card div

      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      //outside the while loop the card button will display the value of the question
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    console.log("wrong");
    score -= parseInt(cardOfButton.getAttribute("data-value")); // subtracting same value if incorrect
    playerOneScore.innerHTML = score;
    cardOfButton.classList.add("wrong_answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
  }
  cardOfButton.removeEventListener("click", showCard);
  console.log(allCards);
}
