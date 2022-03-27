"use strict";
import Popup from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = CARROT_COUNT - 2;
const GAME_DURATION_SEC = 10;

const gameInfo_button = document.querySelector(".gameInfo_button");
const timeBox = document.querySelector(".timer");
const score = document.querySelector(".score");

let timer;
let count;
let gameStarted = false;

const gameFinishBanner = new Popup();
const gameField = new Field(CARROT_SIZE, CARROT_COUNT, BUG_COUNT);

gameFinishBanner.setClickListener(gameStart);
gameField.setClickListener(onItemClick);

gameInfo_button.addEventListener("click", () => {
	if (gameStarted) {
		gameFinish();
	} else {
		gameStart();
	}
});

function gameStart() {
	gameStarted = true;
	changeIcon();
	init();
	score.style.visibility = "visible";
	timeBox.style.visibility = "visible";
	sound.playBackground();
	startTimer();
}

function gameFinish(reason) {
	gameStarted = false;
	clearInterval(timer);
	changeIcon();
	sound.stopBackground();
	gameFinishBanner.show(reason);
}

function onItemClick(item) {
	if (item === "carrot") {
		sound.playCarrot();
		count += 1;
		updateScore(count);
		CARROT_COUNT === count && gameFinish("win");
	} else if (item === "bug") {
		sound.playBug();
		gameFinish("lost");
	}
}

function changeIcon() {
	const icon = document.querySelector(".gameInfo_button i");

	if (gameStarted) {
		icon.classList.add("fa-pause");
		icon.classList.remove("fa-play");
	} else {
		icon.classList.add("fa-play");
		icon.classList.remove("fa-pause");
	}
}

function init() {
	score.innerText = CARROT_COUNT;
	gameField.initField();
	count = 0;
}

function startTimer() {
	let remainTime = GAME_DURATION_SEC;

	updateRemainTime(remainTime);

	timer = setInterval(() => {
		if (remainTime <= 0) {
			gameFinish("lost");
			return;
		}
		updateRemainTime(--remainTime);
	}, 1000);
}

function updateRemainTime(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	timeBox.innerText = `${minutes} : ${seconds}`;
}

function updateScore(count) {
	score.innerText = GAME_DURATION_SEC - count;
}
