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




 -->
