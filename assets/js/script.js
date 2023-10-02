// get handle to DOM elements
var timeEl = document.querySelector(".time");

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

// object to store question text, options and answer.
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
}

var questionBank = [
  new Question("Q:1", ["a1", "b1", "c1", "d1"], "0"),
  new Question("Q:2", ["a2", "b2", "c2", "d2"], "1"),
  new Question("Q:3", ["a3", "b3", "c3", "d3"], "2"),
  new Question("Q:4", ["a4", "b4", "c4", "d4"], "3"),
  new Question("Q:5", ["a5", "b1", "c5", "d5"], "0"),
  new Question("Q:6", ["a6", "b2", "c6", "d6"], "1"),
  new Question("Q:7", ["a7", "b3", "c7", "d7"], "2"),
  new Question("Q:8", ["a8", "b4", "c8", "d8"], "3"),
];

//  current question
var questionIndex = 0;
var currentQuestion = questionBank[questionIndex];

// timer !

function setTimer() {
  var timerInterval = setInterval(function () {
    console.log(`STarting time: ${timeLeft}`);
    timeLeft--;

    timeEl.textContent = "Time: " + timeLeft;

    if (timeLeft === 0) {
      //end game and take user to enter initial and save score.
      console.log("GAME ended as Timer = 0 !!");
      clearInterval(timerInterval);
      //testing game end screen!
      //do things for ending game!!
      showEndScreen();

      //call method to end game and display other screen to enetr score and initials.
    }
  }, 1000);
}

// end timer section
//score is time remaining on timer !

//fn to display question
function showQuestions() {
  console.log("currentQuestion", currentQuestion);
  currentQuestion = questionBank[questionIndex];
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

function checkAnswer(choice) {
  console.log(currentQuestion.answer === choice);
  //return currentQuestion.answer === choice;

  if(currentQuestion.answer === choice) {
    //continue game and show next questions
    console.log("correct answer!");
  } else {
    console.log("WRONG answer!");
    timeLeft = timeLeft - 5;
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
  return questionIndex >= 0 && questionIndex < (questionBank.length -1);
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

//screens to hide/show
function showStartScreen() {
  hideSection(startScreenEl);
}
function showQuestionScreen() {
  hideSection(startScreenEl);
  hideSection(questionsScreenEl);
}
function showEndScreen() {
  hideSection(questionsScreenEl);
  hideSection(endScreenEl);
}
function showScoresScreen() {
  hideSection(endScreenEl);
  hideSection(scoreScreenEl);
}

//start the code
init();


function handleAnswerClicks(li) {
  console.log("handling click for!! : ", li.getAttribute("data-choice"));
  checkAnswer(li.getAttribute("data-choice"));
  // pass the data choice :check answer here 
  }
  

//psuedo code:
//get a handle to all elements that need to be modified
// time remaining
// Questions choices and answers.
//

//how to save question, its choices and answers
//create a var object?  or a class and create instances of it?

// fn to start the game
//start button:-> event listener or onClick() starts the game
// questionIndex = 0;
//showQuestion();
//display first question
// generate question section content  with event listeners and data attributes.

// function to generate a text using question index
// function displayQuestion() {
//   //get a ahndle to dom elemnts that need to be created and appended.
//   //have a handle to the element  change the html text content.
//   console.log("displayQuestion");

// }

//event listners on buttons for answers: data-
//if clicked button isnt matching the correct answer -
// reduce time

//if correct answer

//display if answer was correct or wrong

// check if game needs to contine
//if game ended
// show scores
// take users initial and save score
