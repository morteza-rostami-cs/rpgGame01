<!--
🛠️ Core Features (MVP → Advanced)

# Distributed event-driven text MMORPG backend:

# OK! let's understand the problem?
==

# text-based turn-base RPG GAME: (with looting, crafting and survival)
==

# player management:
  - create a character -> name, class, background
  - player stats:
    - HP, hunger, thirst, stamina
    ** class/type => role/archetype, ex: Warrior, Medic **
    ** each class has difference stats and skill **

  # more on class:
    - determines the stats: eg: higher strength
    - unlocks unique skills/crafting recipes
    - in multiplayer party -> players can pick different roles to cooperate

  # background:
    - character story and personality. eg: ex-military can start with a knife.
    - so story dialogues might change, based on who the character is.
    - also it can effect the gameplay => so cook or farmer -> crafts better food

# exploration:
  - move around in a map/grid (text commands: go north, enter the forest)
  - random survival events: eg: wolf attack, find food, weather changes->effect stats eg: strength

# inventory & loot:
  - pick up items from loot tables
  * what is a loot table?
    - a probability-based list of items -> drops when player defeats an enemy, opens a chest, explores a location, eg: 40%->berries and 1%->rare amulet
    - Scalability → different zones/monsters can each have their own loot table.

    🧩 How It Fits into System Design
      - Player Service requests loot after an event (e.g., enemy defeated).
      - Loot Service rolls against the loot table.
      - Inventory Service adds the item to player’s backpack.
      - Event log records it (Player123 looted Rusty Knife).

  - store loot in backpack

# crafting:
  - combine items ->wood + stone = axe
  - crafting takes turns -> eg: start crafting spear => 2 turns later it's notification pop up! (it's a turn based game)

# combat:
  - turned based combat with enemies
  - simple attack/defend actions

====================
# Advanced features:
====================

# quests & story:
  - branching stories
  - consequences affect story overall world

# survival mechanics
  - hunger/thirst decreases per turn
  - weather events eg: cold->lose stamina

# social features:
  - party system ->players can form groups, share loot.
  - camp building ->shared base

# trading and economy:
  - player to player trading
  - NPC shop with pricing logic

# persistence
  - save/load story progress
  - replay logs ->event sourcing

# event sourcing: (event log)
  Example log for a survival RPG:
    Player created (HP=100, empty inventory).
    Player moved north.
    Player found berries.
    Player ate berries (HP+10).
    Player fought wolf (HP-60).

  From these events, you can rebuild the current state (HP=50, Inventory=[axe]).

  - in a microservice:
    * every action is logged as an event -> other services can listen and update their own state.
    * if a service crashes ->can replay the log ->to restore state

#====================================

# general flow of development:
---

# phase 1: single player core Game loop
  - player service: create player, stats, inventory
  - exploration commands
  - loot tables + inventory
    - each location or box can have different loot table.
  - Turn-based combat with enemies.

# Phase 2: expand the world:
  - map service (zones/location) ->should use a Grid? how exactly code zones/location
  - story/Quest service ->basic branching quests
  - survival service ->hunger, thirst, weather

# phase 3: multiplayer ->turn-based
  - party service ->group of players
  - shared events ->party fight wolves together
  - simple chat service

# phase 4: scaling the system
  - split services: auth, player, inventory, world, combat, Quests
  - Redis/kafka pub-sub for events between services
  - event sourcing for replay/rollback

# phase 5: advanced systems
  - Economy service ->trading, shops
  - Guilds/clans
  - persistence & replay logs
  - deploy with docker, load balancing with nginx

#====================================
#====================================

# how the map and story work together: (different types)

# grid/tile-based map:

  - player moves step by step on a grid
  - each move may trigger:
    - a random encounter ->enemy fight, loot, trap, etc...
    - a story event ->branching dialogue, quest, cutscene.
  - story integration:
    - major quests/events are tied to specific locations on the map
    - random encounters keep the game replayable

  * system design wise:
    - Map service ->tiles, movements, fog of war
    - Event service ->encounters, story triggers
    - Combat service ->if battle happens

# node-based map:

  - map is made of nodes (locations) connected by paths (edges)
  - player chooses which node to travel to ->each node contains an event:
    - combat
    - loot
    - story branching ->meet NPC, choose dialogue

  - story integration:
    - each node = one chunk of story
    - probability-based nodes = random replaybility

  ** in terms of microservice:
    travel = handled by world service
    node resolution = handled by event/quest service

# linear chapters: (visual novel)

  - player progresses through a linear story chapter by chapter
  - within each chapter:
    - exploration is limited to a few locations. eg: jungle, castle, ...
    - choices affect story outcome & loot
  - story integration:
    - focus is on narrative ->no open world exploration
  ** easier system design **

# Hybrid:

  - Map + fixed places for story trigger
  - player moves on a Grid, but story anchors are at key points
  - still random loot and enemies

 -->
