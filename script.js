const typingText = document.querySelector(".typing-text p");
const tryAgain = document.querySelector(".again");
const mistakeTag = document.querySelector(".mistakes span");
const timeTag = document.querySelector(".time span");
const wpmTag = document.querySelector(".wpm span");
const input = document.querySelector(".container #input");
let charIndex = 0;
let startFirst = false;
let completed = false;
let Correct = true;
let timesec = 0;
let timer;
let wpm = 0;
let mistakes = 0;
input.value = "";
// Loading Random Para
function randomPara() {
  let index = Math.floor(Math.random() * paragraphs.length);
  paragraphs[index].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelector("span").classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  document.addEventListener("click", () => input.focus());
}
// Timing Function
function beginTimer() {
  timesec++;
  timeTag.innerHTML = `${timesec}s`;
}

function initTyping(e) {
  const characters = typingText.querySelectorAll("span");
  let typedCharArr = input.value.split("");
  if (!startFirst) {
    timer = setInterval(beginTimer, 1000);
    startFirst = true;
  }
  console.log(completed)
  if(!completed){
    if (typedCharArr.length - 1 > characters.length - 1) {
      charIndex = characters.length - 1;
    } 
    else {
        charIndex = typedCharArr.length - 1;
    }
    // If input is empty then typedCharArr would be 0 and charIndex would become -1
    // because charIndex = typedCharArr.length - 1, So to solve this bug i used 
    // conditonal Statment 
    // ${charIndex === -1?0:charIndex}
    if (characters[`${charIndex === -1?0:charIndex}`].innerText == typedCharArr[charIndex]) {
      characters[`${charIndex === -1?0:charIndex}`].classList.add("correct");
    } else {
      characters[`${charIndex === -1?0:charIndex}`].classList.add("incorrect");
      mistakes++;
    }
    // For Removing Classes from spans after backsapce is pressed
    characters.forEach((span, index) => {
      // All Spans having index less than charIndex would retain their classes
      if (index > charIndex) {
        span.classList.remove("correct", "incorrect");
      }
    });

    // Checking whether All Span are correct
  for(let i=0; i< characters.length;i++){
    if(characters[i].classList.contains("correct")){
      completed = true;
    }
    else{
      console.log("All are not correct")
      completed = false;
    }
  }

    // Removing All Active Classes
    characters.forEach((span) => {
      span.classList.remove("active");
    });
    // Adding Active Class to the next span of charIndex
    characters[`${charIndex === characters.length-1?charIndex:charIndex+1}`].classList.add("active");
    mistakeTag.innerHTML = mistakes;
    wpm = Math.round(((charIndex / 5)/`${timesec=== 0?1:timesec}`)*60)
    wpmTag.innerHTML = wpm;
  }

  else{
    alert(`Game Completed in ${timesec}s with ${wpm} WPM`);
    ResetGame();
  }
}
function ResetGame() {
  input.value = "";
  typingText.innerText = "";
  randomPara();
  (charIndex = 0), (mistakes = 0), (timesec = 0);
  mistakeTag.innerHTML = 0;
  wpmTag.innerHTML = 0;
  completed = false;
}

randomPara();
input.addEventListener("input", initTyping);
tryAgain.addEventListener("click", ResetGame);
