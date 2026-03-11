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
					health: 900,
					attack: 40,
					defense: 40,
				},

				forty: {
					health: 800,
					attack: 37,
					defense: 37,
				},

				thirty: {
					health: 770,
					attack: 34,
					defense: 34,
				},

				twenty: {
					health: 740,
					attack: 31,
					defense: 31,
				},

				ten: {
					health: 720,
					attack: 28,
					defense: 28,
				},

				zero: {
					health: 700,
					attack: 25,
					defense: 25,
				},
			},
			{
				name: "Elite",
				fifty: {
					health: 1000,
					attack: 45,
					defense: 45,
				},

				forty: {
					health: 900,
					attack: 42,
					defense: 42,
				},

				thirty: {
					health: 870,
					attack: 39,
					defense: 39,
				},

				twenty: {
					health: 840,
					attack: 36,
					defense: 36,
				},

				ten: {
					health: 820,
					attack: 33,
					defense: 33,
				},

				zero: {
					health: 800,
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
				rounds: 3
			},
			{
				name: 'Empowerment',
				id: '🏅',
				description: "Deal 40% more damage for 1 turn.",
				damAdd: 0.4,
				positive: true,
				rounds: 1
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
				rounds: 3
			},
			{
				name: 'Acuity',
				id: '🎯',
				description: "Increases accuracy by 20% for 3 turns.",
				incAcc: 0.2,
				positive: true,
				rounds: 3
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
				rounds: 3
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
			{
				name: 'Random',
				id: '❓',
				positive: false,
				description: "A random one of the other status effects.",
			},
		],

		enemies: [
			{
				name: "Cow",
				block: "Animal",
				sprite: 'assets/enemies/Cow.gif',
				weapon: null,
				health: 110,
				attack: 40,
				defense: 50,
				crit: 0.2,
				accuracy: 0.85,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Pig",
				block: "Animal",
				sprite: 'assets/enemies/Pig.gif',
				weapon: null,
				health: 80,
				attack: 35,
				defense: 75,
				crit: 0.2,
				accuracy: 0.9,
				skills: [
					{
						name: "Oink",
						chance: 0.45,
						attack: false
					},
					{
						name: "Oink+",
						estatus: ["💗", "🛡️", "💪"],
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Sheep",
				block: "Animal",
				sprite: 'assets/enemies/Sheep.gif',
				weapon: null,
				health: 70,
				attack: 25,
				defense: 95,
				crit: 0.1,
				accuracy: 0.8,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Chicken",
				block: "Animal",
				sprite: 'assets/enemies/Chicken.gif',
				weapon: null,
				health: 20,
				attack: 15,
				defense: 15,
				crit: 0.65,
				accuracy: 0.95,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Health Slime",
				block: "Grunt",
				sprite: 'assets/enemies/HealthSlime.gif',
				weapon: null,
				health: 100,
				attack: 50,
				defense: 50,
				crit: 0.1,
				accuracy: 0.8,
				skills: [
					{
						name: "Jump",
						chance: 0.65,
						attack: true
					},
					{
						name: "Recover",
						health: 0.10,
						chance: 0.10,
						wait: 5,
						attack: false
					},
					{
						name: "Major Recover",
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Attack Slime",
				block: "Grunt",
				sprite: 'assets/enemies/AttackSlime.gif',
				weapon: null,
				health: 70,
				attack: 70,
				defense: 30,
				crit: 0.2,
				accuracy: 0.85,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Defense Slime",
				block: "Grunt",
				sprite: 'assets/enemies/DefenseSlime.gif',
				weapon: null,
				health: 75,
				attack: 30,
				defense: 70,
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
						health: 0.2,
						chance: 0.15,
						wait: 6,
						attack: false
					},
					{
						name: "Heavy Impact",
						pstatus: ["💫"],
						damage: 1.3,
						chance: 0.1,
						wait: 3,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Stamina Slime",
				block: "Grunt",
				sprite: 'assets/enemies/StaminaSlime.gif',
				weapon: null,
				health: 80,
				attack: 60,
				defense: 40,
				crit: 0.5,
				accuracy: 0.85,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Lazy Goblin",
				block: "Grunt",
				sprite: 'assets/enemies/LazyGoblin.gif',
				weapon: "Rusted Dagger",
				health: 50,
				attack: 25,
				accuracy: 0.8,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Goblin Warrior",
				block: "Grunt",
				sprite: 'assets/enemies/GoblinWarrior.gif',
				weapon: "Rusted Dagger",
				health: 125,
				attack: 50,
				accuracy: 0.8,
				crit: 0.1,
				defense: 75,
				skills: [
					{
						name: "Slash",
						chance: 0.6,
						attack: true
					},
					{
						name: "War Cry",
						estatus: ["🏅", "💢"],
						chance: 0.1,
						wait: 7,
						attack: false
					},
					{
						name: "Shield Bash",
						chance: 0.15,
						wait: 3,
						damage: 0.75,
						pstatus: ["🌀"],
						attack: true
					},
					{
						name: "Heavy Slash",
						damage: 1.2,
						chance: 0.15,
						wait: 3,
						attack: true
					}
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Blacksmith Goblin",
				block: "Grunt",
				sprite: 'assets/enemies/BlacksmithGoblin.gif',
				weapon: "Blacksmith's Hammer",
				health: 125,
				attack: 50,
				defense: 75,
				crit: 0.1,
				accuracy: 0.8,

				skills: [
					{
						name: "Slam",
						chance: 0.6,
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
						wait: 3,
						damage: 1.5,
						attack: true
					},
					{
						name: "Molotov",
						damage: 1.5,
						pstatus: ["🔥"],
						chance: 0.1,
						wait: 7,
						attack: true
					}
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Armored Goblin",
				block: "General",
				sprite: 'assets/enemies/ArmoredGoblin.gif',
				weapon: "Spear & Shield",
				health: 300,
				attack: 85,
				defense: 180,
				crit: 0.05,
				accuracy: 0.7,
				skills: [
					{
						name: "Jab",
						chance: 0.6,
						attack: true
					},
					{
						name: "Rally",
						estatus: ["🛡️", "💪"],
						chance: 0.10,
						wait: 7,
						attack: false
					},
					{
						name: "Flurry",
						chance: 0.15,
						wait: 3,
						times: 3,
						damage: 0.75,
						attack: true
					},
					{
						name: "Deep Jab",
						pstatus: ["🩸"],
						damage: 1.25,
						chance: 0.15,
						wait: 3,
						attack: true
					}
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Goblin Ranger",
				block: "General",
				sprite: 'assets/enemies/GoblinRanger.gif',
				weapon: "Bow & Arrow",
				health: 150,
				attack: 140,
				defense: 80,
				crit: 0.1,
				accuracy: 0.7,
				skills: [
					{
						name: "Bolt",
						chance: 0.6,
						attack: true
					},
					{
						name: "Razor Bolt",
						pstatus: ["🩸"],
						damage: 1.1,
						chance: 0.1,
						wait: 8,
						attack: true
					},
					{
						name: "Flame Bolt",
						pstatus: ["🔥"],
						damage: 0.95,
						chance: 0.1,
						wait: 7,
						attack: true
					},
					{
						name: "Poison Bolt",
						pstatus: ["💀"],
						damage: 0.8,
						chance: 0.1,
						wait: 10,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Goblin General",
				block: "General",
				sprite: 'assets/enemies/GoblinGeneral.gif',
				health: 250,
				attack: 160,
				defense: 140,
				crit: 0.1,
				accuracy: 0.8,
				skills: [
					{
						name: "Smash",
						chance: 0.6,
						attack: true
					},
					{
						name: "War Cry",
						estatus: ["🏅", "💢"],
						chance: 0.075,
						wait: 7,
						attack: false
					},
					{
						name: "Rally",
						estatus: ["🛡️", "💪"],
						chance: 0.075,
						wait: 7,
						attack: false
					},
					{
						name: "Kick",
						pstatus: ["🌀"],
						damage: 0.65,
						chance: 0.1,
						wait: 3,
						attack: true
					},
					{
						name: "Crushing Swing",
						chance: 0.15,
						wait: 4,
						damage: 1.4,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Orc",
				block: "General",
				sprite: 'assets/enemies/Orc.gif',
				weapon: "Orc Club",
				health: 500,
				attack: 250,
				defense: 100,
				crit: 0.05,
				accuracy: 0.8,
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
						wait: 5,
						attack: true
					},
					{
						name: "Crippling Strike",
						pstatus: ["🌀", "🩼"],
						chance: 0.15,
						damage: 1.5,
						wait: 3,
						attack: true
					},
					{
						name: "Berserk",
						estatus: ["💢"],
						chance: 0.05,
						wait: 7,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Cyclops",
				block: "General",
				sprite: 'assets/enemies/Cyclops.gif',
				health: 500,
				attack: 100,
				defense: 250,
				crit: 0.1,
				accuracy: 0.75,
				skills: [
					{
						name: "Smash",
						chance: 0.3,
						attack: true
					},
					{
						name: "Suplex",
						damage: 1.3,
						chance: 0.15,
						wait: 5,
						attack: true
					},
					{
						name: "Crippling Strike",
						damage: 1.5,
						pstatus: ["🌀", "🩼"],
						chance: 0.15,
						wait: 2,
						attack: true
					},
					{
						name: "Thick Skin",
						estatus: ["🛡️"],
						chance: 0.1,
						attack: false,
						wait: 7
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Goblin",
				block: "General",
				sprite: 'assets/enemies/EldritchGoblin.gif',
				weapon: "Cursed Rusted Dagger",
				health: 333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.88,
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
						wait: 3,
						attack: true
					},
					{
						name: "Cursed Breath",
						pstatus: ["🖤", "🌑", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.15,
						wait: 9,
						attack: true
					},
					{
						name: "Frenzy",
						health: 0.33,
						estatus: ["💢", "🍀"],
						chance: 0.1,
						wait: 12
					}
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Slime",
				block: "General",
				sprite: 'assets/enemies/EldritchSlime.gif',
				weapon: "Cursed Rusted Dagger",
				health: 333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.88,
				skills: [
					{
						name: "Jump",
						chance: 0.55,
						attack: true
					},
					{
						name: "Foul Secretion",
						damage: 0.33,
						pstatus: ["🌑", "🥀", "🌀"],
						chance: 0.3,
						wait: 5,
						attack: true
					},
					{
						name: "Blight Bullets",
						damage: 0.66,
						times: 6,
						pstatus: ["🖤", "🩼"],
						chance: 0.15,
						wait: 9,
						attack: true
					},
					{
						name: "Unnatural Jiggle",
						health: 0.33,
						estatus: ["🎯", "🛡️"],
						chance: 0.15,
						wait: 15,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Greater Health Slime",
				block: "General",
				sprite: 'assets/enemies/GreaterHealthSlime.gif',
				weapon: null,
				health: 800,
				attack: 150,
				defense: 150,
				crit: 0.05,
				accuracy: 0.75,
				skills: [
					{
						name: "Jump",
						chance: 0.65,
						attack: true
					},
					{
						name: "Slimy Stream",
						damage: 0.85,
						pstatus: ["🌀"],
						chance: 0.1,
						wait: 4,
						attack: true
					},
					{
						name: "Recover",
						health: 0.10,
						chance: 0.10,
						wait: 10,
						attack: false
					},
					{
						name: "Major Recovery",
						health: 0.3,
						chance: 0.05,
						wait: 14,
						attack: false
					},
					{
						name: "Restorative Jiggle",
						estatus: ["💗", "✨"],
						health: 0.05,
						chance: 0.1,
						wait: 6,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Greater Attack Slime",
				block: "General",
				sprite: 'assets/enemies/GreaterAttackSlime.gif',
				weapon: null,
				health: 325,
				attack: 210,
				defense: 90,
				crit: 0.15,
				accuracy: 0.9,
				skills: [
					{
						name: "Jump",
						chance: 0.55,
						attack: true
					},
					{
						name: "Slimy Blade",
						pstatus: ["🩸"],
						wait: 3,
						chance: 0.15,
						damage: 1.1,
						attack: true
					},
					{
						name: "Burning Slide",
						pstatus: ["🔥", "🩼"],
						chance: 0.15,
						damage: 1.15,
						wait: 6,
						attack: true
					},
					{
						name: "Poison Spew",
						pstatus: ["💀"],
						damage: 0.9,
						chance: 0.1,
						wait: 12,
						attack: true
					},
					{
						name: "Excited Jiggle",
						estatus: ["💪", "🎯"],
						chance: 0.05,
						wait: 9,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Greater Defense Slime",
				block: "General",
				sprite: 'assets/enemies/GreaterDefenseSlime.gif',
				weapon: null,
				health: 550,
				attack: 90,
				defense: 210,
				crit: 0.05,
				accuracy: 0.8,
				skills: [
					{
						name: "Heavy Jump",
						chance: 0.55,
						damage: 1.1,
						attack: true
					},
					{
						name: "Reinforce",
						estatus: ["🛡️"],
						health: 0.2,
						chance: 0.15,
						wait: 6,
						attack: false
					},
					{
						name: "Heavy Impact",
						pstatus: ["💫"],
						damage: 1.3,
						chance: 0.15,
						wait: 3,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Greater Stamina Slime",
				block: "General",
				sprite: 'assets/enemies/GreaterStaminaSlime.gif',
				weapon: null,
				health: 400,
				attack: 180,
				defense: 120,
				crit: 0.2,
				accuracy: 0.85,
				skills: [
					{
						name: "Quick Jump",
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
						damage: 0.45,
						times: 4,
						chance: 0.2,
						attack: true,
						wait: 2
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Orange Fox",
				block: "General",
				sprite: 'assets/enemies/OrangeFox.gif',
				weapon: "Steel Dagger",
				health: 700,
				attack: 250,
				defense: 150,
				crit: 0.05,
				accuracy: 0.95,
				skills: [
					{
						name: "Hack",
						damage: 0.45,
						times: 2,
						chance: 0.6,
						attack: true
					},
					{
						name: "Smoke Bomb",
						pstatus: ["👁️", "🌀"],
						chance: 0.075,
						wait: 9,
						attack: false

					},
					{
						name: "Body Flicker",
						estatus: ["🎯", "💨", "🍀"],
						chance: 0.075,
						wait: 6,
						attack: false
					},
					{
						name: "Spin Attack",
						damage: 0.5,
						times: 3,
						chance: 0.20,
						wait: 2,
						attack: true
					},
					{
						name: "Berserk",
						estatus: ["💢"],
						chance: 0.05,
						wait: 6,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "White Fox",
				block: "General",
				sprite: 'assets/enemies/WhiteFox.gif',
				weapon: "Steel Dagger",
				health: 600,
				attack: 210,
				defense: 130,
				crit: 0.1,
				accuracy: 0.9,
				skills: [
					{
						name: "Stab",
						damage: 0.3,
						times: 3,
						chance: 0.6,
						attack: true
					},
					{
						name: "Smoke Bomb",
						pstatus: ["👁️", "🌀"],
						chance: 0.075,
						attack: false,
						wait: 9
					},
					{
						name: "Body Flicker",
						estatus: ["🎯", "💨", "🍀"],
						chance: 0.075,
						wait: 6,
						attack: false
					},
					{
						name: "Flurry",
						times: 6,
						damage: 0.15,
						chance: 0.15,
						wait: 3,
						attack: true
					},
					{
						name: "Coated Shuriken",
						pstatus: ["💀"],
						times: 6,
						damage: 0.05,
						chance: 0.1,
						wait: 12,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Blue Fox",
				block: "Vice Captain",
				sprite: 'assets/enemies/BlueFox.gif',
				weapon: "Steel Dagger",
				health: 750,
				attack: 170,
				defense: 110,
				crit: 0.15,
				accuracy: 0.70,
				skills: [
					{
						name: "Slash",
						chance: 0.6,
						damage: 0.2,
						times: 4,
						attack: true
					},
					{
						name: "Smoke Bomb",
						pstatus: ["👁️", "🌀"],
						chance: 0.075,
						wait: 9,
						attack: false

					},
					{
						name: "Body Flicker",
						estatus: ["🎯", "💨", "🍀"],
						chance: 0.075,
						wait: 6,
						attack: false
					},
					{
						name: "Onslaught",
						times: 9,
						damage: 0.1,
						chance: 0.1,
						wait: 4,
						attack: true
					},
					{
						name: "Deft Slash",
						pstatus: ["🩸", "🩼"],
						damage: 1.15,
						chance: 0.15,
						wait: 4,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Black Fox",
				block: "Vice Captain",
				sprite: 'assets/enemies/BlackFox.gif',
				weapon: "Steel Bow",
				health: 500,
				attack: 150,
				defense: 130,
				crit: 0.15,
				accuracy: 0.8,
				skills: [
					{
						name: "Rapid Fire",
						chance: 0.55,
						damage: 0.25,
						times: 3,
						attack: true
					},
					{
						name: "Smoke Bomb",
						pstatus: ["👁️", "🌀"],
						chance: 0.075,
						wait: 9,
						attack: false

					},
					{
						name: "Body Flicker",
						estatus: ["🎯", "💨", "🍀"],
						chance: 0.075,
						wait: 6,
						attack: false
					},
					{
						name: "Razor Arrows",
						times: 4,
						damage: 0.15,
						pstatus: ["🩸"],
						chance: 0.15,
						wait: 4,
						attack: true
					},
					{
						name: "Flame Arrows",
						times: 4,
						damage: 0.12,
						pstatus: ["🔥"],
						chance: 0.15,
						wait: 4,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Orc",
				block: "Vice Captain",
				sprite: 'assets/enemies/EldritchOrc.gif',
				weapon: "Cursed Orc Club",
				health: 3333,
				attack: 666,
				defense: 333,
				crit: 0.33,
				accuracy: 0.86,
				skills: [
					{
						name: "Crush",
						chance: 0.55,
						attack: true
					},
					{
						name: "Stunning Stomp",
						pstatus: ["💫"],
						chance: 0.15,
						damage: 1.1,
						wait: 5,
						attack: true
					},
					{
						name: "Wild Slam",
						damage: 1.33,
						wait: 3,
						chance: 0.15,
						attack: true
					},
					{
						name: "Berserk+",
						estatus: ["💢"],
						chance: 0.075,
						wait: 7,
						attack: false
					},
					{
						name: "Cursed Breath",
						pstatus: ["🖤", "🌑", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.075,
						wait: 4,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Cyclops",
				block: "Vice Captain",
				sprite: 'assets/enemies/EldritchCyclops.gif',
				health: 3333,
				attack: 333,
				defense: 666,
				crit: 0.33,
				accuracy: 0.76,
				skills: [
					{
						name: "Smash",
						chance: 0.3,
						attack: true
					},
					{
						name: "Chain Suplex",
						damage: 0.7,
						times: 3,
						chance: 0.15,
						wait: 5,
						attack: true
					},
					{
						name: "Crush Suplex",
						damage: 1.5,
						pstatus: ["🌀", "🩼"],
						chance: 0.15,
						wait: 3,
						attack: true
					},
					{
						name: "Thick Skin+",
						estatus: ["🛡️"],
						health: 0.1,
						chance: 0.075,
						attack: false,
						wait: 7
					},
					{
						name: "Cursed Breath",
						pstatus: ["🖤", "🌑", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.075,
						wait: 4,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Goblin General",
				block: "General",
				sprite: 'assets/enemies/EldritchGoblinGeneral.gif',
				health: 1333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.86,
				skills: [
					{
						name: "Smash",
						chance: 0.6,
						attack: true
					},
					{
						name: "Cursed Breath",
						pstatus: ["🖤", "🌑", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.1,
						wait: 4,
						attack: true
					},
					{
						name: "Kick",
						pstatus: ["🌀", "🩼"],
						damage: 0.65,
						chance: 0.1,
						wait: 3,
						attack: true
					},
					{
						name: "Wild Swing",
						damage: 1.5,
						chance: 0.15,
						wait: 4,
						attack: true
					},
					{
						name: "Crazed Cry",
						estatus: ["🏅", "💢", "🛡️", "💪"],
						health: 0.33,
						chance: 0.05,
						wait: 25,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Greater Eldritch Slime",
				block: "Vice Captain",
				sprite: 'assets/enemies/GreaterEldritchSlime.gif',
				weapon: "Cursed Rusted Dagger",
				health: 2333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.76,
				skills: [
					{
						name: "Jump",
						chance: 0.55,
						attack: true
					},
					{
						name: "Foul Secretion",
						damage: 0.33,
						pstatus: ["🌑", "🥀", "🌀"],
						chance: 0.2,
						wait: 5,
						attack: true
					},
					{
						name: "Blight Bullets",
						damage: 0.66,
						times: 6,
						pstatus: ["🖤", "🩼"],
						chance: 0.15,
						wait: 9,
						attack: true
					},
					{
						name: "Disturbing Dance",
						health: 0.33,
						estatus: ["🎯", "🛡️", "💪"],
						chance: 0.1,
						wait: 20,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Vampire",
				block: "Vice Captain",
				sprite: 'assets/enemies/Vampire.gif',
				weapon: "Fangs",
				health: 3000,
				attack: 400,
				defense: 400,
				crit: 0.15,
				accuracy: 0.85,
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
						chance: 0.15,
						wait: 3,
						pstatus: ["🩸"],
						attack: true
					},
					{
						name: "Drain",
						pstatus: ["🌀"],
						estatus: ["💗", "🛡️"],
						damage: 1.5,
						lifesteal: 0.5,
						chance: 0.15,
						wait: 5,
						attack: true
					},
					{
						name: "Vampiric Gaze",
						pstatus: ["🥀", "🌑", "💫"],
						chance: 0.075,
						wait: 9,
						attack: false
					},
					{
						name: "Bat Transformation",
						pstatus: ["👁️"],
						estatus: ["🍀", "✨", "💨"],
						chance: 0.075,
						wait: 15,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Demon",
				block: "Vice Captain",
				sprite: 'assets/enemies/Demon.gif',
				weapon: null,
				health: 3333,
				attack: 333,
				defense: 666,
				crit: 0.33,
				accuracy: 0.8,
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
						chance: 0.1,
						wait: 6,
						attack: true
					},
					{
						name: "Pummel",
						pstatus: ["💫", "🌀"],
						damage: 0.33,
						times: 3,
						chance: 0.1,
						wait: 7,
						attack: true
					},
					{
						name: "Sinister Hex",
						pstatus: ["🥀", "🖤", "🌑", "🩼"],
						chance: 0.075,
						wait: 9,
						attack: false
					},
					{
						name: "Enrage",
						estatus: ["💢", "🍀", "💗", "🏅", "🎯"],
						chance: 0.075,
						attack: false,
						wait: 12
					},
					{
						name: "Damnation",
						pstatus: ["🖤", "🌀", "🌑"],
						damage: 0.33,
						times: 3,
						chance: 0.05,
						attack: true,
						wait: 16
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Werewolf",
				block: "Vice Captain",
				sprite: 'assets/enemies/Werewolf.gif',
				weapon: null,
				health: 5000,
				attack: 400,
				defense: 500,
				crit: 0.15,
				accuracy: 0.75,
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
						wait: 4,
						attack: true
					},
					{
						name: "Crippling Bite",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 2,
						chance: 0.1,
						wait: 6,
						attack: true
					},
					{
						name: "Howl",
						estatus: ["🏅", "🍀", "💗", "🎯", "🛡️", "💪"],
						chance: 0.15,
						attack: false,
						wait: 12
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Witch",
				block: "Vice Captain",
				sprite: 'assets/enemies/Witch.gif',
				weapon: null,
				health: 1500,
				attack: 250,
				defense: 350,
				crit: 0.1,
				accuracy: 0.85,
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
						wait: 8,
						attack: true
					},
					{
						name: "Sleeping Potion",
						pstatus: ["💫", "🌀"],
						damage: 0.33,
						chance: 0.075,
						wait: 4,
						attack: true
					},
					{
						name: "Restoration Potion",
						estatus: ["💗"],
						health: 0.05,
						chance: 0.075,
						wait: 12,
						attack: false
					},
					{
						name: "Voodoo Stab",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.2,
						wait: 3,
						attack: true
					},
					{
						name: "Hex",
						pstatus: ["🥀", "🖤"],
						chance: 0.075,
						attack: false,
						wait: 7
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
						wait: 12,
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
						wait: 9
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Wizard",
				block: "Vice Captain",
				sprite: 'assets/enemies/Wizard.gif',
				weapon: null,
				health: 2500,
				attack: 450,
				defense: 200,
				crit: 0.15,
				accuracy: 0.8,
				skills: [
					{
						name: "Magic Missle",
						damage: 0.2,
						times: 3,
						chance: 0.5,
						attack: true
					},
					{
						name: "Flame Bolt",
						pstatus: ["🔥"],
						damage: 1.2,
						chance: 0.15,
						wait: 6,
						attack: true
					},
					{
						name: "Fire Ball",
						pstatus: ["🔥"],
						damage: 1.6,
						chance: 0.075,
						wait: 12,
						attack: true
					},
					{
						name: "Acid Splash",
						pstatus: ["🩼"],
						damage: 0.8,
						chance: 0.1,
						wait: 9,
						attack: true
					},
					{
						name: "Blindness",
						pstatus: ["👁️", "🥀"],
						chance: 0.075,
						wait: 6,
						attack: false
					},
					{
						name: "False Life",
						health: 0.15,
						chance: 0.1,
						wait: 9,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Calamity Health Slime",
				block: "Vice Captain",
				sprite: 'assets/enemies/CalamityHealthSlime.gif',
				weapon: null,
				health: 3500,
				attack: 300,
				defense: 300,
				crit: 0.05,
				accuracy: 0.8,
				skills: [
					{
						name: "Jump",
						chance: 0.5,
						attack: true
					},
					{
						name: "Siphon",
						damage: 0.9,
						lifesteal: 0.4,
						chance: 0.15,
						wait: 7,
						attack: true
					},
					{
						name: "Corrosive Stream",
						damage: 0.8,
						pstatus: ["🌀", "🩼"],
						chance: 0.125,
						wait: 4,
						attack: true
					},
					{
						name: "Recover+",
						health: 0.15,
						chance: 0.075,
						wait: 20,
						attack: false
					},
					{
						name: "Major Recover+",
						health: 0.4,
						chance: 0.075,
						wait: 25,
						attack: false
					},
					{
						name: "Restorative Jiggle+",
						health: 0.1,
						estatus: ["💗", "✨"],
						chance: 0.075,
						wait: 15,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Calamity Attack Slime",
				block: "Vice Captain",
				sprite: 'assets/enemies/CalamityAttackSlime.gif',
				weapon: null,
				health: 1400,
				attack: 420,
				defense: 180,
				crit: 0.1,
				accuracy: 0.95,
				skills: [
					{
						name: "Jump",
						chance: 0.5,
						attack: true
					},
					{
						name: "Blazing Blades",
						damage: 0.7,
						times: 2,
						pstatus: ["🩸", "🔥"],
						chance: 0.15,
						wait: 3,
						attack: true
					},
					{
						name: "Acidic Slide",
						damage: 1.2,
						pstatus: ["🔥", "🩼"],
						chance: 0.15,
						wait: 6,
						attack: true
					},
					{
						name: "Sickening Sprew",
						damage: 0.9,
						pstatus: ["💀", "🌀"],
						chance: 0.1,
						wait: 12,
						attack: true
					},
					{
						name: "Excited Jiggle+",
						estatus: ["💪", "🎯", "🍀"],
						chance: 0.1,
						wait: 12,
						attack: false
					},
					{
						name: "Recovery",
						health: 0.05,
						estatus: ["💗"],
						chance: 0.1,
						wait: 15,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Calamity Defense Slime",
				block: "Vice Captain",
				sprite: 'assets/enemies/CalamityDefenseSlime.gif',
				weapon: null,
				health: 2000,
				attack: 180,
				defense: 420,
				crit: 0.05,
				accuracy: 0.85,
				skills: [
					{
						name: "Heavy Jump",
						damage: 1.1,
						chance: 0.5,
						attack: true
					},
					{
						name: "Reconstruct",
						health: 0.2,
						estatus: ["🛡️", "✨"],
						chance: 0.1,
						wait: 12,
						attack: false
					},
					{
						name: "Heavy Bullet",
						damage: 1.4,
						pstatus: ["🌀"],
						chance: 0.15,
						wait: 6,
						attack: true
					},
					{
						name: "Boulder Bullet",
						damage: 1.55,
						pstatus: ["💫"],
						chance: 0.15,
						wait: 9,
						attack: true
					},
					{
						name: "Violent Shedding",
						damage: 1.7,
						estatus: ["🩼", "💢", "🌀"],
						chance: 0.1,
						wait: 15,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Calamity Stamina Slime",
				block: "Vice Captain",
				sprite: 'assets/enemies/CalamityStaminaSlime.gif',
				weapon: null,
				health: 1600,
				attack: 360,
				defense: 240,
				crit: 0.2,
				accuracy: 0.8,
				skills: [
					{
						name: "Quick Jump",
						damage: 0.45,
						times: 2,
						chance: 0.5,
						attack: true
					},
					{
						name: "Bullet Barrage",
						damage: 0.35,
						times: 7,
						chance: 0.2,
						wait: 3,
						attack: true
					},
					{
						name: "Stunning Spew",
						damage: 0.4,
						times: 5,
						pstatus: ["💫"],
						chance: 0.1,
						wait: 6,
						attack: true
					},
					{
						name: "Hyper Dance",
						estatus: ["💨", "🎯", "🍀", "💪"],
						chance: 0.1,
						wait: 9,
						attack: false
					},
					{
						name: "Rapid Recovery",
						health: 0.03,
						estatus: ["💗"],
						chance: 0.1,
						wait: 6,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Pureblood",
				block: "Captain",
				sprite: 'assets/enemies/Pureblood.gif',
				weapon: "Fangs",
				health: 5000,
				attack: 500,
				defense: 500,
				crit: 0.15,
				accuracy: 0.9,
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
						pstatus: ["🩸"],
						chance: 0.15,
						wait: 3,
						attack: true
					},
					{
						name: "Drain",
						damage: 1.5,
						lifesteal: 0.75,
						pstatus: ["🌀"],
						estatus: ["💗", "🛡️"],
						chance: 0.15,
						wait: 3,
						attack: true
					},
					{
						name: "Vampiric Gaze",
						pstatus: ["🥀", "🌑", "💫"],
						chance: 0.1,
						wait: 6,
						attack: false
					},
					{
						name: "Bat Transformation",
						pstatus: ["👁️"],
						estatus: ["🎯", "✨", "💨"],
						chance: 0.1,
						wait: 8,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Archdemon",
				block: "Captain",
				sprite: 'assets/enemies/Archdemon.gif',
				weapon: null,
				health: 6666,
				attack: 666,
				defense: 333,
				crit: 0.33,
				accuracy: 0.8,
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
						wait: 4,
						attack: true
					},
					{
						name: "Pummel",
						pstatus: ["💫", "🌀"],
						damage: 0.33,
						times: 3,
						chance: 0.1,
						wait: 6,
						attack: true
					},
					{
						name: "Sinister Hex",
						pstatus: ["🥀", "🖤", "🌑", "🩼"],
						chance: 0.075,
						wait: 5,
						attack: false
					},
					{
						name: "Enrage",
						estatus: ["💢", "🍀", "💗", "🏅", "🎯"],
						chance: 0.075,
						attack: false,
						wait: 10
					},
					{
						name: "Damnation",
						pstatus: ["🥀", "🌀", "🌑"],
						damage: 0.33,
						times: 6,
						chance: 0.05,
						attack: true,
						wait: 12
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Dire Werewolf",
				block: "Captain",
				sprite: 'assets/enemies/DireWerewolf.gif',
				weapon: null,
				health: 7500,
				attack: 500,
				defense: 600,
				crit: 0.2,
				accuracy: 0.9,
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
						chance: 0.2,
						wait: 2,
						attack: true
					},
					{
						name: "Crippling Bite",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 2,
						chance: 0.1,
						wait: 4,
						attack: true
					},
					{
						name: "Howl",
						estatus: ["🏅", "🍀", "💗", "🎯", "🛡️", "💪"],
						chance: 0.15,
						attack: false,
						wait: 7
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Witch",
				block: "Captain",
				sprite: 'assets/enemies/EldritchWitch.gif',
				weapon: null,
				health: 1333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.85,
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
						wait: 6,
						attack: true
					},
					{
						name: "Sleeping Potion",
						pstatus: ["💫", "🌀"],
						damage: 0.33,
						chance: 0.075,
						wait: 3,
						attack: true
					},
					{
						name: "Restoration Potion",
						estatus: ["💗"],
						health: 0.05,
						chance: 0.075,
						wait: 6,
						attack: false
					},
					{
						name: "Hex",
						pstatus: ["🥀", "🖤"],
						chance: 0.075,
						attack: false,
						wait: 5
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
						wait: 6,
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
						wait: 7
					},
					{
						name: "Voodoo Stab",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 1.33,
						chance: 0.2,
						wait: 2,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Grand Wizard",
				block: "Captain",
				sprite: 'assets/enemies/GrandWizard.gif',
				weapon: null,
				health: 4500,
				attack: 700,
				defense: 190,
				crit: 0.2,
				accuracy: 0.95,
				skills: [
					{
						name: "Crown Of Stars",
						damage: 0.25,
						times: 3,
						chance: 0.45,
						attack: true
					},
					{
						name: "Sunbeam",
						damage: 0.4,
						times: 4,
						pstatus: ["🔥"],
						chance: 0.15,
						wait: 9,
						attack: true
					},
					{
						name: "Sunburst",
						damage: 1.8,
						pstatus: ["🔥"],
						chance: 0.1,
						wait: 15,
						attack: true
					},
					{
						name: "Obstupefacio",
						pstatus: ["🩼", "💫"],
						chance: 0.1,
						wait: 8,
						attack: false
					},
					{
						name: "Angustia",
						pstatus: ["🌀", "🖤"],
						chance: 0.1,
						wait: 8,
						attack: false
					},
					{
						name: "False Life",
						health: 0.15,
						chance: 0.1,
						wait: 9,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Calamity Eldritch Slime",
				block: "Captain",
				sprite: 'assets/enemies/CalamityEldritchSlime.gif',
				weapon: null,
				health: 3333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.85,
				skills: [
					{
						name: "Jump",
						chance: 0.5,
						attack: true
					},
					{
						name: "Sinister Spew",
						damage: 0.33,
						times: 4,
						pstatus: ["🌑", "🖤", "🌀"],
						chance: 0.2,
						wait: 5,
						attack: true
					},
					{
						name: "Blight Bullets",
						damage: 0.33,
						times: 6,
						pstatus: ["🥀", "🩼"],
						chance: 0.2,
						wait: 9,
						attack: true
					},
					{
						name: "Disturbing Dance",
						health: 0.33,
						estatus: ["🎯", "🛡️", "💪"],
						chance: 0.1,
						wait: 20,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Fox",
				block: "Captain",
				sprite: 'assets/enemies/EldritchFox.gif',
				weapon: null,
				health: 2333,
				attack: 333,
				defense: 333,
				crit: 0.33,
				accuracy: 0.9,
				skills: [
					{
						name: "Slash",
						damage: 0.33,
						times: 4,
						chance: 0.55,
						attack: true
					},
					{
						name: "Foul Breath",
						damage: 0.33,
						pstatus: ["🥀", "🌑", "🌀", "🩼", "👁️"],
						chance: 0.1,
						wait: 18,
						attack: true
					},
					{
						name: "Twisted Flicker",
						estatus: ["🎯", "💨", "🍀", "💢"],
						chance: 0.1,
						wait: 15,
						attack: false
					},
					{
						name: "Relentless",
						damage: 0.33,
						times: 13,
						chance: 0.1,
						wait: 6,
						attack: true
					},
					{
						name: "Sinister Slash",
						damage: 1.33,
						pstatus: ["🩸", "🩼", "🌀"],
						chance: 0.15,
						wait: 13,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Cyclops Overlord",
				block: "Vice Captain",
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
						chance: 0.5,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Fox King",
				block: "Captain",
				sprite: 'assets/enemies/FoxKing.gif',
				weapon: null,
				health: 4750,
				attack: 225,
				defense: 175,
				crit: 0.2,
				accuracy: 0.8,
				skills: [
					{
						name: "Slash",
						chance: 0.45,
						attack: true
					},
					{
						name: "Sly Chain",
						damage: 0.2,
						times: 3,
						chance: 0.15,
						wait: 4,
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
						damage: 0.1,
						times: 12,
						chance: 0.1,
						wait: 2,
						attack: true
					},
					{
						name: "Fatal Slash",
						pstatus: ["🩸", "🌀", "🩼"],
						damage: 1.3,
						chance: 0.1,
						attack: true,
						wait: 1
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Goblin King",
				block: "Lord",
				sprite: 'assets/enemies/GoblinKing.gif',
				weapon: null,
				health: 2777,
				attack: 277,
				defense: 277,
				crit: 0.27,
				accuracy: 0.77,
				skills: [
					{
						name: "Smash",
						chance: 0.3,
						attack: true
					},
					{
						name: "King's Wraith",
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
						damage: 0.8,
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
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Health Slime Lord",
				block: "Lord",
				sprite: 'assets/enemies/HealthSlimeLord.gif',
				weapon: null,
				health: 4000,
				attack: 400,
				defense: 400,
				crit: 0.05,
				accuracy: 0.8,
				skills: [
					{
						name: "Slime Shot",
						chance: 0.45,
						attack: true
					},
					{
						name: "Devour Life",
						damage: 1.2,
						lifesteal: 0.6,
						chance: 0.15,
						wait: 7,
						attack: true
					},
					{
						name: "Corrosive Barrage",
						damage: 0.3,
						times: 5,
						pstatus: ["🌀", "🩼"],
						chance: 0.15,
						wait: 4,
						attack: true
					},
					{
						name: "Rapid Recovery",
						health: 0.05,
						chance: 0.1,
						wait: 15,
						attack: false
					},
					{
						name: "Invigorate",
						health: 0.3,
						estatus: ["💢"],
						chance: 0.075,
						wait: 25,
						attack: false
					},
					{
						name: "Restore Self",
						health: 0.1,
						estatus: ["💗", "✨"],
						chance: 0.075,
						wait: 30,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Attack Slime Lord",
				block: "Lord",
				sprite: 'assets/enemies/AttackSlimeLord.gif',
				weapon: null,
				health: 1750,
				attack: 520,
				defense: 280,
				crit: 0.15,
				accuracy: 1,
				skills: [
					{
						name: "Slime Blade",
						chance: 0.45,
						attack: true
					},
					{
						name: "Blazing Chain",
						damage: 0.45,
						times: 4,
						pstatus: ["🩸", "🔥"],
						chance: 0.15,
						wait: 4,
						attack: true
					},
					{
						name: "Acidic Shower",
						damage: 0.2,
						times: 8,
						pstatus: ["🔥", "🩼"],
						chance: 0.15,
						wait: 7,
						attack: true
					},
					{
						name: "Plague Cloud",
						damage: 0.9,
						pstatus: ["💀", "🌀", "👁️"],
						chance: 0.075,
						wait: 15,
						attack: true
					},
					{
						name: "Bloodlust",
						estatus: ["💢", "🍀", "🏅", "💪"],
						chance: 0.075,
						wait: 20,
						attack: false
					},
					{
						name: "Recovery",
						health: 0.05,
						estatus: ["💗"],
						chance: 0.1,
						wait: 25,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Defense Slime Lord",
				block: "Lord",
				sprite: 'assets/enemies/DefenseSlimeLord.gif',
				weapon: null,
				health: 2250,
				attack: 280,
				defense: 520,
				crit: 0.05,
				accuracy: 0.85,
				skills: [
					{
						name: "Slime Hammer",
						damage: 1.1,
						chance: 0.5,
						attack: true
					},
					{
						name: "Overhaul",
						health: 0.35,
						estatus: ["🛡️", "✨", "🏅", "💪"],
						chance: 0.1,
						wait: 35,
						attack: false
					},
					{
						name: "Boulder Bullet",
						damage: 1.6,
						pstatus: ["🌀"],
						chance: 0.15,
						wait: 8,
						attack: true
					},
					{
						name: "Meteor Impact",
						damage: 1.8,
						pstatus: ["💫"],
						chance: 0.15,
						wait: 15,
						attack: true
					},
					{
						name: "Explosive Shedding",
						damage: 2,
						estatus: ["🩼", "💢"],
						chance: 0.1,
						wait: 20,
						attack: true
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Stamina Slime Lord",
				block: "Lord",
				sprite: 'assets/enemies/StaminaSlimeLord.gif',
				weapon: null,
				health: 1750,
				attack: 460,
				defense: 340,
				crit: 0.3,
				accuracy: 0.95,
				skills: [
					{
						name: "Slime Shot",
						damage: 0.3,
						times: 3,
						chance: 0.45,
						attack: true
					},
					{
						name: "Hyper Barrage",
						damage: 0.2,
						times: 9,
						chance: 0.2,
						wait: 3,
						attack: true
					},
					{
						name: "Surging Shot",
						damage: 0.95,
						pstatus: ["💫"],
						chance: 0.15,
						wait: 5,
						attack: true
					},
					{
						name: "Hyper Surge",
						estatus: ["💨", "🎯", "🍀"],
						chance: 0.1,
						wait: 15,
						attack: false
					},
					{
						name: "Relentless Recovery",
						health: 0.04,
						estatus: ["💗"],
						chance: 0.1,
						wait: 7,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Eldritch Slime Lord",
				block: "Elite",
				sprite: 'assets/enemies/EldritchSlimeLord.gif',
				weapon: null,
				health: 3333,
				attack: 333,
				defense: 666,
				crit: 0.33,
				accuracy: 1.1,
				skills: [
					{
						name: "Sickening Slash",
						chance: 0.45,
						attack: true
					},
					{
						name: "Sinister Shower",
						damage: 0.2,
						times: 13,
						pstatus: ["🌑", "🖤", "🩼"],
						chance: 0.2,
						wait: 5,
						attack: true
					},
					{
						name: "Blight Barrage",
						damage: 0.33,
						times: 9,
						pstatus: ["🥀", "🌀"],
						chance: 0.2,
						wait: 10,
						attack: true
					},
					{
						name: "Eldritch Curse",
						pstatus: ["🥀", "🩼", "🌀", "👁️", "🖤", "🌑", "💀"],
						chance: 0.075,
						wait: 20,
						attack: false
					},
					{
						name: "Deranged Dance",
						health: 0.33,
						estatus: ["🎯", "🛡️", "💪", "🍀", "💢"],
						chance: 0.075,
						wait: 40,
						attack: false
					},
				],
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Demon Queen",
				block: "Elite",
				sprite: 'assets/enemies/DemonQueen.gif',
				weapon: null,
				health: 6666 * 7,
				attack: 666,
				defense: 666,
				crit: 0.33,
				accuracy: 1.15,
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
						pstatus: ["👁️", "🌀", "🌑", "💫"],
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
						name: "Milk",
						chance: 1
					}
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
						name: "Lazy Goblin",
						chance: 0.25
					},
					{
						name: "Goblin Warrior",
						chance: 0.15
					},
					{
						name: "Health Slime",
						chance: 0.15
					},
					{
						name: "Defense Slime",
						chance: 0.15
					},
					{
						name: "Cow",
						chance: 0.075
					},
					{
						name: "Pig",
						chance: 0.075
					},
					{
						name: "Sheep",
						chance: 0.075
					},
					{
						name: "Chicken",
						chance: 0.075
					}
				],
				chests: [
					{
						chest: 0,
						chance: 0.09,
					},
					{
						chest: 1,
						chance: 0.01,
					},
				]
			},
			{
				name: "Warham Castle",
				minlvl: 5,
				maxlvl: 10,
				enemies: [
					{
						name: "Lazy Goblin",
						chance: 0.08
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.11
					},
					{
						name: "Goblin Warrior",
						chance: 0.11
					},
					{
						name: "Armored Goblin",
						chance: 0.08
					},
					{
						name: "Goblin Ranger",
						chance: 0.08
					},
					{
						name: "Goblin General",
						chance: 0.08
					},
					{
						name: "Orc",
						chance: 0.05
					},
					{
						name: "Cyclops",
						chance: 0.05
					},
					{
						name: "Health Slime",
						chance: 0.05
					},
					{
						name: "Attack Slime",
						chance: 0.05
					},
					{
						name: "Defense Slime",
						chance: 0.05
					},
					{
						name: "Stamina Slime",
						chance: 0.05
					},
					{
						name: "Cow",
						chance: 0.04
					},
					{
						name: "Pig",
						chance: 0.04
					},
					{
						name: "Sheep",
						chance: 0.04
					},
					{
						name: "Chicken",
						chance: 0.04
					}
				],
				chests: [
					{
						chest: 0,
						chance: 0.07,
					},
					{
						chest: 1,
						chance: 0.03,
					},
				]
			},
			{
				name: "Hinterland",
				minlvl: 8,
				maxlvl: 14,
				enemies: [
					{
						name: "Lazy Goblin",
						chance: 0.07
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.08
					},
					{
						name: "Goblin Warrior",
						chance: 0.08
					},
					{
						name: "Armored Goblin",
						chance: 0.07
					},
					{
						name: "Goblin Ranger",
						chance: 0.07
					},
					{
						name: "Goblin General",
						chance: 0.07
					},
					{
						name: "Orc",
						chance: 0.02
					},
					{
						name: "Cyclops",
						chance: 0.02
					},
					{
						name: "Health Slime",
						chance: 0.04
					},
					{
						name: "Attack Slime",
						chance: 0.04
					},
					{
						name: "Defense Slime",
						chance: 0.04
					},
					{
						name: "Stamina Slime",
						chance: 0.04
					},
					{
						name: "Greater Health Slime",
						chance: 0.05
					},
					{
						name: "Greater Attack Slime",
						chance: 0.05
					},
					{
						name: "Greater Defense Slime",
						chance: 0.05
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.05
					},
					{
						name: "Cow",
						chance: 0.04
					},
					{
						name: "Pig",
						chance: 0.04
					},
					{
						name: "Sheep",
						chance: 0.04
					},
					{
						name: "Chicken",
						chance: 0.04
					}
				],
				chests: [
					{
						chest: 0,
						chance: 0.02,
					},
					{
						chest: 1,
						chance: 0.07,
					},
					{
						chest: 2,
						chance: 0.01,
					},
				]
			},
			{
				name: "Uralan Mountains",
				minlvl: 12,
				maxlvl: 18,
				enemies: [
					{
						name: "Cyclops Overlord",
						chance: 0.06
					},
					{
						name: "Lazy Goblin",
						chance: 0.08
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.08
					},
					{
						name: "Goblin Warrior",
						chance: 0.08
					},
					{
						name: "Armored Goblin",
						chance: 0.08
					},
					{
						name: "Goblin Ranger",
						chance: 0.08
					},
					{
						name: "Goblin General",
						chance: 0.08
					},
					{
						name: "Orc",
						chance: 0.05
					},
					{
						name: "Cyclops",
						chance: 0.05
					},
					{
						name: "Health Slime",
						chance: 0.03
					},
					{
						name: "Attack Slime",
						chance: 0.03
					},
					{
						name: "Defense Slime",
						chance: 0.03
					},
					{
						name: "Stamina Slime",
						chance: 0.03
					},
					{
						name: "Greater Health Slime",
						chance: 0.03
					},
					{
						name: "Greater Attack Slime",
						chance: 0.03
					},
					{
						name: "Greater Defense Slime",
						chance: 0.03
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.03
					},
					{
						name: "Cow",
						chance: 0.03
					},
					{
						name: "Pig",
						chance: 0.03
					},
					{
						name: "Sheep",
						chance: 0.03
					},
					{
						name: "Chicken",
						chance: 0.03
					}
				],
				chests: [
					{
						chest: 1,
						chance: 0.08,
					},
					{
						chest: 2,
						chance: 0.02,
					},
				]
			},
			{
				name: "Vulpeston",
				minlvl: 16,
				maxlvl: 22,
				enemies: [
					{
						name: "Lazy Goblin",
						chance: 0.03
					},
					{
						name: "Blacksmith Goblin",
						chance: 0.03
					},
					{
						name: "Goblin Warrior",
						chance: 0.03
					},
					{
						name: "Armored Goblin",
						chance: 0.03
					},
					{
						name: "Goblin Ranger",
						chance: 0.03
					},
					{
						name: "Goblin General",
						chance: 0.04
					},
					{
						name: "Orange Fox",
						chance: 0.10
					},
					{
						name: "White Fox",
						chance: 0.10
					},
					{
						name: "Blue Fox",
						chance: 0.06
					},
					{
						name: "Black Fox",
						chance: 0.06
					},
					{
						name: "Orc",
						chance: 0.04
					},
					{
						name: "Cyclops",
						chance: 0.04
					},
					{
						name: "Health Slime",
						chance: 0.02
					},
					{
						name: "Attack Slime",
						chance: 0.02
					},
					{
						name: "Defense Slime",
						chance: 0.02
					},
					{
						name: "Stamina Slime",
						chance: 0.02
					},
					{
						name: "Greater Health Slime",
						chance: 0.04
					},
					{
						name: "Greater Attack Slime",
						chance: 0.04
					},
					{
						name: "Greater Defense Slime",
						chance: 0.04
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.04
					},
					{
						name: "Eldritch Slime",
						chance: 0.045
					},
					{
						name: "Eldritch Goblin",
						chance: 0.045
					},
					{
						name: "Cow",
						chance: 0.03
					},
					{
						name: "Pig",
						chance: 0.03
					},
					{
						name: "Sheep",
						chance: 0.03
					},
					{
						name: "Chicken",
						chance: 0.03
					}
				],
				chests: [
					{
						chest: 1,
						chance: 0.07,
					},
					{
						chest: 2,
						chance: 0.03,
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
						name: "Goblin General",
						chance: 0.02
					},
					{
						name: "Orange Fox",
						chance: 0.20
					},
					{
						name: "White Fox",
						chance: 0.20
					},
					{
						name: "Blue Fox",
						chance: 0.16
					},
					{
						name: "Black Fox",
						chance: 0.16
					},
					{
						name: "Orc",
						chance: 0.05
					},
					{
						name: "Cyclops",
						chance: 0.05
					},
					{
						name: "Health Slime",
						chance: 0.01
					},
					{
						name: "Attack Slime",
						chance: 0.01
					},
					{
						name: "Defense Slime",
						chance: 0.01
					},
					{
						name: "Stamina Slime",
						chance: 0.01
					},
					{
						name: "Greater Health Slime",
						chance: 0.02
					},
					{
						name: "Greater Attack Slime",
						chance: 0.02
					},
					{
						name: "Greater Defense Slime",
						chance: 0.02
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.02
					},
					{
						name: "Eldritch Slime",
						chance: 0.0025
					},
					{
						name: "Eldritch Goblin",
						chance: 0.0025
					},
					{
						name: "Eldritch Fox",
						chance: 0.005
					}
				],
				chests: [
					{
						chest: 1,
						chance: 0.06,
					},
					{
						chest: 2,
						chance: 0.03,
					},
					{
						chest: 3,
						chance: 0.01,
					},
				]
			},
			{
				name: "Vexadel",
				minlvl: 30,
				maxlvl: 35,
				enemies: [
					{
						name: "Orange Fox",
						chance: 0.05
					},
					{
						name: "White Fox",
						chance: 0.05
					},
					{
						name: "Blue Fox",
						chance: 0.05
					},
					{
						name: "Black Fox",
						chance: 0.05
					},
					{
						name: "Orc",
						chance: 0.05
					},
					{
						name: "Cyclops",
						chance: 0.05
					},
					{
						name: "Greater Health Slime",
						chance: 0.03
					},
					{
						name: "Greater Eldritch Slime",
						chance: 0.07
					},
					{
						name: "Greater Attack Slime",
						chance: 0.03
					},
					{
						name: "Greater Defense Slime",
						chance: 0.03
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.03
					},
					{
						name: "Calamity Health Slime",
						chance: 0.05
					},
					{
						name: "Calamity Attack Slime",
						chance: 0.05
					},
					{
						name: "Calamity Defense Slime",
						chance: 0.05
					},
					{
						name: "Calamity Stamina Slime",
						chance: 0.05
					},
					{
						name: "Eldritch Slime",
						chance: 0.05
					},
					{
						name: "Eldritch Goblin",
						chance: 0.07
					},
					{
						name: "Eldritch Goblin General",
						chance: 0.07
					},
					{
						name: "Eldritch Orc",
						chance: 0.05
					},
					{
						name: "Eldritch Cyclops",
						chance: 0.05
					},
					{
						name: "Eldritch Fox",
						chance: 0.05
					}
				],
				chests: [
					{
						chest: 1,
						chance: 0.04,
					},
					{
						chest: 2,
						chance: 0.04,
					},
					{
						chest: 3,
						chance: 0.02,
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
						chance: 0.03
					},
					{
						name: "Armored Goblin",
						chance: 0.03
					},
					{
						name: "Goblin Ranger",
						chance: 0.03
					},
					{
						name: "Goblin General",
						chance: 0.06
					},
					{
						name: "Greater Health Slime",
						chance: 0.03
					},
					{
						name: "Greater Eldritch Slime",
						chance: 0.03
					},
					{
						name: "Greater Attack Slime",
						chance: 0.03
					},
					{
						name: "Greater Defense Slime",
						chance: 0.03
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.03
					},
					{
						name: "Calamity Health Slime",
						chance: 0.05
					},
					{
						name: "Calamity Eldritch Slime",
						chance: 0.05
					},
					{
						name: "Calamity Attack Slime",
						chance: 0.05
					},
					{
						name: "Calamity Defense Slime",
						chance: 0.05
					},
					{
						name: "Calamity Stamina Slime",
						chance: 0.05
					},
					{
						name: "Eldritch Goblin",
						chance: 0.03
					},
					{
						name: "Eldritch Goblin General",
						chance: 0.03
					},
					{
						name: "Eldritch Orc",
						chance: 0.03
					},
					{
						name: "Eldritch Cyclops",
						chance: 0.03
					},
					{
						name: "Eldritch Fox",
						chance: 0.03
					},
					{
						name: "Vampire",
						chance: 0.03
					},
					{
						name: "Demon",
						chance: 0.03
					},
					{
						name: "Werewolf",
						chance: 0.03
					},
					{
						name: "Witch",
						chance: 0.03
					},
					{
						name: "Wizard",
						chance: 0.03
					},
					{
						name: "Pureblood",
						chance: 0.03
					},
					{
						name: "Archdemon",
						chance: 0.03
					},
					{
						name: "Dire Werewolf",
						chance: 0.03
					},
					{
						name: "Eldritch Witch",
						chance: 0.03
					},
					{
						name: "Grand Wizard",
						chance: 0.03
					}
				],
				chests: [
					{
						chest: 2,
						chance: 0.07,
					},
					{
						chest: 3,
						chance: 0.02,
					},
					{
						chest: 4,
						chance: 0.01,
					},
				]
			},
			{
				name: "Sanguisuge",
				minlvl: 40,
				maxlvl: 45,
				enemies: [
					{
						name: "Health Slime Lord",
						chance: 0.01
					},
					{
						name: "Attack Slime Lord",
						chance: 0.01
					},
					{
						name: "Defense Slime Lord",
						chance: 0.01
					},
					{
						name: "Stamina Slime Lord",
						chance: 0.01
					},
					{
						name: "Greater Health Slime",
						chance: 0.025
					},
					{
						name: "Greater Eldritch Slime",
						chance: 0.025
					},
					{
						name: "Greater Attack Slime",
						chance: 0.025
					},
					{
						name: "Greater Defense Slime",
						chance: 0.025
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.025
					},
					{
						name: "Calamity Health Slime",
						chance: 0.03
					},
					{
						name: "Calamity Eldritch Slime",
						chance: 0.03
					},
					{
						name: "Calamity Attack Slime",
						chance: 0.03
					},
					{
						name: "Calamity Defense Slime",
						chance: 0.03
					},
					{
						name: "Calamity Stamina Slime",
						chance: 0.03
					},
					{
						name: "Eldritch Slime",
						chance: 0.0125
					},
					{
						name: "Eldritch Goblin",
						chance: 0.0125
					},
					{
						name: "Eldritch Goblin General",
						chance: 0.04
					},
					{
						name: "Eldritch Orc",
						chance: 0.04
					},
					{
						name: "Eldritch Cyclops",
						chance: 0.04
					},
					{
						name: "Eldritch Fox",
						chance: 0.04
					},
					{
						name: "Vampire",
						chance: 0.06
					},
					{
						name: "Demon",
						chance: 0.06
					},
					{
						name: "Werewolf",
						chance: 0.06
					},
					{
						name: "Witch",
						chance: 0.06
					},
					{
						name: "Wizard",
						chance: 0.06
					},
					{
						name: "Pureblood",
						chance: 0.04
					},
					{
						name: "Archdemon",
						chance: 0.04
					},
					{
						name: "Dire Werewolf",
						chance: 0.04
					},
					{
						name: "Eldritch Witch",
						chance: 0.04
					},
					{
						name: "Grand Wizard",
						chance: 0.04
					}
				],
				chests: [
					{
						chest: 2,
						chance: 0.06,
					},
					{
						chest: 3,
						chance: 0.03,
					},
					{
						chest: 4,
						chance: 0.01,
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
						chance: 0.015
					},
					{
						name: "Health Slime Lord",
						chance: 0.005
					},
					{
						name: "Eldritch Slime Lord",
						chance: 0.005
					},
					{
						name: "Attack Slime Lord",
						chance: 0.005
					},
					{
						name: "Defense Slime Lord",
						chance: 0.005
					},
					{
						name: "Stamina Slime Lord",
						chance: 0.005
					},
					{
						name: "Greater Health Slime",
						chance: 0.01
					},
					{
						name: "Greater Eldritch Slime",
						chance: 0.01
					},
					{
						name: "Greater Attack Slime",
						chance: 0.01
					},
					{
						name: "Greater Defense Slime",
						chance: 0.01
					},
					{
						name: "Greater Stamina Slime",
						chance: 0.01
					},
					{
						name: "Calamity Health Slime",
						chance: 0.02
					},
					{
						name: "Calamity Eldritch Slime",
						chance: 0.02
					},
					{
						name: "Calamity Attack Slime",
						chance: 0.02
					},
					{
						name: "Calamity Defense Slime",
						chance: 0.02
					},
					{
						name: "Calamity Stamina Slime",
						chance: 0.02
					},
					{
						name: "Eldritch Slime",
						chance: 0.005
					},
					{
						name: "Eldritch Goblin",
						chance: 0.005
					},
					{
						name: "Eldritch Goblin General",
						chance: 0.01
					},
					{
						name: "Eldritch Orc",
						chance: 0.0125
					},
					{
						name: "Eldritch Cyclops",
						chance: 0.0125
					},
					{
						name: "Eldritch Fox",
						chance: 0.01
					},
					{
						name: "Vampire",
						chance: 0.09
					},
					{
						name: "Demon",
						chance: 0.09
					},
					{
						name: "Werewolf",
						chance: 0.09
					},
					{
						name: "Witch",
						chance: 0.09
					},
					{
						name: "Wizard",
						chance: 0.09
					},
					{
						name: "Pureblood",
						chance: 0.06
					},
					{
						name: "Archdemon",
						chance: 0.06
					},
					{
						name: "Dire Werewolf",
						chance: 0.06
					},
					{
						name: "Eldritch Witch",
						chance: 0.06
					},
					{
						name: "Grand Wizard",
						chance: 0.06
					}
				],
				chests: [
					{
						chest: 2,
						chance: 0.04,
					},
					{
						chest: 3,
						chance: 0.04,
					},
					{
						chest: 4,
						chance: 0.02,
					},
				]
			},
			{
				name: "Eternal Damnation",
				minlvl: 50,
				maxlvl: 50,
				description: "This is the FFA area that scales with your level. The enemies here are all the enemies in the game, and they all have an equal chance to spawn. Good luck.",
				enemies: [] // Um...all of them.
			}
		],

		weapons: [
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
						cost: 10,
						description: "A complementary can of kick-ass.",
						damage: 1.2,
						attack: true
					},
					{
						name: "Relieve",
						cost: 15,
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

				description: "A dagger that's lost its edge due to rust, but is still usable.",
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
						description: "Swing at the enemy with perfect trajectory.",
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
				description: "A pair of lumberjack hatchets good for damage!",

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
						description: "Ready yourself for combat.",
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
						description: "Point Melanie or Alectrona upwards then unleashes its power which creates a massive blade of light or darkness before slamming it down on to the enemy and strengthening its wielder.\n\nThe output of this ability is randomized for each turn.",
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
			}
		],

		armors: [
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
				name: "Rogue's Cloak",
				description: "A brown cloak that's still in good condition that should provide light protection due to its strong fabric",
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
				description: "A sinister dark cloak that you're almost positive makes you look like a cultist.",

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
		],

		items: [
			// Stamina
			{ name: "Light Stamina Potion", stamina: 0.15, battle: true, id: '🧪' },
			{ name: "Medium Stamina Potion", stamina: 0.3, battle: true, id: '🧪' },
			{ name: "Heavy Stamina Potion", stamina: 0.5, battle: true, id: '🧪' },
			{ name: "Great Stamina Potion", stamina: 0.7, battle: true, id: '🧪' },
			{ name: "Grand Stamina Potion", stamina: 0.9, battle: true, id: '🧪' },

			// Health
			{ name: "Light Health Potion", health: 0.15, battle: true, id: '🧪' },
			{ name: "Medium Health Potion", health: 0.25, battle: true, id: '🧪' },
			{ name: "Heavy Health Potion", health: 0.5, battle: true, id: '🧪' },
			{ name: "Great Health Potion", health: 0.7, battle: true, id: '🧪' },
			{ name: "Grand Health Potion", health: 0.9, battle: true, id: '🧪' },

			// Defense
			{ name: "Light Defense Potion", def: 0.15, rounds: 3, battle: true, id: '🧪' },
			{ name: "Medium Defense Potion", def: 0.3, rounds: 3, battle: true, id: '🧪' },
			{ name: "Heavy Defense Potion", def: 0.5, rounds: 3, battle: true, id: '🧪' },
			{ name: "Great Defense Potion", def: 0.7, rounds: 3, battle: true, id: '🧪' },
			{ name: "Grand Defense Potion", def: 0.9, rounds: 3, battle: true, id: '🧪' },

			// Attack
			{ name: "Light Attack Potion", buff: 0.15, rounds: 3, battle: true, id: '🧪' },
			{ name: "Medium Attack Potion", buff: 0.3, rounds: 3, battle: true, id: '🧪' },
			{ name: "Heavy Attack Potion", buff: 0.5, rounds: 3, battle: true, id: '🧪' },
			{ name: "Great Attack Potion", buff: 0.7, rounds: 3, battle: true, id: '🧪' },
			{ name: "Grand Attack Potion", buff: 0.9, rounds: 3, battle: true, id: '🧪' },

			// Energy
			{ name: "Light Energy Potion", health: 0.15, stamina: 0.15, battle: true, id: '🧪' },
			{ name: "Medium Energy Potion", health: 0.15, stamina: 0.3, battle: true, id: '🧪' },
			{ name: "Heavy Energy Potion", health: 0.15, stamina: 0.5, battle: true, id: '🧪' },
			{ name: "Great Energy Potion", health: 0.15, stamina: 0.7, battle: true, id: '🧪' },
			{ name: "Grand Energy Potion", health: 0.15, stamina: 0.9, battle: true, id: '🧪' },

			// XP
			{ name: "Light XP Potion", xp: 638, id: '🧪' },
			{ name: "Medium XP Potion", xp: 5740, id: '🧪' },
			{ name: "Heavy XP Potion", xp: 15943, id: '🧪' },
			{ name: "Great XP Potion", xp: 31250, id: '🧪' },
			{ name: "Grand XP Potion", xp: 51658, id: '🧪' },

			// Misc consumables / foods
			{ name: "Purity Potion", id: '🧪' },
			{ name: "Milk", usability: "Purifies Statuses", purify: true, battle: true, id: '🍖' },
			{ name: "Cheese", usability: "Purifies Statuses", purify: true, description: "Yes, Milk + Milk = Cheese.", flatHealth: 250, craft: ['Milk', 'Milk'], battle: true, id: '🍖' },
			{ name: "Beef", description: "A type of red meat from a cow.", flatHealth: 350, battle: true, id: '🍖' },
			{ name: "Pork", description: "A type of red meat from a pig.", flatHealth: 200, battle: true, id: '🍖' },
			{ name: "Mutton", description: "You can't get mutton from a young sheep.", flatHealth: 150, battle: true, id: '🍖' },
			{ name: "Chicken", description: "A type of white meat from a chicken.", flatHealth: 100, battle: true, id: '🍖' },
			{ name: "Egg", description: "This isn't a dairy product, at least.", flatHealth: 50, battle: true, id: '🍖' },
			{ name: "Tea", description: "Herb Water.", health: 0.03, craft: ['Water Bottle', 'Green Herb'], battle: true, id: '🍖' },
			{ name: "Breakfast", description: "Serving it up Gary's way.", health: 0.15, craft: ['Pork', 'Egg', 'Milk'], id: '🍖' },
			{ name: "Shepherd's Pie", description: "Vegetables surrounded by meat in cheese, topped with mashed potato.", health: 0.25, craft: ['Mutton', 'Beef', 'Cheese', 'Green Herb'], id: '🍖' },
			{ name: "Meatloaf", description: "Meat mash, essentially.", health: 0.3, craft: ['Pork', 'Mutton', 'Chicken', 'Beef'], id: '🍖' },
			{ name: "Banquet", description: "A feast fit for a king, or at least a very hungry adventurer.", health: 0.5, craft: ['Shepherd\'s Pie', 'Meatloaf', 'Tea'], id: '🍖' },
			{ name: "Suspicious Eggnog", usability: "Gain [❓]", craft: ['Egg', 'Milk'], id: '🍖' },
			{ name: "Bandage", usability: "Removes [🩸]", description: "Patch yourself up.", health: 0.1, battle: true, id: '✨' },

			// Bombs / explosives
			{ name: "Bomb", battle: true, id: '💣' },
			{ name: "Cluster Bomb", battle: true, id: '💣' },
			{ name: "Blaze Bomb", battle: true, id: '💣' },
			{ name: "Shrapnel Bomb", battle: true, id: '💣' },
			{ name: "Poison Bomb", estatus: ["💀"], battle: true, id: '💣' },
			{ name: "Blinding Bomb", battle: true, id: '💣' },
			{ name: "Sinister Bomb", battle: true, id: '💣' },
			{ name: "Storm Bomb", battle: true, id: '💣' },
			{ name: "Decay Bomb", battle: true, id: '💣' },
			{ name: "Unstable Bomb", battle: true, id: '💣' },
			{ name: "Unstable Cluster Bomb", battle: true, id: '💣' },
			{ name: "Unstable Shrapnel Bomb", battle: true, id: '💣' },

			// Charms / utility
			{ name: "Boss Lure", id: '✨' },
			{ name: "Monster Compass", id: '✨' },
			{ name: "Treasure Map", id: '✨' },
			{ name: "B-Gone", battle: true, id: '✨' },
			{ name: "A-Frayed Compass", battle: true, id: '✨' },
			{ name: "Loot Charm", id: '✨' },
			{ name: "Soul Charm", id: '✨' },
			{ name: "Spirit Charm", id: '✨' },
			{ name: "Focus Charm", id: '✨' },

			// Keys
			{ name: "Wooden Key", sprite: "assets/keys/WoodenKey.gif", chest: 0, id: '🗝️' },
			{ name: "Silver Key", sprite: "assets/keys/SilverKey.gif", chest: 1, id: '🗝️' },
			{ name: "Gold Key", sprite: "assets/keys/GoldKey.gif", chest: 2, id: '🗝️' },
			{ name: "Platinum Key", sprite: "assets/keys/PlatinumKey.gif", chest: 3, id: '🗝️' },
			{ name: "Adamantine Key", sprite: "assets/keys/AdamantineKey.gif", chest: 4, id: '🗝️' },

			// Cursed keys
			{ name: "Cursed Wooden Key", id: '🗝️' },
			{ name: "Cursed Silver Key", id: '🗝️' },
			{ name: "Cursed Gold Key", id: '🗝️' },
			{ name: "Cursed Platinum Key", id: '🗝️' },
			{ name: "Cursed Adamantine Key", id: '🗝️' },

			// Lockpicks / tools
			{ name: "Novice Lockpick", id: '🗝️' },
			{ name: "Lockpick", id: '🗝️' },
			{ name: "Master Lockpick", id: '🗝️' },
			{ name: "Whetstone & Polish", id: '✨' },
			{ name: "Hexed Whetstone & Polish", id: '✨' },

			// Slime / corrupted / fragments / crystals / geodes
			{ name: "Slime Goop" },
			{ name: "Corrupted Goop" },
			{ name: "Slime Fragment" },
			{ name: "Corrupted Fragment" },
			{ name: "Slime Crystal" },
			{ name: "Corrupted Crystal" },
			{ name: "Slime Geode" },
			{ name: "Corrupted Geode" },

			// Corrupted / mana materials
			{ name: "Corrupted Shard" },
			{ name: "Corrupted Core" },
			{ name: "Mana Shard" },
			{ name: "Mana Fragment" },
			{ name: "Mana Crystal" },
			{ name: "Mana Core" },
			{ name: "Goblin Blood" },

			// Herbs / blooms / mushrooms
			{ name: "Red Herb" },
			{ name: "Green Herb" },
			{ name: "Blue Herb" },
			{ name: "Yellow Herb" },
			{ name: "Black Herb" },
			{ name: "White Herb" },
			{ name: "Crimson Bloom" },
			{ name: "Life Bloom" },
			{ name: "Oceanshroom" },
			{ name: "Stormshroom" },
			{ name: "Tainted Rose" },
			{ name: "Angelic Rose" },
			{ name: "Mana Bloom" },

			// Misc
			{ name: "Ember Core" },
			{ name: "Stone" },
			{ name: "Lucky Rabbit Foot" },
			{ name: "Cloth" },
			{ name: "Empty Bottle" },
			{ name: "Water Bottle" },
			{ name: "Whetstone" },
			{ name: "Map Fragment" },
			{ name: "Soul Fragment" },

			// Powders / flasks / salts / ashes / gunpowder
			{ name: "Enchanting Powder" },
			{ name: "Blinding Powder" },
			{ name: "Blaze Powder" },
			{ name: "Poison Powder" },
			{ name: "Reinforced Flask" },
			{ name: "Purified Salt" },
			{ name: "Tainted Ashes" },
			{ name: "Gunpowder" },
			{ name: "Packed Gunpowder" }
		],

		chests: [
			{
				name: "Wooden Chest",
				sprite: "assets/chests/WoodenChest.gif",
				tier: 1,
				key: "Wooden Key",
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Iron Chest",
				sprite: "assets/chests/IronChest.gif",
				tier: 2,
				key: "Iron Key",
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Golden Chest",
				sprite: "assets/chests/GoldenChest.gif",
				tier: 3,
				key: "Golden Key",
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Platinum Chest",
				sprite: "assets/chests/PlatinumChest.gif",
				tier: 4,
				key: "Platinum Key",
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			},
			{
				name: "Adamantine Chest",
				sprite: "assets/chests/AdamantineChest.gif",
				tier: 5,
				key: "Adamantine Key",
				drops: [
					{
						name: "Milk",
						chance: 1
					}
				]
			}
		],

		sounds: [
			"ButtonHover.mp3",
			"ChestFound.mp3",
			"ChestLocked.mp3",
			"ChestOpen.mp3",
			"Chicken.mp3",
			"Click.mp3",
			"Crafted.mp3",
			"Crit.mp3",
			"Dead.mp3",
			"Effect.mp3",
			"EffectNoAttack.mp3",
			"Equip.mp3",
			"Explosion.mp3",
			"hitHurt1.mp3",
			"hitHurt2.mp3",
			"hitHurt3.mp3",
			"hitHurt4.mp3",
			"ItemFound.mp3",
			"Miss.mp3",
			"Moo.mp3",
			"Pig.mp3",
			"Sheep.mp3",
			"StatusEffect.mp3",
			"Unequip.mp3"
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

function scaleEnemyStats(enemyData, level) {
	const lvl = Math.max(1, Number(level) || 1);

	const blocks = (getAssets ? (getAssets().blocks || []) : []);
	const block = blocks.find((entry) => entry.name === enemyData?.block);

	const getBlockTierKeyLocal = (l) => {
		if (l >= 50) return 'fifty';
		if (l >= 40) return 'forty';
		if (l >= 30) return 'thirty';
		if (l >= 20) return 'twenty';
		if (l >= 10) return 'ten';
		return 'zero';
	};

	if (block && lvl <= 50) {
		let healthTotal = Number(enemyData?.health) || 0;
		let defenseTotal = Number(enemyData?.defense) || 0;
		let attackTotal = Number(enemyData?.attack) || 0;

		for (let lev = 2; lev <= lvl; lev++) {
			const tier = block[getBlockTierKeyLocal(lev - 1)] || block.zero || {};
			healthTotal += Number(tier.health || 0);
			defenseTotal += Number(tier.defense || 0);
			attackTotal += Number(tier.attack || 0);
		}

		return {
			health: Math.floor(healthTotal),
			defense: Math.floor(defenseTotal),
			attack: Math.floor(attackTotal)
		};
	}

	return {
		health: Math.floor(((enemyData?.health || 0) + (lvl ** 1.82424)) * (1 + (lvl / 200))),
		defense: Math.floor(((enemyData?.defense || 0) + ((lvl / 2) ** 1.82424)) * (1 + (lvl / 200))),
		attack: Math.floor(((enemyData?.attack || 0) + ((lvl / 2) ** 1.82424)) * (1 + (lvl / 200)))
	};
}

function getEnemyAccuracy(enemyData, level) {
	const lvl = Math.max(1, Number(level) || 1);
	const base = Number(enemyData?.accuracy) || 0;
	return Math.min(1, base + 0.0025 * (lvl - 1));
}

function getEnemyCrit(enemyData, level) {
	const lvl = Math.max(1, Number(level) || 1);
	const base = Number(enemyData?.crit) || 0;
	return Math.min(1, base + 0.00125 * (lvl - 1));
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