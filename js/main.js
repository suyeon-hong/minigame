"use strict";
import Popup from "./popup.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = CARROT_COUNT - 2;
const GAME_DURATION_SEC = 10;

const gameInfo_button = document.querySelector(".gameInfo_button");
const timeBox = document.querySelector(".timer");
const score = document.querySelector(".score");
const gameField = document.querySelector(".gameField");
const fieldRect = gameField.getBoundingClientRect();

const bg_sound = new Audio("./sound/bg.mp3");
const carrot_sound = new Audio("./sound/carrot_pull.mp3");
const bug_sound = new Audio("./sound/bug_pull.mp3");
const win_sound = new Audio("./sound/game_win.mp3");
const alert_sound = new Audio("./sound/alert.wav");

let timer;
let count;
let gameStarted = false;

const gameFinishBanner = new Popup();

gameFinishBanner.setClickListener(gameStart);

gameInfo_button.addEventListener("click", () => {
	if (gameStarted) {
		gameFinish();
	} else {
		gameStart();
	}
});

gameField.addEventListener("click", onFieldClick);

function gameStart() {
	gameStarted = true;
	changeIcon();
	init();
	score.style.visibility = "visible";
	timeBox.style.visibility = "visible";
	bg_sound.play();
	startTimer();
	addItem("carrot", "img/carrot.png", CARROT_COUNT);
	addItem("bug", "img/bug.png", BUG_COUNT);
}

function gameFinish(reason) {
	gameStarted = false;
	clearInterval(timer);
	changeIcon();
	bg_sound.pause();
	openModalBox(reason);
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
	gameField.innerHTML = ``;
	score.innerText = CARROT_COUNT;
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

function onFieldClick(e) {
	const target = e.target;
	if (target.nodeName !== "IMG") return;

	if (target.matches(".carrot")) {
		carrot_sound.play();
		count += 1;
		updateScore(count);
		count === GAME_DURATION_SEC && gameFinish("win");
	} else if (target.matches(".bug")) {
		bug_sound.play();
		gameFinish("lose");
	}
	e.target.remove();
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addItem(className, src, count) {
	const x = fieldRect.width - CARROT_SIZE;
	const y = fieldRect.height - CARROT_SIZE;

	for (let i = 0; i < count; i++) {
		const img = document.createElement("img");

		img.setAttribute("class", className);
		img.setAttribute("src", src);
		img.style.top = `${randomNumber(0, y)}px`;
		img.style.left = `${randomNumber(0, x)}px`;

		gameField.append(img);
	}
}
