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
        const hasSynergy = player.armory.armor.synergies &&
            player.armory.armor.synergies.some(syn => syn.weapon === itemData.name);

        let html = `
            <div style="text-align: center; font-family: 'Pixelify Sans', sans-serif; font-size: 16px; margin-bottom: 8px;">
                <strong>⚔️ Current Weapon</strong>
            </div>
            <div>
                <div style="font-weight: bold; color: #fff;">${weapon.name} - Level ${weaponLevel}</div>
                <div style="font-size: 13px; color: #cfcfcf;">⚔️ ${Math.floor(weapon.attack + ((weaponLevel - 1) * weapon.attackPerLevel))}</div>
                <div style="font-size: 13px; color: #cfcfcf;">🍀 ${Math.floor(weapon.crit * 100)}%</div>
                <div style="font-size: 13px; color: #cfcfcf;">⚔️ ${weapon.critdmg}x</div>
                <div style="font-size: 13px; color: #cfcfcf;">🎯 ${Math.floor(weapon.accuracy * 100)}%</div>
            </div>
        `;

        if (hasSynergy) {
            const synergy = player.armory.armor.synergies.find(syn => syn.weapon === itemData.name);
            html += `
                <div style="margin-top: 8px; border: 2px solid gold; padding: 6px; border-radius: 4px; background-color: rgba(255, 215, 0, 0.2);">
                    <div style="font-weight: bold; color: gold; font-size: 13px; text-align: center;">${synergy.name}</div>
                    <div style="font-size: 12px; color: #fff; margin-top: 3px;">`;

            const bonuses = [];
            if (synergy.defense) bonuses.push(`🛡️ +${synergy.defense} `);
            if (synergy.evasion) bonuses.push(`💨 +${Math.floor(synergy.evasion * 100)}%`);
            if (synergy.crit) bonuses.push(`🍀 +${Math.floor(synergy.crit * 100)}%`);
            if (synergy.attack) bonuses.push(`⚔️ +${synergy.attack}`);

            html += bonuses.join('<br>');
            html += `</div></div>`;
        }

        equipmentDisplay.innerHTML = html;
    } else if (type === 'armor') {
        const armor = player.armory.armor;
        const armorLevel = player.armory.level;
        const hasSynergy = itemData.synergies &&
            itemData.synergies.some(syn => syn.weapon === player.weaponry.weapon.name);

        let html = `
            <div style="text-align: center; font-family: 'Pixelify Sans', sans-serif; font-size: 16px; margin-bottom: 8px;">
                <strong>🛡️ Current Armor</strong>
            </div>
            <div>
                <div style="font-weight: bold; color: #fff;">${armor.name} - Level ${armorLevel}</div>
                <div style="font-size: 13px; color: #cfcfcf;">🛡️ ${Math.floor(armor.defense + ((armorLevel - 1) * armor.alvlmult))}</div>
                <div style="font-size: 13px; color: #cfcfcf;">💨 ${Math.floor(armor.evasion * 100)}%</div>
            </div>
        `;

        if (hasSynergy) {
            const synergy = itemData.synergies.find(syn => syn.weapon === player.weaponry.weapon.name);
            html += `
                <div style="margin-top: 8px; border: 2px solid gold; padding: 6px; border-radius: 4px; background-color: rgba(255, 215, 0, 0.2);">
                    <div style="font-weight: bold; color: gold; font-size: 13px; text-align: center;">${synergy.name} - ${itemData.name}</div>
                    <div style="font-size: 12px; color: #fff; margin-top: 3px;">`;

            const bonuses = [];
            if (synergy.defense) bonuses.push(`🛡️ +${synergy.defense} `);
            if (synergy.evasion) bonuses.push(`💨 +${Math.floor(synergy.evasion * 100)}%`);
            if (synergy.crit) bonuses.push(`🍀 +${Math.floor(synergy.crit * 100)}%`);
            if (synergy.attack) bonuses.push(`⚔️ +${synergy.attack}`);

            html += bonuses.join('<br>');
            html += `</div></div>`;
        }

        equipmentDisplay.innerHTML = html;
    }
}

function enhanceInventoryTooltips() {
    const inventoryGrid = document.querySelector('.inventory-grid');
    if (!inventoryGrid) return;

    const updateTooltips = () => {
        const items = inventoryGrid.querySelectorAll('.inventory-item');
        items.forEach(item => {
            if (!item.dataset.tooltipsEnhanced) {
                updateItemTooltip(item);
                item.addEventListener('mouseenter', handleItemHover);
                item.addEventListener('mouseleave', handleItemLeave);
                item.dataset.tooltipsEnhanced = 'true';
            } else {
                updateItemTooltip(item);
            }
        });
    };

    updateTooltips();

    const observer = new MutationObserver(() => {
        // Debounce the observer to prevent rapid re-calls
        clearTimeout(observer.debounceTimer);
        observer.debounceTimer = setTimeout(updateTooltips, 100);
    });
    observer.observe(inventoryGrid, { childList: true, subtree: false });
}

function handleItemHover(e) {
    const itemElement = e.currentTarget;
    const player = Alpine.$data(document.getElementById('player'));
    const assets = getAssets();

    // Get the item name from the DOM element
    const itemName = itemElement.querySelector('.inventory-item-name')?.textContent || '';
    
    // Find the actual item in the inventory array by name
    const inventoryItem = player.inventory.find(item => item.name === itemName);
    if (!inventoryItem) return;

    const itemData = assets.items.find(i => i.name === inventoryItem.name);
    if (!itemData) return;

    const isWeapon = itemData.attack !== undefined && itemData.skills;
    const isArmor = itemData.defense !== undefined && !itemData.skills && itemData.alvlmult !== undefined;

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

function updateItemTooltip(itemElement) {
    const player = Alpine.$data(document.getElementById('player'));
    const assets = getAssets();

    // Get item name from DOM element instead of using index
    const itemName = itemElement.querySelector('.inventory-item-name')?.textContent || '';
    
    // Find the actual item in the inventory array by name
    const inventoryItem = player.inventory.find(item => item.name === itemName);
    if (!inventoryItem) return;

    const itemData = assets.items.find(i => i.name === inventoryItem.name);
    if (!itemData) return;

    const metaElement = itemElement.querySelector('.inventory-item-meta');
    let tooltipText = metaElement ? metaElement.getAttribute('data-tooltip') || metaElement.textContent : '';

    let hasSynergy = false;

    if (itemData.attack !== undefined && itemData.skills) {
        const currentArmor = player.armory.armor;
        if (currentArmor.synergies && currentArmor.synergies.some(syn => syn.weapon === itemData.name)) {
            hasSynergy = true;
            const synergy = currentArmor.synergies.find(syn => syn.weapon === itemData.name);

            const bonuses = [];
            if (synergy.defense) bonuses.push(`🛡️ +${synergy.defense}`);
            if (synergy.evasion) bonuses.push(`💨 +${Math.floor(synergy.evasion * 100)}%`);
            if (synergy.crit) bonuses.push(`🍀 +${Math.floor(synergy.crit * 100)}%`);
            if (synergy.attack) bonuses.push(`⚔️ +${synergy.attack}`);
            tooltipText += `\n\nSynergy\n${bonuses.join(', ')}`;
        }

        if (player.weaponry.weapon.name === itemData.name) {
            tooltipText += `\n\n⚔️ Currently Equipped`;
        }
    }

    if (itemData.defense !== undefined && !itemData.skills && itemData.synergies) {
        const currentWeapon = player.weaponry.weapon;

        const synergy = itemData.synergies.find(syn => syn.weapon === currentWeapon.name);
        if (synergy) {
            hasSynergy = true;
            const bonuses = [];
            if (synergy.defense) bonuses.push(`🛡️ +${synergy.defense}`);
            if (synergy.evasion) bonuses.push(`💨 +${Math.floor(synergy.evasion * 100)}%`);
            if (synergy.crit) bonuses.push(`🍀 +${Math.floor(synergy.crit * 100)}%`);
            if (synergy.attack) bonuses.push(`⚔️ +${synergy.attack}`);
            tooltipText += `\n\nSynergy\n${bonuses.join(', ')}`;
        }

        if (player.armory.armor.name === itemData.name) {
            tooltipText += `\n\n🛡️ Currently Equipped`;
        }
    }

    itemElement.setAttribute('data-tooltip', tooltipText);

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
    const itemLevel = inventoryItem.querySelector('[x-text*="Level"]')?.textContent.match(/\d+/)?.[0] || 1;

    // Find the actual item in the inventory array by name
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

function handleDragOver(e) {
    if (!draggedItem) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const playerBar = document.getElementById('player');
    playerBar.style.backgroundColor = 'rgba(0, 255, 100, 0.2)';
    playerBar.style.transition = 'all 0.2s ease';
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

    draggedItem = null;
    draggedItemIndex = null;
    draggedEquipment = null;
}

function handleDragLeave(e) {
    const playerBar = document.getElementById('player');
    if (e.target === playerBar) {
        playerBar.style.backgroundColor = '';
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
    const isConsumable = itemData.health || itemData.stamina || itemData.buff || itemData.pstatus || itemData.xp;

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