const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');
let timeEl = document.querySelector(".time");
let mainEl = document.getElementById("main");

let currentQuestion = {};
let acceptedAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let secondsLeft = 60;

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
        choice3:"Matt Hannon",
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
    },
    {
        question: "Which cartoon once offered free email service?",
        choice1:"Garfield",
        choice2:"Calvin & Hobbes",
        choice3:"Bugs Bunny",
        choice4:"Opus",
        answer: 1
    },
    {
        question: "What was the first webcam used for?",
        choice1:"Monitoring a pot of coffee",
        choice2:"Monitoring a dorm hallway",
        choice3:"Monitoring a busy street",
        choice4:"Monitoring the growth of a bean plant",
        answer: 1
    },
    {
        question: "What is 'Internet' short for?",
        choice1:"Into Ethernet",
        choice2:"Intrigue & Capture",
        choice3:"Inter-system Networking",
        choice4:"Inter-Network-Ethernet",
        answer: 3
    },
    {
        question: "_ marriages today occur because couples met online.",
        choice1:"One in twenty",
        choice2:"One in Eight",
        choice3:"A third of",
        choice4:"One in six",
        answer: 4
    },    {
        question: "Who is credited with inventing email?",
        choice1:"Douglas Mitchell",
        choice2:"Anh Nguyen",
        choice3:"Moses Kamara",
        choice4:"Ray Tomlinson",
        answer: 4
    },    {
        question: "This failed meet-up app birthed Instagram.",
        choice1:"Burbn",
        choice2:"Odeo",
        choice3:"YouMeWE",
        choice4:"Hiper",
        answer: 1
    },    {
        question: "Google was almost called...",
        choice1:"Bugle",
        choice2:"Quester",
        choice3:"BackRub",
        choice4:"HeadSplode",
        answer: 3
    }

];


//CONSTANTS

const points = 25;
const maxQuestions = 12;
const subtractSeconds = 10;

function setTime() {

    let timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;

      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('../html/end.html');
      }
    }, 1000);
  };
  
  setTime();

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('../html/end.html');
    }

    questionCounter++;
    progressText.innerText = 'Question ' + questionCounter + ' / ' + maxQuestions;
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
        } else {
            secondsLeft = secondsLeft - 10;
        };
        console.log(acceptedAnswers);

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

startGame();