/*jslint browser:true */
/*global snake: false, $: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
snake.input = (function () {
    "use strict";
    console.log("input");
    $(window).keydown(function (key) {
		if(snake.inGame === true){
			switch (key.which) {
			case 38:
				if (snake.snake.length > 0) {
					if (snake.lastButton !== -1) {
						snake.direction = 1;
					}

				} else {
					snake.direction = 1;
				}
				break;
			case 40:
				if (snake.snake.length > 0) {
					if (snake.lastButton !== 1) {
						snake.direction = -1;
					}
				} else {
					snake.direction = -1;
				}
				break;
			case 37:
				if (snake.snake.length > 0) {
					if (snake.lastButton !== 2) {
						snake.direction = -2;
					}
				} else {
					snake.direction = -2;
				}
				break;
			case 39:
				if (snake.snake.length > 0) {
					if (snake.lastButton !== -2) {
						snake.direction = 2;
					}
				} else {
					snake.direction = 2;
				}
				break;
			case 32:

				$("#themeButton").click();
				break;
			default:
			}
        }
    });
}());