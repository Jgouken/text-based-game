function getRequiredXP(level) {
    return Math.floor(((level / 0.07) ** 2) / 2);
}

async function resetBars(screen) {
    document.getElementById(`health-${screen}`).style.width = "0px";
    document.getElementById(`stamina-${screen}`).style.width = "0px";
    document.getElementById(`experience-${screen}`).style.width = "0px";
    document.getElementById(`enemy`).style.width = "0px";
}

async function updateBars() {
    await new Promise(resolve => setTimeout(resolve, 100));
    const alpinePlayerData = Alpine.$data(document.getElementById(`player`));
    const alpineEnemyData = Alpine.$data(document.getElementById(`enemy`));

    document.getElementById(`health`).style.width = `${alpinePlayerData.health <= alpinePlayerData.maxHealth ? Math.floor(((alpinePlayerData.health < 0.1 ? 0 : alpinePlayerData.health) / alpinePlayerData.maxHealth) * 560) : 560}px`;
    document.getElementById(`stamina`).style.width = `${alpinePlayerData.stamina <= alpinePlayerData.maxStamina ? Math.floor(((alpinePlayerData.stamina < 0.1 ? 0 : alpinePlayerData.stamina) / alpinePlayerData.maxStamina) * 310) : 310}px`;
    document.getElementById(`experience`).style.width = `${alpinePlayerData.experience <= getRequiredXP(alpinePlayerData.level) ? Math.floor(((alpinePlayerData.experience < 0.1 ? 0 : alpinePlayerData.experience) / getRequiredXP(alpinePlayerData.level)) * 450) : 450}px`;
    document.getElementById(`enemy-health`).style.width = `${Math.floor(((alpineEnemyData.health < 0.1 ? 0 : alpineEnemyData.health) / alpineEnemyData.maxHealth) * 80)}%`;
    AudioManager.switchMainForLowHealth();
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
    const weaponName = (weaponField && weaponField.name) || weaponField;
    let weaponItem = (assets.items.find(w => w.name === weaponName) || assets.weapons.find(w => w.name === weaponName) || assets.armors.find(w => w.name === weaponName));
    if (!weaponItem) weaponItem = (assets.weapons.find(i => i && 'attack' in i) || assets.items[0]);
    const weaponLevel = Number(playerData.weaponry && playerData.weaponry.level) || 1;
    player.weaponry = { weapon: weaponItem, level: weaponLevel };

    const armorField = playerData.armory && playerData.armory.armor;
    const armorName = (armorField && armorField.name) || armorField;
    let armorItem = (assets.items.find(a => a.name === armorName) || assets.armors.find(a => a.name === armorName) || assets.weapons.find(w => w.name === armorName));
    if (!armorItem) armorItem = (assets.armors.find(i => i && 'defense' in i) || assets.items[0]);
    const armorLevel = Number(playerData.armory && playerData.armory.level) || 1;
    player.armory = { armor: armorItem, level: armorLevel };

    player.health = Number(playerData.health) || player.maxHealth;
    player.stamina = Number(playerData.stamina) || player.maxStamina;
    player.pstatus = Array.isArray(playerData.pstatus) ? playerData.pstatus : [];
    player.activePotion = playerData.activePotion || null;
    player.inventory = Array.isArray(playerData.inventory) ? playerData.inventory : [];
    background.location = playerData.location || "Warhamshire";
    player.enemy = playerData.enemy || null;

    setPlayer();
}

async function getPlayerMaxHealth(level) {
    return 500 + ((level - 1) * 250);
}

async function setPlayer() {
    const player = Alpine.$data(document.getElementById('player'));

    player.maxHealth = await getPlayerMaxHealth(player.level);
    player.maxStamina = 50 + ((player.level - 1) * 5)

    const baseAttack = Math.floor(75 + ((player.level - 1) * 25) + player.weaponry.weapon.attack + ((player.weaponry.level - 1) * player.weaponry.weapon.attackPerLevel));
    const baseDefense = Math.floor(80 + ((player.level - 1) * 30) + player.armory.armor.defense + ((player.armory.level - 1) * player.armory.armor.alvlmult));

    const activeSynergy = player.armory.armor?.synergies?.find(syn => syn.weapon === player.weaponry.weapon.name) || null;
    const synergyAttack = Number(activeSynergy?.attack) || 0;
    const synergyDefense = Number(activeSynergy?.defense) || 0;
    const synergyCrit = Number(activeSynergy?.crit) || 0;
    const synergyEvasion = Number(activeSynergy?.evasion) || 0;

    player.synergyBonus = {
        name: activeSynergy?.name || null,
        attack: synergyAttack,
        defense: synergyDefense,
        crit: synergyCrit,
        evasion: synergyEvasion
    };

    player.attack = Math.floor(baseAttack + synergyAttack)
    player.defense = Math.floor(baseDefense + synergyDefense)
    player.crit = player.weaponry.weapon.crit + synergyCrit;
    player.critdmg = player.weaponry.weapon.critdmg;
    player.accuracy = player.weaponry.weapon.accuracy;
    player.evasion = player.armory.armor.evasion + synergyEvasion;

    updateBars();
    savePlayer();
}

async function savePlayer() {
    const player = Alpine.$data(document.getElementById('player'));
    const background = Alpine.$data(document.getElementById('background-image'));

    const shortInventory = [];
    player.inventory.forEach(item => {
        if (item.amount == 1) shortInventory.push({ name: item.name, level: item.level });
        else shortInventory.push({ name: item.name, level: item.level, amount: item.amount });
    });

    localStorage.setItem('textBasedData', JSON.stringify({
        name: player.name,
        level: player.level,
        health: player.health,
        stamina: player.stamina,
        experience: player.experience,
        weaponry: { weapon: player.weaponry.weapon.name, level: player.weaponry.level },
        armory: { armor: player.armory.armor.name, level: player.armory.level },
        enemy: (function() {
            try {
                const background = Alpine.$data(document.getElementById('background-image')) || {};
                const encounter = Alpine.$data(document.getElementById('encounter')) || {};
                if (background && background.enemy && encounter && encounter.battle) {
                    const battleStation = Alpine.$data(document.getElementById('battle-station')) || {};
                    return {
                        name: background.enemy.name,
                        level: background.enemyLevel || (player.enemy && player.enemy.level) || 1,
                        log: Array.isArray(encounter.log) ? encounter.log.slice() : (player.enemy && player.enemy.log) || [],
                        health: encounter.health ?? (player.enemy && player.enemy.health),
                        maxHealth: encounter.maxHealth ?? (player.enemy && player.enemy.maxHealth),
                        defense: encounter.defense ?? (player.enemy && player.enemy.defense),
                        attack: encounter.attack ?? (player.enemy && player.enemy.attack),
                        crit: encounter.crit ?? (player.enemy && player.enemy.crit),
                        accuracy: encounter.accuracy ?? (player.enemy && player.enemy.accuracy),
                        estatus: Array.isArray(encounter.estatus) ? encounter.estatus.slice() : (player.enemy && player.enemy.estatus) || [],
                        battle: !!encounter.battle,
                        turnManager: !!(player.enemy && player.enemy.turnManager),
                        round: Number(battleStation.round) || (player.enemy && player.enemy.round) || 1,
                        turn: !!battleStation.turn || !!(player.enemy && player.enemy.turn),
                        _regenThisRound: Number(battleStation._regenThisRound) || (player.enemy && player.enemy._regenThisRound) || 0,
                        skills: Array.isArray(background.enemy.skills) ? background.enemy.skills.map(s => ({ name: s.name, _cooldown: s._cooldown })) : (player.enemy && player.enemy.skills) || []
                    };
                }
            } catch (e) { }
            return player.enemy || null;
        })(),
        pstatus: player.pstatus,
        activePotion: player.activePotion || null,
        inventory: shortInventory,
        location: background.location
    }));
    console.log("Game Saved");
}

async function resetPlayer() {

    const player = Alpine.$data(document.getElementById('player'));
    player.health = player.maxHealth;
    player.stamina = player.maxStamina;
    updateBars();
}

async function addToInventory(loot, level) {
    const player = Alpine.$data(document.getElementById('player'));
    if (!loot) return false;
    else if (loot.name !== null) {
        if (player.inventory.some(i => i.name == loot.name)) {

            let foundItem = player.inventory.find(i => i.name == loot.name);
            if (foundItem.level == level) player.inventory[player.inventory.indexOf(foundItem)].amount += 1;
            else player.inventory.push({
                name: loot.name,
                level,
                amount: 1
            });
        } else {

            player.inventory.push({
                name: loot.name,
                level,
                amount: 1
            });
        }

        let isWeapon = ('attack' in loot);
        let isArmor = ('defense' in loot);
        return true;
    }
    await savePlayer();
}

async function checkLevelUp() {
    const player = Alpine.$data(document.getElementById('player'));
    const requiredXP = getRequiredXP(player.level);

    if (player.experience >= requiredXP) {
        player.level += 1;
        player.experience -= requiredXP;
        showMessage(`Level Up!`, 'success');
        await setPlayer();
        await checkLevelUp();
    }
}