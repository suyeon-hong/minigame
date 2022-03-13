const btnStart = document.querySelector(".btnStart");
const btnStop = document.querySelector(".btnStop");
const timeBox = document.querySelector(".timer");
const score = document.querySelector(".score");
const gameField = document.querySelector(".gameField");

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");
const BtnRefresh = document.querySelector(".modal__btnRefresh");

const bg_sound = document.querySelector(".bg");
const carrot_sound = document.querySelector(".carrot_pull");
const bug_sound = document.querySelector(".bug_pull");
const win_sound = document.querySelector(".game_win");
const alert_sound = document.querySelector(".alert");

const TOTAL_NUM = 5;
let timer;
let count = 0;

btnStart.addEventListener("click", () => {
	btnStart.style.display = "none";
	btnStop.style.display = "inline-block";
	gameStart();
});

btnStop.addEventListener("click", () => {
	btnStop.style.display = "none";
	btnStart.style.display = "inline-block";
	bg_sound.pause();
	gameFinish();
});

BtnRefresh.addEventListener("click", () => {
	btnStart.style.display = "none";
	btnStop.style.display = "inline-block";
	gameStart();
	modal.style.display = "none";
});

gameField.addEventListener("click", (e) => {
	if (e.target.nodeName !== "IMG") return;

	if (e.target.getAttribute("alt") === "당근") {
		carrot_sound.play();
		count += 1;
		score.innerText = TOTAL_NUM - count;
		count === TOTAL_NUM && gameFinish("win");
	} else if (e.target.getAttribute("alt") === "벌레") {
		bug_sound.play();
		gameFinish("lose");
	}
	e.target.remove();
});

const gameStart = () => {
	init();
	bg_sound.play();
	setTimer(10);
	fillGameField();
};

const gameFinish = (text) => {
	bg_sound.pause();
	clearInterval(timer);
	openModalBox(text);
};

const init = () => {
	gameField.innerHTML = ``;
	score.innerText = TOTAL_NUM;
	count = 0;
};

const setTimer = (num) => {
	let time = num;

	timer = setInterval(() => {
		time -= 1;
		timeBox.innerText = `${time} : 00`;
		time === 0 && gameFinish("lose");
	}, 1000);
};

const openModalBox = (text) => {
	alert_sound.play();
	modal.style.display = "block";
	modalText.innerText =
		text === "win"
			? "🎉YOU SUCCESS!"
			: text === "lose"
			? "벌레를 잡았어요😥"
			: "다시 시작하기";
};

const fillGameField = () => {
	for (let i = 0; i < TOTAL_NUM; i++) {
		const posX = Math.random() * 80;
		const posY = Math.random() * 80;

		gameField.innerHTML += `<img src="img/carrot.png" alt="당근" style="top: ${posX}%; left: ${posY}%" />`;
	}
	for (let i = 0; i < TOTAL_NUM - 2; i++) {
		const posX = Math.random() * 80;
		const posY = Math.random() * 80;

		gameField.innerHTML += `<img src="img/bug.png" alt="벌레" style="top: ${posX}%; left: ${posY}%" />`;
	}
};
