const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const cardSlot = document.getElementById("cardSlot");

let cardImg = [
  "url(../img/1.png)",
  "url(../img/2.png)",
  "url(../img/3.png)",
  "url(../img/4.png)",
  "url(../img/5.png)",
  "url(../img/6.png)",
  "url(../img/7.png)",
  "url(../img/8.png)",
  "url(../img/9.png)",
  "url(../img/10.png)",
  "url(../img/11.png)",
  "url(../img/12.png)",
  "url(../img/13.png)",
  "url(../img/14.png)",
  "url(../img/15.png)",
  "url(../img/16.png)",
  "url(../img/17.png)",
  "url(../img/18.png)",
];
let cardArr = []; //카드 div 자체가 담김 with id
let cardImgArr = []; //랜덤하게 배열된 카드 이미지가 담김
let isFlipped;
let flippedCard = {};

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
      cardNum = 24;
      break;
    case "hard":
      cardNum = 36;
      break;
  }
  for (let i = 0; i < cardNum; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    cardSlot.appendChild(card);

    card.id = i;
    cardArr.push(card);

    switch (cardNum) {
      case 16:
        cardSlot.classList.add("easyWrap");
        card.classList.add("easy");
        cardImgArr = [...cardImg.slice(0, 8), ...cardImg.slice(0, 8)];
        break;
      case 24:
        cardSlot.classList.add("mediumWrap");
        card.classList.add("medium");
        cardImgArr = [...cardImg.slice(0, 12), ...cardImg.slice(0, 12)];
        break;
      case 36:
        cardSlot.classList.add("hardWrap");
        card.classList.add("hard");
        cardImgArr = [...cardImg.slice(0, 18), ...cardImg.slice(0, 18)];
        break;
    }

    card.addEventListener("click", flipCard);
  }
  shuffleCard(cardImgArr);
}

function shuffleCard(arr) {
  arr.sort(() => Math.random() - 0.5);
}

function flipCard(event) {
  const clickedCard = event.target;
  const index = event.target.id;

  if (clickedCard.classList.contains("correct")) {
    console.log("booyah");
  } else {
    clickedCard.style.backgroundImage = cardImgArr[index];

    if (isFlipped !== true) {
      flippedCard = {
        img: clickedCard.style.backgroundImage,
        index: index,
      };
      isFlipped = true;
    } else {
      checkMatch(clickedCard, index);
      isFlipped = false;
    }
  }
}

function checkMatch(clickedCard) {
  setTimeout(() => {
    if (flippedCard.img !== clickedCard.style.backgroundImage) {
      for (let i = 0; i < cardArr.length; i++) {
        if (cardArr[i].id === flippedCard.index) {
          cardArr[i].style.backgroundImage = "url(../img/card.png)";
        }
      }
      flippedCard = { img: "", index: "" };
      clickedCard.style.backgroundImage = "url(../img/card.png)";
    } else {
      clickedCard.classList.add("correct");
      for (let j = 0; j < cardArr.length; j++) {
        if (flippedCard.index === cardArr[j].id) {
          cardArr[j].classList.add("correct");
        }
      }
    }
  }, 700);
}

easyBtn.addEventListener("click", showCard);
mediumBtn.addEventListener("click", showCard);
hardBtn.addEventListener("click", showCard);
