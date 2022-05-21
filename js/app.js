const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const cardSlot = document.getElementById("cardSlot");

let cardImg = [];

function showCard(event) {
  const difficulty = document.getElementById("difficulty");
  const mode = event.target.id;
  difficulty.style.display = "none";
  cardSlot.style.display = "grid";

  let cardNum;

  switch (mode) {
    case "easy":
      cardNum = 16;
      break;
    case "medium":
      cardNum = 25;
      break;
    case "hard":
      cardNum = 36;
      break;
  }
  for (let i = 0; i < cardNum; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    cardSlot.appendChild(card);

    switch (cardNum) {
      case 16:
        cardSlot.classList.add("easyWrap");
        card.classList.add("easy");
        break;
      case 25:
        cardSlot.classList.add("mediumWrap");
        card.classList.add("medium");
        break;
      case 36:
        cardSlot.classList.add("hardWrap");
        card.classList.add("hard");
        break;
    }
  }
  addCardImg(mode);
}

function addCardImg(mode) {
  console.log(mode);
}

easyBtn.addEventListener("click", showCard);
mediumBtn.addEventListener("click", showCard);
hardBtn.addEventListener("click", showCard);
