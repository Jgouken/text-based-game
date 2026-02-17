// This file is for *in-battle* game logic for both the player and enemy.
const assets = getAssets()
const blessingWords = ['cleansed', 'purified', 'dispelled', 'vanquished', 'dissipated', 'evaporated', 'cured', 'alleviated', 'relieved', 'mitigated', 'quelled'];
const badOmenWords = ['corroded', 'eviscerated', 'devoured', 'eroded', 'withered', 'decayed', 'consumed', 'ravaged', 'tainted', 'spoiled', 'blighted', 'defiled', 'rotted'];
const statusId = (name) => getStatusIdByName(name);
const statusByName = (name) => assets.statuses.find((status) => status.name === name);
const hasStatus = (statusList, name) => statusList.some((status) => status.id === statusId(name));
var died = false;
var fled = false;

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

async function startBattle(enemy = null) {
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));
    const location = assets.areas.find(area => area.name == background.location)
    const randomEnemy = randomByChance(location.enemies).name

    const level = enemy ? (background.enemyLevel || 1) : (Math.floor(Math.random() * (location.maxlvl - location.minlvl) + location.minlvl))
    if (!enemy) enemy = assets.enemies.find(enemy => enemy.name == randomEnemy)
    const battleStation = Alpine.$data(document.getElementById('battle-station'));

    died = false;
    fled = false;
    encounter.battle = true;

    background.enemy = enemy
    background.enemyLevel = level
    enemy.skills.forEach(s => {
        delete s._cooldown;
    });

    encounter.maxHealth = Math.floor((enemy.health + (level ** 1.82424)) * (1 + (level / 200)));
    encounter.health = encounter.maxHealth;
    encounter.defense = Math.floor((enemy.defense + ((level / 2) ** 1.82424)) * (1 + (level / 200)));
    encounter.attack = Math.floor((enemy.attack + ((level / 2) ** 1.82424)) * (1 + (level / 200)));
    encounter.estatus = []
    encounter.crit = enemy.crit
    encounter.accuracy = enemy.accuracy

    encounter.log = []
    encounter.log.push(`⚔️${background.name} (${player.level}) vs. ${enemy.name} (${level})⚔️<i class="fa-solid fa-file-arrow-down" @click="exportLog()" data-tooltip="📄 Save Battle Log As..."
                        style="position: sticky; top: 0; float: right; right: 8px; z-index: 5; cursor: pointer; font-size: 24px; color: grey;"></i>`)
    battleStation.round = 1;
    battleStation.turn = false;
    battleStation._regenThisRound = 0;

    updateBars()
    turnManager(true);
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
    if (fled) return;
    if (player.health <= 0 || encounter.health <= 0) return;

    if (!isPlayer && skill.wait) {
        skill._cooldown = skill.wait;
    }

    const accDif =
        (hasStatus(attackerStatuses, 'Acuity') ? statusByName('Acuity').incAcc : 0)
        - (hasStatus(attackerStatuses, 'Blindness') ? statusByName('Blindness').decAcc : 0)
        - (hasStatus(defenderStatuses, 'Evasion') ? statusByName('Evasion').decEnAcc : 0);

    const critDif =
        (hasStatus(attackerStatuses, 'Luck') ? statusByName('Luck').incCrit : 0)
        - (hasStatus(attackerStatuses, 'Misfortune') ? statusByName('Misfortune').decCrit : 0);

    const damMult =
        (hasStatus(attackerStatuses, 'Empowerment') ? statusByName('Empowerment').damAdd : 0)
        + (hasStatus(attackerStatuses, 'Strength') ? statusByName('Strength').damAdd : 0)
        + (hasStatus(attackerStatuses, 'Berserk') ? statusByName('Berserk').damAdd : 0)
        + (hasStatus(defenderStatuses, 'Berserk') ? statusByName('Berserk').incDamTaken : 0)
        - (hasStatus(attackerStatuses, 'Weakness') ? statusByName('Weakness').damReduc : 0)
        + 1;

    const rigid =
        (hasStatus(defenderStatuses, 'Rigidity') ? statusByName('Rigidity').armorAdd : 0)
        - (hasStatus(defenderStatuses, 'Fragility') ? statusByName('Fragility').armorSub : 0)
        + 1;

    let damage = Math.floor((attacker.attack * damMult * (skill.damage || 1)) * (attacker.attack / (defender.defense + (defender.defense * rigid))));

    if (skill.cost && isPlayer) player.stamina -= skill.cost;

    let firstHit = Math.random() >= 1 - attacker.accuracy - accDif;
    let hit = firstHit;
    let crit = Math.random() >= 1 - attacker.crit - critDif;
    let totalDealt = 0;

    let skillLog = `<span style="color:lightblue;" data-tooltip="${skill.description ? `${skill.description}\n` : ''}${skill.cost ? `⚡${skill.cost}\n` : ''}⚔️ x${skill.attack ? (skill.damage || 1) : 0}\n${skill.times ? `🔄️${skill.times}x\n` : ''}${skill.flatHealth ? `❤️ ${skill.flatHealth}\n` : ''}${skill.health ? `💖 ${Math.floor(skill.health * 100)}%\n` : ''}${skill.lifesteal ? `💞 ${Math.floor(skill.lifesteal * 100)}%\n` : ''}${skill.pstatus ? (isPlayer ? 'Gains ' : 'Inflicts ') + `${skill.pstatus.join('')}\n` : ''}${skill.estatus ? (!isPlayer ? 'Gains ' : 'Inflicts ') + skill.estatus.join('') : ''}">${skill.cost ? '⚡' : ''}${skill.name}</span>`;
    encounter.log.push(`- ${attackerName} used ${skillLog}`);

    let damageLog = (final) =>
        `<span style="color:lightblue;" data-tooltip="⚔️ ${crit ? critMult : 1} * ((${attacker.attack} * ${damMult} * ${skill.damage || 1}) * (${attacker.attack} / (${attacker.attack} + (${defender.defense} * ${rigid})))) = ${final}">⚔️${final}</span>`;

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

    if (skill.health || skill.flatHealth || skill.lifesteal) {
        encounter.log[encounter.log.length - 1] += ` and healed for `
        crit = Math.random() >= 1 - attacker.crit - critDif;

        let heal = 0;
        if (skill.health) heal = skill.health * attacker.maxHealth;
        else if (skill.flatHealth) heal = skill.flatHealth;
        else if (skill.lifesteal) heal = totalDealt * skill.lifesteal;

        heal = Math.floor(heal * (crit ? critMult : 1));
        if (attacker.health + heal > attacker.maxHealth) heal = attacker.maxHealth - attacker.health;

        if (skill.health) {
            let healingLog = () => { return `<span style="color:lightblue;" data-tooltip="💖 ${attacker.maxHealth} * ${skill.health} * ${crit ? critMult : 1} = ${Math.floor(skill.health * attacker.maxHealth * (crit ? critMult : 1))}${(attacker.health + (skill.health * attacker.maxHealth * (crit ? critMult : 1))) > attacker.maxHealth ? '\nCapped to max health.' : ''}">💖${heal}</span>` }
            encounter.log[encounter.log.length - 1] += `${crit ? 'CRIT ' : ''}${healingLog()}`
        }
        else if (skill.flatHealth) {
            let healingLog = () => { return `<span style="color:lightblue;" data-tooltip="❤️ ${skill.flatHealth} * ${crit ? critMult : 1} = ${Math.floor(skill.flatHealth * (crit ? critMult : 1))}${(attacker.health + (skill.flatHealth * (crit ? critMult : 1))) > attacker.maxHealth ? '\nCapped to max health.' : ''}">❤️${heal}</span>` }
            encounter.log[encounter.log.length - 1] += `${crit ? 'CRIT ' : ''}${healingLog()}`
        }
        else if (skill.lifesteal) {
            let healingLog = () => { return `<span style="color:lightblue;" data-tooltip="💞 ${totalDealt} * ${skill.lifesteal} * ${crit ? critMult : 1} = ${Math.floor(totalDealt * skill.lifesteal * (crit ? critMult : 1))}${(attacker.health + ((totalDealt * skill.lifesteal) * (crit ? critMult : 1))) > attacker.maxHealth ? '\nCapped to max health.' : ''}">💞${heal}</span>` }
            encounter.log[encounter.log.length - 1] += `${crit ? 'CRIT ' : ''}${healingLog()}`
        }

        attacker.health += Math.floor(heal);
        updateBars();
    }

    if (firstHit || !skill.attack) {
        if (skill.pstatus) {
            let negated = [];
            let granted = [];
            skill.pstatus.forEach(status => {
                let stasset = assets.statuses.find(s => s.id == status);
                if ((hasStatus(player.pstatus, 'Malediction') && stasset.positive) || (hasStatus(player.pstatus, 'Blessing') && !stasset.positive)) {
                    negated.push(`<span data-tooltip="${status} ${stasset.name}\n\n${stasset.description}">${status}</span>`)
                } else {
                    const idx = player.pstatus.indexOf(player.pstatus.find(s => s.id == status));
                    const newStatus = { ...stasset, damage: status == statusId('Curse') ? attacker.attack : totalDealt };
                    if (idx >= 0) player.pstatus[idx] = newStatus;
                    else player.pstatus.push(newStatus);
                    granted.push(`<span data-tooltip="${status} ${stasset.name}\n\n${stasset.description}">${status}</span>`)
                }
            });
            encounter.log[encounter.log.length - 1] += `${granted.length > 0 ? `${isPlayer ? `${skill.estatus ? ',' : ' and'} gained ` : `${skill.estatus ? ',' : ' and'} inflicted `}[${granted.join('')}]` : ''}${negated.length > 0 ? ` but ${player.name} ${hasStatus(player.pstatus, 'Malediction') ? badOmenWords[Math.floor(Math.random() * badOmenWords.length)] : blessingWords[Math.floor(Math.random() * blessingWords.length)]} [${negated.join('')}]` : ''}`;
        }

        if (skill.estatus) {
            let negated = [];
            let granted = [];
            skill.estatus.forEach(status => {
                let stasset = assets.statuses.find(s => s.id == status);
                if ((hasStatus(encounter.estatus, 'Malediction') && stasset.positive) || (hasStatus(encounter.estatus, 'Blessing') && !stasset.positive)) {
                    negated.push(`<span data-tooltip="${status} ${stasset.name}\n\n${stasset.description}">${status}</span>`)
                } else {
                    const idx = encounter.estatus.indexOf(encounter.estatus.find(s => s.id == status));
                    const newStatus = { ...stasset, damage: status == statusId('Curse') ? attacker.attack : totalDealt };
                    if (idx >= 0) encounter.estatus[idx] = newStatus;
                    else encounter.estatus.push(newStatus);
                    granted.push(`<span data-tooltip="${status} ${stasset.name}\n\n${stasset.description}">${status}</span>`);
                }
            });
            encounter.log[encounter.log.length - 1] += `${granted.length > 0 ? `${!isPlayer ? ` and gained ` : ` and inflicted `}[${granted.join('')}]` : ''}${negated.length > 0 ? ` but ${encounter.enemyName} ${hasStatus(encounter.estatus, 'Malediction') ? badOmenWords[Math.floor(Math.random() * badOmenWords.length)] : blessingWords[Math.floor(Math.random() * blessingWords.length)]} [${negated.join('')}]` : ''}`;
        }
    }

    new Promise(r => setTimeout(r, 250))

    if (hasStatus(player.pstatus, 'Blessing') || hasStatus(player.pstatus, 'Malediction')) {
        if (hasStatus(player.pstatus, 'Blessing') && hasStatus(player.pstatus, 'Malediction')) {
            player.pstatus.length = 0;
            encounter.log.push(`${statusId('Blessing')} All ${player.name}'s effects were evaporated. ${statusId('Malediction')}`);
        } else if (hasStatus(player.pstatus, 'Malediction')) {
            let eviscerated = [];
            player.pstatus.slice().forEach(s => {
                if (s.positive) {
                    player.pstatus.splice(player.pstatus.indexOf(s), 1);
                    eviscerated.push(`<span data-tooltip="${s.id} ${s.name}\n\n${s.description}">${s.id}</span>`);
                }
            });
            if (eviscerated.length > 0) encounter.log.push(`${statusId('Malediction')} All of ${player.name}'s positive effects were ${badOmenWords[Math.floor(Math.random() * badOmenWords.length)]} [${eviscerated.join('')}].`);
        } else if (hasStatus(player.pstatus, 'Blessing')) {
            let cleansed = [];
            player.pstatus.slice().forEach(s => {
                if (!s.positive) {
                    player.pstatus.splice(player.pstatus.indexOf(s), 1);
                    cleansed.push(`<span data-tooltip="${s.id} ${s.name}\n\n${s.description}">${s.id}</span>`);
                }
            });

            if (cleansed.length > 0) encounter.log.push(`${statusId('Blessing')} All of ${player.name}'s negative effects were ${blessingWords[Math.floor(Math.random() * blessingWords.length)]} [${cleansed.join('')}].`);
        }
    }

    if (hasStatus(encounter.estatus, 'Blessing') || hasStatus(encounter.estatus, 'Malediction')) {
        if (hasStatus(encounter.estatus, 'Blessing') && hasStatus(encounter.estatus, 'Malediction')) {
            encounter.estatus.length = 0;
            encounter.log.push(`${statusId('Blessing')} All ${encounter.enemyName}'s effects were evaporated. ${statusId('Malediction')}`);
        } else if (hasStatus(encounter.estatus, 'Malediction')) {
            let eviscerated = [];
            encounter.estatus.slice().forEach(s => {
                if (s.positive) {
                    encounter.estatus.splice(encounter.estatus.indexOf(s), 1);
                    eviscerated.push(`<span data-tooltip="${s.id} ${s.name}\n\n${s.description}">${s.id}</span>`);
                }
            });
            if (eviscerated.length > 0) encounter.log.push(`${statusId('Malediction')} All of ${encounter.enemyName}'s positive effects were ${badOmenWords[Math.floor(Math.random() * badOmenWords.length)]} [${eviscerated.join('')}].`);
        } else if (hasStatus(encounter.estatus, 'Blessing')) {
            let cleansed = [];
            encounter.estatus.slice().forEach(s => {
                if (!s.positive) {
                    encounter.estatus.splice(encounter.estatus.indexOf(s), 1);
                    cleansed.push(`<span data-tooltip="${s.id} ${s.name}\n\n${s.description}">${s.id}</span>`);
                }
            });

            if (cleansed.length > 0) encounter.log.push(`${statusId('Blessing')} All of ${encounter.enemyName}'s negative effects were ${blessingWords[Math.floor(Math.random() * blessingWords.length)]} [${cleansed.join('')}].`);
        }
    }

    await new Promise(r => setTimeout(r, 400))
}

async function skill(index) {
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));
    let shouldEndTurn = true;

    const consumables = player.inventory
        .map((inventoryItem, inventoryIndex) => ({
            inventoryItem,
            inventoryIndex,
            itemData: assets.items.find(item => item.name === inventoryItem.name)
        }))
        .filter(entry => entry.itemData && entry.itemData.name.toLowerCase().includes('potion'));

    switch (index) {
        case -3:
            // Flee
            fled = true;
            battleStation.turn = false;
            battleStation.showConsumables = false;
            encounter.battle = false;
            encounter.log.push(`🏃💨 ${background.name} Fled!`)
            transition('encounter', 'returning');
            shouldEndTurn = false;
            break;
        case -2:
            // Item
            if (consumables.length === 0) {
                battleStation.showConsumables = false;
                battleStation.turn = true;
                shouldEndTurn = false;
                break;
            }

            battleStation.showConsumables = !battleStation.showConsumables;
            battleStation.turn = true;
            shouldEndTurn = false;
            break;
        case -1:
            // Pass
            battleStation.turn = false;
            battleStation.showConsumables = false;
            var staminaRegen = Math.round(player.maxStamina * 0.1);
            if (player.stamina + staminaRegen > player.maxStamina) staminaRegen = player.maxStamina - player.stamina;
            player.stamina += staminaRegen;
            battleStation._regenThisRound = (battleStation._regenThisRound || 0) + staminaRegen;
            encounter.log.push(`- ${background.name} passed ${staminaRegen > 0 ? `(+${staminaRegen}⚡)` : ''}`);
            break;
        case 0:
        case 1:
        case 2:
        case 3: {
            battleStation.turn = false;
            battleStation.showConsumables = false;
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

    if (shouldEndTurn) {
        turnManager(false);
    }
}

async function useBattleConsumable(consumableIndex) {
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    if (!battleStation.turn) return;

    const consumables = player.inventory
        .map((inventoryItem, inventoryIndex) => ({
            inventoryItem,
            inventoryIndex,
            itemData: assets.items.find(item => item.name === inventoryItem.name)
        }))
        .filter(entry => entry.itemData && entry.itemData.name.toLowerCase().includes('potion'));

    const selected = consumables[consumableIndex];
    if (!selected || !selected.itemData) return;

    const itemData = selected.itemData;

    if (itemData.health) {
        const healAmount = Math.floor(player.maxHealth * itemData.health);
        player.health = Math.min(player.health + healAmount, player.maxHealth);
    }

    if (itemData.stamina) {
        const staminaAmount = Math.floor(player.maxStamina * itemData.stamina);
        player.stamina = Math.min(player.stamina + staminaAmount, player.maxStamina);
    }

    if (itemData.xp) {
        player.experience += itemData.xp;
    }

    if (itemData.pstatus) {
        itemData.pstatus.forEach(statusId => {
            const status = assets.statuses.find(s => s.id === statusId);
            if (status && !player.pstatus.some(s => s.id === statusId)) {
                player.pstatus.push({ ...status, baseDam: player.attack });
            }
        });
    }

    removeFromInventory(selected.inventoryIndex);
    encounter.log.push(`- ${background.name} used ${selected.inventoryItem.name}`);

    battleStation.showConsumables = false;
    battleStation.turn = false;

    updateBars();
    await savePlayer();
    turnManager(false);
}

async function turnManager(toPlayer) {
    if (died || fled) return;
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const battleStation = Alpine.$data(document.getElementById('battle-station'));
    const player = Alpine.$data(document.getElementById('player'));
    const actor = toPlayer ? player : encounter;
    const actorStatuses = toPlayer ? player.pstatus : encounter.estatus;
    const actorName = toPlayer ? background.name : background.enemy.name;
    var stunned = false;
    updateBars();
    await new Promise(resolve => setTimeout(resolve, 250));

    const death = async () => {
        if (encounter.health <= 0 || player.health <= 0) {
            died = true;
            background.enemy.skills.forEach(s => { delete s._cooldown; });
            encounter.battle = false;
            if (encounter.health <= 0) encounter.log.push(`--- ${background.enemy.name} has died. ---`);
            else {
                encounter.log.push(`--- ${background.name} has died. ---`);
                await savePlayer();
                return true;
            }

            let currentLevel = player.level
            var xpdrop = Math.floor((((background.enemyLevel ** 1.2) * (encounter.maxHealth / encounter.attack)) ** 1.2) * 2);
            let xptext = `<span color="lightblue" data-tooltip='(((${background.enemyLevel}^1.2) * (${encounter.maxHealth} / ${encounter.attack}))^1.2) * 2 = ${xpdrop}'>${xpdrop}</span>`;
            await new Promise(r => setTimeout(r, 200))
            encounter.log.push(`🌟 ${background.name} earned ${xptext} experience! 🌟`)

            while (player.experience + xpdrop > Math.floor(((player.level / 0.07) ** 2) / 2)) {
                xpdrop -= (Math.floor(((player.level / 0.07) ** 2) / 2)) - player.experience;
                player.level += 1;
                player.experience = 0;
                await new Promise(r => setTimeout(r, 200))
                encounter.log.push(`⬆️ ${background.name} leveled up to level ${player.level}! ⬆️`)
            }

            player.experience += xpdrop;
            if (player.level > currentLevel) {
                player.health = player.maxHealth;
                player.stamina = player.maxStamina;
            }
            await setPlayer();
            updateBars();

            // Pick a drop from the enemy
            const drop = randomByChance(background.enemy.drops)
            const loot = assets.items.find(item => item.name == drop.name);

            if (loot === undefined && loot !== null) {
                console.error(`Item not found: ${drop.name}`);
                return true;
            }

            let level = 1
            if (loot.minlvl) level = loot.minlvl && loot.maxlvl ? Math.floor(Math.random() * (loot.maxlvl - loot.minlvl + 1) + loot.minlvl) : 1;

            let desc = () => {
                let it = loot;
                const parts = [];
                if (it.attack !== undefined || it.defense !== undefined || it.maxlvl) {
                    parts.push('Level ' + (level ?? 1));
                    if (it.attack !== undefined) {
                        parts.push(`⚔️${Math.floor(it.attack + ((level ?? 1 - 1) * it.attackPerLevel))} 🍀${Math.floor(it.crit * 100)}% ⚔️${it.critdmg}x 🎯${Math.floor(it.accuracy * 100)}%`);
                    } else if (it.defense !== undefined && it.maxlvl) {
                        parts.push(`🛡️${Math.floor(it.defense + ((level ?? 1 - 1) * it.alvlmult))} 💨${Math.floor(it.evasion * 100)}%`);
                    }
                }

                if (it.health) parts.push(`💖 ${Math.round(it.health * 100)}%`);
                if (it.stamina) parts.push(`⚡ ${Math.round(it.stamina * 100)}%`);
                if (it.buff) parts.push('⚔️ +' + Math.round(it.buff * 100) + '% ' + (it.rounds ? (' for ' + it.rounds + ' turns') : ''));
                if (it.xp) parts.push(`🌟 ${it.xp} XP`);
                if (it.chest !== undefined) parts.push(`Opens ${assets.chests[it.chest].name}`);
                if (it.damage) parts.push(`💥 ${it.damage}`);
                if (it.pstatus) parts.push(`Gain ${it.pstatus.join(', ')}`);
                if (it.estatus) parts.push(`Inflicts ${it.estatus.join(', ')}`);
                if (parts.length) return parts.join('\n');
                else return 'Crafting Reagent';
            }

            let descText = desc().replace(/"/g, '&quot;').replace(/'/g, '&apos;');

            const lootResult = addToInventory(loot, level);
            if (lootResult) {
                encounter.log.push(`🎁 ${background.enemy.name} dropped a${/^[aeiou]/i.test(loot.name) ? 'n' : ''} ${level > 1 ? 'Level ' + level + ' ' : ''}<span style='color: lightblue;' data-tooltip="${descText}">${loot.name}</span>! 🎁`);
            } else {
                console.error(`Couldn't acquire ${drop.name}.`);
            }
            return true;
        } else return false;
    }

    if (await death()) return;

    if (hasStatus(actorStatuses, 'Blessing') && hasStatus(actorStatuses, 'Malediction')) {
        actorStatuses.length = 0;
        encounter.log.push(`${statusId('Blessing')} All ${actorName}'s effects were evaporated. ${statusId('Malediction')}`);
    } else if (hasStatus(actorStatuses, 'Malediction')) {
        let eviscerated = [];
        actorStatuses.slice().forEach(s => {
            if (s.positive) {
                actorStatuses.splice(actorStatuses.indexOf(s), 1);
                eviscerated.push(`<span data-tooltip="${s.id} ${s.name}\n\n${s.description}">${s.id}</span>`);
            }
        });
        if (eviscerated.length > 0) encounter.log.push(`${statusId('Malediction')} All of ${actorName}'s positive effects were ${badOmenWords[Math.floor(Math.random() * badOmenWords.length)]} [${eviscerated.join('')}].`);
    } else if (hasStatus(actorStatuses, 'Blessing')) {
        let cleansed = [];
        actorStatuses.slice().forEach(s => {
            if (!s.positive) {
                actorStatuses.splice(actorStatuses.indexOf(s), 1);
                cleansed.push(`<span data-tooltip="${s.id} ${s.name}\n\n${s.description}">${s.id}</span>`);
            }
        });

        if (cleansed.length > 0) encounter.log.push(`${statusId('Blessing')} All of ${actorName}'s negative effects were ${blessingWords[Math.floor(Math.random() * blessingWords.length)]} [${cleansed.join('')}].`);
    }

    if (hasStatus(actorStatuses, 'Stun')) stunned = true;
    await new Promise(r => setTimeout(r, 250))
    for (const s of actorStatuses.slice()) {
        switch (s.id) {
            case statusId('Bleed'): {
                let damage = Math.floor(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is bleeding - <span style="color: lightblue;" data-tooltip="${statusId('Bleed')} ${s.name}\n\n${s.description}\n\n${s.damage} * ${s.baseDam} = ${damage}">${statusId('Bleed')}${damage}</span>`);
                actor.health -= damage;
                await new Promise(r => setTimeout(r, 400))
                break;
            }
            case statusId('Burn'): {
                let damage = Math.floor(s.baseDam * s.damage);
                encounter.log.push(`${actorName} is on fire - <span style="color: lightblue;" data-tooltip="${statusId('Burn')} ${s.name}\n\n${s.description}\n\n${s.damage} * ${s.baseDam} = ${damage}">${statusId('Burn')}${damage}</span>`);
                actor.health -= damage;
                await new Promise(r => setTimeout(r, 400))
                break;
            }
            case statusId('Curse'): {
                let damage = Math.floor(s.baseDam * actor.attack);
                encounter.log.push(`${actorName} is cursed - <span style="color: lightblue;" data-tooltip="${statusId('Curse')} ${s.name}\n\n${s.description}\n\n${actor.attack} * ${s.baseDam} = ${damage}">${statusId('Curse')}${damage}</span>`);
                actor.health -= damage;
                await new Promise(r => setTimeout(r, 400))
                break;
            }
            case statusId('Poison'): {
                let damage = Math.floor(s.maxHP * actor.maxHealth);
                encounter.log.push(`${actorName} is poisoned - <span style="color: lightblue;" data-tooltip="${statusId('Poison')} ${s.name}\n\n${s.description}\n\n${actor.maxHealth} * ${s.maxHP} = ${damage}">${statusId('Poison')}${damage}</span>`);
                actor.health -= damage;
                await new Promise(r => setTimeout(r, 400))
                break;
            }
            case statusId('Regeneration'): {
                let heal = Math.floor(s.maxHP * actor.maxHealth);
                if (actor.health + heal > actor.maxHealth)
                    heal = actor.maxHealth - actor.health;

                encounter.log.push(`${actorName} is regenerating - <span style="color: lightblue;" data-tooltip="${statusId('Regeneration')} ${s.name}\n\n${s.description}\n\n${actor.maxHealth} * ${s.maxHP} = ${Math.floor(s.maxHP * actor.maxHealth)}${actor.health + Math.floor(s.maxHP * actor.maxHealth) > actor.maxHealth ? '\nCapped to max health.' : ''}">${statusId('Regeneration')}${heal}</span>`);
                actor.health += heal;
                await new Promise(r => setTimeout(r, 400))
                break;
            }
        }

        s.rounds -= 1;
        if (s.rounds <= 0) actorStatuses.splice(actorStatuses.indexOf(s), 1);
    }

    if (await death()) return;

    if (toPlayer) {
        const already = battleStation._regenThisRound || 0;
        const desiredTotal = already > 0 ? Math.round(player.maxStamina * 0.2) : Math.round(player.maxStamina * 0.1);
        let staminaRegen = Math.max(0, desiredTotal - already);
        if (player.stamina + staminaRegen > player.maxStamina) staminaRegen = player.maxStamina - player.stamina;
        if (staminaRegen > 0) player.stamina += staminaRegen;
        battleStation._regenThisRound = 0;
        battleStation.round += 1;
    }

    updateBars();

    if (stunned) {
        encounter.log.push(`${statusId('Stun')} ${actorName} is stunned.`);
        await new Promise(r => setTimeout(r, 500));
        actorStatuses.forEach(s => {
            if (s.id == statusId('Stun')) s.rounds = Math.max(0, s.rounds - 1);
        });
        return turnManager(!toPlayer);
    }

    // ya know...
    if (fled) return;

    if (toPlayer) battleStation.turn = true;
    else {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (fled) return;
        background.enemy.skills.forEach(s => {
            if (s._cooldown > 0) s._cooldown--;
        });
        enemyMove();
    }

    savePlayer();
}

async function enemyMove() {
    if (fled) return;
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));

    const available = background.enemy.skills.filter(s => !s._cooldown || s._cooldown <= 0);
    let skill;
    if (available.length === 0) skill = background.enemy.skills[0];
    else {
        const choice = randomByChance(available.map(s => ({ ref: s, chance: s.chance || 1 })));
        skill = choice ? choice.ref : available[0];
    }

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

async function victory() {
    const background = Alpine.$data(document.getElementById('background-image'));
    const player = Alpine.$data(document.getElementById('player'));
    if (player.health <= 0) {
        let deathMessages = [
            `${background.name} has fallen in battle...`,
            `${background.name} met their demise...`,
            `Are you making sacrifices at this point?`,
            `Stand up and fight again.`,
            `Come on, your vague heroism isn't over yet.`,
            `This is not the end for ${background.name}.`,
            `Even in death, ${background.name} inspires others to fight on. Including their child that has the exact same name.`,
            `${background.name} has been defeated, but their legend will live on. Well, now.`,
            `The enemy has bested ${background.name} this time.`,
            `Defeat is just a stepping stone for ${background.name}. Rise again!`,
            `Really? You died to a ${background.enemy.name}? A ${background.enemy.name.toUpperCase()}?!`,
            `Do you think you're where you're supposed to be?`,
            `📸🤨`,
            `Hey, you. Don't you hear the bell?`,
            `You're finally awake.`,
            `So, about your healing ability...`
        ]
        alert(deathMessages[Math.floor(Math.random() * deathMessages.length)]);
        await new Promise(resolve => setTimeout(resolve, 500));
        player.health = player.maxHealth;
        player.pstatus = [];
    };
    transition('encounter', 'returning');
    updateBars();
    savePlayer();
}

async function exportLog() {
    const background = Alpine.$data(document.getElementById('background-image'));
    const encounter = Alpine.$data(document.getElementById('encounter'));
    const player = Alpine.$data(document.getElementById('player'));
    let logText = `${new Date().toLocaleString()}\n${background.name} (${player.level}) / ${encounter.enemyName} (${background.enemyLevel})\n⚔️ ${player.weaponry.weapon.name} (${player.weaponry.level}) - 🛡️${player.armory.armor.name} (${player.armory.level})\n${encounter.enemyName} - ❤️${encounter.maxHealth}/${encounter.maxHealth}\n--- Encounter Log ---\n\n`;
    logText += encounter.log.map(entry => entry.replaceAll(/<[^>]*>/g, "")).join('\n\n');
    logText += `\n\n--- End of Log ---\nBattle Log from Text-Based-Game (c) Jgouken & SavorySam\nPlay online at https://jgouken.github.io/text-based-game/`;

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${player.name}-${player.level}-${background.enemy.name}-${background.enemyLevel}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    savePlayer();
}