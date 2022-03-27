"use strict";
import * as sound from "./sound.js";

export default class Popup {
	constructor() {
		this.modal = document.querySelector(".modal");
		this.modalText = document.querySelector(".modal__text");
		this.BtnRefresh = document.querySelector(".modal__btnRefresh");
		this.BtnRefresh.addEventListener("click", () => {
			this.onClick && this.onClick();
			this.hide();
		});
	}

	setClickListener(onClick) {
		this.onClick = onClick;
	}

	show(reason) {
		let text;
		if (reason === "win") {
			sound.playWin();
			text = "🎉YOU SUCCESS!";
		} else if (reason === "lost") {
			text = "YOU LOST😥";
		} else {
			sound.playAlert();
			text = "다시 시작하기";
		}
		this.modal.style.display = "block";
		this.modalText.innerText = text;
	}

	hide() {
		this.modal.style.display = "none";
	}
}
