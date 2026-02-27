# An Answer — Singleplayer Horror Game Architecture

## 1) High Concept
**Title:** *An Answer*  
**Genre:** Psychological + creature survival horror  
**Playtime target:** 10–15 minutes  
**Structure:** One massive, connected Dragon Academy map with locked progression layers  

You play as an aging former student returning to the abandoned Dragon Academy after a letter claims your dragon may still be alive. You must survive until dawn while uncovering the academy’s final secret, confronting **The Sovereign Husk**, and deciding whether to flee, banish, or be consumed.

---

## 2) Core Systems Architecture

## 2.1 Class Model (Engine-agnostic)

```pseudo
class GameManager:
    state: GameState
    clock: float  # minutes since start
    dawnTime: float = 15.0
    map: AcademyMap
    player: Player
    monster: Monster
    sanitySystem: SanitySystem
    puzzleATC: EconomicPuzzle
    endingResolver: EndingResolver
    eventBus: EventBus

    function startGame()
    function update(dt)
    function triggerFinalSequence()
    function checkDawnCondition()
    function endGame(endingType)
```

```pseudo
class Player:
    name: string
    health: float
    stamina: float
    ammo: int
    position: Vector3
    inventory: Inventory
    currentDragon: Dragon | null
    sanity: float
    trustScore: float  # relationship with selected dragon
    cluesFound: int
    hasSolvedATC: bool
    hasEnteredVault: bool

    function move(input)
    function interact(target)
    function fireWeapon()
    function reload()
    function takeDamage(amount)
    function modifyTrust(amount)
    function equipDragon(dragon)
```

```pseudo
class Monster:  # The Sovereign Husk
    state: MonsterState  # Roam, Lurk, StalkBurst, Chase, RitualRage
    position: Vector3
    aggression: float
    awarenessRadius: float
    isStunned: bool
    stunTimer: float
    mimicCooldown: float
    hallucinationCooldown: float
    reflectionManifestChance: float

    function updateAI(player, map, sanity)
    function roam()
    function investigateSound(source)
    function burstStalk(player)
    function startChase(player)
    function applyStun(duration)
    function triggerHallucination(player)
    function appearInReflection(surface)
```

```pseudo
class Dragon:
    type: DragonType  # EmberDrake, MistWyrm, VoltSerpent
    health: float
    trust: float
    loyaltyState: LoyaltyState  # Wary, Bonded, Fractured
    lightRadius: float
    scoutRange: float

    function useAbility(context)
    function scoutAhead(map)
    function comfortPlayer(player)
    function reactToLowSanity(player)
```

```pseudo
class SanitySystem:
    current: float = 100
    min: float = 0
    max: float = 100
    darkDrainRate: float
    monsterDrainRate: float
    cursedObjectDrainRate: float
    recoveryRateNearLight: float

    function update(dt, environment, monsterProximity, dragonSupport)
    function applyDrop(amount, reason)
    function recover(amount)
    function getTier() -> SanityTier  # Stable, Unsteady, Frayed, Broken
    function onZeroSanity(player, monster, map)
```

```pseudo
class EconomicPuzzle:
    fixedCost: int = 2700
    variableCost: int = 300
    quantity: int = 100
    expectedATC: int = 30
    attempts: int
    solved: bool

    function interact(inputValue)
    function validateAnswer(inputValue) -> bool
    function onWrongAnswer(game)
    function onCorrectAnswer(game)
```

---

## 2.2 Supporting Classes

```pseudo
class AcademyMap:
    rooms: list<Room>
    doors: list<Door>
    interactables: list<Interactable>
    navGraph: Graph

class Room:
    name: string
    dangerLevel: int
    lightLevel: float
    tags: set<string>  # "reflection", "cursed", "safe-ish", "ritual"

class EndingResolver:
    function resolve(player, sanitySystem, puzzle, dragon, truthFlags) -> EndingType

class DialogueSystem:
    function playMonsterLine(contextTag)
    function glitchSubtitle(text)
```

---

## 3) Map Design (One Massive Connected Academy)

## 3.1 Macro Layout
Design the academy as a **single seamless looped structure** with shortcuts that unlock to compress backtracking:

1. **Entrance Hall (Start Zone)**
   - Grand staircase, broken chandelier, tutorial prompts.
   - Two initial routes: Library Wing and Dormitory Passage.
2. **Library of Scales (Clue Zone)**
   - Lore books, hidden ledgers, first reflection encounter.
3. **Dormitory Ruins (Pressure Zone)**
   - Narrow corridors, unstable lighting, footstep mimic tutorial.
4. **Dragon Forge (Puzzle Gate)**
   - Economic puzzle console controls power for hatchery locks.
5. **Hatchery Vault Antechamber (Choice Zone)**
   - Three corrupted eggs: Ember, Mist, Volt.
6. **Hall of Mirrors (Sanity Trap Corridor)**
   - Fake doors and reflection manifestations.
7. **Undercrypt Transit / Boiler Spine (Chase Shortcuts)**
   - Fast traversal route once opened; high monster risk.
8. **Final Vault (Ritual Zone)**
   - Dawn ritual circle, truth reveal, ending trigger.

## 3.2 Pacing by Time Slice
- **0–3 min:** Orientation, minimal direct threat.
- **3–7 min:** Clues + mild stalk bursts.
- **7–10 min:** Forge puzzle under stress.
- **10–12 min:** Dragon selection + emotional beat.
- **12–15 min:** Vault rush, final chase, ending.

---

## 4) Player & Progression Design

- **Role:** Former student, physically slower than prime years.
- **Primary goals:**
  1. Escape academy
  2. Banish The Sovereign Husk
  3. Rescue what remains of dragon bond
  4. Uncover academy’s hidden economic-ritual truth
  5. Survive until dawn

### Resource Rules
- Ammo is scarce: 3–6 rounds total in a run.
- Rounds only stun Husk for 4–8 seconds.
- Healing minimal (1–2 med items max).
- Light sources finite battery unless supported by dragon.

---

## 5) Monster Design — The Sovereign Husk

## 5.1 Behavior Pillars
- **Freely roams** by default; not always hard-locking onto player.
- **Rare constant pursuit mode** triggers during major milestones.
- **Unkillable**; player can only delay via stun rounds and environment.

## 5.2 AI State Machine

```pseudo
if state == Roam:
    patrol weighted by noise + darkness + unsolved objectives
    occasionally mimic player's recent footsteps in nearby corridor
    if playerSeen and visibilityHigh: state = StalkBurst

if state == StalkBurst:
    follow at medium distance for 8-15s
    maybe appear in reflection surfaces
    if playerLooksBackRepeatedly: increase hallucination chance
    if distanceClose: state = Chase
    else if timerEnds: state = Roam

if state == Chase:
    sprint pathfind toward player
    if stunned: state = Lurk
    if playerBreaksLOS and uses safe shortcut: state = Roam

if state == RitualRage:  # final sequence or zero sanity amplification
    persistent pursuit for fixed duration
    hallucinations + mimicry frequency doubled
```

## 5.3 Hallucination Toolkit
- Fake footsteps behind/above.
- Door slams in unopened wings.
- Reflection apparition independent of true position.
- Distorted subtitles that imply wrong puzzle math.

---

## 6) Sanity System

## 6.1 Sanity Loss Sources
- Low light / darkness volume.
- Monster proximity.
- Cursed objects (blood ledgers, dragon masks, cracked mirrors).
- Wrong ATC answers.

## 6.2 Threshold Effects
- **75–51 (Unsteady):** subtle audio warble.
- **50–26 (Frayed):** HUD jitter, occasional fake footsteps.
- **25–1 (Broken):** fake interact prompts, false monster silhouettes.
- **0 (Collapse):**
  - Hallucinations spike.
  - Monster movement speed/aggression buff.
  - Dragon may lash out or disobey.
  - Fake doors appear in Hall of Mirrors.
  - UI corruption (numbers, compass drift, flashing glyphs).

```pseudo
function onZeroSanity(player, monster, map):
    monster.aggression += 0.4
    monster.state = RitualRage
    map.enableFakeDoors(true)
    player.currentDragon.loyaltyState = Fractured (chance-based)
    triggerUIRupture()
```

---

## 7) Dragon System

## 7.1 Narrative Rule
Player starts dragonless; original dragon is believed dead.

## 7.2 Hatchery Choice (Exactly One)
1. **Ember Drake**
   - Ability: short-range flame burst that **stuns Husk** briefly.
   - Best for aggressive escape windows.
2. **Mist Wyrm**
   - Ability: calming fog aura that **reduces sanity drain**.
   - Best for stable ritual ending path.
3. **Volt Serpent**
   - Ability: static surge increasing **player movement speed** and dodge recovery.
   - Best for chase survival.

## 7.3 Trust System
Trust changes from interactions:
- + trust: protect dragon, heed warning chirps, share scarce resources.
- - trust: reckless gunfire near dragon, repeated panic sprints leaving it behind.

Trust gates:
- Low trust: delayed ability cooldown, possible disobedience.
- High trust: dragon scouts hidden route, assists in banishment ritual.

---

## 8) Economic Puzzle (Dragon Forge)

## 8.1 Puzzle Setup
Terminal inscription:
> “To cast one hundred dragon-core rounds, declare the true mean burden.”

Given values:
- Fixed Cost = 2700
- Variable Cost = 300
- Quantity = 100

Required formula:
- `ATC = (Fixed + Variable) / Quantity`
- `ATC = (2700 + 300) / 100 = 30`

## 8.2 Interaction Sequence Example

```pseudo
onForgeConsoleInteract():
    showPrompt("Compute ATC to ignite the Forge")
    input = player.enterNumber()

    if input == 30:
        puzzle.onCorrectAnswer(game)
    else:
        puzzle.onWrongAnswer(game)
```

### Wrong Answer Response
1. Lights flicker to near-black.
2. Immediate sanity loss: `-8 to -15`.
3. Monster proximity event: Husk teleports to nearest blind corridor node.
4. Audio taunt plays.

```pseudo
function onWrongAnswer(game):
    attempts += 1
    game.sanitySystem.applyDrop(10, "Forge miscalculation")
    game.map.flickerLights(zone="Dragon Forge", duration=6s)
    game.monster.investigateSound(source=ForgeNode)
    game.dialogue.playMonsterLine("economic_mockery")
```

### Correct Answer Response
1. Forge powers up.
2. Hatchery blast door unlocks.
3. Grants 1 dragon-core stun round.

```pseudo
function onCorrectAnswer(game):
    solved = true
    game.player.hasSolvedATC = true
    game.map.unlockDoor("HatcheryGate")
    game.player.ammo += 1
    game.dialogue.playMonsterLine("prophecy_interrupt")
```

---

## 9) Gameplay Loop Implementation

```pseudo
START -> EntranceHallExplore
    -> EarlyMonsterNearMiss
    -> LibraryClueHunt
    -> ForgeATCPuzzle
    -> HatcheryDragonChoice
    -> VaultEntry
    -> FinalChaseAndRitual
    -> EndingResolution
```

### Key Trigger Examples
- **Entrance Hall:** crossing sigil triggers first distant roar + sanity tutorial.
- **Library:** reading 3rd ledger triggers reflection apparition.
- **Forge:** each wrong ATC attempt increases Husk aggression tier.
- **Hatchery:** selecting egg sets dragon abilities and ending flags.
- **Vault:** if sanity == 0 at any point, corruption ending flag primed.

---

## 10) Ending Logic

## 10.1 Flags
- `solvedATC`
- `dragonTrustHigh`
- `sanityZeroInVault`
- `truthDiscovered` (found key lore entries)
- `rightDragonChosen` (contextual to truth clue)
- `survivedToDawn`

## 10.2 Resolver Pseudocode

```pseudo
function resolveEnding(flags):
    if flags.sanityZeroInVault:
        return CORRUPTION

    if flags.survivedToDawn and flags.solvedATC and flags.dragonTrustHigh:
        if flags.truthDiscovered and flags.rightDragonChosen:
            return REUNION
        return BANISH_HUSK

    if flags.survivedToDawn:
        return ESCAPE_ONLY

    return CORRUPTION
```

### Ending Definitions
- **Escape Only:** Player survives and exits; Husk remains bound to academy.
- **Banish the Husk:** Requires correct ATC + high dragon trust; ritual succeeds.
- **Corruption:** Triggered by sanity collapse in final vault; player consumed/assimilated.
- **Reunion:** Discover truth of original dragon and align choice/trust for true ending.

---

## 11) Event Trigger Matrix (Monster + Sanity)

| Trigger | Condition | Result |
|---|---|---|
| Footstep Mimic | Player alone in dark corridor > 20s | Fake rear footsteps + mild sanity drop |
| Reflection Manifest | Enter mirrored room while Frayed/Broken sanity | Husk image appears in mirror only |
| Stalk Burst | Player solves major objective | Monster follows at medium range |
| Constant Pursuit | Final vault opened OR zero sanity | Monster enters RitualRage |
| Dragon Panic | Sanity reaches 0 with low trust | Dragon may scratch/bite and flee briefly |
| Fake Doors | Broken/0 sanity in Hall of Mirrors | Temporary interactable false exits |

---

## 12) Monster Dialogue Samples (Economic / Dragon Prophecy)

- “Balance sheet of bone… liabilities hatch at dawn.”
- “Your average cost is blood divided by heirs.”
- “Thirty was the answer; ruin was the margin.”
- “Fixed grief. Variable fear. Totaled soul.”
- “Debit the flame. Credit the scale. Close the living.”
- “Choose an egg, alumnus… and amortize your name.”
- “The dragon you buried still accrues.”

Use DSP filters: pitch-shift down, time-stretch, reverse-tail whispers, occasional bitcrush.

---

## 13) Audio/Lighting Direction

- **Audio:** low-frequency drones, distant chain rattles, directional footstep deception.
- **Silence windows:** 5–10 seconds before stalk events to create anticipation.
- **Lighting:** dynamic flicker tied to monster state; safe pools around dragon.
- **UI glitches:** only at low sanity to avoid overuse.

---

## 14) Minimal Implementation Plan

1. Build connected academy graybox and nav graph.
2. Implement player movement, interaction, and sparse ammo stun.
3. Implement Husk AI states + hallucination events.
4. Implement sanity system + threshold effects.
5. Script forge ATC puzzle and hatchery unlock.
6. Add dragon selection, abilities, and trust model.
7. Implement final vault ritual + ending resolver.
8. Add sound pass and lighting pass.
9. Playtest for 10–15 minute completion target.

This architecture keeps scope compact while preserving replayability via dragon choice, sanity management, and ending branches.
