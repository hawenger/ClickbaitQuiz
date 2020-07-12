const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    console.log(username.value);
    saveScoreButton.disabled = !username.value;
});
saveHighScore = (e) => {
    console.log("Clicked the save button!")
    e.preventDefault();
};