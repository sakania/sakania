// ============================================================================
// ATC HORROR ECONOMICS GAME - TURN 9: DRAGON COMPANION SYSTEM
// ============================================================================

// CONSTANTS - All magic numbers defined here
const CONSTANTS = {
    // Player stats
    PLAYER_HEALTH_MAX: 100,
    PLAYER_SANITY_MAX: 100,
    PLAYER_AMMO_MAX: 2,
    PLAYER_BATTERY_MAX: 100,
    
    // Camera settings
    CAMERA_FOV: 75,
    CAMERA_NEAR: 0.1,
    CAMERA_FAR: 1000,
    CAMERA_PITCH_LIMIT: Math.PI / 2 - 0.1,
    
    // Mouse sensitivity
    MOUSE_SENSITIVITY: 0.002,
    
    // Player movement
    PLAYER_WALK_SPEED: 3.5,
    PLAYER_SPRINT_SPEED: 6.0,
    PLAYER_HEIGHT: 1.6,
    PLAYER_RADIUS: 0.3,
    
    // Physics
    GRAVITY: 9.8,
    
    // Room dimensions
    ENTRANCE_WIDTH: 10,
    ENTRANCE_DEPTH: 10,
    LIBRARY_WIDTH: 14,
    LIBRARY_DEPTH: 12,
    FORGE_WIDTH: 12,
    FORGE_DEPTH: 10,
    HATCHERY_WIDTH: 12,
    HATCHERY_DEPTH: 12,
    VAULT_WIDTH: 10,
    VAULT_DEPTH: 10,
    ROOM_HEIGHT: 4,
    WALL_THICKNESS: 0.3,
    DOORWAY_WIDTH: 2,
    
    // Stat change amounts
    DAMAGE_MONSTER_CONTACT: 20,
    DAMAGE_TEST_AMOUNT: 10,
    SANITY_DRAIN_DARKNESS: 2,
    SANITY_DRAIN_MONSTER_NEAR: 5,
    SANITY_DRAIN_LORE_NOTE: 8,
    SANITY_RESTORE_LIGHT: 1,
    SANITY_RESTORE_MIST_ABILITY: 10,
    SANITY_TEST_AMOUNT: 5,
    BATTERY_DRAIN_RATE: 5,
    BATTERY_RESTORE_PICKUP: 50,
    BATTERY_TEST_AMOUNT: 10,
    
    // Flashlight settings
    FLASHLIGHT_INTENSITY: 1.5,
    FLASHLIGHT_DISTANCE: 15,
    FLASHLIGHT_ANGLE: Math.PI / 6,
    FLASHLIGHT_PENUMBRA: 0.3,
    FLASHLIGHT_DECAY: 2,
    FLASHLIGHT_COLOR: 0xffffcc,
    
    // Interaction settings
    INTERACTION_RANGE: 3,
    INTERACTION_RAYCAST_LAYERS: 1,
    
    // Lore note settings
    LORE_NOTE_GLOW_COLOR: 0xffaa44,
    LORE_NOTE_GLOW_INTENSITY: 2,
    LORE_NOTE_SIZE: 0.3,
    LORE_LOG_DURATION: 5000,
    
    // Monster settings
    MONSTER_ROAM_SPEED: 2.0,
    MONSTER_CHASE_SPEED: 4.5,
    MONSTER_RETREAT_SPEED: 3.0,
    MONSTER_HEIGHT: 2.0,
    MONSTER_RADIUS: 0.5,
    MONSTER_DETECTION_BASE: 8,
    MONSTER_DETECTION_SANITY_MULT: 0.08,
    MONSTER_ATTACK_RANGE: 1.5,
    MONSTER_RETREAT_DURATION: 8,
    MONSTER_PROXIMITY_SANITY_RANGE: 5,
    MONSTER_ROAM_WAYPOINT_DELAY: 3,
    
    // Dragon settings (TURN 9)
    DRAGON_FOLLOW_DISTANCE: 2.0,
    DRAGON_LIGHT_INTENSITY: 1.2,
    DRAGON_LIGHT_DISTANCE: 10,
    DRAGON_ALERT_RANGE: 15,
    DRAGON_ALERT_COOLDOWN: 5000,
    DRAGON_ABILITY_STUN_DURATION: 2,
    DRAGON_ABILITY_MIST_DURATION: 8000,
    DRAGON_ABILITY_VOLT_DURATION: 8000,
    DRAGON_ABILITY_VOLT_MULT: 1.8,
    
    // Darkness threshold
    DARKNESS_THRESHOLD: 0.5,
};

// UI TEXT CONSTANTS
const UI_TEXT = {
    CLICK_TO_START: "Click to start",
    PRESS_E_INTERACT: "Press E to interact",
    PRESS_E_FORGE: "Press E to answer the Forge",
    PRESS_E_EGG: "Press E to choose this dragon",
    HEALTH_LABEL: "Health",
    SANITY_LABEL: "Sanity",
    AMMO_LABEL: "Stun Rounds",
    BATTERY_LABEL: "Battery",
    FLASHLIGHT_LABEL: "Flashlight",
    DRAGON_BOND_LABEL: "Dragon Bond",
    ABILITY_USES_LABEL: "Ability Uses",
    TUTORIAL_TEXT: "WASD to move. Shift to sprint. F for flashlight. E to interact. Q to use ability.",
    TEST_KEYS_INFO: "[TEST MODE] 1: Damage, 2: Drain Sanity, 3: Restore Sanity, 4: Drain Battery, 5: Restore Battery, F: Flashlight, E: Interact, Q: Ability",
};

// ATC LORE NOTE TEXTS (MANDATORY EDUCATIONAL CONTENT)
const LORE_NOTES = {
    NOTE_1: {
        title: "Academy Ledger Fragment I",
        text: "The academy's ledgers speak of two curses: Fixed Costs (rent, machinery, never changing even in silence) and Variable Costs (materials, labor, paid only when you produce). Both must be counted, or the Forge will devour you."
    },
    NOTE_2: {
        title: "The Rent-Ghost ($2700)",
        text: "Fixed Cost Ghost: $2700. The landlord's curse. It haunts even silent forges. You pay this whether you produce 0 units or 1000. The ghost demands its tribute in stillness and in fury alike."
    },
    NOTE_3: {
        title: "The Materials-Demon ($300)",
        text: "Variable Cost Demon: $300 for 100 units. It only appears when you produce. More production = more demon-blood spent. When the forge sleeps, this demon sleeps. When it roars, the demon feeds."
    },
    NOTE_4: {
        title: "The ATC Formula",
        text: "Average Total Cost = (Fixed Cost + Variable Cost) ÷ Quantity. The Forge will demand this truth. Both curses must be counted before dividing by output. Forget one, and the numbers will feast on your sanity."
    },
    NOTE_5: {
        title: "Original Dragon Truth",
        text: "Your bond was severed long ago. The academy took your dragon and corrupted its essence. These hatchlings are born from fragments of what was lost. Only the Mist Wyrm remembers your true connection."
    }
};

// ATC QUIZ DATA (Turn 8 - EXACT SPECIFICATION)
const ATC_QUIZ = {
    correct: 'a' // a) $30
};

const ATC_FEEDBACK = {
    a: "Each unit bears $27 of rent-ghost + $3 of materials-demon = $30 per unit. The Forge accepts your truth. You understood that BOTH costs must be included before dividing.",
    b: "You counted only the materials-demon ($300 ÷ 100 = $3) and pretended the $2700 rent-ghost doesn't exist. But fixed costs haunt you whether you produce or not. The ledger rejects your incomplete accounting.",
    c: "You conjured $24 from thin air, shaving $600 from the true ledger with no economic spell. Total cost is $3000, not $2400. The Forge sees through false numbers.",
    d: "You heard only the rent-ghost ($2700 ÷ 100 = $27) and ignored the materials-demon entirely. But variable costs exist when you produce. Average TOTAL cost includes both. Your truth is incomplete."
};

// DRAGON TYPES (TURN 9)
const DRAGON_TYPES = {
    EmberDrake: {
        name: "Ember Drake",
        description: "Born from forge-fire. Unleashes flame to stun threats for 2 seconds. Aggressive and protective.",
        color: 0xff4400,
        emissive: 0xff2200,
        icon: "🔥"
    },
    MistWyrm: {
        name: "Mist Wyrm",
        description: "Born from lost memories. Calms your mind, restoring 10 sanity and preventing drain for 8 seconds. Gentle and mysterious. This one feels... familiar.",
        color: 0x4488ff,
        emissive: 0x2266dd,
        icon: "💨"
    },
    VoltSerpent: {
        name: "Volt Serpent",
        description: "Born from storm-charged scales. Surges lightning through you, granting 1.8x speed for 8 seconds. Fast and unpredictable.",
        color: 0xffff00,
        emissive: 0xdddd00,
        icon: "⚡"
    }
};

// Room waypoints for monster navigation
const ROOM_WAYPOINTS = [
    { name: 'Entrance', x: 0, z: 0 },
    { name: 'Library', x: 20, z: 0 },
    { name: 'Forge', x: 35, z: 0 },
    { name: 'Hatchery', x: 35, z: -15 },
    { name: 'Vault', x: 35, z: -30 }
];

// ============================================================================
// GAME STATE
// ============================================================================
class GameState {
    constructor() {
        this.health = CONSTANTS.PLAYER_HEALTH_MAX;
        this.sanity = CONSTANTS.PLAYER_SANITY_MAX;
        this.ammo = CONSTANTS.PLAYER_AMMO_MAX;
        this.battery = CONSTANTS.PLAYER_BATTERY_MAX;
        this.flashlightOn = false;
        
        this.dragon = null;
        this.dragonTrust = 50;
        this.dragonAbilityUses = 3;
        this.dragonChosen = false;
        this.sanityDrainPaused = false;
        this.sanityDrainPauseEnd = 0;
        this.speedMultiplier = 1.0;
        this.speedBuffEnd = 0;
        
        this.phase = 'ENTRANCE';
        
        this.loreNotesCollected = 0;
        this.forgePuzzleSolved = false;
        this.hatcheryDoorUnlocked = false;
        this.vaultDoorUnlocked = false;
        this.ritualCompleted = false;
        this.discoveredOriginalDragonTruth = false;
        
        this.sprintStartTime = 0;
        this.lowSanityStartTime = 0;
    }
    
    takeDamage(amount) {
        if (amount < 0) return;
        this.health = Math.max(0, this.health - amount);
        
        // Trust decrease on damage
        if (this.dragon) {
            this.updateDragonTrust(-3);
        }
        
        if (this.health === 0) {
            console.log('Player health reached 0');
        }
    }
    
    restoreHealth(amount) {
        if (amount < 0) return;
        this.health = Math.min(CONSTANTS.PLAYER_HEALTH_MAX, this.health + amount);
    }
    
    drainSanity(amount) {
        if (amount < 0) return;
        
        // Check if sanity drain is paused (Mist Wyrm ability)
        if (this.sanityDrainPaused && Date.now() < this.sanityDrainPauseEnd) {
            return;
        }
        this.sanityDrainPaused = false;
        
        const oldSanity = this.sanity;
        this.sanity = Math.max(0, this.sanity - amount);
        
        if (oldSanity > 60 && this.sanity <= 60) {
            console.log('Sanity threshold: Minor hallucinations enabled (≤60)');
        }
        if (oldSanity > 30 && this.sanity <= 30) {
            console.log('Sanity threshold: Fake doors and audio corruption (≤30)');
        }
        if (this.sanity === 0) {
            console.log('Sanity reached 0: UI glitch + monster boost');
        }
    }
    
    restoreSanity(amount) {
        if (amount < 0) return;
        this.sanity = Math.min(CONSTANTS.PLAYER_SANITY_MAX, this.sanity + amount);
    }
    
    drainBattery(amount) {
        if (amount < 0) return;
        this.battery = Math.max(0, this.battery - amount);
        if (this.battery === 0 && this.flashlightOn) {
            this.flashlightOn = false;
            console.log('Battery depleted - flashlight auto-off');
        }
    }
    
    restoreBattery(amount) {
        if (amount < 0) return;
        this.battery = Math.min(CONSTANTS.PLAYER_BATTERY_MAX, this.battery + amount);
    }
    
    useAmmo() {
        if (this.ammo <= 0) return false;
        this.ammo--;
        return true;
    }
    
    addAmmo(amount) {
        if (amount < 0) return;
        this.ammo = Math.min(CONSTANTS.PLAYER_AMMO_MAX, this.ammo + amount);
    }
    
    toggleFlashlight() {
        if (this.battery === 0) {
            console.log('Cannot toggle flashlight - battery empty');
            return false;
        }
        this.flashlightOn = !this.flashlightOn;
        console.log(`Flashlight: ${this.flashlightOn ? 'ON' : 'OFF'}`);
        return true;
    }
    
    collectLoreNote() {
        this.loreNotesCollected++;
        this.drainSanity(CONSTANTS.SANITY_DRAIN_LORE_NOTE);
        
        // Trust increase for lore collection
        if (this.dragon) {
            this.updateDragonTrust(2);
        }
        
        console.log(`Lore notes collected: ${this.loreNotesCollected}/5`);
    }
    
    updateDragonTrust(amount) {
        if (!this.dragon) return;
        
        const oldTrust = this.dragonTrust;
        this.dragonTrust = Math.max(0, Math.min(100, this.dragonTrust + amount));
        
        if (oldTrust >= 30 && this.dragonTrust < 30) {
            console.log('Dragon trust: FRACTURED (< 30) - May refuse abilities');
        } else if (oldTrust < 70 && this.dragonTrust >= 70) {
            console.log('Dragon trust: LOYAL (≥ 70) - Maximum cooperation');
        }
    }
}

// ============================================================================
// DRAGON COMPANION (TURN 9)
// ============================================================================
class DragonCompanion {
    constructor(type, scene, spawnPosition) {
        this.type = type;
        this.scene = scene;
        this.dragonData = DRAGON_TYPES[type];
        this.position = spawnPosition.clone();
        this.targetPosition = spawnPosition.clone();
        this.active = true;
        this.lastAlertTime = 0;
        
        this.mesh = this.createDragonMesh();
        this.scene.add(this.mesh);
        
        this.lightSource = this.createLight();
        this.scene.add(this.lightSource);
        
        console.log(`Dragon hatched: ${this.dragonData.name}`);
    }
    
    createDragonMesh() {
        const geometry = new THREE.CapsuleGeometry(0.3, 0.6, 8, 16);
        const material = new THREE.MeshStandardMaterial({
            color: this.dragonData.color,
            emissive: this.dragonData.emissive,
            emissiveIntensity: 0.6,
            transparent: this.type === 'MistWyrm',
            opacity: this.type === 'MistWyrm' ? 0.8 : 1.0
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.position.copy(this.position);
        
        // Add glowing eyes
        const eyeGeom = new THREE.SphereGeometry(0.05, 8, 8);
        const eyeMat = new THREE.MeshStandardMaterial({
            color: this.dragonData.emissive,
            emissive: this.dragonData.emissive,
            emissiveIntensity: 2
        });
        
        const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
        leftEye.position.set(-0.1, 0.2, 0.25);
        mesh.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeom, eyeMat);
        rightEye.position.set(0.1, 0.2, 0.25);
        mesh.add(rightEye);
        
        return mesh;
    }
    
    createLight() {
        const light = new THREE.PointLight(
            0xffffff,
            CONSTANTS.DRAGON_LIGHT_INTENSITY,
            CONSTANTS.DRAGON_LIGHT_DISTANCE
        );
        light.castShadow = true;
        light.position.copy(this.position);
        return light;
    }
    
    update(deltaTime, playerController, monsterAI, gameState) {
        if (!this.active) return;
        
        // Calculate position 2 units behind player
        const playerPos = playerController.position;
        const cameraDirection = new THREE.Vector3();
        playerController.camera.getWorldDirection(cameraDirection);
        cameraDirection.y = 0;
        cameraDirection.normalize();
        
        this.targetPosition.copy(playerPos);
        this.targetPosition.sub(cameraDirection.multiplyScalar(CONSTANTS.DRAGON_FOLLOW_DISTANCE));
        this.targetPosition.y = playerPos.y - 0.3;
        
        // Smooth lerp to target
        this.position.lerp(this.targetPosition, deltaTime * 3);
        this.mesh.position.copy(this.position);
        this.lightSource.position.copy(this.position);
        
        // Scout alert
        if (monsterAI) {
            const distToMonster = this.position.distanceTo(monsterAI.position);
            const currentTime = Date.now();
            
            if (distToMonster < CONSTANTS.DRAGON_ALERT_RANGE && 
                (!this.lastAlertTime || currentTime - this.lastAlertTime > CONSTANTS.DRAGON_ALERT_COOLDOWN)) {
                this.alertChirp();
                this.lastAlertTime = currentTime;
            }
        }
        
        // Trust adjustments
        this.updateTrust(deltaTime, playerController, gameState);
    }
    
    updateTrust(deltaTime, playerController, gameState) {
        const currentTime = Date.now();
        
        // Trust decrease: Sprinting for extended period
        if (playerController.isSprinting) {
            if (!gameState.sprintStartTime) {
                gameState.sprintStartTime = currentTime;
            } else if (currentTime - gameState.sprintStartTime > 5000) {
                gameState.updateDragonTrust(-2 * deltaTime);
            }
        } else {
            gameState.sprintStartTime = 0;
        }
        
        // Trust decrease: Low sanity for extended period
        if (gameState.sanity < 20) {
            if (!gameState.lowSanityStartTime) {
                gameState.lowSanityStartTime = currentTime;
            } else if (currentTime - gameState.lowSanityStartTime > 10000) {
                gameState.updateDragonTrust(-5 * deltaTime);
            }
        } else {
            gameState.lowSanityStartTime = 0;
        }
        
        // Trust increase: Standing still near dragon
        if (!playerController.moveForward && !playerController.moveBackward && 
            !playerController.moveLeft && !playerController.moveRight) {
            const distToDragon = playerController.position.distanceTo(this.position);
            if (distToDragon < 3) {
                gameState.updateDragonTrust(1 * deltaTime);
            }
        }
    }
    
    useAbility(monsterAI, gameState) {
        if (gameState.dragonAbilityUses <= 0) {
            console.log('[DRAGON] No ability uses remaining!');
            return false;
        }
        
        // Check trust threshold
        if (gameState.dragonTrust < 30 && Math.random() < 0.5) {
            console.log('[DRAGON] Dragon refused! Bond too weak (Fractured trust).');
            return false;
        }
        
        gameState.dragonAbilityUses--;
        
        // Execute ability based on type
        let success = false;
        if (this.type === 'EmberDrake') {
            success = this.abilityEmberStun(monsterAI, gameState);
        } else if (this.type === 'MistWyrm') {
            success = this.abilityMistCalm(gameState);
        } else if (this.type === 'VoltSerpent') {
            success = this.abilityVoltSpeed(gameState);
        }
        
        return success;
    }
    
    abilityEmberStun(monsterAI, gameState) {
        if (!monsterAI) {
            console.log('[EMBER] No threat detected.');
            gameState.updateDragonTrust(-5); // Wasted ability
            return false;
        }
        
        if (monsterAI.state === 'RETREAT') {
            console.log('[EMBER] Dragon flames surge, but the threat is already fleeing.');
            gameState.updateDragonTrust(-3); // Wasted on retreating enemy
            return false;
        }
        
        monsterAI.stun();
        console.log('[EMBER] Dragon unleashes flame! Monster stunned for 2 seconds.');
        
        // Trust increase: Smart use during chase
        if (monsterAI.state === 'CHASE') {
            gameState.updateDragonTrust(5);
        } else {
            gameState.updateDragonTrust(2);
        }
        
        return true;
    }
    
    abilityMistCalm(gameState) {
        gameState.restoreSanity(CONSTANTS.SANITY_RESTORE_MIST_ABILITY);
        gameState.sanityDrainPaused = true;
        gameState.sanityDrainPauseEnd = Date.now() + CONSTANTS.DRAGON_ABILITY_MIST_DURATION;
        
        console.log('[MIST] Dragon mist calms your mind... (+10 sanity, no drain for 8s)');
        
        // Trust increase: Smart use when sanity low
        if (gameState.sanity < 50) {
            gameState.updateDragonTrust(4);
        } else {
            gameState.updateDragonTrust(2);
        }
        
        return true;
    }
    
    abilityVoltSpeed(gameState) {
        gameState.speedMultiplier = CONSTANTS.DRAGON_ABILITY_VOLT_MULT;
        gameState.speedBuffEnd = Date.now() + CONSTANTS.DRAGON_ABILITY_VOLT_DURATION;
        
        console.log('[VOLT] Dragon lightning surges through you! (1.8x speed for 8s)');
        
        // Trust increase: Smart use
        gameState.updateDragonTrust(3);
        
        return true;
    }
    
    alertChirp() {
        console.log('[DRAGON] *Alert chirp* - Threat nearby!');
    }
    
    destroy() {
        this.active = false;
        this.scene.remove(this.mesh);
        this.scene.remove(this.lightSource);
    }
}

// ============================================================================
// DRAGON CHOICE MODAL (TURN 9)
// ============================================================================
class DragonChoiceModal {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.selectedType = null;
        
        this.modal = document.getElementById('dragonChoiceModal');
        this.confirmModal = document.getElementById('dragonConfirmModal');
        
        this.setupEvents();
    }
    
    setupEvents() {
        // Egg selection buttons
        const eggButtons = document.querySelectorAll('.dragon-egg-card');
        eggButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const dragonType = btn.dataset.dragonType;
                this.showConfirmation(dragonType);
            });
        });
        
        // Confirmation buttons
        document.getElementById('confirmDragonChoice').addEventListener('click', () => {
            if (this.selectedType) {
                this.chooseDragon(this.selectedType);
            }
        });
        
        document.getElementById('cancelDragonChoice').addEventListener('click', () => {
            this.hideConfirmation();
        });
    }
    
    show() {
        if (this.gameManager.state.dragonChosen) {
            this.gameManager.showLoreText(
                'The Eggs',
                'The choice has been made. Your bond is formed.'
            );
            return;
        }
        
        this.modal.classList.remove('hidden');
    }
    
    hide() {
        this.modal.classList.add('hidden');
    }
    
    showConfirmation(dragonType) {
        this.selectedType = dragonType;
        const dragonData = DRAGON_TYPES[dragonType];
        
        document.getElementById('confirmDragonName').textContent = dragonData.name;
        document.getElementById('confirmDragonDesc').textContent = dragonData.description;
        
        this.confirmModal.classList.remove('hidden');
    }
    
    hideConfirmation() {
        this.confirmModal.classList.add('hidden');
        this.selectedType = null;
    }
    
    chooseDragon(dragonType) {
        if (this.gameManager.state.dragonChosen) return;
        
        this.gameManager.state.dragonChosen = true;
        this.gameManager.state.vaultDoorUnlocked = true;
        
        // Spawn dragon
        const spawnPos = this.gameManager.player.position.clone();
        const dragon = new DragonCompanion(
            dragonType,
            this.gameManager.scene,
            spawnPos
        );
        
        this.gameManager.state.dragon = dragon;
        
        // Show message
        const dragonData = DRAGON_TYPES[dragonType];
        this.gameManager.showLoreText(
            'Dragon Hatched',
            `The ${dragonData.name} ${dragonData.icon} bonds with you. Press Q to use dragon ability (3 uses).`
        );
        
        console.log(`✓ Dragon chosen: ${dragonData.name}`);
        console.log('✓ Vault door UNLOCKED');
        
        // Hide modals
        this.hideConfirmation();
        this.hide();
    }
}

// ============================================================================
// FORGE PUZZLE (TURN 8)
// ============================================================================
class ForgePuzzle {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.puzzleAttempted = false;

        this.modal = document.getElementById('forgeModal');
        this.mathReveal = document.getElementById('mathReveal');
        this.choiceFeedback = document.getElementById('choiceFeedback');
        this.quizQuestion = document.getElementById('quizQuestion');

        this.setupEvents();
    }

    setupEvents() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleAnswer(e.target.dataset.answer);
            });
        });

        document.getElementById('continueBtn').addEventListener('click', () => {
            this.hide();
        });
    }

    show() {
        if (this.puzzleAttempted) {
            this.gameManager.showLoreText(
                'The Forge',
                'The Forge has judged you. Its question will not be asked twice.'
            );
            console.log('The Forge has judged you (no retry).');
            return;
        }

        this.modal.classList.remove('hidden');
    }

    hide() {
        this.modal.classList.add('hidden');
    }

    handleAnswer(answer) {
        if (this.puzzleAttempted) return;
        this.puzzleAttempted = true;

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });

        const btn = document.querySelector(`.option-btn[data-answer="${answer}"]`);
        if (btn) {
            btn.classList.add(
                answer === ATC_QUIZ.correct ? 'option-correct' : 'option-wrong'
            );
        }

        setTimeout(() => {
            this.quizQuestion.classList.add('hidden');
            this.mathReveal.classList.remove('hidden');
            this.choiceFeedback.innerHTML = `<p><strong>${ATC_FEEDBACK[answer]}</strong></p>`;
            this.applyOutcome(answer);
        }, 800);
    }

    applyOutcome(answer) {
        const state = this.gameManager.state;

        if (answer === ATC_QUIZ.correct) {
            state.hatcheryDoorUnlocked = true;
            state.forgePuzzleSolved = true;
            state.restoreSanity(20);
            console.log('✓ The Forge accepts your truth (ATC correct: a) $30).');
            console.log('✓ Hatchery door UNLOCKED');
        } else {
            state.drainSanity(12);
            state.hatcheryDoorUnlocked = false;

            document.body.classList.add('screen-flicker');
            setTimeout(() => {
                document.body.classList.remove('screen-flicker');
            }, 2000);

            if (this.gameManager.monsterAI) {
                this.gameManager.monsterAI.forceChase();
            }
            console.log('✗ ATC wrong answer (' + answer + '). Monster forced into Chase state.');
            console.log('✗ Hatchery door remains LOCKED');
        }
    }
}

// ============================================================================
// MONSTER AI
// ============================================================================
class MonsterAI {
    constructor(scene, playerController) {
        this.scene = scene;
        this.playerController = playerController;
        this.state = 'ROAM';
        this.position = new THREE.Vector3(20, CONSTANTS.MONSTER_HEIGHT / 2, 0);
        this.velocity = new THREE.Vector3();
        this.targetWaypoint = null;
        this.waypointDelay = 0;
        this.retreatTimer = 0;
        this.damageCooldown = 0;
        
        this.createMonsterMesh();
    }
    
    createMonsterMesh() {
        const geometry = new THREE.BoxGeometry(0.8, CONSTANTS.MONSTER_HEIGHT, 0.6);
        const material = new THREE.MeshStandardMaterial({
            color: 0x220000,
            emissive: 0x440000,
            emissiveIntensity: 0.5,
            roughness: 0.8
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.position.copy(this.position);
        
        const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const eyeMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 2
        });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.2, CONSTANTS.MONSTER_HEIGHT * 0.35, 0.31);
        this.mesh.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.2, CONSTANTS.MONSTER_HEIGHT * 0.35, 0.31);
        this.mesh.add(rightEye);
        
        this.scene.add(this.mesh);
    }
    
    update(deltaTime, gameState) {
        if (this.retreatTimer > 0) {
            this.retreatTimer -= deltaTime;
            if (this.retreatTimer <= 0) {
                this.state = 'ROAM';
                console.log('Monster: Retreat ended, returning to Roam');
            }
        }
        
        if (this.damageCooldown > 0) {
            this.damageCooldown -= deltaTime;
        }
        
        switch(this.state) {
            case 'ROAM':
                this.updateRoam(deltaTime, gameState);
                break;
            case 'CHASE':
                this.updateChase(deltaTime, gameState);
                break;
            case 'RETREAT':
                this.updateRetreat(deltaTime);
                break;
        }
        
        this.checkPlayerCollision(gameState);
        this.drainSanityProximity(deltaTime, gameState);
        this.mesh.position.copy(this.position);
    }
    
    updateRoam(deltaTime, gameState) {
        const detectionRange = this.getDetectionRange(gameState.sanity);
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        if (distanceToPlayer < detectionRange) {
            this.state = 'CHASE';
            console.log('Monster: Player detected, entering Chase state');
            return;
        }
        
        if (!this.targetWaypoint || this.waypointDelay > 0) {
            this.waypointDelay -= deltaTime;
            if (this.waypointDelay <= 0) {
                this.selectRandomWaypoint();
            }
            return;
        }
        
        const direction = new THREE.Vector3();
        direction.subVectors(this.targetWaypoint, this.position);
        direction.y = 0;
        
        const distance = direction.length();
        if (distance < 1) {
            this.targetWaypoint = null;
            this.waypointDelay = CONSTANTS.MONSTER_ROAM_WAYPOINT_DELAY;
            return;
        }
        
        direction.normalize();
        this.velocity.copy(direction).multiplyScalar(CONSTANTS.MONSTER_ROAM_SPEED);
        
        this.position.x += this.velocity.x * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
    }
    
    updateChase(deltaTime, gameState) {
        const detectionRange = this.getDetectionRange(gameState.sanity);
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        if (distanceToPlayer > detectionRange * 1.5) {
            this.state = 'ROAM';
            console.log('Monster: Lost player, returning to Roam');
            return;
        }
        
        const direction = new THREE.Vector3();
        direction.subVectors(this.playerController.position, this.position);
        direction.y = 0;
        direction.normalize();
        
        this.velocity.copy(direction).multiplyScalar(CONSTANTS.MONSTER_CHASE_SPEED);
        
        this.position.x += this.velocity.x * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
        
        this.mesh.lookAt(this.playerController.position);
    }
    
    updateRetreat(deltaTime) {
        const direction = new THREE.Vector3();
        direction.subVectors(this.position, this.playerController.position);
        direction.y = 0;
        direction.normalize();
        
        this.velocity.copy(direction).multiplyScalar(CONSTANTS.MONSTER_RETREAT_SPEED);
        
        this.position.x += this.velocity.x * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
    }
    
    selectRandomWaypoint() {
        const randomIndex = Math.floor(Math.random() * ROOM_WAYPOINTS.length);
        const waypoint = ROOM_WAYPOINTS[randomIndex];
        this.targetWaypoint = new THREE.Vector3(waypoint.x, this.position.y, waypoint.z);
        console.log(`Monster: Roaming to ${waypoint.name}`);
    }
    
    getDetectionRange(playerSanity) {
        return CONSTANTS.MONSTER_DETECTION_BASE + (playerSanity * CONSTANTS.MONSTER_DETECTION_SANITY_MULT);
    }
    
    checkPlayerCollision(gameState) {
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        if (distanceToPlayer < CONSTANTS.MONSTER_ATTACK_RANGE && this.damageCooldown <= 0) {
            gameState.takeDamage(CONSTANTS.DAMAGE_MONSTER_CONTACT);
            this.damageCooldown = 1.0;
            console.log(`Monster: Contact! Player took ${CONSTANTS.DAMAGE_MONSTER_CONTACT} damage`);
        }
    }
    
    drainSanityProximity(deltaTime, gameState) {
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        if (distanceToPlayer < CONSTANTS.MONSTER_PROXIMITY_SANITY_RANGE && this.state === 'CHASE') {
            const drainAmount = CONSTANTS.SANITY_DRAIN_MONSTER_NEAR * deltaTime;
            gameState.drainSanity(drainAmount);
        }
    }
    
    stun() {
        if (this.state === 'RETREAT') {
            console.log('Monster: Already retreating');
            return false;
        }
        
        this.state = 'RETREAT';
        this.retreatTimer = CONSTANTS.MONSTER_RETREAT_DURATION;
        console.log('Monster: Stunned! Retreating for 8 seconds');
        return true;
    }
    
    forceChase() {
        this.state = 'CHASE';
        console.log('Monster: Forced into Chase state (puzzle failed)');
    }
}

// ============================================================================
// INTERACTABLE OBJECT
// ============================================================================
class InteractableObject {
    constructor(mesh, type, data) {
        this.mesh = mesh;
        this.type = type;
        this.data = data;
        this.isActive = true;
        this.mesh.userData.interactable = this;
    }
    
    interact(gameManager) {
        if (!this.isActive) return false;
        
        switch(this.type) {
            case 'lore_note':
                return this.interactLoreNote(gameManager);
            default:
                console.log(`Interacted with: ${this.type}`);
                return true;
        }
    }
    
    interactLoreNote(gameManager) {
        gameManager.showLoreText(this.data.title, this.data.text);
        gameManager.state.collectLoreNote();
        
        // Check for Original Truth note
        if (this.data.title === LORE_NOTES.NOTE_5.title) {
            gameManager.state.discoveredOriginalDragonTruth = true;
            console.log('✓ Discovered Original Dragon Truth (affects endings)');
        }
        
        if (this.mesh.userData.light) {
            gameManager.scene.remove(this.mesh.userData.light);
        }
        
        gameManager.scene.remove(this.mesh);
        this.isActive = false;
        return true;
    }
}

// ============================================================================
// INTERACTION SYSTEM
// ============================================================================
class InteractionSystem {
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.raycaster.far = CONSTANTS.INTERACTION_RANGE;
        this.currentTarget = null;
    }
    
    update(gameManager) {
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(this.camera.quaternion);
        this.raycaster.set(this.camera.position, direction);
        
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        this.currentTarget = null;
        for (let intersect of intersects) {
            const obj = intersect.object;
            
            // Forge console (Turn 8)
            if (obj.userData.interactableType === 'forge_console') {
                this.currentTarget = {
                    type: 'forge_console',
                    interact: (gm) => gm.forgePuzzle.show()
                };
                break;
            }
            
            // Dragon egg (Turn 9)
            if (obj.userData.interactableType === 'dragon_egg') {
                // Check if hatchery door is unlocked
                if (!gameManager.state.hatcheryDoorUnlocked) {
                    this.currentTarget = {
                        type: 'blocked_egg',
                        interact: (gm) => {
                            gm.showLoreText(
                                'The Eggs',
                                'The eggs are sealed. The Forge must judge you first.'
                            );
                        }
                    };
                } else if (!gameManager.state.dragonChosen) {
                    this.currentTarget = {
                        type: 'dragon_egg',
                        interact: (gm) => gm.dragonChoiceModal.show()
                    };
                } else {
                    this.currentTarget = {
                        type: 'chosen_egg',
                        interact: (gm) => {
                            gm.showLoreText(
                                'The Eggs',
                                'The choice has been made. Your bond is formed.'
                            );
                        }
                    };
                }
                break;
            }
            
            // Regular interactables
            const interactable = obj.userData.interactable;
            if (interactable && interactable.isActive) {
                this.currentTarget = interactable;
                break;
            }
        }
        
        return this.currentTarget !== null;
    }
    
    interact(gameManager) {
        if (this.currentTarget) {
            return this.currentTarget.interact(gameManager);
        }
        return false;
    }
}

// ============================================================================
// PLAYER CONTROLLER
// ============================================================================
class PlayerController {
    constructor(camera) {
        this.camera = camera;
        this.position = new THREE.Vector3(0, CONSTANTS.PLAYER_HEIGHT, 0);
        this.velocity = new THREE.Vector3();
        
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isSprinting = false;
        
        this.radius = CONSTANTS.PLAYER_RADIUS;
        this.height = CONSTANTS.PLAYER_HEIGHT;
        
        this.setupKeyboardControls();
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'KeyW': this.moveForward = true; break;
                case 'KeyS': this.moveBackward = true; break;
                case 'KeyA': this.moveLeft = true; break;
                case 'KeyD': this.moveRight = true; break;
                case 'ShiftLeft':
                case 'ShiftRight': this.isSprinting = true; break;
            }
        });
        
        document.addEventListener('keyup', (event) => {
            switch(event.code) {
                case 'KeyW': this.moveForward = false; break;
                case 'KeyS': this.moveBackward = false; break;
                case 'KeyA': this.moveLeft = false; break;
                case 'KeyD': this.moveRight = false; break;
                case 'ShiftLeft':
                case 'ShiftRight': this.isSprinting = false; break;
            }
        });
    }
    
    update(deltaTime, collisionGeometry, speedMultiplier = 1.0) {
        const direction = new THREE.Vector3();
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
        right.normalize();
        
        if (this.moveForward) direction.add(forward);
        if (this.moveBackward) direction.sub(forward);
        if (this.moveRight) direction.add(right);
        if (this.moveLeft) direction.sub(right);
        
        if (direction.length() > 0) {
            direction.normalize();
        }
        
        const speed = (this.isSprinting ? CONSTANTS.PLAYER_SPRINT_SPEED : CONSTANTS.PLAYER_WALK_SPEED) * speedMultiplier;
        this.velocity.x = direction.x * speed;
        this.velocity.z = direction.z * speed;
        
        const newPosition = this.position.clone();
        newPosition.x += this.velocity.x * deltaTime;
        newPosition.z += this.velocity.z * deltaTime;
        
        if (!this.checkCollision(newPosition, collisionGeometry)) {
            this.position.copy(newPosition);
        } else {
            const slideX = this.position.clone();
            slideX.x = newPosition.x;
            if (!this.checkCollision(slideX, collisionGeometry)) {
                this.position.copy(slideX);
            }
            
            const slideZ = this.position.clone();
            slideZ.z = newPosition.z;
            if (!this.checkCollision(slideZ, collisionGeometry)) {
                this.position.copy(slideZ);
            }
        }
        
        this.camera.position.copy(this.position);
    }
    
    checkCollision(position, collisionGeometry) {
        for (let wall of collisionGeometry) {
            if (this.intersectsAABB(position, wall)) {
                return true;
            }
        }
        return false;
    }
    
    intersectsAABB(playerPos, wall) {
        const playerMinX = playerPos.x - this.radius;
        const playerMaxX = playerPos.x + this.radius;
        const playerMinY = playerPos.y - this.height;
        const playerMaxY = playerPos.y;
        const playerMinZ = playerPos.z - this.radius;
        const playerMaxZ = playerPos.z + this.radius;
        
        const wallMinX = wall.position.x - wall.size.x / 2;
        const wallMaxX = wall.position.x + wall.size.x / 2;
        const wallMinY = wall.position.y - wall.size.y / 2;
        const wallMaxY = wall.position.y + wall.size.y / 2;
        const wallMinZ = wall.position.z - wall.size.z / 2;
        const wallMaxZ = wall.position.z + wall.size.z / 2;
        
        return (playerMinX < wallMaxX && playerMaxX > wallMinX &&
                playerMinY < wallMaxY && playerMaxY > wallMinY &&
                playerMinZ < wallMaxZ && playerMaxZ > wallMinZ);
    }
}

// ============================================================================
// FLASHLIGHT SYSTEM
// ============================================================================
class FlashlightSystem {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        
        this.light = new THREE.SpotLight(
            CONSTANTS.FLASHLIGHT_COLOR,
            CONSTANTS.FLASHLIGHT_INTENSITY,
            CONSTANTS.FLASHLIGHT_DISTANCE,
            CONSTANTS.FLASHLIGHT_ANGLE,
            CONSTANTS.FLASHLIGHT_PENUMBRA,
            CONSTANTS.FLASHLIGHT_DECAY
        );
        
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;
        this.light.shadow.camera.near = 0.5;
        this.light.shadow.camera.far = CONSTANTS.FLASHLIGHT_DISTANCE;
        
        this.light.position.copy(camera.position);
        
        this.target = new THREE.Object3D();
        this.scene.add(this.target);
        this.light.target = this.target;
        
        this.light.visible = false;
        this.scene.add(this.light);
    }
    
    update(isOn) {
        this.light.visible = isOn;
        
        if (isOn) {
            this.light.position.copy(this.camera.position);
            const direction = new THREE.Vector3();
            this.camera.getWorldDirection(direction);
            this.target.position.copy(this.camera.position).add(direction);
        }
    }
}

// ============================================================================
// LEVEL BUILDER
// ============================================================================
class LevelBuilder {
    constructor(scene, gameManager) {
        this.scene = scene;
        this.gameManager = gameManager;
        this.collisionGeometry = [];
        this.interactables = [];
    }
    
    build5Rooms() {
        this.buildEntrance();
        this.buildLibrary();
        this.buildForge();
        this.buildHatchery();
        this.buildVault();
    }
    
    buildEntrance() {
        const offsetX = 0;
        const offsetZ = 0;
        const width = CONSTANTS.ENTRANCE_WIDTH;
        const depth = CONSTANTS.ENTRANCE_DEPTH;
        
        this.buildRoom(offsetX, offsetZ, width, depth, 0x2a2d35);
        this.createDoorway(offsetX + width/2, offsetZ, 'east');
        this.addEntranceProps(offsetX, offsetZ);
        this.createLoreNote(
            { x: offsetX - 3, y: 1.2, z: offsetZ + 3 },
            LORE_NOTES.NOTE_1
        );
    }
    
    buildLibrary() {
        const offsetX = 20;
        const offsetZ = 0;
        const width = CONSTANTS.LIBRARY_WIDTH;
        const depth = CONSTANTS.LIBRARY_DEPTH;
        
        this.buildRoom(offsetX, offsetZ, width, depth, 0x252830);
        this.createDoorway(offsetX - width/2, offsetZ, 'west');
        this.createDoorway(offsetX + width/2, offsetZ, 'east');
        this.addLibraryProps(offsetX, offsetZ);
        
        this.createLoreNote(
            { x: offsetX - 5, y: 1.2, z: offsetZ - 4 },
            LORE_NOTES.NOTE_2
        );
        this.createLoreNote(
            { x: offsetX + 5, y: 1.2, z: offsetZ - 4 },
            LORE_NOTES.NOTE_3
        );
        this.createLoreNote(
            { x: offsetX, y: 1.2, z: offsetZ + 4 },
            LORE_NOTES.NOTE_4
        );
    }
    
    buildForge() {
        const offsetX = 35;
        const offsetZ = 0;
        const width = CONSTANTS.FORGE_WIDTH;
        const depth = CONSTANTS.FORGE_DEPTH;
        
        this.buildRoom(offsetX, offsetZ, width, depth, 0x3a2520);
        this.createDoorway(offsetX - width/2, offsetZ, 'west');
        this.createDoorway(offsetX, offsetZ - depth/2, 'south');
        this.addForgeProps(offsetX, offsetZ);
    }
    
    buildHatchery() {
        const offsetX = 35;
        const offsetZ = -15;
        const width = CONSTANTS.HATCHERY_WIDTH;
        const depth = CONSTANTS.HATCHERY_DEPTH;
        
        this.buildRoom(offsetX, offsetZ, width, depth, 0x202a30);
        this.createDoorway(offsetX, offsetZ + depth/2, 'north');
        this.createDoorway(offsetX, offsetZ - depth/2, 'south');
        this.addHatcheryProps(offsetX, offsetZ);
        
        // TURN 9: Original Truth lore note
        this.createLoreNote(
            { x: offsetX + 4, y: 1.2, z: offsetZ + 4 },
            LORE_NOTES.NOTE_5
        );
    }
    
    buildVault() {
        const offsetX = 35;
        const offsetZ = -30;
        const width = CONSTANTS.VAULT_WIDTH;
        const depth = CONSTANTS.VAULT_DEPTH;
        
        this.buildRoom(offsetX, offsetZ, width, depth, 0x1a1520);
        this.createDoorway(offsetX, offsetZ + depth/2, 'north');
        this.addVaultProps(offsetX, offsetZ);
    }
    
    buildRoom(offsetX, offsetZ, width, depth, color) {
        const height = CONSTANTS.ROOM_HEIGHT;
        const wallThickness = CONSTANTS.WALL_THICKNESS;
        
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: color,
            roughness: 0.8,
            metalness: 0.2
        });
        
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: color - 0x0a0a0a,
            roughness: 0.9,
            metalness: 0.1
        });
        
        const floor = new THREE.Mesh(
            new THREE.BoxGeometry(width, wallThickness, depth),
            floorMaterial
        );
        floor.position.set(offsetX, -wallThickness/2, offsetZ);
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        this.collisionGeometry.push({
            position: floor.position.clone(),
            size: new THREE.Vector3(width, wallThickness, depth)
        });
        
        const ceiling = new THREE.Mesh(
            new THREE.BoxGeometry(width, wallThickness, depth),
            wallMaterial
        );
        ceiling.position.set(offsetX, height - wallThickness/2, offsetZ);
        ceiling.receiveShadow = true;
        this.scene.add(ceiling);
        
        this.buildWalls(offsetX, offsetZ, width, depth, height, wallMaterial);
    }
    
    buildWalls(offsetX, offsetZ, width, depth, height, material) {
        const wallThickness = CONSTANTS.WALL_THICKNESS;
        
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, wallThickness),
            material
        );
        northWall.position.set(offsetX, height/2, offsetZ + depth/2);
        northWall.castShadow = true;
        northWall.receiveShadow = true;
        this.scene.add(northWall);
        
        this.collisionGeometry.push({
            position: northWall.position.clone(),
            size: new THREE.Vector3(width, height, wallThickness)
        });
        
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(width, height, wallThickness),
            material
        );
        southWall.position.set(offsetX, height/2, offsetZ - depth/2);
        southWall.castShadow = true;
        southWall.receiveShadow = true;
        this.scene.add(southWall);
        
        this.collisionGeometry.push({
            position: southWall.position.clone(),
            size: new THREE.Vector3(width, height, wallThickness)
        });
        
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, height, depth),
            material
        );
        eastWall.position.set(offsetX + width/2, height/2, offsetZ);
        eastWall.castShadow = true;
        eastWall.receiveShadow = true;
        this.scene.add(eastWall);
        
        this.collisionGeometry.push({
            position: eastWall.position.clone(),
            size: new THREE.Vector3(wallThickness, height, depth)
        });
        
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, height, depth),
            material
        );
        westWall.position.set(offsetX - width/2, height/2, offsetZ);
        westWall.castShadow = true;
        westWall.receiveShadow = true;
        this.scene.add(westWall);
        
        this.collisionGeometry.push({
            position: westWall.position.clone(),
            size: new THREE.Vector3(wallThickness, height, depth)
        });
    }
    
    createDoorway(x, z, direction) {
        // Doorways are passable gaps in walls
    }
    
    addEntranceProps(offsetX, offsetZ) {
        const tableMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3d2f1f,
            roughness: 0.7
        });
        
        const tableTop = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.1, 0.8),
            tableMaterial
        );
        tableTop.position.set(offsetX + 2, 0.8, offsetZ - 2);
        tableTop.castShadow = true;
        tableTop.receiveShadow = true;
        this.scene.add(tableTop);
    }
    
    addLibraryProps(offsetX, offsetZ) {
        const shelfMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a3520,
            roughness: 0.8
        });
        
        for (let i = -2; i <= 2; i++) {
            const shelf = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 2, 0.4),
                shelfMaterial
            );
            shelf.position.set(offsetX + i * 2.5, 1, offsetZ + 5.5);
            shelf.castShadow = true;
            shelf.receiveShadow = true;
            this.scene.add(shelf);
        }
    }
    
    addForgeProps(offsetX, offsetZ) {
        const anvilMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x505050,
            roughness: 0.5,
            metalness: 0.8
        });
        
        const anvil = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.8, 0.6),
            anvilMaterial
        );
        anvil.position.set(offsetX - 3, 0.4, offsetZ);
        anvil.castShadow = true;
        anvil.receiveShadow = true;
        this.scene.add(anvil);
        
        // TURN 8: Forge Console
        const consoleMat = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x004400,
            emissiveIntensity: 0.6,
            roughness: 0.5
        });
        const consoleMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 1.6, 0.8),
            consoleMat
        );
        consoleMesh.position.set(offsetX, 0.8, offsetZ);
        consoleMesh.castShadow = true;
        consoleMesh.receiveShadow = true;
        consoleMesh.userData.interactableType = 'forge_console';
        this.scene.add(consoleMesh);

        const consoleLight = new THREE.PointLight(0x00ff00, 2, 3);
        consoleLight.position.set(offsetX, 1.5, offsetZ);
        this.scene.add(consoleLight);
    }
    
    addHatcheryProps(offsetX, offsetZ) {
        const pedestalMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x404050,
            roughness: 0.6,
            metalness: 0.4
        });
        
        // TURN 9: Three dragon egg pedestals
        const eggPositions = [
            { x: offsetX - 3, z: offsetZ, type: 'EmberDrake' },
            { x: offsetX, z: offsetZ, type: 'MistWyrm' },
            { x: offsetX + 3, z: offsetZ, type: 'VoltSerpent' }
        ];
        
        eggPositions.forEach(pos => {
            const pedestal = new THREE.Mesh(
                new THREE.CylinderGeometry(0.5, 0.6, 1, 8),
                pedestalMaterial
            );
            pedestal.position.set(pos.x, 0.5, pos.z);
            pedestal.castShadow = true;
            pedestal.receiveShadow = true;
            this.scene.add(pedestal);
            
            // TURN 9: Dragon egg on pedestal
            const dragonData = DRAGON_TYPES[pos.type];
            const eggGeom = new THREE.SphereGeometry(0.35, 16, 16);
            const eggMat = new THREE.MeshStandardMaterial({
                color: dragonData.color,
                emissive: dragonData.emissive,
                emissiveIntensity: 0.4,
                roughness: 0.6,
                metalness: 0.2
            });
            
            const egg = new THREE.Mesh(eggGeom, eggMat);
            egg.position.set(pos.x, 1.8, pos.z);
            egg.castShadow = true;
            egg.receiveShadow = true;
            egg.userData.interactableType = 'dragon_egg';
            egg.userData.dragonType = pos.type;
            this.scene.add(egg);
            
            // Egg glow light
            const eggLight = new THREE.PointLight(dragonData.color, 1, 2);
            eggLight.position.set(pos.x, 1.8, pos.z);
            this.scene.add(eggLight);
        });
    }
    
    addVaultProps(offsetX, offsetZ) {
        const circleMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8844aa,
            roughness: 0.9,
            emissive: 0x440066,
            emissiveIntensity: 0.2
        });
        
        const circle = new THREE.Mesh(
            new THREE.CylinderGeometry(2, 2, 0.05, 32),
            circleMaterial
        );
        circle.position.set(offsetX, 0.05, offsetZ);
        circle.receiveShadow = true;
        this.scene.add(circle);
    }
    
    createLoreNote(position, data) {
        const geometry = new THREE.PlaneGeometry(CONSTANTS.LORE_NOTE_SIZE, CONSTANTS.LORE_NOTE_SIZE * 1.4);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: CONSTANTS.LORE_NOTE_GLOW_COLOR,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        mesh.castShadow = true;
        
        const light = new THREE.PointLight(CONSTANTS.LORE_NOTE_GLOW_COLOR, CONSTANTS.LORE_NOTE_GLOW_INTENSITY, 2);
        light.position.copy(mesh.position);
        this.scene.add(light);
        
        mesh.userData.light = light;
        this.scene.add(mesh);
        
        const interactable = new InteractableObject(mesh, 'lore_note', data);
        this.interactables.push(interactable);
    }
    
    getCollisionGeometry() {
        return this.collisionGeometry;
    }
}

// ============================================================================
// GAME MANAGER
// ============================================================================
class GameManager {
    constructor() {
        this.state = new GameState();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.player = null;
        this.levelBuilder = null;
        this.flashlightSystem = null;
        this.interactionSystem = null;
        this.monsterAI = null;
        this.forgePuzzle = null;
        this.dragonChoiceModal = null; // TURN 9
        this.clock = new THREE.Clock();
        
        this.isPointerLocked = false;
        this.damageFlashAlpha = 0;
        this.loreTextTimeout = null;
        
        this.dom = {
            lockInstruction: document.getElementById('lockInstruction'),
            interactPrompt: document.getElementById('interactPrompt'),
            logBox: document.getElementById('logBox'),
            healthBar: document.getElementById('healthBar'),
            sanityBar: document.getElementById('sanityBar'),
            healthValue: document.getElementById('healthValue'),
            sanityValue: document.getElementById('sanityValue'),
            ammoCount: document.getElementById('ammoCount'),
            batteryCount: document.getElementById('batteryCount'),
            flashlightStatus: document.getElementById('flashlightStatus'),
            dragonInfo: document.getElementById('dragonInfo'),
            dragonTrustBar: document.getElementById('dragonTrustBar'),
            trustLabel: document.getElementById('trustLabel'),
            abilityUses: document.getElementById('abilityUses'),
            modalOverlay: document.getElementById('modalOverlay'),
            modalContent: document.getElementById('modalContent'),
        };
        
        this.init();
    }
    
    init() {
        this.setupThreeJS();
        this.setupLevel();
        this.setupPlayer();
        this.setupFlashlight();
        this.setupInteractions();
        this.setupMonster();
        this.setupForgePuzzle();
        this.setupDragonChoiceModal(); // TURN 9
        this.setupPointerLock();
        this.setupGameKeys();
        this.setupTestKeys();
        this.showTestInfo();
        this.animate();
    }
    
    setupThreeJS() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0b0f);
        this.scene.fog = new THREE.Fog(0x0a0b0f, 5, 40);
        
        this.camera = new THREE.PerspectiveCamera(
            CONSTANTS.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            CONSTANTS.CAMERA_NEAR,
            CONSTANTS.CAMERA_FAR
        );
        this.camera.rotation.order = 'YXZ';
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupLevel() {
        this.levelBuilder = new LevelBuilder(this.scene, this);
        this.levelBuilder.build5Rooms();
    }
    
    setupPlayer() {
        this.player = new PlayerController(this.camera);
    }
    
    setupFlashlight() {
        this.flashlightSystem = new FlashlightSystem(this.scene, this.camera);
    }
    
    setupInteractions() {
        this.interactionSystem = new InteractionSystem(this.camera, this.scene);
    }
    
    setupMonster() {
        this.monsterAI = new MonsterAI(this.scene, this.player);
    }
    
    setupForgePuzzle() {
        this.forgePuzzle = new ForgePuzzle(this);
        console.log('Turn 8: Forge Puzzle initialized');
    }
    
    setupDragonChoiceModal() {
        // TURN 9: Initialize Dragon Choice Modal
        this.dragonChoiceModal = new DragonChoiceModal(this);
        console.log('Turn 9: Dragon Choice Modal initialized');
    }
    
    setupPointerLock() {
        const canvas = this.renderer.domElement;
        
        this.dom.lockInstruction.addEventListener('click', () => {
            canvas.requestPointerLock();
        });
        
        document.addEventListener('pointerlockchange', () => {
            this.isPointerLocked = document.pointerLockElement === canvas;
            if (this.isPointerLocked) {
                this.dom.lockInstruction.classList.add('hidden');
            } else {
                this.dom.lockInstruction.classList.remove('hidden');
            }
        });
        
        document.addEventListener('pointerlockerror', () => {
            console.error('Pointer lock error');
        });
        
        document.addEventListener('mousemove', (event) => {
            if (!this.isPointerLocked) return;
            
            const euler = new THREE.Euler(0, 0, 0, 'YXZ');
            euler.setFromQuaternion(this.camera.quaternion);
            
            euler.y -= event.movementX * CONSTANTS.MOUSE_SENSITIVITY;
            euler.x -= event.movementY * CONSTANTS.MOUSE_SENSITIVITY;
            euler.x = Math.max(-CONSTANTS.CAMERA_PITCH_LIMIT, Math.min(CONSTANTS.CAMERA_PITCH_LIMIT, euler.x));
            
            this.camera.quaternion.setFromEuler(euler);
        });
    }
    
    setupGameKeys() {
        document.addEventListener('keydown', (event) => {
            if (!this.isPointerLocked) return;
            
            switch(event.code) {
                case 'KeyF':
                    this.state.toggleFlashlight();
                    break;
                case 'KeyE':
                    this.interactionSystem.interact(this);
                    break;
                case 'KeyQ':
                    // TURN 9: Dragon ability (or stun gun if no dragon)
                    if (this.state.dragon) {
                        const success = this.state.dragon.useAbility(this.monsterAI, this.state);
                        if (success) {
                            console.log(`[ABILITY] Dragon ability used. Uses remaining: ${this.state.dragonAbilityUses}`);
                        }
                    } else {
                        // Fallback: Stun gun
                        if (this.state.useAmmo()) {
                            this.monsterAI.stun();
                            this.triggerDamageFlash();
                            console.log(`[STUN] Used stun round. Ammo remaining: ${this.state.ammo}`);
                        } else {
                            console.log('[STUN] No ammo remaining!');
                        }
                    }
                    break;
            }
        });
    }
    
    setupTestKeys() {
        document.addEventListener('keydown', (event) => {
            if (!this.isPointerLocked) return;
            
            switch(event.code) {
                case 'Digit1':
                    this.state.takeDamage(CONSTANTS.DAMAGE_TEST_AMOUNT);
                    this.triggerDamageFlash();
                    console.log(`[TEST] Took ${CONSTANTS.DAMAGE_TEST_AMOUNT} damage. Health: ${this.state.health}`);
                    break;
                case 'Digit2':
                    this.state.drainSanity(CONSTANTS.SANITY_TEST_AMOUNT);
                    console.log(`[TEST] Lost ${CONSTANTS.SANITY_TEST_AMOUNT} sanity. Sanity: ${this.state.sanity}`);
                    break;
                case 'Digit3':
                    this.state.restoreSanity(CONSTANTS.SANITY_TEST_AMOUNT);
                    console.log(`[TEST] Restored ${CONSTANTS.SANITY_TEST_AMOUNT} sanity. Sanity: ${this.state.sanity}`);
                    break;
                case 'Digit4':
                    this.state.drainBattery(CONSTANTS.BATTERY_TEST_AMOUNT);
                    console.log(`[TEST] Drained ${CONSTANTS.BATTERY_TEST_AMOUNT}% battery. Battery: ${this.state.battery}%`);
                    break;
                case 'Digit5':
                    this.state.restoreBattery(CONSTANTS.BATTERY_TEST_AMOUNT);
                    console.log(`[TEST] Restored ${CONSTANTS.BATTERY_TEST_AMOUNT}% battery. Battery: ${this.state.battery}%`);
                    break;
            }
        });
    }
    
    showTestInfo() {
        console.log('%c' + UI_TEXT.TEST_KEYS_INFO, 'color: #ffaa44; font-weight: bold; font-size: 14px;');
    }
    
    showLoreText(title, text) {
        if (this.loreTextTimeout) {
            clearTimeout(this.loreTextTimeout);
        }
        
        this.dom.logBox.innerHTML = `<strong>${title}</strong><br>${text}`;
        this.dom.logBox.style.opacity = '1';
        
        this.loreTextTimeout = setTimeout(() => {
            this.dom.logBox.style.opacity = '0';
        }, CONSTANTS.LORE_LOG_DURATION);
    }
    
    triggerDamageFlash() {
        this.damageFlashAlpha = 1.0;
    }
    
    updateDamageFlash(deltaTime) {
        if (this.damageFlashAlpha > 0) {
            this.damageFlashAlpha = Math.max(0, this.damageFlashAlpha - deltaTime * 2);
            
            if (this.damageFlashAlpha > 0) {
                const canvas = this.renderer.domElement;
                canvas.style.boxShadow = `inset 0 0 100px rgba(255, 0, 0, ${this.damageFlashAlpha})`;
            } else {
                const canvas = this.renderer.domElement;
                canvas.style.boxShadow = 'none';
            }
        }
    }
    
    updateFlashlight(deltaTime) {
        this.flashlightSystem.update(this.state.flashlightOn);
        
        if (this.state.flashlightOn && this.state.battery > 0) {
            const drainAmount = CONSTANTS.BATTERY_DRAIN_RATE * deltaTime;
            this.state.drainBattery(drainAmount);
        }
    }
    
    updateSanityDrain(deltaTime) {
        // Check if near dragon (dragon provides light)
        let nearDragonLight = false;
        if (this.state.dragon) {
            const distToDragon = this.player.position.distanceTo(this.state.dragon.position);
            if (distToDragon < CONSTANTS.DRAGON_LIGHT_DISTANCE) {
                nearDragonLight = true;
            }
        }
        
        if (!this.state.flashlightOn && !nearDragonLight) {
            const drainAmount = CONSTANTS.SANITY_DRAIN_DARKNESS * deltaTime;
            this.state.drainSanity(drainAmount);
        }
    }
    
    updateInteractions() {
        const hasTarget = this.interactionSystem.update(this);
        
        if (hasTarget) {
            if (this.interactionSystem.currentTarget.type === 'forge_console') {
                this.dom.interactPrompt.textContent = UI_TEXT.PRESS_E_FORGE;
            } else if (this.interactionSystem.currentTarget.type === 'dragon_egg') {
                this.dom.interactPrompt.textContent = UI_TEXT.PRESS_E_EGG;
            } else {
                this.dom.interactPrompt.textContent = UI_TEXT.PRESS_E_INTERACT;
            }
            this.dom.interactPrompt.classList.remove('hidden');
        } else {
            this.dom.interactPrompt.classList.add('hidden');
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    updateHUD() {
        const healthPercent = (this.state.health / CONSTANTS.PLAYER_HEALTH_MAX) * 100;
        this.dom.healthBar.querySelector('.bar-fill').style.width = healthPercent + '%';
        this.dom.healthValue.textContent = Math.floor(this.state.health);
        
        const sanityPercent = (this.state.sanity / CONSTANTS.PLAYER_SANITY_MAX) * 100;
        this.dom.sanityBar.querySelector('.bar-fill').style.width = sanityPercent + '%';
        this.dom.sanityValue.textContent = Math.floor(this.state.sanity);
        
        this.dom.ammoCount.textContent = this.state.ammo;
        this.dom.batteryCount.textContent = Math.floor(this.state.battery) + '%';
        this.dom.flashlightStatus.textContent = this.state.flashlightOn ? 'ON' : 'OFF';
        
        if (this.state.flashlightOn) {
            this.dom.flashlightStatus.style.color = '#ffff00';
        } else {
            this.dom.flashlightStatus.style.color = '#fff';
        }
        
        // TURN 9: Dragon UI
        if (this.state.dragon) {
            if (this.dom.dragonInfo) {
                this.dom.dragonInfo.style.display = 'block';
                
                const trustPercent = this.state.dragonTrust;
                if (this.dom.dragonTrustBar) {
                    this.dom.dragonTrustBar.querySelector('.bar-fill').style.width = trustPercent + '%';
                }
                
                let trustLabel = 'Fractured';
                if (trustPercent >= 70) trustLabel = 'Loyal';
                else if (trustPercent >= 30) trustLabel = 'Unstable';
                
                if (this.dom.trustLabel) {
                    this.dom.trustLabel.textContent = trustLabel;
                }
                
                if (this.dom.abilityUses) {
                    this.dom.abilityUses.textContent = `${this.state.dragonAbilityUses}/3`;
                }
            }
        } else {
            if (this.dom.dragonInfo) {
                this.dom.dragonInfo.style.display = 'none';
            }
        }
    }
    
    update(deltaTime) {
        if (this.isPointerLocked && this.player) {
            // TURN 9: Apply speed multiplier (Volt Serpent ability)
            let speedMult = 1.0;
            if (this.state.speedBuffEnd > Date.now()) {
                speedMult = this.state.speedMultiplier;
            } else {
                this.state.speedMultiplier = 1.0;
            }
            
            this.player.update(deltaTime, this.levelBuilder.getCollisionGeometry(), speedMult);
        }
        
        this.updateFlashlight(deltaTime);
        this.updateSanityDrain(deltaTime);
        this.updateInteractions();
        this.updateDamageFlash(deltaTime);
        
        if (this.monsterAI) {
            this.monsterAI.update(deltaTime, this.state);
        }
        
        // TURN 9: Update dragon
        if (this.state.dragon) {
            this.state.dragon.update(deltaTime, this.player, this.monsterAI, this.state);
        }
        
        this.updateHUD();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const deltaTime = this.clock.getDelta();
        this.update(deltaTime);
        
        this.renderer.render(this.scene, this.camera);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================
let game;

window.addEventListener('DOMContentLoaded', () => {
    game = new GameManager();
    console.log('ATC Horror Economics Game - Turn 9: Dragon Companion System initialized');
});