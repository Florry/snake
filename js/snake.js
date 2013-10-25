/*jslint browser:true */
/*global Audio: false, $: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
var snake = {
    beginSound: new Audio('assets/begin.wav'),
    infinite: false,
    inGame: false,
    isGameOver: false,
    obstacles: false,
    gameOverSound: new Audio('assets/gameover.wav'),
    score: 0,
    difficulty: 100,
    lastButton: undefined,
    direction: 0,
    snake: []
};