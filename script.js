console.log("Loaded!");
let started = false;

async function startGame(name) {
    if (started) return;
    started = true;

    Alpine.$data(document.getElementById("background-image")).name = name;
    console.log("Game started with name: " + name);

    fadeInOutEffect("new-player", "returning");
}

async function fadeInOutEffect(from, to) {
    await fadeOutEffect(document.getElementById(from));
    await new Promise(resolve => setTimeout(resolve, 1200));
    Alpine.$data(document.getElementById("screen")).screen = to;
    
    // await fadeInEffect(document.getElementById(to));
    // await new Promise(resolve => setTimeout(resolve, 1200));
    // Not needed with Alpine.js x-transition
}

async function fadeOutEffect(element) {
    var opacity = 1;
    var fadeInterval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.05;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
            element.style.display = 'none';
        }
    }, 50);
}

async function fadeInEffect(element) {
    var opacity = 0;
    var fadeInterval = setInterval(function () {
        console.log("Fading in, current opacity: " + opacity);
        if (opacity < 1) {
            opacity += 0.05;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}

