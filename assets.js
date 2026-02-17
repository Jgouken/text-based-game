let mult = 9
function getLocalAssets() {
	return {
		blocks: [
			// Defines the different level milestones of enemies, with their respective stat increases per level
			// all following stats are "per level" and added to base
			{
				name: "Animal",
				fifty: {
					health: 50,
					attack: 20,
					defense: 20,
				},

				forty: {
					health: 45,
					attack: 17,
					defense: 17,
				},

				thirty: {
					health: 40,
					attack: 14,
					defense: 14,
				},

				twenty: {
					health: 35,
					attack: 11,
					defense: 11,
				},

				ten: {
					health: 30,
					attack: 8,
					defense: 8,
				},

				zero: {
					health: 25,
					attack: 5,
					defense: 5,
				},
			},
			{
				name: "Grunt",
				fifty: {
					health: 125,
					attack: 21,
					defense: 21,
				},

				forty: {
					health: 75,
					attack: 21,
					defense: 21,
				},

				thirty: {
					health: 60,
					attack: 18,
					defense: 18,
				},

				twenty: {
					health: 45,
					attack: 15,
					defense: 15,
				},

				ten: {
					health: 35,
					attack: 12,
					defense: 12,
				},

				zero: {
					health: 25,
					attack: 9,
					defense: 9,
				},
			},
			{
				name: "General",
				fifty: {
					health: 200,
					attack: 30,
					defense: 30,
				},

				forty: {
					health: 150,
					attack: 27,
					defense: 27,
				},

				thirty: {
					health: 135,
					attack: 24,
					defense: 24,
				},

				twenty: {
					health: 120,
					attack: 21,
					defense: 21,
				},

				ten: {
					health: 110,
					attack: 18,
					defense: 18,
				},

				zero: {
					health: 100,
					attack: 15,
					defense: 15,
				},
			},
			{
				name: "Vice Captain",
				fifty: {
					health: 275,
					attack: 27,
					defense: 27,
				},

				forty: {
					health: 225,
					attack: 25,
					defense: 25,
				},

				thirty: {
					health: 210,
					attack: 23,
					defense: 23,
				},

				twenty: {
					health: 195,
					attack: 21,
					defense: 21,
				},

				ten: {
					health: 185,
					attack: 19,
					defense: 19,
				},

				zero: {
					health: 175,
					attack: 17,
					defense: 17,
				},
			},
			{
				name: "Captain",
				fifty: {
					health: 350,
					attack: 30,
					defense: 30,
				},

				forty: {
					health: 300,
					attack: 28,
					defense: 28,
				},

				thirty: {
					health: 285,
					attack: 26,
					defense: 26,
				},

				twenty: {
					health: 270,
					attack: 24,
					defense: 24,
				},

				ten: {
					health: 260,
					attack: 22,
					defense: 22,
				},

				zero: {
					health: 250,
					attack: 20,
					defense: 20,
				},
			},
			{
				name: "Lord",
				fifty: {
					health: 450,
					attack: 40,
					defense: 40,
				},

				forty: {
					health: 400,
					attack: 37,
					defense: 37,
				},

				thirty: {
					health: 385,
					attack: 34,
					defense: 34,
				},

				twenty: {
					health: 370,
					attack: 31,
					defense: 31,
				},

				ten: {
					health: 360,
					attack: 28,
					defense: 28,
				},

				zero: {
					health: 350,
					attack: 25,
					defense: 25,
				},
			},
			{
				name: "Elite",
				fifty: {
					health: 500,
					attack: 45,
					defense: 45,
				},

				forty: {
					health: 450,
					attack: 42,
					defense: 42,
				},

				thirty: {
					health: 435,
					attack: 39,
					defense: 39,
				},

				twenty: {
					health: 420,
					attack: 36,
					defense: 36,
				},

				ten: {
					health: 410,
					attack: 33,
					defense: 33,
				},

				zero: {
					health: 400,
					attack: 30,
					defense: 30,
				},
			}
		],

		statuses: [
			{
				name: 'Poison',
				id: '💀',
				description: "Inflicts 4% Max HP damage for 5 turns.",
				positive: false,
				maxHP: 0.04,
				rounds: 5,
			},
			{
				name: 'Regeneration',
				id: '💗',
				description: "Gain 3% Max HP for 3 turns.",
				positive: true,
				maxHP: 0.03,
				rounds: 3,
			},
			{
				name: 'Bleed',
				id: '🩸',
				description: "Inflicts 15% of initial damage for 2 turns.",
				baseDam: 0.15,
				positive: false,
				rounds: 2,
			},
			{
				name: 'Burn',
				id: '🔥',
				description: "Inflicts 10% of initial damage for 5 turns.",
				baseDam: 0.1,
				positive: false,
				rounds: 5,
			},
			{
				name: 'Weakness',
				id: '🌀',
				description: "Deal 15% less damage for 3 turns.",
				damReduc: 0.15,
				positive: false,
				rounds: 4
			},
			{
				name: 'Strength',
				id: '💪',
				description: "Deal 20% more damage for 3 turns.",
				damAdd: 0.2,
				positive: true,
				rounds: 4
			},
			{
				name: 'Empowerment',
				id: '🏅',
				description: "Deal 40% more damage for 1 turn.",
				damAdd: 0.4,
				positive: true,
				rounds: 2
			},
			{
				name: 'Stun',
				id: '💫',
				description: "Next turn is skipped.",
				positive: false,
				rounds: 1,
			},
			{
				name: 'Rigidity',
				id: "🛡️",
				description: "Increases armor by 20% for 3 turns.",
				armorAdd: 0.2,
				positive: true,
				rounds: 3
			},
			{
				name: 'Fragility',
				id: "🩼",
				description: "Decreases armor by 25% for 3 turns.",
				armorSub: 0.25,
				positive: false,
				rounds: 3
			},
			{
				name: 'Blindness',
				id: '👁️',
				description: "Decreases accuracy by 15% for 3 turns.",
				decAcc: 0.15,
				positive: false,
				rounds: 4
			},
			{
				name: 'Acuity',
				id: '🎯',
				description: "Increases accuracy by 20% for 3 turns.",
				incAcc: 0.2,
				positive: true,
				rounds: 4
			},
			{
				name: 'Curse',
				id: '🖤',
				description: "Inflicts 25% of character's base damage for 4 turns.",
				baseDam: 0.25,
				positive: false,
				rounds: 4,
			},
			{
				name: 'Luck',
				id: '🍀',
				description: "Increases critical hit chance by 15% for 3 turns.",
				incCrit: 0.15,
				positive: true,
				rounds: 4
			},
			{
				name: 'Misfortune',
				id: '🥀',
				description: "Decreases critical hit chance by 10% for 3 turns.",
				decCrit: 0.1,
				positive: false,
				rounds: 3
			},
			{
				name: 'Berserk',
				id: '💢',
				description: "Increases attack by 40% but increases damage taken by 30% over 3 turns.",
				damAdd: 0.4,
				incDamTaken: 0.3,
				positive: true,
				rounds: 4
			},
			{
				name: 'Evasion',
				id: '💨',
				description: "Decreases opponent attack accuracy by 15% for 3 turns.",
				decEnAcc: 0.15,
				positive: true,
				rounds: 3
			},
			{
				name: 'Blessing',
				id: '✨',
				description: "Dispel and negate all negative status effects for 2 turns.",
				positive: true,
				rounds: 2,
			},
			{
				name: 'Malediction',
				id: '🌑',
				description: "Dispel and negate all positive status effects for 2 turns.",
				positive: false,
				rounds: 2,
			},

		],

		enemies: [
			{
				name: "Lazy Goblin",
				sprite: 'assets/enemies/LazyGoblin.gif',
				weapon: "Rusted Dagger",
				health: 50,
				attack: 25,
				accuracy: 0.75,
				crit: 0.05,
				defense: 40,
				skills: [
					{
						name: "Stab",
						chance: 0.85,
						attack: true
					},
					{
						name: "Lucky Blow",
						pstatus: ["🩸", "🌀", "🩼"],
						estatus: ["🍀", "🎯"],
						chance: 0.15,
						wait: 3,
						damage: 2,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.60
					},
					{
						name: "Wooden Key",
						chance: 0.06
					},
					{
						name: "Iron Key",
						chance: 0.03
					},
					{
						name: "Twig",
						chance: 0.025
					},
					{
						name: "Branch",
						chance: 0.025
					},
					{
						name: "Broken Dagger",
						chance: 0.015
					},
					{
						name: "Tattered Rags",
						chance: 0.015
					},
					{
						name: "Cloth",
						chance: 0.05
					},
					{
						name: "Empty Bottle",
						chance: 0.08
					},
					{
						name: "Water Bottle",
						chance: 0.05
					},
					{
						name: "Booze",
						chance: 0.05
					},
				]
			},
			{
				name: "Blacksmith Goblin",
				sprite: 'assets/enemies/BlacksmithGoblin.gif',
				weapon: "Blacksmith's Hammer",
				health: 125,
				attack: 50,
				defense: 75,
				crit: 0.2,
				accuracy: 0.75,

				skills: [
					{
						name: "Slam",
						chance: 0.75,
						attack: true
					},
					{
						name: "Malet Strike",
						pstatus: ["💫"],
						chance: 0.15,
						wait: 2,
						damage: 0.8,
						attack: true
					},
					{
						name: "Metal Shavings",
						pstatus: ["🩸"],
						chance: 0.15,
						wait: 1,
						damage: 1.5,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.65
					},
					{
						name: "Wooden Key",
						chance: 0.04
					},
					{
						name: "Iron Key",
						chance: 0.02
					},
					{
						name: "Broken Dagger",
						chance: 0.02
					},
					{
						name: "Rusty Dagger",
						chance: 0.01
					},
					{
						name: "Damaged Cloak",
						chance: 0.02
					},
					{
						name: "Whetstone",
						chance: 0.06
					},
					{
						name: "Gunpowder",
						chance: 0.05
					},
					{
						name: "Empty Bottle",
						chance: 0.05
					},
					{
						name: "Water Bottle",
						chance: 0.05
					},
					{
						name: "Booze",
						chance: 0.05
					},
				]
			},
			{
				name: "Armored Goblin",
				sprite: 'assets/enemies/ArmoredGoblin.gif',
				weapon: "Spear & Shield",
				health: 250,
				attack: 160,
				defense: 350,
				crit: 0.1,
				accuracy: 0.7,
				skills: [
					{
						name: "Jab",
						chance: 0.65,
						attack: true
					},
					{
						name: "Rally",
						estatus: ["🛡️", "💪"],
						chance: 0.10,
						wait: 2,
						attack: false
					},
					{
						name: "Flurry",
						chance: 0.25,
						wait: 1,
						times: 3,
						damage: 0.65,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.85
					},
					{
						name: "Golden Key",
						chance: 0.06
					},
					{
						name: "Platinum Key",
						chance: 0.03
					},
					{
						name: "Great Sword",
						chance: 0.015
					},
					{
						name: "Skull Crusher",
						chance: 0.015
					},
					{
						name: "Iron Armor",
						chance: 0.03
					},
				]
			},
			{
				name: "Cursed Goblin",
				sprite: 'assets/enemies/CursedGoblin.gif',
				weapon: "Cursed Rusted Dagger",
				health: 333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.66,
				skills: [
					{
						name: "Stab",
						chance: 0.55,
						attack: true
					},
					{
						name: "Wild Strike",
						pstatus: ["🩸"],
						damage: 1.66,
						chance: 0.30,
						wait: 1,
						attack: true
					},
					{
						name: "Cursed Breath",
						pstatus: ["🖤", "🌑", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.15,
						wait: 2,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.6
					},
					{
						name: "Golden Key",
						chance: 0.045
					},
					{
						name: "Platinum Key",
						chance: 0.025
					},
					{
						name: "Adamantine Key",
						chance: 0.01
					},
					{
						name: "Red Gem",
						chance: 0.075
					},
					{
						name: "Blue Gem",
						chance: 0.075
					},
					{
						name: "Purple Gem",
						chance: 0.035
					},
					{
						name: "Whetstone",
						chance: 0.045
					},
					{
						name: "Cloth",
						chance: 0.09
					},
				]
			},
			{
				name: "Orc",
				sprite: 'assets/enemies/Orc.gif',
				weapon: "Orc Club",
				health: 400,
				attack: 200,
				defense: 300,
				crit: 0.1,
				accuracy: 0.65,
				skills: [
					{
						name: "Smash",
						chance: 0.60,
						attack: true
					},
					{
						name: "Grounding Stun",
						pstatus: ["💫"],
						chance: 0.15,
						damage: 1.1,
						wait: 3,
						attack: true
					},
					{
						name: "Crippling Strike",
						pstatus: ["🌀", "🩼"],
						chance: 0.15,
						damage: 1.5,
						wait: 1,
						attack: true
					},
					{
						name: "Berserk",
						estatus: ["💢"],
						chance: 0.05,
						wait: 3,
						attack: false
					},
				],
				drops: [
					{
						name: null,
						chance: 0.55
					},
					{
						name: "Iron Key",
						chance: 0.1
					},
					{
						name: "Golden Key",
						chance: 0.04
					},
					{
						name: "Platinum Key",
						chance: 0.01
					},
					{
						name: "Cloth",
						chance: 0.15
					},
					{
						name: "Red Gem",
						chance: 0.045
					},
					{
						name: "Blue Gem",
						chance: 0.045
					},
					{
						name: "Purple Gem",
						chance: 0.01
					},
					{
						name: "Whetstone",
						chance: 0.05
					},
				]
			},
			{
				name: "Health Slime",
				sprite: 'assets/enemies/HealthSlime.gif',
				weapon: null,
				health: 100,
				attack: 25,
				defense: 50,
				crit: 0.1,
				accuracy: 0.65,
				skills: [
					{
						name: "Jump",
						chance: 0.65,
						attack: true
					},
					{
						name: "Heal",
						health: 0.10,
						chance: 0.10,
						wait: 5,
						attack: false
					},
					{
						name: "Major Heal",
						health: 0.3,
						chance: 0.05,
						wait: 7,
						attack: false
					},
					{
						name: "Restorative Jiggle",
						estatus: ["💗", "✨"],
						health: 0.05,
						chance: 0.20,
						wait: 3,
						attack: false
					},
				],
				drops: [
					{
						name: null,
						chance: 0.45
					},
					{
						name: "Green Goo",
						chance: 0.45
					},
					{
						name: "Sticky Solution",
						chance: 0.01
					},
					{
						name: "Light Health Potion",
						chance: 0.05
					},
					{
						name: "Medium Health Potion",
						chance: 0.03
					},
					{
						name: "Heavy Health Potion",
						chance: 0.01
					},

				]
			},
			{
				name: "Attack Slime",
				sprite: 'assets/enemies/AttackSlime.gif',
				weapon: null,
				health: 70,
				attack: 50,
				defense: 20,
				crit: 0.2,
				accuracy: 0.70,
				skills: [
					{
						name: "Jump",
						chance: 0.65,
						attack: true
					},
					{
						name: "Slimy Blade",
						pstatus: ["🩸"],
						wait: 1,
						chance: 0.1,
						damage: 1.1,
						attack: true
					},
					{
						name: "Burning Slide",
						pstatus: ["🔥", "🩼"],
						chance: 0.1,
						damage: 1.15,
						wait: 1,
						attack: true
					},
					{
						name: "Secrete Poison",
						pstatus: ["💀"],
						chance: 0.1,
						wait: 2,
						attack: false
					},
					{
						name: "Excited Jiggle",
						estatus: ["💪", "🎯"],
						chance: 0.05,
						wait: 2,
						attack: false
					},
				],
				drops: [
					{
						name: null,
						chance: 0.45
					},
					{
						name: "Red Goo",
						chance: 0.45
					},
					{
						name: "Sticky Solution",
						chance: 0.01
					},
					{
						name: "Light Attack Potion",
						chance: 0.05
					},
					{
						name: "Medium Attack Potion",
						chance: 0.03
					},
					{
						name: "Heavy Attack Potion",
						chance: 0.01
					},

				]
			},
			{
				name: "Defense Slime",
				sprite: 'assets/enemies/DefenseSlime.gif',
				weapon: null,
				health: 75,
				attack: 35,
				defense: 100,
				crit: 0.05,
				accuracy: 0.75,
				skills: [
					{
						name: "Hefty Leap",
						chance: 0.65,
						damage: 1.1,
						attack: true
					},
					{
						name: "Reinforce",
						estatus: ["🛡️"],
						health: 0.05,
						chance: 0.15,
						wait: 2,
						attack: false
					},
					{
						name: "Heavy Impact",
						pstatus: ["💫"],
						damage: 1.3,
						chance: 0.1,
						wait: 2,
						attack: true
					},
					{
						name: "Slime Secretion",
						pstatus: ["🌀"],
						estatus: ["✨"],
						chance: 0.05,
						wait: 2,
						attack: false
					},
				],
				drops: [
					{
						name: null,
						chance: 0.45
					},
					{
						name: "Blue Goo",
						chance: 0.45
					},
					{
						name: "Sticky Solution",
						chance: 0.01
					},
					{
						name: "Light Defense Potion",
						chance: 0.05
					},
					{
						name: "Medium Defense Potion",
						chance: 0.03
					},
					{
						name: "Heavy Defense Potion",
						chance: 0.01
					},

				]
			},
			{
				name: "Stamina Slime",
				sprite: 'assets/enemies/StaminaSlime.gif',
				weapon: null,
				health: 80,
				attack: 30,
				defense: 50,
				crit: 0.5,
				accuracy: 0.7,
				skills: [
					{
						name: "Quick Leap",
						damage: 0.45,
						times: 2,
						chance: 0.65,
						attack: true
					},
					{
						name: "Electric Coat",
						pstatus: ["💫"],
						damage: 0.8,
						chance: 0.1,
						attack: true,
						wait: 2
					},
					{
						name: "Slime Barrage",
						pstatus: ["🌀"],
						damage: 0.40,
						times: 3,
						chance: 0.2,
						attack: true,
						wait: 1
					},
					{
						name: "Dodgy Dance",
						estatus: ["💨", "🎯"],
						chance: 0.05,
						attack: false,
						wait: 2
					},
				],
				drops: [
					{
						name: null,
						chance: 0.45
					},
					{
						name: "Yellow Goo",
						chance: 0.45
					},
					{
						name: "Sticky Solution",
						chance: 0.01
					},
					{
						name: "Light Stamina Potion",
						chance: 0.05
					},
					{
						name: "Medium Stamina Potion",
						chance: 0.03
					},
					{
						name: "Heavy Stamina Potion",
						chance: 0.01
					},

				]
			},
			{
				name: "Orange Fox",
				sprite: 'assets/enemies/OrangeFox.gif',
				weapon: "Steel Dagger",
				health: 650,
				attack: 250,
				defense: 180,
				crit: 0.05,
				accuracy: 0.80,
				skills: [
					{
						name: "Hack",
						damage: 0.6,
						times: 2,
						chance: 0.6,
						attack: true
					},
					{
						name: "Smoke Bomb",
						pstatus: ["👁️", "🌀"],
						chance: 0.075,
						wait: 2,
						attack: false

					},
					{
						name: "Body Flicker",
						estatus: ["🎯", "💨", "🍀"],
						chance: 0.075,
						wait: 2,
						attack: false
					},
					{
						name: "Spin Attack",
						damage: 0.65,
						times: 3,
						chance: 0.20,
						wait: 1,
						attack: true
					},
					{
						name: "Berserk",
						estatus: ["💢"],
						chance: 0.05,
						wait: 3,
						attack: false
					},
				],
				drops: [
					{
						name: null,
						chance: 0.55
					},
					{
						name: "Iron Key",
						chance: 0.06
					},
					{
						name: "Golden Key",
						chance: 0.04
					},
					{
						name: "Dual Hatchets",
						chance: 0.03
					},
					{
						name: "Leather Armor",
						chance: 0.02
					},
					{
						name: "Purified Salt",
						chance: 0.03
					},
					{
						name: "Gunpowder",
						chance: 0.03
					},
					{
						name: "Empty Bottle",
						chance: 0.03
					},
					{
						name: "Water Bottle",
						chance: 0.03
					},
					{
						name: "Booze",
						chance: 0.03
					},
					{
						name: "Pepper",
						chance: 0.02
					},
					{
						name: "Pepper Bomb",
						chance: 0.1
					},
					{
						name: "Whetstone & Polish",
						chance: 0.01
					},
					{
						name: "Whetstone",
						chance: 0.02
					},


				]
			},
			{
				name: "White Fox",
				sprite: 'assets/enemies/WhiteFox.gif',
				weapon: "Steel Dagger",
				health: 600,
				attack: 220,
				defense: 170,
				crit: 0.1,
				accuracy: 0.75,
				skills: [
					{
						name: "Stab",
						damage: 0.4,
						times: 3,
						chance: 0.6,
						attack: true
					},
					{
						name: "Smoke Bomb",
						pstatus: ["👁️", "🌀"],
						chance: 0.075,
						attack: false,
						wait: 2
					},
					{
						name: "Body Flicker",
						estatus: ["🎯", "💨", "🍀"],
						chance: 0.075,
						wait: 2,
						attack: false
					},
					{
						name: "Flurry",
						times: 6,
						damage: 0.45,
						chance: 0.15,
						wait: 1,
						attack: true
					},
					{
						name: "Coated Shuriken",
						pstatus: ["💀"],
						times: 6,
						damage: 0.20,
						chance: 0.1,
						wait: 2,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.55
					},
					{
						name: "Iron Key",
						chance: 0.05
					},
					{
						name: "Golden Key",
						chance: 0.05
					},
					{
						name: "Dual Daggers",
						chance: 0.03
					},
					{
						name: "Leather Armor",
						chance: 0.02
					},
					{
						name: "Purified Salt",
						chance: 0.03
					},
					{
						name: "Gunpowder",
						chance: 0.03
					},
					{
						name: "Empty Bottle",
						chance: 0.03
					},
					{
						name: "Water Bottle",
						chance: 0.03
					},
					{
						name: "Booze",
						chance: 0.03
					},
					{
						name: "Pepper",
						chance: 0.02
					},
					{
						name: "Pepper Bomb",
						chance: 0.1
					},
					{
						name: "Whetstone & Polish",
						chance: 0.01
					},
					{
						name: "Whetstone",
						chance: 0.02
					},



				]
			},
			{
				name: "Blue Fox",
				sprite: 'assets/enemies/BlueFox.gif',
				weapon: "Steel Dagger",
				health: 750,
				attack: 190,
				defense: 160,
				crit: 0.15,
				accuracy: 0.70,
				skills: [
					{
						name: "Slash",
						chance: 0.6,
						damage: 0.3,
						times: 4,
						attack: true
					},
					{
						name: "Smoke Bomb",
						pstatus: ["👁️", "🌀"],
						chance: 0.075,
						wait: 2,
						attack: false

					},
					{
						name: "Body Flicker",
						estatus: ["🎯", "💨", "🍀"],
						chance: 0.075,
						wait: 2,
						attack: false
					},
					{
						name: "Onslaught",
						times: 9,
						damage: 0.35,
						chance: 0.1,
						wait: 2,
						attack: true
					},
					{
						name: "Deft Slash",
						pstatus: ["🩸", "🩼"],
						damage: 1.7,
						chance: 0.15,
						wait: 1,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.55
					},
					{
						name: "Iron Key",
						chance: 0.05
					},
					{
						name: "Golden Key",
						chance: 0.05
					},
					{
						name: "Dual Daggers",
						chance: 0.015
					},
					{
						name: "Dual Hatchets",
						chance: 0.015
					},
					{
						name: "Leather Armor",
						chance: 0.02
					},
					{
						name: "Purified Salt",
						chance: 0.03
					},
					{
						name: "Gunpowder",
						chance: 0.03
					},
					{
						name: "Empty Bottle",
						chance: 0.03
					},
					{
						name: "Water Bottle",
						chance: 0.03
					},
					{
						name: "Booze",
						chance: 0.03
					},
					{
						name: "Pepper",
						chance: 0.02
					},
					{
						name: "Pepper Bomb",
						chance: 0.1
					},
					{
						name: "Venom",
						chance: 0.02
					},
					{
						name: "Whetstone & Polish",
						chance: 0.02
					},


				]
			},
			{
				name: "Vampire",
				sprite: 'assets/enemies/Vampire.gif',
				weapon: "Fangs",
				health: 4500,
				attack: 450,
				defense: 500,
				crit: 0.15,
				accuracy: 0.7,
				skills: [
					{
						name: "Lunge",
						chance: 0.55,
						attack: true
					},
					{
						name: "Piercing Blood",
						damage: 0.65,
						times: 4,
						chance: 0.2,
						wait: 1,
						pstatus: ["🩸"],
						attack: true
					},
					{
						name: "Drain",
						pstatus: ["🌀"],
						estatus: ["💗", "🛡️"],
						damage: 1.5,
						lifesteal: 0.5,
						chance: 0.1,
						wait: 1,
						attack: true
					},
					{
						name: "Vampiric Gaze",
						pstatus: ["🥀", "🌑", "💫"],
						chance: 0.075,
						wait: 3,
						attack: false
					},
					{
						name: "Bat Transformation",
						pstatus: ["👁️"],
						estatus: ["🍀", "✨", "💨"],
						chance: 0.075,
						wait: 3,
						attack: false
					},
				],
				drops: [
					{
						name: null,
						chance: 0.6
					},
					{
						name: "Platinum Key",
						chance: 0.06
					},
					{
						name: "Adamantine Key",
						chance: 0.04
					},
					{
						name: "Vampire Fangs",
						chance: 0.1
					},
					{
						name: "Red Gem",
						chance: 0.05
					},
					{
						name: "Blue Gem",
						chance: 0.05
					},
					{
						name: "Purple Gem",
						chance: 0.025
					},
					{
						name: "Venom",
						chance: 0.075
					},
				]
			},
			{
				name: "Demon",
				sprite: 'assets/enemies/Demon.gif',
				weapon: null,
				health: 6666,
				attack: 666,
				defense: 666,
				crit: 0.33,
				accuracy: 0.66,
				skills: [
					{
						name: "Punch",
						chance: 0.55,
						attack: true
					},
					{
						name: "Flaming Fist",
						pstatus: ["🔥"],
						damage: 1.66,
						chance: 0.15,
						wait: 1,
						attack: true
					},
					{
						name: "Pummel",
						pstatus: ["💫", "🌀"],
						damage: 0.33,
						times: 3,
						chance: 0.15,
						wait: 2,
						attack: true
					},
					{
						name: "Sinister Hex",
						pstatus: ["🥀", "🖤", "🌑", "🩼"],
						chance: 0.075,
						wait: 3,
						attack: false
					},
					{
						name: "Enrage",
						estatus: ["💢", "🍀", "💗", "🏅", "🎯"],
						chance: 0.075,
						attack: false,
						wait: 2
					},
					{
						name: "Damnation",
						pstatus: ["🖤", "🌀", "🌑"],
						damage: 0.33,
						times: 6,
						chance: 0.05,
						attack: true,
						wait: 4
					},
				],
				drops: [
					{
						name: null,
						chance: 0.6
					},
					{
						name: "Platinum Key",
						chance: 0.06
					},
					{
						name: "Adamantine Key",
						chance: 0.04
					},
					{
						name: "Demon Horn",
						chance: 0.10
					},
					{
						name: "Red Gem",
						chance: 0.06
					},
					{
						name: "Blue Gem",
						chance: 0.06
					},
					{
						name: "Purple Gem",
						chance: 0.035
					},
					{
						name: "Mana Infused Crystal",
						chance: 0.045
					},
				]
			},
			{
				name: "Werewolf",
				sprite: 'assets/enemies/Werewolf.gif',
				weapon: null,
				health: 7500,
				attack: 500,
				defense: 750,
				crit: 0.35,
				accuracy: 0.65,
				skills: [
					{
						name: "Bite",
						chance: 0.55,
						attack: true
					},
					{
						name: "Slash",
						pstatus: ["🩸"],
						damage: 1.5,
						chance: 0.20,
						attack: true
					},
					{
						name: "Crippling Bite",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 2,
						chance: 0.1,
						wait: 1,
						attack: true
					},
					{
						name: "Howl",
						estatus: ["🏅", "🍀", "💗", "🎯", "🛡️", "💪"],
						chance: 0.15,
						attack: false,
						wait: 6
					},
				],
				drops: [
					{
						name: null,
						chance: 0.6
					},
					{
						name: "Platinum Key",
						chance: 0.07
					},
					{
						name: "Adamantine Key",
						chance: 0.04
					},
					{
						name: "Werewolf Claw",
						chance: 0.9
					},
					{
						name: "Red Gem",
						chance: 0.06
					},
					{
						name: "Blue Gem",
						chance: 0.06
					},
					{
						name: "Purple Gem",
						chance: 0.035
					},
					{
						name: "Cloth",
						chance: 0.035
					},
				]
			},
			{
				name: "Witch",
				sprite: 'assets/enemies/Witch.gif',
				weapon: null,
				health: 3333,
				attack: 333,
				defense: 400,
				crit: 0.1,
				accuracy: 0.7,
				skills: [
					{
						name: "Whack",
						chance: 0.35,
						attack: true
					},
					{
						name: "Poisonous Potion",
						pstatus: ["💀"],
						damage: 0.5,
						chance: 0.075,
						wait: 4,
						attack: true
					},
					{
						name: "Sleeping Potion",
						pstatus: ["💫", "🌀"],
						damage: 0.33,
						chance: 0.075,
						wait: 1,
						attack: true
					},
					{
						name: "Restoration Potion",
						estatus: ["💗"],
						health: 0.05,
						chance: 0.075,
						wait: 2,
						attack: false
					},
					{
						name: "Voodoo Stab",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.2,
						attack: true
					},
					{
						name: "Hex",
						pstatus: ["🥀", "🖤"],
						chance: 0.075,
						attack: false,
						wait: 3
					},
					{
						name: "Mysterious Concoction",
						get estatus() {
							let ret = ["💗", "🛡️", "🎯", "💢", "🍀", "💨", "🏅", "💪"]
								.filter(() => Math.random() < 0.7)
								.slice(0, Math.max(1, 6))
							if (ret.length === 0) ret.push("💗")
							return ret;
						},
						chance: 0.075,
						wait: 4,
						attack: false
					},
					{
						name: "Potion Barrage",
						get pstatus() {
							let ret = ["💫", "💀", "🩸", "🔥", "👁️", "🌀", "🩼", "🥀", "🖤"]
								.filter(() => Math.random() < 0.7)
								.slice(0, Math.max(1, 6))
							if (ret.length === 0) ret.push("💫")
							return ret;
						},
						damage: 0.33,
						times: 6,
						chance: 0.075,
						attack: true,
						wait: 5
					},
				],
				drops: [
					{
						name: null,
						chance: 0.6
					},
					{
						name: "Platinum Key",
						chance: 0.09
					},
					{
						name: "Adamantine Key",
						chance: 0.05
					},
					{
						name: "Mana Infused Crystal",
						chance: 0.02
					},
					{
						name: "Witch Crystal",
						chance: 0.06
					},

					{
						name: "Red Gem",
						chance: 0.05
					},
					{
						name: "Blue Gem",
						chance: 0.05
					},
					{
						name: "Purple Gem",
						chance: 0.025
					},
					{
						name: "Purification Gem",
						chance: 0.025
					},
					{
						name: "Venom",
						chance: 0.05
					},

				]
			},
			{
				name: "Cow",
				sprite: 'assets/enemies/Cow.gif',
				weapon: null,
				health: 110,
				attack: 40,
				defense: 50,
				crit: 0.2,
				accuracy: 0.7,
				skills: [
					{
						name: "Moo",
						chance: 0.45,
						attack: false
					},
					{
						name: "Moo+",
						estatus: ["💗", "💪", "💢"],
						chance: 0.05,
						attack: false
					},
					{
						name: "Ram",
						chance: 0.5,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.3
					},
					{
						name: "Milk",
						chance: 0.7
					}
				]
			},
			{
				name: "Sheep",
				sprite: 'assets/enemies/Sheep.gif',
				weapon: null,
				health: 70,
				attack: 25,
				defense: 95,
				crit: 0.1,
				accuracy: 0.65,
				skills: [
					{
						name: "Baa",
						chance: 0.45,
						attack: false
					},
					{
						name: "Baa+",
						estatus: ["💗", "🛡️", "🎯"],
						chance: 0.05,
						attack: false
					},
					{
						name: "Kick",
						chance: 0.5,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.3
					},
					{
						name: "Wool",
						chance: 0.7
					}
				]
			},
			{
				name: "Chicken",
				sprite: 'assets/enemies/Chicken.gif',
				weapon: null,
				health: 20,
				attack: 15,
				defense: 15,
				crit: 0.65,
				accuracy: 0.8,
				skills: [
					{
						name: "Cluck",
						chance: 0.45,
						attack: false
					},
					{
						name: "Cluck+",
						estatus: ["💗", "🍀", "💨"],
						chance: 0.05,
						attack: false
					},
					{
						name: "Peck",
						chance: 0.5,
						attack: true
					},
				],
				drops: [
					{
						name: null,
						chance: 0.3
					},
					{
						name: "Egg",
						chance: 0.7
					}
				]
			},
			{
				name: "Cyclops Overlord",
				sprite: 'assets/enemies/CyclopsOverlord.gif',
				weapon: null,
				health: 500,
				attack: 90,
				defense: 125,
				crit: 0.3,
				accuracy: 0.65,
				skills: [
					{
						name: "Swing",
						chance: 0.55,
						attack: true
					},
					{
						name: "Stomp",
						damage: 1.15,
						pstatus: ["👁️"],
						chance: 0.15,
						wait: 1,
						attack: true
					},
					{
						name: "Slam",
						damage: 1.5,
						pstatus: ["💫", "🩼"],
						chance: 0.075,
						wait: 2,
						attack: true
					},
					{
						name: "Rally",
						estatus: ["🛡️", "🎯", "💪"],
						chance: 0.1,
						attack: false,
						wait: 3
					},
					{
						name: "Roar",
						estatus: ["💢"],
						damage: 0.7,
						chance: 0.1,
						wait: 3,
						attack: true
					},
					{
						name: "Flex",
						estatus: ["🏅", "🍀"],
						chance: 0.075,
						attack: false,
						wait: 1
					},
				],
				drops: [
					{
						name: null,
						chance: 0.3
					},
					{
						name: "Wooden Key",
						chance: 0.35
					},
					{
						name: "Iron Key",
						chance: 0.25
					},
					{
						name: "Golden Key",
						chance: 0.1
					},



				]
			},
			{
				name: "Fox King",
				sprite: 'assets/enemies/FoxKing.gif',
				weapon: null,
				health: 4750,
				attack: 375,
				defense: 325,
				crit: 0.2,
				accuracy: 0.70,
				skills: [
					{
						name: "Slash",
						chance: 0.45,
						attack: true
					},
					{
						name: "Poison Smoke Bomb",
						pstatus: ["👁️", "💀"],
						chance: 0.05,
						attack: false,
						wait: 4
					},
					{
						name: "Lock In",
						estatus: ["🎯", "💨", "🍀", "💪"],
						chance: 0.15,
						attack: false,
						wait: 5
					},
					{
						name: "Sly Blitz",
						damage: 0.3,
						times: 12,
						chance: 0.1,
						wait: 2,
						attack: true
					},
					{
						name: "Fatal Slash",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 2,
						chance: 0.1,
						attack: true,
						wait: 1
					},
				],
				drops: [
					{
						name: null,
						chance: 0.25
					},
					{
						name: "Iron Key",
						chance: 0.35
					},
					{
						name: "Golden Key",
						chance: 0.25
					},

					{
						name: "Platinum Key",
						chance: 0.15
					},


				]
			},
			{
				name: "Goblin King",
				sprite: 'assets/enemies/GoblinKing.gif',
				weapon: null,
				health: 7777,
				attack: 777,
				defense: 777,
				crit: 0.44,
				accuracy: 0.77,
				skills: [
					{
						name: "Smash",
						chance: 0.3,
						attack: true
					},
					{
						name: "King’s Wraith",
						damage: 0.77,
						times: 3,
						chance: 0.1,
						attack: true,
						wait: 1
					},
					{
						name: "Grounding Stun",
						pstatus: ["💫"],
						damage: 1.1,
						chance: 0.05,
						attack: true,
						wait: 2
					},
					{
						name: "Crippling Strike",
						pstatus: ["🌀", "🩼"],
						damage: 1.3,
						chance: 0.15,
						wait: 1,
						attack: true
					},
					{
						name: "Dirty Trick",
						pstatus: ["🥀", "👁️"],
						damage: 1.3,
						chance: 0.1,
						wait: 2,
						attack: true
					},
					{
						name: "Entitled Royal",
						estatus: ["💢", "🏅", "💪"],
						chance: 0.15,
						attack: false,
						wait: 4
					},
					{
						name: "Heal",
						health: 0.17,
						chance: 0.075,
						attack: false,
						wait: 20
					},
					{
						name: "Restoration",
						estatus: ["💗", "✨"],
						health: 0.07,
						chance: 0.075,
						attack: false,
						wait: 15
					},
				],
				drops: [
					{
						name: null,
						chance: 0.2
					},
					{
						name: "Golden Key",
						chance: 0.4
					},
					{
						name: "Platinum Key",
						chance: 0.25
					},
					{
						name: "Adamantine Key",
						chance: 0.15
					},



				]
			},
			{
				name: "Demon Queen",
				sprite: 'assets/enemies/DemonQueen.gif',
				weapon: null,
				health: 13666,
				attack: 999,
				defense: 999,
				crit: 0.66,
				accuracy: 0.85,
				skills: [
					{
						name: "Slap",
						chance: 0.5,
						attack: true
					},
					{
						name: "Cursed Hell Flames",
						pstatus: ["🔥", "🖤"],
						damage: 0.66,
						times: 3,
						chance: 0.20,
						attack: true,
						wait: 2
					},
					{
						name: "Choke Slam",
						pstatus: ["💫", "🌀"],
						damage: 1.66,
						chance: 0.1,
						attack: true,
						wait: 3
					},
					{
						name: "Queen's Gaze",
						pstatus: ["🥀", "👁️", "🌀", "🌑", "💫"],
						chance: 0.05,
						attack: false,
						wait: 4
					},
					{
						name: "Demonic Embrace",
						estatus: ["💢", "🍀", "💗", "✨", "🛡️"],
						health: 0.1,
						chance: 0.05,
						attack: false,
						wait: 2
					},
					{
						name: "Eternal Damnation",
						pstatus: ["🖤", "🩸"],
						times: 13,
						damage: 0.33,
						chance: 0.025,
						attack: true,
						wait: 2
					},
					{
						name: "Queenly Humiliation",
						estatus: ["🏅"],
						pstatus: ["🌀", "💫", "🌑"],
						damage: 0.9,
						chance: 0.05,
						attack: true,
						wait: 4
					},
					{
						name: "Royal Dropkick",
						pstatus: ["🌀", "💫", "🩼"],
						damage: 2,
						chance: 0.025,
						attack: true,
						wait: 3
					},
				],
				drops: [
					{
						name: null,
						chance: 0.15
					},
					{
						name: "Golden Key",
						chance: 0.35
					},
					{
						name: "Platinum Key",
						chance: 0.3
					},
					{
						name: "Adamantine Key",
						chance: 0.2
					},




				]
			},
		],

		areas: [
			{
				name: "Warhamshire",
				minlvl: 1,
				maxlvl: 5,
				enemies: [
					{
						name: "Cow",
						chance: 0.05
					},
					{
						name: "Chicken",
						chance: 0.05
					},
					{
						name: "Lazy Goblin",
						chance: 0.25
					},
					{
						name: "Health Slime",
						chance: 0.25
					},
					{
						name: "Attack Slime",
						chance: 0.25
					}
				],
				chests: [
					{
						chest: 0,
						chance: 0.05,
						keyChance: 0.02,
						key: "Wooden Key"
					},
					{
						chest: 1,
						chance: 0.03,
						keyChance: 0.01,
						key: "Iron Key"
					},
				]
			},
			{
				name: "Warham Castle",
				minlvl: 5,
				maxlvl: 10,
				enemies: [
					{
						name: "Cyclops Overlord",
						chance: 0.02
					},
					{
						name: "Cow",
						chance: 0.06
					},
					{
						name: "Sheep",
						chance: 0.06
					},
					{
						name: "Chicken",
						chance: 0.06
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.14
					},
					{
						name: "Lazy Goblin",
						chance: 0.14
					},
					{
						name: "Health Slime",
						chance: 0.14
					},
					{
						name: "Attack Slime",
						chance: 0.14
					},
					{
						name: "Defense Slime",
						chance: 0.14
					},
				],
				chests: [
					{
						chest: 0,
						chance: 0.05,
						keyChance: 0.02,
						key: "Wooden Key"
					},
					{
						chest: 1,
						chance: 0.03,
						keyChance: 0.01,
						key: "Iron Key"
					},
				]
			},
			{
				name: "Hinterland",
				minlvl: 8,
				maxlvl: 14,
				enemies: [
					{
						name: "Orange Fox",
						chance: 0.01
					},
					{
						name: "Orc",
						chance: 0.04
					},
					{
						name: "Cow",
						chance: 0.05
					},
					{
						name: "Sheep",
						chance: 0.05
					},
					{
						name: "Chicken",
						chance: 0.05
					},
					{
						name: "Health Slime",
						chance: 0.14
					},
					{
						name: "Attack Slime",
						chance: 0.14
					},
					{
						name: "Defense Slime",
						chance: 0.14
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.14
					},
					{
						name: "Lazy Goblin",
						chance: 0.14
					},
				],
				chests: [
					{
						chest: 1,
						chance: 0.06,
						keyChance: 0.01,
						key: "Iron Key"
					},
					{
						chest: 2,
						chance: 0.02,
						keyChance: 0.01,
						key: "Golden Key"
					},
				]
			},
			{
				name: "Uralan Mountains",
				minlvl: 12,
				maxlvl: 18,
				enemies: [
					{
						name: "Orc",
						chance: 0.05
					},
					{
						name: "Cow",
						chance: 0.05
					},
					{
						name: "Sheep",
						chance: 0.05
					},
					{
						name: "Chicken",
						chance: 0.05
					},
					{
						name: "White Fox",
						chance: 0.14
					},
					{
						name: "Blue Fox",
						chance: 0.14
					},
					{
						name: "Attack Slime",
						chance: 0.14
					},
					{
						name: "Stamina Slime",
						chance: 0.14
					},
					{
						name: "Health Slime",
						chance: 0.14
					},
				],
				chests: [
					{
						chest: 1,
						chance: 0.045,
						keyChance: 0.01,
						key: "Iron Key"
					},
					{
						chest: 2,
						chance: 0.035,
						keyChance: 0.01,
						key: "Golden Key"
					},
				]
			},
			{
				name: "Vulpeston",
				minlvl: 16,
				maxlvl: 22,
				enemies: [
					{
						name: "Cow",
						chance: 0.05
					},
					{
						name: "Sheep",
						chance: 0.05
					},
					{
						name: "Chicken",
						chance: 0.05
					},
					{
						name: "Health Slime",
						chance: 0.15
					},
					{
						name: "Orange Fox",
						chance: 0.16
					},
					{
						name: "White Fox",
						chance: 0.16
					},
					{
						name: "Blue Fox",
						chance: 0.16
					},
					{
						name: "Attack Slime",
						chance: 0.16
					},
					{
						name: "Stamina Slime",
						chance: 0.16
					},
				],
				chests: [
					{
						chest: 1,
						chance: 0.03,
						keyChance: 0.01,
						key: "Iron Key"
					},
					{
						chest: 2,
						chance: 0.035,
						keyChance: 0.01,
						key: "Golden Key"
					},
				]
			},
			{
				name: "Vulpes Tower",
				minlvl: 21,
				maxlvl: 29,
				enemies: [
					{
						name: "Fox King",
						chance: 0.03
					},
					{
						name: "Cow",
						chance: 0.05
					},
					{
						name: "Sheep",
						chance: 0.05
					},
					{
						name: "Chicken",
						chance: 0.05
					},
					{
						name: "Orange Fox",
						chance: 0.12
					},
					{
						name: "White Fox",
						chance: 0.12
					},
					{
						name: "Blue Fox",
						chance: 0.12
					},
					{
						name: "Attack Slime",
						chance: 0.12
					},
					{
						name: "Stamina Slime",
						chance: 0.12
					},
					{
						name: "Health Slime",
						chance: 0.12
					},
				],
				chests: [
					{
						chest: 1,
						chance: 0.03,
						keyChance: 0.01,
						key: "Iron Key"
					},
					{
						chest: 2,
						chance: 0.05,
						keyChance: 0.01,
						key: "Golden Key"
					},
				]
			},
			{
				name: "Vexadel",
				minlvl: 30,
				maxlvl: 35,
				enemies: [
					{
						name: "Cow",
						chance: 0.06
					},
					{
						name: "Sheep",
						chance: 0.06
					},
					{
						name: "Chicken",
						chance: 0.06
					},
					{
						name: "Lazy Goblin",
						chance: 0.09
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.09
					},
					{
						name: "Armored Goblin",
						chance: 0.09
					},
					{
						name: "Cursed Goblin",
						chance: 0.09
					},
					{
						name: "Health Slime",
						chance: 0.09
					},
					{
						name: "Attack Slime",
						chance: 0.09
					},
					{
						name: "Stamina Slime",
						chance: 0.09
					},
					{
						name: "Defense Slime",
						chance: 0.09
					},
				],
				chests: [
					{
						chest: 2,
						chance: 0.025,
						keyChance: 0.025,
						key: "Golden Key"
					},
					{
						chest: 3,
						chance: 0.025,
						keyChance: 0.025,
						key: "Platinum Key"
					},
				]
			},
			{
				name: "Vexadel Gaillard",
				minlvl: 35,
				maxlvl: 40,
				enemies: [
					{
						name: "Goblin King",
						chance: 0.02
					},
					{
						name: "Orc",
						chance: 0.04
					},
					{
						name: "Armored Goblin",
						chance: 0.12
					},
					{
						name: "Cursed Goblin",
						chance: 0.12
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.12
					},
					{
						name: "Attack Slime",
						chance: 0.12
					},
					{
						name: "Stamina Slime",
						chance: 0.12
					},
					{
						name: "Defense Slime",
						chance: 0.12
					},
					{
						name: "Health Slime",
						chance: 0.12
					},
				],
				chests: [
					{
						chest: 2,
						chance: 0.03,
						keyChance: 0.03,
						key: "Golden Key"
					},
					{
						chest: 3,
						chance: 0.02,
						keyChance: 0.02,
						key: "Platinum Key"
					},
				]
			},
			{
				name: "Sanguisuge",
				minlvl: 40,
				maxlvl: 45,
				enemies: [
					{
						name: "Cursed Goblin",
						chance: 0.1
					},
					{
						name: "Attack Slime",
						chance: 0.1
					},
					{
						name: "Stamina Slime",
						chance: 0.1
					},
					{
						name: "Health Slime",
						chance: 0.1
					},
					{
						name: "Defense Slime",
						chance: 0.1
					},
					{
						name: "Vampire",
						chance: 0.1
					},
					{
						name: "Demon",
						chance: 0.1
					},
					{
						name: "Werewolf",
						chance: 0.1
					},
					{
						name: "Witch",
						chance: 0.1
					},
				],
				chests: [
					{
						chest: 3,
						chance: 0.05,
						keyChance: 0.03,
						key: "Platinum Key"
					},
					{
						chest: 4,
						chance: 0.01,
						keyChance: 0.02,
						key: "Adamantine Key"
					},
				]
			},
			{
				name: "Sangston Mansion",
				minlvl: 45,
				maxlvl: 50,
				enemies: [
					{
						name: "Demon Queen",
						chance: 0.1
					},
					{
						name: "Cursed Goblin",
						chance: 0.2
					},
					{
						name: "Witch",
						chance: 0.2
					},
					{
						name: "Vampire",
						chance: 0.2
					},
					{
						name: "Demon",
						chance: 0.2
					},
					{
						name: "Werewolf",
						chance: 0.2
					},
				],
				chests: [
					{
						chest: 3,
						chance: 0.03,
						keyChance: 0.02,
						key: "Platinum Key"
					},
					{
						chest: 4,
						chance: 0.03,
						keyChance: 0.01,
						key: "Adamantine Key"
					},
				]
			},
			{
				name: "Eternal Damnation",
				minlvl: 50,
				maxlvl: 50,
				enemies: [] // Um...all of them.
			}
		],

		items: [
			// WEAPONS
			{
				name: "Hands",
				maxlvl: 1,
				minlvl: 1,
				description: "The enemies can catch these hands.",

				attack: 0,
				attackPerLevel: 0,
				crit: 0.05,
				critdmg: 1.6,
				accuracy: 0.8,

				skills: [
					{
						name: "Punch",
						attack: true
					},
					{
						name: "Kick",
						cost: 5,
						description: "A complementary can of kick-ass.",
						damage: 1.2,
						attack: true
					},
					{
						name: "Relieve",
						cost: 10,
						description: "Stop and crack your knuckles.",
						flatHealth: 100,
						attack: false
					},
				]
			},
			{
				name: "Twig",
				maxlvl: 5,
				minlvl: 1,

				attack: 2,
				attackPerLevel: 2,
				crit: 0.1,
				critdmg: 1.3,
				accuracy: 0.9,

				description: "A stick.",
				skills: [
					{
						name: "Whack",
						attack: true
					},
					{
						name: "Poke Eye",
						description: "Poke 'em in the eye.",
						cost: 10,
						damage: 0.6,
						estatus: ["👁️"],
						attack: true
					},
					{
						name: "Thwack",
						description: "Thwack them with your stick!",
						cost: 15,
						damage: 1.25,
						attack: true
					},
					{
						name: "Treat Wounds",
						description: "Rub some dirt on your wounds.",
						cost: 10,
						flatHealth: 120,
						attack: false
					},
				]
			},
			{
				name: "Branch",
				maxlvl: 8,
				minlvl: 1,

				attack: 5,
				attackPerLevel: 2,
				crit: 0.05,
				critdmg: 1.5,
				accuracy: 0.9,

				description: "A heftier stick.",
				skills: [
					{
						name: "Whack",
						attack: true
					},
					{
						name: "Hefty Swing",
						description: "Batter up!",
						cost: 15,
						damage: 1.4,
						attack: true
					},
					{
						name: "Barbaric Shout",
						description: "Scream at the top of your lungs.",
						pstatus: ["💪"],
						cost: 10,
						attack: false
					},
					{
						name: "Treat Wounds",
						description: "Rub some dirt on your wounds.",
						cost: 15,
						flatHealth: 120,
						attack: false
					},
				]
			},
			{
				name: "Broken Dagger",
				maxlvl: 10,
				minlvl: 2,

				attack: 10,
				attackPerLevel: 2,
				crit: 0.2,
				critdmg: 1.65,
				accuracy: 0.85,

				description: "A mysteriously sharpened broken dagger.",
				skills: [
					{
						name: "Stab",
						attack: true
					},
					{
						name: "Hope For The Best",
						description: "Hope for the best.",
						cost: 10,
						pstatus: ["🍀"],
						attack: false
					},
					{
						name: "Wild Stab",
						description: "Stabby stabby stab.",
						estatus: ["🩸"],
						damage: 0.7,
						cost: 20,
						attack: true
					},
					{
						name: "Treat Wounds",
						description: "Rub some dirt on your wounds.",
						cost: 15,
						flatHealth: 120,
						attack: false
					},
				]
			},
			{
				name: "Rusty Dagger",
				maxlvl: 10,
				minlvl: 4,

				attack: 15,
				attackPerLevel: 2,
				crit: 0.1,
				critdmg: 1.6,
				accuracy: 0.9,

				description: "A dagger that's lost its edge due to rust, but is still useable.",
				skills: [
					{
						name: "Stab",
						attack: true
					},
					{
						name: "Slash",
						description: "Slice with ferocity.",
						cost: 15,
						damage: 1.5,
						attack: true
					},
					{
						name: "Kick",
						description: "Give 'em a roundhouse kick in the face!",
						estatus: ["🌀", "🩼"],
						damage: 0.65,
						cost: 25,
						attack: true
					},
					{
						name: "Treat Wounds",
						description: "Rub some dirt on your wounds.",
						cost: 15,
						flatHealth: 120,
						attack: false
					},
				]
			},
			{
				name: "Trusty Dagger",
				maxlvl: 12,
				minlvl: 6,
				description: "A clean dagger that feels reliable with a nicely sharpened edge.",

				attack: 20,
				attackPerLevel: 2,
				crit: 0.4,
				critdmg: 1.75,
				accuracy: 0.85,

				skills: [
					{
						name: "Double Slash",
						damage: 0.7,
						times: 2,
						attack: true
					},
					{
						name: "Swift Attack",
						description: "Stab faster than they can see!",
						cost: 15,
						damage: 0.4,
						times: 3,
						attack: true
					},
					{
						name: "Deep Slash",
						description: "Slash with ferocity.",
						cost: 10,
						damage: 1.1,
						estatus: ["🩸"],
						attack: true
					},
					{
						name: "Quick Fix",
						description: "Wrap your wound in cloth.",
						cost: 25,
						health: 0.1,
						attack: false
					},
				]
			},
			{
				name: "Perfect Stick",
				maxlvl: 12,
				minlvl: 6,
				description: "A truly magnificent stick. It naturally has the right amount of weight and rigidity.",

				attack: 30,
				attackPerLevel: 2,
				crit: 0.25,
				critdmg: 1.5,
				accuracy: 0.9,

				skills: [
					{
						name: "Perfect Whack",
						damage: 1.11,
						attack: true
					},
					{
						name: "Perfect Swing",
						description: "Swing at the the enemy with perfect trajectory.",
						cost: 20,
						damage: 1.25,
						pstatus: ["🎯"],
						attack: true
					},
					{
						name: "All or Nothing",
						description: "Put all your eggs in one basket.",
						cost: 40,
						pstatus: ["💫", "🌀"],
						damage: 3,
						attack: true
					},
					{
						name: "Quick Fix",
						description: "Wrap your wound in cloth.",
						cost: 25,
						health: 0.1,
						attack: false
					},
				]
			},
			{
				name: "Iron Short Sword",
				maxlvl: 14,
				minlvl: 6,
				description: "A polished short sword that was clearly in good care.",

				attack: 40,
				attackPerLevel: 4,
				crit: 0.3,
				critdmg: 1.4,
				accuracy: 0.85,

				skills: [
					{
						name: "Strike",
						damage: 1.15,
						attack: true
					},
					{
						name: "Double Strike",
						description: "Two-Sword Style.",
						cost: 25,
						times: 2,
						damage: 0.6,
						attack: true
					},
					{
						name: "Kick",
						description: "Foot!",
						estatus: ["🌀", "🩼"],
						cost: 25,
						damage: 0.65,
						attack: true
					},
					{
						name: "Determined Resolve",
						description: "Howl like the warrior you are!",
						cost: 20,
						pstatus: ["💗", "💪"],
						attack: false
					},
				]
			},
			{
				name: "Golden Stick",
				maxlvl: 45,
				minlvl: 25,
				description: "The absolute perfect stick with no imperfections. Made from a wood that is as shiny as gold.",

				attack: 221,
				attackPerLevel: 6,
				crit: 0.62,
				critdmg: 1.77,
				accuracy: 0.52,

				skills: [
					{
						name: "Golden Whack",
						damage: 1.25,
						attack: true
					},
					{
						name: "Golden Rush",
						description: "Bother the enemy to the finest several times.",
						cost: 177,
						times: 7,
						damage: 0.77,
						attack: true
					},
					{
						name: "Brandish",
						description: "Show off your weapon and use it to reflect light into the enemy's eye.",
						cost: 30,
						pstatus: ["💢"],
						estatus: ["👁️"],
						attack: false
					},
					{
						name: "Golden Standard",
						description: "You are perfect, so act like it.",
						pstatus: ["🍀", "🎯"],
						cost: 77,
						flatHealth: 777,
						attack: false
					},
				]
			},
			{
				name: "Dual Daggers",
				maxlvl: 24,
				minlvl: 13,
				description: "A pair of iron daggers that looks as if they are to be used in tandem.",

				attack: 58,
				attackPerLevel: 4,
				crit: 0.1,
				critdmg: 1.75,
				accuracy: 0.75,

				skills: [
					{
						name: "Swift Strike",
						damage: 0.75,
						times: 2,
						attack: true,
					},
					{
						name: "Swift Barrage",
						description: "Unleash a quick barrage of slashes.",
						cost: 25,
						estatus: ["🩸"],
						times: 5,
						damage: 0.55,
						attack: true
					},
					{
						name: "Rogue’s Gambit",
						description: "You're a winner!",
						cost: 77,
						pstatus: ["🍀", "🌀"],
						attack: false
					},
					{
						name: "Quick Fix",
						description: "Wrap your wound in cloth.",
						cost: 25,
						health: 0.1,
						attack: false
					},
				]
			},
			{
				name: "Dual Hatchets",
				maxlvl: 24,
				minlvl: 13,
				description: "A pair of lumberjack hatches good for damage!",

				attack: 78,
				attackPerLevel: 4,
				crit: 0.1,
				critdmg: 1.60,
				accuracy: 0.85,

				skills: [
					{
						name: "Hack",
						damage: 1.1,
						attack: true,
					},
					{
						name: "Ferocious Combo",
						description: "Strike the axes together and rush the enemy.",
						cost: 50,
						damage: 0.8,
						estatus: ["🩸"],
						times: 3,
						attack: true
					},
					{
						name: "Berserker's Cry",
						description: "Let out an intimidating shout.",
						cost: 60,
						pstatus: ["💢"],
						estatus: ["🌀"],
						attack: false
					},
					{
						name: "Walk it Off",
						description: "Grit your teeth and power through the pain.",
						cost: 45,
						health: 0.2,
						attack: false
					}
				]
			},
			{
				name: "Iron Sword",
				maxlvl: 27,
				minlvl: 15,
				description: "A heavy-weight classic weapon of attack and defense.",

				attack: 106,
				attackPerLevel: 4,
				crit: 0.2,
				critdmg: 1.45,
				accuracy: 0.8,

				skills: [
					{
						name: "Strike",
						attack: true
					},
					{
						name: "Triple Strike",
						description: "Poke poke poke.",
						cost: 40,
						damage: 0.8,
						times: 3,
						attack: true
					},
					{
						name: "Knight's Resolve",
						description: "Read yourself for combat.",
						cost: 35,
						pstatus: ["💪", "💗", "🛡️", "🏅"],
						attack: false
					},
					{
						name: "Grit",
						description: "Grit your teeth and power through the pain.",
						cost: 45,
						flatHealth: 175,
						attack: false
					}
				]
			},
			{
				name: "Wooden Bow",
				maxlvl: 32,
				minlvl: 19,
				description: "A lightweight ranged weapon to get your enemies from afar.",

				attack: 130,
				attackPerLevel: 6,
				crit: 0.45,
				critdmg: 1.25,
				accuracy: 0.75,

				skills: [
					{
						name: "Barrage",
						damage: 0.45,
						times: 3,
						attack: true
					},
					{
						name: "Jackpot",
						description: "Unleash a powerful shot concentrated on an enemy's weakpoint.",
						cost: 77,
						damage: 2,
						pstatus: ["🍀"],
						estatus: ["🌀", "🩸", "🩼"],
						attack: true
					},
					{
						name: "Rapid Barrage",
						description: "Swiftly fire multiple arrows.",
						cost: 55,
						damage: 0.2,
						times: 9,
						attack: true
					},
					{
						name: "Combat Heal",
						description: "Utilize medic knowledge to heal your wounds.",
						cost: 45,
						health: 0.05,
						pstatus: ["💗"],
						attack: false
					},
				]
			},
			{
				name: "Lumberjack Axe",
				maxlvl: 32,
				minlvl: 19,
				description: "A lumberjack's best friend.",

				attack: 194,
				attackPerLevel: 6,
				crit: 0.05,
				critdmg: 1.75,
				accuracy: 0.85,

				skills: [
					{
						name: "Swing",
						damage: 1.2,
						attack: true
					},
					{
						name: "Almighty Swing",
						description: "Swing your axe with full force.",
						estatus: ["🩼"],
						cost: 90,
						damage: 2.25,
						attack: true,
					},
					{
						name: "Rallying Shout",
						description: "Let out a mighty yell.",
						cost: 40,
						pstatus: ["🏅", "🛡️"],
						attack: false
					},
					{
						name: "Hearty Breakfast",
						description: "Pull out your lunchbox and chomp down on a bacon omelet and grits.",
						cost: 30,
						pstatus: ["💫", "💢", "💗"],
						health: 0.15,
						attack: false
					}
				]
			},
			{
				name: "Silver Dagger",
				maxlvl: 32,
				minlvl: 19,
				description: "A knife colored silver. Great for murder!",

				attack: 169,
				attackPerLevel: 6,
				crit: 0.2,
				critdmg: 1.4,
				accuracy: 0.9,

				skills: [
					{
						name: "Stab",
						damage: 0.95,
						attack: true
					},
					{
						name: "Swift Assault",
						description: "Quickly attack the enemy.",
						cost: 40,
						times: 3,
						damage: 0.75,
						estatus: ["🩸"],
						attack: true
					},
					{
						name: "Poison Cloud",
						description: "Throw a poison smoke bomb.",
						cost: 50,
						damage: 0.8,
						estatus: ["🌀", "👁️", "💀"],
						attack: true
					},
					{
						name: "Combat Heal",
						description: "Utilize medic knowledge to heal your wounds.",
						cost: 30,
						health: 0.05,
						pstatus: ["💗"],
						attack: false
					},
				]
			},
			{
				name: "Martial Arts",
				maxlvl: 40,
				minlvl: 25,
				description: "A close-quarter combat ‘weapon’ mainly used for defensive strategies.",

				attack: 253,
				attackPerLevel: 8,
				crit: 0.25,
				critdmg: 1.45,
				accuracy: 0.9,

				skills: [
					{
						name: ["Back Fist", "Elbow Strike", "Hammer Fist", "Haymaker Punch", "Hook Punch", "Jab Punch", "Knife Hand Strike", "Palm Strike", "Slap", "Straight Punch", "Uppercut Punch"][Math.floor(Math.random() * 11)],
						attack: true
					},
					{
						name: "Fighter's Mix",
						description: "A barrage of punches.",
						cost: 60,
						damage: 0.6,
						times: 4,
						attack: true
					},
					{
						name: "Gut Punch",
						description: "Powerful swing to the stomach of the enemy.",
						cost: 80,
						damage: 1.2,
						estatus: ["🌀"],
						pstatus: ["🏅"],
						attack: true
					},
					{
						name: "Walk it Off",
						description: "Grit your teeth and power through the pain.",
						cost: 45,
						health: 0.2,
						attack: false
					}
				]
			},
			{
				name: "Chainsaw",
				maxlvl: 40,
				minlvl: 26,
				description: "A heavy-duty cutting tool with teeth set on a chain which moves around the edge of a blade.",

				attack: 360,
				attackPerLevel: 8,
				crit: 0.5,
				critdmg: 1.1,
				accuracy: 0.75,

				skills: [
					{
						name: "Saw",
						damage: 0.3,
						times: 5,
						attack: true
					},
					{
						name: "Rampage",
						description: "Charge the enemy while swinging your chainsaw.",
						estatus: ["🩸"],
						cost: 90,
						times: 10,
						damage: 0.45,
						attack: true
					},
					{
						name: "Headbutt",
						description: "Headbutt the enemy before swinging your chainsaw.",
						cost: 40,
						estatus: ["🌀", "👁️"],
						damage: 1.4,
						attack: true
					},
					{
						name: "Murderous Intent",
						description: "Remain an unstoppable force through the power of uncanny determination.",
						cost: 80,
						pstatus: ["✨", "💢"],
						health: 0.25,
						attack: false
					}
				]
			},
			{
				name: "Great Sword",
				maxlvl: 36,
				minlvl: 28,
				description: "A standard super-sized weapon used for disabling great foes!",

				attack: 237,
				attackPerLevel: 6,
				crit: 0.2,
				critdmg: 1.4,
				accuracy: 0.9,

				skills: [
					{
						name: "Slash",
						damage: 1.15,
						attack: true
					},
					{
						name: "Heavy Slash",
						description: "Send forth a powerful swing with your oversized blade.",
						cost: 45,
						damage: 2,
						estatus: ["🩸"],
						attack: true
					},
					{
						name: "Shoulder Bash",
						description: "Ram the enemy with a shoulder.",
						cost: 20,
						estatus: ["🌀"],
						damage: 0.6,
						health: 0.05,
						attack: true
					},
					{
						name: "Royal Knight's Resolve",
						description: "Take a stance and gather your focus to heighten your abilities.",
						cost: 30,
						pstatus: ["🏅", "💗", "🛡️"],
						attack: false
					},
				]
			},
			{
				name: "Skull Crusher",
				maxlvl: 36,
				minlvl: 28,
				description: "Sometimes big problems require a just as big simple solution like a giant hammer.",

				attack: 387,
				attackPerLevel: 6,
				crit: 0.1,
				critdmg: 2,
				accuracy: 0.75,

				skills: [
					{
						name: "CRUSH",
						damage: 1.3,
						attack: true
					},
					{
						name: "Immense Impact",
						description: "Slam your hammer down on a foe with all your might.",
						estatus: ["💫", "🩼"],
						cost: 115,
						damage: 1.8,
						attack: true
					},
					{
						name: "Sinister Grin",
						description: "Lower weapon and give the enemy a 2 free swings while smiling.",
						cost: 55,
						pstatus: ["💢", "🏅"],
						attack: false
					},
					{
						name: "Walk it Off",
						description: "Grit your teeth and power through the pain.",
						cost: 45,
						health: 0.2,
						attack: false
					}
				]
			},
			{
				name: "Twin Swords",
				maxlvl: 40,
				minlvl: 30,
				description: "Short-ranged dual weaponry for classic double strikes.",

				attack: 252,
				attackPerLevel: 8,
				crit: 0.35,
				critdmg: 1.4,
				accuracy: 0.8,

				skills: [
					{
						name: "Twin Slash",
						damage: 0.7,
						times: 2,
						attack: true,
					},
					{
						name: "Stylish Barrage",
						description: "Unleash a swift barrage of attacks that feel very cool to do.",
						estatus: ["🩸"],
						cost: 80,
						times: 6,
						damage: 0.45,
						attack: true
					},
					{
						name: "Plot Armor",
						description: "Nothing can get to you with the power of god and anime on your side.",
						cost: 60,
						pstatus: ["🎯", "🍀", "💨"],
						estatus: ["👁️"]
					},
					{
						name: "Recovery",
						description: "Utilize medic knowledge to heal your wounds.",
						cost: 50,
						health: 0.15,
						pstatus: ["💗"],
						attack: false
					},
				]
			},
			{
				name: "Spiked Gauntlets",
				maxlvl: 40,
				minlvl: 30,
				description: "A pair of gloves laced with knuckle spikes for a deadly victory.",

				attack: 355,
				attackPerLevel: 8,
				crit: 0.15,
				critdmg: 1.23,
				accuracy: 0.8,

				skills: [
					{
						name: "Knuckle Sandwich",
						damage: 0.6,
						times: 2,
						attack: true,
					},
					{
						name: "3-Piece Combo",
						cost: 55,
						description: "Use your hands to give the enemy a 3 piece combo with sauce.",
						estatus: ["🩸"],
						times: 3,
						damage: 0.75,
						attack: true
					},
					{
						name: "Serve Dessert",
						cost: 75,
						description: "A powerful knee aimed at the enemy's face.",
						pstatus: ["💢"],
						estatus: ["🌀", "👁️"],
						damage: 1.23,
						attack: true
					},
					{
						name: "Snack Break",
						description: "Pull out a protein bar and enjoy.",
						cost: 70,
						health: 0.25,
						attack: false
					}
				]
			},
			{
				name: "Ninja Arts",
				maxlvl: 50,
				minlvl: 32,
				description: "A survivability combat martial art ‘weapon’ mainly used for concealment and offensive survival strategies.",

				attack: 359,
				attackPerLevel: 8,
				crit: 0.66,
				critdmg: 1.33,
				accuracy: 0.66,

				skills: [
					{
						name: "Shuriken",
						damage: 0.25,
						times: 5,
						attack: true,
					},
					{
						name: "Clean Cut",
						cost: 70,
						description: "A swift and precise slash through the enemy.",
						damage: 1.6,
						estatus: ["🩸", "🩼"],
						attack: true
					},
					{
						name: "Coated Shuriken",
						cost: 45,
						description: "Rapidly throw a variety of shuriken at the foe.",
						damage: 0.25,
						times: 9,
						estatus: ["🌀", "💀"],
						attack: true
					},
					{
						name: "Body Replacement",
						cost: 90,
						description: "Kawarimi no Jutsu",
						pstatus: ["💗", "💨", "✨"],
						health: 0.1,
						attack: false
					}
				]
			},
			{
				name: "Holy Spear",
				maxlvl: 50,
				minlvl: 32,
				description: "A famous weapon given to the leaders of crusades and it’s imbued with the ability to strengthen its wielder utilizing their willpower.",

				attack: 325,
				attackPerLevel: 8,
				crit: 0.22,
				critdmg: 1.77,
				accuracy: 0.88,

				skills: [
					{
						name: "Pierce",
						damage: 1.11,
						attack: true,
					},
					{
						name: "Righteous Indignation",
						description: "Confidently charge forth and pierce through your foe.",
						estatus: ["🩼"],
						cost: 77,
						damage: 1.5,
						attack: true
					},
					{
						name: "Rally",
						cost: 60,
						description: "Declare your utter refusal to give up and convince yourself victory is possible.",
						pstatus: ["🏅", "💪", "🛡️"],
						attack: false
					},
					{
						name: "Unyielding Will",
						description: "Remain an unstoppable force through the power of uncanny determination.",
						cost: 80,
						pstatus: ["✨"],
						health: 0.25,
						attack: false
					}
				]
			},
			{
				name: "Cursed Bone Bow",
				maxlvl: 50,
				minlvl: 32,
				description: "An unholy weapon made from the bones of the dead with a mysterious ability to make arrows poisonous if shot in quick succession.",

				attack: 252,
				attackPerLevel: 8,
				crit: 0.1,
				critdmg: 2,
				accuracy: 0.88,

				skills: [
					{
						name: "Quick Shot",
						damage: 1.13,
						attack: true,
					},
					{
						name: "Fatal Shot",
						cost: 99,
						description: "Unleash a powerful shot that weakens the enemy.",
						estatus: ["🩸", "🌀", "🥀"],
						damage: 1.66,
						attack: true
					},
					{
						name: "Cursed Barrage",
						cost: 66,
						description: "Rapidly fire arrows.",
						estatus: ["🖤"],
						damage: 0.33,
						times: 6,
						attack: true
					},
					{
						name: "Steady Resolve",
						cost: 60,
						description: "Steady your breathing and gather your focus.",
						pstatus: ["💗", "💨"],
						health: 0.1,
						attack: false
					}
				]
			},
			{
				name: "Cursed Fangs",
				maxlvl: 50,
				minlvl: 32,
				description: "A dual-wielded cursed dagger weapons made from the fangs of vampires and coated in demonic spiders venom to create a truly horrific combo.",

				attack: 380,
				attackPerLevel: 10,
				crit: 0.5,
				critdmg: 1.33,
				accuracy: 0.7,

				skills: [
					{
						name: "Shank",
						damage: 0.65,
						times: 2,
						attack: true,
					},
					{
						name: "Gouge",
						cost: 85,
						description: "A powerful slash that rips through the foe.",
						damage: 1.8,
						estatus: ["🩸", "🩼"],
						pstatus: ["💢"],
						attack: true
					},
					{
						name: "Draining Stabs",
						cost: 35,
						description: "Drive your fangs into your foe draining their blood and seeping poison into them.",
						estatus: ["🌀"],
						pstatus: ["🛡️"],
						damage: 0.6,
						times: 2,
						lifesteal: 0.5,
						attack: true
					},
					{
						name: "Steady Resolve",
						cost: 60,
						description: "Steady your breathing and gather your focus.",
						pstatus: ["💗", "💨"],
						health: 0.1,
						attack: false
					}
				]
			},
			{
				name: "Evil Pulverizer",
				maxlvl: 50,
				minlvl: 38,
				description: "A holy hammer apparently used by the most righteous as a way for a quick end to evil to limit the suffering of all.",

				attack: 1333,
				attackPerLevel: 10,
				crit: 0.01,
				critdmg: 3,
				accuracy: 0.7,

				skills: [
					{
						name: "SMITE",
						damage: 1.4,
						attack: true,
					},
					{
						name: "Almighty Smite",
						cost: 180,
						description: "Jump and crush your foe with all your strength aided by gravity.",
						damage: 3,
						estatus: ["🌀", "🔥", "🩼"],
						attack: true
					},
					{
						name: "Quick Prayer",
						cost: 50,
						description: "Stop to quickly pray for strength and forgiveness for your enemy.",
						estatus: ["✨", "🍀", "🛡️"],
						pstatus: ["🏅", "💪", "💗", "🎯"],
						attack: false
					},
					{
						name: "Shake It Off",
						description: "I shake it off, I- I-, I shake it off.",
						cost: 45,
						health: 0.1,
						attack: false
					}
				]
			},
			{
				name: "Demonic Nunchucks",
				maxlvl: 50,
				minlvl: 40,
				description: "A weapon once used by highly talented demons that practiced martial arts.",

				attack: 546,
				attackPerLevel: 10,
				crit: 0.21,
				critdmg: 2.22,
				accuracy: 0.66,

				skills: [
					{
						name: "Heated Chain",
						damage: 0.25,
						times: 4,
						attack: true,
					},
					{
						name: "Blazing Fury",
						description: "Ignite your weapon before unleashing a blazing series of attacks.",
						cost: 100,
						damage: 0.66,
						times: 6,
						pstatus: ["💢"],
						estatus: ["🌑", "🖤", "🔥"],
						attack: true
					},
					{
						name: "Heating Up",
						cost: 66,
						description: "Unleash a series of attacks against your enemy that doubles as a warm up.",
						damage: 0.33,
						times: 3,
						pstatus: ["💪", "🍀", "🎯"],
						attack: true
					},
					{
						name: "Swift Recovery",
						cost: 60,
						description: "Steady your breathing and gather your focus.",
						pstatus: ["💗", "💨"],
						health: 0.1,
						attack: false
					}
				]
			},
			{
				name: "Holy Arts",
				maxlvl: 50,
				minlvl: 40,
				description: "An ancient art of imbuing your body with holy energy to smite foes with your bare hands, unfortunately you could only learn how to kick with it.",

				attack: 500,
				attackPerLevel: 10,
				crit: 0.15,
				critdmg: 1.77,
				accuracy: 0.77,

				skills: [
					{
						name: "Light Kick",
						damage: 1.22,
						attack: true
					},
					{
						name: "Blazing Bicycle Kick",
						description: "Leap forth to deliver a devastating kick imbued with holy energy to the foe.",
						cost: 100,
						damage: 0.77,
						times: 7,
						estatus: ["🔥"],
						attack: true
					},
					{
						name: "Golden Spartan Kick",
						description: "Imbue your leg with holy energy before unleashing a powerful, and blinding, kick to your foe.",
						cost: 77,
						damage: 1.40,
						estatus: ["🔥", "🌀", "👁️", "🩼"],
						pstatus: ["🏅", "🛡️"],
						attack: true
					},
					{
						name: "Unyielding Will",
						description: "Remain an unstoppable force through the power of uncanny determination.",
						cost: 80,
						pstatus: ["✨"],
						health: 0.25,
						attack: false
					}
				]
			},
			{
				name: "Orcus",
				maxlvl: 50,
				minlvl: 45,
				description: "A weapon of devastating power fabled to once been wielded by the bringer of death himself. The mere presence of this weapon siphons the life from the area.",

				attack: 616,
				attackPerLevel: 10,
				crit: 0.33,
				critdmg: 1.66,
				accuracy: 0.66,

				skills: [
					{
						name: "Reap",
						damage: 1.33,
						attack: true,
					},
					{
						name: "Destined Death",
						cost: 200,
						description: "Focus immense power into the Orcus before swinging it to unleash a condensed wave of cursed energy.",
						damage: 6.66,
						estatus: ["🌑", "🖤", "🥀", "🩼"],
						pstatus: ["🎯"],
						attack: true
					},
					{
						name: "Draining Slash",
						cost: 66,
						times: 6,
						description: "A heavy strike that steals the life of the enemy to invigorate the wielder.",
						damage: 0.66,
						estatus: ["🩸", "🌀"],
						pstatus: ["💪", "🛡️"],
						lifesteal: 0.5,
						attack: true
					},
					{
						name: "Dark Reconstruction",
						cost: 113,
						description: "Engulfs the caster in a black substance that seems to replace missing parts and reconfigure their body to partial intangibility.",
						health: 0.4,
						pstatus: ["💨"],
						attack: false
					}
				]
			},
			{
				name: "Iris & Hermes",
				maxlvl: 50,
				minlvl: 45,
				description: "A weapon also known simply as the Holy Messengers, thought to be made for cleansing the world of evil and anything else that threatens the balance.",

				attack: 727,
				attackPerLevel: 10,
				crit: 0.25,
				critdmg: 1.77,
				accuracy: 0.77,

				skills: [
					{
						name: "Twin Fire",
						damage: 0.77,
						times: 2,
						attack: true,
					},
					{
						name: "Twin Banishing Shot",
						cost: 148,
						description: "Supercharge Iris & Hermes to fire a bright and powerful beam of holy energy from each barrel.",
						estatus: ["👁️", "🔥"],
						pstatus: ["🏅"],
						damage: 1.77,
						times: 2,
						attack: true
					},
					{
						name: "Sacred Barrage",
						cost: 77,
						description: "Receive a minor blessing and fire off a quick burst of holy blasts at the enemy.",
						estatus: ["🔥"],
						pstatus: ["🍀", "🎯"],
						damage: 0.77,
						times: 7,
						attack: true
					},
					{
						name: "Divine Restoration",
						cost: 99,
						description: "Receive a major blessing and restore health to the user.",
						pstatus: ["✨", "🛡️", "💗", "💪"],
						health: 0.2,
						attack: false
					}
				]
			},
			{
				name: "Alectrona & Melanie",
				maxlvl: 50,
				minlvl: 45,
				description: "Two legendary swords of conflicting power brought together in an irrational combo. Can you truly harness the power of light & dark without consequence?",

				attack: 625,
				attackPerLevel: 10,
				crit: 0.15,
				critdmg: 1.25,
				accuracy: 0.76,

				skills: [
					{
						name: "Duality",
						get damage() { return [0.66, 0.77][Math.floor(Math.random() * 2)] },
						get times() { return Math.ceil(Math.random() * 2) },
						attack: true,
					},
					{
						name: "Yin and Yang",
						cost: 111,
						description: "Point Melanie or Alectrona upwards then unleashes its power which creates a massive blade of light or darkness before slamming it down on to the enemy and strengthening its wielder.\n\nRandomized for each turn:\nInflict Cursed, Bad Omen, Bad Luck, and Weakness\nOR\nInflict Burn, Blindness, and Bleed.\n\nThen, Gain Berserk and Evasion\nOR\nGain Blessing, Fortitude, Empowerment, and Luck",
						damage: 3,
						get estatus() { return [["🖤", "🌑", "🥀", "🌀"], ["🔥", "👁️"]][Math.floor(Math.random() * 2)] },
						get pstatus() { return [["💢", "💨"], ["✨", "🍀", "🛡️", "🏅"]][Math.floor(Math.random() * 2)] },
						attack: true
					},
					{
						name: "Exalted Flash",
						cost: 77,
						Estatus: ["🩼"],
						description: "Unleash insanely fast identical strikes that strengthens the wielder.",
						damage: 0.77,
						times: 7,
						attack: true
					},
					{
						name: "Meditation",
						cost: 67,
						description: "User partially stabilizes the cursed and holy energy swirling within them from the two swords.",
						pstatus: ["💗", "🎯"],
						health: 0.1,
						attack: false
					}
				]
			},

			// ARMOR

			{
				name: "None",
				description: "Go commando.",

				defense: 0,
				maxlvl: 1,
				minlvl: 1,
				alvlmult: 1,
				evasion: 0,
				synergies: []
			},
			{
				name: "Tattered Rags",
				description: "Torn clothing together enough to cover the most important part and keep warm.",

				defense: 10,
				maxlvl: 10,
				minlvl: 1,
				alvlmult: 3,
				evasion: 0.06,

				synergies: [
					{
						weapon: "Twig",
						name: "Sneaky",
						evasion: 0.03,
					},
					{
						weapon: "Branch",
						name: "Heavy",
						defense: 50,
					},
				]
			},
			{
				name: "Damaged Cloak",
				description: "A brown cloak that seems to have been used extensively based on the heavily faded color and abundant tears",

				defense: 14,
				maxlvl: 10,
				minlvl: 1,
				alvlmult: 3,
				evasion: 0.01,

				synergies: [
					{
						weapon: "Broken Dagger",
						name: "Lucky",
						crit: 0.03,
					},
					{
						weapon: "Rusty Dagger",
						name: "Heavy",
						defense: 50,
					},
				]
			},
			{
				name: "Rogues Cloak",
				description: "A brown cloak that's still in good condition that should provide light protection due to it's a strong fabric",

				defense: 29,
				maxlvl: 12,
				minlvl: 4,
				alvlmult: 3,
				evasion: 0.05,

				synergies: [
					{
						weapon: "Trusty Dagger",
						name: "Sneaky",
						evasion: 0.03,
					},
				]
			},
			{
				name: "Perfect Leaf",
				description: "A leaf with a vibrant hue of green, no missing leaves, damage, and an impressive shape that seems completely symmetrical it must be special.",

				defense: 18,
				maxlvl: 12,
				minlvl: 4,
				alvlmult: 3,
				evasion: 0.15,

				synergies: [
					{
						weapon: "Perfect Stick",
						name: "Sneaky",
						evasion: 0.03,
					},
				]
			},
			{
				name: "Padded Clothing",
				description: "Multiple layers of normal clothing sewn together to create a thick set shirt and pants , simple but surprisingly effective.",

				defense: 46,
				maxlvl: 14,
				minlvl: 6,
				alvlmult: 3,
				evasion: 0.05,

				synergies: [
					{
						weapon: "Iron Short Sword",
						name: "Heavy",
						defense: 50,
					},
				]
			},
			{
				name: "Confidence",
				description: "Who needs armor or even clothing for that fact when you have such a magnificently strong body and mind? Clearly not you since you're just that impressive of an individual.",

				defense: 183,
				maxlvl: 45,
				minlvl: 25,
				alvlmult: 12,
				evasion: 0.30,

				synergies: [
					{
						weapon: "Golden Stick",
						name: "Destructive",
						attack: 200,
					},
				]
			},
			{
				name: "Leather Armor",
				description: "A set of armor made from the tough hide of some kind of unlucky animal which provides good protect from a variety of attacks.",

				defense: 137,
				maxlvl: 24,
				minlvl: 13,
				alvlmult: 6,
				evasion: 0.1,

				synergies: [
					{
						weapon: "Dual Daggers",
						name: "Swift",
						evasion: 0.06,
					},
					{
						weapon: "Dual Hatchets",
						name: "Sharp",
						attack: 100,
					},
				]
			},
			{
				name: "Light Armor",
				description: "A set of leather armor that comes with a small set of metal coverings protecting most vital spots.",

				defense: 196,
				maxlvl: 28,
				minlvl: 15,
				alvlmult: 6,
				evasion: 0.1,

				synergies: [
					{
						weapon: "Iron Sword",
						name: "Stable",
						defense: 100,
					},
				]
			},
			{
				name: "Hunter Cloak",
				description: "A set of very light armor made from leather that provides decent protection without inhibiting mobility, topped of with a dark green cloak that conceals movement and provides even more protection.",

				defense: 179,
				maxlvl: 32,
				minlvl: 19,
				alvlmult: 9,
				evasion: 0.15,

				synergies: [
					{
						weapon: "Wooden Bow",
						name: "Smooth",
						crit: 0.09,
					},
				]
			},
			{
				name: "Assassin Cloak",
				description: "A black cloak made from a very light material with a set of padded clothing underneath.",

				defense: 179,
				maxlvl: 32,
				minlvl: 19,
				alvlmult: 9,
				evasion: 0.15,

				synergies: [
					{
						weapon: "Silver Dagger",
						name: "Sly",
						evasion: 0.09,
					},
				]
			},
			{
				name: "Lumberjack Attire",
				description: "A plaid long shirt and extra large black jeans a combo that just feels right for some unknown reason.",

				defense: 408,
				maxlvl: 38,
				minlvl: 26,
				alvlmult: 9,
				evasion: 0.1,

				synergies: [
					{
						weapon: "Lumberjack Axe",
						name: "Strong",
						defense: 150,
					},
				]
			},
			{
				name: "Thick Sleeveless Hoodie",
				description: "A very large black hoodie that had its sleeves cut off with a pair of baggy jeans.",

				defense: 297,
				maxlvl: 40,
				minlvl: 25,
				alvlmult: 4,
				evasion: 0.2,

				synergies: [
					{
						weapon: "Martial Arts",
						name: "Determined",
						crit: 0.12,
					},
				]
			},
			{
				name: "Leather Apron & Mask",
				description: "A stained apron made from leather and cloth facial covering that shields your nose and mouth.",

				defense: 574,
				maxlvl: 50,
				minlvl: 26,
				alvlmult: 12,
				evasion: 0.15,

				synergies: [
					{
						weapon: "Chainsaw",
						name: "Determined",
						crit: 0.12,
					},
				]
			},
			{
				name: "Iron Armor",
				description: "A full set of iron armor that protects your body from the neck down at the cost of mobility.",

				defense: 444,
				maxlvl: 38,
				minlvl: 26,
				alvlmult: 3,
				evasion: 0.05,

				synergies: [
					{
						weapon: "Great Sword",
						name: "Sturdy",
						defense: 150,
					},
					{
						weapon: "Skull Crusher",
						name: "Strong",
						attack: 150,
					},
				]
			},
			{
				name: "Dragon Cloak",
				description: "A stylish jet-black cloak made from an extremely durable material rumored to actually be acquired by slaying a black dragon.",

				defense: 312,
				maxlvl: 40,
				minlvl: 30,
				alvlmult: 12,
				evasion: 0.25,

				synergies: [
					{
						weapon: "Twin Swords",
						name: "Determined",
						crit: 0.12,
					},
				]
			},
			{
				name: "Spiked Leather Armor",
				description: "Leather armor that's thin at the joints and extremely thick at vitals providing a mix of both maneuverability and protection. Having the mini spikes on it is mostly a bonus.",

				defense: 569,
				maxlvl: 40,
				minlvl: 30,
				alvlmult: 12,
				evasion: 0.15,

				synergies: [
					{
						weapon: "Spiked Gauntlets",
						name: "Destructive",
						attack: 200,
					},
				]
			},
			{
				name: "Shinobi Garments",
				description: "The traditional attire of those who practice ninjutsu consisting of a black jacket, black trousers, light sandals, and a hooded cowl.",

				defense: 357,
				maxlvl: 50,
				minlvl: 30,
				alvlmult: 12,
				evasion: 0.25,

				synergies: [
					{
						weapon: "Ninja Arts",
						name: "Deceptive",
						evasion: 0.012,
					},
				]
			},
			{
				name: "Holy Knight Armor",
				description: "A shiny suit of iron armor that's been blessed by the holy church and made from the finest iron",

				defense: 714,
				maxlvl: 50,
				minlvl: 30,
				alvlmult: 12,
				evasion: 0.1,

				synergies: [
					{
						weapon: "Holy Spear",
						name: "Durable",
						defense: 200,
					},
					{
						weapon: "Evil Pulverizer",
						name: "Destructive",
						attack: 200,
					},
				]
			},
			{
				name: "Shadow Cloak",
				description: "A sinister dark clock that you're almost positive makes you look like a cultist.",

				defense: 420,
				maxlvl: 50,
				minlvl: 30,
				alvlmult: 12,
				evasion: 0.2,

				synergies: [
					{
						weapon: "Cursed Bone Bow",
						name: "Determined",
						crit: 0.12,
					},
					{
						weapon: "Cursed Fangs",
						name: "Deceptive",
						evasion: 0.12,
					},
				]
			},
			{
				name: "Blessed Gi",
				description: "A martial artist Gi that has been extensively blessed by the church till it's been imbued holy energy.",

				defense: 767,
				maxlvl: 50,
				minlvl: 40,
				alvlmult: 15,
				evasion: 0.2,

				synergies: [
					{
						weapon: "Holy Arts",
						name: "Unbreakable",
						defense: 250,
					},
				]
			},
			{
				name: "Sinner Jacket",
				description: "A badass biker jacket with a dragon decal on the back. It's oozing an intangible black substance.",

				defense: 383,
				maxlvl: 50,
				minlvl: 40,
				alvlmult: 15,
				evasion: 0.3,

				synergies: [
					{
						weapon: "Demonic Nunchucks",
						name: "Unmatched",
						crit: 0.15,
					},
				]
			},
			{
				name: "Walking Church",
				description: "A sacred treasure of the Holy Church, it's a priest robe bestowed with a blessing of protection of the highest grade that virtually makes the robe indestructible while protecting the wearer from most forms of damage.",

				defense: 1350,
				maxlvl: 50,
				minlvl: 45,
				alvlmult: 15,
				evasion: 0,

				synergies: [
					{
						weapon: "Iris & Hermes",
						name: "Unmatched",
						crit: 0.15,
					},
				]
			},
			{
				name: "Black Mourning",
				description: "A black hooded cloak that's constantly secreting a black fog that's unnaturally cold to the touch. Instincts alone is enough to know this isn't a normal cloak...",

				defense: 270,
				maxlvl: 50,
				minlvl: 45,
				alvlmult: 15,
				evasion: 0.4,

				synergies: [
					{
						weapon: "Orcus",
						name: "Undetectable",
						evasion: 0.015,
					},
				]
			},
			{
				name: "Equinox",
				description: "An impossible robe that has been imbued with holy and unholy energy, carefully crafted by an unknown seamstress.",

				defense: 810,
				maxlvl: 50,
				minlvl: 45,
				alvlmult: 15,
				evasion: 0.2,

				synergies: [
					{
						weapon: "Alectrona & Melanie",
						name: "Unity",
						crit: 0.077,
						evasion: 0.066,
					},
					{
						weapon: "Orcus",
						name: "Undetectable",
						evasion: 0.15,
					},
					{
						weapon: "Iris & Hermes",
						name: "Unmatched",
						crit: 0.15,
					},
				]
			},

			// Stamina
			{
				name: "Light Stamina Potion",
				stamina: 0.15,
				battle: true
			},
			{
				name: "Medium Stamina Potion",
				stamina: 0.3,
				battle: true,
				craft: ["Yellow Goo", "Water Bottle"]
			},
			{
				name: "Heavy Stamina Potion",
				stamina: 0.5,
				battle: true,
				craft: ["Yellow Goo", "Milk", "Empty Bottle"]
			},
			{
				name: "Great Stamina Potion",
				stamina: 0.7,
				battle: true,
				craft: ["Yellow Goo", "Witch Crystal", "Milk", "Empty Bottle"]
			},
			{
				name: "Grand Stamina Potion",
				stamina: 0.9,
				battle: true
			},
			// Health
			{
				name: "Light Health Potion",
				health: 0.15,
				battle: true
			},
			{
				name: "Medium Health Potion",
				health: 0.25,
				battle: true,
				craft: ["Green Goo", "Water Bottle"]
			},
			{
				name: "Heavy Health Potion",
				health: 0.5,
				battle: true,
				craft: ["Green Goo", "Egg", "Empty Bottle"]
			},
			{
				name: "Great Health Potion",
				health: 0.7,
				battle: true,
				craft: ["Green Goo", "Vampire Fang", "Egg", "Empty Bottle"]
			},
			{
				name: "Grand Health Potion",
				health: 0.9,
				battle: true
			},
			// Defense
			{
				name: "Light Defense Potion",
				def: 0.15,
				rounds: 3,
				battle: true
			},
			{
				name: "Medium Defense Potion",
				def: 0.3,
				rounds: 3,
				battle: true,
				craft: ["Blue Goo", "Water Bottle"]
			},
			{
				name: "Heavy Defense Potion",
				def: 0.5,
				rounds: 3,
				battle: true,
				craft: ["Blue Goo", "Egg", "Empty Bottle"]
			},
			{
				name: "Great Defense Potion",
				def: 0.7,
				rounds: 3,
				battle: true,
				craft: ["Green Goo", "Demon Horn", "Egg", "Empty Bottle"]
			},
			{
				name: "Grand Defense Potion",
				def: 0.9,
				rounds: 3,
				battle: true
			},
			// Attack
			{
				name: "Light Attack Potion",
				buff: 0.15,
				rounds: 3,
				battle: true
			},
			{
				name: "Medium Attack Potion",
				buff: 0.3,
				rounds: 3,
				battle: true,
				craft: ["Red Goo", "Water Bottle"]
			},
			{
				name: "Heavy Attack Potion",
				buff: 0.5,
				rounds: 3,
				battle: true,
				craft: ["Red Goo", "Milk", "Empty Bottle"]
			},
			{
				name: "Great Attack Potion",
				buff: 0.7,
				rounds: 3,
				battle: true,
				craft: ["Red Goo", "Werewolf Claw", "Milk", "Empty Bottle"]
			},
			{
				name: "Grand Attack Potion",
				buff: 0.9,
				rounds: 3,
				battle: true
			},
			// Energy
			{
				name: "Light Energy Potion",
				health: 0.15,
				stamina: 0.15,
				battle: true
			},
			{
				name: "Medium Energy Potion",
				health: 0.15,
				stamina: 0.3,
				battle: true
			},
			{
				name: "Heavy Energy Potion",
				health: 0.15,
				stamina: 0.5,
				battle: true
			},
			{
				name: "Great Energy Potion",
				health: 0.15,
				stamina: 0.7,
				battle: true
			},
			{
				name: "Grand Energy Potion",
				health: 0.15,
				stamina: 0.9,
				battle: true
			},
			// XP
			{
				name: "Light XP Potion",
				xp: 638
			},
			{
				name: "Medium XP Potion",
				xp: 5740
			},
			{
				name: "Heavy XP Potion",
				xp: 15943
			},
			{
				name: "Great XP Potion",
				xp: 31250
			},
			{
				name: "Grand XP Potion",
				xp: 51658
			},
			// Chest Keys
			{
				name: "Wooden Key",
				sprite: "assets/keys/WoodenKey.gif",
				chest: 0
			},
			{
				name: "Iron Key",
				sprite: "assets/keys/IronKey.gif",
				chest: 1
			},
			{
				name: "Golden Key",
				sprite: "assets/keys/GoldenKey.gif",
				chest: 2
			},
			{
				name: "Platinum Key",
				sprite: "assets/keys/PlatinumKey.gif",
				chest: 3
			},
			{
				name: "Adamantine Key",
				sprite: "assets/keys/AdamantineKey.gif",
				chest: 4
			},

			// Craftables
			{
				name: "Molotov",
				craft: ["Cloth", "Booze"],
				damage: 350,
				estatus: ["🔥"],
				battle: true
			},
			{
				name: "Ordinary Bomb",
				craft: ["Gunpowder", "Sticky Solution", "Empty Bottle"],
				damage: 420,
				battle: true
			},
			{
				name: "Pepper Bomb",
				craft: ["Gunpowder", "Sticky Solution", "Empty Bottle", "Pepper"],
				damage: 400,
				estatus: ["👁️"],
				battle: true
			},
			{
				name: "Shrapnel Bomb",
				craft: ["Gunpowder", "Sticky Solution", "Empty Bottle", "Whetstone"],
				damage: 450,
				estatus: ["🩸"],
				battle: true
			},
			{
				name: "Purifying Flask",
				craft: ["Purified Salt", "Sticky Solution", "Water Bottle"],
				battle: true
			},
			{
				name: "Purifying Water",
				craft: ["Purified Salt", "Water Bottle"],
				battle: true
			},
			{
				name: "Poison Bomb",
				estatus: ["💀"],
				craft: ["Venom", "Booze"],
				damage: 260,
				battle: true
			},
			{
				name: "Cloth",
				craft: ["Wool", "Wool"],
				uses: ["Molotov", "Whetstone & Polish", "Wool"]
			},
			{
				name: "Purple Gem",
				craft: ["Red Gem", "Blue Gem"]
			},
			{
				name: "Sticky Solution",
				craft: ["Yellow Goo", "Green Goo", "Blue Goo", "Red Goo", "Empty Bottle"]
			},
			{
				name: "Mana Infused Crystal",
				craft: ["Witch Crystal", "Werewolf Claw", "Demon Horn", "Vampire Fang"],
			},
			{
				name: "Enchanting Crystal",
				craft: ["Mana Infused Crystal", "Sticky Solution", "Water Bottle"]
			},
			{
				name: "Purification Gem",
				craft: ["Purple Gem", "Sticky Solution", "Purifying Water"]
			},
			{
				name: "Whetstone & Polish",
				craft: ["Whetstone", "Sticky Solution", "Water Bottle", "Cloth"]
			},
			// Drops
			{
				name: "Yellow Goo",
			},
			{
				name: "Green Goo",
			},
			{
				name: "Blue Goo",
			},
			{
				name: "Red Goo",
			},
			{
				name: "Pepper",
			},
			{
				name: "Wool",
			},
			{
				name: "Milk",
			},
			{
				name: "Egg",
			},
			{
				name: "Vampire Fang",
			},
			{
				name: "Demon Horn",
			},
			{
				name: "Werewolf Claw",
			},
			{
				name: "Witch Crystal",
			},
			{
				name: "Red Gem",
			},
			{
				name: "Blue Gem",
			},
			{
				name: "Water Bottle",
			},
			{
				name: "Booze",
			},
			{
				name: "Empty Bottle",
			},
			{
				name: "Venom",
			},
			{
				name: "Purified Salt",
			},
			{
				name: "Gunpowder",
			},
			{
				name: "Whetstone",
			}
		],

		chests: [
			{
				name: "Wooden Chest",
				sprite: "https://media.discordapp.net/attachments/1116445708279615641/1129864897514176603/Copper_Chest.gif",
				tier: 1,
				key: "Wooden Key",
				drops: [
					{
						name: "Rusty Dagger",
						chance: 0.12
					},
					{
						name: "Trusty Dagger",
						chance: 0.08
					},

					{
						name: "Perfect Stick",
						chance: 0.04
					},
					{
						name: "Damaged Cloak",
						chance: 0.12
					},
					{
						name: "Rogues Cloak",
						chance: 0.08
					},
					{
						name: "Perfect Leaf",
						chance: 0.04
					},
					{
						name: "Light Stamina Potion",
						chance: 0.02
					},
					{
						name: "Light Health Potion",
						chance: 0.02
					},
					{
						name: "Light Attack Potion",
						chance: 0.02
					},
					{
						name: "Light Defense Potion",
						chance: 0.02
					},
					{
						name: "Light Energy Potion",
						chance: 0.02
					},
					{
						name: "Light XP Potion",
						chance: 0.02
					},
					{
						name: "Medium Stamina Potion",
						chance: 0.01
					},
					{
						name: "Medium Health Potion",
						chance: 0.01
					},
					{
						name: "Medium Attack Potion",
						chance: 0.01
					},
					{
						name: "Medium Defense Potion",
						chance: 0.01
					},

					{
						name: "Medium Energy Potion",
						chance: 0.01
					},
					{
						name: "Medium XP Potion",
						chance: 0.01
					},
					{
						name: "Empty Bottle",
						chance: 0.025
					},
					{
						name: "Water Bottle",
						chance: 0.025
					},
					{
						name: "Booze",
						chance: 0.025
					},
					{
						name: "Pepper",
						chance: 0.025
					},
					{
						name: "Venom",
						chance: 0.025
					},
					{
						name: "Gunpowder",
						chance: 0.025
					},
					{
						name: "Ordinary Bomb",
						chance: 0.07
					},
					{
						name: "Pepper Bomb",
						chance: 0.04
					},
					{
						name: "Molotov",
						chance: 0.04
					},
					{
						name: "Wooden Key",
						chance: 0.01
					},
					{
						name: "Silver Key",
						chance: 0.02
					},
					{
						name: "Golden Key",
						chance: 0.01
					},
				]
			},
			{
				name: "Iron Chest",
				sprite: "https://cdn.discordapp.com/attachments/1116445708279615641/1129867273725808670/Silver_Chest.gif",
				tier: 2,
				key: "Iron Key",
				drops: [
					{
						name: "Iron Short Sword",
						chance: 0.1
					},
					{
						name: "Dual Daggers",
						chance: 0.05
					},
					{
						name: "Dual Hatchets",
						chance: 0.05
					},
					{
						name: "Padded Clothing",
						chance: 0.1
					},
					{
						name: "Leather Armor",
						chance: 0.1
					},
					{
						name: "Light Stamina Potion",
						chance: 0.015
					},
					{
						name: "Light Health Potion",
						chance: 0.015
					},
					{
						name: "Light Attack Potion",
						chance: 0.015
					},
					{
						name: "Light Defense Potion",
						chance: 0.015
					},
					{
						name: "Light Energy Potion",
						chance: 0.015
					},
					{
						name: "Light XP Potion",
						chance: 0.015
					},
					{
						name: "Medium Stamina Potion",
						chance: 0.01
					},
					{
						name: "Medium Health Potion",
						chance: 0.01
					},
					{
						name: "Medium Attack Potion",
						chance: 0.01
					},
					{
						name: "MedIum Defense Potion",
						chance: 0.01
					},
					{
						name: "Medium Energy Potion",
						chance: 0.01
					},
					{
						name: "Medium XP Potion",
						chance: 0.01
					},
					{
						name: "Heavy Stamina Potion",
						chance: 0.005
					},
					{
						name: "Heavy Health Potion",
						chance: 0.005
					},
					{
						name: "Heavy Attack Potion",
						chance: 0.005
					},
					{
						name: "Heavy Defense Potion",
						chance: 0.005
					},
					{
						name: "Heavy Energy Potion",
						chance: 0.005
					},
					{
						name: "Heavy XP Potion",
						chance: 0.005
					},
					{
						name: "Sticky Solution",
						chance: 0.01
					},
					{
						name: "Empty Bottle",
						chance: 0.02
					},
					{
						name: "Water Bottle",
						chance: 0.02
					},
					{
						name: "Booze",
						chance: 0.02
					},
					{
						name: "Pepper",
						chance: 0.02
					},
					{
						name: "Venom",
						chance: 0.02
					},
					{
						name: "Gunpowder",
						chance: 0.02
					},
					{
						name: "Purified Salt",
						chance: 0.01
					},
					{
						name: "Red Gem",
						chance: 0.02
					},
					{
						name: "Blue Gem",
						chance: 0.02
					},
					{
						name: "Purple Gem",
						chance: 0.01
					},
					{
						name: "Whetstone",
						chance: 0.01
					},
					{
						name: "Ordinary Bomb",
						chance: 0.02
					},
					{
						name: "Pepper Bomb",
						chance: 0.02
					},
					{
						name: "Poison Bomb",
						chance: 0.02
					},
					{
						name: "Shrapnel Bomb",
						chance: 0.02
					},
					{
						name: "Molotov",
						chance: 0.02
					},
					{
						name: "Wooden Key",
						chance: 0.01
					},
					{
						name: "Iron Key",
						chance: 0.05
					},
					{
						name: "Golden Key",
						chance: 0.04
					},
					{
						name: "Platinum Key",
						chance: 0.02
					},
				]
			},
			{
				name: "Golden Chest",
				sprite: "https://cdn.discordapp.com/attachments/1116445708279615641/1129897856048828426/New_Piskel.gif",
				tier: 3,
				key: "Golden Key",
				drops: [
					{
						name: "Iron Sword",
						chance: 0.05
					},
					{
						name: "Wooden Bow",
						chance: 0.02
					},
					{
						name: "Lumberjack Axe",
						chance: 0.02
					},
					{
						name: "Silver Knife",
						chance: 0.02
					},
					{
						name: "Golden Stick",
						chance: 0.01
					},
					{
						name: "Light Armor",
						chance: 0.05
					},
					{
						name: "Hunter Armor",
						chance: 0.02
					},
					{
						name: "LumberJack Attire",
						chance: 0.02
					},
					{
						name: "Assassins Cloak",
						chance: 0.02
					},
					{
						name: "Confidence",
						chance: 0.01
					},
					{
						name: "Medium Stamina Potion",
						chance: 0.015
					},
					{
						name: "Medium Health Potion",
						chance: 0.015
					},
					{
						name: "Medium Attack Potion",
						chance: 0.015
					},
					{
						name: "Medium Defense Potion",
						chance: 0.015
					},
					{
						name: "Medium Energy Potion",
						chance: 0.015
					},
					{
						name: "Medium XP Potion",
						chance: 0.015
					},
					{
						name: "Heavy Stamina Potion",
						chance: 0.01
					},
					{
						name: "Heavy Health Potion",
						chance: 0.01
					},
					{
						name: "Heavy Attack Potion",
						chance: 0.01
					},
					{
						name: "Heavy Defense Potion",
						chance: 0.01
					},
					{
						name: "Heavy Energy Potion",
						chance: 0.01
					},
					{
						name: "Heavy XP Potion",
						chance: 0.01
					},
					{
						name: "Great Stamina Potion",
						chance: 0.005
					},
					{
						name: "Great Health Potion",
						chance: 0.05
					},
					{
						name: "Great Attack Potion",
						chance: 0.005
					},
					{
						name: "Great Defense Potion",
						chance: 0.005
					},
					{
						name: "Great Energy Potion",
						chance: 0.005
					},
					{
						name: "Great XP Potion",
						chance: 0.005
					},
					{
						name: "Grand Stamina Potion",
						chance: 0.005
					},
					{
						name: "Grand Health Potion",
						chance: 0.005
					},
					{
						name: "Grand Attack Potion",
						chance: 0.005
					},
					{
						name: "Grand Defense Potion",
						chance: 0.005
					},
					{
						name: "Grand Energy Potion",
						chance: 0.005
					},
					{
						name: "Grand XP Potion",
						chance: 0.005
					},
					{
						name: "Sticky Solution",
						chance: 0.03
					},
					{
						name: "Gunpowder",
						chance: 0.02
					},
					{
						name: "Red Gem",
						chance: 0.02
					},
					{
						name: "Blue Gem",
						chance: 0.02
					},
					{
						name: "Purple Gem",
						chance: 0.01
					},
					{
						name: "Vampire Fang",
						chance: 0.01
					},
					{
						name: "Demon Horn",
						chance: 0.01
					},
					{
						name: "Werewolf Claw",
						chance: 0.01
					},
					{
						name: "Witch Crystal",
						chance: 0.01
					},
					{
						name: "Mana Infused Crystal",
						chance: 0.01
					},
					{
						name: "Purified Salt",
						chance: 0.02
					},
					{
						name: "Purification Gem",
						chance: 0.03
					},
					{
						name: "Whetstone",
						chance: 0.02
					},
					{
						name: "Whetstone & Polish",
						chance: 0.03
					},
					{
						name: "Ordinary Bomb",
						chance: 0.03
					},
					{
						name: "Poison Bomb",
						chance: 0.03
					},
					{
						name: "Shrapnel Bomb",
						chance: 0.03
					},
					{
						name: "Pepper Bomb",
						chance: 0.03
					},
					{
						name: "Purifying Flask",
						chance: 0.03
					},
					{
						name: "Purifying Water",
						chance: 0.03
					},
					{
						name: "Iron Key",
						chance: 0.01
					},
					{
						name: "Golden Key",
						chance: 0.01
					},
					{
						name: "Platinum Key",
						chance: 0.07
					},
					{
						name: "Adamantine Key",
						chance: 0.03
					}
				]
			},
			{
				name: "Platinum Chest",
				sprite: "https://cdn.discordapp.com/attachments/1116445708279615641/1129902606442057739/Platinum_Chest.gif",
				tier: 4,
				key: "Platinum Key",
				drops: [
					{
						name: "Martial Arts",
						chance: 0.02
					},
					{
						name: "Chainsaw",
						chance: 0.01
					},
					{
						name: "Twin Swords",
						chance: 0.02
					},
					{
						name: "Spiked Gauntlets",
						chance: 0.02
					},
					{
						name: "Ninja Arts",
						chance: 0.01
					},
					{
						name: "Holy Spear",
						chance: 0.01
					},
					{
						name: "Cursed Bone Bow",
						chance: 0.01
					},
					{
						name: "Thick Sleeveless Hoodie",
						chance: 0.02
					},
					{
						name: "Leather Apron & Mask",
						chance: 0.01
					},
					{
						name: "Dragon Cloak",
						chance: 0.02
					},
					{
						name: "Spiked Leather Armor",
						chance: 0.02
					},
					{
						name: "Shinobi Garments",
						chance: 0.01
					},
					{
						name: "Holy Knight Armor",
						chance: 0.01
					},
					{
						name: "Shadow Cloak",
						chance: 0.01
					},
					{
						name: "Heavy Stamina Potion",
						chance: 0.015
					},
					{
						name: "Heavy Health Potion",
						chance: 0.015
					},
					{
						name: "Heavy Attack Potion",
						chance: 0.015
					},
					{
						name: "Heavy Defense Potion",
						chance: 0.015
					},
					{
						name: "Heavy Energy Potion",
						chance: 0.015
					},
					{
						name: "Heavy XP Potion",
						chance: 0.015
					},
					{
						name: "Great Stamina Potion",
						chance: 0.01
					},
					{
						name: "Great Health Potion",
						chance: 0.01
					},
					{
						name: "Great Attack Potion",
						chance: 0.01
					},
					{
						name: "Great Defense Potion",
						chance: 0.01
					},
					{
						name: "Great Energy Potion",
						chance: 0.01
					},
					{
						name: "Great XP Potion",
						chance: 0.01
					},
					{
						name: "Grand Stamina Potion",
						chance: 0.005
					},
					{
						name: "Grand Health Potion",
						chance: 0.005
					},
					{
						name: "Grand Attack Potion",
						chance: 0.005
					},
					{
						name: "Grand Defense Potion",
						chance: 0.005
					},
					{
						name: "Grand Energy Potion",
						chance: 0.005
					},
					{
						name: "Grand XP Potion",
						chance: 0.005
					},
					{
						name: "Sticky Solution",
						chance: 0.03
					},
					{
						name: "Purple Gem",
						chance: 0.04
					},
					{
						name: "Purification Gem",
						chance: 0.05
					},
					{
						name: "Vampire Fang",
						chance: 0.03
					},
					{
						name: "Demon Horn",
						chance: 0.03
					},
					{
						name: "Werewolf Claw",
						chance: 0.03
					},
					{
						name: "Witch Crystal",
						chance: 0.03
					},
					{
						name: "Mana Infused Crystal",
						chance: 0.05
					},
					{
						name: "Enchanting Crystal",
						chance: 0.05
					},
					{
						name: "Purified Salt",
						chance: 0.02
					},
					{
						name: "Whetstone",
						chance: 0.03
					},
					{
						name: "Whetstone & Polish",
						chance: 0.05
					},
					{
						name: "Ordinary Bomb",
						chance: 0.02
					},
					{
						name: "Poison Bomb",
						chance: 0.02
					},
					{
						name: "Shrapnel Bomb",
						chance: 0.02
					},
					{
						name: "Pepper Bomb",
						chance: 0.02
					},
					{
						name: "Purifying Flask",
						chance: 0.02
					},
					{
						name: "Purifying Water",
						chance: 0.03
					},
					{
						name: "Golden Key",
						chance: 0.01
					},
					{
						name: "Platinum Key",
						chance: 0.02
					},
					{
						name: "Adamantine Key",
						chance: 0.02
					},
				]
			},
			{
				name: "Adamantine Chest",
				sprite: "https://cdn.discordapp.com/attachments/1116445708279615641/1129906645259006092/Adamantite_Chest.gif",
				tier: 5,
				key: "Adamantine Key",
				drops: [
					{
						name: "Cursed Fangs",
						chance: 0.03
					},
					{
						name: "Evil Pulverizer",
						chance: 0.03
					},
					{
						name: "Demonic Nunchucks",
						chance: 0.0175
					},
					{
						name: "Holy Arts",
						chance: 0.0175
					},
					{
						name: "Iris & Hermes",
						chance: 0.0055
					},
					{
						name: "Orcus",
						chance: 0.0055
					},
					{
						name: "Alectrona & Melanie",
						chance: 0.004
					},
					{
						name: "Holy Knight Armor",
						chance: 0.03
					},
					{
						name: "Shadow Cloak",
						chance: 0.03
					},
					{
						name: "Sinner Jacket",
						chance: 0.0175
					},
					{
						name: "Blessed Gi",
						chance: 0.0175
					},
					{
						name: "Walking Church",
						chance: 0.0055
					},
					{
						name: "Black Mourning",
						chance: 0.0055
					},
					{
						name: "Equinox",
						chance: 0.004
					},
					{
						name: "Heavy Stamina Potion",
						chance: 0.03
					},
					{
						name: "Heavy Health Potion",
						chance: 0.03
					},
					{
						name: "Heavy Attack Potion",
						chance: 0.03
					},
					{
						name: "Heavy Defense Potion",
						chance: 0.03
					},
					{
						name: "Heavy Energy Potion",
						chance: 0.03
					},
					{
						name: "Heavy XP Potion",
						chance: 0.03
					},
					{
						name: "Great Stamina Potion",
						chance: 0.02
					},
					{
						name: "Great Health Potion",
						chance: 0.02
					},
					{
						name: "Great Attack Potion",
						chance: 0.02
					},
					{
						name: "Great Defense Potion",
						chance: 0.02
					},
					{
						name: "Great Energy Potion",
						chance: 0.02
					},
					{
						name: "Great XP Potion",
						chance: 0.02
					},
					{
						name: "Grand Stamina Potion",
						chance: 0.01
					},
					{
						name: "Grand Health Potion",
						chance: 0.01
					},
					{
						name: "Grand Attack Potion",
						chance: 0.01
					},
					{
						name: "Grand Defense Potion",
						chance: 0.01
					},
					{
						name: "Grand Energy Potion",
						chance: 0.01
					},
					{
						name: "Grand XP Potion",
						chance: 0.01
					},
					{
						name: "Purple Gem",
						chance: 0.04
					},
					{
						name: "Mana Infused Gem",
						chance: 0.03
					},
					{
						name: "Enchanting Gem",
						chance: 0.03
					},
					{
						name: "Purifying Gem",
						chance: 0.04
					},
					{
						name: "Whetstone & Polish",
						chance: 0.03
					},
					{
						name: "Poison Bomb",
						chance: 0.04
					},
					{
						name: "Shrapnel Bomb",
						chance: 0.04
					},
					{
						name: "Pepper Bomb",
						chance: 0.04
					},
					{
						name: "Purified Salt",
						chance: 0.04
					},
					{
						name: "Purifying Flask",
						chance: 0.04
					},
					{
						name: "Purifying Water",
						chance: 0.04
					},
					{
						name: "Platinum Key",
						chance: 0.01
					},
					{
						name: "Adamantine Key",
						chance: 0.02
					},
				]
			}
		]
	}
}

const ASSETS_SHEET_ID = "1FbePsEGRNGkCG1p7KIpjTi0cpUsnaIWH"
const ASSET_SHEETS = [
	["Blocks", "blocks"],
	["Statuses", "statuses"],
	["Enemies", "enemies"],
	["Areas", "areas"],
	["Items", "items"],
	["Chests", "chests"],
]

const LEGACY_STATUS_ID_BY_NAME = {
	Poison: '💀',
	Regeneration: '💗',
	Bleed: '🩸',
	Burn: '🔥',
	Weakness: '🌀',
	Strength: '💪',
	Empowerment: '🏅',
	Stun: '💫',
	Rigidity: '🛡️',
	Fragility: '🩼',
	Blindness: '👁️',
	Acuity: '🎯',
	Curse: '🖤',
	Luck: '🍀',
	Misfortune: '🥀',
	Berserk: '💢',
	Evasion: '💨',
	Blessing: '✨',
	Malediction: '🌑',
}

var assetsCache = getLocalAssets();
// normalizeStatusReferences(assetsCache)

// console.log(assetsCache)

// let assetsLoadPromise = null
// function overwriteAssetsCache(nextAssets) {
// 	normalizeStatusReferences(nextAssets)

// 	for (const key of Object.keys(assetsCache)) {
// 		delete assetsCache[key]
// 	}

// 	for (const [key, value] of Object.entries(nextAssets)) {
// 		assetsCache[key] = value
// 	}
// }

// function parseExpressionValue(raw) {
// 	if (raw === null || raw === undefined) return raw
// 	if (typeof raw !== "string") return raw

// 	const text = raw.trim()
// 	if (!text.length) return undefined

// 	try {
// 		return Function(`"use strict"; return (${text});`)()
// 	} catch {
// 		return raw
// 	}
// }

// function fetchSheetTableWithJsonp(sheetName) {
// 	if (typeof document === "undefined" || typeof window === "undefined") {
// 		throw new Error("JSONP sheet loading requires a browser document context.")
// 	}

// 	return new Promise((resolve, reject) => {
// 		const callbackName = `__assetsGvizCallback_${Math.random().toString(36).slice(2)}`
// 		const timeoutMs = 15000
// 		let timeoutId = null

// 		const cleanup = () => {
// 			if (timeoutId) clearTimeout(timeoutId)
// 			try { delete window[callbackName] } catch { window[callbackName] = undefined }
// 			if (script.parentNode) script.parentNode.removeChild(script)
// 		}

// 		window[callbackName] = (payload) => {
// 			cleanup()
// 			if (payload?.status === "error") {
// 				reject(new Error(`Google Sheets returned an error for '${sheetName}': ${payload.errors?.[0]?.detailed_message || payload.errors?.[0]?.message || "unknown error"}`))
// 				return
// 			}

// 			if (!payload?.table) {
// 				reject(new Error(`Google Sheets returned no table data for '${sheetName}'.`))
// 				return
// 			}

// 			resolve(payload.table)
// 		}

// 		const params = new URLSearchParams({
// 			sheet: sheetName,
// 			headers: "0",
// 			tqx: `responseHandler:${callbackName};out:json`,
// 		})

// 		const script = document.createElement("script")
// 		script.src = `https://docs.google.com/spreadsheets/d/${ASSETS_SHEET_ID}/gviz/tq?${params.toString()}`
// 		script.async = true
// 		script.onerror = () => {
// 			cleanup()
// 			reject(new Error(`Failed to load Google Sheets script for '${sheetName}'.`))
// 		}

// 		timeoutId = setTimeout(() => {
// 			cleanup()
// 			reject(new Error(`Timed out loading Google Sheets data for '${sheetName}'.`))
// 		}, timeoutMs)

// 		document.head.appendChild(script)
// 	})
// }

// function tableToObjects(table) {
// 	const rows = table?.rows || []
// 	if (!rows.length) return []

// 	let headerRowIndex = -1
// 	for (let index = 0; index < rows.length; index++) {
// 		const cells = rows[index]?.c || []
// 		const hasAnyHeaderCell = cells.some((cell) => {
// 			const value = cell?.v
// 			return value !== null && value !== undefined && String(value).trim().length > 0
// 		})
// 		if (hasAnyHeaderCell) {
// 			headerRowIndex = index
// 			break
// 		}
// 	}

// 	if (headerRowIndex === -1) return []

// 	const headerCells = rows[headerRowIndex]?.c || []
// 	const headers = headerCells.map((cell) => (cell?.v ?? "").toString().trim())

// 	const objects = []
// 	for (let rowIndex = headerRowIndex + 1; rowIndex < rows.length; rowIndex++) {
// 		const row = rows[rowIndex]
// 		if (!row || !row.c) continue

// 		const out = {}
// 		let hasValue = false

// 		for (let columnIndex = 0; columnIndex < headers.length; columnIndex++) {
// 			const key = headers[columnIndex]
// 			if (!key) continue

// 			const rawValue = row.c[columnIndex]?.v
// 			const parsedValue = parseExpressionValue(rawValue)
// 			if (parsedValue === undefined) continue

// 			out[key] = parsedValue
// 			hasValue = true
// 		}

// 		if (hasValue) objects.push(out)
// 	}

// 	return objects
// }

// async function fetchSheetTable(sheetName) {
// 	return fetchSheetTableWithJsonp(sheetName)
// }

// async function loadAssetsFromGoogleSheets() {
// 	const results = await Promise.all(
// 		ASSET_SHEETS.map(async ([sheetName, key]) => {
// 			const table = await fetchSheetTable(sheetName)
// 			const rows = tableToObjects(table)
// 			return [key, rows]
// 		})
// 	)

// 	const loaded = {}
// 	for (const [key, rows] of results) {
// 		loaded[key] = rows
// 	}

// 	return loaded
// }

// function ensureAssetsLoaded() {
// 	if (assetsLoadPromise) return assetsLoadPromise

// 	assetsLoadPromise = loadAssetsFromGoogleSheets()
// 		.then((loadedAssets) => {
// 			overwriteAssetsCache(loadedAssets)
// 			return loadedAssets
// 		})
// 		.catch((error) => {
// 			console.error(
// 				"Failed to load Google Sheets assets. Falling back to local assets. Ensure the spreadsheet is shared to 'Anyone with the link (Viewer)' or published to the web.",
// 				error
// 			)
// 			return assetsCache
// 		})

// 	return assetsLoadPromise
// }

// ensureAssetsLoaded()

function getAssets() {
	return assetsCache
}

function getStatusByName(statusName) {
	return getAssets().statuses.find((status) => status.name === statusName) || null
}

function getStatusIdByName(statusName) {
	return getStatusByName(statusName)?.id || ""
}

function normalizeStatusReferences(assetRoot) {
	if (!assetRoot || !Array.isArray(assetRoot.statuses)) return

	const currentByLegacyId = {}
	for (const status of assetRoot.statuses) {
		const legacyId = LEGACY_STATUS_ID_BY_NAME[status.name]
		if (legacyId) currentByLegacyId[legacyId] = status.id
	}

	const visit = (value, keyName = "") => {
		if (Array.isArray(value)) {
			if ((keyName === "pstatus" || keyName === "estatus") && value.every((item) => typeof item === "string")) {
				for (let index = 0; index < value.length; index++) {
					const remap = currentByLegacyId[value[index]]
					if (remap) value[index] = remap
				}
			}

			value.forEach((item) => visit(item, keyName))
			return
		}

		if (value && typeof value === "object") {
			for (const [childKey, childValue] of Object.entries(value)) {
				visit(childValue, childKey)
			}
		}
	}

	visit(assetRoot)
}