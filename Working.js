let timer = null;
let hours = 0;
let minutes = 0;
let seconds = 0;

/* Sounds */
const startSound = document.getElementById("startSound");
const pauseSound = document.getElementById("pauseSound");
const resetSound = document.getElementById("resetSound");
const lapSound = document.getElementById("lapSound");

function updateTime() {
    document.getElementById("time").innerText =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function start() {
    if (timer !== null) return;
    startSound.play();

    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        updateTime();
    }, 1000);
}

function pause() {
    pauseSound.play();
    clearInterval(timer);
    timer = null;
}

function reset() {
    resetSound.play();
    pause();
    hours = minutes = seconds = 0;
    updateTime();
    document.getElementById("lapList").innerHTML = "";
}

function lap() {
    lapSound.play();
    const li = document.createElement("li");
    li.innerText = document.getElementById("time").innerText;
    document.getElementById("lapList").appendChild(li);
}

/* Dark / Light Mode */
function toggleTheme() {
    document.body.classList.toggle("light");
}
document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (stopwatch.isRunning) {
                    pauseBtn.click();
                } else {
                    startBtn.click();
                }
                break;
            case 'KeyL':
                if (!lapBtn.disabled) {
                    lapBtn.click();
                }
                break;
            case 'KeyR':
                resetBtn.click();
                break;
            case 'KeyC':
                if (document.activeElement !== startBtn && 
                    document.activeElement !== pauseBtn && 
                    document.activeElement !== lapBtn && 
                    document.activeElement !== resetBtn) {
                    clearLapsBtn.click();
                }
                break;
        }
    });