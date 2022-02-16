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
        card.setAttribute("data-wrong", data.results[0].incorrect_answers[0]);
        card.setAttribute("data-wrong", data.results[0].incorrect_answers[1]);
        card.setAttribute("data-wrong", data.results[0].incorrect_answers[2]);
        card.setAttribute("data-correct", data.results[0].correct_answer);

        card.setAttribute("data-value", card.getInnerHTML());
      });
  });
}

categories.forEach((genre) => addCategorie(genre));
