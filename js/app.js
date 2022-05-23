const easyBtn = document.getElementById("easy");
const normalBtn = document.getElementById("normal");
const hardBtn = document.getElementById("hard");
const cardSlot = document.getElementById("cardSlot");
const retryBtn = document.getElementById("retry");

let cardImg = [
  /* "url(../img/1.png)",
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
  "url(../img/18.png)", */
  "url(img/1.png)",
  "url(img/2.png)",
  "url(img/3.png)",
  "url(img/4.png)",
  "url(img/5.png)",
  "url(img/6.png)",
  "url(img/7.png)",
  "url(img/8.png)",
  "url(img/9.png)",
  "url(img/10.png)",
  "url(img/11.png)",
  "url(img/12.png)",
  "url(img/13.png)",
  "url(img/14.png)",
  "url(img/15.png)",
  "url(img/16.png)",
  "url(img/17.png)",
  "url(img/18.png)",
];
let cardArr = [];
let cardImgArr = [];
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
    case "normal":
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
        cardSlot.classList.add("normalWrap");
        card.classList.add("normal");
        cardImgArr = [...cardImg.slice(0, 12), ...cardImg.slice(0, 12)];
        break;
      case 36:
        cardSlot.classList.add("hardWrap");
        card.classList.add("hard");
        cardImgArr = [...cardImg.slice(0, 18), ...cardImg.slice(0, 18)];
        break;
    }
    card.addEventListener(
      "click",
      (event) => (event.target.style.transform = "rotateY(180deg)")
    );
    card.addEventListener("click", flipCard);
    card.addEventListener("click", onSuccess);
  }
  shuffleCard(cardImgArr);
}

function flipCard(event) {
  const clickedCard = event.target;
  const index = event.target.id;

  clickedCard.style.backgroundImage = cardImgArr[index];

  if (!clickedCard.classList.contains("correct")) {
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
  if (flippedCard.img !== clickedCard.style.backgroundImage) {
    for (let i = 0; i < cardArr.length; i++) {
      if (cardArr[i].id === flippedCard.index) {
        setTimeout(() => {
          //cardArr[i].style.backgroundImage = "url(../img/cardback.png)";
          cardArr[i].style.backgroundImage = "url(img/cardback.png)";
          cardArr[i].style.transform = `rotateY(-180deg)`;
        }, 600);
      }
    }
    flippedCard = { img: "", index: "" };
    setTimeout(() => {
      //clickedCard.style.backgroundImage = "url(../img/cardback.png)";
      clickedCard.style.backgroundImage = "url(img/cardback.png)";
      clickedCard.style.transform = `rotateY(-180deg)`;
    }, 600);
  } else {
    clickedCard.classList.add("correct");
    for (let j = 0; j < cardArr.length; j++) {
      flippedCard.index === cardArr[j].id
        ? cardArr[j].classList.add("correct")
        : null;
    }
  }
}

function shuffleCard(arr) {
  arr.sort(() => Math.random() - 0.5);
}

function onSuccess() {
  const cards = document.getElementsByClassName("card");
  let counter = 0;
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.contains("correct") ? counter++ : null;
  }
  counter === cards.length ? showResult("win") : null;
}

function showResult(winLose) {
  const result = document.getElementById("result");
  const resultText = result.querySelector("h2");
  result.style.display = "block";
  cardSlot.style.display = "none";
  sec.style.display = "none";

  if (winLose === "win") {
    toggle = "on";
    resultText.innerText = "You Win! 🎉";
  } else {
    resultText.innerText = "Time's Up!";
    resultText.classList.add("timesUp");
  }
}

easyBtn.addEventListener("click", showCard);
normalBtn.addEventListener("click", showCard);
hardBtn.addEventListener("click", showCard);
retryBtn.addEventListener("click", () => location.reload());
