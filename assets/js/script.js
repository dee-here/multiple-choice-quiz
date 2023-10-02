// get handle to DOM elements
var timeEl = document.querySelector(".time");
var endScoreEl = document.querySelector("#end-score");

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
var timeLeft = 30;
var score;
//  current question
var questionIndex = 0;
//var currentQuestion = questionBank[questionIndex];


// object to store question text, options and answer.
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
}

var questionBank = [
  new Question("Inside which HTML element do we put the JavaScript?", ["<js>", "<script>", "<javascript>", "<scripting>"], "1"),
  new Question("Where is the correct place to insert a JavaScript?", ["header", "footer", "main", "body"], "3"),
  new Question("How do you write 'Hello World' in an alert box", ["alert('Hello World')", "msgBox('Hello World')", "msg('Hello World')", "alerttBox('Hello World')"], "0"),
  new Question("How to write an IF statement in Javascript", ["if(i==5)", "if i = 5 then", "if i == 5 then", "if i = 5"], "0"),
  new Question("How do you round the number 7.25, to the nearest integer?", ["rnd(7.25)", "round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)"], "2"),
  new Question("How do you find the number with the highest value of x and y?", ["Math.ceil(x,y)", "Math.max(x,y)", "ceil(x,y)", "top(x,y)"], "1"),
  new Question("Which of the following keywords is used to define a variable in Javascript?", ["get", "set", "char", "var"], "3"),
  new Question("Everything in JavaScript is either a...", ["primitive or an object", "function or an object", "trick question", "number or object"], "0"),
];


// timer !

function setTimer() {
  var timerInterval = setInterval(function () {
    console.log(`STarting time: ${timeLeft}`);
    if(moreQuestions() && timeLeft > 0) {
      timeLeft--;
      score = timeLeft;
      timeEl.textContent = "Time: " + timeLeft;
    } else {
      console.log(`STarting time: ${timeLeft}`);
      timeEl.textContent = "Score: " + score;
      clearInterval(timerInterval);
    }

    console.log('score is: ', score);

    timeEl.textContent = "Time: " + timeLeft;

    if (timeLeft === 0) {
      //end game and take user to enter initial and save score.
      console.log("GAME ended as Timer = 0 !!");
      clearInterval(timerInterval);
      //testing game end screen!
      //do things for ending game!!
      //only show end screen if its hidden and has the class !
      showEndScreen();

      //call method to end game and display other screen to enetr score and initials.
    }
  }, 1000);
}

// end timer section
//score is time remaining on timer !

//fn to display question
function showQuestions() {
  currentQuestion = questionBank[questionIndex];
  console.log("currentQuestion", currentQuestion);
  //any more questions left?
  //moreQuestions() then create question
  if(currentQuestion) {
    createQuestionContent();
  }

  //genegrate the h1 for question text and ul/ol with li for each option
  // add data-attribute
  //event listenerrs on each link to check for click and use data- attribyte to check answers.
}

function createQuestionContent() {
  questionTextEl.textContent = currentQuestion.text;

  for (let i = 0; i < questionchoicesEl.length; i++) {
    questionchoicesEl[i].textContent = currentQuestion.choices[i];
    questionchoicesEl[i].setAttribute("data-choice", i);

    // remove listener use onAnswerClick fn!
    // questionchoicesEl[i].addEventListener("click", function (event) {
    //   checkAnswer(event.target.getAttribute("data-choice"));
    // });
  }
}

//create End game screen.
//call this when showing end-screen
function createEndScreenContent()  {
  //timeEl.textContent = "Time: " + timeLeft;
  endScoreEl.textContent = score;
}

function checkAnswer(choice) {

  //return currentQuestion.answer === choice;

  if(currentQuestion && currentQuestion.answer === choice) {
    //continue game and show next questions
    console.log(currentQuestion.answer === choice);
    console.log("correct answer!");
  } else {
    console.log("WRONG answer!");
    if(timeLeft > 0 && (timeLeft -10) > 0) {
      timeLeft = timeLeft - 10;
    } else {
      timeLeft = 0;
    }
    // timeLeft = timeLeft - 5;
  }
  if(!isGameOver()) {
    nextQuestion();
    showQuestions();
  } else {
    console.log("Game over ");
    showEndScreen();

  }

}

//function to start quiz and display questions
function startQuiz() {
  console.log("startting quiz!!");
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
  return (questionIndex >= 0 && questionIndex < (questionBank.length));
}

//reset question index and other global varibales!
function resetQuiz() {
  questionIndex = 0;
  timeLeft = 30;
}

//fn to check if end of game
function isGameOver() {
  //if timer ==- 0 or no more questions => Quiz over
  console.log("is game over: ", timeLeft <= 0 || !moreQuestions());
  return (timeLeft <= 0 || !moreQuestions());
}

function showNextQuestion() {
  if(moreQuestions()) {
    //move to next question
    questionIndex++;
    showQuestions();

  }

}

//fn to display that game has ended and display users score!
// fn to get user initials and save it with score

//display saved high scores when user clicks on display high scores

//fn to check answer maybe data attriobute of waht was clicked and match it with currentquestion.answer.

function init() {
  console.log("Start game !! nothing should happen in iniit");
  // resetQuiz();
  showStartScreen();
  // var currentQuestion = questionBank[questionIndex];
  // console.log("currentQuestion", currentQuestion);
}

//function to hide screens
function hideSection(section) {
  section.classList.toggle("hidden");
}
//function to toggle display of sections
function toggleDisplayOfSection(section) {
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
}

//start the code
init();


function handleAnswerClicks(li) {
  console.log("handling click for!! : ", li.getAttribute("data-choice"));
  checkAnswer(li.getAttribute("data-choice"));
  // pass the data choice :check answer here 
  }


// function getCssClasses(id) {
//   console.log("id to hide/show : ", id, id.classList);
// }

// function isElementHidden(id) {
// if(getCssClasses(id).includes('hidden')){
//   console.log(" id: ", id, " is Hidden!!");
// } else {
//   console.log(console.log(" id: ", id, " is NOT HIDDEN!!"));
// }
// }
// function removeHiddenClassName(id) {
//   console.log(isElementHidden(id));
//   id.classList.remove('hidden');
//   console.log();
// }
  