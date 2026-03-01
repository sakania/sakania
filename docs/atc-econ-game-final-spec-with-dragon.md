# ATC HORROR ECONOMICS GAME — FINAL ARCHITECTURE WITH FULL DRAGON SYSTEM

## System Prompt (for executor AI)
You are implementing a 3D first-person horror game in Three.js with vanilla HTML/CSS/JS that teaches Average Total Cost through a one-shot high-stakes puzzle. This includes a full dragon companion system with trust mechanics and 4 distinct endings. You must not hallucinate features. If info is missing, ask.

## Hard Constraints
- **Platform:** Perplexity
- **Repo:** https://github.com/sakania/sakania.git
- **Branch rule:** Create a new branch; NEVER commit to or modify main
- **Deliverable:** Runnable at http://localhost:8000 via `python3 -m http.server 8000`
- **NO BS. NO HALLUCINATION.**

## Core Gameplay Contract (Complete MVP with Dragon)

### 1) First-person 3D controller
- Pointer-lock mouse look (pitch + yaw)
- WASD movement + Shift sprint
- Player capsule collision vs level geometry (simple AABB or grid-based)
- **Stats:**
  - Health = 100 (no pickups)
  - Sanity = 100
  - Ammo = 2
  - Flashlight Battery = 100%
  - Dragon Ability Uses = 3
- **Flashlight:**
  - "F" key toggles
  - Drains battery at 5%/sec when on
  - Darkness drains sanity at 2/sec when off
  - Battery pickups: 2 total in level (restore 50% each)

### 2) Level geometry (6 connected zones)

#### Tutorial Safe Room (Entrance Hall)
- Spawn point, no monster
- Wall text: "WASD to move. Shift to sprint. F for flashlight. E to interact."
- One lore note: "The academy's ledgers speak of fixed costs (rent, never changing) and variable costs (materials, paid per unit produced)."
- Exit door unlocks after 10 seconds

#### Corridor (transition zone)
- Dark hallway connecting Entrance to Library
- Monster spawns here after player leaves tutorial
- First "fake footsteps" audio trigger

#### Library (lore collection zone)
- 3 lore notes (must collect all 3 to unlock Forge door):
  1. "Fixed Cost Ghost: $2700. It haunts even silent forges."
  2. "Variable Cost Demon: $300 for 100 units. It only appears when you produce."
  3. "Average Total Cost = (Fixed + Variable) ÷ Quantity. The Forge demands this truth."
- One hiding spot (locker) with "Hold E to hide" prompt
- Ambient: flickering lights, distant rumble

#### Dragon Forge (ATC puzzle room)
- Central console (interactable)
- Walls have scribbled cost equations, burnt ledgers
- One ammo pickup
- Door to Hatchery locked until puzzle solved correctly

#### Hatchery (dragon choice room)
- Only accessible after correct Forge answer
- 3 corrupted eggs on pedestals with descriptions:
  - **Ember Drake:** "Born from forge-fire. Can stun threats with short flame burst."
  - **Mist Wyrm:** "Born from lost memories. Calms fear and steadies the mind."
  - **Volt Serpent:** "Born from storm-charged scales. Grants bursts of desperate speed."
- Player must choose one egg (interact with E)
- After choice, dragon hatches and follows player
- One lore note: "Original Dragon Truth: Your bond was severed long ago. Only the Mist Wyrm remembers."
- Exit door to Vault unlocks after egg chosen

#### Vault (finale room)
- Ritual circle (interactable)
- Activating ritual triggers final phase
- Exit gate (only unlocks based on ending conditions)

### 3) ATC Forge puzzle (one attempt only)

#### Pre-interaction hint:
Console text: "The Forge awaits your answer. Remember: ATC includes BOTH the rent-ghost and the materials-demon."

#### Puzzle modal:
- **Question:** "When it produces 100 units, a firm's total variable cost is $300 and its total fixed cost is $2700. What is the average total cost?"
- **Options:** a) $30 b) $3 c) $24 d) $27
- **One attempt only, hard-lock after submission**

#### Post-submission reveal:
**Math:** ATC = (2700+300)/100 = 30

- **If correct (a):**
  - "Each unit bears the $27 rent-ghost + $3 materials-demon = $30. The Forge accepts your truth."
  - Success chime
  - Unlock Hatchery door
  - Monster stays in Roam

- **If wrong (b/c/d):**
  - Option-specific feedback
  - Dissonant tone + monster roar
  - Sanity -12
  - Screen flicker (2s blackout)
  - Monster enters Chase immediately
  - Monster line: "Thirty per ember. Thirty per sin."
  - Hatchery door remains locked (player cannot get dragon if wrong answer)

### 4) Monster AI (The Sovereign Husk)

#### Finite State Machine:
- **Roam:** Patrol waypoints, slow footsteps
- **Lurk:** Reposition near player in darkness (>5s flashlight off)
- **StalkBurst:** 2s aggressive advance then retreat
- **Chase:** Line-of-sight pursuit at 1.2× walk speed
- **Relentless:** Triggered by wrong Forge answer OR sanity = 0; 1.5× sprint speed, immune to stun
- **Stunned:** 4s freeze (player stun or dragon Ember ability), then 6s resist window

#### Sensing:
- Distance < 20 units: increase aggression
- Line-of-sight raycast
- Sound: sprint alerts monster

#### Audio:
- **Roam:** distant footsteps
- **Lurk:** breathing/whispers
- **StalkBurst:** fast footsteps + growl
- **Chase:** loud growl + fast footsteps
- **Relentless:** roar + very fast footsteps

#### Visual:
- **Roam/Lurk:** shadowy silhouette
- **Chase:** visible, glowing eyes
- **Relentless:** fully visible, red glow, distorted

#### Damage:
Contact → health -20, shake + red flash

### 5) Dragon Companion System (Full Implementation)

#### Dragon Choice (Hatchery):
- Player interacts with one of 3 eggs
- Choice is permanent
- Dragon hatches immediately and begins following

#### Dragon Types + Abilities:

**Ember Drake:**
- **Ability:** "Dragon Stun" (press Q)
- **Effect:** Stuns monster for 2 seconds (bypasses resist window, but NOT Relentless immunity)
- **Uses:** 3 total (no recharge)
- **Trust bonus:** +5 per successful stun that saves player

**Mist Wyrm:**
- **Ability:** "Calm Mind" (press Q)
- **Effect:** Stop sanity drain for 8 seconds + restore 10 sanity immediately
- **Uses:** 3 total
- **Trust bonus:** +3 per use when sanity < 50
- **Special:** Required for "Reunion" ending (only Mist Wyrm knows original dragon truth)

**Volt Serpent:**
- **Ability:** "Lightning Sprint" (press Q)
- **Effect:** Player speed × 1.8 for 8 seconds
- **Uses:** 3 total
- **Trust bonus:** +2 per use during Chase state

#### Dragon Behavior (AI):
- Follows player at 2-unit distance
- Provides light source (equivalent to flashlight, doesn't drain battery)
- **Scouts:** if monster within 15 units, dragon makes alert sound (short chirp)
- Trust affects responsiveness: at trust < 30, dragon may delay ability activation by 1s

#### Trust System (0-100, starts at 50):

**Trust increases (+):**
- Use dragon ability when actually needed: +2 to +5 (varies by type)
- Stand still near dragon for 3s (calm interaction): +1
- Collect lore notes with dragon present: +2

**Trust decreases (-):**
- Sprint continuously for >5s with dragon nearby: -2
- Sanity < 20 for >10s: -5
- Take damage with dragon present: -3
- Waste dragon ability (use when no threat): -5

**Trust thresholds:**
- **0-29 (Fractured):** Dragon may refuse ability command (50% chance fail), slower follow speed
- **30-69 (Unstable):** Normal behavior
- **70-100 (Loyal):** Ability cooldown reduced to 3s (instead of 6s resist), required for Banish + Reunion endings

#### Dragon UI:
- Top-right corner: Dragon icon + trust bar (0-100)
- Ability uses: "Dragon Ability: X/3"
- Trust text: "Bond: Fractured/Unstable/Loyal"

### 6) Sanity System

#### Drain:
- Darkness: -2/sec
- Monster < 10 units: -5/sec
- Lore notes (first pickup): -8 one-time

#### Restore:
- Flashlight on OR dragon light: stops darkness drain
- Standing in light zones: +1/sec
- Mist Wyrm ability: +10 immediate + stop drain 8s

#### Thresholds:
- **≤60:** Minor hallucinations (fake footsteps, shadow flickers)
- **≤30:** Fake doors, reversed whispers
- **=0:** UI glitch, monster → Relentless, dragon trust -20 (may turn hostile temporarily if trust < 30)

### 7) Stun mechanic (player)
- Right-click fires stun if ammo > 0
- Raycast 10 units, 4s stun
- After stun: 6s resist window
- Relentless: immune
- UI: "Stun Rounds: X/2"

### 8) Hiding mechanic
- Lockers: "Hold E to hide"
- Lock camera view
- Monster cannot detect unless saw entry (5s check delay)
- Max 15s hide time
- Dragon forced to "wait outside" (disappears during hide)

### 9) Audio system (Web Audio API)

#### Ambient:
- Low drone loop
- Wind/rumble per zone

#### Player:
- Footsteps (walk/sprint)
- Breathing (heavier at low sanity)

#### Monster:
- Footsteps (speed varies by state)
- Breathing/whispers (Lurk)
- Growl (Chase transition)
- Roar (Relentless)

#### Dragon:
- Wing flutter (following)
- Alert chirp (monster nearby)
- Ability sounds:
  - Ember: flame whoosh
  - Mist: ethereal hum
  - Volt: electric crackle

#### UI:
- Clicks, chime (correct), dissonant tone (wrong), stun zap, damage thud

#### Stingers:
- Wrong Forge answer: loud spike
- Sanity = 0: harsh noise burst
- Dragon hatches: soft magical chime

#### Hallucinations:
- Fake footsteps (sanity ≤60)
- Reversed whispers (sanity ≤30)

### 10) Four Endings System

Ending conditions checked at Vault exit gate:

#### Ending 1: "Escape Only"
- **Trigger:** Player reaches Vault exit, but does NOT meet other ending requirements
- **Condition:** forgePuzzle.solved == false OR dragon.trust < 70
- **Screen:** "You escaped the academy, but the Husk endures. Your bond remains broken."
- **Debrief:** Shows correct ATC answer + formula, notes player survived but didn't achieve full resolution

#### Ending 2: "Banish the Husk"
- **Trigger:** Player activates ritual circle in Vault successfully
- **Conditions:**
  - forgePuzzle.solved == true (correct ATC answer)
  - dragon != null (player chose dragon)
  - dragon.trust >= 70 (Loyal bond)
  - player.activatedRitual == true (interacted with ritual circle)
- **Screen:** "The Forge's truth and your Loyal bond banish the Sovereign Husk. The academy is silent at last."
- **Debrief:** Shows ATC formula + "Trust and knowledge together broke the curse."

#### Ending 3: "Corruption"
- **Trigger:** Sanity reaches 0 during Vault phase OR health = 0
- **Condition:** sanity.value == 0 OR player.health == 0 while in Vault
- **Screen:** "The Husk claims you. Your ledger remains unbalanced. Darkness consumes all."
- **Debrief:** Shows correct ATC answer (educational even in failure) + "Fear and ignorance led to ruin."

#### Ending 4: "Reunion" (True/Best Ending)
- **Trigger:** Player discovers original dragon truth AND achieves high trust with Mist Wyrm
- **Conditions:**
  - forgePuzzle.solved == true
  - dragon.type == MistWyrm (only Mist Wyrm remembers)
  - dragon.trust >= 70
  - world.discoveredOriginalDragonTruth == true (collected Hatchery lore note about original bond)
  - player.activatedRitual == true
- **Screen:** "You remember. The Mist Wyrm was yours all along. The curse breaks, the bond restored. You leave together."
- **Debrief:** Shows ATC formula + "Knowledge, memory, and trust together unlock the truth."

#### Ending trigger logic (pseudocode):
```
function resolveEnding():
    if player.health == 0 OR sanity.value == 0:
        return Corruption
    
    if world.inVault and player.activatedRitual:
        if dragon.type == MistWyrm and dragon.trust >= 70 and world.discoveredOriginalDragonTruth:
            return Reunion
        
        if forgePuzzle.solved and dragon.trust >= 70:
            return Banish
    
    return Escape
```

#### Ritual Circle (Vault interactable):
- Press E to activate
- Triggers 10-second channeling animation
- If interrupted by monster (contact), ritual fails and player must try again
- Success: sets player.activatedRitual = true and checks ending conditions

### 11) Progression Flow (8-12 minutes)

**Phase 1: Tutorial (0-1 min)**
- Entrance Hall, learn controls, collect first lore note

**Phase 2: Library (1-4 min)**
- Monster spawns in Corridor
- Collect 3 lore notes
- Manage sanity + monster encounters
- Learn hiding

**Phase 3: Forge (4-6 min)**
- Answer ATC puzzle (one attempt)
- If correct: Hatchery door unlocks → proceed to Phase 4
- If wrong: Hatchery locked, monster Relentless, game becomes survival-only (Escape or Corruption endings only)

**Phase 4: Hatchery (6-8 min, only if Forge correct)**
- Choose dragon egg (Ember/Mist/Volt)
- Dragon hatches and joins
- Collect "Original Dragon Truth" lore note
- Trust system begins
- Vault door unlocks

**Phase 5: Vault Finale (8-12 min)**
- Navigate to ritual circle
- Activate ritual (may require multiple attempts if monster interrupts)
- Reach exit gate
- Ending resolves based on conditions

### 12) Educational scaffolding

**Pre-puzzle:**
- 4 lore notes total teach fixed vs variable costs + ATC formula

**During puzzle:**
- Console hint before opening modal
- Clear question with 4 options

**Post-puzzle:**
- Math reveal + option-specific feedback
- Horror lore reinforces economic concepts

**Post-game:**
- All 4 endings show correct ATC answer + formula in debrief
- Learning goal achieved regardless of outcome

## Implementation Checklist

### Core systems:
- [ ] First-person controller + collision
- [ ] 6 connected zones (Entrance, Corridor, Library, Forge, Hatchery, Vault)
- [ ] HUD (health, sanity, ammo, battery, dragon trust, dragon ability uses)

### Monster:
- [ ] 6-state FSM with sensing + audio + visuals
- [ ] Damage on contact
- [ ] Relentless immunity to stun

### Sanity:
- [ ] Drain (darkness, monster proximity)
- [ ] Restore (light sources, Mist Wyrm ability)
- [ ] Hallucinations at thresholds

### Dragon:
- [ ] Hatchery room with 3 egg choices
- [ ] Dragon follow AI with light source
- [ ] 3 distinct abilities (Ember stun, Mist calm, Volt speed) with Q key input
- [ ] Trust system (0-100, affects behavior + endings)
- [ ] Trust UI display
- [ ] Ability use counter (3 max, no recharge)

### ATC Forge:
- [ ] One-attempt puzzle with modal
- [ ] Math reveal + lore feedback
- [ ] Correct unlocks Hatchery; wrong locks it + triggers Relentless

### Ritual:
- [ ] Vault ritual circle interactable
- [ ] 10s channeling (interruptible)
- [ ] Sets flag for ending resolution

### Endings:
- [ ] 4 distinct endings (Escape, Banish, Corruption, Reunion)
- [ ] Ending logic checks trust, dragon type, ritual, puzzle, sanity, health
- [ ] All endings show ATC debrief

### Audio:
- [ ] Ambient loops
- [ ] Player/monster/dragon sounds
- [ ] UI feedback + stingers + hallucinations

### Progression:
- [ ] Locked doors (Forge → Hatchery → Vault) based on objectives
- [ ] 4 lore notes collectible
- [ ] Ritual circle in Vault

## File Structure

### Modify:
- `index.html` — HUD + dragon UI + link CSS
- `game.js` — All systems including DragonCompanion class
- `style.css` — Dragon UI extensions

### Create:
- `docs/atc-econ-game-final-spec-with-dragon.md` — This doc

### New branch:
- `feature/atc-horror-dragon-system`

## Acceptance Criteria

### Functional:
- [ ] Player navigates 6 zones with dragon companion (after Hatchery)
- [ ] ATC Forge answered once; correct unlocks Hatchery, wrong locks it
- [ ] 3 dragon choices with distinct abilities (3 uses each, Q key)
- [ ] Trust system (0-100) affects dragon behavior + endings
- [ ] Monster AI with Relentless state (immune to stun)
- [ ] Sanity + flashlight + battery management
- [ ] Ritual circle in Vault (10s channel)
- [ ] 4 endings resolve correctly based on trust/type/puzzle/ritual

### Educational:
- [ ] 4 lore notes teach ATC concept
- [ ] Forge shows ATC = (2700+300)/100 = 30
- [ ] All endings include formula debrief

### Technical:
- [ ] Runs at localhost:8000
- [ ] New branch only
- [ ] All audio working (procedural Web Audio)
