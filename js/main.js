"use strict";
import Popup from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new Popup();
const game = new GameBuilder(20, 15, 20);

gameFinishBanner.setClickListener(game.start);
game.setGameStopListener((reason) => {
	let message;

	switch (reason) {
		case Reason.win:
			sound.playWin();
			message = "🎉YOU SUCCESS!";
			break;
		case Reason.lose:
			sound.playAlert();
			message = "YOU LOST😥";
			break;
		case Reason.cancle:
			sound.playAlert();
			message = "REPLAY❓";
			break;
		default:
			throw new Error("not valid reason");
	}
	gameFinishBanner.show(message);
});
