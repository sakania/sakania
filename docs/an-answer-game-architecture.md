# An Answer — Full Game Architecture (Engine-Agnostic)

This document gives you the full architecture to build **An Answer** as a short, singleplayer horror game (10–15 minutes), without tying implementation to Unity or any specific engine.

---

## 1) Game Snapshot

- **Project Name:** An Answer
- **In-world title used on menus:** Ashfall: The Last Ember
- **Genre:** Psychological horror + creature horror + limited combat horror
- **Playtime Target:** 10–15 minutes
- **Map Style:** One massive connected Dragon Academy map with five zones:
  - Entrance Hall
  - Library
  - Dragon Forge
  - Hatchery
  - Vault

### Player Fantasy
You are an old student returning to your ruined academy to uncover the truth, survive the night, rescue what remains of your bond, and choose whether to flee or fight fate.

### Win/Lose Intent
- You cannot permanently kill the monster.
- You can survive, banish, become corrupted, or reach a reunion truth ending.
- Your sanity and dragon trust shape how much control you keep near dawn.

---

## 2) Core Architecture (Systems + Ownership)

## 2.1 Runtime System Graph

```text
GameDirector
├── WorldState
├── PlayerSystem
├── MonsterSystem (The Sovereign Husk)
├── DragonSystem
├── SanitySystem
├── PuzzleSystem (ATC Forge)
├── EncounterSystem
├── NarrativeSystem
├── AudioLightingSystem
└── EndingSystem
```

## 2.2 Data Ownership Rules

- **GameDirector** owns mission phase and global progression flags.
- **WorldState** owns door locks, zone states, clues collected, and interactable status.
- **PlayerSystem** owns health, movement, ammo, inventory, and interaction context.
- **SanitySystem** owns sanity values, thresholds, and side effects.
- **MonsterSystem** owns AI state, aggression, stalk/chase logic, and illusions.
- **DragonSystem** owns selected dragon, companion behaviors, and trust.
- **PuzzleSystem** owns the forge ATC challenge and pass/fail consequences.
- **EndingSystem** reads only final flags and resolves exactly one ending.

---

## 3) Main Classes (Pseudocode)

## 3.1 GameDirector

```pseudo
class GameDirector:
    phase: enum {Entrance, Library, Forge, Hatchery, Vault, Finale, Ended}
    timeSinceStart: float
    dawnTime: float = 15min

    world: WorldState
    player: Player
    sanity: SanitySystem
    monster: SovereignHusk
    dragon: DragonCompanion | null
    forgePuzzle: ForgeATCPuzzle
    endings: EndingResolver

    function startGame():
        phase = Entrance
        lock(HatcheryDoor)
        lock(VaultDoor)

    function update(dt):
        timeSinceStart += dt
        sanity.update(dt)
        monster.update(dt)
        if dragon != null: dragon.update(dt)
        checkPhaseTransitions()

    function checkPhaseTransitions():
        if phase == Entrance and world.libraryClueCount >= 1:
            phase = Library
        if phase == Library and world.libraryClueCount >= 3:
            phase = Forge
        if phase == Forge and forgePuzzle.solved:
            unlock(HatcheryDoor)
            phase = Hatchery
        if phase == Hatchery and dragon != null:
            unlock(VaultDoor)
            phase = Vault

    function triggerFinale():
        phase = Finale
        monster.enterRelentlessPursuit()

    function finishGame():
        ending = endings.resolve(world, player, sanity, dragon, forgePuzzle)
        phase = Ended
        showEnding(ending)
```

## 3.2 Player

```pseudo
class Player:
    health: float = 100
    ammo: int = 2
    moveSpeed: float
    sprintSpeed: float

    inventory: list<Item>
    chosenDragonType: enum? {EmberDrake, MistWyrm, VoltSerpent}

    function move(inputVector)
    function interact(interactable)
    function takeDamage(amount)
    function fireStunRound(monster):
        if ammo <= 0: return false
        ammo -= 1
        monster.applyStun(4s)
        return true
```

## 3.3 SovereignHusk (Monster)

```pseudo
class SovereignHusk:
    state: enum {Roam, Lurk, StalkBurst, Chase, Relentless, Stunned}
    aggression: float
    canBeKilled: bool = false

    roamRoute: list<NavPoint>
    targetPlayer: Player

    function update(dt):
        if state == Stunned: return
        evaluateVisibilityAndSound()
        maybeMimicFootsteps()
        maybeSpawnReflection()
        maybeTriggerHallucination()

    function maybeEscalate():
        # Rare but dangerous behavior spike
        if randomChance(veryLow): state = Relentless

    function applyStun(duration):
        state = Stunned
        wait(duration)
        state = Roam
```

## 3.4 SanitySystem

```pseudo
class SanitySystem:
    value: float = 100
    darkDrain: float = 2/sec
    monsterDrain: float = 5/sec
    cursedObjectDrain: float = 8/burst

    function update(dt):
        drain = 0
        if playerInDarkness: drain += darkDrain
        if monsterNear: drain += monsterDrain
        value = clamp(value - drain*dt, 0, 100)
        processThresholdEffects()

    function processThresholdEffects():
        if value <= 60: enableMinorHallucinations()
        if value <= 30: enableFakeDoorsAndAudioCorruption()
        if value == 0:
            forceSevereHallucinations()
            monster.boostAggression()
            dragon.mayTurnHostileTemporarily()
            ui.injectGlitches()
```

## 3.5 DragonCompanion

```pseudo
class DragonCompanion:
    type: enum {EmberDrake, MistWyrm, VoltSerpent}
    trust: float = 50

    function update(dt):
        followPlayer()
        provideLight()
        scoutNearbyThreats()
        adjustTrustFromPlayerState()

    function abilityUse(monster):
        if type == EmberDrake: monster.applyStun(2s)
        if type == MistWyrm: sanity.reduceDrainFor(8s)
        if type == VoltSerpent: player.gainSpeedBuff(8s)

    function adjustTrustFromPlayerState():
        if sanity.value < 20: trust -= small
        if playerUsesCalmingInteractions: trust += small
```

## 3.6 ForgeATCPuzzle

```pseudo
class ForgeATCPuzzle:
    fixedCost = 2700
    variableCost = 300
    quantity = 100
    answer = 30
    solved = false

    function submit(input):
        if input == answer:
            solved = true
            powerForge()
            unlockHatchery()
        else:
            flickerLights()
            sanity.drop(12)
            monster.forceNearbyPresence()
```

## 3.7 EndingResolver

```pseudo
class EndingResolver:
    function resolve(world, player, sanity, dragon, forgePuzzle):
        if world.inFinalVault and sanity.value == 0:
            return CorruptionEnding

        if forgePuzzle.solved and world.ritualCompleted and dragon.trust >= 70:
            return BanishTheHuskEnding

        if world.discoveredOriginalDragonTruth and dragon.type == MistWyrm and dragon.trust >= 70:
            return ReunionEnding

        return EscapeOnlyEnding
```

---

## 4) Massive Connected Map Layout

```text
                       [Upper Walkway / Observation Loops]
                                  |             |
[Entrance Hall] ---- [Library] ---- [Dragon Forge] ---- [Hatchery] ---- [Vault]
      |                 |                 |                  |              |
  side classrooms   archives         furnace pit       egg chambers     ritual ring
  + collapsed wing  + mirrors         + ammo locker     + care alcoves   + exit gate
```

### Zone Roles
- **Entrance Hall:** onboarding, first omen, first fake audio cue.
- **Library:** lore, truth breadcrumbs, cost/accounting clues.
- **Dragon Forge:** economic puzzle gate with risk escalation.
- **Hatchery:** emotional decision point; choose one corrupted egg.
- **Vault:** endgame ritual + chase + ending determination.

---

## 5) Game Loop Blueprint (Minute-by-Minute)

1. **0:00–2:00 Entrance**
   - Learn movement/interact.
   - Hear mimicked footsteps that are not yours.
2. **2:00–5:00 Library**
   - Gather 3 clues (dragon records + cost inscriptions + truth fragment).
3. **5:00–8:00 Forge**
   - Solve ATC puzzle under pressure.
   - Wrong attempts increase danger and sanity loss.
4. **8:00–10:00 Hatchery**
   - Choose Ember/Mist/Volt egg.
   - Dragon companion joins and trust begins moving.
5. **10:00–15:00 Vault Finale**
   - Ritual under relentless pursuit.
   - Outcome resolved by sanity, trust, truth, and puzzle state.

---

## 6) Encounter & Trigger Matrix

| Trigger | Condition | Immediate Effect | Persistent Effect |
|---|---|---|---|
| Shadow Corridor | Player enters low-light zone | Sanity drain starts | Hallucination chance rises |
| Reflection Surface | Sanity ≤ 60 | Husk appears in mirror only | Player directional confusion |
| Forge Wrong Answer | Submitted value != 30 | Light flicker + sanity -12 | Husk stalk state probability + |
| Sanity hits 0 | Any phase | UI glitch storm + fake doors | Husk speed/aggression boost |
| Hatchery choice | Egg selected | Dragon spawn + trust baseline | Companion ability path locked |
| Vault ritual start | Player activates sigil | Husk enters relentless pursuit | Ending flags begin lock-in |

---

## 7) Dragon System Details

## 7.1 Dragon Choice Effects

- **Ember Drake**
  - Strength: reliable short stun utility.
  - Best for: high-pressure chase control.
- **Mist Wyrm**
  - Strength: reduces sanity drain.
  - Best for: narrative/true ending stability.
- **Volt Serpent**
  - Strength: movement burst and route recovery.
  - Best for: escape-heavy playstyle.

## 7.2 Trust Model

Trust starts at 50 and changes from player behavior:
- + Calm interactions at shrines
- + Successful scout follow-ups
- - Repeated panic sprint near dragon
- - Extended low-sanity states
- - Failed ritual prep actions

Trust thresholds:
- **0–29:** Fractured (may disobey or panic)
- **30–69:** Unstable Bond
- **70–100:** Loyal Bond (required for strongest outcomes)

---

## 8) Monster Behavior Model

## 8.1 State Machine

```text
Roam -> Lurk -> StalkBurst -> Chase
  ^                          |
  |                          v
  +------ Stunned <----- Relentless
```

### State Notes
- **Roam:** patrols broad routes, low pressure.
- **Lurk:** out-of-sight positioning and audio bait.
- **StalkBurst:** short, aggressive proximity tests.
- **Chase:** visible pursuit.
- **Relentless:** sustained pursuit in finale or critical sanity collapse.
- **Stunned:** only temporary interruption from rare ammo/dragon ability.

---

## 9) ATC Puzzle (In-Game + Explanation)

## 9.1 Puzzle Prompt
At the Dragon Forge console:
- Total Fixed Cost = $2700
- Total Variable Cost = $300
- Units = 100
- Question: **Average Total Cost = ?**
- Options: **a) $30** b) $3 c) $24 d) $27

## 9.2 Correct Formula
\[
ATC = \frac{Fixed\ Cost + Variable\ Cost}{Quantity}
\]
\[
ATC = \frac{2700 + 300}{100} = \frac{3000}{100} = 30
\]

✅ **Correct answer: a) $30**

### Why others are wrong
- **b) $3**: incorrect scale; would require dividing by 1000 or dropping major costs.
- **c) $24**: not equal to total-cost-per-unit from provided numbers.
- **d) $27**: uses only fixed cost (2700/100) and ignores variable cost.

### Optional lore text for puzzle wall
- Fixed costs are paid even at low output.
- Variable costs rise with production.
- ATC always includes both before dividing by units.

---

## 10) Endings Logic

1. **Escape Only**
   - Player survives and leaves, but fails full banish conditions.
2. **Banish the Husk**
   - Forge solved + ritual completed + dragon trust ≥ 70.
3. **Corruption Ending**
   - Sanity reaches 0 during final vault sequence.
4. **Reunion Ending**
   - Original dragon truth discovered + right emotional bond path + high trust.

---

## 11) Example Monster Dialogue (Economic / Prophecy Style)

- “Your fixed costs are carved in bone, old student.”
- “Variable fear compounds per breath you take.”
- “Thirty per ember. Thirty per sin.”
- “You seek break-even in a ledger of ash.”
- “Scale your hope; scale your ruin.”
- “When sanity reaches zero, all debts mature at dawn.”

---

## 12) Practical Build Checklist

- [ ] Connected map with five zones and no loading breaks
- [ ] Health + sanity + movement fully playable
- [ ] Husk AI supports roam/stalk/chase/relentless + temporary stun
- [ ] Hallucinations include footsteps, reflections, and fake doors
- [ ] Forge puzzle enforces ATC=30 and failure consequences
- [ ] Hatchery enables one dragon choice only
- [ ] Dragon trust affects mechanics + endings
- [ ] Vault finale resolves exactly one of four endings

This architecture is your full design blueprint for shipping a short playable version of **An Answer**.
