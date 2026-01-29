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

    document.getElementById(`health`).style.width = `${Math.floor(((alpinePlayerData.health < 0 ? 0 : alpinePlayerData.health) / alpinePlayerData.maxHealth) * 560)}px`;
    document.getElementById(`stamina`).style.width = `${Math.floor(((alpinePlayerData.stamina < 0 ? 0 : alpinePlayerData.stamina) / alpinePlayerData.maxStamina) * 310)}px`;
    document.getElementById(`experience`).style.width = `${Math.floor(((alpinePlayerData.experience < 0 ? 0 : alpinePlayerData.experience) / Math.floor((alpinePlayerData.level / 0.07) ** 2)) * 450)}px`;
    document.getElementById(`enemy-health`).style.width = `${Math.floor(((alpineEnemyData.health < 0 ? 0 : alpineEnemyData.health) / alpineEnemyData.maxHealth) * 80)}%`;
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
    player.armor = 10 + (((player.level || 1) - 1) * 10)

    player.health = 500 + (((player.level || 1) - 1) * 50)
    player.maxStamina = 30 + (((player.level || 1) - 1) * 5)

    player.attack = 32 + (((player.level || 1) - 1) * 6) + player.weaponry.weapon.attack + ((player.weaponry.level - 1) * player.weaponry.weapon.attackPerLevel)
    player.armor = 10 + (((player.level || 1) - 1) * 10) + player.armory.armor.armor + ((player.armory.level - 1) * player.armory.armor.alvlmult)

    player.crit = player.weaponry.weapon.crit;
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
    encounter.estatuses = []

    encounter.log = []
    encounter.log.push(`⚔️ ${background.name} (${player.level}) vs. ${enemy.name} (${level})⚔️`)
    battleStation.round = 1;
    battleStation.turn = true;
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
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));
    const battleStation = Alpine.$data(document.getElementById('battle-station'));

    battleStation.turn = false;

    console.log(index)
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
            // Basic Attack
            const skill = player.weaponry.weapon.skills[0]
            var hitOrMiss = Math.ceil((Math.random() * player.crit) * 20);

            var damage = player.attack

            if (skill.damage) damage *= skill.damage;

            damage = damage / (encounter.defense / damage);

            if (skill.times) {
                encounter.health -= damage;
                encounter.log.push(`${background.name} used ${player.weaponry.weapon.skills[0].name} and hit for ⚔️${damage}`)
                for (let i = 0; i < skill.times - 1; i++) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    encounter.health -= damage;
                    encounter.log[-1] = encounter.log[-1] + g
                }
            }

            encounter.health -= damage
            encounter.log.push(`${background.name} used ${player.weaponry.weapon.skills[0].name} on ${background.enemy.name} for ⚔️${damage}`)
            updateBars()
            break;
        case 1:
            // Skill 1
            break;
        case 2:
            // Skill 2
            break;
        case 3:
            // Skill 3
            break;
        default:
            // Not sure how you pressed this button, but suffer the consequences.
            break;
    }

    enemyMove()
}

// After the play is done, it's the enemy's turn
async function enemyMove() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const player = Alpine.$data(document.getElementById('player'));

    encounter.log.push(`${background.enemy.name} slipped on their own unfinishedness.`)
    battleStation.round += 1;
    battleStation.turn = true;
}