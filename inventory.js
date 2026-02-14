let draggedItem = null;
let draggedItemIndex = null;
let draggedEquipment = null;

function initInventoryDragDrop() {
    setTimeout(() => {
        setupInventoryListeners();
        setupEquipmentListeners();
        enhanceInventoryTooltips();
        createEquipmentDisplay();
    }, 500);
}

function getOrCreateDropHint(target) {
    if (!target) return null;

    let hint = target.querySelector('.drop-hint-label');
    if (!hint) {
        hint = document.createElement('div');
        hint.className = 'drop-hint-label';
        target.appendChild(hint);
    }

    const computedStyle = window.getComputedStyle(target);
    if (computedStyle.position === 'static') {
        target.style.position = 'relative';
    }

    return hint;
}

function setDropHintText(target, text) {
    const hint = getOrCreateDropHint(target);
    if (!hint) return;

    hint.textContent = text;
    hint.classList.add('drop-hint-label--visible');
}

function clearDropHintText(target) {
    if (!target) return;
    const hint = target.querySelector('.drop-hint-label');
    if (!hint) return;

    hint.classList.remove('drop-hint-label--visible');
}

window.setDropHintText = setDropHintText;
window.clearDropHintText = clearDropHintText;

function setupInventoryListeners() {
    const inventoryPanel = document.getElementById('inventory-panel');
    if (!inventoryPanel) return;

    inventoryPanel.addEventListener('dragstart', handleDragStart);
    inventoryPanel.addEventListener('dragend', handleDragEnd);
    setupDropZone();
}

function setupEquipmentListeners() {
    const battleWeaponry = document.getElementById('battle-weaponry');
    if (!battleWeaponry) return;

    battleWeaponry.addEventListener('dragstart', handleEquipmentDragStart);
    battleWeaponry.addEventListener('dragend', handleDragEnd);

    const inventoryPanel = document.getElementById('inventory-panel');
    if (inventoryPanel) {
        inventoryPanel.addEventListener('dragover', handleInventoryDragOver);
        inventoryPanel.addEventListener('drop', handleInventoryDrop);
        inventoryPanel.addEventListener('dragleave', handleInventoryDragLeave);
    }
}

function createEquipmentDisplay() {
    const player = document.getElementById('player');
    if (!player) return;

    if (document.getElementById('equipment-display')) return;

    const equipmentDisplay = document.createElement('div');
    equipmentDisplay.id = 'equipment-display';
    equipmentDisplay.className = 'equipment-display';
    equipmentDisplay.style.display = 'none';

    document.body.appendChild(equipmentDisplay);
}

function formatEquipmentDiff(diff, suffix = '', isFloat = false) {
    if (diff === 0) return '<span style="color: gray;"> (=)</span>';

    const color = diff > 0 ? 'lime' : 'red';
    const sign = diff > 0 ? '+' : '';
    const value = isFloat ? diff.toFixed(2) : diff;

    return `<span style="color: ${color};"> ${sign}${value}${suffix}</span>`;
}

function getHoveredItemLevel(player, itemName) {
    const inventoryItem = player.inventory.find(item => item.name === itemName);
    return inventoryItem ? inventoryItem.level : 1;
}

function getSynergyBonusesHtml(synergy) {
    const bonuses = [];
    if (synergy.defense) bonuses.push(`🛡️ +${synergy.defense} `);
    if (synergy.evasion) bonuses.push(`💨 +${Math.floor(synergy.evasion * 100)}%`);
    if (synergy.crit) bonuses.push(`🍀 +${Math.floor(synergy.crit * 100)}%`);
    if (synergy.attack) bonuses.push(`⚔️ +${synergy.attack}`);
    return bonuses.join('<br>');
}

function getSynergyHtml(title, synergy) {
    return `
        <div style="margin-top: 8px; border: 2px solid gold; padding: 6px; border-radius: 4px; background-color: rgba(255, 215, 0, 0.2);">
            <div style="font-weight: bold; color: gold; font-size: 13px; text-align: center;">${title}</div>
            <div style="font-size: 12px; color: #fff; margin-top: 3px;">${getSynergyBonusesHtml(synergy)}</div>
        </div>
    `;
}

function updateEquipmentDisplay(type = null, itemData = null) {
    const equipmentDisplay = document.getElementById('equipment-display');
    if (!equipmentDisplay) return;

    const player = Alpine.$data(document.getElementById('player'));
    if (!player || !type || !itemData) {
        equipmentDisplay.style.display = 'none';
        return;
    }

    equipmentDisplay.style.display = 'block';

    if (type === 'weapon') {
        const weapon = player.weaponry.weapon;
        const weaponLevel = player.weaponry.level;
        const synergy = player.armory.armor.synergies
            ? player.armory.armor.synergies.find(syn => syn.weapon === itemData.name)
            : null;

        // Calculate current stats
        const currentAttack = Math.floor(weapon.attack + ((weaponLevel - 1) * weapon.attackPerLevel));
        const currentCrit = Math.floor(weapon.crit * 100);
        const currentCritdmg = weapon.critdmg;
        const currentAccuracy = Math.floor(weapon.accuracy * 100);

        const hoveredLevel = getHoveredItemLevel(player, itemData.name);

        // Calculate hovered stats
        const hoveredAttack = Math.floor(itemData.attack + ((hoveredLevel - 1) * itemData.attackPerLevel));
        const hoveredCrit = Math.floor(itemData.crit * 100);
        const hoveredCritdmg = itemData.critdmg;
        const hoveredAccuracy = Math.floor(itemData.accuracy * 100);

        // Calculate differences
        const attackDiff = hoveredAttack - currentAttack;
        const critDiff = hoveredCrit - currentCrit;
        const critdmgDiff = hoveredCritdmg - currentCritdmg;
        const accuracyDiff = hoveredAccuracy - currentAccuracy;

        let html = `
            <div style="text-align: center; font-family: 'Pixelify Sans', sans-serif; font-size: 16px; margin-bottom: 8px;">
                <strong>⚔️ ${itemData.name} - Level ${hoveredLevel}</strong>
            </div>
            <div>
                <div style="font-size: 13px; color: #cfcfcf;">⚔️ ${hoveredAttack}${formatEquipmentDiff(attackDiff)}</div>
                <div style="font-size: 13px; color: #cfcfcf;">🍀 ${hoveredCrit}%${formatEquipmentDiff(critDiff, '%')}</div>
                <div style="font-size: 13px; color: #cfcfcf;">⚔️ ${hoveredCritdmg}x${formatEquipmentDiff(critdmgDiff, 'x', true)}</div>
                <div style="font-size: 13px; color: #cfcfcf;">🎯 ${hoveredAccuracy}%${formatEquipmentDiff(accuracyDiff, '%')}</div>
            </div>
        `;

        if (synergy) {
            html += getSynergyHtml(synergy.name, synergy);
        }

        equipmentDisplay.innerHTML = html;
    } else if (type === 'armor') {
        const armor = player.armory.armor;
        const armorLevel = player.armory.level;
        const synergy = itemData.synergies
            ? itemData.synergies.find(syn => syn.weapon === player.weaponry.weapon.name)
            : null;

        const currentDefense = Math.floor(armor.defense + ((armorLevel - 1) * armor.alvlmult));
        const currentEvasion = Math.floor(armor.evasion * 100);

        const hoveredLevel = getHoveredItemLevel(player, itemData.name);

        const hoveredDefense = Math.floor(itemData.defense + ((hoveredLevel - 1) * itemData.alvlmult));
        const hoveredEvasion = Math.floor(itemData.evasion * 100);

        const defenseDiff = hoveredDefense - currentDefense;
        const evasionDiff = hoveredEvasion - currentEvasion;

        let html = `
            <div style="text-align: center; font-family: 'Pixelify Sans', sans-serif; font-size: 16px; margin-bottom: 8px;">
                <strong>🛡️ ${itemData.name} - Level ${hoveredLevel}</strong>
            </div>
            <div>
                <div style="font-size: 13px; color: #cfcfcf;">🛡️ ${hoveredDefense}${formatEquipmentDiff(defenseDiff)}</div>
                <div style="font-size: 13px; color: #cfcfcf;">💨 ${hoveredEvasion}%${formatEquipmentDiff(evasionDiff, '%')}</div>
            </div>
        `;

        if (synergy) {
            html += getSynergyHtml(`${synergy.name} - ${itemData.name}`, synergy);
        }

        equipmentDisplay.innerHTML = html;
    } else if (type === 'consumable') {
        let html = `
            <div style="text-align: center; font-family: 'Pixelify Sans', sans-serif; font-size: 16px; margin-bottom: 8px;">
                <strong>🧪 ${itemData.name}</strong>
            </div>
            <div style="font-size: 13px; color: #cfcfcf;">
        `;

        const effects = [];

        if (itemData.health) {
            const currentHealth = Math.round(player.health);
            const gainAmount = Math.round(player.maxHealth * itemData.health);
            const newHealth = Math.min(currentHealth + gainAmount, player.maxHealth);
            const actualGain = newHealth - currentHealth;
            effects.push(`💖 ${currentHealth} → <span style="color: lime;">${newHealth}</span> <span style="color: #888;">(+${actualGain})</span>`);
        }

        if (itemData.stamina) {
            const currentStamina = Math.round(player.stamina);
            const gainAmount = Math.round(player.maxStamina * itemData.stamina);
            const newStamina = Math.min(currentStamina + gainAmount, player.maxStamina);
            const actualGain = newStamina - currentStamina;
            effects.push(`⚡ ${currentStamina} → <span style="color: lime;">${newStamina}</span> <span style="color: #888;">(+${actualGain})</span>`);
        }

        if (itemData.def) {
            const currentDefense = Math.round(player.defense);
            const defenseBoost = Math.round(player.defense * itemData.def);
            const newDefense = currentDefense + defenseBoost;
            effects.push(`🛡️ ${currentDefense} → <span style="color: lime;">${newDefense}</span> <span style="color: #888;">(+${defenseBoost})</span>${itemData.rounds ? ` for ${itemData.rounds} turns` : ''}`);
        }

        if (itemData.buff) {
            const buffAmount = Math.round(player.attack * itemData.buff);
            const currentAttack = Math.round(player.attack);
            const newAttack = currentAttack + buffAmount;
            effects.push(`⚔️ ${currentAttack} → <span style="color: lime;">${newAttack}</span> <span style="color: #888;">(+${buffAmount})</span>${itemData.rounds ? ` for ${itemData.rounds} turns` : ''}`);
        }

        if (itemData.xp) {
            const currentXP = player.experience;
            const newXP = currentXP + itemData.xp;
            effects.push(`🌟 ${currentXP} → <span style="color: lime;">${newXP}</span> XP`);
        }

        if (itemData.pstatus) {
            effects.push(`✨ Gain: ${itemData.pstatus.join(', ')}`);
        }

        html += effects.join('<br>') + '</div>';
        equipmentDisplay.innerHTML = html;
    }
}

function enhanceInventoryTooltips() {
    const grids = Array.from(document.querySelectorAll('.inventory-grid, .crafting-inventory-grid, .crafting-grid'));
    if (!grids.length) return;

    const updateGridTooltips = (grid) => {
        const items = grid.querySelectorAll('.inventory-item, .crafting-item');
        items.forEach(item => {
            const isCraftable = item.classList.contains('crafting-item');

            if (!item.dataset.tooltipsEnhanced) {
                if (!isCraftable) {
                    updateItemTooltip(item);
                }
                item.addEventListener('mouseenter', handleItemHover);
                item.addEventListener('mouseleave', handleItemLeave);
                item.dataset.tooltipsEnhanced = 'true';
            } else if (!isCraftable) {
                updateItemTooltip(item);
            }
        });
    };

    grids.forEach(grid => {
        updateGridTooltips(grid);

        if (grid.dataset.tooltipObserverBound === 'true') return;

        const observer = new MutationObserver(() => {
            clearTimeout(observer.debounceTimer);
            observer.debounceTimer = setTimeout(() => updateGridTooltips(grid), 100);
        });

        observer.observe(grid, { childList: true, subtree: false });
        grid.dataset.tooltipObserverBound = 'true';
    });
}

function handleItemHover(e) {
    const itemElement = e.currentTarget;
    const player = Alpine.$data(document.getElementById('player'));
    const assets = getAssets();

    const itemName = itemElement.dataset.craftName || itemElement.querySelector('.inventory-item-name')?.textContent?.trim() || '';
    if (!itemName) return;

    const itemData = assets.items.find(i => i.name === itemName);
    if (!itemData) return;

    const isWeapon = itemData.attack !== undefined && itemData.skills;
    const isArmor = itemData.defense !== undefined && !itemData.skills && itemData.alvlmult !== undefined;
    const isConsumable = itemData.name.toLowerCase().includes('potion');

    if (isWeapon) {
        updateEquipmentDisplay('weapon', itemData);

        const currentArmor = player.armory.armor;
        if (currentArmor.synergies && currentArmor.synergies.some(syn => syn.weapon === itemData.name)) {
            highlightBattleWeaponry('armor', true);
        }
    } else if (isArmor) {
        updateEquipmentDisplay('armor', itemData);
        if (itemData.synergies && itemData.synergies.some(syn => syn.weapon === player.weaponry.weapon.name)) {
            highlightBattleWeaponry('weapon', true);
        }
    } else if (isConsumable) {
        updateEquipmentDisplay('consumable', itemData);
    }
}

function handleItemLeave(e) {
    updateEquipmentDisplay(null, null);
    highlightBattleWeaponry('weapon', false);
    highlightBattleWeaponry('armor', false);
}

function highlightBattleWeaponry(type, highlight) {
    const battleWeaponry = document.getElementById('battle-weaponry');
    if (!battleWeaponry) return;

    const spans = battleWeaponry.querySelectorAll('span[draggable="true"]');
    const targetSpan = type === 'weapon' ? spans[0] : spans[1];

    if (!targetSpan) return;

    if (highlight) {
        targetSpan.style.textShadow = '0 0 10px gold, 0 0 20px gold, 0 0 30px gold';
        targetSpan.style.color = 'gold';
        targetSpan.style.transition = 'all 0.3s ease';
    } else {
        targetSpan.style.textShadow = '';
        targetSpan.style.color = '';
    }
}

function refreshSynergies() {
    const inventoryGrid = document.querySelector('.inventory-grid');
    if (!inventoryGrid) return;

    const items = inventoryGrid.querySelectorAll('.inventory-item');
    items.forEach(item => {
        updateItemTooltip(item);
    });
}

function updateItemTooltip(itemElement) {
    const player = Alpine.$data(document.getElementById('player'));
    const assets = getAssets();

    const itemName = itemElement.querySelector('.inventory-item-name')?.textContent || '';
    const inventoryItem = player.inventory.find(item => item.name === itemName);
    if (!inventoryItem) {
        itemElement.style.border = '2px solid #444';
        itemElement.style.backgroundColor = '';
        itemElement.style.boxShadow = '';
        itemElement.removeAttribute('data-tooltip');
        return;
    }

    const itemData = assets.items.find(i => i.name === inventoryItem.name);
    if (!itemData) {
        itemElement.style.border = '2px solid #444';
        itemElement.style.backgroundColor = '';
        itemElement.style.boxShadow = '';
        itemElement.removeAttribute('data-tooltip');
        return;
    }

    const keys = Object.keys(itemData);
    let tooltipText = '';

    if (keys.length < 2 || keys.every(key => key === 'name' || key === 'craft')) tooltipText = 'Crafting Reagent';
    else tooltipText = itemData.description;
    
    let hasSynergy = false;

    if (itemData.attack !== undefined && itemData.skills) {
        const currentArmor = player.armory.armor;
        if (currentArmor && currentArmor.synergies && currentArmor.synergies.some(syn => syn.weapon === itemData.name)) {
            hasSynergy = true;
        }
    }

    if (itemData.defense !== undefined && !itemData.skills && itemData.synergies) {
        const currentWeapon = player.weaponry.weapon;

        const synergy = itemData.synergies.find(syn => syn.weapon === currentWeapon.name);
        if (synergy) {
            hasSynergy = true;
        }
    }

    if (tooltipText) {
        itemElement.setAttribute('data-tooltip', tooltipText);
    } else {
        itemElement.removeAttribute('data-tooltip');
    }

    if (hasSynergy) {
        itemElement.style.border = '2px solid gold';
        itemElement.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        itemElement.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
    } else {
        itemElement.style.border = '2px solid #444';
        itemElement.style.backgroundColor = '';
        itemElement.style.boxShadow = '';
    }
}

function handleDragStart(e) {
    const inventoryItem = e.target.closest('.inventory-item');
    if (!inventoryItem) return;

    const player = Alpine.$data(document.getElementById('player'));
    const itemName = inventoryItem.querySelector('.inventory-item-name')?.textContent || '';

    const actualIndex = player.inventory.findIndex(item => item.name === itemName);

    if (actualIndex === -1 || !player.inventory[actualIndex]) return;

    draggedItem = player.inventory[actualIndex];
    draggedItemIndex = actualIndex;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', inventoryItem.innerHTML);
    inventoryItem.style.opacity = '0.4';

    const tooltip = document.getElementById('global-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.pointerEvents = 'none';
    }
}

function handleEquipmentDragStart(e) {
    const target = e.target;
    if (!target || !target.hasAttribute('data-tooltip')) return;

    const player = Alpine.$data(document.getElementById('player'));
    const text = target.textContent.trim();

    if (text.includes(player.weaponry.weapon.name)) {
        if (player.weaponry.weapon.name === "Hands") return; // Can't unequip Hands
        draggedEquipment = 'weapon';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', target.innerHTML);
        target.style.opacity = '0.4';
    } else if (text.includes(player.armory.armor.name)) {
        if (player.armory.armor.name === "None") return; // Can't unequip None
        draggedEquipment = 'armor';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', target.innerHTML);
        target.style.opacity = '0.4';
    }

    const tooltip = document.getElementById('global-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.pointerEvents = 'none';
    }
}

function handleDragEnd(e) {
    const inventoryItem = e.target.closest('.inventory-item');
    if (inventoryItem) inventoryItem.style.opacity = '1';

    if (e.target && e.target.hasAttribute('data-tooltip')) {
        e.target.style.opacity = '1';
    }

    const tooltip = document.getElementById('global-tooltip');
    if (tooltip) {
        tooltip.style.pointerEvents = '';
    }

    const playerBar = document.getElementById('player');
    if (playerBar) {
        playerBar.style.backgroundColor = '';
    }

    const inventoryPanel = document.getElementById('inventory-panel');
    if (inventoryPanel) {
        inventoryPanel.style.backgroundColor = '';
    }

    draggedItem = null;
    draggedItemIndex = null;
    draggedEquipment = null;
}

function setupDropZone() {
    const playerBar = document.getElementById('player');
    if (!playerBar) return;

    playerBar.addEventListener('dragover', handleDragOver);
    playerBar.addEventListener('drop', handleDrop);
    playerBar.addEventListener('dragleave', handleDragLeave);
}

function getPlayerDropHintText(itemData) {
    if (!itemData) return 'Cannot be consumed or equipped';

    const isWeapon = itemData.attack !== undefined && itemData.skills;
    const isArmor = itemData.defense !== undefined && !itemData.skills && itemData.alvlmult !== undefined;
    const isConsumable = itemData.name.toLowerCase().includes('potion');

    if (isWeapon || isArmor) return 'Drop here to equip';
    if (isConsumable) return 'Drop here to use';
    return 'Cannot be consumed or equipped';
}

function handleDragOver(e) {
    if (!draggedItem) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const playerBar = document.getElementById('player');
    const itemData = getAssets().items.find(i => i.name === draggedItem.name);
    playerBar.style.backgroundColor = 'rgba(0, 255, 100, 0.2)';
    playerBar.style.transition = 'all 0.2s ease';
    playerBar.classList.add('drop-hint-target--active');
    setDropHintText(playerBar, getPlayerDropHintText(itemData));
}

function handleDragEnd(e) {
    const inventoryItem = e.target.closest('.inventory-item');
    if (inventoryItem) inventoryItem.style.opacity = '1';

    if (e.target && e.target.hasAttribute('data-tooltip')) {
        e.target.style.opacity = '1';
    }

    const tooltip = document.getElementById('global-tooltip');
    if (tooltip) {
        tooltip.style.pointerEvents = '';
    }

    const playerBar = document.getElementById('player');
    if (playerBar) {
        playerBar.style.backgroundColor = '';
        playerBar.classList.remove('drop-hint-target--active');
        clearDropHintText(playerBar);
    }

    draggedItem = null;
    draggedItemIndex = null;
    draggedEquipment = null;
}

function handleDragLeave(e) {
    const playerBar = document.getElementById('player');
    if (e.target === playerBar) {
        playerBar.style.backgroundColor = '';
        playerBar.classList.remove('drop-hint-target--active');
        clearDropHintText(playerBar);
    }
}

function handleInventoryDragOver(e) {
    if (!draggedEquipment) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const inventoryPanel = document.getElementById('inventory-panel');
    inventoryPanel.style.backgroundColor = 'rgba(255, 100, 100, 0.2)';
    inventoryPanel.style.transition = 'all 0.2s ease';
}

function handleInventoryDragLeave(e) {
    const inventoryPanel = document.getElementById('inventory-panel');
    if (e.currentTarget === inventoryPanel && !inventoryPanel.contains(e.relatedTarget)) {
        inventoryPanel.style.backgroundColor = '';
    }
}

function handleInventoryDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const inventoryPanel = document.getElementById('inventory-panel');
    inventoryPanel.style.backgroundColor = '';

    if (!draggedEquipment) return;

    const player = Alpine.$data(document.getElementById('player'));
    const assets = getAssets();

    if (draggedEquipment === 'weapon') {
        addToInventory(player.weaponry.weapon, player.weaponry.level);
        player.weaponry = {
            weapon: assets.items.find(w => w.name === 'Hands'),
            level: 1
        };

        showMessage(`Unequipped Weapon`, 'warning');
    } else if (draggedEquipment === 'armor') {
        addToInventory(player.armory.armor, player.armory.level);
        player.armory = {
            armor: assets.items.find(a => a.name === 'None'),
            level: 1
        };

        showMessage(`Unequipped Armor`, 'warning');
    }

    setPlayer();
    draggedEquipment = null;
    setTimeout(() => {
        enhanceInventoryTooltips();
        updateEquipmentDisplay();
    }, 100);
}

async function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const playerBar = document.getElementById('player');
    playerBar.style.backgroundColor = '';
    playerBar.classList.remove('drop-hint-target--active');
    clearDropHintText(playerBar);

    if (!draggedItem) return;

    const player = Alpine.$data(document.getElementById('player'));
    const assets = getAssets();
    const itemData = assets.items.find(i => i.name === draggedItem.name);

    if (!itemData) {
        console.error('Item not found:', draggedItem.name);
        draggedItem = null;
        draggedItemIndex = null;
        return;
    }

    const isWeapon = itemData.attack !== undefined && itemData.skills;
    const isArmor = itemData.defense !== undefined && !itemData.skills && itemData.alvlmult !== undefined;
    const isConsumable = itemData.name.toLowerCase().includes('potion');

    if (isWeapon) {
        equipWeapon(itemData, draggedItem.level);
    } else if (isArmor) {
        equipArmor(itemData, draggedItem.level);
    } else if (isConsumable) {
        consumeItem(itemData);
    } else {
        showMessage(`Cannot use ${draggedItem.name}`, 'warning');
    }

    draggedItem = null;
    draggedItemIndex = null;
    setTimeout(() => {
        enhanceInventoryTooltips();
        updateEquipmentDisplay();
    }, 100);
}

function equipWeapon(weaponData, level) {
    const player = Alpine.$data(document.getElementById('player'));

    if (player.weaponry.weapon.name !== "Hands") {
        addToInventory(player.weaponry.weapon, player.weaponry.level);
    }

    player.weaponry = { weapon: weaponData, level: level || 1 };
    removeFromInventory(draggedItemIndex);
    setPlayer();
    showMessage(`Equipped ${weaponData.name}!`, 'success');
}

function equipArmor(armorData, level) {
    const player = Alpine.$data(document.getElementById('player'));

    if (player.armory.armor.name !== "None") {
        addToInventory(player.armory.armor, player.armory.level);
    }

    player.armory = { armor: armorData, level: level || 1 };
    removeFromInventory(draggedItemIndex);
    setPlayer();
    showMessage(`Equipped ${armorData.name}!`, 'success');
}

function consumeItem(itemData) {
    const player = Alpine.$data(document.getElementById('player'));

    if (itemData.health) {
        const healAmount = Math.floor(player.maxHealth * itemData.health);
        player.health = Math.min(player.health + healAmount, player.maxHealth);
        showMessage(`Restored ${healAmount} HP!`, 'success');
    }

    if (itemData.stamina) {
        const staminaAmount = Math.floor(player.maxStamina * itemData.stamina);
        player.stamina = Math.min(player.stamina + staminaAmount, player.maxStamina);
        showMessage(`Restored ${staminaAmount} Stamina!`, 'success');
    }

    if (itemData.xp) {
        player.experience += itemData.xp;
        showMessage(`Gained ${itemData.xp} XP!`, 'success');
        checkLevelUp();
    }

    if (itemData.pstatus) {
        const assets = getAssets();
        itemData.pstatus.forEach(statusId => {
            const status = assets.statuses.find(s => s.id === statusId);
            if (status && !player.pstatus.some(s => s.id === statusId)) {
                player.pstatus.push({ ...status, baseDam: player.attack });
            }
        });
        showMessage(`Gained status effects!`, 'success');
    }

    removeFromInventory(draggedItemIndex);
    updateBars();
    savePlayer();
}

function removeFromInventory(index) {
    const player = Alpine.$data(document.getElementById('player'));

    if (player.inventory[index].amount > 1) {
        player.inventory[index].amount -= 1;
    } else {
        player.inventory.splice(index, 1);
    }

    savePlayer();
}

function checkLevelUp() {
    const player = Alpine.$data(document.getElementById('player'));
    const requiredXP = Math.floor((player.level / 0.07) ** 2);

    if (player.experience >= requiredXP) {
        player.level += 1;
        player.experience -= requiredXP;
        showMessage(`Level Up! Now level ${player.level}!`, 'success');
        setPlayer();
        checkLevelUp();
    }
}

function showMessage(message, type = 'info') {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        background-color: ${type === 'success' ? 'rgba(0, 255, 100, 0.9)' : type === 'warning' ? 'rgba(255, 165, 0, 0.9)' : 'rgba(100, 150, 255, 0.9)'};
        color: black;
        font-family: 'Pixelify Sans', sans-serif;
        font-size: 20px;
        border-radius: 8px;
        border: 3px solid ${type === 'success' ? 'rgb(0, 200, 0)' : type === 'warning' ? 'rgb(200, 100, 0)' : 'rgb(50, 100, 200)'};
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.style.animation = 'slideUp 0.3s ease-out forwards';
        messageEl.style.opacity = '0';
        setTimeout(() => messageEl.remove(), 300);
    }, 2000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initInventoryDragDrop);
else initInventoryDragDrop();