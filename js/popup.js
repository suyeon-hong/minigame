"use strict";

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
		this.modal.style.display = "block";
		this.modalText.innerText =
			reason === "win"
				? "🎉YOU SUCCESS!"
				: reason === "lose"
				? "YOU LOST😥"
				: "다시 시작하기";
	}

	hide() {
		this.modal.style.display = "none";
	}
}
