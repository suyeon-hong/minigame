"use strict";
import Popup from "./popup.js";
import Game from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new Popup();
const game = new Game(20, 15, 20);

gameFinishBanner.setClickListener(game.start);
game.setGameStopListener((reason) => {
	let message;

	switch (reason) {
		case "win":
			sound.playWin();
			message = "🎉YOU SUCCESS!";
			break;
		case "lose":
			sound.playAlert();
			message = "YOU LOST😥";
			break;
		case "stop":
			sound.playAlert();
			message = "다시 시작하기";
			break;
		default:
			throw new Error("not valid reason");
	}
	gameFinishBanner.show(message);
});
