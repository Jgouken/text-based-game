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
}

async function quitButton() {
    window.close();
    alert("Close the tab to quit the game.");
}

async function fadeInOutEffect(to) {
    await fadeInEffect();
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const bgData = Alpine.$data(document.getElementById('background-image'));
        const loc = (bgData && bgData.location) ? bgData.location : null;

        // Build candidate base names (requested location first, then fallback Warhamshire)
        const bases = [];
        if (loc) bases.push(loc.replace(/\s+/g, ''));
        bases.push('Warhamshire');

        const exts = ['.jpg', '.png', '.gif'];
        let fileName = null;

        // Try to find the first existing file by probing with HEAD requests
        for (const base of bases) {
            for (const ext of exts) {
                const url = `assets/backgrounds/${base}${ext}`;
                try {
                    const res = await fetch(url, { method: 'HEAD' });
                    if (res && res.ok) {
                        fileName = base + ext;
                        break;
                    }
                } catch (e) {
                    // ignore and try next
                }
            }
            if (fileName) break;
        }

        if (fileName) {
            const bgEl = document.getElementById('background-image');
            bgEl.style.background = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.99), rgba(0, 0, 0, 0.75)), url('assets/backgrounds/${fileName}')`;
            bgEl.style.backgroundPosition = 'center';
            bgEl.style.backgroundRepeat = 'no-repeat';
            bgEl.style.backgroundSize = 'cover';
        } else {
            console.warn('No background image found for', loc, 'or fallback Warhamshire.');
        }
    } catch (e) {
        console.warn('Failed to update background for location', e);
    }

    Alpine.$data(document.getElementById("background-image")).screen = to;
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
    }, 25);
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
    }, 25);
}

document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.getElementById('global-tooltip');
    let activeTooltipTarget = null;
    let isTouchInteraction = false;
    let suppressMouseUntil = 0;
    let followFrameId = null;

    function showTooltip(text, x, y, animate = true) {
        tooltip.textContent = text;

        // Reset first
        tooltip.style.transition = 'none';
        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';
        tooltip.style.left = '-9999px';
        tooltip.style.top = '-9999px';

        // Force layout
        tooltip.getBoundingClientRect();

        // Now position correctly
        moveTooltip(x, y);

        // Reveal smoothly with animation
        tooltip.style.visibility = 'visible';

        if (animate) {
            // Ensure we start from 0 opacity to trigger animation
            tooltip.style.opacity = 0;
            tooltip.style.transition = 'opacity 0.2s ease';

            // Use requestAnimationFrame to ensure the opacity 0 is registered
            requestAnimationFrame(() => {
                tooltip.style.opacity = 1;
            });
        } else {
            tooltip.style.transition = 'none';
            tooltip.style.opacity = 1;
        }
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

    function isElementVisible(element) {
        if (!element) return false;
        if (!element.isConnected) return false;
        const rects = element.getClientRects();
        if (!rects || rects.length === 0) return false;
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return false;
        }
        return true;
    }

    function positionTooltipForElement(element) {
        if (!isElementVisible(element)) {
            hideTooltip();
            return;
        }
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        moveTooltip(x, y);
    }

    function startFollowingElement() {
        if (followFrameId) cancelAnimationFrame(followFrameId);
        const follow = () => {
            if (!activeTooltipTarget) return;
            positionTooltipForElement(activeTooltipTarget);
            followFrameId = requestAnimationFrame(follow);
        };
        followFrameId = requestAnimationFrame(follow);
    }

    function stopFollowingElement() {
        if (followFrameId) {
            cancelAnimationFrame(followFrameId);
            followFrameId = null;
        }
    }

    function hideTooltip() {
        tooltip.style.transition = 'opacity 0.2s ease';
        tooltip.style.opacity = 0;
        activeTooltipTarget = null;
        stopFollowingElement();
    }

    // Desktop hover
    document.body.addEventListener('mouseover', e => {
        if (isTouchInteraction || Date.now() < suppressMouseUntil) return;
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;
        const isDifferentTarget = activeTooltipTarget && activeTooltipTarget !== target;
        activeTooltipTarget = target;
        showTooltip(target.dataset.tooltip, e.pageX, e.pageY, isDifferentTarget || !tooltip.style.opacity || tooltip.style.opacity === '0');
    });

    document.body.addEventListener('mousemove', e => {
        if (isTouchInteraction || Date.now() < suppressMouseUntil) return;
        if (!tooltip.textContent) return;
        moveTooltip(e.pageX, e.pageY);
    });

    document.body.addEventListener('mouseout', e => {
        if (isTouchInteraction || Date.now() < suppressMouseUntil) return;
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;
        hideTooltip();
    });

    // Mobile touch
    document.body.addEventListener('touchstart', e => {
        isTouchInteraction = true;
        suppressMouseUntil = Date.now() + 700;
        const target = e.target.closest('[data-tooltip]');

        // If tapping the same element that's already showing, ignore (prevent double tap)
        if (target && target === activeTooltipTarget) {
            return;
        }

        // If tapping a different tooltip element, show new tooltip
        if (target) {
            activeTooltipTarget = target;
            const touch = e.touches[0];
            const isTooltipVisible = tooltip.style.opacity === '1';
            showTooltip(target.dataset.tooltip, touch.pageX, touch.pageY, !isTooltipVisible);
            positionTooltipForElement(target);
            startFollowingElement();
        } else {
            // Tapped elsewhere, hide tooltip
            hideTooltip();
        }
    }, { passive: true });

    document.body.addEventListener('touchend', () => {
        isTouchInteraction = false;
    }, { passive: true });

    document.body.addEventListener('touchcancel', () => {
        isTouchInteraction = false;
    }, { passive: true });

    document.body.addEventListener('touchmove', e => {
        if (!tooltip.textContent || !activeTooltipTarget) return;
        positionTooltipForElement(activeTooltipTarget);
    }, { passive: true });

    const battleLog = document.querySelector('.battle-log');
    const enemyHealthBar = document.querySelector('.enemy-health-bar-background');
    const battleStation = document.getElementById('battle-station');

    function updateBattleLogHeight() {
        if (!battleLog || !enemyHealthBar || !battleStation) return;
        const enemyRect = enemyHealthBar.getBoundingClientRect();
        const stationRect = battleStation.getBoundingClientRect();

        if (enemyRect.height === 0 || stationRect.height === 0) return;

        const top = Math.max(0, enemyRect.bottom + 20);
        const bottom = Math.max(0, window.innerHeight - stationRect.top + 10);

        battleLog.style.top = `${top}px`;
        battleLog.style.bottom = `${bottom}px`;
        battleLog.style.height = 'auto';
    }

    updateBattleLogHeight();
    window.addEventListener('resize', updateBattleLogHeight);
    window.addEventListener('orientationchange', () => {
        updateBattleLogHeight();
        requestAnimationFrame(updateBattleLogHeight);
    });

    if (window.ResizeObserver) {
        const logObserver = new ResizeObserver(() => {
            updateBattleLogHeight();
        });
        if (enemyHealthBar) logObserver.observe(enemyHealthBar);
        if (battleStation) logObserver.observe(battleStation);
        if (battleLog) logObserver.observe(battleLog);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        const panel = document.getElementById('debug-panel');
        if (!panel) return;

        Alpine.$data(panel).open = !Alpine.$data(panel).open;
    }
});
