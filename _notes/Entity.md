Love it. Here’s a crisp, no-code, step-by-step plan to build the **Entity base** and derive **Player**, **Enemy**, **NPC**—clean, OOP, SOLID, and future-proof.

---

## 0) Create folders (names matter later)

- `src/core/entities/`
- `src/core/value-objects/`
- `src/core/errors/`
- `tests/entities/`

---

## 1) Define the **Stats** value object (immutable)

- File: `src/core/value-objects/Stats.*`
- Fields: health, maxHealth, attack, defense, speed (add stamina/mana later).
- Invariants: `0 ≤ health ≤ maxHealth`, all numbers ≥ 0.
- Public API (describe it):

  - “create from raw props with validation”
  - “clone with updated fields while re-validating”
  - “applyDamage(amount) → new Stats with clamped health”
  - “applyHeal(amount) → new Stats with clamped health”
  - Equality check (value equality).

- Reason: keep combat math out of entities; entities ask Stats to change itself immutably.

**Tests to write**

- Creating with invalid values throws domain error.
- Damage never drops below 0; heal never exceeds max.
- Equality works by value.

---

## 2) Create domain errors

- File: `src/core/errors/DomainError.*`
- Create a base `DomainError` and specific ones like `InvalidStatsError`, `InvalidEntityNameError`.
- Reason: explicit failure modes, cleaner tests.

---

## 3) Define an **Id** abstraction

- File: `src/core/value-objects/EntityId.*`
- Represent as opaque string but created via an `IdProvider` interface (e.g., `nextId(): string`).
- Provide a simple in-memory provider now; later swap to UUID or distributed ids.
- Reason: decouple id generation, makes testing deterministic.

---

## 4) Specify an **Entity** contract (interface) + base class

- File: `src/core/entities/Entity.*`
- Public surface (describe, don’t code):

  - read-only `id`
  - read-only `name`
  - read-only `stats` (Stats VO)
  - derived getters: `isAlive`
  - behaviors (delegate to Stats): `takeDamage(amount)`, `heal(amount)`
  - serialization: `toPrimitives()` returning plain JSON-safe object

- Invariants:

  - name is non-empty, trimmed; stats valid.

- Design:

  - Keep fields private; expose only intent-based methods.
  - Mutations replace the `Stats` instance (immutability at VO level).

**Tests**

- Empty/whitespace name → error.
- `isAlive` toggles correctly after damage.
- `toPrimitives()` round-trips (see step 9).

---

## 5) Add **type guards** and a **discriminator**

- File: `src/core/entities/EntityKind.*`
- Define an enum or union of kinds: `PLAYER`, `ENEMY`, `NPC`.
- Each concrete entity exposes `kind`.
- Provide type guards: `isPlayer(entity)`, `isEnemy(entity)`, `isNPC(entity)`.
- Reason: safer branching without `instanceof` leaks across package boundaries.

---

## 6) Implement **Player** entity (domain-only, no I/O)

- File: `src/core/entities/Player.*`
- Extra fields (minimal now, extensible later):

  - level, experience
  - class (string enum later), background (string enum later)

- Behaviors to define:

  - `gainExperience(amount)` → levels can be added later
  - `rename(newName)` with validation
  - `respawn()` policy (e.g., restore to some health)—stub for later

- Keep inventory/crafting out for now; they’ll be separate modules referenced by id later.

**Tests**

- Creating a Player requires valid base props.
- Gaining negative XP throws; gaining XP increases total.
- `takeDamage` on Player respects Stats invariants.

---

## 7) Implement **Enemy** entity (stateless AI later)

- File: `src/core/entities/Enemy.*`
- Extra fields:

  - species/type
  - level/tier
  - lootTableId (string) — future integration point
  - experienceReward (number)

- Behaviors:

  - `isHostile()` (for now: always true)
  - `onDefeated()` returns a small primitive summary (e.g., { lootTableId, experienceReward })

**Tests**

- Construct with valid stats.
- `onDefeated()` returns expected summary primitives.

---

## 8) Implement **NPC** entity (dialogue/quest hooks later)

- File: `src/core/entities/Npc.*`
- Extra fields:

  - role (e.g., merchant, questGiver, storyteller)
  - dialogueTreeId (string)

- Behaviors:

  - `canTrade()` based on role
  - `dialogueRef()` returns its dialogue tree id as primitive

**Tests**

- Role gates `canTrade()`.
- Dialogue reference is exposed as primitive.

---

## 9) Add **serialization contracts**

- File: `src/core/entities/serialization.*`
- Define a plain “primitives” shape for each entity (`PlayerPrimitives`, etc.).
- Provide factory functions to **rebuild** entities from primitives (no I/O).
- Reason: later you’ll persist via repositories; now you can snapshot/restore locally.

**Tests**

- For each entity: create → `toPrimitives()` → `fromPrimitives()` → deep equality (id, name, stats, extras).

---

## 10) Define **factories/builders** (pure, validated)

- Files:

  - `src/core/entities/factories/PlayerFactory.*`
  - `src/core/entities/factories/EnemyFactory.*`
  - `src/core/entities/factories/NpcFactory.*`

- Inputs are minimal primitives plus an `IdProvider`; output is a valid entity or throws.
- Reason: centralize construction rules; keeps constructors thin; supports seeding and tests.

**Tests**

- Factories reject invalid inputs (bad names, negative XP, etc.).
- Factories integrate with a fake `IdProvider` for deterministic ids.

---

## 11) Wire up **index exports** (ergonomics)

- File: `src/core/entities/index.*`
- Re-export Entity base, concrete entities, factories, type guards, and primitives.
- Reason: clean import paths for the rest of the app.

---

## 12) Documentation & linting

- Add TSDoc to public methods (what it does, invariants, throws).
- ESLint rules for:

  - explicit return types
  - no parameter reassignment
  - no magic numbers (except in tests)

---

## 13) Quick manual spec (sanity scenario)

- Create a Player with 30/30 HP.
- Create an Enemy that deals 12 damage twice; assert Player alive then dead.
- Serialize Player before and after combat; ensure round-trip works.
- Enemy defeat summary exposes `lootTableId` and `experienceReward`.

(Write these as test cases; no code here.)

---

### Done right, you now have:

- A validated, immutable-VO-based **Entity** core
- Clear derivations for **Player / Enemy / NPC**
- Clean construction via **factories**
- **Serialization** for persistence later
- Tests that lock behavior before you build combat, inventory, or the map

Want me to do the same “tell-me-what-to-code” plan next for the **Map (node/graph) module** so you can hook entities into locations and events?
