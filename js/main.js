"use strict";
import Popup from "./popup.js";
import Field from "./field.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = CARROT_COUNT - 2;
const GAME_DURATION_SEC = 10;

const gameInfo_button = document.querySelector(".gameInfo_button");
const timeBox = document.querySelector(".timer");
const score = document.querySelector(".score");

const bg_sound = new Audio("./sound/bg.mp3");
const carrot_sound = new Audio("./sound/carrot_pull.mp3");
const bug_sound = new Audio("./sound/bug_pull.mp3");
const win_sound = new Audio("./sound/game_win.mp3");
const alert_sound = new Audio("./sound/alert.wav");

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
	bg_sound.play();
	startTimer();
}

function gameFinish(reason) {
	gameStarted = false;
	clearInterval(timer);
	changeIcon();
	bg_sound.pause();
	openModalBox(reason);
}

function onItemClick(item) {
	if (item === "carrot") {
		carrot_sound.play();
		count += 1;
		updateScore(count);
		CARROT_COUNT === count && gameFinish("win");
	} else if (item === "bug") {
		bug_sound.play();
		gameFinish("lose");
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
			gameFinish("lose");
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

function openModalBox(reason) {
	if (reason === "win") {
		win_sound.play();
	} else {
		alert_sound.play();
	}
	gameFinishBanner.show(reason);
}

function updateScore(count) {
	score.innerText = GAME_DURATION_SEC - count;
}
