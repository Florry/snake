/*jslint browser:true */
/*global snake: false, localStorage: false, $: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
snake.logic = (function () {
    "use strict";
    var player = $("#snakeHead"),
        gamePad = $("#gamePad"),
        blockSize = 20,
        posVertical = 0,
        lastPosVertical = 0,
        posHorizontal = 0,
        lastPosHorizontal = 0,
        fruit = $("#fruit"),
        scoreId = $(".score"),
        eatSound = new Audio('assets/apple.wav'),
        usedIds = [],
        wallWidth,
        wallHeight,
        allObs = $(".obs");
    return {
        SnakeFactory: function (id) {

            var that = {};
            that.newSnake = $("<div>");
            that.entityLastPosVertical = "0px";
            that.entityLastPosHorizontal = "0px";
            that.newSnake.attr("class", "snake");
            that.newSnake.attr("id", id);
            $("#snakes").append(that.newSnake);

            that.entity = $("#" + id);
            that.entity.css("left", "-20px");
            return that;
        },

        ObstacleFactory: function (id) {

            var that = {},
                left,
                top;

            that.newObs = $("<div>");
            that.newObs.attr("class", "obs");
            that.newObs.attr("id", id);
            $("#obstacles").append(that.newObs);

            left = Math.floor(Math.random() * (parseInt(gamePad.css("width"), 10) / 20)) * 20;
            top = Math.floor(Math.random() * (parseInt(gamePad.css("height"), 10) / 20)) * 20;
            that.entity = $("#" + id);
            that.entity.css("top", top + "px");
            that.entity.css("left", left + "px");
            return that;

        },

        randomTheme: function () {
            if (Math.round(Math.random()) === 1) {
                $("#currentCss").attr("href", "css/retro.css");
                $(".currentTheme").text("Retro");
            } else {
                $("#currentCss").attr("href", "css/modern.css");
                $(".currentTheme").text("Modern");
            }
        },

        modernTheme: function () {
            if ($("#currentCss").attr("href") === "css/modern.css" && ($("body div:last").attr("id") !== "cordBackground")) {
                console.log("bluePrint");
                $("h1").hide();
                $("#startMenu").hide();
                var cordBackground = $("<div></div>");
                cordBackground.attr("id", "cordBackground");
                $("body").append(cordBackground);
                setTimeout(function () {
                    cordBackground.effect("pulsate", 200);
                }, 500);
                setTimeout(function () {
                    $("h1").show().effect("pulsate", 200);
                    $("#startMenu").css("display", "block").effect("pulsate", 200);
                }, 1000);

            }
        },

        fixModernTheme: function () {
            if ($("#currentCss").attr("href") === "css/modern.css") {
                $("#cordBackground").effect("pulsate", 200);
                setTimeout(function () {
                    $("#cordBackground").remove();
                }, 500);
            } else {
                $("#cordBackground").remove();
            }
        },

        reset: function () {
            $("#snakes").text("");
            $("#obstacles").text("");
            snake.inGame = true;
            snake.isGameOver = false;
            snake.difficulty = 100;
            snake.direction = 0;
            snake.snake.length = 0;
            snake.score = 0;
            scoreId.text(snake.score);
            snake.beginSound.play();
            snake.logic.setWalls();
            snake.logic.drawFruit("First fruit is now spawned @: ");
            snake.game.resetTick();
            snake.game.tick();
        },
        setWalls: function () {

            if ($("#wallWidth").val() !== "" || $("#wallHeight").val() !== "") {
                wallWidth = (parseInt($("#wallWidth").val(), 10) * 20);
                wallHeight = (parseInt($("#wallHeight").val(), 10) * 20);

                gamePad.css("width", wallWidth + "px");
                gamePad.css("height", wallHeight + "px");

            } else {
                console.log("no input value");
                gamePad.css("width", "");
                gamePad.css("height", "");
            }
            posHorizontal = (Math.floor(0.5 * (parseInt(gamePad.css("width"), 10) / 20)) * 20);
            posVertical = (Math.floor(0.5 * (parseInt(gamePad.css("height"), 10) / 20)) * 20);
            $("#scoreBoard").css("width", $("#gamePad").css("width"));
            $("#game").css("width", $("#gamePad").css("width"));
            $(".gameOver").css("width", $("#gamePad").css("width"));
        },

        makeId: function () {

            var text = "",
                i = 0,
                letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            for (i = 0; i < 5; i += 1) {
                text += letters.charAt(Math.floor(Math.random() * letters.length));
            }
            for (i = 0; i < usedIds.length; i += 1) {
                if (text === usedIds[i]) {
                    snake.logic.makeId();
                    break;
                }
            }
            usedIds.push(text);
            return text;

        },

        drawFruit: function (debugString) {

            var i,
                top,
                left;
            if (snake.isGameOver === false) {
                console.log(snake.isGameOver);
                fruit.fadeOut();
                top = (Math.floor(Math.random() * (parseInt(gamePad.css("height"), 10) / 20)) * 20);
                left = (Math.floor(Math.random() * (parseInt(gamePad.css("width"), 10) / 20)) * 20);

                if (debugString !== undefined) {
                    console.log(debugString + top + "," + left);
                }

                if (snake.snake.length > 0) {

                    for (i = 0; i < snake.snake.length; i += 1) {
                        if (((left + "px") === snake.snake[i].entity.css("left") && (top + "px") === snake.snake[i].entity.css("top"))) {
                            if (snake.isGameOver === false) {
                                snake.logic.drawFruit("recalculated spawn position because the last one was inside of a snake part. new position is: ");
                                console.log("spawned inside snake");
                                return "error";
                            } else {
                                break;
                            }
                        }
                    }
                }

                for (i = 0; i < allObs.length; i += 1) {
                    if ((left + "px") === allObs[i].style.left && (top + "px") === allObs[i].style.top) {
                        console.log("fruit inside obstacles, redrawing fruit");
                        if (snake.isGameOver === false) {
                            snake.logic.drawFruit("fruit was inside obstacles");
                            return "error";
                        } else {
                            break;
                        }
                    }
                }

                if ((left + "px") === player.css("left") && (top + "px") === player.css("top")) {
                    if (snake.isGameOver === false) {
                        snake.logic.drawFruit("recalculated spawn position because the last one was inside of a snake part. new position is: ");
                        console.log("spawned inside snake");
                        return "error";
                    } else {
                        return;
                    }
                } else {
                    fruit.css("top", top + "px");
                    fruit.css("left", left + "px");
                    fruit.fadeIn();
                }
            }
        },

        growSnake: function () {

            var tempSnake = new snake.logic.SnakeFactory(snake.logic.makeId());
            snake.snake.push(tempSnake);
        },

        eatFruit: function () {

            if (fruit.css("left") === player.css("left") && fruit.css("top") === player.css("top")) {
                eatSound.play();
                if (snake.obstacles === true) {
                    snake.logic.newObstacles();
                }
                snake.logic.drawFruit();

                if (snake.difficulty <= 80) {
                    snake.logic.growSnake();
                    snake.logic.growSnake();
                } else {
                    snake.logic.growSnake();
                }

                snake.score += 20;
                scoreId.text(snake.score);
            }
        },

        newObstacles: function () {
            var thisObs = new snake.logic.ObstacleFactory(snake.logic.makeId());
        },

        snakeRotate: function (degrees) {

            $("#snakeHead").css({
                '-webkit-transform': 'rotate(' + degrees + 'deg)',
                '-moz-transform': 'rotate(' + degrees + 'deg)',
                '-ms-transform': 'rotate(' + degrees + 'deg)',
                'transform': 'rotate(' + degrees + 'deg)'
            });
        },

        movement: function (dir) {
            var collision = false,
                collisionBool,
                i = 0,
                snakeTail = $(".snake");
            allObs = $(".obs");
            for (i = 0; i < snakeTail.length; i += 1) {
                if ((player.css("left") === snakeTail[i].style.left) && (player.css("top") === snakeTail[i].style.top)) {
                    collision = true;
                }
            }
            // console.log("allObs length = " + allObs.length);

            for (i = 0; i < allObs.length; i += 1) {
                if (player.css("left") === allObs[i].style.left && player.css("top") === allObs[i].style.top) {
                    collision = true;
                }
            }

            if (snake.isGameOver === false) {
                switch (dir) {
                case -1:
                    posVertical += blockSize;
                    snake.lastButton = -1;
                    snake.logic.snakeRotate(90);
                    break;
                case 1:
                    posVertical -= blockSize;
                    snake.lastButton = 1;
                    snake.logic.snakeRotate(270);
                    break;
                case -2:
                    posHorizontal -= blockSize;
                    snake.lastButton = -2;
                    snake.logic.snakeRotate(180);
                    break;
                case 2:
                    posHorizontal += blockSize;
                    snake.lastButton = 2;
                    snake.logic.snakeRotate(360);
                    break;
                }
                if (snake.infinite === false) {
                    collisionBool = posHorizontal !== parseInt(gamePad.css("width"), 10) && posHorizontal > -20 && posVertical !== parseInt(gamePad.css("height"), 10) && posVertical > -20 && collision === false;
                } else {
                    collisionBool = collision === false;
                }

                if (collisionBool) {

                    if (snake.infinite === true) {
                        if (posHorizontal === parseInt(gamePad.css("width"), 10)) {
                            posHorizontal = 0;
                        } else if (posHorizontal < 0) {
                            posHorizontal = parseInt(gamePad.css("width"), 10) - 20;
                        } else if (posVertical < 0) {
                            posVertical = parseInt(gamePad.css("height"), 10) - 20;

                        } else if (posVertical === parseInt(gamePad.css("height"), 10)) {
                            posVertical = 0;
                        }
                    }

                    player.css("top", posVertical + "px");
                    player.css("left", posHorizontal + "px");

                    for (i = 0; i < snake.snake.length; i += 1) {

                        if (i === 0) {
                            snake.snake[i].entityLastPosVertical = snake.snake[i].entity.css("top");
                            snake.snake[i].entityLastPosHorizontal = snake.snake[i].entity.css("left");
                            snake.snake[i].entity.css("top", lastPosVertical + "px");
                            snake.snake[i].entity.css("left", lastPosHorizontal + "px");
                        } else {
                            snake.snake[i].entityLastPosVertical = snake.snake[i].entity.css("top");
                            snake.snake[i].entityLastPosHorizontal = snake.snake[i].entity.css("left");
                            snake.snake[i].entity.css("left", snake.snake[i - 1].entityLastPosHorizontal);
                            snake.snake[i].entity.css("top", snake.snake[i - 1].entityLastPosVertical);
                        }
                    }
                } else {
                    snake.isGameOver = true;
                    snake.gui.gameOver();
                }
                lastPosVertical = posVertical;
                lastPosHorizontal = posHorizontal;
            }
        }
    };

}());