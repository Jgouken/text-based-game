let ready = false;
const AudioManager = (function () {
    const basePath = 'assets/sounds/';
    const filenames = [
        'TBG Main.mp3',
        'TBG Low Health.mp3',
        'TBG Hinterland.mp3',
        'TBG Vexadel.mp3',
        'TBG Vulpeston.mp3',
        'TBG Warhamshire.mp3',
        'TBG Eternal Damnation.mp3',
        'TBG Melody.mp3',
        'TBG Sanguisuge.mp3',
        'TBG Uralan Mountains.mp3'
    ];

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(audioContext.destination);
    const musicGain = audioContext.createGain();
    const sfxGain = audioContext.createGain();
    musicGain.connect(masterGain);
    sfxGain.connect(masterGain);

    const tracks = {};
    const lookup = {};
    for (const f of filenames) {
        const key = f.replace(/^TBG\s*/i, '').replace(/\.mp3$/i, '').replace(/\s+/g, '').toLowerCase();
        lookup[key] = f;
        tracks[f] = { buffer: null, gain: audioContext.createGain(), source: null };
        tracks[f].gain.gain.value = 0;
        tracks[f].gain.connect(musicGain);
    }
    const aliases = {
        'sangstonmansion': 'TBG Sanguisuge.mp3',
        'sangston': 'TBG Sanguisuge.mp3',
        'sanguisuge': 'TBG Sanguisuge.mp3'
    };
    for (const k of Object.keys(aliases)) lookup[k] = aliases[k];

    let startTimestamp = null;
    let decoded = false;
    let lowHealthLocked = false;

    let sfxMuted = false;
    let musicMuted = false;
    let musicVolume = 1;
    let sfxVolume = 1;
    try { sfxMuted = JSON.parse(localStorage.getItem('tbgMuted') || 'false'); } catch (e) { sfxMuted = false; }
    try { musicMuted = JSON.parse(localStorage.getItem('tbgMusicMuted') || 'false'); } catch (e) { musicMuted = false; }
    try { const mv = parseFloat(localStorage.getItem('tbgMusicVolume')); if (!isNaN(mv)) musicVolume = Math.max(0, Math.min(1, mv)); } catch (e) { }
    try { const sv = parseFloat(localStorage.getItem('tbgSfxVolume')); if (!isNaN(sv)) sfxVolume = Math.max(0, Math.min(1, sv)); } catch (e) { }
    try {
        musicGain.gain.value = musicMuted ? 0 : musicVolume;
    } catch (e) { }
    try {
        sfxGain.gain.value = sfxMuted ? 0 : sfxVolume;
    } catch (e) { }

    async function loadAll() {
        const promises = filenames.map(async (name) => {
            try {
                const res = await fetch(basePath + name);
                const ab = await res.arrayBuffer();
                const buf = await audioContext.decodeAudioData(ab.slice(0));
                tracks[name].buffer = buf;
            } catch (e) {
                console.warn('Failed to load', name, e);
            }
        });
        await Promise.all(promises);
        decoded = true;
    }

    async function preloadAll() {
        if (decoded) return;
        try {
            await loadAll();
        } catch (e) { }
    }

    function getSoundList() {
        try { return filenames.slice(); } catch (e) { return []; }
    }

    function playDebug(name) {
        if (!name) return;
        try {
            const url = basePath + name;
            try {
                const a = new Audio(url);
                a.volume = 1;
                a.play().catch(() => { });
                return;
            } catch (e) {

                const b = new Audio(url);
                b.volume = 1;
                b.play().catch(() => { });
            }
        } catch (e) { }
    }

    document.addEventListener('DOMContentLoaded', () => {
        try {
            const sel = document.getElementById('debug-audio-select');
            const btn = document.getElementById('debug-play-audio');
            if (!sel || !btn) return;
            const list = (window.AudioManager && AudioManager.getSoundList) ? AudioManager.getSoundList() : [];

            sel.innerHTML = '';
            list.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = name;
                sel.appendChild(opt);
            });
            btn.addEventListener('click', () => {
                const v = sel.value;
                if (!v) return;
                try {
                    if (window.AudioManager && AudioManager.playDebug) AudioManager.playDebug(v);
                    else {
                        const a = new Audio('assets/sounds/' + v);
                        a.volume = 1;
                        a.play().catch(() => { });
                    }
                } catch (e) { console.warn('Play debug audio failed', e); }
            });
        } catch (e) { }
    });

    function createAndStartSource(name) {
        const t = tracks[name];
        if (!t || !t.buffer) return;
        if (t.source) return;
        const src = audioContext.createBufferSource();
        src.buffer = t.buffer;
        src.loop = true;
        src.connect(t.gain);
        if (!startTimestamp) startTimestamp = audioContext.currentTime;
        const now = audioContext.currentTime;
        const offset = ((now - startTimestamp) % t.buffer.duration + t.buffer.duration) % t.buffer.duration;
        try {
            src.start(0, offset);
        } catch (e) { try { src.start(); } catch (e) { } }
        t.source = src;
    }

    function ensureStartedAll() {
        if (!startTimestamp) startTimestamp = audioContext.currentTime;
        for (const name of filenames) createAndStartSource(name);
    }

    function setGain(name, value, fade = 0.6) {
        const t = tracks[name];
        if (!t) return;
        const g = t.gain.gain;
        const now = audioContext.currentTime;
        try {
            g.cancelScheduledValues(now);
            g.setValueAtTime(g.value || 0, now);
            g.linearRampToValueAtTime(value, now + fade);
        } catch (e) {
            try { g.value = value; } catch (_) { }
        }
    }

    function findTrackForLocation(location) {
        if (!location) return null;
        const norm = location.replace(/\s+/g, '').toLowerCase();
        if (lookup[norm]) return lookup[norm];
        for (const key of Object.keys(lookup)) {
            if (key.length >= 4 && (norm.includes(key) || key.includes(norm) || norm.slice(0, 5) === key.slice(0, 5))) return lookup[key];
        }
        return null;
    }
    let resumed = false;
    function tryResumeAndStart() {
        if (resumed) return;
        const resumeIfNeeded = async () => {
            try { await audioContext.resume(); } catch (e) { }
            if (!decoded) await loadAll();
            ensureStartedAll();
            resumed = true;

            try {
                musicGain.gain.setValueAtTime(musicMuted ? 0 : musicVolume, audioContext.currentTime);
                sfxGain.gain.setValueAtTime(sfxMuted ? 0 : sfxVolume, audioContext.currentTime);
            } catch (e) { }
            document.removeEventListener('click', resumeIfNeeded);
            document.removeEventListener('touchstart', resumeIfNeeded);
            document.removeEventListener('keydown', resumeIfNeeded);
        };
        document.addEventListener('click', resumeIfNeeded, { once: true });
        document.addEventListener('touchstart', resumeIfNeeded, { once: true, passive: true });
        document.addEventListener('keydown', resumeIfNeeded, { once: true });
    }
    async function update(playerName, location) {
        tryResumeAndStart();
        const main = 'TBG Main.mp3';
        const low = 'TBG Low Health.mp3';
        const war = 'TBG Warhamshire.mp3';
        const mainVol = 0.45;

        const locTrack = findTrackForLocation(location);
        if (!decoded) loadAll();
        if (decoded && resumed) ensureStartedAll();
        const eternal = 'TBG Eternal Damnation.mp3';
        if (locTrack === eternal) {

            for (const name of filenames) {
                if (name === eternal) setGain(name, 1.0);
                else setGain(name, 0);
            }
            return;
        }
        const mainTrack = lowHealthLocked ? low : main;
        setGain(mainTrack, mainVol);

        if (!playerName) {

            for (const name of filenames) if (name !== main) setGain(name, 0);
            return;
        }

        if (locTrack && locTrack !== main) setGain(locTrack, 0.7);

        if (locTrack && locTrack.toLowerCase() !== (('TBG ' + location + '.mp3').toLowerCase())) {
            setGain(war, 0.35);
        } else if ((locTrack && locTrack === war) || (!locTrack && (location || '').replace(/\s+/g, '').toLowerCase() === 'warhamshire')) {
            setGain(war, 0.35);
        } else {
            setGain(war, 0);
        }
        for (const name of filenames) {
            if (name !== mainTrack && name !== locTrack && name !== war) setGain(name, 0);
        }
    }
    async function switchMainForLowHealth() {
        tryResumeAndStart();
        if (!decoded) await loadAll();
        if (decoded) ensureStartedAll();

        const main = 'TBG Main.mp3';
        const low = 'TBG Low Health.mp3';
        const mainVol = 0.45;

        let player = null;
        try { player = Alpine.$data(document.getElementById('player')) || null; } catch (e) { player = null; }
        let healthRatio = null;
        if (player && typeof player === 'object') {
            const h = Number(player.health || 0);
            const mh = Number(player.maxHealth || player.maxhealth || 0);
            if (mh > 0) healthRatio = h / mh;
        }

        if (healthRatio !== null && healthRatio < 0.25) {
            console.debug('AudioManager.switchMainForLowHealth: player low health -> using low health track', healthRatio);
            lowHealthLocked = true;
            try { createAndStartSource(low); createAndStartSource(main); } catch (e) { }
            setGain(low, mainVol);
            setGain(main, 0);
        } else {
            console.debug('AudioManager.switchMainForLowHealth: player healthy -> using main track', healthRatio);
            lowHealthLocked = false;
            try { createAndStartSource(main); createAndStartSource(low); } catch (e) { }
            setGain(main, mainVol);
            setGain(low, 0);
        }
    }
    tryResumeAndStart();
    const oneShotCache = {};
    async function loadOneShot(name) {
        if (oneShotCache[name]) return oneShotCache[name];
        try {
            const res = await fetch(basePath + name);
            const ab = await res.arrayBuffer();
            const buf = await audioContext.decodeAudioData(ab.slice(0));
            oneShotCache[name] = buf;
            return buf;
        } catch (e) {
            console.warn('Failed to load one-shot', name, e);
            throw e;
        }
    }

    function playOneShot(name, volume = 1) {
        try {

            if (sfxMuted) return;
            tryResumeAndStart();
            const play = async () => {
                try {
                    const buf = await loadOneShot(name);
                    const src = audioContext.createBufferSource();
                    src.buffer = buf;
                    const g = audioContext.createGain();
                    g.gain.value = volume;
                    src.connect(g);
                    g.connect(sfxGain);
                    src.start(0);
                    src.onended = () => { try { src.disconnect(); g.disconnect(); } catch (e) { } };
                } catch (e) {
                    try { const a = new Audio(basePath + name); a.volume = Math.max(0, Math.min(1, volume)); a.play().catch(() => { }); } catch (e) { }
                }
            };
            play();
        } catch (e) { }
    }

    function playRandomHit() {
        const idx = Math.floor(Math.random() * 4) + 1;
        playOneShot(`hitHurt${idx}.mp3`, 0.9);
    }

    function playEffectSound() {
        playOneShot('Effect.mp3', 1.0);
    }

    function playEffectNoAttack() {
        playOneShot('EffectNoAttack.mp3', 1.0);
    }

    function playMiss() {
        playOneShot('Miss.mp3', 0.9);
    }

    function playAnimalNoise(name) {
        try {
            const n = (name || '').toString().toLowerCase();
            if (n.includes('cow')) playOneShot('Moo.mp3', 0.9);
            else if (n.includes('sheep')) playOneShot('Sheep.mp3', 0.9);
            else if (n.includes('chicken')) playOneShot('Chicken.mp3', 0.9);
            else if (n.includes('pig')) playOneShot('Pig.mp3', 0.9);
            else playOneShot('Moo.mp3', 0.9);
        } catch (e) {
            playOneShot('Moo.mp3', 0.9);
        }
    }

    function playStatusEffect() { playOneShot('StatusEffect.mp3', 0.9); }
    function playDeath() { playOneShot('Dead.mp3', 0.8); }
    function playCrit() { playOneShot('Crit.mp3', 1.0); }
    function playItemFound() { playOneShot('ItemFound.mp3', 1.0); }
    function playCrafted() { playOneShot('Crafted.mp3', 1.0); }
    function playChestFound() { playOneShot('ChestFound.mp3', 1.0); }
    function playChestOpen() { playOneShot('ChestOpen.mp3', 1.0); }
    function playChestLocked() { playOneShot('ChestLocked.mp3', 1.0); }

    function playButtonHover() {
        playOneShot('ButtonHover.mp3', 0.5);
    }

    function playClick() {
        playOneShot('Click.mp3', 0.8);
    }

    function playEquip() { playOneShot('Equip.mp3', 1.0); }
    function playUnequip() { playOneShot('Unequip.mp3', 1.0); }
    function playExplosion() { playOneShot('Explosion.mp3', 1.0); }

    function setSfxVolume(v) {
        sfxVolume = Math.max(0, Math.min(1, Number(v) || 0));
        try {
            const now = audioContext.currentTime;
            sfxGain.gain.cancelScheduledValues(now);
            sfxGain.gain.setValueAtTime(sfxGain.gain.value || (sfxMuted ? 0 : sfxVolume), now);
            sfxGain.gain.linearRampToValueAtTime(sfxMuted ? 0 : sfxVolume, now + 0.05);
        } catch (e) {
            try { sfxGain.gain.value = sfxMuted ? 0 : sfxVolume; } catch (e) { }
        }
        try { localStorage.setItem('tbgSfxVolume', String(sfxVolume)); } catch (e) { }
    }

    function getSfxVolume() { return sfxVolume; }

    function setSfxMuted(v) {
        sfxMuted = !!v;
        try {
            const now = audioContext.currentTime;
            sfxGain.gain.cancelScheduledValues(now);
            sfxGain.gain.setValueAtTime(sfxGain.gain.value || (sfxMuted ? 0 : sfxVolume), now);
            sfxGain.gain.linearRampToValueAtTime(sfxMuted ? 0 : sfxVolume, now + 0.05);
        } catch (e) {
            try { sfxGain.gain.value = sfxMuted ? 0 : sfxVolume; } catch (e) { }
        }
        try { localStorage.setItem('tbgMuted', JSON.stringify(sfxMuted)); } catch (e) { }
    }

    function isSfxMuted() { return !!sfxMuted; }

    function setMusicVolume(v) {
        musicVolume = Math.max(0, Math.min(1, Number(v) || 0));
        try {
            const now = audioContext.currentTime;
            musicGain.gain.cancelScheduledValues(now);
            musicGain.gain.setValueAtTime(musicGain.gain.value || (musicMuted ? 0 : musicVolume), now);
            musicGain.gain.linearRampToValueAtTime(musicMuted ? 0 : musicVolume, now + 0.05);
        } catch (e) {
            try { musicGain.gain.value = musicMuted ? 0 : musicVolume; } catch (e) { }
        }
        try { localStorage.setItem('tbgMusicVolume', String(musicVolume)); } catch (e) { }
    }

    function getMusicVolume() { return musicVolume; }

    function setMusicMuted(v) {
        musicMuted = !!v;
        try {
            const now = audioContext.currentTime;
            musicGain.gain.cancelScheduledValues(now);
            musicGain.gain.setValueAtTime(musicGain.gain.value || (musicMuted ? 0 : musicVolume), now);
            musicGain.gain.linearRampToValueAtTime(musicMuted ? 0 : musicVolume, now + 0.05);
        } catch (e) {
            try { musicGain.gain.value = musicMuted ? 0 : musicVolume; } catch (e) { }
        }
        try { localStorage.setItem('tbgMusicMuted', JSON.stringify(musicMuted)); } catch (e) { }
    }

    function isMusicMuted() { return !!musicMuted; }
    function setMuted(v) { return setSfxMuted(v); }
    function isMuted() { return isSfxMuted(); }

    return { update, switchMainForLowHealth, preloadAll, getSoundList, playDebug, setMuted, isMuted, setSfxMuted, isSfxMuted, setSfxVolume, getSfxVolume, setMusicMuted, isMusicMuted, setMusicVolume, getMusicVolume, playRandomHit, playEffectSound, playEffectNoAttack, playMiss, playAnimalNoise, playStatusEffect, playDeath, playCrit, playItemFound, playCrafted, playChestFound, playChestOpen, playChestLocked, playButtonHover, playClick, playEquip, playUnequip, playExplosion };
})();

function playSound(name, volume) {
    if (!name) return;
    try {
        const url = (name && name.includes('/')) ? name : ('assets/sounds/' + name);
        const a = new Audio(url);
        let vol = 0.5;
        if (typeof volume !== 'undefined' && volume !== null) {
            vol = Number(volume) || 0;
            if (vol > 1) vol = vol / 100;
            if (vol < 0) vol = 0;
            if (vol > 1) vol = 1;
        }
        a.volume = vol;
        a.play().catch(() => { });
    } catch (e) { console.warn('playSound failed', e); }
}

try { window.playSound = playSound; } catch (e) { }

document.addEventListener('DOMContentLoaded', () => {

    try {
        const overlay = document.createElement('div');
        overlay.id = 'audio-loading-overlay';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.85)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 10000;
        overlay.style.color = 'white';
        overlay.style.fontSize = '18px';
        overlay.style.fontFamily = 'sans-serif';
        overlay.innerHTML = '<div style="text-align:center"><div style="width:48px;height:48px;border:4px solid rgba(255,255,255,0.15);border-top-color:white;border-radius:50%;animation:spin 1s linear infinite"></div></div>';
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
        document.body.appendChild(overlay);

        (function addSkipOverlayListener() {
            function onKey(e) {
                if (e.key === 'Enter') {
                    try {
                        overlay.style.transition = 'opacity 0.15s ease';
                        overlay.style.opacity = '0';
                        setTimeout(() => { try { overlay.remove(); } catch (err) { } }, 180);
                    } catch (err) { }
                    document.removeEventListener('keydown', onKey);
                }
            }
            document.addEventListener('keydown', onKey);
        })();

        (async () => {
            try {
                if (AudioManager && AudioManager.preloadAll) await AudioManager.preloadAll();
            } catch (e) { }
            try {
                overlay.style.transition = 'opacity 0.3s ease';
                overlay.style.opacity = '0';
                setTimeout(() => { try { overlay.remove(); } catch (e) { } }, 350);
            } catch (e) { try { overlay.remove(); } catch (e) { } }
        })();

    } catch (e) { }
    try {
        const audioContainer = document.createElement('div');
        audioContainer.id = 'audio-controls';
        audioContainer.style.position = 'fixed';
        audioContainer.style.left = '12px';
        audioContainer.style.bottom = '12px';
        audioContainer.style.display = 'flex';
        audioContainer.style.height = 'fit-content';
        audioContainer.style.flexDirection = 'column';
        audioContainer.style.gap = '6px';
        audioContainer.style.padding = '6px';
        audioContainer.style.background = 'rgba(0,0,0,0.0)';
        audioContainer.style.borderRadius = '8px';
        audioContainer.style.zIndex = 9999;
        audioContainer.style.alignItems = 'flex-start';

        function makeButton(html, title) {
            const b = document.createElement('button');
            b.className = 'audio-btn';
            b.innerHTML = html;
            b.style.width = '60px';
            b.style.height = '60px';
            b.style.borderRadius = '8px';
            b.style.fontSize = '20px';
            b.style.display = 'flex';
            b.style.alignItems = 'center';
            b.style.justifyContent = 'center';
            b.style.background = 'rgba(30,30,30,0.85)';
            b.style.color = 'white';
            b.style.border = 'none';
            b.style.cursor = 'pointer';
            b.dataset.tooltip = title;
            b.setAttribute('aria-pressed', 'false');
            return b;
        }

        function makeSlider(initialPercent, onInput) {
            const input = document.createElement('input');
            input.type = 'range';
            input.min = 0; input.max = 100; input.value = String(initialPercent);
            input.style.width = '180px';
            input.style.marginLeft = '10px';
            input.style.display = 'none';
            input.addEventListener('input', (e) => onInput(Number(e.target.value)));
            return input;
        }
        const musicWrapper = document.createElement('div');
        musicWrapper.style.display = 'flex';
        musicWrapper.style.alignItems = 'center';
        musicWrapper.style.gap = '8px';

        const musicIconOn = '<i class="fa-solid fa-music"></i>';
        const musicIconOff = '<i class="fa-solid fa-play"></i>';
        const musicBtn = makeButton(musicIconOn, 'Background Music');
        musicBtn.id = 'music-button';

        const musicInitial = Math.round((AudioManager.getMusicVolume ? AudioManager.getMusicVolume() : 1) * 100);
        const musicSlider = makeSlider(musicInitial, v => { try { AudioManager.setMusicVolume(v / 100); } catch (e) { } });

        musicWrapper.appendChild(musicBtn);
        musicWrapper.appendChild(musicSlider);
        const sfxWrapper = document.createElement('div');
        sfxWrapper.style.display = 'none';
        sfxWrapper.style.alignItems = 'center';
        sfxWrapper.style.gap = '8px';

        const sfxIconOn = '<i class="fa-solid fa-volume-high"></i>';
        const sfxIconOff = '<i class="fa-solid fa-volume-xmark"></i>';
        const sfxBtn = makeButton(sfxIconOn, 'Sound Effects');
        sfxBtn.id = 'mute-button';

        const sfxInitial = Math.round((AudioManager.getSfxVolume ? AudioManager.getSfxVolume() : 1) * 100);
        const sfxSlider = makeSlider(sfxInitial, v => { try { AudioManager.setSfxVolume(v / 100); } catch (e) { } });

        sfxWrapper.appendChild(sfxBtn);
        sfxWrapper.appendChild(sfxSlider);

        audioContainer.appendChild(musicWrapper);
        audioContainer.appendChild(sfxWrapper);
        document.body.appendChild(audioContainer);
        try {
            const musicMutedNow = AudioManager.isMusicMuted ? AudioManager.isMusicMuted() : false;
            musicBtn.innerHTML = musicMutedNow ? musicIconOff : musicIconOn;
            musicBtn.setAttribute('aria-pressed', musicMutedNow ? 'true' : 'false');
        } catch (e) { }
        try {
            const sfxMutedNow = AudioManager.isSfxMuted ? AudioManager.isSfxMuted() : false;
            sfxBtn.innerHTML = sfxMutedNow ? sfxIconOff : sfxIconOn;
            sfxBtn.setAttribute('aria-pressed', sfxMutedNow ? 'true' : 'false');
        } catch (e) { }
        audioContainer.addEventListener('mouseenter', () => {

            sfxWrapper.style.display = 'flex';
            musicSlider.style.display = 'block';
            sfxSlider.style.display = 'none';
        });
        audioContainer.addEventListener('mouseleave', () => {

            musicSlider.style.display = 'none';
            sfxSlider.style.display = 'none';
            sfxWrapper.style.display = 'none';
        });
        musicWrapper.addEventListener('mouseenter', () => {
            musicSlider.style.display = 'block';
            sfxSlider.style.display = 'none';
        });
        sfxWrapper.addEventListener('mouseenter', () => {
            sfxSlider.style.display = 'block';
            musicSlider.style.display = 'none';
        });
        musicBtn.addEventListener('click', () => {
            try {
                const willMute = !(AudioManager.isMusicMuted ? AudioManager.isMusicMuted() : false);
                AudioManager.setMusicMuted(willMute);
                musicBtn.innerHTML = willMute ? musicIconOff : musicIconOn;
                musicBtn.setAttribute('aria-pressed', willMute ? 'true' : 'false');
            } catch (e) { console.warn('Music toggle failed', e); }
        });
        sfxBtn.addEventListener('click', () => {
            try {
                const willMute = !(AudioManager.isSfxMuted ? AudioManager.isSfxMuted() : false);
                AudioManager.setSfxMuted(willMute);
                sfxBtn.innerHTML = willMute ? sfxIconOff : sfxIconOn;
                sfxBtn.setAttribute('aria-pressed', willMute ? 'true' : 'false');
            } catch (e) { console.warn('SFX toggle failed', e); }
        });
        musicBtn.addEventListener('touchstart', () => {
            sfxWrapper.style.display = 'flex';
            musicSlider.style.display = 'block';
        }, { passive: true });

    } catch (e) { console.warn('Failed to create audio controls', e); }
    AudioManager.switchMainForLowHealth();
});
(() => {
    let watcher = {
        intervalId: null,
        lastVal: null,
        playerRef: null
    };

    function clearWatcher() {
        if (watcher.intervalId) {
            clearInterval(watcher.intervalId);
            watcher.intervalId = null;
        }
        watcher.lastVal = null;
        watcher.playerRef = null;
    }

    function attach() {
        clearWatcher();
        let player;
        try { player = Alpine.$data(document.getElementById('player')); } catch (e) { player = null; }
        if (!player) return;
        watcher.playerRef = player;

        try {
            const desc = Object.getOwnPropertyDescriptor(player, 'health');

            let val = player.health;

            if (desc && desc.configurable === false) throw new Error('non-configurable');

            Object.defineProperty(player, 'health', {
                configurable: true,
                enumerable: true,
                get() { return val; },
                set(v) {
                    AudioManager.switchMainForLowHealth();
                }
            });
            watcher.lastVal = val;
        } catch (e) {

            watcher.lastVal = player.health;
            watcher.intervalId = setInterval(() => {
                let p;
                try { p = Alpine.$data(document.getElementById('player')); } catch (err) { p = null; }
                if (!p) return;

                if (p !== watcher.playerRef) {
                    attach();
                    return;
                }
                const v = p.health;
                if (v !== watcher.lastVal) {
                    watcher.lastVal = v;
                    AudioManager.switchMainForLowHealth();
                }
            }, 200);
        }
    }
    const tryAttachOnce = () => { try { attach(); } catch (e) { } };
    document.addEventListener('DOMContentLoaded', tryAttachOnce);

    setTimeout(tryAttachOnce, 500);
    setTimeout(tryAttachOnce, 1500);
})();
function setBackgroundForLocation(location) {
    const loc = (location || 'Warhamshire').replace(/\s+/g, '');
    const bgEl = document.getElementById('background-image');
    bgEl.style.background = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.99), rgba(0, 0, 0, 0.75)), url('assets/backgrounds/${loc}.jpg')`;
    bgEl.style.backgroundPosition = 'center';
    bgEl.style.backgroundRepeat = 'no-repeat';
    bgEl.style.backgroundSize = 'cover';
}

function startup() {
    console.log("Startup function called.");
    const saved = JSON.parse(localStorage.getItem('textBasedData'));
    const bgData = Alpine.$data(document.getElementById('background-image'));
    const loc = saved?.location || bgData?.location || 'Warhamshire';
    setBackgroundForLocation(loc);
    fadeOutEffect();
    try {
        const player = Alpine.$data(document.getElementById('player')) || {};
        AudioManager.update(player.name, loc);
    } catch (e) { }
}

async function startGame(name) {
    const player = Alpine.$data(document.getElementById('player'));
    const background = Alpine.$data(document.getElementById('background-image'));
    Alpine.$data(document.getElementById("background-image")).name = name;
    console.log("Game started with name: " + name);

    await fadeInOutEffect("returning");
    Alpine.$data(document.getElementById("background-image")).showPlayerBar = true;

    try {
        const playerName = player?.name;
        const bg = Alpine.$data(document.getElementById('background-image'));
        AudioManager.update(playerName, bg?.location);
    } catch (e) { }

    localStorage.setItem('textBasedData', JSON.stringify({
        name: player.name,
        level: player.level,
        health: player.health,
        stamina: player.stamina,
        experience: player.experience,
        weaponry: { weapon: player.weaponry.weapon.name, level: player.weaponry.level },
        armory: { armor: player.armory.armor.name, level: player.armory.level },
        pstatus: player.pstatus,
        inventory: player.inventory,
        location: background.location
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

        const parsed = JSON.parse(decrypted);

        const requiredKeys = [
            'name', 'level', 'health', 'stamina', 'experience',
            'weaponry', 'armory', 'pstatus', 'inventory', 'location'
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
    const background = Alpine.$data(document.getElementById('background-image'));
    const saveData = JSON.stringify({
        name: player.name,
        level: player.level,
        health: player.health,
        stamina: player.stamina,
        experience: player.experience,
        weaponry: { weapon: player.weaponry.weapon.name, level: player.weaponry.level },
        armory: { armor: player.armory.armor.name, level: player.armory.level },
        pstatus: player.pstatus,
        inventory: player.inventory,
        location: background.location
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
    if (ready) return;
    ready = true;

    await fadeInEffect();
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
        const bgData = Alpine.$data(document.getElementById('background-image'));
        const loc = (bgData && bgData.location) ? bgData.location : null;
        const bases = [];
        if (loc) bases.push(loc.replace(/\s+/g, ''));
        bases.push('Warhamshire');

        const exts = ['.jpg', '.png', '.gif'];
        let fileName = null;
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
    try {
        const player = Alpine.$data(document.getElementById('player')) || {};
        const bg = Alpine.$data(document.getElementById('background-image')) || {};
        AudioManager.update(player.name, bg.location);
    } catch (e) { }
    await fadeOutEffect();
    ready = false;
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

    function isTooltipLockedForMessage() {
        const lockUntil = Number(tooltip?.dataset?.lockUntil || 0);
        return lockUntil > Date.now();
    }

    function showTooltip(content, x, y, animate = true, isHtml = false) {
        if (isHtml) {
            tooltip.innerHTML = content;
        } else {
            tooltip.textContent = content;
        }
        tooltip.style.transition = 'none';
        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';
        tooltip.style.left = '-9999px';
        tooltip.style.top = '-9999px';
        tooltip.getBoundingClientRect();
        moveTooltip(x, y);
        tooltip.style.visibility = 'visible';

        if (animate) {

            tooltip.style.opacity = 0;
            tooltip.style.transition = 'opacity 0.2s ease';
            requestAnimationFrame(() => {
                tooltip.style.opacity = 1;
            });
        } else {
            tooltip.style.transition = 'none';
            tooltip.style.opacity = 1;
        }
    }

    function getTooltipPayload(target) {
        if (!target) return { content: '', isHtml: false };
        if (target.hasAttribute('data-tooltip-html')) {
            return { content: target.getAttribute('data-tooltip-html') || '', isHtml: true };
        }
        return { content: target.getAttribute('data-tooltip') || '', isHtml: false };
    }

    function moveTooltip(x, y) {
        const padding = 12;

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        let left = x + padding;
        let top = y + padding * 2;
        if (left + tooltipWidth > screenWidth - padding) {
            left = screenWidth - tooltipWidth - padding;
        }
        if (top + tooltipHeight > screenHeight - padding) {
            top = screenHeight - tooltipHeight - padding;
        }
        if (left < padding) {
            left = padding;
        }
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
    document.body.addEventListener('mouseover', e => {
        if (isTooltipLockedForMessage()) return;
        if (isTouchInteraction || Date.now() < suppressMouseUntil) return;
        const hoverBtn = e.target.closest('button, [role="button"], .btn, .button');
        if (hoverBtn) {
            if (window.__lastHoverBtn !== hoverBtn) {
                window.__lastHoverBtn = hoverBtn;
                AudioManager.playButtonHover();
            }
        }

        const target = e.target.closest('[data-tooltip], [data-tooltip-html]');
        if (!target) return;
        const isDifferentTarget = activeTooltipTarget && activeTooltipTarget !== target;
        activeTooltipTarget = target;
        const payload = getTooltipPayload(target);
        showTooltip(payload.content, e.pageX, e.pageY, isDifferentTarget || !tooltip.style.opacity || tooltip.style.opacity === '0', payload.isHtml);
    });

    document.body.addEventListener('mousemove', e => {
        if (isTooltipLockedForMessage()) return;
        if (isTouchInteraction || Date.now() < suppressMouseUntil) return;
        if (!tooltip.textContent) return;
        moveTooltip(e.pageX, e.pageY);
    });

    document.body.addEventListener('mouseout', e => {
        if (isTooltipLockedForMessage()) return;
        if (isTouchInteraction || Date.now() < suppressMouseUntil) return;
        const btnEl = e.target.closest('button, [role="button"], .btn, .button');
        if (btnEl) {
            const related = e.relatedTarget;
            if (!related || !btnEl.contains(related)) window.__lastHoverBtn = null;
        }
        const target = e.target.closest('[data-tooltip], [data-tooltip-html]');
        if (!target) return;
        const related = e.relatedTarget;
        if (related && target.contains(related)) return;
        const relatedTooltipTarget = related?.closest?.('[data-tooltip], [data-tooltip-html]');
        if (relatedTooltipTarget && relatedTooltipTarget === target) return;
        hideTooltip();
    });
    document.body.addEventListener('click', e => {
        const btn = e.target.closest('button, [role="button"], .btn, .button');
        if (btn) AudioManager.playClick();
    });
    document.body.addEventListener('touchstart', e => {
        if (isTooltipLockedForMessage()) return;
        isTouchInteraction = true;
        suppressMouseUntil = Date.now() + 700;
        const target = e.target.closest('[data-tooltip], [data-tooltip-html]');
        if (target && target === activeTooltipTarget) {
            return;
        }
        if (target) {
            activeTooltipTarget = target;
            const touch = e.touches[0];
            const isTooltipVisible = tooltip.style.opacity === '1';
            const payload = getTooltipPayload(target);
            showTooltip(payload.content, touch.pageX, touch.pageY, !isTooltipVisible, payload.isHtml);
            positionTooltipForElement(target);
            startFollowingElement();
        } else {

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
        if (isTooltipLockedForMessage()) return;
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

function scalePlayerHUD() {
    const player = document.querySelector('.player');
    if (!player) return;
    const minScale = 0.2;
    const maxScale = 1;
    const minWidth = 320;
    const maxWidth = 900;
    const vw = window.innerWidth;
    let scale = vw / maxWidth;
    scale = Math.max(minScale, Math.min(maxScale, scale));
    player.style.transform = `scale(${scale})`;
    player.style.transformOrigin = 'bottom left';

    const bgData = Alpine.$data(document.getElementById('background-image'));
    const screen = bgData?.screen || '';

    if (window.innerHeight > window.innerWidth) {
        player.style.left = '50%';
        player.style.transformOrigin = 'bottom center';
        player.style.transform = `translateX(-50%) scale(${scale})`;
    } else {
        player.style.left = '0';
        player.style.transformOrigin = 'bottom left';
        player.style.transform = `scale(${scale})`;
    }
}

window.addEventListener('resize', scalePlayerHUD);
window.addEventListener('DOMContentLoaded', scalePlayerHUD);

function triggerScreenShake(ratio = 0.25) {
    ratio = 0.015;
    const bg = document.getElementById('background-image');
    const screenEl = document.getElementById('screen');
    const target = screenEl || bg || document.body || document.documentElement;
    if (!target) return;

    const maxPx = 14;
    const minPx = 2;
    const px = Math.max(minPx, Math.round(minPx + (maxPx - minPx) * ratio));

    const maxDeg = 3.2;
    const minDeg = 0;
    const deg = (minDeg + (maxDeg - minDeg) * ratio).toFixed(2) + 'deg';

    const minDur = 260;
    const maxDur = 640;
    const duration = Math.round(minDur + (maxDur - minDur) * ratio) + 'ms';

    target.style.setProperty('--shake-x', px + 'px');
    target.style.setProperty('--shake-y', Math.round(px * 0.6) + 'px');
    target.style.setProperty('--shake-rot', deg);
    target.style.setProperty('--shake-duration', duration);

    const frames = 7;
    const timings = Array.from({ length: frames }, (_, i) => i / (frames - 1));

    const rand = () => (Math.random() * 2 - 1);
    const parseDeg = parseFloat(deg) || 0.5;
    const maxExtraZoom = 0.06;
    const baseZoom = 1 + ratio * maxExtraZoom;

    const offsets = timings.map((t, i) => {
        if (i === timings.length - 1) return { x: 0, y: 0, r: 0, s: 1 };
        const falloff = 1 - (i / timings.length) * 0.85;
        const jitterX = Math.round(rand() * px * (0.5 + Math.random() * 0.9) * falloff);
        const jitterY = Math.round(rand() * px * (0.35 + Math.random() * 0.8) * falloff);
        const jitterR = (rand() * parseDeg * (0.4 + Math.random() * 0.9) * falloff);
        const s = 1 + (baseZoom - 1) * (0.6 + 0.4 * (1 - i / timings.length)) * falloff;
        return { x: jitterX, y: jitterY, r: +jitterR.toFixed(2), s: +s.toFixed(4) };
    });

    const dur = Math.max(120, Math.round(Math.max(100, Number(duration.replace('ms', '')) || 420)));
    const prevTransforms = new Map();
    [target, bg].forEach(el => { if (el) prevTransforms.set(el, el.style.transform || ''); });

    timings.forEach((t, i) => {
        const when = Math.round(dur * t);
        setTimeout(() => {
            const o = offsets[i];
            if (target) target.style.transform = `translate3d(${o.x}px, ${o.y}px, 0) rotate(${o.r}deg) scale(${o.s})`;
            if (bg) bg.style.transform = `translate3d(${o.x}px, ${o.y}px, 0) rotate(${o.r}deg) scale(${o.s})`;
        }, when);
    });

    setTimeout(() => {
        try {
            if (target) target.style.transform = prevTransforms.get(target) || '';
            if (bg) bg.style.transform = prevTransforms.get(bg) || '';
        } catch (e) { }
    }, dur);
}