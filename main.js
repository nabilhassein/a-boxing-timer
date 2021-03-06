var timer;
var paused = false;

function Timer(callback, delay) {
    var timerId;

    this.pause = function() {
        window.clearInterval(timerId);
    };

    this.resume = function() {
        window.clearTimeout(timerId);
        timerId = window.setInterval(callback, delay);
    };

    this.resume();
}

function startTimer(elem) {
    var roundLength = 180;
    var restPeriod = 60;

    var roundActive = false;
    var secondsLeft = 0;

    var openingBell = new Audio('opening-bell.mp3');
    var closingBell = new Audio('closing-bell.mp3');

    var clock = document.getElementById(elem);

    timer = new Timer(function () {
        console.log(secondsLeft);
        var minutes = Math.floor(secondsLeft / 60);
        var seconds = secondsLeft % 60;
        if (seconds < 10) seconds = "0" + seconds;
        clock.innerHTML = "<h1>" + minutes + ":" + seconds + "</h1>";

        if (roundActive && secondsLeft == 0) {
            closingBell.play();
            roundActive = false;
            secondsLeft = restPeriod;
        } else if (!roundActive && secondsLeft == 0) {
            openingBell.play();
            roundActive = true;
            secondsLeft = roundLength;
        } else {
            secondsLeft--;
        }
    }, 1000);
}

function pause () {
    if (paused) {
        document.getElementById("pause").innerHTML = "Pause";
        timer.resume()
    } else {
        document.getElementById("pause").innerHTML = "Resume";
        timer.pause();
    }
    paused = !paused;
}