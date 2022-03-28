"use strict";
import Popup from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";

let totalScore = 0;

const gameFinishBanner = new Popup();
const game = new GameBuilder(10, 8, 10);

gameFinishBanner.setClickListener(game.start);
game.setGameStopListener((reason, count) => {
	let message;
	totalScore += count;

	switch (reason) {
		case Reason.win:
			sound.playWin();
			game.setNextStage();
			message = `🎉 ${totalScore} 🎉`;
			break;
		case Reason.lose:
			message = `😥 ${totalScore} 😥`;
			totalScore = 0;
			break;
		case Reason.cancle:
			sound.playAlert();
			message = "REPLAY ❓";
			break;
		default:
			throw new Error("not valid reason");
	}
	gameFinishBanner.show(message, reason);
});
