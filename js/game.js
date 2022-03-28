"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export default class Game {
	constructor(carrotCount, bugCount, gameDuration) {
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.gameDuration = gameDuration;

		this.gameInfo_button = document.querySelector(".gameInfo_button");
		this.timeBox = document.querySelector(".timer");
		this.score = document.querySelector(".score");

		this.gameField = new Field(CARROT_SIZE, carrotCount, bugCount);
		this.gameField.setClickListener(this.onItemClick);

		this.timer;
		this.count;
		this.gameStarted = false;

		this.gameInfo_button.addEventListener("click", () => {
			if (this.gameStarted) {
				this.finish("stop");
			} else {
				this.start();
			}
		});
	}

	setGameStopListener(onGameStop) {
		this.onGameStop = onGameStop;
	}

	start = () => {
		this.gameStarted = true;
		this.changeIcon();
		this.init();
		this.score.style.visibility = "visible";
		this.timeBox.style.visibility = "visible";
		sound.playBackground();
		this.startTimer();
	};

	finish(reason) {
		this.gameStarted = false;
		clearInterval(this.timer);
		this.changeIcon();
		sound.stopBackground();
		this.onGameStop && this.onGameStop(reason);
	}

	onItemClick = (item) => {
		if (item === "carrot") {
			sound.playCarrot();
			this.count += 1;
			this.updateScore(this.count);
			this.carrotCount === this.count && this.finish("win");
		} else if (item === "bug") {
			sound.playBug();
			this.finish("lose");
		}
	};

	changeIcon() {
		const icon = document.querySelector(".gameInfo_button i");

		if (this.gameStarted) {
			icon.classList.add("fa-pause");
			icon.classList.remove("fa-play");
		} else {
			icon.classList.add("fa-play");
			icon.classList.remove("fa-pause");
		}
	}

	init() {
		this.score.innerText = this.carrotCount;
		this.gameField.initField();
		this.count = 0;
	}

	startTimer() {
		let remainTime = this.gameDuration;

		this.updateRemainTime(remainTime);

		this.timer = setInterval(() => {
			if (remainTime <= 0) {
				this.finish("lose");
				return;
			}
			this.updateRemainTime(--remainTime);
		}, 1000);
	}

	updateRemainTime(time) {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		this.timeBox.innerText = `${minutes} : ${seconds}`;
	}

	updateScore(count) {
		this.score.innerText = this.gameDuration - count;
	}
}
