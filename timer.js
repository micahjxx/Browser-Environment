let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;

// Elements
const display = document.getElementById("display");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Update display
function updateDisplay() {
    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    display.textContent = `${h}:${m}:${s}`;
}

// Timer logic
function startTimer() {
    if (timer !== null) return; 

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

        updateDisplay();
    }, 1000);

    statusText.textContent = "Status: Running";
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
    statusText.textContent = "Status: Paused";
}

function resetTimer() {
    clearInterval(timer);
    timer = null;

    seconds = 0;
    minutes = 0;
    hours = 0;

    updateDisplay();
    statusText.textContent = "Status: Reset";
}

// Button events using addEventListener 
startBtn.addEventListener("click", function() {
    startTimer();
});

pauseBtn.addEventListener("click", function() {
    pauseTimer();
});

resetBtn.addEventListener("click", function() {
    resetTimer();
});

// Keyboard shortcuts
document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === 's') {
        startTimer();
    }
    if (event.key.toLowerCase() === 'p') {
        pauseTimer();
    }
    if (event.key.toLowerCase() === 'r') {
        resetTimer();
    }
});