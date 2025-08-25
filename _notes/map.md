<!--

rpg-game/
├── package.json
├── src/
│   ├── core/                # Core engine, reusable across single/multi-player
│   │   ├── entities/        # Player, Enemy, NPC, Item, Quest, etc.
│   │   ├── mechanics/       # Combat, Inventory, Movement, Events
│   │   ├── map/             # Node/Graph representation of world
│   │   └── utils/           # Helpers (random, dice rolls, etc.)
│   │
│   ├── game/                # Single-player orchestration
│   │   ├── GameEngine.ts    # Main loop for single player
│   │   ├── StoryManager.ts  # Story branching logic
│   │   └── SaveSystem.ts    # Save/load progress
│   │
│   ├── server/              # Future multiplayer code (Express/Fastify + WebSocket)
│   │   ├── index.ts
│   │   └── services/
│   │
│   └── index.ts             # Entry point
│
├── tests/                   # Unit tests (Jest/Vitest)
└── README.md


-->
