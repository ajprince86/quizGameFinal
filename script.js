"use strict";

const game = document.querySelector("#game");
const playerScoreOne = document.querySelector("#scoreOne");
const playerScoreTwo = document.querySelector("#scoreTwo");

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
  console.log("clicked");
  const display = document.createElement("div");
  const buttonOne = document.createElement("button");
  const buttonTwo = document.createElement("button");
  const buttonThree = document.createElement("button");
  const buttonFour = document.createElement("button");
  buttonOne.innerHTML = "mo";
  buttonTwo.innerHTML = "curl";
  buttonThree.innerHTML = "bobby";
  buttonFour.innerHTML = "mark";
  buttonOne.addEventListener("click", getResult);
  buttonTwo.addEventListener("click", getResult);
  buttonThree.addEventListener("click", getResult);
  buttonFour.addEventListener("click", getResult);
  display.innerHTML = this.getAttribute("data-question");
  this.append(display, buttonOne, buttonTwo, buttonThree, buttonFour);

  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.removeEventListener("click", showCard));
}

//==================================

function getResult() {
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", showCard));
  const cardOfButton = this.parentElement;
  if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute("data-value"));
    playerOneScore.innerHTML = score;
    cardOfButton.classList.add("correct_answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong_answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
  }
  cardOfButton.removeEventListener("click", showCard);
}
