// This file is for generic scene to scene functions.
// There shouldn't be any overlap between this and encounter; they should work in parallel.

let ready = false;

function startup() {
    console.log("Startup function called.");
    fadeOutEffect();
}

async function startGame(name) {
    const player = Alpine.$data(document.getElementById('player'));
    Alpine.$data(document.getElementById("background-image")).name = name;
    console.log("Game started with name: " + name);

    await fadeInOutEffect("returning");
    Alpine.$data(document.getElementById("background-image")).showPlayerBar = true;

    localStorage.setItem('textBasedData', JSON.stringify({
        name: player.name,
        level: player.level,
        health: player.health,
        stamina: player.stamina,
        experience: player.experience,
        weaponry: { weapon: player.weaponry.weapon.name, level: player.weaponry.level },
        armory: { armor: player.armory.armor.name, level: player.armory.level },
        pstatus: player.pstatus,
        inventory: player.inventory
    }));
}

async function importButton() {
    console.log("Import");
    const saveData = window.prompt("Please paste your save data key:");
    if (!saveData) return;
    const decrypted = CryptoJS.TripleDES.decrypt(saveData, CryptoJS.enc.Utf8.parse("TextBasedGameKeyByJgouken"), {
        iv: CryptoJS.enc.Utf8.parse("TBGSMJGMBP"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    try {
        // Validate the decrypted data
        const parsed = JSON.parse(decrypted);

        const requiredKeys = [
            'name', 'level', 'health', 'stamina', 'experience',
            'weaponry', 'armory', 'pstatus', 'inventory'
        ];

        const hasRequired = requiredKeys.every(k => Object.prototype.hasOwnProperty.call(parsed, k));

        const weaponryOk = parsed.weaponry && typeof parsed.weaponry === 'object' &&
            (parsed.weaponry.weapon || (parsed.weaponry.weapon && parsed.weaponry.weapon.name)) &&
            ('level' in parsed.weaponry);

        const armoryOk = parsed.armory && typeof parsed.armory === 'object' &&
            (parsed.armory.armor || (parsed.armory.armor && parsed.armory.armor.name)) &&
            ('level' in parsed.armory);

        if (!hasRequired || !weaponryOk || !armoryOk) {
            throw new Error('Missing required fields');
        }

        if (typeof parsed.name !== 'string' || typeof parsed.level !== 'number') {
            throw new Error('Invalid field types');
        }

        localStorage.setItem('textBasedData', JSON.stringify(parsed));
        window.location.reload();
    } catch (err) {
        console.error('Import failed:', err);
        alert('Hmm, this data looks weird. Check the key and try again.');
    }
}

async function exportButton() {
    console.log("Export");
    const player = Alpine.$data(document.getElementById('player'));
    const saveData = JSON.stringify({
        name: player.name,
        level: player.level,
        health: player.health,
        stamina: player.stamina,
        experience: player.experience,
        weaponry: { weapon: player.weaponry.weapon.name, level: player.weaponry.level },
        armory: { armor: player.armory.armor.name, level: player.armory.level },
        pstatus: player.pstatus,
        inventory: player.inventory
    });

    const encrypted = CryptoJS.TripleDES.encrypt(saveData, CryptoJS.enc.Utf8.parse("TextBasedGameKeyByJgouken"), {
        iv: CryptoJS.enc.Utf8.parse("TBGSMJGMBP"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    await navigator.clipboard.writeText(encrypted.toString());
    alert("Your save data key has been copied to your clipboard.");
}

async function deleteButton() {
    console.log("Delete");
    if (window.confirm("Are you sure you want to delete your save? This action cannot be undone.")) {
        localStorage.removeItem('textBasedData');
        window.location.reload();
    }
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
    await new Promise(resolve => setTimeout(resolve, 500));
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
            opacity -= 0.1;
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
            opacity += 0.1;
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
        const padding = 12;

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Default follow position
        let left = x + padding;
        let top = y + padding * 2;

        // Clamp to right edge
        if (left + tooltipWidth > screenWidth - padding) {
            left = screenWidth - tooltipWidth - padding;
        }

        // Clamp to bottom edge
        if (top + tooltipHeight > screenHeight - padding) {
            top = screenHeight - tooltipHeight - padding;
        }

        // Clamp to left edge
        if (left < padding) {
            left = padding;
        }

        // Clamp to top edge
        if (top < padding) {
            top = padding;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
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

document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        const panel = document.getElementById('debug-panel');
        if (!panel) return;

        Alpine.$data(panel).open = !Alpine.$data(panel).open;

        const weaponry = document.getElementById('battle-weaponry');
        weaponry.style.right = Alpine.$data(panel).open ? '300px' : '10px';
    }
});
