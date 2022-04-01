"use strict";
import { Reason } from "./game.js";

export default class Popup {
	constructor() {
		this.modal = document.querySelector(".modal");
		this.modalTitle = document.querySelector(".modal__title");
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

	setAddRecord(addRecord) {
		this.addRecord = addRecord;
	}

	show(message, reason) {
		if (reason === Reason.cancle) {
			this.modalTitle.style.display = "none";
		} else {
			this.modalTitle.style.display = "block";
		}
		this.modal.style.display = "block";
		this.modalText.innerText = message;
		this.changeIcon(reason);
	}

	hide() {
		this.modal.style.display = "none";
	}

	changeIcon(reason) {
		const icon = this.BtnRefresh.querySelector("i");

		if (reason === Reason.win) {
			icon.classList.add("fa-play");
			icon.classList.remove("fa-redo-alt");
		} else {
			icon.classList.add("fa-redo-alt");
			icon.classList.remove("fa-play");
		}
	}
}
