let sec = document.querySelector("#timer > p");
let toggle;

function setTimer(event) {
  const difficulty = event.target.id;
  switch (difficulty) {
    case "easy":
      sec.innerText = 40;
      break;
    case "normal":
      sec.innerText = 70;
      break;
    case "hard":
      sec.innerText = 90;
      const timerWrap = document.getElementById("timer");
      timerWrap.style.top = "80px";
      break;
  }
  startTimer();
}

function startTimer() {
  const timer = setInterval(() => {
    sec.innerText--;
    let secNum = parseInt(sec.innerText);
    secNum < "5" ? (sec.style.color = "red") : null;

    const check = setInterval(() => {
      if (sec.innerText === "0") {
        showResult("lose");
        clearInterval(timer);
        clearInterval(check);
      } else if (toggle === "on") {
        clearInterval(timer);
        clearInterval(check);
      }
    }, 1000);
  }, 1000);
}

easyBtn.addEventListener("click", setTimer);
normalBtn.addEventListener("click", setTimer);
hardBtn.addEventListener("click", setTimer);
