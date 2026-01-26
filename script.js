let started = false;

function startup() {
    console.log("Startup function called.");
    fadeOutEffect();
}

async function startGame(name) {
    if (started) return;
    started = true;

    Alpine.$data(document.getElementById("background-image")).name = name;
    console.log("Game started with name: " + name);

    await fadeInOutEffect("returning");
    Alpine.$data(document.getElementById("background-image")).showPlayerBar = true;
    updateBars();

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

async function resetBars(screen) {
    document.getElementById(`health-${screen}`).style.width = "0px";
    document.getElementById(`stamina-${screen}`).style.width = "0px";
    document.getElementById(`experience-${screen}`).style.width = "0px";
}

async function updateBars() {
    await new Promise(resolve => setTimeout(resolve, 100)); // Forces it to wait a tick to allow CSS transition to work
    const alpinePlayerData = Alpine.$data(document.getElementById(`player`));

    document.getElementById(`health`).style.width = `${Math.floor((alpinePlayerData.health / alpinePlayerData.maxHealth) * 560)}px`;
    document.getElementById(`stamina`).style.width = `${Math.floor((alpinePlayerData.stamina / alpinePlayerData.maxStamina) * 310)}px`;
    document.getElementById(`experience`).style.width = `${Math.floor((alpinePlayerData.experience / Math.floor((alpinePlayerData.level / 0.07) ** 2)) * 450)}px`;
}