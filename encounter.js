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
    player.armor = 60 + (((player.level || 1) - 1) * 10) + player.armory.armor.armor + ((player.armory.level - 1) * player.armory.armor.alvlmult)

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

/**
 * 
 * @param {int} index 
 * The index of the skill.
 * -3 is Flee,
 * -2 is Item,
 * -1 is Pass,
 * 0 is Basic Attack,
 * 1-3 - a Weapon Skill.
 */
async function skill(index) {
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    battleStation.turn = false;

    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    const accDif = (player.pstatus.some(s => s.id == '🎯') ? assets.statuses.find(s => s.id == '🎯').incAcc : 0)
        + (player.pstatus.some(s => s.id == '🎯') ? assets.statuses.find(s => s.id == '🎯').incAcc : 0)
        - (player.pstatus.some(s => s.id == '👁️') ? assets.statuses.find(s => s.id == '👁️').decAcc : 0)
        - (player.pstatus.some(s => s.id == '💢') ? assets.statuses.find(s => s.id == '💢').decAcc : 0)
        - (encounter.estatus.some(s => s.id == '💨') ? assets.statuses.find(s => s.id == '💨').decEnAcc : 0)

    const critDif = (player.pstatus.some(s => s.id == '🍀') ? assets.statuses.find(s => s.id == '🍀').incCrit : 0)
        - (player.pstatus.some(s => s.id == '🐈‍⬛') ? assets.statuses.find(s => s.id == '🐈‍⬛').decCrit : 0)

    const damMult = (player.pstatus.some(s => s.id == '🏳️') ? assets.statuses.find(s => s.id == '🏳️').damAdd : 0)
        - (player.pstatus.some(s => s.id == '💪') ? assets.statuses.find(s => s.id == '💪').damAdd : 0)
        - (player.pstatus.some(s => s.id == '🌀') ? assets.statuses.find(s => s.id == '🌀').damReduc : 0)
        + 1

    const enemyFortification = (encounter.estatus.some(s => s.id == '🛡️') ? assets.statuses.find(s => s.id == '🛡️').armorAdd : 0)
        + 1

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
        case 3:
            // PREVENT DUPLICATE STATUS EFFECT ADDITIONS
            // Configure Alectrona & Melanie
            const skill = player.weaponry.weapon.skills[index]

            var damage = player.attack
            if (skill.damage) damage *= skill.damage;
            damage = Math.round((damage ** 2) / (encounter.defense * enemyFortification * damMult));

            if (skill.cost) player.stamina -= skill.cost

            var hitOrMiss = Math.random() >= 1 - player.accuracy - accDif;
            var critOrCrap = Math.random() >= 1 - player.crit - critDif;

            encounter.log.push(`- ${background.name} used ${skill.cost ? '⚡' : ''}${skill.name}`)

            if (skill.times) {
                encounter.health -= hitOrMiss ? Math.floor(damage * (critOrCrap ? player.critdmg : '1')) : 0;
                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` on ${background.enemy.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'for a MISS'}`
                updateBars()

                for (let i = 0; i < skill.times - 1; i++) {
                    await new Promise(resolve => setTimeout(resolve, 1000 / skill.times));
                    hitOrMiss = Math.random() >= 1 - player.accuracy - accDif;
                    critOrCrap = Math.random() >= 1 - player.crit - critDif;
                    tempDamage = hitOrMiss ? Math.floor(damage * (critOrCrap ? player.critdmg : '1')) : 0;

                    encounter.health -= tempDamage;
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `, ${hitOrMiss ? critOrCrap ? `CRIT ⚔️${tempDamage}` : `⚔️${tempDamage}` : 'MISS'}`
                    updateBars()
                }
            } else if (skill.attack) {
                hitOrMiss = Math.random() >= 1 - player.accuracy - accDif;
                critOrCrap = Math.random() >= 1 - player.crit - critDif;

                damage = hitOrMiss ? Math.floor(damage * (critOrCrap ? player.critdmg : '1')) : 0
                encounter.health -= damage

                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` on ${background.enemy.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'and MISSED!'}`
            }

            if (skill.health || skill.flatHealth || skill.lifesteal) {
                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` and healed for `
                critOrCrap = Math.random() >= 1 - player.crit - critDif;
                var finalHealth = 0

                if (skill.health) {
                    finalHealth = skill.health * player.maxHealth * (critOrCrap ? player.crit : 1)
                    finalHealth = Math.round(finalHealth);
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}💖${finalHealth}`
                } else if (skill.flatHealth) {
                    finalHealth = skill.flatHealth
                    finalHealth = Math.round(finalHealth);
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}❤️${finalHealth}`
                } else if (skill.lifesteal) {
                    finalHealth = damage * skill.lifesteal
                    finalHealth = Math.round(finalHealth);
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}💞${finalHealth}`
                }

                if ((player.health + finalHealth) > player.maxHealth) finalHealth = player.maxHealth - player.health;
                finalHealth = Math.round(finalHealth);
                player.health += finalHealth
            }

            if (skill.pstatus || skill.estatus) {
                if (skill.pstatus) {
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` and gained: [`
                    skill.pstatus.forEach(status => {
                        if (player.pstatus.some(s => s.id == status)) player.pstatus[player.pstatus.indexOf(player.pstatus.find(s => s.id == status))] = { ...assets.statuses.find(s => s.id == status), damage }
                        else player.pstatus.push({ ...assets.statuses.find(s => s.id == status), damage })
                        encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + status
                    });
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `]`
                }

                if (skill.estatus) {
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` and inflicted: [`
                    skill.estatus.forEach(status => {
                        if (encounter.estatus.some(s => s.id == status)) encounter.estatus[encounter.estatus.indexOf(encounter.estatus.find(s => s.id == status))] = { ...assets.statuses.find(s => s.id == status), damage }
                        else encounter.estatus.push({ ...assets.statuses.find(s => s.id == status), damage })
                        encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + status
                    });
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `]`
                }
            }
            break;
        default:
            // Not sure how you pressed this button, but suffer the consequences.
            break;
    }

    turnManager(false);
}

// After the play is done, it's the enemy's turn
async function enemyMove() {
    // ADD ENEMY ATTACK COOLDOWNS (wait)
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    const accDif = (encounter.estatus.some(s => s.id == '🎯') ? assets.statuses.find(s => s.id == '🎯').incAcc : 0)
        + (encounter.estatus.some(s => s.id == '🎯') ? assets.statuses.find(s => s.id == '🎯').incAcc : 0)
        - (encounter.estatus.some(s => s.id == '👁️') ? assets.statuses.find(s => s.id == '👁️').decAcc : 0)
        - (encounter.estatus.some(s => s.id == '💢') ? assets.statuses.find(s => s.id == '💢').decAcc : 0)
        - (player.pstatus.some(s => s.id == '💨') ? assets.statuses.find(s => s.id == '💨').decEnAcc : 0)

    const critDif = (encounter.estatus.some(s => s.id == '🍀') ? assets.statuses.find(s => s.id == '🍀').incCrit : 0)
        - (encounter.estatus.some(s => s.id == '🐈‍⬛') ? assets.statuses.find(s => s.id == '🐈‍⬛').decCrit : 0)

    const damMult = (encounter.estatus.some(s => s.id == '🏳️') ? assets.statuses.find(s => s.id == '🏳️').damAdd : 0)
        - (encounter.estatus.some(s => s.id == '💪') ? assets.statuses.find(s => s.id == '💪').damAdd : 0)
        - (encounter.estatus.some(s => s.id == '🌀') ? assets.statuses.find(s => s.id == '🌀').damReduc : 0)
        + 1

    const enemyFortification = (encounter.estatus.some(s => s.id == '🛡️') ? assets.statuses.find(s => s.id == '🛡️').armorAdd : 0)
        + 1

    const skill = randomByChance(background.enemy.skills)

    var damage = encounter.attack
    var hitOrMiss = Math.random() >= 1 - encounter.accuracy - accDif;
    var critOrCrap = Math.random() >= 1 - encounter.crit - critDif;

    if (skill.damage) damage *= skill.damage;
    damage = Math.round((damage ** 2) / (player.armor * enemyFortification * damMult));

    encounter.log.push(`- ${background.enemy.name} used ${skill.name}`)

    if (skill.times) {
        player.health -= hitOrMiss ? Math.floor(damage * (critOrCrap ? 1.6 : '1')) : 0;
        encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` on ${background.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'for a MISS'}`
        updateBars()

        for (let i = 0; i < skill.times - 1; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000 / skill.times));
            hitOrMiss = Math.random() >= 1 - encounter.accuracy - accDif;
            critOrCrap = Math.random() >= 1 - encounter.crit - critDif;
            tempDamage = hitOrMiss ? Math.floor(damage * (critOrCrap ? 1.6 : '1')) : 0;

            player.health -= tempDamage;
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `, ${hitOrMiss ? critOrCrap ? `CRIT ⚔️${tempDamage}` : `⚔️${tempDamage}` : 'MISS'}`
            updateBars()
        }
    } else if (skill.attack) {
        hitOrMiss = Math.random() >= 1 - encounter.accuracy - accDif;
        critOrCrap = Math.random() >= 1 - encounter.crit - critDif;

        damage = hitOrMiss ? Math.floor(damage * (critOrCrap ? 1.6 : '1')) : 0
        player.health -= damage

        encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` on ${background.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'and MISSED!'}`
    }

    if (skill.health || skill.flatHealth || skill.lifesteal) {
        encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` and healed for `
        critOrCrap = Math.random() >= 1 - encounter.crit - critDif;
        var finalHealth = 0

        if (skill.health) {
            finalHealth = skill.health * encounter.maxHealth * (critOrCrap ? 1.6 : 1)
            finalHealth = Math.round(finalHealth);
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}💖${finalHealth}`
        } else if (skill.flatHealth) {
            finalHealth = skill.flatHealth
            finalHealth = Math.round(finalHealth);
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}❤️${finalHealth}`
        } else if (skill.lifesteal) {
            finalHealth = damage * skill.lifesteal
            finalHealth = Math.round(finalHealth);
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}💞${finalHealth}`
        }

        if ((encounter.health + finalHealth) > encounter.maxHealth) finalHealth = encounter.maxHealth - player.health;
        finalHealth = Math.round(finalHealth);
        encounter.health += finalHealth
    }

    if (skill.pstatus || skill.estatus) {
        if (skill.pstatus) {
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` and inflicted [`
            skill.pstatus.forEach(status => {
                if (player.pstatus.some(s => s.id == status)) player.pstatus[player.pstatus.indexOf(player.pstatus.find(s => s.id == status))] = { ...assets.statuses.find(s => s.id == status), damage }
                else player.pstatus.push({ ...assets.statuses.find(s => s.id == status), damage })
                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + status
            });
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `]`
        }

        if (skill.estatus) {
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` and gained [`
            skill.estatus.forEach(status => {
                if (encounter.estatus.some(s => s.id == status)) encounter.estatus[encounter.estatus.indexOf(encounter.estatus.find(s => s.id == status))] = { ...assets.statuses.find(s => s.id == status), damage }
                else encounter.estatus.push({ ...assets.statuses.find(s => s.id == status), damage })
                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + status
            });
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `]`
        }
    }

    turnManager(true);
}

async function turnManager(toPlayer) {
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const player = Alpine.$data(document.getElementById('player'));
    updateBars()

    await new Promise(resolve => setTimeout(resolve, 1000));
    if (toPlayer) {
        if (player.pstatus.some(s => s.id == '✨') && player.pstatus.some(s => s.id == '🏴')) {
            player.pstatus = [];
            encounter.log.push(`✨ All ${background.name}'s effects were evaporated. 🏴`)
        } else if (player.pstatus.some(s => s.id == '🏴')) {
            let eviscerated = []
            player.pstatus.forEach(s => {
                if (s.positive) {
                    player.pstatus.splice(player.pstatus.indexOf(s), 1)
                    eviscerated.push(s.id)
                }
            })
            if (eviscerated.length > 0) encounter.log.push(`🏴 All ${background.name}'s positive effects were eviscerated [${eviscerated.join('')}].`)
            else encounter.log.push(`🏴 ${background.name}'s Bad Omen lingers idly.`)
        } else if (player.pstatus.some(s => s.id == '✨')) {
            let cleansed = []
            player.pstatus.forEach(s => {
                if (!s.positive) {
                    player.pstatus.splice(player.pstatus.indexOf(s), 1)
                    cleansed.push(s.id)
                }
            })
            if (cleansed.length > 0) encounter.log.push(`✨ All ${background.name}'s negative effects were cleansed [${cleansed.join('')}].`)
            else encounter.log.push(`✨ ${background.name}'s Blessing gleams idly.`)
        }

        player.pstatus.forEach(async s => {
            switch (s.id) {
                case '🩸': {
                    let damage = Math.round(s.baseDam * s.damage);
                    encounter.log.push(`${background.name} is bleeding - 🩸${damage}`);
                    player.health -= damage;
                    break;
                }
                case '🔥': {
                    let damage = Math.round(s.baseDam * s.damage);
                    encounter.log.push(`${background.name} is on fire - 🔥${damage}`);
                    player.health -= damage;
                    break;
                }
                case '🖤': {
                    let damage = Math.round(s.baseDam * s.damage);
                    encounter.log.push(`${background.name} is cursed - 🖤${damage}`);
                    player.health -= damage;
                    break;
                }
                case '💀': {
                    let damage = Math.round(s.maxHP * player.maxHealth);
                    encounter.log.push(`${background.name} is poisoned - 💀${damage}`);
                    player.health -= damage;
                    break;
                }
                case '💗': {
                    var heal = Math.round(s.maxHP * player.maxHealth);
                    if ((player.health + heal) > player.maxHealth) heal = player.maxHealth - player.health;
                    encounter.log.push(`${background.name} is regenerating - 💗${heal}`);
                    player.health += heal;
                    break;
                }
            }

            s.rounds -= 1;
            if (s.rounds <= 0) encounter.estatus.splice(estatus.indexOf(s));
            await new Promise(resolve => setTimeout(resolve, 500));
        })

        var staminaRegen = Math.round(player.maxStamina * .1)
        if (player.stamina + staminaRegen > player.maxStamina) staminaRegen = player.maxStamina - player.stamina;
        player.stamina += staminaRegen
        battleStation.round += 1;

        updateBars()
        if (player.pstatus.some(s => s.id == '💫')) {
            encounter.log.push(`💫 ${background.name} is stunned.`)
            turnManager(false);
        } else battleStation.turn = true;
    } else {
        if (encounter.estatus.some(s => s.id == '✨') && encounter.estatus.some(s => s.id == '🏴')) {
            encounter.estatus = [];
            encounter.log.push(`✨ All ${background.enemy.name}'s effects were evaporated. 🏴`)
        } else if (encounter.estatus.some(s => s.id == '🏴')) {
            let eviscerated = []
            encounter.estatus.forEach(s => {
                if (s.positive) {
                    encounter.estatus.splice(encounter.estatus.indexOf(s), 1)
                    eviscerated.push(s.id)
                }
            })
            if (eviscerated.length > 0) encounter.log.push(`🏴 All ${background.enemy.name}'s positive effects were eviscerated [${eviscerated.join('')}].`)
            else encounter.log.push(`🏴 ${background.enemy.name}'s Bad Omen lingers idly.`)
        } else if (encounter.estatus.some(s => s.id == '✨')) {
            let cleansed = []
            encounter.estatus.forEach(s => {
                if (!s.positive) {
                    encounter.estatus.splice(encounter.estatus.indexOf(s), 1)
                    cleansed.push(s.id)
                }
            })
            if (cleansed.length > 0) encounter.log.push(`✨ All ${background.enemy.name}'s negative effects were cleansed [${cleansed.join('')}].`)
            else encounter.log.push(`✨ ${background.enemy.name}'s Blessing gleams idly.`)
        }

        encounter.estatus.forEach(async s => {
            switch (s.id) {
                case '🩸': {
                    let damage = Math.round(s.baseDam * s.damage);
                    encounter.log.push(`${background.enemy.name} is bleeding - 🩸${damage}`);
                    encounter.health -= damage;
                    break;
                }
                case '🔥': {
                    let damage = Math.round(s.baseDam * s.damage);
                    encounter.log.push(`${background.enemy.name} is on fire - 🔥${damage}`);
                    encounter.health -= damage;
                    break;
                }
                case '🖤': {
                    let damage = Math.round(s.baseDam * s.damage);
                    encounter.log.push(`${background.enemy.name} is cursed - 🖤${damage}`);
                    encounter.health -= damage;
                    break;
                }
                case '💀': {
                    let damage = Math.round(s.maxHP * encounter.maxHealth);
                    encounter.log.push(`${background.enemy.name} is poisoned - 💀${damage}`);
                    encounter.health -= damage;
                    break;
                }
                case '💗': {
                    var heal = Math.round(s.maxHP * encounter.maxHealth);
                    if ((encounter.health + heal) > encounter.maxHealth) heal = encounter.maxHealth - encounter.health;
                    encounter.log.push(`${background.enemy.name} is regenerating - 💗${heal}`);
                    encounter.health += heal;
                    break;
                }
            }

            s.rounds -= 1;
            if (s.rounds <= 0) encounter.estatus.splice(estatus.indexOf(s));
            await new Promise(resolve => setTimeout(resolve, 500));
        })

        updateBars()
        if (encounter.estatus.some(s => s.id == '💫')) {
            encounter.log.push(`💫 ${background.enemy.name} is stunned.`)
            battleStation.turn = true;
            turnManager(true);
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
            enemyMove()
        }
    }

}