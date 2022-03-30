"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
	win: "win",
	lose: "lose",
	cancle: "cancle",
});

export class GameBuilder {
	constructor(carrotCount, bugCount, gameDuration) {
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.gameDuration = gameDuration;

		this.gameInfo_button = document.querySelector(".gameInfo_button_play");
		this.timeBox = document.querySelector(".timer");
		this.score = document.querySelector(".score");

		this.gameField = new Field(carrotCount, bugCount);
		this.gameField.setClickListener(this.onItemClick);

		this.timer = undefined;
		this.count = 0;
		this.gameStarted = false;

		this.gameInfo_button.addEventListener("click", () => {
			if (this.gameStarted) {
				this.finish(Reason.cancle, this.count);
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

	finish(reason, count) {
		this.gameStarted = false;
		clearInterval(this.timer);
		this.changeIcon();
		sound.stopBackground();
		this.onGameStop && this.onGameStop(reason, count);
	}

	onItemClick = (item) => {
		if (item === "carrot") {
			sound.playCarrot();
			this.count += 1;
			this.updateScore(this.count);
			this.carrotCount === this.count && this.finish(Reason.win, this.count);
		} else if (item === "bug") {
			sound.playBug();
			this.finish(Reason.lose, this.count);
		}
	};

	changeIcon() {
		const icon = this.gameInfo_button.querySelector("i");

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
				this.finish(Reason.lose, this.count);
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
		this.score.innerText = this.carrotCount - count;
	}

	setNextStage() {
		this.gameDuration += 2;
		this.carrotCount += 2;
		this.bugCount += 2;
		this.gameField.updateCount();
	}
}
