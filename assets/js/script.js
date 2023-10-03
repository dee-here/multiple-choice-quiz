// get handle to DOM elements
var timeEl = document.querySelector(".time");
var endScoreEl = document.querySelector("#end-score");
var highScoreListEl = document.querySelector("#highScoreList");
var initialsEl = document.querySelector("#initial");

//handle to different sections
var startScreenEl = document.querySelector("#start-screen");
var questionsScreenEl = document.querySelector("#question-screen");
var endScreenEl = document.querySelector("#end-screen");
var scoreScreenEl = document.querySelector("#score-screen");

//handle to display question
var questionTextEl = document.querySelector("#question-text");
var questionchoicesEl = document.querySelectorAll("#question-choices li");
// var questionTextEl = document.querySelector("#question-text");

// global variables.
var timeLeft = 75;
var score;
//  current question
var questionIndex = 0;

// object to store question text, options and answer.
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
}

var questionBank = [
  new Question(
    "Which HTML element do we put JavaScript in?",
    ["<js>", "<script>", "<javascript>", "<scripting>"],
    "1"
  ),
  new Question(
    "Where is the correct place to insert a JavaScript?",
    ["header", "footer", "main", "body"],
    "3"
  ),
  new Question(
    "How do you write 'Hello World' in an alert box",
    [
      "alert('Hello World')",
      "msgBox('Hello World')",
      "msg('Hello World')",
      "alerttBox('Hello World')",
    ],
    "0"
  ),
  new Question(
    "How to write an IF statement in Javascript",
    ["if(i==5)", "if i = 5 then", "if i == 5 then", "if i = 5"],
    "0"
  ),
  new Question(
    "How do you round the number 7.25, to the nearest integer?",
    ["rnd(7.25)", "round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)"],
    "2"
  ),
  new Question(
    "How do you find the number with the highest value of x and y?",
    ["Math.ceil(x,y)", "Math.max(x,y)", "ceil(x,y)", "top(x,y)"],
    "1"
  ),
  new Question(
    "Which of the following keywords is used to define a variable in Javascript?",
    ["get", "set", "char", "var"],
    "3"
  ),
  new Question(
    "Everything in JavaScript is either a...",
    [
      "primitive or an object",
      "function or an object",
      "trick question",
      "number or object",
    ],
    "0"
  ),
];

// timer !
function setTimer() {
  var timerInterval = setInterval(function () {
    if (moreQuestions() && timeLeft > 0) {
      timeLeft--;
      score = timeLeft;
      timeEl.textContent = "Time: " + timeLeft;
    } else {
      clearInterval(timerInterval);
    }
    if (timeLeft >= 0) {
      timeEl.textContent = "Time: " + timeLeft;
    } else {
      timeEl.textContent = "Dont SHow time!!";
    }

    if (timeLeft === 0) {
      //end game and take user to enter initial and save score.
      clearInterval(timerInterval);
      showEndScreen();
    }
  }, 1000);
}

// end timer section
//score is time remaining on timer !

//fn to display question
function showQuestions() {
  currentQuestion = questionBank[questionIndex];

  if (currentQuestion) {
    createQuestionContent();
  }
}

function createQuestionContent() {
  questionTextEl.textContent = currentQuestion.text;

  for (let i = 0; i < questionchoicesEl.length; i++) {
    questionchoicesEl[i].textContent = currentQuestion.choices[i];
    questionchoicesEl[i].setAttribute("data-choice", i);
  }
}

//call this when showing end-screen
function createEndScreenContent() {
  endScoreEl.textContent = score;
}

function checkAnswer(choice) {
  if (currentQuestion) {
    if (currentQuestion.answer === choice) {
    } else {
      if (timeLeft > 0 && timeLeft - 10 > 0) {
        timeLeft = timeLeft - 10;
      } else {
        timeLeft = 0;
      }
    }
    nextQuestion();

    if (isGameOver()) {
      showEndScreen();
    } else {
      showQuestions();
    }
  } else {
    return;
  }
}

//function to start quiz and display questions
function startQuiz() {
  showQuestionScreen();
  setTimer();
  showQuestions();
}
//fn to get next question
function nextQuestion() {
  questionIndex++;
}

//function to check if there are more questions
function moreQuestions() {
  return questionIndex >= 0 && questionIndex < questionBank.length;
}

//reset question index and other global varibales!
function resetQuiz() {
  questionIndex = 0;
  timeLeft = 75;
  timeEl.textContent = "";
}

//fn to check if end of game
function isGameOver() {
  //if timer ==- 0 or no more questions => Quiz over
  return timeLeft <= 0 || !questionBank[questionIndex];
}

function showNextQuestion() {
  if (moreQuestions()) {
    //move to next question
    questionIndex++;
    showQuestions();
  }
}

//function to toggle visibility
function hideSection(section) {
  section.classList.toggle("hidden");
}

//screens to hide/show
function showStartScreen() {
  startScreenEl.classList.remove("hidden");
  questionsScreenEl.classList.add("hidden");
  endScreenEl.classList.add("hidden");
  scoreScreenEl.classList.add("hidden");
}
function showQuestionScreen() {
  startScreenEl.classList.add("hidden");
  questionsScreenEl.classList.remove("hidden");
  endScreenEl.classList.add("hidden");
  scoreScreenEl.classList.add("hidden");
}
function showEndScreen() {
  createEndScreenContent();
  startScreenEl.classList.add("hidden");
  questionsScreenEl.classList.add("hidden");
  endScreenEl.classList.remove("hidden");
  scoreScreenEl.classList.add("hidden");
}
function showScoresScreen() {
  startScreenEl.classList.add("hidden");
  questionsScreenEl.classList.add("hidden");
  endScreenEl.classList.add("hidden");
  scoreScreenEl.classList.remove("hidden");
  showSavedHighScores();
}

function init() {
  showStartScreen();
}

//start the application
init();

function handleAnswerClicks(li) {
  if (li) {
    checkAnswer(li.getAttribute("data-choice"));
  }
}

function saveHighScore(event) {
  event.preventDefault();
  var savedHighScores;
  savedHighScores = JSON.parse(localStorage.getItem("highScores"));
  if (!savedHighScores) {
    savedHighScores = [];
  }
  var initialsToSave = initialsEl.value.trim();
  savedHighScores.push({ initialsToSave, score });

  localStorage.setItem("highScores", JSON.stringify(savedHighScores));
  //take user to high score screen
  showScoresScreen();
}

function showSavedHighScores() {
  var savedHighScoresArray;
  savedHighScoresArray = JSON.parse(localStorage.getItem("highScores"));
  if (!savedHighScoresArray) {
    savedHighScoresArray = [];
  }

  highScoreListEl.innerHTML = "";
  for (let i = 0; i < savedHighScoresArray.length; i++) {
    var liItem = document.createElement("li");
    liItem.innerHTML = `<span class="label">Initials:</span><span class="value">${savedHighScoresArray[i]?.initialsToSave}</span>
     <span class="label">Score:</span><span class="value">${savedHighScoresArray[i]?.score}</span>`;
    highScoreListEl.appendChild(liItem);
  }
}

function restartQuiz(event) {
  event.preventDefault();
  resetQuiz();
  init();
}

function clearHighScores(event) {
  event.preventDefault();
  localStorage.clear();
  showSavedHighScores();
}
