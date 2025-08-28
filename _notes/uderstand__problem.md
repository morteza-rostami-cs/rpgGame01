<!--

# text-based, turned-based RPG GAME:
=====================================

# player can explore the map/world -> world is a graph of nodes
# each node may contain:
  # random combat
  # random loot
  # or fixed story/quest ->their always on the same location and story

# player also survives ->health, hunger, thirst, stamina
# Player can loot items and craft ->tools, equipment
#story/quests ->triggers when entering specific node!
# the player progresses through the narrative while moving on the map. ????????????????????????????

# core features:

  # player System:
    - stats: HP, hunger, thirst, stamina
    - inventory: items, resources
    - class & background:
      - effect starting stats/items
      - story flavor ???????????????????????????

  # map/world:
    - represented as nodes/graph
    - nodes = locations with possible events
    - player moves from node to node ->edges = allowed paths
    - node types:
      empty, loot, combat, story, shop

  # survival mechanics:
    - hunger, thirst, stamina ->decrease over time/turns
    - health decreases if ->hunger/thirst too low
    - resting restores stamina/health

  # combat system:
    - turn-based encounters
    - enemy stats and attacks partially randomize
    - rewards: XP, loot, sometimes crafting materials

  # loot system:
    - loot tables per node or enemy
    - items: consumables, crafting materials, weapons, armor
    - pick up and store in inventory

  # crafting system
    - combine materials -> craft: tools or consumables
    - crafting takes turns or actions to complete
    - can be simple recipes to start

  # store and quest system
    - some nodes trigger fixed story events or quests
    - player make choices that effect story outcomes
    - Quest rewards: XP, special items , unlocks

  # story <-> map interaction
    - option 1: story node is a detour -> after story ends, player is back to the same node
    - option 2: story progression unlocks new nodes -> some some nodes are locked until player completes the quest.
    ## option 1 is simpler for start.

  # turn-based game loop:
    - each turn:
      - player chooses action -> move, explore, rest, craft, check inventory
      - node events trigger ->loot, combat, story
      - survival stats update

  # persistent
    - save/load player stats, inventory, current node, story progress

===========================================

🧩 Sub-Problems / Modules

We can think of the game as these loosely-coupled modules:

Player Module → stats, inventory, actions

Entity Module → Player, Enemy, NPC

Map Module → nodes, edges, navigation

Combat Module → turn-based fight logic

Loot Module → loot tables, item drops

Crafting Module → recipes, materials, crafting queue

Story/Quest Module → story nodes, quest progress, choices

Game Engine Module → orchestrates turns, calls other modules

Persistence Module → save/load (JSON for MVP)

Random/Event Module → randomized loot, combat, survival events

================================
⚡ Simplifying Assumptions for MVP

Map = fixed small graph, nodes labeled by type (story, combat, loot)

Combat & loot = randomized, story = fixed

Story nodes = do not change map layout (player returns to same node after completing story)

Focus on offline single-player first

All modules communicate locally in memory

================================
================================
================================

# two ways of handling story and quests:

  # non-linear sandbox
    - Quests are standalone side stories , scattered across the map
    - no required order, you can do any, skip some, or try them all
    - player wins by completing enough quests (XP), or all, while surviving!
    - no boss fight! no main storyline ! just survival + discovery
    - this is simpler

  # semi-linear/progressive story
    - Quests are connected into a main storyline
    - some quests unlock new parts of the map
      ## you can't cross the river -> until help the black smith to fix the bridge

    - difficulty ramps up -> stronger enemies, mini-bosses
    - player wins by reaching the final quest/boss ->not just surviving!

#================================
#================================
#================================
#================================

# phase 1:
==========

# text-based, turn-based RPG:

  # can be played in CLI
  # world/map -> is a node graph
  # each node is a location with some events: eg: combat, Quest
  # random loot and encounters
  # fixed story ?????????????????????????
  # save/load
  # deterministic replays ????????????????

  # one repo, one process (for now)
  # clean modules (bounded context)
  # with ports and adapters ->for extracting as services later ??????????????

# absolute basic game loop (MVP)

  # start new Game
  # create player with starting stats
  # create player inventory

  # generate or load map: with fixed quests and random loot/encounter

  #place on starting node
  # show current node info->name + brief description + exits (nodes)

  # player chooses one of these actions:
    # move to connected nodes
    # explore (probabilistic)
      # inspect loot
      # encounter ->enemy combat, etc...

    # rest ->recover, health, stamina, ->cost a turn
    # craft -> if recipes available
    # inspect -> player stats/inventory: heal, equip weapon/map snippet

  # in each node -> make a choice -> resolve outcome
    # story/Quest trigger / loot / combat

  # apply survival decay by each turn -> hunger, thirst, stamina -> check defeat
  # Log the turn as a domain event ??????????????
  # repeat until -> win, lose, quit
  # at any time: save and load

========================
# Player module
-----------------------------

  # player.stats:
    HP, hunger, thirst, stamina, XP/level

  # commands: (methods)
    # createPlayer ->factory
    # damage
    # runSurvivalTick ->each turn: stamina, hunger goes down

    # heal/feed/drink

  # queries:
    # getPlayerView

  # Emits: events
    # playerCreated, playerDamaged, playerDied

# Inventory & crafting module:
-----------------------------

  # inside inventory:
    # items, stack-counts (multiple of same item), recipes

  # commands ->methods:
    addItem, removeItem, craftItem
  # Queries:
    getInventoryView, getKnownRecipes
  # Emits
    # itemAdded, itemRemoved, itemCrafted

# world/map module:
-----------------------------

  # node graph
  # variables:
    # nodes, edges

  # node types:
    # empty, loot, combat, story/quest

  # commands:
    moveToNode
  # queries -> getCurrentNode, getNeighbors
  # Emits:
    playerMoved, nodeVisited

# quests/story module ->fixed
-----------------------------

  # story node ->deterministic outcome->simple choices

  # methods:
    startStoryAtNode,
    ChooseStoryOption

  # queries
    getActiveStoryState

  # emits
    storyStarted
    storyOptionChosen
    storyResolved

  # story is not connected to other stories (scattered side quests) sandbox
  # story does not unlock map (nodes)
  # after story resolution ->back on the same node

#  Loot module:
-----------------------------
  # random and stateless
  # loot table content ->per node or enemy
    # basically: a probability table of items that a node or enemy can drop

  # methods
    rollLoot(tableId, rng) -> Item[]

  # Emits events:
    none
  # deterministic: =>uses injected rng ?????????????????????

# combat module:
-----------------------

  # turn resolver
  # methods
    startCombat
    playerAction(attack/useItem/flee)
    resolveTurn

  # Queries
    getCombatView

  # Emits
    combatStarted
    combatTurnResolved
    EnemyDefeated
    playerDefeated

# Game engine
-----------------

  # turn loop
  # command router ????????

  # reads player input ->cli adapter
  # routes to modules => CQRS
  # applies survival tick after each turn
  # persists event log + snapshot via repositories

  # Emits
    turnAdvanced

# Design Guardrails

  # CQRS at module boundaries
    separate command handlers ->mutations
    query mappers ->views

  # domain events inside process:
    - every state change ->emits an event
    - append event to an event-log ->array or file

  # deterministic RNG:
    - Provide RngPort { next(): number }; seed it at game start for reproducible sessions.

  # repositories behind interfaces
    - PlayerRepo, WorldRepo, SaveRepo—today JSON/SQLite; tomorrow Postgres.

  # Content versioning:
    - contentVersion = "1.0.0" attached to saves; prevent loading incompatible data later.


=====================================================

# later:
  # test runner, lint rules.

========================================================
🧵 Implementation Order (12 tiny steps, minimal stress)

  #1 Project skeleton: folders, TypeScript,

  #2 RNG Port: seedable RNG

  #3 Stats VO (immutable)

  #4 Player module: create, damage/heal, survival tick

  #5 Inventory module: items & simple recipes.

  #6 World module: tiny hardcoded graph (5–7 nodes).

  #7 Loot module: one table for loot nodes, one for enemy drops.

  #8 Combat module: 1v1, attack + flee, basic enemy AI.

  #9 Story module: 1–2 fixed story nodes with 2 options each.

  Action system: define legal player commands (move, attack, use item, craft, flee).

  #10 Event log + snapshot repos: JSON persistence + replay.

  Game End conditions (death + win).

  #11 Game Orchestrator: command router + per-turn survival tick.

  #12 CLI adapter: minimal menu (print views, accept commands).

  #13 Stop here—Phase A done when you can finish a short run end-to-end with save/load and replay.













































# what does it mean -> fixed story ?
==

# locations are fixed on the map (nodes ) ->eg: town, forest, dungeon, castle

# map does not change between playthroughs

# at each location: story/quest
  - enemies, quests, rewards are predesigned
    eg: Entering the Forest → you always fight Wolf Pack (stats: health 50, damage 10) and then get Potion x1.

  - Visiting the Castle Gate → you always trigger a dialogue with the guard NPC.

# fixed story:
  enter forest -> fight wolves -> pass the bridge => get 4 gold




======================================

🗺️ Minimum Data Shapes (just to align thinking—no code)

PlayerView: { id, name, hp, maxHp, hunger, thirst, stamina, xp, level }

InventoryView: { items: Array<{id, name, qty}> }

NodeView: { id, name, type, neighbors: string[] }

CombatView: { player: {...}, enemy: { name, hp, maxHp }, turn: "player"|"enemy" }

StoryView: { nodeId, title, text, options: Array<{id, label}> }

========================================

➕ Commands & Events (MVP set you can commit to)

Commands

CreateGame(seed)

MoveToNode(nodeId)

ExploreCurrentNode() ← calls Loot or triggers Combat based on node type/probability

Rest()

Craft(recipeId)

UseItem(itemId)

StartStoryAtCurrentNode()

ChooseStoryOption(optionId)

SaveGame(), LoadGame(saveId)

Events

GameCreated(seed)

PlayerMoved(nodeId)

ExplorationLootGranted(items[])

CombatStarted(enemyKind)

CombatTurnResolved(playerDelta, enemyDelta)

EnemyDefeated(enemyKind, rewards)

PlayerDefeated()

ItemCrafted(recipeId)

StoryStarted(nodeId)

StoryOptionChosen(optionId)

StoryResolved(outcomeId)

TurnAdvanced(number)

GameSaved(saveId), GameLoaded(saveId)

(Events are append-only; state can be rebuilt by replay.)

 -->
