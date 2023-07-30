let sentenceList = [];
const sentenceDisplayElement = document.getElementById('sentenceDisplay1');
const sentenceInputElement = document.getElementById('sentenceInput1');
const countdownElement = document.getElementById('countdown1');
const characterPMElement = document.getElementById('CPM1');
let correctLetters = [];
let correctWords = [];
let randomIndex = 0;
let CPM = 0;
parseInt(CPM);
const replayButton = document.getElementById("replayBtn");

let time = 30;
let interval;

let count = 0;
let correctCount = 0;
let wordCount = -1;
let inputEventCount = 0;

let timePassed;
parseInt(CPM);
function updateCountdown() {
  const minutes = Math.floor(time / 60)
  let second = time % 60
  countdownElement.innerHTML = second + " sec"
  timePassed = 30 - second;
  if (time > 0) {
    time--;
    replayButton.classList.add("is-hidden")
  } else {
    clearInterval(interval);
    console.log("game ended");
    replayButton.classList.remove("is-hidden")
    console.log(CPM);
    CPM = correctCount * 2;
    characterPMElement.innerHTML = "CPM (characters per minute): " + CPM;
  }
}

async function loadSentence() {
  try {
    sentenceList = await logFileText('paragraph.txt');
    randomIndex = Math.floor(Math.random() * sentenceList.length);
    correctLetters = sentenceList[randomIndex].split('');
    correctWords = sentenceList[randomIndex].split(' ');
    console.log(correctWords);
    while (correctLetters[0] === " ") {
      correctLetters.splice(0, 1);
    }
    console.log(correctLetters);
    for (let i = 0; i < correctLetters.length; i++) {
      if (correctLetters[i] === " ") {
        sentenceDisplayElement.insertAdjacentHTML("beforeend", `<p class="letter"  id="${i.toString()}">&nbsp;</p>`)
      }
      else {
        sentenceDisplayElement.insertAdjacentHTML("beforeend", `<p class="letter" id="${i.toString()}">${correctLetters[i]}</p>`)
      }
    }
  }
  catch (e) {
    return "caught";
  }
}

window.addEventListener('load', async (event) => {
  loadSentence();
});

async function logFileText(file) {
  const response = await fetch(file);
  const text = await response.text();
  const sentenceListCreated = text.split('.');
  for (let i = 0; i < sentenceListCreated.length; i++) {
    sentenceListCreated[i] = sentenceListCreated[i].replace(/[\r\n]/gm, ' ')
  }
  return sentenceListCreated;
}


sentenceInputElement.addEventListener('input', (e) => {
  const inputCharactersArray = sentenceInputElement.value.split('')
  inputLength = inputCharactersArray.length;
  inputEventCount++;
  if (inputEventCount === 1) {
    interval = setInterval(updateCountdown, 1000);
    time = 29;
  }
  console.log(count);

  const displayCharactersArray = sentenceDisplayElement.querySelectorAll('span');
  while (count < inputLength) {
    console.log("correct: " + correctLetters[count]);
    console.log("input: " + inputCharactersArray[count]);
    if (correctLetters[count] === inputCharactersArray[count]) {
      console.log("correct for index: " + count);
      correctCount++;
      const letter = document.getElementById(count);
      letter.style.color = "green";
      letter.style.fontWeight = "bold"
    } else {
      console.log("incorrect for index: " + count);
      const letter = document.getElementById(count);
      letter.style.color = "red";
      letter.style.fontWeight = "bold"
    }
    count++;
  }
  if (count >= correctLetters.length) {
    console.log("game ended");
    clearInterval(interval);
    console.log(timePassed);
    parseInt(timePassed);
    parseInt(correctCount);
    CPM = (60 / timePassed) * correctCount;
    parseInt(CPM);
    console.log(CPM);
    characterPMElement.innerHTML = "CPM (characters per minute): " + CPM;
    replayButton.classList.remove("is-hidden")
  }
});

replayButton.addEventListener("click", (e) => {
  countdownElement.innerHTML = 30 + " sec"
  characterPMElement.innerHTML = "CPM (characters per minute): " + 0;
  inputEventCount = 0;
  correctCount = 0;
  removeAllChildNodes(sentenceDisplayElement);
  sentenceInputElement.value = "";
  loadSentence();
  count = 0;
  wordCount = -1;
  replayButton.classList.add("is-hidden");
})

let backspaceCount = 0;
sentenceInputElement.addEventListener("keydown", (e) => {
  const key = e.key; // const {key} = event; ES6+
  if (backspaceCount >= 0) {
    if (key === "Backspace") {
      console.log("backspace");
      count--;
      console.log("backspace: " + count);
    }
  }
})

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
