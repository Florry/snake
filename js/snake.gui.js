/*jslint browser:true */
/*global snake: false, localStorage: false, $: false, alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false */
snake.gui = (function () {
	"use strict";
	$("#game").hide();
	// snake.logic.randomTheme();
	// snake.logic.modernTheme();

	$(".start").click(function () {
		console.log("start menu");
		snake.logic.reset();
		snake.beginSound.play();
		snake.logic.setWalls();
		snake.logic.fixModernTheme();
		snake.logic.drawFruit("First fruit is now spawned @: ");
		$(".highscore").text(localStorage.highscore);
		$("#startMenu").hide();
		$("#game").fadeIn(200).show();
	});

	$("h1").click(function () {
		$("#backToMenu").click();
		snake.inGame = false;
		snake.isGameOver = true;
	});

	$(window).keydown(function (key) {
		if (key.which === 13) {
			if (snake.inGame === false) {
				$(".start").click();
				snake.inGame = true;
			} else if (snake.inGame === true && snake.isGameOver === true) {
				$("#retry").click();
			}
		}
		if (snake.inGame === true && snake.isGameOver === true && (key.which === 8 || key.which === 27)) {
			$("#backToMenu").click();
		} else if (key.which === 8 || key.which === 27) {
			$("#backToMenu").click();
			snake.inGame = false;
			snake.isGameOver = true;
		}
	});

	$(".infiniteButton").click(function () {
		snake.infinite = !snake.infinite;
		if (snake.infinite === true) {
			$(".infinite").text("On");
		} else {
			$(".infinite").text("Off");
		}
	});

	$(".obstaclesButton").click(function () {
		if (snake.obstacles === false) {
			snake.obstacles = true;
			$(".obsSetting").text("On");
		} else {
			snake.obstacles = false;
			$(".obsSetting").text("Off");
		}
	});

	$("#retry").click(function () {
		console.log("retry");
		snake.logic.reset();
		$(".highscore").text(localStorage.highscore);
		$(".startMenu").hide();
		$("#wrapper").fadeIn(200).show();
		$(".gameOver").hide();

	});

	$("#backToMenu").click(function () {
		$(".gameOver").hide();
		$("#game").hide();
		$("#startMenu").show();
		$("#wallHeight").val("");
		$("#wallWidth").val("");
		snake.logic.wallWidth = "";
		snake.logic.wallHeight = "";
		snake.inGame = false;
		snake.logic.modernTheme();
	});

	$("#themeButton").click(function () {
		if ($("#currentCss").attr("href") === "css/retro.css") {
			$("#currentCss").attr("href", "css/modern.css");
			$(".currentTheme").text("Modern");
			if ($("#game").css("display") === "none") {
				snake.logic.modernTheme();
			}
		} else {
			$("#currentCss").attr("href", "css/retro.css");
			$(".currentTheme").text("Retro");
			snake.logic.fixModernTheme();
		}

	});
	return {
		gameOver: function () {
			$(".gameOver").show();
			snake.gameOverSound.play();
			console.log("game over");
			if (localStorage.highscore === undefined || localStorage.highscore < snake.score) {
				localStorage.highscore = snake.score;
			}
		}
	};
}());