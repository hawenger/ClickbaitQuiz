const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

//console.log(choices);

let currentQuestion = {};
let acceptedAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML elemnt do we put the Javascript?",
        choice1:"<script>",
        choice2:"<javascript>",
        choice3:"<js>",
        choice4:"<scripting>",
        answer: 1
    },
    {
        question: "WOOPTY MEANS",
        choice1:"uh-oh",
        choice2:"oops",
        choice3:"maybe later",
        choice4:"<scripting>",
        answer: 2
    },
    {
        question: "No is",
        choice1:"null",
        choice2:"undefined",
        choice3:"true",
        choice4:"false",
        answer: 4
    }

];


//CONSTANTS

const points = 25;
const maxQuestions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
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

startGame();