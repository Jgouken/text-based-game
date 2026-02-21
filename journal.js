function getJournalBlockTierKey(level) {
    if (level >= 50) return 'fifty';
    if (level >= 40) return 'forty';
    if (level >= 30) return 'thirty';
    if (level >= 20) return 'twenty';
    if (level >= 10) return 'ten';
    return 'zero';
}

function journalPercent(value) {
    return `${Math.round((Number(value) || 0) * 100)}%`;
}

function journalStatusText(statusIds, assets) {
    if (!Array.isArray(statusIds) || statusIds.length === 0) return null;
    return statusIds
        .map((statusId) => {
            return statusId;
        })
        .join('');
}

function clampJournalLevel(level) {
    const safe = Number(level) || 1;
    return Math.max(1, Math.min(50, safe));
}

function escapeJournalHtml(text) {
    return String(text)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function replaceFirstOccurrence(source, search, replacement) {
    const index = source.indexOf(search);
    if (index === -1) return source;
    return source.slice(0, index) + replacement + source.slice(index + search.length);
}

function getSkillStatusDescriptor(skill, key) {
    if (!skill || !key) return null;

    const descriptor = Object.getOwnPropertyDescriptor(skill, key);
    if (descriptor && typeof descriptor.get === 'function') {
        const source = descriptor.get.toString();
        const arrayMatch = source.match(/\[([\s\S]*?)\]/);
        const pool = [];

        if (arrayMatch) {
            const valueRegex = /["'`]([^"'`]+)["'`]/g;
            let match;
            while ((match = valueRegex.exec(arrayMatch[1])) !== null) {
                pool.push(match[1]);
            }
        }

        const maxPickMatch = source.match(/Math\.max\(\s*1\s*,\s*(\d+)\s*\)/) || source.match(/slice\(\s*0\s*,\s*(\d+)\s*\)/);
        const maxPick = Number(maxPickMatch?.[1]) || pool.length || 1;

        return {
            isRandomizer: true,
            pool,
            maxPick,
            fallback: pool[0] || null
        };
    }

    const value = skill[key];
    if (!Array.isArray(value) || value.length === 0) return null;

    return {
        isRandomizer: false,
        value
    };
}

function getJournalSkillLines(skill, assets, actor = 'player') {
    const lines = [];

    if (skill.description) lines.push(skill.description);
    if (skill.times) {
        if (skill.damage) lines.push(`Deals ${Math.round(skill.damage * 100)}% base damage ${skill.times} times`);
        else lines.push(`Hits ${skill.times} times`);
    } else if (skill.damage) {
        lines.push(`Deals ${Math.round(skill.damage * 100)}% base damage`);
    }

    if (skill.health) lines.push(`Heals ${Math.round(skill.health * 100)}% health`);
    if (!skill.damage && skill.attack) lines.push('Deals basic damage');

    const actorIsPlayer = actor === 'player';
    const pStatusInfo = getSkillStatusDescriptor(skill, 'pstatus');
    const eStatusInfo = getSkillStatusDescriptor(skill, 'estatus');

    if (pStatusInfo) {
        const pLabel = actorIsPlayer ? 'Gains' : 'Inflicts';
        if (pStatusInfo.isRandomizer) {
            const pool = pStatusInfo.pool.join('');
            const fallback = pStatusInfo.fallback || '';
            lines.push(`${pLabel}: Picks up to ${pStatusInfo.maxPick} of ${pool} or otherwise selects ${fallback}`);
        } else {
            const pStatus = journalStatusText(pStatusInfo.value, assets);
            if (pStatus) lines.push(`${pLabel}: ${pStatus}`);
        }
    }

    if (eStatusInfo) {
        const eLabel = actorIsPlayer ? 'Inflicts' : 'Gains';
        if (eStatusInfo.isRandomizer) {
            const pool = eStatusInfo.pool.join('');
            const fallback = eStatusInfo.fallback || '';
            lines.push(`${eLabel}: Picks up to ${eStatusInfo.maxPick} of ${pool} or otherwise selects ${fallback}`);
        } else {
            const eStatus = journalStatusText(eStatusInfo.value, assets);
            if (eStatus) lines.push(`${eLabel}: ${eStatus}`);
        }
    }

    if (lines.length === 0) lines.push('Does nothing');

    return lines;
}

function getJournalPlayerDetails(player, assets) {
    if (!player) {
        return {
            title: 'PLAYER',
            subtitle: null,
            groups: [{ title: 'Stats', lines: ['Player data is not loaded yet.'] }]
        };
    }

    const weapon = player?.weaponry?.weapon;
    const armor = player?.armory?.armor;
    const xpRequired = getRequiredXP(player.level);
    const synergy = armor?.synergies?.find((syn) => syn.weapon === weapon?.name);

    const groups = [
        {
            title: 'Stats',
            lines: [
                `Health: ${Math.round(player.health)}/${Math.round(player.maxHealth)}`,
                `Attack: ${Math.round(player.attack)} (${weapon?.name || 'None'} Lv.${player.weaponry?.level || 1})`,
                `Defense: ${Math.round(player.defense)} (${armor?.name || 'None'} Lv.${player.armory?.level || 1})`,
                `Crit Chance: ${journalPercent(player.crit)}`,
                `Crit Multiplier: ${player.critdmg || 0}x`,
                `Accuracy: ${journalPercent(player.accuracy)}`,
                `Evasion: ${journalPercent(player.evasion)}`,
                `Stamina: ${Math.round(player.stamina)}/${Math.round(player.maxStamina)}`,
                `XP: ${Math.round(player.experience)}/${xpRequired}`
            ]
        }
    ];

    if (synergy) {
        const synergyLines = [];
        if (synergy.attack) synergyLines.push(`Attack +${synergy.attack}`);
        if (synergy.defense) synergyLines.push(`Defense +${synergy.defense}`);
        if (synergy.crit) synergyLines.push(`Crit +${journalPercent(synergy.crit)}`);
        if (synergy.evasion) synergyLines.push(`Evasion +${journalPercent(synergy.evasion)}`);
        if (synergyLines.length) {
            groups.push({
                title: `Synergy: ${synergy.name || 'Active Synergy'}`,
                lines: synergyLines
            });
        }
    }

    if (weapon?.skills?.length) {
        groups.push({
            title: 'Skills',
            items: weapon.skills.map((skill) => ({
                title: `${skill.name}${skill.cost ? ` - ⚡${skill.cost}` : ''}`,
                lines: getJournalSkillLines(skill, assets, 'player')
            }))
        });
    }

    return {
        title: (player.name || 'Player').toUpperCase(),
        subtitle: `Level ${player.level}`,
        groups
    };
}

function getJournalItemDetails(entry, previewLevel, playerLevel, assets) {
    const groups = [];

    if (entry.kind === 'chest') {
        const chest = entry.raw;
        const descriptionLines = chest.description ? [chest.description] : [];
        const drops = Array.isArray(chest.drops)
            ? chest.drops.map((drop) => `${drop.name || 'Nothing'} - ${String((drop.chance || 0) * 100).slice(0, 5)}%`)
            : [];

        if (chest.key) groups.push({ title: 'Key', lines: [chest.key] });
        if (drops.length) groups.push({ title: 'Drops', lines: drops });

        return {
            title: chest.name,
            subtitle: null,
            mediaSrc: chest.sprite || null,
            mediaAlt: chest.name,
            descriptionLines,
            groups
        };
    }

    const item = entry.raw;
    const effectiveLevel = Math.max(item.minlvl || 1, Math.min(item.maxlvl || 50, clampJournalLevel(previewLevel)));
    const descriptionLines = [];

    if (item.description) descriptionLines.push(item.description);
    if (item.craft?.length) {
        const craftCounts = new Map();
        const craftOrder = [];

        item.craft.forEach((ingredientName) => {
            if (!craftCounts.has(ingredientName)) {
                craftCounts.set(ingredientName, 0);
                craftOrder.push(ingredientName);
            }
            craftCounts.set(ingredientName, craftCounts.get(ingredientName) + 1);
        });

        const craftLines = craftOrder.map((ingredientName) => {
            const count = craftCounts.get(ingredientName) || 1;
            return count > 1 ? `${ingredientName} x${count}` : ingredientName;
        });

        groups.push({ title: 'Crafting Recipe', lines: craftLines });
    }
    if (item.minlvl !== undefined || item.maxlvl !== undefined || item.attack !== undefined || item.defense !== undefined) {
        descriptionLines.unshift(`Preview Level ${effectiveLevel}`);
    }

    if (item.defense !== undefined && !item.skills) {
        const armorValue = Math.round(item.defense + ((effectiveLevel - 1) * (item.alvlmult || 0)) + ((playerLevel - 1) * 10 * (item.plvlmult || 0)));
        const lines = [
            `Armor: +${armorValue}`,
            `Evasion: ${journalPercent(item.evasion)}`
        ];
        groups.push({ title: 'Armor', lines });

        if (Array.isArray(item.synergies) && item.synergies.length) {
            groups.push({
                title: 'Synergies',
                items: item.synergies.map((syn) => {
                    const synLines = [];
                    if (syn.attack) synLines.push(`Attack +${syn.attack}`);
                    if (syn.defense) synLines.push(`Defense +${syn.defense}`);
                    if (syn.critical) synLines.push(`Crit +${journalPercent(syn.critical)}`);
                    if (syn.crit) synLines.push(`Crit +${journalPercent(syn.crit)}`);
                    if (syn.evasion) synLines.push(`Evasion +${journalPercent(syn.evasion)}`);
                    return {
                        title: `${syn.weapon}${syn.name ? ` - ${syn.name}` : ''}`,
                        lines: synLines
                    };
                })
            });
        }
    } else if (Array.isArray(item.skills)) {
        const attackValue = Math.round(item.attack + ((effectiveLevel - 1) * (item.attackPerLevel || 0)) + ((playerLevel - 1) * 6 * (item.plvlmult || 0)));
        groups.push({
            title: 'Weapon',
            lines: [
                `Attack: +${attackValue}`,
                `Crit Chance: ${journalPercent(item.crit)}`,
                `Crit Multiplier: ${item.critdmg || 0}x`,
                `Accuracy: ${journalPercent(item.accuracy)}`
            ]
        });
        groups.push({
            title: 'Skills',
            items: item.skills.map((skill) => ({
                title: `${skill.name}${skill.cost ? ` - ⚡${skill.cost}` : ''}`,
                lines: getJournalSkillLines(skill, assets, 'player')
            }))
        });

        const armorSynergies = assets.items
            .filter((assetItem) => assetItem && assetItem.defense !== undefined && !assetItem.skills && Array.isArray(assetItem.synergies))
            .flatMap((armorItem) =>
                armorItem.synergies
                    .filter((syn) => syn.weapon === item.name)
                    .map((syn) => {
                        const synLines = [];
                        if (syn.attack) synLines.push(`Attack +${syn.attack}`);
                        if (syn.defense) synLines.push(`Defense +${syn.defense}`);
                        if (syn.critical) synLines.push(`Crit +${journalPercent(syn.critical)}`);
                        if (syn.crit) synLines.push(`Crit +${journalPercent(syn.crit)}`);
                        if (syn.evasion) synLines.push(`Evasion +${journalPercent(syn.evasion)}`);

                        return {
                            title: `${armorItem.name}${syn.name ? ` - ${syn.name}` : ''}`,
                            lines: synLines
                        };
                    })
            );

        if (armorSynergies.length) {
            groups.push({
                title: 'Synergies',
                items: armorSynergies
            });
        }
    } else {
        const effects = [];
        if (item.health) effects.push(`Heals ${journalPercent(item.health)} HP`);
        if (item.def) effects.push(`Defense +${journalPercent(item.def)}${item.rounds ? ` for ${item.rounds} turns` : ''}`);
        if (item.stamina) effects.push(`Stamina +${journalPercent(item.stamina)}`);
        if (item.buff) effects.push(`Attack +${journalPercent(item.buff)}${item.rounds ? ` for ${item.rounds} turns` : ''}`);
        if (item.xp) effects.push(`XP Gain: +${item.xp}`);
        if (item.attack) effects.push(`Attack +${journalPercent(item.attack)}`);
        if (item.damage) effects.push(`Deals ${item.damage} damage`);
        if (item.pstatus) effects.push(`Gains: ${journalStatusText(item.pstatus, assets)}`);
        if (item.estatus) effects.push(`Inflicts: ${journalStatusText(item.estatus, assets)}`);

        if (effects.length) groups.push({ title: 'Effects', lines: effects });
        if (item.uses?.length) groups.push({ title: 'Used In', lines: item.uses });
        if (item.chest !== undefined && assets.chests?.[item.chest]) groups.push({ title: 'Unlocks Chest', lines: [assets.chests[item.chest].name] });

        if (item.tier && Array.isArray(item.drops)) {
            groups.push({
                title: 'Drops',
                lines: item.drops.map((drop) => `${drop.name || 'Nothing'} - ${String((drop.chance || 0) * 100).slice(0, 5)}%`)
            });
        }
    }

    return {
        title: item.name,
        subtitle: item.minlvl !== undefined || item.maxlvl !== undefined
            ? `Levels ${item.minlvl ?? 1}${item.maxlvl && item.maxlvl !== item.minlvl ? ` - ${item.maxlvl}` : ''}`
            : null,
        mediaSrc: item.chest !== undefined ? (item.sprite || null) : null,
        mediaAlt: item.name,
        descriptionLines,
        groups
    };
}

function getJournalAreaDetails(area) {
    if (!area) return null;

    const subtitle = area.name === 'Eternal Damnation'
        ? 'Level 50+'
        : `Level ${area.minlvl} - ${area.maxlvl}`;

    const enemyLines = area.name === 'Eternal Damnation'
        ? ['All of them.']
        : (area.enemies || []).map((enemy) => {
            const name = enemy.name || 'Unknown';
            const chance = enemy.chance !== undefined ? ` (${Math.round(enemy.chance * 100)}%)` : '';
            return `${name}${chance}`;
        });

    return {
        title: area.name,
        subtitle,
        descriptionLines: area.description ? [area.description] : [],
        groups: [
            {
                title: 'Enemies',
                lines: enemyLines
            }
        ]
    };
}

function getJournalEnemyDetails(enemy, previewLevel, assets) {
    if (!enemy) return null;

    const level = clampJournalLevel(previewLevel);
    const block = assets.blocks.find((entry) => entry.name === enemy.block);
    const tier = block ? (block[getJournalBlockTierKey(level)] || block.zero) : null;
    const scaledStats = block
        ? {
            health: Math.floor(enemy.health + ((tier?.health || 0) * level)),
            defense: Math.floor(enemy.defense + ((tier?.defense || 0) * level)),
            attack: Math.floor(enemy.attack + ((tier?.attack || 0) * level))
        }
        : {
            health: Math.floor((enemy.health + (level ** 1.82424)) * (1 + (level / 200))),
            defense: Math.floor((enemy.defense + ((level / 2) ** 1.82424)) * (1 + (level / 200))),
            attack: Math.floor((enemy.attack + ((level / 2) ** 1.82424)) * (1 + (level / 200)))
        };

    const groups = [
        {
            title: 'Stats',
            lines: [
                `Health: ${scaledStats.health}`,
                `Attack: ${scaledStats.attack}`,
                `Defense: ${scaledStats.defense}`,
                `Accuracy: ${journalPercent(enemy.accuracy)}`,
                `Crit Chance: ${journalPercent(enemy.crit)}`,
            ]
        }
    ];

    if (Array.isArray(enemy.skills) && enemy.skills.length) {
        groups.push({
            title: 'Skills',
            items: enemy.skills.map((skill) => ({
                title: `${skill.name} (${Math.round((skill.chance || 0) * 100)}%)`,
                lines: getJournalSkillLines(skill, assets, 'enemy')
            }))
        });
    }

    if (Array.isArray(enemy.drops) && enemy.drops.length) {
        groups.push({
            title: 'Drops',
            lines: enemy.drops.map((drop) => `${drop.name || 'Nothing'} - ${String((drop.chance || 0) * 100).slice(0, 5)}%`)
        });
    }

    return {
        title: enemy.name,
        subtitle: `Level ${level}${enemy.block ? ` - ${enemy.block}` : ''}`,
        groups
    };
}

function getJournalEffectDetails(effect) {
    if (!effect) return null;
    const lines = [];

    if (effect.description) lines.push(effect.description);
    lines.push(`Type: ${effect.positive ? 'Positive' : 'Negative'}`);
    if (effect.rounds !== undefined) lines.push(`Duration: ${effect.rounds} turn${effect.rounds === 1 ? '' : 's'}`);

    const extra = Object.entries(effect)
        .filter(([key]) => !['name', 'id', 'description', 'positive', 'rounds'].includes(key))
        .map(([key, value]) => {
            if (typeof value === 'number' && value > 0 && value < 1) return `${key}: ${journalPercent(value)}`;
            return `${key}: ${value}`;
        });

    if (extra.length) lines.push(...extra);

    return {
        title: `${effect.id} ${effect.name}`,
        groups: [
            {
                title: 'Effect Data',
                lines
            }
        ]
    };
}

window.createJournalState = function createJournalState() {
    return {
        activeTab: 'player',
        itemSubTab: 'all',
        enemySubTab: 'all',
        searchQuery: '',
        selectedKey: null,
        previewLevel: 1,
        backTarget: 'returning',

        init() {
            this.bindStatusEmojiClicks();
            this.ensureSelection();

            if (window.__journalPendingOpen?.itemName) {
                const pending = window.__journalPendingOpen;
                this.backTarget = pending.backTarget || 'returning';
                if (pending.itemLevel !== null && pending.itemLevel !== undefined) {
                    this.previewLevel = clampJournalLevel(pending.itemLevel);
                }
                this.openItemByName(pending.itemName);
                window.__journalPendingOpen = null;
            }
        },

        goBack() {
            const target = this.backTarget || 'returning';
            this.backTarget = 'returning';
            transition('journal', target);
        },

        setTab(tab) {
            this.activeTab = tab;
            if (tab !== 'items') this.itemSubTab = 'all';
            if (tab !== 'enemies') this.enemySubTab = 'all';
            this.searchQuery = '';
            this.selectedKey = null;
            this.ensureSelection();
        },

        selectEntry(entry) {
            this.selectedKey = entry.key;
        },

        getStatusTooltipById(statusId) {
            const status = this.assets.statuses.find((effect) => effect.id === statusId);
            if (!status) return '';

            let tooltip = `${status.id} ${status.name}`;

            if (status.description) tooltip += `\n\n${status.description}`;

            return tooltip;
        },

        getChestTooltipHtmlByName(chestName) {
            const chest = this.assets.chests.find((entry) => entry.name === chestName);
            if (!chest) return null;
            if (!chest.sprite) return `<div>${chest.name}</div>`;
            return `<div style="text-align:center;"><img src="${chest.sprite}" style="max-width: 180px; max-height: 180px; image-rendering: pixelated; display:block; margin: 0 auto;" /><div style="margin-top:6px;">${chest.name}</div></div>`;
        },

        renderLineWithStatusTooltips(line) {
            if (typeof line !== 'string') return '';

            let html = escapeJournalHtml(line);
            const quantityLineMatch = line.match(/^(.*?)\s+x(\d+)$/i);
            const quantityLineName = quantityLineMatch ? (quantityLineMatch[1] || '').trim() : null;
            const statuses = [...this.assets.statuses].sort((a, b) => String(b.id).length - String(a.id).length);

            statuses.forEach((status) => {
                if (!status?.id) return;
                const escapedId = escapeJournalHtml(status.id);
                const tooltip = escapeJournalHtml(this.getStatusTooltipById(status.id));
                const statusName = escapeJournalHtml(status.name || '');
                const wrapped = `<span class="journal-status-emoji" data-status-id="${escapedId}" data-status-name="${statusName}" data-tooltip="${tooltip}">${escapedId}</span>`;
                html = html.split(escapedId).join(wrapped);
            });

            const dropMatch = line.match(/^(.+?)\s-\s[\d.]+%$/);
            if (dropMatch) {
                const dropName = (dropMatch[1] || '').trim();
                if (dropName && dropName.toLowerCase() !== 'nothing') {
                    const dropItem = this.assets.items.find((assetItem) => assetItem.name === dropName) || null;
                    const hasItem = !!dropItem;
                    const hasChest = this.assets.chests.some((chest) => chest.name === dropName);
                    if (hasItem || hasChest) {
                        const escapedDropName = escapeJournalHtml(dropName);
                        const previewLevel = clampJournalLevel(this.previewLevel);
                        const minLevel = dropItem?.minlvl !== undefined ? clampJournalLevel(dropItem.minlvl) : 1;
                        const maxLevel = dropItem?.maxlvl !== undefined ? clampJournalLevel(dropItem.maxlvl) : 50;
                        const tooltipLevel = hasItem
                            ? Math.max(minLevel, Math.min(maxLevel, previewLevel))
                            : previewLevel;
                        const inventoryTooltip = (hasItem && typeof window.getItemTooltipText === 'function')
                            ? window.getItemTooltipText(dropName, tooltipLevel, true)
                            : null;
                        const chestTooltipHtml = (!hasItem && hasChest)
                            ? this.getChestTooltipHtmlByName(dropName)
                            : null;
                        const fallbackTooltip = hasChest
                            ? `${dropName}\nChest`
                            : `Open ${dropName} in Journal`;
                        const finalTooltip = escapeJournalHtml(inventoryTooltip || chestTooltipHtml || fallbackTooltip);
                        const tooltipAttr = (inventoryTooltip || chestTooltipHtml)
                            ? `data-tooltip-html="${finalTooltip}"`
                            : `data-tooltip="${finalTooltip}"`;
                        const dropLink = `<span class="journal-drop-link" data-drop-name="${escapedDropName}" ${tooltipAttr}>${escapedDropName}</span>`;
                        html = replaceFirstOccurrence(html, escapedDropName, dropLink);
                    }
                }
            }

            const exactChest = this.assets.chests.find((chest) => chest.name === line.trim());
            if (exactChest) {
                const escapedChestName = escapeJournalHtml(exactChest.name);
                const chestTooltip = escapeJournalHtml(this.getChestTooltipHtmlByName(exactChest.name) || exactChest.name);
                const chestLink = `<span class="journal-chest-link" data-chest-name="${escapedChestName}" data-tooltip-html="${chestTooltip}">${escapedChestName}</span>`;
                html = replaceFirstOccurrence(html, escapedChestName, chestLink);
            }

            const itemNameToLink = quantityLineName || line.trim();
            const exactItem = !exactChest
                ? this.assets.items.find((assetItem) => assetItem.name === itemNameToLink)
                : null;
            if (exactItem) {
                const escapedItemName = escapeJournalHtml(exactItem.name);
                const escapedItemLabel = escapeJournalHtml(quantityLineMatch ? `${exactItem.name} x${quantityLineMatch[2]}` : exactItem.name);
                const previewLevel = clampJournalLevel(this.previewLevel);
                const minLevel = exactItem.minlvl !== undefined ? clampJournalLevel(exactItem.minlvl) : 1;
                const maxLevel = exactItem.maxlvl !== undefined ? clampJournalLevel(exactItem.maxlvl) : 50;
                const tooltipLevel = Math.max(minLevel, Math.min(maxLevel, previewLevel));
                const itemTooltipHtml = (typeof window.getItemTooltipText === 'function')
                    ? window.getItemTooltipText(exactItem.name, tooltipLevel, true)
                    : `Open ${exactItem.name} in Journal`;
                const escapedTooltip = escapeJournalHtml(itemTooltipHtml);
                const tooltipAttr = typeof window.getItemTooltipText === 'function'
                    ? `data-tooltip-html="${escapedTooltip}"`
                    : `data-tooltip="${escapedTooltip}"`;
                const itemLink = `<span class="journal-drop-link" data-drop-name="${escapedItemName}" data-item-level="${tooltipLevel}" ${tooltipAttr}>${escapedItemLabel}</span>`;
                html = replaceFirstOccurrence(html, escapedItemLabel, itemLink);
            }

            const equippedItemMatch = line.match(/\((.*?)\s+Lv\.(\d+)\)/i);
            if (equippedItemMatch) {
                const equippedItemName = (equippedItemMatch[1] || '').trim();
                const equippedLevel = clampJournalLevel(Number(equippedItemMatch[2] || 1));
                const equippedItem = this.assets.items.find((assetItem) => assetItem.name === equippedItemName);
                if (equippedItem) {
                    const escapedEquippedName = escapeJournalHtml(equippedItem.name);
                    const minLevel = equippedItem.minlvl !== undefined ? clampJournalLevel(equippedItem.minlvl) : 1;
                    const maxLevel = equippedItem.maxlvl !== undefined ? clampJournalLevel(equippedItem.maxlvl) : 50;
                    const tooltipLevel = Math.max(minLevel, Math.min(maxLevel, equippedLevel));
                    const itemTooltipHtml = (typeof window.getItemTooltipText === 'function')
                        ? window.getItemTooltipText(equippedItem.name, tooltipLevel, true)
                        : `Open ${equippedItem.name} in Journal`;
                    const escapedTooltip = escapeJournalHtml(itemTooltipHtml);
                    const tooltipAttr = typeof window.getItemTooltipText === 'function'
                        ? `data-tooltip-html="${escapedTooltip}"`
                        : `data-tooltip="${escapedTooltip}"`;
                    const itemLink = `<span class="journal-drop-link" data-drop-name="${escapedEquippedName}" data-item-level="${tooltipLevel}" ${tooltipAttr}>${escapedEquippedName}</span>`;
                    html = replaceFirstOccurrence(html, escapedEquippedName, itemLink);
                }
            }

            const areaEnemyMatch = line.match(/^(.+?)(\s\([\d.]+%\))?$/);
            if (areaEnemyMatch) {
                const enemyName = (areaEnemyMatch[1] || '').trim();
                if (enemyName && enemyName.toLowerCase() !== 'all') {
                    const enemyData = this.assets.enemies.find((enemy) => enemy.name === enemyName);
                    if (enemyData) {
                        const activeArea = this.selectedEntry?.kind === 'area' ? this.selectedEntry.raw : null;
                        const fallbackLevel = clampJournalLevel(this.previewLevel);
                        let areaMinLevel = activeArea?.minlvl ?? fallbackLevel;
                        let areaMaxLevel = activeArea?.maxlvl ?? fallbackLevel;
                        areaMinLevel = clampJournalLevel(areaMinLevel);
                        areaMaxLevel = clampJournalLevel(areaMaxLevel);
                        if (areaMaxLevel < areaMinLevel) {
                            const swap = areaMinLevel;
                            areaMinLevel = areaMaxLevel;
                            areaMaxLevel = swap;
                        }

                        const block = this.assets.blocks.find((entry) => entry.name === enemyData.block);
                        const scaleEnemyStats = (level) => {
                            const tier = block ? (block[getJournalBlockTierKey(level)] || block.zero) : null;
                            return block
                                ? {
                                    health: Math.floor(enemyData.health + ((tier?.health || 0) * level)),
                                    defense: Math.floor(enemyData.defense + ((tier?.defense || 0) * level)),
                                    attack: Math.floor(enemyData.attack + ((tier?.attack || 0) * level))
                                }
                                : {
                                    health: Math.floor((enemyData.health + (level ** 1.82424)) * (1 + (level / 200))),
                                    defense: Math.floor((enemyData.defense + ((level / 2) ** 1.82424)) * (1 + (level / 200))),
                                    attack: Math.floor((enemyData.attack + ((level / 2) ** 1.82424)) * (1 + (level / 200)))
                                };
                        };
                        const lowStats = scaleEnemyStats(areaMinLevel);
                        const highStats = scaleEnemyStats(areaMaxLevel);
                        const statRange = (lowValue, highValue) => lowValue === highValue ? `${lowValue}` : `${lowValue} - ${highValue}`;
                        const enemyTooltipText =
                            `Level ${areaMinLevel === areaMaxLevel ? `${areaMinLevel}` : `${areaMinLevel} - ${areaMaxLevel}`}\n` +
                            `${enemyData.block || 'Unknown Block'}\n` +
                            `💖 ${statRange(lowStats.health, highStats.health)}\n` +
                            `⚔️ ${statRange(lowStats.attack, highStats.attack)}\n` +
                            `🛡️ ${statRange(lowStats.defense, highStats.defense)}\n` +
                            `🎯 ${Math.floor(enemyData.accuracy * 100)}%\n` +
                            `🍀 ${Math.floor(enemyData.crit * 100)}%`;
                        const escapedEnemyName = escapeJournalHtml(enemyName);
                        const enemyTooltip = escapeJournalHtml(enemyTooltipText);
                        const enemyLink = `<span class="journal-area-enemy-link" data-enemy-name="${escapedEnemyName}" data-tooltip="${enemyTooltip}">${escapedEnemyName}</span>`;
                        html = replaceFirstOccurrence(html, escapedEnemyName, enemyLink);
                    }
                }
            }

            return html;
        },

        openItemByName(itemName, itemLevel = null) {
            if (!itemName) return;

            const foundItem = this.assets.items.find((assetItem) => assetItem.name === itemName);
            const chestIndex = this.assets.chests.findIndex((chest) => chest.name === itemName);
            if (!foundItem && chestIndex === -1) return;

            if (itemLevel !== null && itemLevel !== undefined && foundItem) {
                this.previewLevel = clampJournalLevel(itemLevel);
            }

            this.activeTab = 'items';
            this.itemSubTab = 'all';
            this.searchQuery = '';
            this.selectedKey = foundItem ? `item:${foundItem.name}` : `chest:${chestIndex}`;
            this.ensureSelection();
        },

        hideGlobalTooltip() {
            const tooltip = document.getElementById('global-tooltip');
            if (!tooltip) return;
            delete tooltip.dataset.lockUntil;
            delete tooltip.dataset.lockSource;
            tooltip.style.opacity = 0;
            tooltip.textContent = '';
            tooltip.innerHTML = '';
        },

        bindStatusEmojiClicks() {
            if (this._statusEmojiClicksBound) return;
            this._statusEmojiClicksBound = true;

            const panel = document.getElementById('journal-panel');
            if (!panel) return;

            panel.addEventListener('click', (event) => {
                const emoji = event.target.closest('.journal-status-emoji');
                if (emoji) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.hideGlobalTooltip();
                    const statusId = emoji.getAttribute('data-status-id');
                    const status = statusId ? this.assets.statuses.find((effect) => effect.id === statusId) : null;
                    if (status) {
                        this.activeTab = 'effects';
                        this.searchQuery = '';
                        this.selectedKey = `effect:${status.name}`;
                        this.ensureSelection();
                    }
                    return;
                }

                const drop = event.target.closest('.journal-drop-link');
                if (drop) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.hideGlobalTooltip();
                    const itemLevelAttr = drop.getAttribute('data-item-level');
                    const itemLevel = itemLevelAttr ? Number(itemLevelAttr) : null;
                    this.openItemByName(drop.getAttribute('data-drop-name'), Number.isFinite(itemLevel) ? itemLevel : null);
                    return;
                }

                const chest = event.target.closest('.journal-chest-link');
                if (chest) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.hideGlobalTooltip();
                    const chestName = chest.getAttribute('data-chest-name');
                    const chestIndex = this.assets.chests.findIndex((entry) => entry.name === chestName);
                    if (chestIndex !== -1) {
                        this.activeTab = 'items';
                        this.itemSubTab = 'chests';
                        this.searchQuery = '';
                        this.selectedKey = `chest:${chestIndex}`;
                        this.ensureSelection();
                    }
                    return;
                }

                const enemy = event.target.closest('.journal-area-enemy-link');
                if (!enemy) return;
                event.preventDefault();
                event.stopPropagation();
                this.hideGlobalTooltip();
                const enemyName = enemy.getAttribute('data-enemy-name');
                const enemyEntry = enemyName ? this.assets.enemies.find((candidate) => candidate.name === enemyName) : null;
                if (!enemyEntry) return;
                this.activeTab = 'enemies';
                this.searchQuery = '';
                this.selectedKey = `enemy:${enemyEntry.name}`;
                this.ensureSelection();
            });
        },

        ensureSelection() {
            const list = this.filteredEntries;
            if (!list.length) {
                this.selectedKey = null;
                return;
            }

            if (!this.selectedKey || !list.some((entry) => entry.key === this.selectedKey)) {
                this.selectedKey = list[0].key;
            }
        },

        get assets() {
            return getAssets();
        },

        get player() {
            const playerElement = document.getElementById('player');
            return playerElement ? Alpine.$data(playerElement) : null;
        },

        get enemySubTabs() {
            const blocks = [...new Set(this.assets.enemies.map((enemy) => enemy.block).filter(Boolean))];
            return [{ value: 'all', label: 'All' }, ...blocks.map((block) => ({ value: block, label: block }))];
        },

        get entries() {
            const assets = this.assets;
            if (this.activeTab === 'player') {
                const playerName = this.player?.name || 'Player';
                return [{ key: 'player:self', name: playerName, meta: `Level ${this.player?.level || 1}`, kind: 'player', raw: this.player }];
            }

            if (this.activeTab === 'items') {
                const getItemCategory = (item) => {
                    if (!item) return 'misc';
                    const isWeapon = item.attack !== undefined && Array.isArray(item.skills);
                    const isArmor = item.defense !== undefined && !item.skills && item.alvlmult !== undefined;
                    if (isWeapon) return 'weapon';
                    if (isArmor) return 'armor';
                    if (item.name?.toLowerCase().includes('potion')) return 'consumables';
                    if (item.name?.toLowerCase().endsWith('bomb') || item.name?.toLowerCase().endsWith('flask') || item.damage || item.estatus || (item.buff && item.rounds)) return 'throwables';
                    if (item.chest !== undefined) return 'keys';
                    return 'misc';
                };

                let itemEntries = assets.items.map((item) => ({
                    key: `item:${item.name}`,
                    name: item.name,
                    meta: item.skills ? 'Weapon' : (item.defense !== undefined ? 'Armor' : 'Item'),
                    kind: 'item',
                    category: getItemCategory(item),
                    raw: item
                }));

                let chestEntries = assets.chests.map((chest, index) => ({
                    key: `chest:${index}`,
                    name: chest.name,
                    meta: 'Chest',
                    kind: 'chest',
                    category: 'chests',
                    raw: chest
                }));

                if (this.itemSubTab !== 'all') {
                    itemEntries = itemEntries.filter((entry) => entry.category === this.itemSubTab);
                    chestEntries = this.itemSubTab === 'chests' ? chestEntries : [];
                }

                return [...itemEntries, ...chestEntries];
            }

            if (this.activeTab === 'enemies') {
                let enemyEntries = assets.enemies.map((enemy) => ({
                    key: `enemy:${enemy.name}`,
                    name: enemy.name,
                    meta: enemy.block,
                    kind: 'enemy',
                    raw: enemy
                }));

                if (this.enemySubTab !== 'all') {
                    enemyEntries = enemyEntries.filter((entry) => entry.raw?.block === this.enemySubTab);
                }

                return enemyEntries;
            }

            if (this.activeTab === 'areas') {
                return assets.areas.map((area) => ({
                    key: `area:${area.name}`,
                    name: area.name,
                    meta: `Lv ${area.minlvl}-${area.maxlvl}`,
                    kind: 'area',
                    raw: area
                }));
            }

            return assets.statuses.map((status) => ({
                key: `effect:${status.name}`,
                name: `${status.id} ${status.name}`,
                meta: status.positive ? 'Positive' : 'Negative',
                kind: 'effect',
                raw: status
            }));
        },

        get filteredEntries() {
            const query = this.searchQuery.toLowerCase().trim();
            if (!query) return this.entries;

            return this.entries.filter((entry) => {
                const details = `${entry.name} ${entry.meta || ''} ${entry.raw?.description || ''}`.toLowerCase();
                return details.includes(query);
            });
        },

        get selectedEntry() {
            return this.filteredEntries.find((entry) => entry.key === this.selectedKey) || null;
        },

        get activeDetails() {
            if (!this.selectedEntry) return null;

            if (this.selectedEntry.kind === 'player') {
                return getJournalPlayerDetails(this.player, this.assets);
            }

            if (this.selectedEntry.kind === 'item' || this.selectedEntry.kind === 'chest') {
                return getJournalItemDetails(this.selectedEntry, this.previewLevel, this.player?.level || 1, this.assets);
            }

            if (this.selectedEntry.kind === 'enemy') {
                return getJournalEnemyDetails(this.selectedEntry.raw, this.previewLevel, this.assets);
            }

            if (this.selectedEntry.kind === 'area') {
                return getJournalAreaDetails(this.selectedEntry.raw);
            }

            return getJournalEffectDetails(this.selectedEntry.raw);
        }
    };
};

window.openJournalItemFromInventory = function openJournalItemFromInventory(itemName, itemLevel = null) {
    if (!itemName) return;

    const journalElement = document.getElementById('journal');
    const journalState = journalElement ? Alpine.$data(journalElement) : null;
    if (journalState && typeof journalState.openItemByName === 'function') {
        journalState.backTarget = 'inventory';
        if (itemLevel !== null && itemLevel !== undefined) {
            journalState.previewLevel = clampJournalLevel(itemLevel);
        }
        journalState.openItemByName(itemName);
    } else {
        window.__journalPendingOpen = {
            itemName,
            itemLevel,
            backTarget: 'inventory'
        };
    }

    transition('inventory', 'journal');
};
