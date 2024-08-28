import "./style.css";

// Elements selection
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");

const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

// Game initial conditions
let totalScores, currentScore, activePlayer, isTheGameGoing;
const initGame = function () {
	totalScores = [0, 0]; // total scores of players
	currentScore = 0;
	activePlayer = 0; // 0 is first player, 1 is second player
	isTheGameGoing = true; // State variable indicating is the game going or is it over

	score0Element.textContent = 0;
	score1Element.textContent = 0;
	currentScore0Element.textContent = 0;
	currentScore1Element.textContent = 0;

	player0Element.classList.remove("player--winner");
	player1Element.classList.remove("player--winner");
	player0Element.classList.remove("player--active");
	player1Element.classList.remove("player--active");
	player0Element.classList.add("player--active");
	diceElement.classList.add("hidden");
};
initGame();

const switchActivePlayer = function () {
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent =
		currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0Element.classList.toggle("player--active");
	player1Element.classList.toggle("player--active");
};

// Roll the dice
btnRoll.addEventListener("click", () => {
	if (isTheGameGoing) {
		// 1. Generate a random number
		const diceNumber = Math.trunc(Math.random() * 6) + 1;

		// 2. Display number on the dice
		diceElement.classList.remove("hidden");
		diceElement.src = `dice${diceNumber}.png`; //Putting an image by dinamic notation

		// 3. If the number is 1, switch to the next player, if not - add current number to the score
		if (diceNumber !== 1) {
			currentScore += diceNumber;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchActivePlayer();
		}
	}
});

// Button Hold
btnHold.addEventListener("click", () => {
	if (isTheGameGoing) {
		// 1. Add current score to active player to total score
		totalScores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			totalScores[activePlayer];

		// 2. If total score of active player is >= 100, the player won, if isn't - switch active player
		if (totalScores[activePlayer] >= 100) {
			diceElement.classList.add("hidden");
			isTheGameGoing = false; // The game is over
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner")
				.classList.remove("player--active");
		} else {
			switchActivePlayer();
		}
	}
});

// Button New Game
btnNew.addEventListener("click", initGame);
