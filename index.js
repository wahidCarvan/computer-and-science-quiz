let questionNum = 0;
let score = 0;
//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz () {
  $('.startTheQuiz').on('click', '.startButton', function (event) {
    $('.startTheQuiz').remove();
      printQuestion();
      displayNextQuestion();
      submitClicked();
    $('.content').css('display', 'block');
    $('.questionNum').text(1);
    $('h1').hide();
    $('.quizLogo').hide();
});
}

//generate questions and display them in html format.
function generateQuestion () {
  if (questionNum < QUESTIONS.length) {
    return `<div class="displayQuestions${questionNum}">
    <h2>${QUESTIONS[questionNum].question}</h2>
    		<form role="form" action="#" method ="#">
    <fieldset>
    <legend> Choose One:
    <label class="answerChoice">
        <!-- added required -->
    <input type="radio" value="${QUESTIONS[questionNum].answers[0]}" name="answer" required>
    <span>${QUESTIONS[questionNum].answers[0]}</span>
    </label>
    <label class="answerChoice">
    <input type="radio" value="${QUESTIONS[questionNum].answers[1]}" name="answer">
    <span>${QUESTIONS[questionNum].answers[1]}</span>
    </label>
    <label class="answerChoice">
    <input type="radio" value="${QUESTIONS[questionNum].answers[2]}" name="answer">
    <span>${QUESTIONS[questionNum].answers[2]}</span>
    </label>
    <label class="answerChoice">
    <input type="radio" value="${QUESTIONS[questionNum].answers[3]}" name="answer">
    <span>${QUESTIONS[questionNum].answers[3]}</span>
    </label>
    <br>
    <button type="submit" class="submit">Submit</button>
    </fieldset>
    </form>
    </div>
    </legend>`;
} else {
    displayQuizResults();
    restartQuiz();
    $('.questionNum').text()
  }
}

//increment question number
function incrementQuestion () {
    questionNum ++;
  $('.questionNum').text(questionNum+1);

}

// render question in DOM
function printQuestion () {
  $('.content').html(generateQuestion());
}

//user selects answer on submit run user feedback
function submitClicked () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    console.log('submitClicked');
    let correctAnswer = `${QUESTIONS[questionNum].correctAnswer}`;
    //toLowerCase will not effect the cases
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      selected.parent().addClass('correct');
      ifAnswerCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerWrong();
    }
    $('.nextButton').css('display', 'block');
    $('.nextButton').focus();
  });
}

function ifAnswerCorrect () {
  correctFeedback();
  addToScore();
}

function ifAnswerWrong () {
  wrongFeedback();
}

//displaying feedback for the correct answer.
function correctFeedback () {
  let correctAnswer = `${QUESTIONS[questionNum].correctAnswer}`;
  $('.content').html
  (`<div class="correctFeedback">
    <div class="icon">
    <img src="${QUESTIONS[questionNum].icon}" alt="${QUESTIONS[questionNum].alt}"/>
    </div>
    <p>
    <i>Awesome job, that was correct!</i>
    </p>
    </div>`);
}

//display feedback for the user when the answer is wrong.
function wrongFeedback () {
  let correctAnswer = `${QUESTIONS[questionNum].correctAnswer}`;
  $('.content').html
  (`<div class="correctFeedback">
    <div class="icon">
    <img src="${QUESTIONS[questionNum].icon}" alt="${QUESTIONS[questionNum].alt}"/>
    </div>
    <p>
    <i>No, the correct answer is:</i>
    <br> 
    <span>"${correctAnswer}"</span>
    </p>

    </div>`);
}

//update the score

function addToScore () {
  score +=1;
  $('.score').text(score);
}

//when quiz is over this is the html for the page
function displayQuizResults () {
  if (score >= 8) {
    $('.content').html(`<div class="results correctFeedback">
         <img src="http://images.clipartpanda.com/thank-you-smiley-animated-emot-happydance.gif"
         alt="happy face">
      <p class="final">You scored: ${score} / 10</p><p>You are ready to move on to bigger and better things!</p><button class="restart">Restart Quiz</button></div>`);
} 
  else {
    $('.content').html(`<div class="results correctFeedback"><h2>Some more practice is needed!</h2>
      <img src="http://gifimage.net/wp-content/uploads/2017/06/sad-face-gif-3.gif" alt="sad face">
      <p class="final">You scored: ${score} / 10</p>
      <p>Some more review and you will be a rock star!</p>
      <button class="restart">Restart Quiz</button>
      </div>`);
  }
}

//what happens when the user clicks next
function displayNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    incrementQuestion();
    printQuestion();
    submitClicked();
    $('.nextButton').hide();

  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restart', function (event) {
    location.reload();
   
  });
}
//run quiz functions
function makeQuiz () {
  startQuiz();
}

$(makeQuiz);