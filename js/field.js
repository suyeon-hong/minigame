"use strict";
const CARROT_SIZE = 80;
const ItemType = Object.freeze({
	carrot: "carrot",
	bug: "bug",
});

export default class Field {
	constructor(CARROT_COUNT, BUG_COUNT) {
		this.carrotCount = CARROT_COUNT;
		this.bugCount = BUG_COUNT;
		this.gameField = document.querySelector(".gameField");
		this.fieldRect = this.gameField.getBoundingClientRect();
		this.gameField.addEventListener("click", this.onClick);
	}

	setClickListener(onItemClick) {
		this.onItemClick = onItemClick;
	}

	updateCount() {
		this.carrotCount += 2;
		this.bugCount += 2;
	}

	onClick = (e) => {
		const target = e.target;
		if (target.nodeName !== "IMG") return;

		if (target.matches(`.${ItemType.carrot}`)) {
			e.target.remove();
			this.onItemClick && this.onItemClick(ItemType.carrot);
		} else if (target.matches(`.${ItemType.bug}`)) {
			this.onItemClick && this.onItemClick(ItemType.bug);
		}
	};

	addItem(className, src, count) {
		const x = this.fieldRect.width - CARROT_SIZE;
		const y = this.fieldRect.height - CARROT_SIZE;

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
		this.addItem(ItemType.carrot, "img/carrot.png", this.carrotCount);
		this.addItem(ItemType.bug, "img/bug.png", this.bugCount);
	}
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
