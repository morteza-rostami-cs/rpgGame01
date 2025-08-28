<!--

# RPG Game pseudo code:
=======================

# what is rng port and why we need it?

# seedable RNG => a dice that always roles the same sequence. => deterministic

# start with seed: "boobs" => and always get the same sequence => eg: [12, 34, 56, 67, 78]

# examples of it's usecases in RPG game:
=========

# Loot drop from enemies
  - with seed: "boobs" => goblin always drop a dagger
  - with seed: "tools" => goblin always drop a potion

  # so a game session can be recreated/replayable

  # so rng of loot is different with rng of combat => so change randomness in one does not change to other.

# also => reproducible battle outcome

# what is the deal with this forking?
====================================

# we need 2 different sequences -> rng's => one for loot drop and another one for combat-outcome

# one seed to rule them all:!
  # you have one seed for the whole Game:
  # and basically you fork that rng => to get more random sequences => BUT with the same seed
    # one for loot , one for map, combat , etc...

# this means : seed "boobs" => identical play through every single time

# Forking guarantees that combatRNG and lootRNG are mathematically independent but still linked to the same world.

# RNG => stands for random number generator

# so -> even javascript Math.random() is a RNG
# we are going to create a wrapper around it or use more complex algorithm

⚖️ Deterministic vs Non-Deterministic RNG

# Deterministic RNG:

  # starting seed => makes the sequence predictable => reproducible
  Seed = 42 → [0.23, 0.67, 0.45, ...]

  Run again with Seed = 42 → [0.23, 0.67, 0.45, ...]

2. 🎲 Non-Deterministic RNG (aka True RNG / TRNG)
  # true random in real world!
  # also => if just use Math.random() without any seed => not reproducible

==============================================

# map-rng:
=======

src/
├── domain/
│   └── shared/
│       └── rng/
│           └── IRngPort.pseudo        # interface/port
│
├── infrastructure/
│   └── rng/
│       ├── SeededRng.pseudo          # deterministic implementation (LCG / sfc32 style)
│       └── SystemRng.pseudo          # thin wrapper around system Math.random for non-deterministic runs
│
├── domain/
│   ├── items/
│   │   └── LootService.pseudo        # uses IRngPort to roll loot
│   └── combat/
│       └── CombatEngine.pseudo       # uses IRngPort for hit/damage rolls
│
├── app/
│   └── GameOrchestrator.pseudo       # creates RNG (seed) and injects into modules
│
└── infrastructure/
    └── config/
        └── container.pseudo          # wiring (create seeded rng and pass into services)

==============================================
==============================================
==============================================

# /src/domain/shared/rng/IRngPort.ts

interface IRangPort {
  // return a float between [0, 1]
  nextFloat(): float

  // return an integer in [min, max] => inclusive
  nextInt(min: int)

  /
}

# /src/infrastructure/rng/SeededRng.ts

# /src/infrastructure/rng/SystemRng.ts


# /src/domain/items/LootService.ts
# /src/domain/combat/CombatEngine.ts

# /src/app/GameOrchestrator.ts
# /src/infrastructure/config.ts




 -->
