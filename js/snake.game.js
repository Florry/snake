/*jslint browser:true */
/*global snake: false, localStorage: false, $: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
snake.game = (function () {
    "use strict";
    var blockTick = false;
    return {
        tick: function () {

            if (snake.isGameOver === false && blockTick === false) {
                snake.logic.movement(snake.direction);
                snake.logic.eatFruit();

                if (((snake.snake.length) > ((parseInt($("#gamePad").css("width"), 10) / 20) * (parseInt($("#gamePad").css("height"), 10) / 20)) - 1)) {
                    snake.direction = 0;
                    blockTick = true;
                    console.log("No more room for apples");
                    snake.gui.gameOver();
                    snake.isGameOver = false;
                }
                switch (snake.snake.length) {
                case 3:
                    snake.difficulty = 90;
                    break;
                case 9:
                    snake.difficulty = 80;
                    break;
                case 15:
                    snake.difficulty = 70;
                    break;
                case 20:
                    snake.difficulty = 60;
                    break;
                case 22:
                    snake.difficulty = 50;
                    break;
                }
                //  console.log("omg");
                setTimeout(snake.game.tick, snake.difficulty);

            }
        },
        resetTick: function () {
            blockTick = false;
        }
    };

}());