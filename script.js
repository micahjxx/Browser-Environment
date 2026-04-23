// Get canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Data
let circles = [];
let selectedCircle = null;
let isDragging = false;

// Draw all circles
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

        ctx.fillStyle = circle === selectedCircle ? "red" : "blue";
        ctx.fill();

        ctx.closePath();
    });
}

// Get mouse position
function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Check if point is inside circle
function isInside(circle, x, y) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
}

// CLICK (Add or Select)
canvas.addEventListener("mousedown", function(e) {
    const pos = getMousePos(e);
    let found = false;

    for (let i = circles.length - 1; i >= 0; i--) {
        if (isInside(circles[i], pos.x, pos.y)) {
            selectedCircle = circles[i];
            isDragging = true;
            found = true;
            break;
        }
    }

    if (!found) {
        const newCircle = {
            x: pos.x,
            y: pos.y,
            radius: 20
        };
        circles.push(newCircle);
        selectedCircle = newCircle;
    }

    draw();
});

// DRAG
canvas.addEventListener("mousemove", function(e) {
    if (isDragging && selectedCircle) {
        const pos = getMousePos(e);
        selectedCircle.x = pos.x;
        selectedCircle.y = pos.y;
        draw();
    }
});

// STOP DRAG
canvas.addEventListener("mouseup", function() {
    isDragging = false;
});

// DELETE
document.addEventListener("keydown", function(e) {
    if (e.key === "Delete" && selectedCircle) {
        circles = circles.filter(c => c !== selectedCircle);
        selectedCircle = null;
        draw();
    }
});

// RESIZE (SCROLL)
canvas.addEventListener("wheel", function(e) {
    if (selectedCircle) {
        e.preventDefault();

        if (e.deltaY < 0) {
            selectedCircle.radius += 2;
        } else {
            selectedCircle.radius -= 2;
        }

        if (selectedCircle.radius < 5) {
            selectedCircle.radius = 5;
        }

        draw();
    }
});