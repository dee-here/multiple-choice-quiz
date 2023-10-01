// get handle to DOM elements
var timeEl = document.querySelector(".time");


// global variables.
var timeLeft = 10;



// object to store question text, options and answer.
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
}

var questionBank = [
 new Question("1", ['a1','b1', 'c', 'd1'], 'd'),
 new Question("2", ['a2','b2', 'c', 'd2'], 'c'),
 new Question("3", ['a3','b3', 'c', 'd3'], 'a'),
 new Question("4", ['a4','b4', 'c', 'd4'], 'b')
];

var questionIndex;

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

      //call method to end game and display other screen to enetr score and initials.
    }
  }, 1000);

}

// end timer section

//score is time remaining on timer !

//get a handle to all elements that need to be modified
// time remaining
// Questions choices and answers.
//

//how to save question, its choices and answers
//create a var object?  or a class and create instances of it?

// fn to start the game
//start button:-> event listener or onClick() starts the game
questionIndex = 0;
 showQuestion();
//display first question
  // generate question section content  with event listeners and data attributes.



// function to generate a text using question index
function displayQuestion() {
  //get a ahndle to dom elemnts that need to be created and appended.
}

//event listners on buttons for answers: data-
//if clicked button isnt matching the correct answer -
// reduce time

//if correct answer

//display if answer was correct or wrong

// check if game needs to contine
//if game ended
// show scores
// take users initial and save score

//fn to display question
function showQuestion() {
  //console.log('showQuestion', questionBank[questionIndex]); 
  // start
  setTimer();
  var currentQuestion = questionBank[questionIndex];
  console.log("currentQuestion", currentQuestion);

  //any more questions left?
  moreQuestions();

  //genegrate the h1 for question text and ul/ol with li for each option
  // add data-attribute
  //event listenerrs on each link to check for click and use data- attribyte to check answers.
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
