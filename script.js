// This file is for generic scene to scene functions.
// There shouldn't be any overlap between this and encounter; they should work in parallel.

let ready = false;

function startup() {
    console.log("Startup function called.");
    fadeOutEffect();
}

async function startGame(name) {
    Alpine.$data(document.getElementById("background-image")).name = name;
    console.log("Game started with name: " + name);

    await fadeInOutEffect("returning");
    Alpine.$data(document.getElementById("background-image")).showPlayerBar = true;

    localStorage.setItem('name', name);
}

async function importButton() {
    console.log("Import");
}

async function exportButton() {
    console.log("Export");
}

async function deleteButton() {
    console.log("Delete");
}

async function howToPlay() {
    console.log("How To Play");
}

async function transition(from, to) {
    console.log(to.toUpperCase());
    await fadeInOutEffect(to);
    Alpine.$data(document.getElementById("background-image")).showPlayerBar = true;
}

async function quitButton() {
    window.close();
    alert("Close the tab to quit the game.");
}

async function fadeInOutEffect(to) {
    await fadeInEffect();
    await new Promise(resolve => setTimeout(resolve, 1000));
    Alpine.$data(document.getElementById("screen")).screen = to;
    await fadeOutEffect();
}

async function fadeOutEffect() {
    var opacity = 1;
    var element = document.getElementById("overlay-transparency");
    element.style.opacity = 1;
    await new Promise(resolve => setTimeout(resolve, 250));
    var fadeInterval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.05;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}

async function fadeInEffect() {
    var opacity = 0;
    var element = document.getElementById("overlay-transparency");
    element.style.opacity = 0;
    var fadeInterval = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.05;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.getElementById('global-tooltip');

    function showTooltip(text) {
        tooltip.textContent = text;
        tooltip.style.opacity = 1;
    }

    function moveTooltip(x, y) {
        tooltip.style.left = x + 10 + 'px';
        tooltip.style.top = y + 20 + 'px';
    }

    function hideTooltip() {
        tooltip.style.opacity = 0;
        tooltip.textContent = '';
    }

    // Desktop hover
    document.body.addEventListener('mouseover', e => {
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;
        showTooltip(target.dataset.tooltip);
    });

    document.body.addEventListener('mousemove', e => {
        if (!tooltip.textContent) return;
        moveTooltip(e.pageX, e.pageY);
    });

    document.body.addEventListener('mouseout', e => {
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;
        hideTooltip();
    });

    // Mobile touch
    document.body.addEventListener('touchstart', e => {
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;
        showTooltip(target.dataset.tooltip);
        const touch = e.touches[0];
        moveTooltip(touch.pageX, touch.pageY);
    }, { passive: true });

    document.body.addEventListener('touchmove', e => {
        if (!tooltip.textContent) return;
        const touch = e.touches[0];
        moveTooltip(touch.pageX, touch.pageY);
    }, { passive: true });

    document.body.addEventListener('touchend', hideTooltip);
});

