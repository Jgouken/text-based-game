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
    const playerData = JSON.parse(localStorage.getItem('textBasedData'));
    if (!playerData) return;

    player.level = Number(playerData.level);
    player.name = playerData.name;
    player.experience = Number(playerData.experience);
    player.weaponry = { weapon: assets.items.find(w => w.name == playerData.weaponry.weapon), level: Number(playerData.weaponry.level) };
    player.armory = { armor: assets.items.find(a => a.name == playerData.armory.armor), level: Number(playerData.armory.level) };
    player.health = Number(playerData.health);
    player.stamina = Number(playerData.stamina);
    player.pstatus = playerData.pstatus;
    player.inventory = playerData.inventory;

    setPlayer();
}

async function setPlayer() {
    const player = Alpine.$data(document.getElementById('player'));
    player.maxHealth = 500 + ((player.level - 1) * 250)
    player.maxStamina = 30 + ((player.level - 1) * 5)

    player.attack = Math.floor(32 + ((player.level - 1) * 6) + player.weaponry.weapon.attack + ((player.weaponry.level - 1) * player.weaponry.weapon.attackPerLevel))
    player.defense = Math.floor(60 + ((player.level - 1) * 10) + player.armory.armor.defense + ((player.armory.level - 1) * player.armory.armor.alvlmult))
    player.crit = player.weaponry.weapon.crit;
    player.critdmg = player.weaponry.weapon.critdmg;
    player.accuracy = player.weaponry.weapon.accuracy;
    player.evasion = player.armory.armor.evasion;

    updateBars();
}

async function savePlayer() {
    const player = Alpine.$data(document.getElementById('player'));
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
    console.log("Game Saved");
}

async function resetPlayer() {
    // set all player data to maximum values
    const player = Alpine.$data(document.getElementById('player'));
    player.health = player.maxHealth;
    player.stamina = player.maxStamina;
    updateBars();
}