async function resetBars(screen) {
    document.getElementById(`health-${screen}`).style.width = "0px";
    document.getElementById(`stamina-${screen}`).style.width = "0px";
    document.getElementById(`experience-${screen}`).style.width = "0px";
    document.getElementById(`enemy`).style.width = "0px";
}

async function updateBars() {
    await new Promise(resolve => setTimeout(resolve, 100)); // Forces it to wait a tick to allow CSS transition to work
    const alpinePlayerData = Alpine.$data(document.getElementById(`player`));
    const alpineEnemyData = Alpine.$data(document.getElementById(`enemy`));

    document.getElementById(`health`).style.width = `${Math.floor(((alpinePlayerData.health < 0.1 ? 0 : alpinePlayerData.health) / alpinePlayerData.maxHealth) * 560)}px`;
    document.getElementById(`stamina`).style.width = `${Math.floor(((alpinePlayerData.stamina < 0.1 ? 0 : alpinePlayerData.stamina) / alpinePlayerData.maxStamina) * 310)}px`;
    document.getElementById(`experience`).style.width = `${Math.floor(((alpinePlayerData.experience < 0.1 ? 0 : alpinePlayerData.experience) / Math.floor((alpinePlayerData.level / 0.07) ** 2)) * 450)}px`;
    document.getElementById(`enemy-health`).style.width = `${Math.floor(((alpineEnemyData.health < 0.1 ? 0 : alpineEnemyData.health) / alpineEnemyData.maxHealth) * 80)}%`;
}

async function startPlayer() {
    const player = Alpine.$data(document.getElementById('player'));
    const background = Alpine.$data(document.getElementById('background-image'));
    const raw = localStorage.getItem('textBasedData');
    if (!raw) return setPlayer();

    let playerData;
    try { playerData = JSON.parse(raw); } catch (e) { console.error('Invalid save data', e); return; }
    const assets = getAssets();

    player.level = Number(playerData.level) || player.level;
    player.name = playerData.name || player.name;
    player.experience = Number(playerData.experience) || player.experience;

    const weaponField = playerData.weaponry && playerData.weaponry.weapon;
    const weaponName = typeof weaponField === 'string' ? weaponField : (weaponField && weaponField.name);
    let weaponItem = assets.items.find(w => w.name === weaponName);
    if (!weaponItem) weaponItem = assets.items.find(i => 'attack' in i) || assets.items[0];
    const weaponLevel = Number(playerData.weaponry && playerData.weaponry.level) || 1;
    player.weaponry = { weapon: weaponItem, level: weaponLevel };

    const armorField = playerData.armory && playerData.armory.armor;
    const armorName = typeof armorField === 'string' ? armorField : (armorField && armorField.name);
    let armorItem = assets.items.find(a => a.name === armorName);
    if (!armorItem) armorItem = assets.items.find(i => 'defense' in i) || assets.items[0];
    const armorLevel = Number(playerData.armory && playerData.armory.level) || 1;
    player.armory = { armor: armorItem, level: armorLevel };

    player.health = Number(playerData.health) || player.maxHealth;
    player.stamina = Number(playerData.stamina) || player.maxStamina;
    player.pstatus = Array.isArray(playerData.pstatus) ? playerData.pstatus : [];
    player.inventory = Array.isArray(playerData.inventory) ? playerData.inventory : [];
    background.location = playerData.location || "Warhamshire";

    setPlayer();
}

async function setPlayer() {
    const player = Alpine.$data(document.getElementById('player'));
    player.maxHealth = 500 + ((player.level - 1) * 250)
    player.maxStamina = 50 + ((player.level - 1) * 5)

    player.attack = Math.floor(32 + ((player.level - 1) * 6) + player.weaponry.weapon.attack + ((player.weaponry.level - 1) * player.weaponry.weapon.attackPerLevel))
    player.defense = Math.floor(60 + ((player.level - 1) * 10) + player.armory.armor.defense + ((player.armory.level - 1) * player.armory.armor.alvlmult))
    player.crit = player.weaponry.weapon.crit;
    player.critdmg = player.weaponry.weapon.critdmg;
    player.accuracy = player.weaponry.weapon.accuracy;
    player.evasion = player.armory.armor.evasion;

    updateBars();
    savePlayer();
}

async function savePlayer() {
    const player = Alpine.$data(document.getElementById('player'));
    const background = Alpine.$data(document.getElementById('background-image'));
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
    console.log("Game Saved");
}

async function resetPlayer() {
    // set all player data to maximum values
    const player = Alpine.$data(document.getElementById('player'));
    player.health = player.maxHealth;
    player.stamina = player.maxStamina;
    updateBars();
}