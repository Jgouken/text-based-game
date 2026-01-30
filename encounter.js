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
    player.stamina = 30 + (((player.level || 1) - 1) * 5)

    player.health = 500 + (((player.level || 1) - 1) * 50)
    player.maxStamina = 30 + (((player.level || 1) - 1) * 5)

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
            break;
        case 0:
        case 1:
        case 2:
        case 3:
            // Remember to add emoji deductions/additions
            const skill = player.weaponry.weapon.skills[index]

            var damage = player.attack
            if (skill.damage) damage *= skill.damage;
            damage = Math.round((damage ** 2) / encounter.defense);

            if (skill.cost) player.stamina -= skill.cost

            var hitOrMiss = Math.random() >= 1 - player.accuracy;
            var critOrCrap = Math.random() >= 1 - player.crit;

            encounter.log.push(`${background.name} used ${player.weaponry.weapon.skills[index].name}`)

            if (skill.times) {
                encounter.health -= hitOrMiss ? Math.floor(damage * (critOrCrap ? player.critdmg : '1')) : 0;
                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` on ${background.enemy.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'for a MISS'}`
                updateBars()

                for (let i = 0; i < skill.times - 1; i++) {
                    await new Promise(resolve => setTimeout(resolve, 2000 / skill.times));
                    hitOrMiss = Math.random() >= 1 - player.accuracy;
                    critOrCrap = Math.random() >= 1 - player.crit;
                    tempDamage = hitOrMiss ? Math.floor(damage * (critOrCrap ? player.critdmg : '1')) : 0;

                    encounter.health -= tempDamage;
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `, ${hitOrMiss ? critOrCrap ? `CRIT ⚔️${tempDamage}` : `⚔️${tempDamage}` : 'MISS'}`
                    updateBars()
                }
            } else if (skill.attack) {
                hitOrMiss = Math.random() >= 1 - player.accuracy;
                critOrCrap = Math.random() >= 1 - player.crit;

                damage = hitOrMiss ? Math.floor(damage * (critOrCrap ? player.critdmg : '1')) : 0
                encounter.health -= damage

                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + ` on ${background.enemy.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'and MISSED!'}`
            }

            if (skill.health || skill.flatHealth || skill.lifesteal) {
                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `, Healed for `
                critOrCrap = Math.random() >= 1 - player.crit;
                var finalHealth = 0

                if (skill.health) {
                    finalHealth = skill.health * player.maxHealth * (critOrCrap ? player.crit : 1)
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}💖${finalHealth}`
                } else if (skill.flatHealth) {
                    finalHealth = skill.flatHealth
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}❤️${finalHealth}`
                } else if (skill.lifesteal) {
                    finalHealth = damage * skill.lifesteal
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `${critOrCrap ? 'CRIT ' : ''}💞${finalHealth}`
                }

                if ((player.health + finalHealth) > player.maxHealth) finalHealth = player.maxHealth - player.health;
                player.health += finalHealth
            }

            if (skill.pstatus || skill.estatus) {
                if (skill.pstatus) {
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `, Gained: [`
                    skill.pstatus.forEach(status => {
                        player.pstatus.push({ ...assets.statuses.find(s => s.id == status), damage })
                        encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + status
                    });
                }

                if (skill.estatus) {
                    encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `, Inflicted: [`
                    skill.estatus.forEach(status => {
                        encounter.estatus.push({ ...assets.statuses.find(s => s.id == status), damage })
                        encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + status
                    });
                }
                encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `]`
            }

            updateBars()
            break;
        default:
            // Not sure how you pressed this button, but suffer the consequences.
            break;
    }

    updateBars()
    await new Promise(resolve => setTimeout(resolve, 2000));

    encounter.estatus.forEach(s => {
        switch (s.id) {
            case '🩸': {
                let damage = s.baseDam * s.damage;
                encounter.log.push(`${background.enemy.name} is bleeding - 🩸${damage}`);
                encounter.health -= damage;
                break;
            }
            case '👁️': {

                break;
            }
            case '🔥': {
                let damage = s.baseDam * s.damage;
                encounter.log.push(`${background.enemy.name} is on fire - 🔥${damage}`);
                encounter.health -= damage;
                break;
            }
            case '🖤': {
                let damage = s.baseDam * s.damage;
                encounter.log.push(`${background.enemy.name} is cursed - 🖤${damage}`);
                encounter.health -= damage;
                break;
            }
            case '🏳️': {

                break;
            }
            case '💨': {

                break;
            }
            case '💀': {
                let damage = s.maxHP * encounter.maxHealth;
                encounter.log.push(`${background.enemy.name} is poisoned - 💀${damage}`);
                encounter.health -= damage;
                break;
            }
            case '🎯': {

                break;
            }
            case '🛡️': {

                break;
            }
            case '🍀': {

                break;
            }
            case '💗': {
                var heal = s.maxHP * encounter.maxHealth;
                if ((enemy.health + heal) > encounter.maxHealth) heal = encounter.maxHealth - encounter.health;
                encounter.log.push(`${background.enemy.name} is regenerating - 💗${heal}`);
                encounter.health += heal;
                break;
            }
            case '💪': {

                break;
            }
            case '🌀': {

                break;
            }
            case '🐈‍⬛': {

                break;
            }
            case '💢': {

                break;
            }
            case '💫': {

                break;
            }
            case '✨': {

                break;
            }
            case '🏴': {

                break;
            }
            default: {

                break;
            }
        }

        s.rounds -= 1;
        if (s.rounds <= 0) estatus.splice(estatus.indexOf(s));
    })

    enemyMove()
}

// After the play is done, it's the enemy's turn
async function enemyMove() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const player = Alpine.$data(document.getElementById('player'));

    var finalLog = ``

    const skill = randomByChance(background.enemy.skills);

    var damage = encounter.attack;
    if (skill.damage) damage *= skill.damage;
    damage = Math.round((damage ** 2) / (player.armor));

    if (skill.times) {
        let hitOrMiss = Math.random() >= 1 - encounter.accuracy;
        let critOrCrap = Math.random() >= 1 - encounter.crit;

        player.health -= hitOrMiss ? Math.floor(damage * (critOrCrap ? 1.6 : '1')) : 0;
        encounter.log.push(`${background.enemy.name} used ${skill.name} on ${background.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'for a MISS'}`)
        updateBars()

        for (let i = 0; i < skill.times - 1; i++) {
            await new Promise(resolve => setTimeout(resolve, 2000 / skill.times));
            hitOrMiss = Math.random() >= 1 - encounter.accuracy;
            critOrCrap = Math.random() >= 1 - encounter.crit;
            tempDamage = hitOrMiss ? Math.floor(damage * (critOrCrap ? 1.6 : '1')) : 0;

            player.health -= tempDamage;
            encounter.log[encounter.log.length - 1] = encounter.log[encounter.log.length - 1] + `, ${hitOrMiss ? critOrCrap ? `CRIT ⚔️${tempDamage}` : `⚔️${tempDamage}` : 'MISS'}`
            updateBars()
        }
    } else {
        let hitOrMiss = Math.random() >= 1 - encounter.accuracy;
        let critOrCrap = Math.random() >= 1 - encounter.crit;

        damage = hitOrMiss ? Math.floor(damage * (critOrCrap ? 1.6 : '1')) : 0
        player.health -= damage

        encounter.log.push(`${background.enemy.name} used ${skill.name} on ${background.name} ${hitOrMiss ? critOrCrap ? `for CRIT ⚔️${damage}` : `for ⚔️${damage}` : 'and MISSED!'}`)
    }

    updateBars()
    await new Promise(resolve => setTimeout(resolve, 2000));

    player.pstatus.forEach(s => {
        switch (s.id) {
            case '🩸': {
                let damage = s.baseDam * s.damage;
                encounter.log.push(`${background.name} is bleeding - 🩸${damage}`);
                player.health -= damage;
                s.rounds -= 1;
                break;
            }
            case '👁️': {

                break;
            }
            case '🔥': {
                let damage = s.baseDam * s.damage;
                encounter.log.push(`${background.name} is on fire - 🔥${damage}`);
                player.health -= damage;
                break;
            }
            case '🖤': {
                let damage = s.baseDam * s.damage;
                encounter.log.push(`${background.name} is cursed - 🖤${damage}`);
                player.health -= damage;
                break;
            }
            case '🏳️': {

                break;
            }
            case '💨': {

                break;
            }
            case '💀': {
                let damage = s.maxHP * player.maxHealth;
                encounter.log.push(`${background.name} is poisoned - 💀${damage}`);
                player.health -= damage;
                break;
            }
            case '🎯': {

                break;
            }
            case '🛡️': {

                break;
            }
            case '🍀': {

                break;
            }
            case '💗': {
                var heal = s.maxHP * player.maxHealth;
                if ((player.health + heal) > player.maxHealth) heal = player.maxHealth - player.health;
                encounter.log.push(`${background.name} is regenerating - 💗${heal}`);
                player.health += heal;
                break;
            }
            case '💪': {

                break;
            }
            case '🌀': {

                break;
            }
            case '🐈‍⬛': {

                break;
            }
            case '💢': {

                break;
            }
            case '💫': {

                break;
            }
            case '✨': {

                break;
            }
            case '🏴': {

                break;
            }
        }

        s.rounds -= 1;
        if (s.rounds <= 0) player.pstatus.splice(player.pstatus.indexOf(s))
    })

    var staminaRegen = Math.round(player.stamina * .1)
    if (player.stamina + staminaRegen > player.maxStamina) staminaRegen = player.maxStamina - player.stamina;
    player.stamina += staminaRegen

    battleStation.round += 1;
    battleStation.turn = true;
    updateBars()
}