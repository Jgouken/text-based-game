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

    player.maxHealth = 500 + (((player.level || 1) - 1) * 250)
    player.health = player.maxHealth

    player.maxStamina = 30 + (((player.level || 1) - 1) * 5)
    player.stamina = player.maxStamina

    player.attack = Math.round(32 + (((player.level || 1) - 1) * 6) + player.weaponry.weapon.attack + ((player.weaponry.level - 1) * player.weaponry.weapon.attackPerLevel))
    player.defense = Math.round(60 + (((player.level || 1) - 1) * 10) + player.armory.armor.defense + ((player.armory.level - 1) * player.armory.armor.alvlmult))

    player.crit = player.weaponry.weapon.crit;
    player.critdmg = player.weaponry.weapon.critdmg;
    player.accuracy = player.weaponry.weapon.accuracy;
    player.evasion = player.armory.armor.evasion;

    console.log(player.weaponry)

    updateBars()
}

async function startBattle(enemy = null) {
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    const location = assets.areas.find(area => area.name == background.location)
    const randomEnemy = randomByChance(location.enemies).name

    const level = enemy ? (background.enemyLevel || 1) : (Math.round(Math.random() * (location.maxlvl - location.minlvl) + location.minlvl))
    if (!enemy) enemy = assets.enemies.find(enemy => enemy.name == randomEnemy)

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
    encounter.log.push(`⚔️${background.name} (${player.level}) vs. ${enemy.name} (${level})⚔️`)
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
        + (attackerStatuses.some(s => s.id == '💪') ? assets.statuses.find(s => s.id == '💪').damAdd : 0)
        + (attackerStatuses.some(s => s.id == '💢') ? assets.statuses.find(s => s.id == '💢').damAdd : 0)
        + (defenderStatuses.some(s => s.id == '💢') ? assets.statuses.find(s => s.id == '💢').incDamTaken : 0)
        - (attackerStatuses.some(s => s.id == '🌀') ? assets.statuses.find(s => s.id == '🌀').damReduc : 0)
        + 1;

    const fort =
        (defenderStatuses.some(s => s.id == '🛡️') ? assets.statuses.find(s => s.id == '🛡️').armorAdd : 0)
        + 1;

    let damage = attacker.attack;
    if (skill.damage) damage *= skill.damage;

    damage = Math.round(((damage ** 2) * damMult) / Math.max(1, defender.defense * fort));

    if (skill.cost && isPlayer) player.stamina -= skill.cost;

    let firstHit = Math.random() >= 1 - attacker.accuracy - accDif;
    let hit = firstHit;
    let crit = Math.random() >= 1 - attacker.crit - critDif;
    var totalDealt = 0;

    let skillLog = `<span style="color:lightblue;" data-tooltip="${skill.description ? `${skill.description}\n` : ''}${skill.cost ? `⚡${skill.cost}\n` : ''}⚔️ x${skill.attack ? (skill.damage || 1) : 0}\n${skill.times ? `🔄️${skill.times}x\n` : ''}${skill.flatHealth ? `❤️ ${skill.flatHealth}\n` : ''}${skill.health ? `💖 ${Math.round(skill.health * 100)}%\n` : ''}${skill.lifesteal ? `💞 ${Math.round(skill.lifesteal * 100)}%\n` : ''}${skill.pstatus ? (isPlayer ? 'Gains ' : 'Inflicts ') + `${skill.pstatus.join('')}\n` : ''}${skill.estatus ? (!isPlayer ? 'Gains ' : 'Inflicts ') + skill.estatus.join('') : ''}">${skill.cost ? '⚡' : ''}${skill.name}</span>`
    encounter.log.push(`- ${attackerName} used ${skillLog}`);

    let damageLog = (final) => {
        return `<span style="color:lightblue;" data-tooltip="⚔️ (((${attacker.attack} * ${skill.damage || 1})^2 * ${damMult}) / (${defender.defense} * ${fort})) * ${crit ? critMult : 1} = ${final}">⚔️${final}</span>`;
    };

    const attack = () => {
        let final = hit ? Math.floor(damage * (crit ? critMult : 1)) : 0;
        defender.health -= final;
        totalDealt += final;
        return final;
    };

    if (skill.times) {
        const dealt = attack();
        encounter.log[encounter.log.length - 1] +=
            ` on ${targetName} ${hit ? (crit ? `for CRIT ${damageLog(dealt)}` : `for ${damageLog(dealt)}`) : 'for a MISS'}`;
        updateBars();

        for (let i = 1; i < skill.times; i++) {
            await new Promise(r => setTimeout(r, 1000 / skill.times));
            hit = Math.random() >= 1 - attacker.accuracy - accDif;
            crit = Math.random() >= 1 - attacker.crit - critDif;

            const dealt = attack();
            encounter.log[encounter.log.length - 1] +=
                `, ${hit ? (crit ? `CRIT ${damageLog(dealt)}` : `${damageLog(dealt)}`) : 'MISS'}`;
            updateBars();
        }
    }
    else if (skill.attack) {
        const dealt = attack();
        encounter.log[encounter.log.length - 1] +=
            ` on ${targetName} ${hit ? (crit ? `for CRIT ${damageLog(dealt)}` : `for ${damageLog(dealt)}`) : 'and MISSED!'}`;
        updateBars();
    }

    // ---- HEALING ----
    if (skill.health || skill.flatHealth || skill.lifesteal) {
        encounter.log[encounter.log.length - 1] += ` and healed for `
        crit = Math.random() >= 1 - player.crit - critDif;

        let heal = 0;
        if (skill.health) heal = skill.health * attacker.maxHealth;
        else if (skill.flatHealth) heal = skill.flatHealth;
        else if (skill.lifesteal) heal = totalDealt * skill.lifesteal;

        heal = Math.round(heal * (crit ? critMult : 1));
        if (attacker.health + heal > attacker.maxHealth) heal = attacker.maxHealth - attacker.health;

        if (skill.health) {
            let healingLog = () => { return `<span style="color:lightblue;" data-tooltip="💖 ${attacker.maxHealth} * ${skill.health} * ${crit ? critMult : 1} = ${Math.round(skill.health * attacker.maxHealth * (crit ? critMult : 1))}${(attacker.health + (skill.health * attacker.maxHealth * (crit ? critMult : 1))) > attacker.maxHealth ? '\nCapped to max health.' : ''}">💖${heal}</span>` }
            encounter.log[encounter.log.length - 1] += `${crit ? 'CRIT ' : ''}${healingLog()}`
        }
        else if (skill.flatHealth) {
            let healingLog = () => { return `<span style="color:lightblue;" data-tooltip="❤️ ${skill.flatHealth} * ${crit ? critMult : 1} = ${Math.round(skill.flatHealth * (crit ? critMult : 1))}${(attacker.health + (skill.flatHealth * (crit ? critMult : 1))) > attacker.maxHealth ? '\nCapped to max health.' : ''}">❤️${heal}</span>` }
            encounter.log[encounter.log.length - 1] += `${crit ? 'CRIT ' : ''}${healingLog()}`
        }
        else if (skill.lifesteal) {
            let healingLog = () => { return `<span style="color:lightblue;" data-tooltip="💞 ${totalDealt} * ${skill.lifesteal} * ${crit ? critMult : 1} = ${Math.round(totalDealt * skill.lifesteal * (crit ? critMult : 1))}${(attacker.health + ((totalDealt * skill.lifesteal) * (crit ? critMult : 1))) > attacker.maxHealth ? '\nCapped to max health.' : ''}">💞${heal}</span>` }
            encounter.log[encounter.log.length - 1] += `${crit ? 'CRIT ' : ''}${healingLog()}`
        }

        attacker.health += Math.round(heal);
        updateBars();
    }

    // ---- STATUS ----
    if (firstHit || !skill.attack) {
        if (skill.pstatus) {
            encounter.log[encounter.log.length - 1] += (isPlayer ? `${skill.estatus ? ',' : ' and'} gained [` : ` and inflicted [`);
            skill.pstatus.forEach(status => {
                let stasset = assets.statuses.find(s => s.id == status);
                if (player.pstatus.some(s => s.id == status))
                    player.pstatus[player.pstatus.indexOf(player.pstatus.find(s => s.id == status))] = { ...stasset, damage: totalDealt };
                else player.pstatus.push({ ...stasset, damage: totalDealt });
                console.log(player.pstatus)

                encounter.log[encounter.log.length - 1] += `<span data-tooltip="${status} ${stasset.name}\n\n${stasset.description}">${status}</span>`
            });
            encounter.log[encounter.log.length - 1] += `]`;
        }

        if (skill.estatus) {
            encounter.log[encounter.log.length - 1] += (!isPlayer ? ` and gained [` : ` and inflicted [`);
            skill.estatus.forEach(status => {
                let stasset = assets.statuses.find(s => s.id == status);
                if (encounter.estatus.some(s => s.id == status))
                    encounter.estatus[encounter.estatus.indexOf(encounter.estatus.find(s => s.id == status))] = { ...stasset, damage: totalDealt };
                else encounter.estatus.push({ ...stasset, damage: totalDealt });

                encounter.log[encounter.log.length - 1] += `<span data-tooltip="${status} ${stasset.name}\n\n${stasset.description}">${status}</span>`
            });
            encounter.log[encounter.log.length - 1] += `]`;
        }
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
    var stunned = false;
    updateBars();
    await new Promise(resolve => setTimeout(resolve, 500));

    if (encounter.health <= 0) {
        encounter.log.push(`--- ${background.enemy.name} has died. ---`);
        transition('encounter', 'returning')
        return;
    }

    if (player.health <= 0) {
        encounter.log.push(`--- ${background.name} has died. ---`);
        transition('encounter', 'returning')
        return;
    }


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

    if (actorStatuses.some(s => s.id === '💫')) stunned = true;

    for (const s of actorStatuses.slice()) {
        switch (s.id) {
            case '🩸': {
                let damage = Math.round(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is bleeding - <span style="color: lightblue;" data-tooltip="🩸 ${s.name}\n\n${s.description}\n\n${s.damage} * ${s.baseDam} = ${damage}">🩸${damage}</span>`);
                actor.health -= damage;
                break;
            }
            case '🔥': {
                let damage = Math.round(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is on fire - <span style="color: lightblue;" data-tooltip="🔥 ${s.name}\n\n${s.description}\n\n${s.damage} * ${s.baseDam} = ${damage}">🔥${damage}</span>`);
                actor.health -= damage;
                break;
            }
            case '🖤': {
                let damage = Math.round(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is cursed - <span style="color: lightblue;" data-tooltip="🖤 ${s.name}\n\n${s.description}\n\n${s.damage} * ${s.baseDam} = ${damage}">🖤${damage}</span>`);
                actor.health -= damage;
                break;
            }
            case '💀': {
                let damage = Math.round(s.maxHP * actor.maxHealth);
                encounter.log.push(`${actorName} is poisoned - <span style="color: lightblue;" data-tooltip="💀 ${s.name}\n\n${s.description}\n\n${actor.maxHealth} * ${s.maxHP} = ${damage}">💀${damage}</span>`);
                actor.health -= damage;
                break;
            }
            case '💗': {
                let heal = Math.round(s.maxHP * actor.maxHealth);
                if (actor.health + heal > actor.maxHealth)
                    heal = actor.maxHealth - actor.health;

                encounter.log.push(`${actorName} is regenerating - <span style="color: lightblue;" data-tooltip="🩸 ${s.name}\n\n${s.description}\n\n${actor.maxHealth} * ${s.maxHP} = ${Math.round(s.maxHP * actor.maxHealth)}${actor.health + Math.round(s.maxHP * actor.maxHealth) > actor.maxHealth ? '\nCapped to max health.' : ''}">💗${heal}</span>`);
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

    if (stunned) {
        encounter.log.push(`💫 ${actorName} is stunned.`);
        await new Promise(r => setTimeout(r, 600));
        actorStatuses.forEach(s => {
            if (s.id == '💫') s.rounds = Math.max(0, s.rounds - 1);
        });
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



