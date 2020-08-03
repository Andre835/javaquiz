const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreDiv = document.getElementById('score')
var score = 0
scoreDiv.innerHTML = "score" + score
//var deadline = new Date("dec 31, 2020 15:37:25").getTime(); 

function tim() {var t = 20

  var x = setInterval(function () {
    var now = new Date().getTime();
    //var t = deadline - now;  
    var minutes = Math.floor(t / 60);
  
    var seconds = t % 60
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;
    
    t--
    if (t <= 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "TIME UP";
      document.getElementById("minute").innerHTML = '0';
      document.getElementById("second").innerHTML = '0';
      questionElement.innerText = "Your Game Is Over"
      answerButtonsElement.innerText = ""
      startButton.classList.remove('hide')
      nextButton.classList.add('hide')
  
    }
  }, 1000);
console.log("This will be my timer")

}




let shuffledQuestions, currentQuestionIndex
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

  
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function startGame() {
  var score = 0
  tim()
  scoreDiv.innerHTML = "score" + score
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
      /*
        <button class="btn" data-correct="true">[answer text goes here]</button>
      */
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
function selectAnswer(e) {
  console.log(e.target)
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  console.log(selectedButton, correct)
  if (correct == "true") {
    score = score + 1
    scoreDiv.innerHTML = "score" + score
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  //if ()
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
const questions = [
  {
    question: 'What year was Corvettes first body change?',
    answers: [
      { text: '1963', correct: true },
      { text: '1962', correct: false }
    ]
  },
  {
    question: 'Where is the Corvette National Museum?',
    answers: [
      { text: 'Bowling Green, Kentucky', correct: true },
      { text: 'Atlanta, Georgia', correct: false },
      { text: 'Detroit, Michigan', correct: false },
      { text: 'New York, New York', correct: false }
    ]
  },
  {
    question: 'What year was the Stingray introduced?',
    answers: [
      { text: '1960', correct: false },
      { text: '1963', correct: true },
      { text: '1971', correct: false },
      { text: '1965', correct: false }
    ]
  },
  {
    question: 'In 1967 what was the largest engine available?',
    answers: [
      { text: '396', correct: false },
      { text: '427', correct: true }
    ]
  }
]





