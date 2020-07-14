const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

let currentQuestion = {};
let acceptedAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What was the first message sent over the Internet?",
        choice1:"lo",
        choice2:"testing",
        choice3:"sos",
        choice4:"home",
        answer: 1
    },
    {
        question: "In what decade did the first workable prototype of the internet come to life",
        choice1:"1950s",
        choice2:"1960s",
        choice3:"1970s",
        choice4:"1980s",
        answer: 2
    },
    {
        question: "Which one of these people was involved in the founding of the internet?",
        choice1:"Bob Vance",
        choice2:"Paul Anka",
        choice3:"Mads Mikkelsen",
        choice4:"Vint Cerf",
        answer: 4
    },
    {
        question: "In what year was Netscape founded?",
        choice1:"1990",
        choice2:"1994",
        choice3:"1989",
        choice4:"1991",
        answer: 2
    },
    {
        question: "What operating system most heavily influenced Linux and FreeBSD?",
        choice1:"NLS",
        choice2:"MS-DOS",
        choice3:"Unix",
        choice4:"AmigaOS 2.0",
        answer: 3
    }

];


//CONSTANTS

const points = 25;
const maxQuestions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

};

function setTime() {
    let secondsLeft = 180;
    let timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
  };
  
  setTime();

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions || setTime === 0) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = 'Question' + questionCounter + '/' + maxQuestions;
    //Update progress bar
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptedAnswers= true;
       
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptedAnswers) return;

        acceptedAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToAppyly = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToAppyly === 'correct') {
            incrementScore(points);
        }
        //console.log(classToAppyly);
        //console.log(selectedAnswer == currentQuestion.answer);

        selectedChoice.parentElement.classList.add(classToAppyly);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToAppyly);
            getNewQuestion();
        }, 700);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

let timeEl = document.querySelector(".time");
let mainEl = document.getElementById("main");





startGame();