let started = false;

function startup() {
    console.log("Startup function called.");
}

async function returningStartup() {
    console.log("Returning startup function called.");
    updateBars("returning", Alpine.$data(document.getElementById("player-returning")));
}

async function updateBars(screen, alpinePlayerData) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Forces it to wait a tick to allow CSS transition to work
    document.getElementById(`health-${screen}`).style.width = `${Math.floor((alpinePlayerData.health / alpinePlayerData.maxHealth) * 560)}px`;
    document.getElementById(`stamina-${screen}`).style.width = `${Math.floor((alpinePlayerData.stamina / alpinePlayerData.maxStamina) * 310)}px`;
    document.getElementById(`experience-${screen}`).style.width = `${Math.floor((alpinePlayerData.experience / Math.floor((alpinePlayerData.level/0.07)**2)) * 450)}px`;
}

async function startGame(name) {
    if (started) return;
    started = true;

    Alpine.$data(document.getElementById("background-image")).name = name;
    console.log("Game started with name: " + name);

    fadeInOutEffect("new-player", "returning");
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

async function travel(from) {
    console.log("Travel");
}

async function encounter(from) {
    console.log("Encounter");
}

async function quitButton() {
    window.close();
    alert("Close the tab to quit the game.");
}

async function inventory(from) {
    console.log("Inventory");
}

async function journal(from) {
    console.log("Journal");
}

async function crafting(from) {
    console.log("Crafting");
}

async function howToPlay() {
    console.log("How To Play");
}

async function fadeInOutEffect(from, to) {
    await fadeOutEffect(document.getElementById(from));
    await new Promise(resolve => setTimeout(resolve, 1200));
    Alpine.$data(document.getElementById("screen")).screen = to;

    await fadeInEffect(document.getElementById(to));
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
    element.style.opacity = 0;
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

