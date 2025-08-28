<!--

src/
├── app/                     # Application layer (use cases / orchestrators)
│   ├── GameOrchestrator.ts  # Main entry point / game loop
│   └── services/            # Services coordinating domain objects
│
├── domain/                  # Core business logic (independent of UI/infra)
│   ├── characters/          # Entities and logic around characters
│   │   ├── Character.ts
│   │   ├── Player.ts
│   │   ├── Enemy.ts
│   │   └── Stats.ts
│   │
│   ├── combat/              # Combat system (turns, attacks, damage calc)
│   │   ├── Combat.ts
│   │   ├── AttackStrategy.ts
│   │   └── DamageCalculator.ts
│   │
│   ├── items/               # Items, loot, inventory
│   │   ├── Item.ts
│   │   ├── Weapon.ts
│   │   ├── Potion.ts
│   │   └── LootTable.ts
│   │
│   ├── world/               # Map, nodes, quests, locations
│   │   ├── World.ts
│   │   ├── Node.ts
│   │   ├── Quest.ts
│   │   └── Event.ts
│   │
│   └── shared/              # Reusable value objects, utils
│       ├── Result.ts        # FP-style error handling
│       └── types.ts
│
├── infrastructure/          # Tech details (DB, APIs, persistence)
│   ├── persistence/         # Repositories (in-memory now, DB later)
│   │   ├── PlayerRepository.ts
│   │   └── EnemyRepository.ts
│   │
│   ├── adapters/            # Adapters (CLI, Web, Telegram, etc.)
│   │   ├── cli/
│   │   │   └── CLIAdapter.ts
│   │   └── telegram/
│   │       └── TelegramAdapter.ts
│   │
│   └── config/              # Config, env, dependency injection
│       └── container.ts
│
├── ui/                      # Presentation layer (I/O only, no logic)
│   ├── cli/                 # Command line UI
│   │   └── GameCLI.ts
│   └── web/                 # Later: React / Next.js frontend
│       └── GameWeb.tsx
│
└── main.ts                  # Entry point (wires everything together)


 -->
