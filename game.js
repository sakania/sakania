// ============================================================================
// ATC HORROR ECONOMICS GAME - VISUAL IMPROVEMENTS
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
    PLAYER_RADIUS: 0.5,
    
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
    DOORWAY_WIDTH: 2.5,
    
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
    FLASHLIGHT_INTENSITY: 2.0,
    FLASHLIGHT_DISTANCE: 20,
    FLASHLIGHT_ANGLE: Math.PI / 5,
    FLASHLIGHT_PENUMBRA: 0.2,
    FLASHLIGHT_DECAY: 2,
    FLASHLIGHT_COLOR: 0xffffdd,
    
    // Interaction settings
    INTERACTION_RANGE: 3,
    INTERACTION_RAYCAST_LAYERS: 1,
    
    // Darkness detection
    DARKNESS_DETECTION_RANGE: 5,
    DARKNESS_THRESHOLD: 0.5,
    LIGHT_DETECTION_SAMPLE_POINTS: 4,
    
    // Lore note settings
    LORE_NOTE_GLOW_COLOR: 0xffaa44,
    LORE_NOTE_GLOW_INTENSITY: 2,
    LORE_NOTE_SIZE: 0.3,
    LORE_LOG_DURATION: 5000,
    
    // Monster settings
    MONSTER_ROAM_SPEED: 2.0,
    MONSTER_LURK_SPEED: 1.5,
    MONSTER_STALK_BURST_SPEED: 5.0,
    MONSTER_CHASE_SPEED: 4.5,
    MONSTER_RELENTLESS_SPEED: 5.5,
    MONSTER_RETREAT_SPEED: 3.0,
    MONSTER_HEIGHT: 2.0,
    MONSTER_RADIUS: 0.5,
    MONSTER_DETECTION_BASE: 8,
    MONSTER_DETECTION_SANITY_MULT: 0.08,
    MONSTER_ATTACK_RANGE: 1.5,
    MONSTER_RETREAT_DURATION: 8,
    MONSTER_PROXIMITY_SANITY_RANGE: 5,
    MONSTER_ROAM_WAYPOINT_DELAY: 3,
    MONSTER_STUN_RESIST_COOLDOWN: 6,
    MONSTER_LOS_CHECK_HEIGHT: 1.5,
    MONSTER_LURK_DURATION: 4,
    MONSTER_STALK_BURST_DURATION: 2,
    
    // Dragon settings
    DRAGON_FOLLOW_DISTANCE: 2.0,
    DRAGON_LIGHT_INTENSITY: 1.5,
    DRAGON_LIGHT_DISTANCE: 12,
    DRAGON_ALERT_RANGE: 15,
    DRAGON_ALERT_COOLDOWN: 5000,
    DRAGON_ABILITY_STUN_DURATION: 2,
    DRAGON_ABILITY_MIST_DURATION: 8000,
    DRAGON_ABILITY_VOLT_DURATION: 8000,
    DRAGON_ABILITY_VOLT_MULT: 1.8,
    
    // Hiding mechanic
    HIDING_INTERACTION_RANGE: 2.5,

    // Audio constants
    AUDIO_MASTER_GAIN: 0.55,
    AUDIO_UI_GAIN: 0.25,
    AUDIO_AMBIENCE_GAIN: 0.18,
    AUDIO_PLAYER_GAIN: 0.22,
    MONSTER_GAIN: 0.28,
    AUDIO_DRAGON_GAIN: 0.22,
    AUDIO_HALLUCINATION_GAIN: 0.16,

    FOOTSTEP_INTERVAL_WALK: 0.52,
    FOOTSTEP_INTERVAL_SPRINT: 0.34,

    HALLUCINATION_FOOTSTEP_MIN_MS: 9000,
    HALLUCINATION_FOOTSTEP_MAX_MS: 16000,
    HALLUCINATION_WHISPER_MIN_MS: 11000,
    HALLUCINATION_WHISPER_MAX_MS: 22000,
};

// UI TEXT CONSTANTS
const UI_TEXT = {
    CLICK_TO_START: "Click to start",
    PRESS_E_INTERACT: "Press E to interact",
    PRESS_E_FORGE: "Press E to answer the Forge",
    PRESS_E_EGG: "Press E to choose this dragon",
    PRESS_E_RITUAL: "Press E to begin the ritual",
    PRESS_E_BATTERY: "Press E to collect battery",
    PRESS_H_HIDE: "Press H to hide",
    PRESS_H_UNHIDE: "Press H to exit",
    HEALTH_LABEL: "Health",
    SANITY_LABEL: "Sanity",
    AMMO_LABEL: "Stun Rounds",
    BATTERY_LABEL: "Battery",
    FLASHLIGHT_LABEL: "Flashlight",
    DRAGON_BOND_LABEL: "Dragon Bond",
    ABILITY_USES_LABEL: "Ability Uses",
    TUTORIAL_TEXT: "WASD to move. Shift to sprint. F for flashlight. E to interact. Q to use ability.",
    TEST_KEYS_INFO: "[TEST MODE] 1: Damage, 2: Drain Sanity, 3: Restore Sanity, 4: Drain Battery, 5: Restore Battery, F: Flashlight, E: Interact, Q: Ability",
    RESTART_BUTTON: "Restart Game",
};

// ATC LORE NOTE TEXTS
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

// ATC QUIZ DATA
const ATC_QUIZ = {
    correct: 'a'
};

const ATC_FEEDBACK = {
    a: "Each unit bears $27 of rent-ghost + $3 of materials-demon = $30 per unit. The Forge accepts your truth. You understood that BOTH costs must be included before dividing.",
    b: "You counted only the materials-demon ($300 ÷ 100 = $3) and pretended the $2700 rent-ghost doesn't exist. But fixed costs haunt you whether you produce or not. The ledger rejects your incomplete accounting.",
    c: "You conjured $24 from thin air, shaving $600 from the true ledger with no economic spell. Total cost is $3000, not $2400. The Forge sees through false numbers.",
    d: "You heard only the rent-ghost ($2700 ÷ 100 = $27) and ignored the materials-demon entirely. But variable costs exist when you produce. Average TOTAL cost includes both. Your truth is incomplete."
};

// DRAGON TYPES
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

// ENDINGS DATA
const ENDINGS = {
    ENDING_A: {
        title: "ENDING A: THE TRUE BOND",
        subtitle: "You remembered. The bond is restored.",
        narrative: [
            "The ritual circle glows as your Mist Wyrm steps forward. The academy's corruption dissolves like morning fog.",
            "You remembered the Original Dragon Truth. This is not a hatchling — this is YOUR dragon, fragmented and hidden by the academy's lies.",
            "The mist clears. Your dragon's true form emerges, no longer bound by the academy's twisted lessons.",
            "The monster dissolves into ash. The academy's control shatters. You walk free, bond unbroken, mind intact."
        ],
        outcome: "FREEDOM — The academy cannot claim you. Your dragon remembers, and so do you."
    },
    ENDING_B: {
        title: "ENDING B: THE CORRUPTED BOND",
        subtitle: "You chose familiarity, but forgot the truth.",
        narrative: [
            "The ritual circle flares as your Mist Wyrm steps forward. Something feels... wrong.",
            "You never found the Original Dragon Truth. This bond is built on fragments, not memory.",
            "The dragon shifts, still tainted by the academy's corruption. Your sanity frays at the edges.",
            "The monster fades, but so does your grip on reality. You leave the vault changed — not free, but not consumed."
        ],
        outcome: "SURVIVAL — You escaped, but the bond is incomplete. The academy's mark lingers."
    },
    ENDING_C: {
        title: "ENDING C: THE ACADEMY'S TOOL",
        subtitle: "You chose power over memory.",
        narrative: [
            "The ritual circle ignites as your dragon steps forward. The academy's symbols burn bright.",
            "You chose the Ember Drake or Volt Serpent — power, utility, survival. But not memory.",
            "The bond completes, but it was always the academy's design. You are their weapon now, sharp and obedient.",
            "The monster falls. You walk free, but the academy's lessons remain carved into your mind."
        ],
        outcome: "CONTROL — You survived, but the academy shaped you. Their mark is permanent."
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

// Door data for collision checking
const DOORS = [
    { name: 'EntranceToLibrary', x: 10, z: 0, width: 2.5, lockKey: null },
    { name: 'LibraryToForge', x: 27, z: 0, width: 2.5, lockKey: null },
    { name: 'ForgeToHatchery', x: 35, z: -7.5, width: 2.5, lockKey: 'hatcheryDoor' },
    { name: 'HatcheryToVault', x: 35, z: -22.5, width: 2.5, lockKey: 'vaultDoor' }
];

// ============================================================================
// WEB AUDIO MANAGER
// ============================================================================
class WebAudioManager {
    constructor() {
        this.ctx = null;
        this.master = null;
        this.buses = {};
        this.noiseBuffer = null;
        this.loops = new Map();
        this.enabled = true;

        this._nextHallucinationFootstepAt = 0;
        this._nextHallucinationWhisperAt = 0;
    }

    unlock() {
        if (!this.enabled) return;
        if (this.ctx) {
            if (this.ctx.state === 'suspended') this.ctx.resume();
            return;
        }

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.warn('WebAudio not supported. Audio disabled.');
            this.enabled = false;
            return;
        }

        this.ctx = new AudioContext();

        this.master = this.ctx.createGain();
        this.master.gain.value = CONSTANTS.AUDIO_MASTER_GAIN;
        this.master.connect(this.ctx.destination);

        this.buses.ui = this._makeBus(CONSTANTS.AUDIO_UI_GAIN);
        this.buses.ambience = this._makeBus(CONSTANTS.AUDIO_AMBIENCE_GAIN);
        this.buses.player = this._makeBus(CONSTANTS.AUDIO_PLAYER_GAIN);
        this.buses.monster = this._makeBus(CONSTANTS.AUDIO_MONSTER_GAIN);
        this.buses.dragon = this._makeBus(CONSTANTS.AUDIO_DRAGON_GAIN);
        this.buses.hallucination = this._makeBus(CONSTANTS.AUDIO_HALLUCINATION_GAIN);

        this.noiseBuffer = this._createNoiseBuffer(1.2);

        this._scheduleHallucinationTimers();
        console.log('[AUDIO] WebAudioManager initialized');
    }

    _makeBus(gainValue) {
        const g = this.ctx.createGain();
        g.gain.value = gainValue;
        g.connect(this.master);
        return g;
    }

    _createNoiseBuffer(seconds) {
        const length = Math.floor(this.ctx.sampleRate * seconds);
        const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1);
        }
        return buffer;
    }

    _scheduleHallucinationTimers() {
        const now = Date.now();
        this._nextHallucinationFootstepAt = now + this._randRange(CONSTANTS.HALLUCINATION_FOOTSTEP_MIN_MS, CONSTANTS.HALLUCINATION_FOOTSTEP_MAX_MS);
        this._nextHallucinationWhisperAt = now + this._randRange(CONSTANTS.HALLUCINATION_WHISPER_MIN_MS, CONSTANTS.HALLUCINATION_WHISPER_MAX_MS);
    }

    _randRange(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    stopAll() {
        if (!this.ctx) return;
        for (const [name, node] of this.loops.entries()) {
            try { node.stop(); } catch (_) {}
        }
        this.loops.clear();
    }

    startAmbience() {
        if (!this.ctx) return;
        this._startDroneLoop();
        this._startWindLoop();
    }

    _startDroneLoop() {
        if (this.loops.has('drone')) return;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.value = 55;
        osc2.frequency.value = 82.41;
        gain.gain.value = 0.0;

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.buses.ambience);

        const t = this.ctx.currentTime;
        gain.gain.linearRampToValueAtTime(0.22, t + 1.8);

        osc1.start();
        osc2.start();

        this.loops.set('drone', { stop: () => { osc1.stop(); osc2.stop(); }, stopCalled: false });
    }

    _startWindLoop() {
        if (this.loops.has('wind')) return;

        const src = this.ctx.createBufferSource();
        src.buffer = this.noiseBuffer;
        src.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 420;
        filter.Q.value = 0.8;

        const gain = this.ctx.createGain();
        gain.gain.value = 0.0;

        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.buses.ambience);

        const t = this.ctx.currentTime;
        gain.gain.linearRampToValueAtTime(0.18, t + 2.2);

        src.start();
        this.loops.set('wind', src);

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = 0.07;
        lfoGain.gain.value = 130;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const lfo2 = this.ctx.createOscillator();
        const lfo2Gain = this.ctx.createGain();
        lfo2.type = 'sine';
        lfo2.frequency.value = 0.09;
        lfo2Gain.gain.value = 0.08;
        lfo2.connect(lfo2Gain);
        lfo2Gain.connect(gain.gain);
        lfo2.start();

        this.loops.set('wind_lfo', { stop: () => { lfo.stop(); lfo2.stop(); }, stopCalled: false });
    }

    uiClick() {
        this._beep({ bus: 'ui', freq: 700, dur: 0.04, type: 'square', gain: 0.22 });
    }

    uiChime(success = true) {
        if (success) {
            this._beep({ bus: 'ui', freq: 880, dur: 0.09, type: 'sine', gain: 0.22 });
            this._beep({ bus: 'ui', freq: 1320, dur: 0.07, type: 'sine', gain: 0.18, delay: 0.06 });
        } else {
            this._beep({ bus: 'ui', freq: 140, dur: 0.16, type: 'sawtooth', gain: 0.18 });
        }
    }

    playerFootstep(isSprinting = false) {
        if (!this.ctx) return;

        const src = this.ctx.createBufferSource();
        src.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = isSprinting ? 260 : 190;

        const gain = this.ctx.createGain();
        gain.gain.value = 0.0;

        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.buses.player);

        const t = this.ctx.currentTime;
        const peak = isSprinting ? 0.18 : 0.14;
        gain.gain.setValueAtTime(0.0, t);
        gain.gain.linearRampToValueAtTime(peak, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        src.start();
        src.stop(t + 0.14);
    }

    playerBreathingIntensity(intensity01) {
        if (!this.ctx) return;
        if (!this.loops.has('breathing')) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 140;
            gain.gain.value = 0.0;
            osc.connect(gain);
            gain.connect(this.buses.player);
            osc.start();
            this.loops.set('breathing', { osc, gain });
        }

        const node = this.loops.get('breathing');
        if (node && node.gain) {
            const target = 0.02 + 0.08 * Math.min(1, Math.max(0, intensity01));
            node.gain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.15);
        }
    }

    monsterGrowl(intensity01 = 0.6) {
        if (!this.ctx) return;
        const base = 80 + 40 * Math.min(1, Math.max(0, intensity01));
        this._beep({ bus: 'monster', freq: base, dur: 0.22, type: 'sawtooth', gain: 0.14 });
        this._noiseBurst({ bus: 'monster', dur: 0.12, gain: 0.08, band: 250 });
    }

    monsterRoar() {
        if (!this.ctx) return;
        this._noiseBurst({ bus: 'monster', dur: 0.6, gain: 0.18, band: 180 });
        this._beep({ bus: 'monster', freq: 55, dur: 0.55, type: 'sawtooth', gain: 0.16 });
    }

    monsterFootstep() {
        if (!this.ctx) return;
        this._noiseBurst({ bus: 'monster', dur: 0.14, gain: 0.12, band: 200 });
    }

    dragonChirp() {
        this._beep({ bus: 'dragon', freq: 950, dur: 0.08, type: 'triangle', gain: 0.18 });
        this._beep({ bus: 'dragon', freq: 1200, dur: 0.06, type: 'triangle', gain: 0.12, delay: 0.05 });
    }

    dragonFlutter() {
        this._noiseBurst({ bus: 'dragon', dur: 0.1, gain: 0.07, band: 900 });
    }

    dragonAbility(type) {
        if (type === 'EmberDrake') {
            this._noiseBurst({ bus: 'dragon', dur: 0.35, gain: 0.14, band: 1200 });
            this._beep({ bus: 'dragon', freq: 220, dur: 0.18, type: 'sawtooth', gain: 0.12 });
        } else if (type === 'MistWyrm') {
            this._noiseBurst({ bus: 'dragon', dur: 0.45, gain: 0.10, band: 600 });
            this._beep({ bus: 'dragon', freq: 520, dur: 0.22, type: 'sine', gain: 0.12 });
        } else if (type === 'VoltSerpent') {
            this._beep({ bus: 'dragon', freq: 1600, dur: 0.12, type: 'square', gain: 0.12 });
            this._beep({ bus: 'dragon', freq: 900, dur: 0.18, type: 'square', gain: 0.10, delay: 0.06 });
        }
    }

    dragonHatch() {
        this._beep({ bus: 'dragon', freq: 480, dur: 0.12, type: 'sine', gain: 0.16 });
        this._noiseBurst({ bus: 'dragon', dur: 0.22, gain: 0.10, band: 700 });
    }

    updateHallucinations(gameState) {
        if (!this.ctx) return;

        const nowMs = Date.now();
        if (gameState.sanity <= 60) {
            if (nowMs >= this._nextHallucinationFootstepAt) {
                this._noiseBurst({ bus: 'hallucination', dur: 0.12, gain: 0.10, band: 240 });
                this._nextHallucinationFootstepAt = nowMs + this._randRange(CONSTANTS.HALLUCINATION_FOOTSTEP_MIN_MS, CONSTANTS.HALLUCINATION_FOOTSTEP_MAX_MS);
            }
        }

        if (gameState.sanity <= 30) {
            if (nowMs >= this._nextHallucinationWhisperAt) {
                this._noiseBurst({ bus: 'hallucination', dur: 0.65, gain: 0.12, band: 1200 });
                this._beep({ bus: 'hallucination', freq: 320, dur: 0.25, type: 'sine', gain: 0.06 });
                this._nextHallucinationWhisperAt = nowMs + this._randRange(CONSTANTS.HALLUCINATION_WHISPER_MIN_MS, CONSTANTS.HALLUCINATION_WHISPER_MAX_MS);
            }
        }

        if (gameState.sanity === 0) {
            this._noiseBurst({ bus: 'hallucination', dur: 0.8, gain: 0.22, band: 800 });
        }
    }

    _beep({ bus, freq, dur, type, gain, delay = 0 }) {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;
        g.gain.value = 0.0;

        osc.connect(g);
        g.connect(this.buses[bus] || this.master);

        const t0 = this.ctx.currentTime + delay;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(0.02, dur));

        osc.start(t0);
        osc.stop(t0 + dur + 0.04);
    }

    _noiseBurst({ bus, dur, gain, band }) {
        if (!this.ctx) return;

        const src = this.ctx.createBufferSource();
        src.buffer = this.noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = band;
        filter.Q.value = 1.1;

        const g = this.ctx.createGain();
        g.gain.value = 0.0;

        src.connect(filter);
        filter.connect(g);
        g.connect(this.buses[bus] || this.master);

        const t = this.ctx.currentTime;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.05, dur));

        src.start();
        src.stop(t + dur + 0.05);
    }
}

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
        
        this.damageFlashActive = false;
        this.damageFlashEnd = 0;
        
        this.dragon = null;
        this.dragonTrust = 50;
        this.dragonAbilityUses = 3;
        this.dragonChosen = false;
        this.sanityDrainPaused = false;
        this.sanityDrainPauseEnd = 0;
        this.speedMultiplier = 1.0;
        this.speedBuffEnd = 0;
        
        this.isHiding = false;
        this.currentHidingSpot = null;
        
        this.phase = 'ENTRANCE';
        
        this.loreNotesCollected = 0;
        this.forgePuzzleSolved = false;
        this.hatcheryDoorUnlocked = false;
        this.vaultDoorUnlocked = false;
        this.ritualCompleted = false;
        this.discoveredOriginalDragonTruth = false;
        
        this.sprintStartTime = 0;
        this.lowSanityStartTime = 0;
        
        this.gameOver = false;
        this.endingType = null;
    }
    
    takeDamage(amount) {
        if (amount < 0) return;
        this.health = Math.max(0, this.health - amount);
        
        this.damageFlashActive = true;
        this.damageFlashEnd = Date.now() + 500;
        
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
            console.log('Sanity threshold: Increased hallucinations + audio distortion (≤30)');
        }
        if (this.sanity === 0) {
            console.log('Sanity reached 0: UI glitch + monster speed boost');
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
    
    enterHiding(hidingSpot) {
        this.isHiding = true;
        this.currentHidingSpot = hidingSpot;
        console.log('[HIDING] Player entered hiding spot');
    }
    
    exitHiding() {
        this.isHiding = false;
        this.currentHidingSpot = null;
        console.log('[HIDING] Player exited hiding spot');
    }
}

// [Continue in next message due to length - DragonCompanion class and beyond...]