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
 new Question("1", ['a1','b1', 'c', 'd1'], 0),
 new Question("2", ['a2','b2', 'c', 'd2'], 1),
 new Question("3", ['a3','b3', 'c', 'd3'], 2),
 new Question("4", ['a4','b4', 'c', 'd4'], 3),
 new Question("1123", ['a1','b1', 'c', 'd1'], 0),
 new Question("2123", ['a2','b2', 'c', 'd2'], 1),
 new Question("3231", ['a3','b3', 'c', 'd3'], 2),
 new Question("423", ['a4','b4', 'c', 'd4'], 3)
];

//  current question
var questionIndex = 0;
var currentQuestion = questionBank[questionIndex];

// timer !


function setTimer() {

  var timerInterval = setInterval(function() {
    console.log(`STarting time: ${timeLeft}`);
    timeLeft--;

    timeEl.textContent = "Time: " + timeLeft;

    if(timeLeft === 0) {
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
  //console.log('showQuestion', questionBank[questionIndex]); 
  // start
  // setTimer();

  // showQuestionScreen();

  console.log("currentQuestion", currentQuestion);

  //any more questions left?
  moreQuestions();
  createQuestionContent();

  //genegrate the h1 for question text and ul/ol with li for each option
  // add data-attribute
  //event listenerrs on each link to check for click and use data- attribyte to check answers.
}

function createQuestionContent() {
  console.log("questionTextEl: ", questionTextEl);
  questionTextEl.textContent = currentQuestion.text;

  console.log("questionchocicesEl: ", questionchoicesEl);
  for(i=0; i< questionchoicesEl.length; i++){
    questionchoicesEl[i].textContent = currentQuestion.choices[i];
    questionchoicesEl[i].setAttribute('data-choice', i);

    //we should add check answers on each li element as a listeners for click !
    // questionchoicesEl[i].addEventListener('click', checkAnswer);

    questionchoicesEl[i].addEventListener('click', function(event) {
      console.log("questionchoicesEl clicked is: ", event.target.getAttribute('data-choice'));
      console.log("clicked target is: ", event.target);
      checkAnswer(event.target.getAttribute('data-choice'));
     // checkAnswer(questionchoicesEl[i]);
    });

    //checkAnswer(questionchoicesEl[i]);
  }
}

// function checkAnswer(liEl) {
//   console.log("checkAnswer : ", liEl);
//   console.log(liEl.getAttribute('data-choice'));
//   console.log("checkAnswer : ", currentQuestion.answer);

// }

function checkAnswer(choice) {
  console.log("checkAnswer : ", choice, currentQuestion.answer);
  //console.log(liEl.getAttribute('data-choice'));
  //check for triple!! or convert to same type!
  console.log("checkAnswer : ", currentQuestion.answer == choice);

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
  console.log('moreQuestions: ', questionIndex >= 0 && questionIndex < questionBank.length);
  return (questionIndex >= 0 && questionIndex < questionBank.length);
}

//reset question index
function  resetQuestions() {
  questionIndex = 0;
}


//fn to check if end of game
function isGameOver() {
  //if timer ==- 0 or no more questions => Quiz over
}

//fn to display that game has ended and display users score!
// fn to get user initials and save it with score

//display saved high scores when user clicks on display high scores


//fn to check answer maybe data attriobute of waht was clicked and match it with currentquestion.answer.

function init() {
  console.log("Start game clicked !! nothing should happen in iniit");
  // setTimer();
  showStartScreen();
  resetQuestions();
  var currentQuestion = questionBank[questionIndex];
  console.log("currentQuestion", currentQuestion);

  // showStartScreen();
  //Time should be set after user clicks on start
  // setTimer();

}

//when start button is clicked: setTimer, and start displaying questions

//function to hide screens
function hideSection(section) {
  //DOM handle to element passed here
 //console.log("about to hide: ", section);
  section.classList.toggle('hidden');
  //section.classList.add('hidden');
  // cons
}

//screens to hide/show
function showStartScreen() {
  hideSection(startScreenEl);
  //should we check if its already and then do these?
  //hideSection(questionsScreenEl);
  // hideSection(endScreenEl);
  // hideSection(scoreScreenEl);
}
function showQuestionScreen() {
  hideSection(startScreenEl);
  hideSection(questionsScreenEl);
  // hideSection(endScreenEl);
  // hideSection(scoreScreenEl);
}
function showEndScreen() {
  // hideSection(startScreenEl);
  hideSection(questionsScreenEl);
  hideSection(endScreenEl);
}
function showScoresScreen() {
  // hideSection(startScreenEl);
  // hideSection(questionsScreenEl);
  hideSection(endScreenEl);
  hideSection(scoreScreenEl);
}


//start the code
init();








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