let draggedCraftItemName = null;

function initCraftingDragDrop() {
	setTimeout(() => {
		setupCraftingListeners();
	}, 500);
}

function setupCraftingListeners() {
	const craftingPanel = document.getElementById('crafting-panel');
	if (!craftingPanel) return;
	const playerBar = document.getElementById('player');
	const battleWeaponry = document.getElementById('battle-weaponry');

	craftingPanel.addEventListener('dragstart', handleCraftingDragStart);
	craftingPanel.addEventListener('dragend', handleCraftingDragEnd);
	craftingPanel.addEventListener('dragover', handleCraftingInventoryDragOver);
	craftingPanel.addEventListener('drop', handleCraftingInventoryDrop);
	craftingPanel.addEventListener('dragleave', handleCraftingInventoryDragLeave);

	if (battleWeaponry) {
		battleWeaponry.addEventListener('dragstart', handleCraftingEquipmentDragStart);
		battleWeaponry.addEventListener('dragend', handleCraftingDragEnd);
	}

	if (playerBar) {
		playerBar.addEventListener('dragover', handleCraftingPlayerDragOver);
		playerBar.addEventListener('drop', handleCraftingPlayerDrop);
		playerBar.addEventListener('dragleave', handleCraftingPlayerDragLeave);
	}
}

function handleCraftingDragStart(e) {
	const craftItem = e.target.closest('.crafting-item');
	if (craftItem) {
		const craftItemName = craftItem.dataset.craftName;
		if (!craftItemName) return;

		draggedCraftItemName = craftItemName;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', craftItemName);
		craftItem.style.opacity = '0.4';

		const tooltip = document.getElementById('global-tooltip');
		if (tooltip) {
			tooltip.style.opacity = '0';
			tooltip.style.pointerEvents = 'none';
		}
		return;
	}

	const inventoryItemElement = e.target.closest('.crafting-inventory-item');
	if (!inventoryItemElement) return;
	handleDragStart(e);
}

function handleCraftingEquipmentDragStart(e) {
	handleEquipmentDragStart(e);
}

function handleCraftingDragEnd(e) {
	const craftItem = e.target.closest('.crafting-item');
	if (craftItem) {
		craftItem.style.opacity = '1';
	}

	handleDragEnd(e);

	document.querySelectorAll('.crafting-column--right.crafting-drop-target').forEach(zone => {
		zone.classList.remove('crafting-drop-target');
		zone.classList.remove('drop-hint-target--active');
		if (window.clearDropHintText) window.clearDropHintText(zone);
	});

	const playerBar = document.getElementById('player');
	if (playerBar) {
		playerBar.classList.remove('crafting-drop-target-player');
		playerBar.classList.remove('drop-hint-target--active');
		playerBar.style.backgroundColor = '';
		if (window.clearDropHintText) window.clearDropHintText(playerBar);
	}

	draggedCraftItemName = null;
}

function handleCraftingInventoryDragOver(e) {
	if (!draggedCraftItemName && !draggedEquipment) return;

	const inventoryZone = e.target.closest('.crafting-column--right');
	if (!inventoryZone) return;

	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
	inventoryZone.classList.add('crafting-drop-target');
	inventoryZone.classList.add('drop-hint-target--active');
	if (draggedCraftItemName && window.setDropHintText) {
		window.setDropHintText(inventoryZone, 'Drop here to craft');
	}
}

function handleCraftingInventoryDragLeave(e) {
	const inventoryZone = e.target.closest('.crafting-column--right');
	if (!inventoryZone) return;

	if (!inventoryZone.contains(e.relatedTarget)) {
		inventoryZone.classList.remove('crafting-drop-target');
		inventoryZone.classList.remove('drop-hint-target--active');
		if (window.clearDropHintText) window.clearDropHintText(inventoryZone);
	}
}

function getCraftIngredientCount(craftList, ingredientName) {
	return craftList.filter(name => name === ingredientName).length;
}

function getOwnedIngredientCount(inventory, ingredientName) {
	return inventory
		.filter(item => item.name === ingredientName)
		.reduce((total, item) => total + (item.amount || 1), 0);
}

function canCraftItemWithInventory(craftItemData, inventory) {
	if (!craftItemData || !craftItemData.craft) return false;

	return craftItemData.craft.every(ingredientName => {
		const required = getCraftIngredientCount(craftItemData.craft, ingredientName);
		const owned = getOwnedIngredientCount(inventory, ingredientName);
		return owned >= required;
	});
}

function getMissingIngredients(craftItemData, inventory) {
	if (!craftItemData || !craftItemData.craft) return [];

	const uniqueIngredients = [...new Set(craftItemData.craft)];
	const missing = [];

	uniqueIngredients.forEach(ingredientName => {
		const required = getCraftIngredientCount(craftItemData.craft, ingredientName);
		const owned = getOwnedIngredientCount(inventory, ingredientName);
		if (owned < required) {
			missing.push(`${ingredientName} ${owned}/${required}`);
		}
	});

	return missing;
}

function rollCraftedItemLevel(itemData) {
	const minLevel = itemData?.minlvl ?? 1;
	const maxLevel = itemData?.maxlvl ?? minLevel;

	if (maxLevel <= minLevel) return minLevel;
	return Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
}

function consumeCraftIngredients(player, craftList) {
	if (!player || !Array.isArray(craftList)) return;

	craftList.forEach(ingredientName => {
		const index = player.inventory.findIndex(item => item.name === ingredientName);
		if (index === -1) return;

		if (player.inventory[index].amount > 1) {
			player.inventory[index].amount -= 1;
		} else {
			player.inventory.splice(index, 1);
		}
	});
}

function applyCraftedItemDirectly(player, craftedItemData, craftedLevel) {
	if (!player || !craftedItemData) return false;

	const assets = getAssets();
	const isWeapon = craftedItemData.attack !== undefined && craftedItemData.skills;
	const isArmor = craftedItemData.defense !== undefined && !craftedItemData.skills && craftedItemData.alvlmult !== undefined;
	const isConsumable = craftedItemData.name.toLowerCase().includes('potion');

	if (isWeapon) {
		if (player.weaponry.weapon.name !== 'Hands') {
			addToInventory(player.weaponry.weapon, player.weaponry.level);
		}
		player.weaponry = { weapon: craftedItemData, level: craftedLevel || 1 };
		setPlayer();
		showMessage(`Crafted and equipped ${craftedItemData.name}!`, 'success');
		return true;
	}

	if (isArmor) {
		if (player.armory.armor.name !== 'None') {
			addToInventory(player.armory.armor, player.armory.level);
		}
		player.armory = { armor: craftedItemData, level: craftedLevel || 1 };
		setPlayer();
		showMessage(`Crafted and equipped ${craftedItemData.name}!`, 'success');
		return true;
	}

	if (isConsumable) {
		if (craftedItemData.health) {
			const healAmount = Math.floor(player.maxHealth * craftedItemData.health);
			player.health = Math.min(player.health + healAmount, player.maxHealth);
		}

		if (craftedItemData.stamina) {
			const staminaAmount = Math.floor(player.maxStamina * craftedItemData.stamina);
			player.stamina = Math.min(player.stamina + staminaAmount, player.maxStamina);
		}

		if (craftedItemData.xp) {
			player.experience += craftedItemData.xp;
		}

		if (craftedItemData.pstatus) {
			const statuses = assets.statuses || [];
			craftedItemData.pstatus.forEach(statusId => {
				const status = statuses.find(s => s.id === statusId);
				if (status && !player.pstatus.some(s => s.id === statusId)) {
					player.pstatus.push({ ...status, baseDam: player.attack });
				}
			});
		}

		updateBars();
		savePlayer();
		showMessage(`Crafted and used ${craftedItemData.name}!`, 'success');
		return true;
	}

	return false;
}

function getCraftDropContext() {
	if (!draggedCraftItemName) return null;

	const assets = getAssets();
	const player = Alpine.$data(document.getElementById('player'));
	const craftItemData = assets.items.find(item => item.name === draggedCraftItemName);

	if (!craftItemData || !craftItemData.craft) return null;

	if (!canCraftItemWithInventory(craftItemData, player.inventory)) {
		const missing = getMissingIngredients(craftItemData, player.inventory);
		const details = missing.length ? ` Missing: ${missing.join(', ')}` : '';
		showMessage(details, 'warning');
		draggedCraftItemName = null;
		return null;
	}

	return { player, craftItemData, craftedLevel: rollCraftedItemLevel(craftItemData) };
}

async function handleCraftingInventoryDrop(e) {
	if (!draggedCraftItemName && !draggedEquipment) return;

	e.preventDefault();
	e.stopPropagation();

	const inventoryZone = e.target.closest('.crafting-column--right');
	if (!inventoryZone) return;
	inventoryZone.classList.remove('crafting-drop-target');
	inventoryZone.classList.remove('drop-hint-target--active');
	if (window.clearDropHintText) window.clearDropHintText(inventoryZone);

	if (draggedEquipment) {
		handleInventoryDrop(e);
		return;
	}

	const context = getCraftDropContext();
	if (!context) return;

	consumeCraftIngredients(context.player, context.craftItemData.craft);
	await addToInventory(context.craftItemData, context.craftedLevel);
	await savePlayer();
	showMessage(`Crafted ${context.craftItemData.name}!`, 'success');

	draggedCraftItemName = null;
}

function handleCraftingPlayerDragOver(e) {
	if (!draggedCraftItemName && !draggedItem) return;
	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
	const playerBar = document.getElementById('player');
	if (draggedCraftItemName) {
		const craftItemData = getAssets().items.find(item => item.name === draggedCraftItemName);
		const isWeapon = craftItemData && craftItemData.attack !== undefined && craftItemData.skills;
		const isArmor = craftItemData && craftItemData.defense !== undefined && !craftItemData.skills && craftItemData.alvlmult !== undefined;
		const isConsumable = craftItemData && craftItemData.name.toLowerCase().includes('potion');
		const hintText = (isWeapon || isArmor)
			? 'Drop here to craft and equip'
			: isConsumable
				? 'Drop here to craft and use'
				: 'Drop here to craft (cannot be consumed or equipped)';

		if (playerBar) {
			playerBar.style.backgroundColor = 'rgba(0, 255, 100, 0.2)';
			playerBar.style.transition = 'all 0.2s ease';
			playerBar.classList.add('drop-hint-target--active');
			if (window.setDropHintText) window.setDropHintText(playerBar, hintText);
		}
		return;
	}
	handleDragOver(e);
}

function handleCraftingPlayerDragLeave(e) {
	const playerBar = document.getElementById('player');
	if (!playerBar) return;
	if (draggedCraftItemName && e.target === playerBar) {
		playerBar.style.backgroundColor = '';
		playerBar.classList.remove('drop-hint-target--active');
		if (window.clearDropHintText) window.clearDropHintText(playerBar);
		return;
	}
	handleDragLeave(e);
}

async function handleCraftingPlayerDrop(e) {
	if (!draggedCraftItemName && !draggedItem) return;

	e.preventDefault();
	e.stopPropagation();

	const playerBar = document.getElementById('player');
	if (playerBar) {
		playerBar.classList.remove('crafting-drop-target-player');
		playerBar.classList.remove('drop-hint-target--active');
		playerBar.style.backgroundColor = '';
		if (window.clearDropHintText) window.clearDropHintText(playerBar);
	}

	if (draggedItem) {
		await handleDrop(e);
		return;
	}

	const context = getCraftDropContext();
	if (!context) return;

	consumeCraftIngredients(context.player, context.craftItemData.craft);
	const applied = applyCraftedItemDirectly(context.player, context.craftItemData, context.craftedLevel);

	if (!applied) {
		await addToInventory(context.craftItemData, context.craftedLevel);
		showMessage(`Crafted ${context.craftItemData.name} and stored in inventory.`, 'info');
	}

	await savePlayer();

	draggedCraftItemName = null;
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCraftingDragDrop);
else initCraftingDragDrop();
