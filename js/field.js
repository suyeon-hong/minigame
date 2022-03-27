"use strict";

export default class Field {
	constructor(CARROT_SIZE, CARROT_COUNT, BUG_COUNT) {
		this.carrotSize = CARROT_SIZE;
		this.carrotCount = CARROT_COUNT;
		this.bugCount = BUG_COUNT;
		this.gameField = document.querySelector(".gameField");
		this.fieldRect = this.gameField.getBoundingClientRect();
		this.gameField.addEventListener("click", (e) => this.onClick(e));
	}

	setClickListener(onItemClick) {
		this.onItemClick = onItemClick;
	}

	onClick = (e) => {
		const target = e.target;
		if (target.nodeName !== "IMG") return;

		if (target.matches(".carrot")) {
			e.target.remove();
			this.onItemClick && this.onItemClick("carrot");
		} else if (target.matches(".bug")) {
			this.onItemClick && this.onItemClick("bug");
		}
	};

	addItem(className, src, count) {
		const x = this.fieldRect.width - this.carrotSize;
		const y = this.fieldRect.height - this.carrotSize;

		for (let i = 0; i < count; i++) {
			const img = document.createElement("img");

			img.setAttribute("class", className);
			img.setAttribute("src", src);
			img.style.top = `${randomNumber(0, y)}px`;
			img.style.left = `${randomNumber(0, x)}px`;

			this.gameField.append(img);
		}
	}
	initField() {
		this.gameField.innerHTML = ``;
		this.addItem("carrot", "img/carrot.png", this.carrotCount);
		this.addItem("bug", "img/bug.png", this.bugCount);
	}
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
