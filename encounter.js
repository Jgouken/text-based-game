// This file is for *in-battle* game logic for both the player and enemy.
const assets = getAssets()

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

// Choices - Array of Objects
function randomByChance(choices) {
    const totalChance = choices.reduce((sum, item) => sum + item.chance, 0); // In case it doesn't equal 100, it just corrects itself
    let randomNum = Math.random() * totalChance;
    for (const item of choices) {
        randomNum -= item.chance;
        if (randomNum <= 0) {
            return item;
        }
    }
}

async function setPlayer() {
    const player = Alpine.$data(document.getElementById('player'));

    player.maxHealth = 500 + (((player.level || 1) - 1) * 50)
    player.health = player.maxHealth

    player.maxStamina = 30 + (((player.level || 1) - 1) * 5)
    player.stamina = player.maxStamina

    player.attack = 32 + (((player.level || 1) - 1) * 6) + player.weaponry.weapon.attack + ((player.weaponry.level - 1) * player.weaponry.weapon.attackPerLevel)
    player.defense = 60 + (((player.level || 1) - 1) * 10) + player.armory.armor.defense + ((player.armory.level - 1) * player.armory.armor.alvlmult)

    player.crit = player.weaponry.weapon.crit;
    player.critdmg = player.weaponry.weapon.critdmg;
    player.accuracy = player.weaponry.weapon.accuracy;
    player.evasion = player.armory.armor.evasion;

    console.log(player.weaponry)

    updateBars()
}

async function startBattle() {
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    const location = assets.areas.find(area => area.name == background.location)
    const randomEnemy = randomByChance(location.enemies).name

    const enemy = assets.enemies.find(enemy => enemy.name == randomEnemy)
    const level = Math.round(Math.random() * (location.maxlvl - location.minlvl) + location.minlvl)

    const battleStation = Alpine.$data(document.getElementById('battle-station'));

    background.enemy = enemy
    background.enemyLevel = level

    encounter.maxHealth = enemy.health + (Math.floor((level / 2) ** 2.82424))
    encounter.health = enemy.health + (Math.floor((level / 2) ** 2.82424))
    encounter.defense = enemy.defense + (Math.floor((level / 2) ** 1.82424))
    encounter.attack = enemy.attack + (Math.floor((level / 2) ** 1.82424))
    encounter.estatus = []
    encounter.crit = enemy.crit
    encounter.accuracy = enemy.accuracy

    encounter.log = []
    encounter.log.push(`⚔️ ${background.name} (${player.level}) vs. ${enemy.name} (${level})⚔️`)
    battleStation.round = 1;
    battleStation.turn = true;

    updateBars()
}



async function executeSkill({
    attacker,
    defender,
    attackerStatuses,
    defenderStatuses,
    skill,
    attackerName,
    targetName,
    critMult = 1,
    isPlayer = false
}) {
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    const accDif =
        (attackerStatuses.some(s => s.id == '🎯') ? assets.statuses.find(s => s.id == '🎯').incAcc : 0)
        - (attackerStatuses.some(s => s.id == '👁️') ? assets.statuses.find(s => s.id == '👁️').decAcc : 0)
        - (defenderStatuses.some(s => s.id == '💨') ? assets.statuses.find(s => s.id == '💨').decEnAcc : 0);

    const critDif =
        (attackerStatuses.some(s => s.id == '🍀') ? assets.statuses.find(s => s.id == '🍀').incCrit : 0)
        - (attackerStatuses.some(s => s.id == '🐈‍⬛') ? assets.statuses.find(s => s.id == '🐈‍⬛').decCrit : 0);

    const damMult =
        (attackerStatuses.some(s => s.id == '🏳️') ? assets.statuses.find(s => s.id == '🏳️').damAdd : 0)
        - (attackerStatuses.some(s => s.id == '💪') ? assets.statuses.find(s => s.id == '💪').damAdd : 0)
        - (attackerStatuses.some(s => s.id == '🌀') ? assets.statuses.find(s => s.id == '🌀').damReduc : 0)
        + 1;

    const fort =
        (defenderStatuses.some(s => s.id == '🛡️') ? assets.statuses.find(s => s.id == '🛡️').armorAdd : 0)
        + 1;

    let damage = attacker.attack;
    if (skill.damage) damage *= skill.damage;

    damage = Math.round(((damage ** 2) * damMult) / (defender.defense * fort));

    if (skill.cost && isPlayer) player.stamina -= skill.cost;

    let hit = Math.random() >= 1 - attacker.accuracy - accDif;
    let crit = Math.random() >= 1 - attacker.crit - critDif;

    encounter.log.push(`- ${attackerName} used ${skill.cost ? '⚡' : ''}${skill.name}`);

    const attack = () => {
        let final = hit ? Math.floor(damage * (crit ? critMult : 1)) : 0;
        defender.health -= final;
        return final;
    };

    if (skill.times) {
        let damage = attack();
        encounter.log[encounter.log.length - 1] += ` on ${targetName} ${hit ? (crit ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}`) : 'for a MISS'}`;
        updateBars();

        for (let i = 1; i < skill.times; i++) {
            await new Promise(r => setTimeout(r, 1000 / skill.times));
            hit = Math.random() >= 1 - attacker.accuracy - accDif;
            crit = Math.random() >= 1 - attacker.crit - critDif;
            let t = attack();
            encounter.log[encounter.log.length - 1] += `, ${hit ? (crit ? `CRIT ⚔️${t}` : `⚔️${t}`) : 'MISS'}`;
            updateBars();
        }
    } else if (skill.attack) {
        let damage = attack();
        encounter.log[encounter.log.length - 1] += ` on ${targetName} ${hit ? (crit ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}`) : 'and MISSED!'}`;
        updateBars();
    }

    if (skill.health || skill.flatHealth || skill.lifesteal) {
        encounter.log[encounter.log.length - 1] += ` and healed for `
        critOrCrap = Math.random() >= 1 - player.crit - critDif;

        let heal = 0;
        if (skill.health) heal = skill.health * attacker.maxHealth;
        else if (skill.flatHealth) heal = skill.flatHealth;
        else if (skill.lifesteal) heal = damage * skill.lifesteal;

        heal = Math.round(heal * (crit ? critMult : 1));
        if (attacker.health + heal > attacker.maxHealth)
            heal = attacker.maxHealth - attacker.health;
        attacker.health += Math.round(heal);

        if (skill.health) encounter.log[encounter.log.length - 1] += `${critOrCrap ? 'CRIT ' : ''}💖${heal}`
        else if (skill.flatHealth) encounter.log[encounter.log.length - 1] += `${critOrCrap ? 'CRIT ' : ''}❤️${heal}`
        else if (skill.lifesteal) encounter.log[encounter.log.length - 1] += `${critOrCrap ? 'CRIT ' : ''}💞${heal}`

        updateBars();
    }

    if (skill.health || skill.flatHealth || skill.lifesteal) {

    }

    if (skill.pstatus) {
        encounter.log[encounter.log.length - 1] += (isPlayer ? ` and gained [` : ` and inflicted [`)
        skill.pstatus.forEach(status => {
            if (player.pstatus.some(s => s.id == status)) player.pstatus[player.pstatus.indexOf(player.pstatus.find(s => s.id == status))] = { ...assets.statuses.find(s => s.id == status), damage }
            else player.pstatus.push({ ...assets.statuses.find(s => s.id == status), damage })
            encounter.log[encounter.log.length - 1] += status
        });
        encounter.log[encounter.log.length - 1] += `]`
    }

    if (skill.estatus) {
        encounter.log[encounter.log.length - 1] += (!isPlayer ? ` and gained [` : ` and inflicted [`)
        skill.estatus.forEach(status => {
            if (encounter.estatus.some(s => s.id == status)) encounter.estatus[encounter.estatus.indexOf(encounter.estatus.find(s => s.id == status))] = { ...assets.statuses.find(s => s.id == status), damage }
            else encounter.estatus.push({ ...assets.statuses.find(s => s.id == status), damage })
            encounter.log[encounter.log.length - 1] += status
        });
        encounter.log[encounter.log.length - 1] += `]`
    }
}

async function skill(index) {
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    battleStation.turn = false;
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    switch (index) {
        case -3:
            // Flee
            encounter.log.push(`🏃💨 ${background.name} Fled!`)
            transition('encounter', 'returning');
            break;
        case -2:
            // Item
            break;
        case -1:
            // Pass
            var staminaRegen = Math.round(player.maxStamina * .1)
            if (player.stamina + staminaRegen > player.maxStamina) staminaRegen = player.maxStamina - player.stamina;
            player.stamina += staminaRegen
            battleStation.round += 1;

            encounter.log.push(`- ${background.name} passed ${staminaRegen > 0 ? `(+${staminaRegen}⚡)` : ''}`)
            break;
        case 0:
        case 1:
        case 2:
        case 3: {
            await executeSkill({
                attacker: player,
                defender: encounter,
                attackerStatuses: player.pstatus,
                defenderStatuses: encounter.estatus,
                skill: player.weaponry.weapon.skills[index],
                attackerName: background.name,
                targetName: background.enemy.name,
                critMult: player.critdmg,
                isPlayer: true
            });
            break;
        }
    }

    turnManager(false);
}

async function turnManager(toPlayer) {
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const player = Alpine.$data(document.getElementById('player'));
    const actor = toPlayer ? player : encounter;
    const actorStatuses = toPlayer ? player.pstatus : encounter.estatus;
    const actorName = toPlayer ? background.name : background.enemy.name;

    updateBars();
    await new Promise(resolve => setTimeout(resolve, 500));

    if (actorStatuses.some(s => s.id == '✨') && actorStatuses.some(s => s.id == '🏴')) {
        actorStatuses.length = 0;
        encounter.log.push(`✨ All ${actorName}'s effects were evaporated. 🏴`);
    } else if (actorStatuses.some(s => s.id == '🏴')) {
        let eviscerated = [];
        actorStatuses.slice().forEach(s => {
            if (s.positive) {
                actorStatuses.splice(actorStatuses.indexOf(s), 1);
                eviscerated.push(s.id);
            }
        });

        if (eviscerated.length > 0) encounter.log.push(`🏴 All of ${actorName}'s positive effects were eviscerated [${eviscerated.join('')}].`);
        else encounter.log.push(`🏴 ${actorName}'s Bad Omen lingers idly.`);
    } else if (actorStatuses.some(s => s.id == '✨')) {
        let cleansed = [];
        actorStatuses.slice().forEach(s => {
            if (!s.positive) {
                actorStatuses.splice(actorStatuses.indexOf(s), 1);
                cleansed.push(s.id);
            }
        });

        if (cleansed.length > 0) encounter.log.push(`✨ All of ${actorName}'s negative effects were cleansed [${cleansed.join('')}].`);
        else encounter.log.push(`✨ ${actorName}'s Blessing gleams idly.`);
    }

    for (const s of actorStatuses.slice()) {
        switch (s.id) {
            case '🩸': {
                let damage = Math.round(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is bleeding - 🩸${damage}`);
                actor.health -= damage;
                break;
            }
            case '🔥': {
                let damage = Math.round(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is on fire - 🔥${damage}`);
                actor.health -= damage;
                break;
            }
            case '🖤': {
                let damage = Math.round(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is cursed - 🖤${damage}`);
                actor.health -= damage;
                break;
            }
            case '💀': {
                let damage = Math.round(s.maxHP * actor.maxHealth);
                encounter.log.push(`${actorName} is poisoned - 💀${damage}`);
                actor.health -= damage;
                break;
            }
            case '💗': {
                let heal = Math.round(s.maxHP * actor.maxHealth);
                if (actor.health + heal > actor.maxHealth)
                    heal = actor.maxHealth - actor.health;

                encounter.log.push(`${actorName} is regenerating - 💗${heal}`);
                actor.health += heal;
                break;
            }
        }

        s.rounds -= 1;

        if (s.rounds <= 0) actorStatuses.splice(actorStatuses.indexOf(s), 1);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (toPlayer) {
        let staminaRegen = Math.round(player.maxStamina * .1);
        if (player.stamina + staminaRegen > player.maxStamina)
            staminaRegen = player.maxStamina - player.stamina;

        player.stamina += staminaRegen;
        battleStation.round += 1;
    }

    updateBars();

    if (actorStatuses.some(s => s.id == '💫')) {
        encounter.log.push(`💫 ${actorName} is stunned.`);
        return turnManager(!toPlayer);
    }

    if (toPlayer) battleStation.turn = true;
    else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        enemyMove();
    }
}

async function enemyMove() {
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));
    const skill = randomByChance(background.enemy.skills);

    await executeSkill({
        attacker: encounter,
        defender: player,
        attackerStatuses: encounter.estatus,
        defenderStatuses: player.pstatus,
        skill,
        attackerName: background.enemy.name,
        targetName: background.name,
        critMult: 1.6
    });

    turnManager(true);
}



