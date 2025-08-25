<!--

# a turn-based, node-map RPG:

# what is it?

  - player moves towards across nodes:
  - each node might trigger:
    - story/Quest events
    - combat encounters
    - loot/shops
    - Branching paths

==================================
==================================
==================================
==================================

# todo list:

1. Setup & Boilerplate

  Init Node.js project (npm init -y) [*]

  Add TypeScript + ESLint + Jest/Vitest [*]

  Setup "start" & "dev" scripts [*]

2. Entity Base Class

  Entity class (id, name, stats)

  Derive Player, Enemy, NPC

3. Stats System

  Define stats (HP, Attack, Defense, Speed, Mana, etc.) [ *]

  Keep extensible for buffs/debuffs later [* ]

4. Inventory & Items

Base Item class

Derived Weapon, Armor, Consumable

Inventory system (add/remove/use)

5. Loot Tables

Utility that generates drops based on probability

Example: slime has 50% chance of “Slime Goo”, 10% of “Rusty Sword”

6. Node/Map System

Represent the world as a graph (Node, Edge)

Each node has: id, type (combat, story, loot, shop), connections

7. Event/Story Manager

Handle node events

Example: Player enters node → triggers event handler (combat, dialogue, loot, etc.)

8. Combat System

Turn-based loop (initiative order: player/enemy speed)

Player chooses: attack, use item, flee

Enemy uses simple AI (attack, defend, ability)

9. Game Engine Loop

Orchestrates player actions

Reads input (for now console-based)

Runs until victory/defeat/game end

10. Save/Load System

JSON-based save system

Stores: player stats, inventory, current node, story progress
  -


-->
