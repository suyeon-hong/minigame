"use strict";
const bg_sound = new Audio("./sound/bg.mp3");
const carrot_sound = new Audio("./sound/carrot_pull.mp3");
const bug_sound = new Audio("./sound/bug_pull.mp3");
const win_sound = new Audio("./sound/game_win.mp3");
const alert_sound = new Audio("./sound/alert.wav");

export function playBackground() {
	playSound(bg_sound);
}

export function playCarrot() {
	playSound(carrot_sound);
}

export function playBug() {
	playSound(bug_sound);
}

export function playWin() {
	playSound(win_sound);
}

export function playAlert() {
	playSound(alert_sound);
}

export function stopBackground() {
	stopSound(bg_sound);
}

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

function stopSound(sound) {
	sound.pause();
}
