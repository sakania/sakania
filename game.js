// ============================================================================
// ATC HORROR ECONOMICS GAME - ALL FIXES COMPLETE
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
    PLAYER_RADIUS: 0.5, // FIX #1: Increased for collision detection
    
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
    
    // FIX #6: Darkness detection
    DARKNESS_DETECTION_RANGE: 5, // Check lights within 5 units
    DARKNESS_THRESHOLD: 0.5,
    LIGHT_DETECTION_SAMPLE_POINTS: 4,
    
    // Lore note settings
    LORE_NOTE_GLOW_COLOR: 0xffaa44,
    LORE_NOTE_GLOW_INTENSITY: 2,
    LORE_NOTE_SIZE: 0.3,
    LORE_LOG_DURATION: 5000,
    
    // Monster settings
    MONSTER_ROAM_SPEED: 2.0,
    MONSTER_LURK_SPEED: 1.5, // FIX #3
    MONSTER_STALK_BURST_SPEED: 5.0, // FIX #3
    MONSTER_CHASE_SPEED: 4.5,
    MONSTER_RELENTLESS_SPEED: 5.5, // FIX #3
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
    MONSTER_LOS_CHECK_HEIGHT: 1.5, // FIX #4
    MONSTER_LURK_DURATION: 4, // FIX #3
    MONSTER_STALK_BURST_DURATION: 2, // FIX #3
    
    // Dragon settings
    DRAGON_FOLLOW_DISTANCE: 2.0,
    DRAGON_LIGHT_INTENSITY: 1.2,
    DRAGON_LIGHT_DISTANCE: 10,
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
    RESTART_BUTTON: "Restart Game", // FIX #8
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

// FIX #2: Door data for collision checking
const DOORS = [
    { name: 'EntranceToLibrary', x: 10, z: 0, width: 2, lockKey: null },
    { name: 'LibraryToForge', x: 25, z: 0, width: 2, lockKey: null },
    { name: 'ForgeToHatchery', x: 35, z: -7.5, width: 2, lockKey: 'hatcheryDoor' },
    { name: 'HatcheryToVault', x: 35, z: -22.5, width: 2, lockKey: 'vaultDoor' }
];

// ============================================================================
// WEB AUDIO MANAGER (Procedural audio synthesis)
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

    // Ambience loops
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

    // UI sounds
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

    // Player sounds
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

    // Monster sounds
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

    // Dragon sounds
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

    // Hallucinations
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

    // Low-level synth helpers
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
        
        // FIX #5: Damage flash
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
        
        // FIX #5: Trigger red flash
        this.damageFlashActive = true;
        this.damageFlashEnd = Date.now() + 500; // 0.5 second flash
        
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

// ============================================================================
// DRAGON COMPANION
// ============================================================================
class DragonCompanion {
    constructor(type, scene, spawnPosition, audio = null) {
        this.type = type;
        this.scene = scene;
        this.audio = audio;
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
        
        if (gameState.isHiding) return;
        
        const playerPos = playerController.position;
        const cameraDirection = new THREE.Vector3();
        playerController.camera.getWorldDirection(cameraDirection);
        cameraDirection.y = 0;
        cameraDirection.normalize();
        
        this.targetPosition.copy(playerPos);
        this.targetPosition.sub(cameraDirection.multiplyScalar(CONSTANTS.DRAGON_FOLLOW_DISTANCE));
        this.targetPosition.y = playerPos.y - 0.3;
        
        this.position.lerp(this.targetPosition, deltaTime * 3);
        this.mesh.position.copy(this.position);
        this.lightSource.position.copy(this.position);
        
        if (monsterAI) {
            const distToMonster = this.position.distanceTo(monsterAI.position);
            const currentTime = Date.now();
            
            if (distToMonster < CONSTANTS.DRAGON_ALERT_RANGE && 
                (!this.lastAlertTime || currentTime - this.lastAlertTime > CONSTANTS.DRAGON_ALERT_COOLDOWN)) {
                this.alertChirp();
                this.lastAlertTime = currentTime;
            }
        }
        
        this.updateTrust(deltaTime, playerController, gameState);
    }
    
    updateTrust(deltaTime, playerController, gameState) {
        const currentTime = Date.now();
        
        if (playerController.isSprinting) {
            if (!gameState.sprintStartTime) {
                gameState.sprintStartTime = currentTime;
            } else if (currentTime - gameState.sprintStartTime > 5000) {
                gameState.updateDragonTrust(-2 * deltaTime);
            }
        } else {
            gameState.sprintStartTime = 0;
        }
        
        if (gameState.sanity < 20) {
            if (!gameState.lowSanityStartTime) {
                gameState.lowSanityStartTime = currentTime;
            } else if (currentTime - gameState.lowSanityStartTime > 10000) {
                gameState.updateDragonTrust(-5 * deltaTime);
            }
        } else {
            gameState.lowSanityStartTime = 0;
        }
        
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
        
        if (gameState.dragonTrust < 30 && Math.random() < 0.5) {
            console.log('[DRAGON] Dragon refused! Bond too weak (Fractured trust).');
            return false;
        }
        
        gameState.dragonAbilityUses--;

        if (this.audio) this.audio.dragonAbility(this.type);
        
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
            gameState.updateDragonTrust(-5);
            return false;
        }
        
        if (monsterAI.state === 'RETREAT') {
            console.log('[EMBER] Dragon flames surge, but the threat is already fleeing.');
            gameState.updateDragonTrust(-3);
            return false;
        }
        
        monsterAI.stun();
        console.log('[EMBER] Dragon unleashes flame! Monster stunned for 2 seconds.');
        
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
        
        gameState.updateDragonTrust(3);
        
        return true;
    }
    
    alertChirp() {
        if (this.audio) this.audio.dragonChirp();
        console.log('[DRAGON] *Alert chirp* - Threat nearby!');
    }
    
    destroy() {
        this.active = false;
        this.scene.remove(this.mesh);
        this.scene.remove(this.lightSource);
    }
}

// ============================================================================
// VAULT RITUAL MODAL
// ============================================================================
class VaultRitualModal {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.modal = document.getElementById('vaultRitualModal');
        
        this.setupEvents();
    }
    
    setupEvents() {
        const beginBtn = document.getElementById('beginRitualBtn');
        if (beginBtn) {
            beginBtn.addEventListener('click', () => {
                if (this.gameManager.audio) this.gameManager.audio.uiClick();
                this.performRitual();
            });
        }
    }
    
    show() {
        if (this.gameManager.state.ritualCompleted) {
            this.gameManager.showLoreText(
                'The Vault',
                'The ritual is complete. Your fate is sealed.'
            );
            return;
        }
        
        if (!this.gameManager.state.dragonChosen) {
            this.gameManager.showLoreText(
                'The Vault',
                'The ritual circle awaits, but you need a dragon companion to complete it.'
            );
            return;
        }
        
        this.modal.classList.remove('hidden');
    }
    
    hide() {
        this.modal.classList.add('hidden');
    }
    
    performRitual() {
        const state = this.gameManager.state;
        
        state.ritualCompleted = true;
        state.gameOver = true;
        
        let endingType;
        
        if (state.dragon.type === 'MistWyrm' && state.discoveredOriginalDragonTruth) {
            endingType = 'ENDING_A';
        } else if (state.dragon.type === 'MistWyrm' && !state.discoveredOriginalDragonTruth) {
            endingType = 'ENDING_B';
        } else {
            endingType = 'ENDING_C';
        }
        
        state.endingType = endingType;
        
        console.log(`✓ Ritual completed: ${endingType}`);
        console.log(`  - Dragon: ${state.dragon.type}`);
        console.log(`  - Original Truth: ${state.discoveredOriginalDragonTruth ? 'Discovered' : 'Unknown'}`);
        
        this.hide();
        this.showEnding(endingType);
    }
    
    showEnding(endingType) {
        const ending = ENDINGS[endingType];
        const state = this.gameManager.state;
        
        if (this.gameManager.audio) {
            this.gameManager.audio.uiChime(endingType === 'ENDING_A');
            this.gameManager.audio.stopAll();
        }

        const endingModal = document.getElementById('endingModal');
        
        document.getElementById('endingTitle').textContent = ending.title;
        document.getElementById('endingSubtitle').textContent = ending.subtitle;
        
        const narrativeContainer = document.getElementById('endingNarrative');
        narrativeContainer.innerHTML = '';
        ending.narrative.forEach(para => {
            const p = document.createElement('p');
            p.textContent = para;
            narrativeContainer.appendChild(p);
        });
        
        document.getElementById('endingOutcome').textContent = ending.outcome;
        
        document.getElementById('statHealth').textContent = Math.floor(state.health);
        document.getElementById('statSanity').textContent = Math.floor(state.sanity);
        document.getElementById('statTrust').textContent = Math.floor(state.dragonTrust);
        document.getElementById('statDragon').textContent = DRAGON_TYPES[state.dragon.type].name;
        document.getElementById('statLoreNotes').textContent = `${state.loreNotesCollected}/5`;
        document.getElementById('statOriginalTruth').textContent = state.discoveredOriginalDragonTruth ? 'Yes' : 'No';
        
        endingModal.classList.remove('hidden');
        
        document.exitPointerLock();
    }
}

// ============================================================================
// DRAGON CHOICE MODAL
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
        const eggButtons = document.querySelectorAll('.dragon-egg-card');
        eggButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.gameManager.audio) this.gameManager.audio.uiClick();
                const dragonType = btn.dataset.dragonType;
                this.showConfirmation(dragonType);
            });
        });
        
        document.getElementById('confirmDragonChoice').addEventListener('click', () => {
            if (this.gameManager.audio) this.gameManager.audio.uiClick();
            if (this.selectedType) {
                this.chooseDragon(this.selectedType);
            }
        });
        
        document.getElementById('cancelDragonChoice').addEventListener('click', () => {
            if (this.gameManager.audio) this.gameManager.audio.uiClick();
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
        
        const spawnPos = this.gameManager.player.position.clone();
        const dragon = new DragonCompanion(
            dragonType,
            this.gameManager.scene,
            spawnPos,
            this.gameManager.audio
        );
        
        this.gameManager.state.dragon = dragon;

        if (this.gameManager.audio) this.gameManager.audio.dragonHatch();
        
        const dragonData = DRAGON_TYPES[dragonType];
        this.gameManager.showLoreText(
            'Dragon Hatched',
            `The ${dragonData.name} ${dragonData.icon} bonds with you. Press Q to use dragon ability (3 uses).`
        );
        
        console.log(`✓ Dragon chosen: ${dragonData.name}`);
        console.log('✓ Vault door UNLOCKED');
        
        this.hideConfirmation();
        this.hide();
    }
}

// ============================================================================
// FORGE PUZZLE
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
                if (this.gameManager.audio) this.gameManager.audio.uiClick();
                this.handleAnswer(e.target.dataset.answer);
            });
        });

        document.getElementById('continueBtn').addEventListener('click', () => {
            if (this.gameManager.audio) this.gameManager.audio.uiClick();
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

            if (this.gameManager.audio) this.gameManager.audio.uiChime(true);

            console.log('✓ The Forge accepts your truth (ATC correct: a) $30).');
            console.log('✓ Hatchery door UNLOCKED');
        } else {
            state.drainSanity(12);
            state.hatcheryDoorUnlocked = false;

            if (this.gameManager.audio) this.gameManager.audio.uiChime(false);

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
// MONSTER AI - FIX #3: Full 6-state FSM with LOS
// ============================================================================
class MonsterAI {
    constructor(scene, playerController, audio = null) {
        this.scene = scene;
        this.playerController = playerController;
        this.audio = audio;
        
        // FIX #3: Full 6-state FSM
        this.state = 'ROAM';
        this.stateTimer = 0;
        
        this.position = new THREE.Vector3(20, CONSTANTS.MONSTER_HEIGHT / 2, 0);
        this.velocity = new THREE.Vector3();
        this.targetWaypoint = null;
        this.waypointDelay = 0;
        this.retreatTimer = 0;
        this.damageCooldown = 0;

        this._footstepTimer = 0;
        
        this.lastStunTime = 0;
        this.stunResistActive = false;
        
        // FIX #4: LOS raycaster
        this.raycaster = new THREE.Raycaster();
        this.obstacles = []; // Will be populated with walls
        
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
    
    // FIX #3 & #4: Add obstacles for LOS checking
    setObstacles(obstacles) {
        this.obstacles = obstacles;
    }
    
    // FIX #4: Line-of-sight check using raycasting
    hasLineOfSight(targetPos) {
        const monsterEyePos = this.position.clone();
        monsterEyePos.y += CONSTANTS.MONSTER_LOS_CHECK_HEIGHT;
        
        const direction = new THREE.Vector3();
        direction.subVectors(targetPos, monsterEyePos);
        const distance = direction.length();
        direction.normalize();
        
        this.raycaster.set(monsterEyePos, direction);
        this.raycaster.far = distance;
        
        const intersects = this.raycaster.intersectObjects(this.obstacles, false);
        
        return intersects.length === 0;
    }
    
    update(deltaTime, gameState) {
        if (this.retreatTimer > 0) {
            this.retreatTimer -= deltaTime;
            if (this.retreatTimer <= 0) {
                this.state = 'ROAM';
                
                this.lastStunTime = Date.now();
                this.stunResistActive = true;
                
                console.log('Monster: Retreat ended, returning to Roam (stun resist active for 6s)');
            }
        }
        
        if (this.stunResistActive && Date.now() - this.lastStunTime > CONSTANTS.MONSTER_STUN_RESIST_COOLDOWN * 1000) {
            this.stunResistActive = false;
            console.log('Monster: Stun resist window expired');
        }
        
        if (this.damageCooldown > 0) {
            this.damageCooldown -= deltaTime;
        }
        
        this.stateTimer += deltaTime;
        
        // FIX #3: Full FSM state machine
        switch(this.state) {
            case 'ROAM':
                this.updateRoam(deltaTime, gameState);
                break;
            case 'LURK':
                this.updateLurk(deltaTime, gameState);
                break;
            case 'STALK_BURST':
                this.updateStalkBurst(deltaTime, gameState);
                break;
            case 'CHASE':
                this.updateChase(deltaTime, gameState);
                break;
            case 'RELENTLESS':
                this.updateRelentless(deltaTime, gameState);
                break;
            case 'RETREAT':
                this.updateRetreat(deltaTime);
                break;
        }
        
        this.checkPlayerCollision(gameState);
        this.drainSanityProximity(deltaTime, gameState);
        this.mesh.position.copy(this.position);

        this.updateAudio(deltaTime);
    }

    updateAudio(deltaTime) {
        if (!this.audio) return;

        if (this.state === 'CHASE' || this.state === 'RELENTLESS' || this.state === 'STALK_BURST') {
            this._footstepTimer += deltaTime;
            const interval = this.state === 'RELENTLESS' ? 0.32 : 0.38;
            if (this._footstepTimer >= interval) {
                this._footstepTimer = 0;
                this.audio.monsterFootstep();
            }
        }
    }
    
    // FIX #3: ROAM state
    updateRoam(deltaTime, gameState) {
        if (gameState.isHiding) {
            if (!this.targetWaypoint || this.waypointDelay > 0) {
                this.waypointDelay -= deltaTime;
                if (this.waypointDelay <= 0) {
                    this.selectRandomWaypoint();
                }
                return;
            }
            
            this.moveTowardWaypoint(deltaTime, CONSTANTS.MONSTER_ROAM_SPEED);
            return;
        }
        
        const detectionRange = this.getDetectionRange(gameState.sanity);
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        // FIX #4: Check LOS before transitioning
        if (distanceToPlayer < detectionRange) {
            if (this.hasLineOfSight(this.playerController.position)) {
                this.state = 'LURK';
                this.stateTimer = 0;
                if (this.audio) this.audio.monsterGrowl(0.4);
                console.log('Monster: Player detected with LOS, entering LURK state');
                return;
            }
        }
        
        if (!this.targetWaypoint || this.waypointDelay > 0) {
            this.waypointDelay -= deltaTime;
            if (this.waypointDelay <= 0) {
                this.selectRandomWaypoint();
            }
            return;
        }
        
        this.moveTowardWaypoint(deltaTime, CONSTANTS.MONSTER_ROAM_SPEED);
    }
    
    // FIX #3: LURK state (out-of-sight positioning)
    updateLurk(deltaTime, gameState) {
        if (gameState.isHiding) {
            this.state = 'ROAM';
            console.log('Monster: Lost track of player (hiding)');
            return;
        }
        
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        // Move slowly toward player while lurking
        const direction = new THREE.Vector3();
        direction.subVectors(this.playerController.position, this.position);
        direction.y = 0;
        direction.normalize();
        
        this.velocity.copy(direction).multiplyScalar(CONSTANTS.MONSTER_LURK_SPEED);
        this.position.x += this.velocity.x * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
        
        // Transition to STALK_BURST after lurk duration
        if (this.stateTimer > CONSTANTS.MONSTER_LURK_DURATION) {
            this.state = 'STALK_BURST';
            this.stateTimer = 0;
            if (this.audio) this.audio.monsterGrowl(0.7);
            console.log('Monster: Lurk complete, entering STALK_BURST');
        }
        
        // Lose track if player escapes
        const detectionRange = this.getDetectionRange(gameState.sanity);
        if (distanceToPlayer > detectionRange * 2) {
            this.state = 'ROAM';
            console.log('Monster: Lost player, returning to Roam');
        }
    }
    
    // FIX #3: STALK_BURST state (aggressive proximity test)
    updateStalkBurst(deltaTime, gameState) {
        if (gameState.isHiding) {
            this.state = 'ROAM';
            console.log('Monster: Lost track of player (hiding)');
            return;
        }
        
        const direction = new THREE.Vector3();
        direction.subVectors(this.playerController.position, this.position);
        direction.y = 0;
        direction.normalize();
        
        this.velocity.copy(direction).multiplyScalar(CONSTANTS.MONSTER_STALK_BURST_SPEED);
        this.position.x += this.velocity.x * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
        
        this.mesh.lookAt(this.playerController.position);
        
        // Transition to CHASE after burst duration
        if (this.stateTimer > CONSTANTS.MONSTER_STALK_BURST_DURATION) {
            this.state = 'CHASE';
            this.stateTimer = 0;
            if (this.audio) this.audio.monsterRoar();
            console.log('Monster: Stalk burst complete, entering CHASE');
        }
    }
    
    updateChase(deltaTime, gameState) {
        if (gameState.isHiding) {
            this.state = 'ROAM';
            console.log('Monster: Lost track of player (hiding)');
            return;
        }
        
        const detectionRange = this.getDetectionRange(gameState.sanity);
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        // FIX #4: Check LOS during chase
        if (!this.hasLineOfSight(this.playerController.position) && distanceToPlayer > detectionRange) {
            this.state = 'ROAM';
            console.log('Monster: Lost LOS and distance, returning to Roam');
            return;
        }
        
        if (distanceToPlayer > detectionRange * 1.5) {
            this.state = 'ROAM';
            console.log('Monster: Lost player, returning to Roam');
            return;
        }
        
        const direction = new THREE.Vector3();
        direction.subVectors(this.playerController.position, this.position);
        direction.y = 0;
        direction.normalize();
        
        let chaseSpeed = CONSTANTS.MONSTER_CHASE_SPEED;
        if (gameState.sanity === 0) {
            chaseSpeed *= 1.3;
        }
        
        this.velocity.copy(direction).multiplyScalar(chaseSpeed);
        
        this.position.x += this.velocity.x * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
        
        this.mesh.lookAt(this.playerController.position);
        
        // FIX #3: Rare escalation to RELENTLESS (5% chance per second in chase)
        if (Math.random() < 0.05 * deltaTime && gameState.sanity < 50) {
            this.state = 'RELENTLESS';
            this.stateTimer = 0;
            if (this.audio) this.audio.monsterRoar();
            console.log('Monster: ESCALATED to RELENTLESS pursuit!');
        }
    }
    
    // FIX #3: RELENTLESS state (sustained high-speed pursuit)
    updateRelentless(deltaTime, gameState) {
        if (gameState.isHiding) {
            this.state = 'CHASE';
            console.log('Monster: Player hiding, de-escalating to CHASE');
            return;
        }
        
        const direction = new THREE.Vector3();
        direction.subVectors(this.playerController.position, this.position);
        direction.y = 0;
        direction.normalize();
        
        let relentlessSpeed = CONSTANTS.MONSTER_RELENTLESS_SPEED;
        if (gameState.sanity === 0) {
            relentlessSpeed *= 1.3;
        }
        
        this.velocity.copy(direction).multiplyScalar(relentlessSpeed);
        
        this.position.x += this.velocity.x * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
        
        this.mesh.lookAt(this.playerController.position);
        
        // Relentless lasts 10 seconds, then de-escalates to CHASE
        if (this.stateTimer > 10) {
            this.state = 'CHASE';
            this.stateTimer = 0;
            console.log('Monster: Relentless pursuit ended, returning to CHASE');
        }
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
    
    moveTowardWaypoint(deltaTime, speed) {
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
        this.velocity.copy(direction).multiplyScalar(speed);
        
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
        if (gameState.isHiding) return;
        
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        if (distanceToPlayer < CONSTANTS.MONSTER_ATTACK_RANGE && this.damageCooldown <= 0) {
            gameState.takeDamage(CONSTANTS.DAMAGE_MONSTER_CONTACT);
            this.damageCooldown = 1.0;
            console.log(`Monster: Contact! Player took ${CONSTANTS.DAMAGE_MONSTER_CONTACT} damage`);
        }
    }
    
    drainSanityProximity(deltaTime, gameState) {
        if (gameState.isHiding) return;
        
        const distanceToPlayer = this.position.distanceTo(this.playerController.position);
        
        if (distanceToPlayer < CONSTANTS.MONSTER_PROXIMITY_SANITY_RANGE && 
            (this.state === 'CHASE' || this.state === 'RELENTLESS')) {
            const drainAmount = CONSTANTS.SANITY_DRAIN_MONSTER_NEAR * deltaTime;
            gameState.drainSanity(drainAmount);
        }
    }
    
    stun() {
        if (this.stunResistActive) {
            console.log('Monster: Stun RESISTED! (within 6s cooldown window)');
            return false;
        }
        
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
        this.stateTimer = 0;

        if (this.audio) this.audio.monsterGrowl(0.7);

        console.log('Monster: Forced into Chase state (puzzle failed)');
    }
}

// ============================================================================
// INTERACTABLE OBJECT
// ============================================================================
class InteractableObject {
    constructor(type, mesh, data, audio = null) {
        this.type = type;
        this.mesh = mesh;
        this.data = data;
        this.audio = audio;
        this.collected = false;
    }
    
    interact(gameState) {
        if (this.collected) {
            return null;
        }
        
        this.collected = true;
        
        if (this.type === 'LORE_NOTE' && this.audio) {
            this.audio.uiChime(true);
        }
        
        this.mesh.visible = false;
        
        return {
            type: this.type,
            data: this.data
        };
    }
}

// ============================================================================
// HIDING SPOT CLASS
// ============================================================================
class HidingSpot {
    constructor(type, mesh, position) {
        this.type = type;
        this.mesh = mesh;
        this.position = position;
        this.occupied = false;
    }
    
    canEnter() {
        return !this.occupied;
    }
    
    enter() {
        this.occupied = true;
    }
    
    exit() {
        this.occupied = false;
    }
}

// ============================================================================
// INTERACTION SYSTEM
// ============================================================================
class InteractionSystem {
    constructor(playerController, gameManager) {
        this.playerController = playerController;
        this.gameManager = gameManager;
        this.interactables = [];
        this.hidingSpots = [];
        this.currentTarget = null;
        this.currentHidingSpot = null;
        this.raycaster = new THREE.Raycaster();
        
        this.setupKeyBindings();
    }
    
    setupKeyBindings() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'e' || e.key === 'E') {
                this.tryInteract();
            }
            
            if (e.key === 'h' || e.key === 'H') {
                this.tryHiding();
            }
        });
    }
    
    addInteractable(interactable) {
        this.interactables.push(interactable);
    }
    
    addHidingSpot(hidingSpot) {
        this.hidingSpots.push(hidingSpot);
    }
    
    update() {
        this.currentTarget = null;
        this.currentHidingSpot = null;
        
        const camera = this.playerController.camera;
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        
        this.raycaster.set(camera.position, direction);
        this.raycaster.far = CONSTANTS.INTERACTION_RANGE;
        
        const meshes = this.interactables
            .filter(obj => !obj.collected && obj.mesh.visible)
            .map(obj => obj.mesh);
        
        const intersects = this.raycaster.intersectObjects(meshes, true);
        
        if (intersects.length > 0) {
            const intersectedMesh = intersects[0].object;
            const target = this.interactables.find(obj => 
                obj.mesh === intersectedMesh || obj.mesh.children.includes(intersectedMesh)
            );
            
            if (target && !target.collected) {
                this.currentTarget = target;
            }
        }
        
        if (!this.gameManager.state.isHiding) {
            for (const spot of this.hidingSpots) {
                const dist = this.playerController.position.distanceTo(spot.position);
                if (dist < CONSTANTS.HIDING_INTERACTION_RANGE && spot.canEnter()) {
                    this.currentHidingSpot = spot;
                    break;
                }
            }
        }
        
        this.updateUI();
    }
    
    updateUI() {
        const prompt = document.getElementById('interactionPrompt');
        
        if (this.gameManager.state.isHiding) {
            prompt.textContent = UI_TEXT.PRESS_H_UNHIDE;
            prompt.classList.remove('hidden');
            return;
        }
        
        if (this.currentHidingSpot) {
            prompt.textContent = UI_TEXT.PRESS_H_HIDE;
            prompt.classList.remove('hidden');
            return;
        }
        
        if (this.currentTarget) {
            let promptText = UI_TEXT.PRESS_E_INTERACT;
            
            if (this.currentTarget.type === 'FORGE_ALTAR') {
                promptText = UI_TEXT.PRESS_E_FORGE;
            } else if (this.currentTarget.type === 'DRAGON_EGG') {
                promptText = UI_TEXT.PRESS_E_EGG;
            } else if (this.currentTarget.type === 'VAULT_RITUAL') {
                promptText = UI_TEXT.PRESS_E_RITUAL;
            } else if (this.currentTarget.type === 'BATTERY_PICKUP') {
                promptText = UI_TEXT.PRESS_E_BATTERY;
            }
            
            prompt.textContent = promptText;
            prompt.classList.remove('hidden');
        } else {
            prompt.classList.add('hidden');
        }
    }
    
    tryHiding() {
        const state = this.gameManager.state;
        
        if (state.isHiding) {
            state.exitHiding();
            if (this.gameManager.audio) this.gameManager.audio.uiClick();
            return;
        }
        
        if (this.currentHidingSpot && this.currentHidingSpot.canEnter()) {
            this.currentHidingSpot.enter();
            state.enterHiding(this.currentHidingSpot);
            if (this.gameManager.audio) this.gameManager.audio.uiClick();
        }
    }
    
    tryInteract() {
        if (!this.currentTarget) return;
        
        const result = this.currentTarget.interact(this.gameManager.state);
        
        if (!result) return;
        
        if (this.gameManager.audio) {
            this.gameManager.audio.uiClick();
        }
        
        switch(result.type) {
            case 'LORE_NOTE':
                this.handleLoreNote(result.data);
                break;
            case 'BATTERY_PICKUP':
                this.handleBatteryPickup();
                break;
            case 'FORGE_ALTAR':
                this.handleForgeAltar();
                break;
            case 'DRAGON_EGG':
                this.handleDragonEgg();
                break;
            case 'VAULT_RITUAL':
                this.handleVaultRitual();
                break;
        }
    }
    
    handleLoreNote(noteData) {
        this.gameManager.state.collectLoreNote();
        
        if (noteData.title === LORE_NOTES.NOTE_5.title) {
            this.gameManager.state.discoveredOriginalDragonTruth = true;
            console.log('✓ Original Dragon Truth discovered!');
        }
        
        this.gameManager.showLoreText(noteData.title, noteData.text);
    }
    
    handleBatteryPickup() {
        this.gameManager.state.restoreBattery(CONSTANTS.BATTERY_RESTORE_PICKUP);
        
        if (this.gameManager.audio) {
            this.gameManager.audio.uiChime(true);
        }
        
        console.log(`✓ Battery restored: +${CONSTANTS.BATTERY_RESTORE_PICKUP}`);
    }
    
    handleForgeAltar() {
        if (this.gameManager.forgePuzzle) {
            this.gameManager.forgePuzzle.show();
        }
    }
    
    handleDragonEgg() {
        if (this.gameManager.dragonChoiceModal) {
            this.gameManager.dragonChoiceModal.show();
        }
    }
    
    handleVaultRitual() {
        if (this.gameManager.vaultRitualModal) {
            this.gameManager.vaultRitualModal.show();
        }
    }
}

// ============================================================================
// PLAYER CONTROLLER - FIX #1: Wall Collision + FIX #2: Door Blocking
// ============================================================================
class PlayerController {
    constructor(camera, audio = null) {
        this.camera = camera;
        this.audio = audio;
        this.position = new THREE.Vector3(0, CONSTANTS.PLAYER_HEIGHT, 0);
        this.velocity = new THREE.Vector3();
        this.yaw = 0;
        this.pitch = 0;
        
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isSprinting = false;
        
        this.isPointerLocked = false;

        this._footstepTimer = 0;
        
        // FIX #1 & #2: Collision data
        this.walls = [];
        this.gameState = null; // Will be set by GameManager
        
        this.setupControls();
    }
    
    // FIX #1 & #2: Set collision geometry
    setWalls(walls) {
        this.walls = walls;
    }
    
    setGameState(gameState) {
        this.gameState = gameState;
    }
    
    setupControls() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        document.addEventListener('pointerlockchange', () => {
            this.isPointerLocked = (document.pointerLockElement === document.body);
        });
    }
    
    onKeyDown(event) {
        switch(event.key.toLowerCase()) {
            case 'w': this.moveForward = true; break;
            case 's': this.moveBackward = true; break;
            case 'a': this.moveLeft = true; break;
            case 'd': this.moveRight = true; break;
            case 'shift': this.isSprinting = true; break;
        }
    }
    
    onKeyUp(event) {
        switch(event.key.toLowerCase()) {
            case 'w': this.moveForward = false; break;
            case 's': this.moveBackward = false; break;
            case 'a': this.moveLeft = false; break;
            case 'd': this.moveRight = false; break;
            case 'shift': this.isSprinting = false; break;
        }
    }
    
    onMouseMove(event) {
        if (!this.isPointerLocked) return;
        
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;
        
        this.yaw -= movementX * CONSTANTS.MOUSE_SENSITIVITY;
        this.pitch -= movementY * CONSTANTS.MOUSE_SENSITIVITY;
        this.pitch = Math.max(-CONSTANTS.CAMERA_PITCH_LIMIT, Math.min(CONSTANTS.CAMERA_PITCH_LIMIT, this.pitch));
    }
    
    update(deltaTime, gameState) {
        if (!this.isPointerLocked) return;
        
        if (gameState.isHiding) {
            this.camera.position.copy(this.position);
            this.camera.quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
            return;
        }
        
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();
        
        const yawQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
        direction.set(0, 0, -1).applyQuaternion(yawQuat);
        direction.y = 0;
        direction.normalize();
        
        right.crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();
        
        const moveVector = new THREE.Vector3();
        if (this.moveForward) moveVector.add(direction);
        if (this.moveBackward) moveVector.sub(direction);
        if (this.moveLeft) moveVector.sub(right);
        if (this.moveRight) moveVector.add(right);
        
        if (moveVector.length() > 0) {
            moveVector.normalize();
            
            let speed = this.isSprinting ? CONSTANTS.PLAYER_SPRINT_SPEED : CONSTANTS.PLAYER_WALK_SPEED;
            speed *= gameState.speedMultiplier;
            
            if (Date.now() > gameState.speedBuffEnd) {
                gameState.speedMultiplier = 1.0;
            }
            
            moveVector.multiplyScalar(speed * deltaTime);
            
            // FIX #1 & #2: Apply collision checking
            const newPosition = this.position.clone().add(moveVector);
            
            if (!this.checkCollision(newPosition, gameState)) {
                this.position.copy(newPosition);
            } else {
                // Try sliding along walls (X and Z separately)
                const newPosX = this.position.clone();
                newPosX.x += moveVector.x;
                if (!this.checkCollision(newPosX, gameState)) {
                    this.position.x = newPosX.x;
                }
                
                const newPosZ = this.position.clone();
                newPosZ.z += moveVector.z;
                if (!this.checkCollision(newPosZ, gameState)) {
                    this.position.z = newPosZ.z;
                }
            }

            this.updateFootstepAudio(deltaTime);
        } else {
            this._footstepTimer = 0;
        }
        
        this.camera.position.copy(this.position);
        this.camera.quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
    }
    
    // FIX #1 & #2: Collision detection with walls and doors
    checkCollision(newPos, gameState) {
        // Check wall collisions
        for (const wall of this.walls) {
            if (this.circleBoxCollision(newPos, CONSTANTS.PLAYER_RADIUS, wall)) {
                return true;
            }
        }
        
        // FIX #2: Check door collisions (locked doors block)
        for (const door of DOORS) {
            if (door.lockKey) {
                // Check if door is locked
                const isLocked = door.lockKey === 'hatcheryDoor' 
                    ? !gameState.hatcheryDoorUnlocked 
                    : !gameState.vaultDoorUnlocked;
                
                if (isLocked) {
                    const doorBox = {
                        minX: door.x - door.width / 2,
                        maxX: door.x + door.width / 2,
                        minY: 0,
                        maxY: CONSTANTS.ROOM_HEIGHT,
                        minZ: door.z - 0.5,
                        maxZ: door.z + 0.5
                    };
                    
                    if (this.circleBoxCollision(newPos, CONSTANTS.PLAYER_RADIUS, doorBox)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    // FIX #1: Circle-box collision helper (player capsule vs wall box)
    circleBoxCollision(circlePos, circleRadius, box) {
        const closestX = Math.max(box.minX, Math.min(circlePos.x, box.maxX));
        const closestZ = Math.max(box.minZ, Math.min(circlePos.z, box.maxZ));
        
        const distX = circlePos.x - closestX;
        const distZ = circlePos.z - closestZ;
        
        const distanceSquared = distX * distX + distZ * distZ;
        
        return distanceSquared < (circleRadius * circleRadius);
    }

    updateFootstepAudio(deltaTime) {
        if (!this.audio) return;

        const interval = this.isSprinting 
            ? CONSTANTS.FOOTSTEP_INTERVAL_SPRINT 
            : CONSTANTS.FOOTSTEP_INTERVAL_WALK;

        this._footstepTimer += deltaTime;
        if (this._footstepTimer >= interval) {
            this._footstepTimer = 0;
            this.audio.playerFootstep(this.isSprinting);
        }
    }
}

// ============================================================================
// FLASHLIGHT SYSTEM
// ============================================================================
class FlashlightSystem {
    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        
        this.spotlight = new THREE.SpotLight(
            CONSTANTS.FLASHLIGHT_COLOR,
            CONSTANTS.FLASHLIGHT_INTENSITY,
            CONSTANTS.FLASHLIGHT_DISTANCE,
            CONSTANTS.FLASHLIGHT_ANGLE,
            CONSTANTS.FLASHLIGHT_PENUMBRA,
            CONSTANTS.FLASHLIGHT_DECAY
        );
        
        this.spotlight.castShadow = true;
        this.spotlight.shadow.mapSize.width = 512;
        this.spotlight.shadow.mapSize.height = 512;
        this.spotlight.visible = false;
        
        this.camera.add(this.spotlight);
        this.spotlight.position.set(0, 0, 0);
        this.spotlight.target.position.set(0, 0, -1);
        this.camera.add(this.spotlight.target);
        
        this.scene.add(this.camera);
    }
    
    toggle(isOn) {
        this.spotlight.visible = isOn;
    }
    
    update(batteryLevel) {
        if (this.spotlight.visible && batteryLevel > 0) {
            const intensityMultiplier = batteryLevel / CONSTANTS.PLAYER_BATTERY_MAX;
            this.spotlight.intensity = CONSTANTS.FLASHLIGHT_INTENSITY * intensityMultiplier;
        }
    }
}

// ============================================================================
// LEVEL BUILDER - FIX #1, #2, #6, #9
// ============================================================================
class LevelBuilder {
    constructor(scene, interactionSystem, audio = null) {
        this.scene = scene;
        this.interactionSystem = interactionSystem;
        this.audio = audio;
        
        // FIX #1, #2, #4: Wall collision boxes
        this.walls = [];
        
        // FIX #6, #9: Light sources for darkness/sanity restore detection
        this.lightSources = [];
    }
    
    buildLevel() {
        this.createEntrance();
        this.createLibrary();
        this.createForge();
        this.createHatchery();
        this.createVault();
        this.createLights();
    }
    
    // FIX #1, #2: Return walls for collision
    getWalls() {
        return this.walls;
    }
    
    // FIX #6, #9: Return light sources
    getLightSources() {
        return this.lightSources;
    }
    
    createEntrance() {
        this.createRoom(0, 0, CONSTANTS.ENTRANCE_WIDTH, CONSTANTS.ENTRANCE_DEPTH, 'Entrance');
        
        const doorToLibrary = this.createDoorway(
            CONSTANTS.ENTRANCE_WIDTH / 2 + 5,
            0,
            0,
            'LIBRARY'
        );
        
        this.scene.add(doorToLibrary);
        
        this.createBatteryPickup(-3, 0.5, 3);
    }
    
    createLibrary() {
        const offsetX = CONSTANTS.ENTRANCE_WIDTH / 2 + 10 + CONSTANTS.LIBRARY_WIDTH / 2;
        this.createRoom(offsetX, 0, CONSTANTS.LIBRARY_WIDTH, CONSTANTS.LIBRARY_DEPTH, 'Library');
        
        const loreNotePositions = [
            { x: offsetX - 4, z: 3, note: LORE_NOTES.NOTE_1 },
            { x: offsetX + 3, z: -2, note: LORE_NOTES.NOTE_2 },
        ];
        
        loreNotePositions.forEach(pos => {
            this.createLoreNote(pos.x, 1, pos.z, pos.note);
        });
        
        const doorToForge = this.createDoorway(
            offsetX + CONSTANTS.LIBRARY_WIDTH / 2 + 5,
            0,
            0,
            'FORGE'
        );
        
        this.scene.add(doorToForge);
        
        this.createHidingSpot(offsetX - 5, 0, 4);
        this.createHidingSpot(offsetX - 5, 0, -4);
        
        this.createBatteryPickup(offsetX + 4, 0.5, 4);
        
        this.createShelf(offsetX - 6, 0, 0);
        this.createShelf(offsetX + 6, 0, 0);
    }
    
    createForge() {
        const offsetX = CONSTANTS.ENTRANCE_WIDTH / 2 + 10 + CONSTANTS.LIBRARY_WIDTH + 10 + CONSTANTS.FORGE_WIDTH / 2;
        this.createRoom(offsetX, 0, CONSTANTS.FORGE_WIDTH, CONSTANTS.FORGE_DEPTH, 'Forge');
        
        const loreNotePositions = [
            { x: offsetX - 3, z: 2, note: LORE_NOTES.NOTE_3 },
            { x: offsetX + 2, z: -3, note: LORE_NOTES.NOTE_4 },
        ];
        
        loreNotePositions.forEach(pos => {
            this.createLoreNote(pos.x, 1, pos.z, pos.note);
        });
        
        this.createForgeAltar(offsetX, 0);
        
        this.createBurntLedger(offsetX - CONSTANTS.FORGE_WIDTH / 2 + 0.5, 1.5, 0);
        this.createBurntLedger(offsetX + CONSTANTS.FORGE_WIDTH / 2 - 0.5, 1.5, 2);
        
        this.createEquationProp(offsetX - 1.5, 0.1, 1.5);
    }
    
    createHatchery() {
        const offsetX = CONSTANTS.ENTRANCE_WIDTH / 2 + 10 + CONSTANTS.LIBRARY_WIDTH + 10 + CONSTANTS.FORGE_WIDTH / 2;
        const offsetZ = -CONSTANTS.FORGE_DEPTH / 2 - 5 - CONSTANTS.HATCHERY_DEPTH / 2;
        
        this.createRoom(offsetX, offsetZ, CONSTANTS.HATCHERY_WIDTH, CONSTANTS.HATCHERY_DEPTH, 'Hatchery');
        
        const loreNote5Pos = { x: offsetX - 4, z: offsetZ + 3, note: LORE_NOTES.NOTE_5 };
        this.createLoreNote(loreNote5Pos.x, 1, loreNote5Pos.z, loreNote5Pos.note);
        
        this.createDragonEggs(offsetX, offsetZ);
    }
    
    createVault() {
        const offsetX = CONSTANTS.ENTRANCE_WIDTH / 2 + 10 + CONSTANTS.LIBRARY_WIDTH + 10 + CONSTANTS.FORGE_WIDTH / 2;
        const offsetZ = -CONSTANTS.FORGE_DEPTH / 2 - 5 - CONSTANTS.HATCHERY_DEPTH - 5 - CONSTANTS.VAULT_DEPTH / 2;
        
        this.createRoom(offsetX, offsetZ, CONSTANTS.VAULT_WIDTH, CONSTANTS.VAULT_DEPTH, 'Vault');
        
        this.createVaultRitualCircle(offsetX, offsetZ);
    }
    
    // FIX #1, #2: Create room with wall collision boxes
    createRoom(x, z, width, depth, name) {
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.9 
        });
        
        const floorGeometry = new THREE.BoxGeometry(width, 0.1, depth);
        const floor = new THREE.Mesh(floorGeometry, wallMaterial);
        floor.position.set(x, 0, z);
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        const wallHeight = CONSTANTS.ROOM_HEIGHT;
        
        // North wall
        const wallNorth = this.createWall(width, wallHeight, CONSTANTS.WALL_THICKNESS);
        wallNorth.position.set(x, wallHeight / 2, z - depth / 2);
        this.scene.add(wallNorth);
        this.walls.push({
            minX: x - width / 2,
            maxX: x + width / 2,
            minY: 0,
            maxY: wallHeight,
            minZ: z - depth / 2 - CONSTANTS.WALL_THICKNESS / 2,
            maxZ: z - depth / 2 + CONSTANTS.WALL_THICKNESS / 2
        });
        
        // South wall
        const wallSouth = this.createWall(width, wallHeight, CONSTANTS.WALL_THICKNESS);
        wallSouth.position.set(x, wallHeight / 2, z + depth / 2);
        this.scene.add(wallSouth);
        this.walls.push({
            minX: x - width / 2,
            maxX: x + width / 2,
            minY: 0,
            maxY: wallHeight,
            minZ: z + depth / 2 - CONSTANTS.WALL_THICKNESS / 2,
            maxZ: z + depth / 2 + CONSTANTS.WALL_THICKNESS / 2
        });
        
        // West wall
        const wallWest = this.createWall(CONSTANTS.WALL_THICKNESS, wallHeight, depth);
        wallWest.position.set(x - width / 2, wallHeight / 2, z);
        this.scene.add(wallWest);
        this.walls.push({
            minX: x - width / 2 - CONSTANTS.WALL_THICKNESS / 2,
            maxX: x - width / 2 + CONSTANTS.WALL_THICKNESS / 2,
            minY: 0,
            maxY: wallHeight,
            minZ: z - depth / 2,
            maxZ: z + depth / 2
        });
        
        // East wall
        const wallEast = this.createWall(CONSTANTS.WALL_THICKNESS, wallHeight, depth);
        wallEast.position.set(x + width / 2, wallHeight / 2, z);
        this.scene.add(wallEast);
        this.walls.push({
            minX: x + width / 2 - CONSTANTS.WALL_THICKNESS / 2,
            maxX: x + width / 2 + CONSTANTS.WALL_THICKNESS / 2,
            minY: 0,
            maxY: wallHeight,
            minZ: z - depth / 2,
            maxZ: z + depth / 2
        });
        
        console.log(`Created room: ${name} at (${x}, ${z})`);
    }
    
    createWall(width, height, depth) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x333333, 
            roughness: 0.9 
        });
        const wall = new THREE.Mesh(geometry, material);
        wall.castShadow = true;
        wall.receiveShadow = true;
        return wall;
    }
    
    createDoorway(x, y, z, targetRoom) {
        const doorwayGroup = new THREE.Group();
        
        const frameGeometry = new THREE.BoxGeometry(CONSTANTS.DOORWAY_WIDTH + 0.2, CONSTANTS.ROOM_HEIGHT * 0.8, 0.1);
        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(x, y + CONSTANTS.ROOM_HEIGHT * 0.4, z);
        doorwayGroup.add(frame);
        
        return doorwayGroup;
    }
    
    createLoreNote(x, y, z, noteData) {
        const geometry = new THREE.BoxGeometry(
            CONSTANTS.LORE_NOTE_SIZE,
            CONSTANTS.LORE_NOTE_SIZE,
            CONSTANTS.LORE_NOTE_SIZE
        );
        const material = new THREE.MeshStandardMaterial({
            color: CONSTANTS.LORE_NOTE_GLOW_COLOR,
            emissive: CONSTANTS.LORE_NOTE_GLOW_COLOR,
            emissiveIntensity: CONSTANTS.LORE_NOTE_GLOW_INTENSITY
        });
        
        const noteMesh = new THREE.Mesh(geometry, material);
        noteMesh.position.set(x, y, z);
        noteMesh.castShadow = false;
        noteMesh.receiveShadow = false;
        
        this.scene.add(noteMesh);
        
        const interactable = new InteractableObject('LORE_NOTE', noteMesh, noteData, this.audio);
        this.interactionSystem.addInteractable(interactable);
        
        console.log(`Lore note placed: ${noteData.title}`);
    }
    
    createBatteryPickup(x, y, z) {
        const geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 8);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x00ff00,
            emissiveIntensity: 1.5
        });
        
        const batteryMesh = new THREE.Mesh(geometry, material);
        batteryMesh.position.set(x, y, z);
        batteryMesh.castShadow = false;
        
        this.scene.add(batteryMesh);
        
        const interactable = new InteractableObject('BATTERY_PICKUP', batteryMesh, null, this.audio);
        this.interactionSystem.addInteractable(interactable);
        
        console.log(`Battery pickup placed at (${x}, ${y}, ${z})`);
    }
    
    createHidingSpot(x, y, z) {
        const geometry = new THREE.BoxGeometry(1, 2, 0.8);
        const material = new THREE.MeshStandardMaterial({
            color: 0x444444,
            roughness: 0.7
        });
        
        const locker = new THREE.Mesh(geometry, material);
        locker.position.set(x, y + 1, z);
        locker.castShadow = true;
        locker.receiveShadow = true;
        
        this.scene.add(locker);
        
        const hidingSpot = new HidingSpot('LOCKER', locker, new THREE.Vector3(x, y, z));
        this.interactionSystem.addHidingSpot(hidingSpot);
        
        console.log(`Hiding spot (locker) placed at (${x}, ${y}, ${z})`);
    }
    
    createShelf(x, y, z) {
        const geometry = new THREE.BoxGeometry(0.3, 2, 3);
        const material = new THREE.MeshStandardMaterial({
            color: 0x553300,
            roughness: 0.9
        });
        
        const shelf = new THREE.Mesh(geometry, material);
        shelf.position.set(x, y + 1, z);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        
        this.scene.add(shelf);
    }
    
    createBurntLedger(x, y, z) {
        const geometry = new THREE.PlaneGeometry(0.4, 0.6);
        const material = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 1.0,
            side: THREE.DoubleSide
        });
        
        const ledger = new THREE.Mesh(geometry, material);
        ledger.position.set(x, y, z);
        ledger.rotation.y = Math.PI / 2;
        ledger.castShadow = false;
        ledger.receiveShadow = true;
        
        this.scene.add(ledger);
    }
    
    createEquationProp(x, y, z) {
        const geometry = new THREE.PlaneGeometry(0.8, 0.4);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffeeaa,
            roughness: 0.9,
            side: THREE.DoubleSide
        });
        
        const prop = new THREE.Mesh(geometry, material);
        prop.position.set(x, y, z);
        prop.rotation.x = -Math.PI / 2;
        prop.castShadow = false;
        prop.receiveShadow = true;
        
        this.scene.add(prop);
    }
    
    createForgeAltar(x, z) {
        const geometry = new THREE.CylinderGeometry(1, 1.2, 1.5, 8);
        const material = new THREE.MeshStandardMaterial({
            color: 0x884400,
            emissive: 0xff4400,
            emissiveIntensity: 0.3
        });
        
        const altar = new THREE.Mesh(geometry, material);
        altar.position.set(x, 0.75, z);
        altar.castShadow = true;
        
        this.scene.add(altar);
        
        const interactable = new InteractableObject('FORGE_ALTAR', altar, null, this.audio);
        this.interactionSystem.addInteractable(interactable);
        
        console.log('Forge altar created');
    }
    
    createDragonEggs(centerX, centerZ) {
        const eggPositions = [
            { x: centerX - 3, z: centerZ, type: 'EmberDrake' },
            { x: centerX, z: centerZ, type: 'MistWyrm' },
            { x: centerX + 3, z: centerZ, type: 'VoltSerpent' }
        ];
        
        eggPositions.forEach(pos => {
            const geometry = new THREE.SphereGeometry(0.5, 16, 16);
            const dragonData = DRAGON_TYPES[pos.type];
            const material = new THREE.MeshStandardMaterial({
                color: dragonData.color,
                emissive: dragonData.emissive,
                emissiveIntensity: 0.4
            });
            
            const egg = new THREE.Mesh(geometry, material);
            egg.position.set(pos.x, 0.5, pos.z);
            egg.scale.set(1, 1.2, 1);
            
            this.scene.add(egg);
            
            const interactable = new InteractableObject('DRAGON_EGG', egg, { type: pos.type }, this.audio);
            this.interactionSystem.addInteractable(interactable);
        });
        
        console.log('Dragon eggs created');
    }
    
    createVaultRitualCircle(x, z) {
        const geometry = new THREE.CylinderGeometry(2, 2, 0.1, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x4444ff,
            emissive: 0x2222ff,
            emissiveIntensity: 0.6
        });
        
        const circle = new THREE.Mesh(geometry, material);
        circle.position.set(x, 0.05, z);
        
        this.scene.add(circle);
        
        const interactable = new InteractableObject('VAULT_RITUAL', circle, null, this.audio);
        this.interactionSystem.addInteractable(interactable);
        
        console.log('Vault ritual circle created');
    }
    
    // FIX #6, #9: Create lights and track positions
    createLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);
        
        const roomCenters = [
            { x: 0, z: 0 },
            { x: 20, z: 0 },
            { x: 35, z: 0 },
            { x: 35, z: -15 },
            { x: 35, z: -30 }
        ];
        
        roomCenters.forEach(center => {
            const pointLight = new THREE.PointLight(0xffffcc, 0.4, 15);
            pointLight.position.set(center.x, 3, center.z);
            pointLight.castShadow = true;
            this.scene.add(pointLight);
            
            // FIX #6, #9: Track light sources
            this.lightSources.push({
                position: new THREE.Vector3(center.x, 3, center.z),
                intensity: 0.4,
                distance: 15
            });
        });
    }
}

// ============================================================================
// GAME MANAGER - ALL FIXES INTEGRATED
// ============================================================================
class GameManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.player = null;
        this.flashlight = null;
        this.interactionSystem = null;
        this.levelBuilder = null;
        this.monsterAI = null;
        this.state = new GameState();
        
        this.forgePuzzle = null;
        this.dragonChoiceModal = null;
        this.vaultRitualModal = null;
        
        this.clock = new THREE.Clock();
        this.lastTime = 0;

        this.audio = new WebAudioManager();
        
        this.init();
    }
    
    init() {
        this.setupRenderer();
        this.setupScene();
        this.setupCamera();
        this.setupPlayer();
        this.setupFlashlight();
        this.setupInteractionSystem();
        this.setupLevel();
        this.setupMonster();
        this.setupModals();
        this.setupUI();
        this.setupInputHandlers();
        this.setupStartScreen();
        
        console.log('Game initialized - Click to start');
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.Fog(0x000000, 10, 40);
    }
    
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            CONSTANTS.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            CONSTANTS.CAMERA_NEAR,
            CONSTANTS.CAMERA_FAR
        );
    }
    
    setupPlayer() {
        this.player = new PlayerController(this.camera, this.audio);
    }
    
    setupFlashlight() {
        this.flashlight = new FlashlightSystem(this.camera, this.scene);
    }
    
    setupInteractionSystem() {
        this.interactionSystem = new InteractionSystem(this.player, this);
    }
    
    setupLevel() {
        this.levelBuilder = new LevelBuilder(this.scene, this.interactionSystem, this.audio);
        this.levelBuilder.buildLevel();
        
        // FIX #1, #2: Set walls for collision detection
        this.player.setWalls(this.levelBuilder.getWalls());
        this.player.setGameState(this.state);
    }
    
    setupMonster() {
        this.monsterAI = new MonsterAI(this.scene, this.player, this.audio);
        
        // FIX #4: Set obstacles for LOS
        this.monsterAI.setObstacles(this.levelBuilder.getWalls().map(wallBox => {
            const geometry = new THREE.BoxGeometry(
                wallBox.maxX - wallBox.minX,
                wallBox.maxY - wallBox.minY,
                wallBox.maxZ - wallBox.minZ
            );
            const material = new THREE.MeshBasicMaterial({ visible: false });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (wallBox.minX + wallBox.maxX) / 2,
                (wallBox.minY + wallBox.maxY) / 2,
                (wallBox.minZ + wallBox.maxZ) / 2
            );
            return mesh;
        }));
    }
    
    setupModals() {
        this.forgePuzzle = new ForgePuzzle(this);
        this.dragonChoiceModal = new DragonChoiceModal(this);
        this.vaultRitualModal = new VaultRitualModal(this);
    }
    
    // FIX #8: Add restart button
    setupUI() {
        this.updateUI();
        
        const tutorialText = document.getElementById('tutorialText');
        tutorialText.textContent = UI_TEXT.TUTORIAL_TEXT;
        
        const testKeysInfo = document.getElementById('testKeysInfo');
        testKeysInfo.textContent = UI_TEXT.TEST_KEYS_INFO;
        
        // FIX #8: Setup restart button
        const restartBtn = document.getElementById('restartGameBtn');
        if (restartBtn) {
            restartBtn.textContent = UI_TEXT.RESTART_BUTTON;
            restartBtn.addEventListener('click', () => {
                location.reload();
            });
        }
    }
    
    setupInputHandlers() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'f' || e.key === 'F') {
                if (this.state.toggleFlashlight()) {
                    this.flashlight.toggle(this.state.flashlightOn);
                }
            }
            
            if (e.key === 'q' || e.key === 'Q') {
                if (this.state.dragon) {
                    this.state.dragon.useAbility(this.monsterAI, this.state);
                }
            }
            
            // Test keys
            if (e.key === '1') {
                this.state.takeDamage(CONSTANTS.DAMAGE_TEST_AMOUNT);
                console.log(`[TEST] Health: ${this.state.health}`);
            }
            if (e.key === '2') {
                this.state.drainSanity(CONSTANTS.SANITY_TEST_AMOUNT);
                console.log(`[TEST] Sanity: ${this.state.sanity}`);
            }
            if (e.key === '3') {
                this.state.restoreSanity(CONSTANTS.SANITY_TEST_AMOUNT);
                console.log(`[TEST] Sanity: ${this.state.sanity}`);
            }
            if (e.key === '4') {
                this.state.drainBattery(CONSTANTS.BATTERY_TEST_AMOUNT);
                console.log(`[TEST] Battery: ${this.state.battery}`);
            }
            if (e.key === '5') {
                this.state.restoreBattery(CONSTANTS.BATTERY_TEST_AMOUNT);
                console.log(`[TEST] Battery: ${this.state.battery}`);
            }
        });
    }
    
    setupStartScreen() {
        const startScreen = document.getElementById('startScreen');
        const startBtn = document.getElementById('startGameBtn');
        
        startBtn.textContent = UI_TEXT.CLICK_TO_START;
        
        startBtn.addEventListener('click', () => {
            this.audio.unlock();
            
            startScreen.classList.add('hidden');
            
            const hud = document.getElementById('hud');
            hud.classList.remove('hidden');
            
            document.body.requestPointerLock();
            this.startGame();
        });
    }
    
    startGame() {
        console.log('Game started');

        this.audio.startAmbience();
        
        this.animate();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const currentTime = this.clock.getElapsedTime();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        if (this.state.gameOver) {
            this.renderer.render(this.scene, this.camera);
            return;
        }
        
        this.player.update(deltaTime, this.state);
        
        // FIX #6, #7, #9: Darkness detection and sanity restore
        this.updateDarknessAndSanity(deltaTime);
        
        if (this.state.flashlightOn) {
            this.state.drainBattery(CONSTANTS.BATTERY_DRAIN_RATE * deltaTime);
            this.flashlight.update(this.state.battery);
            
            if (this.state.battery === 0) {
                this.state.flashlightOn = false;
                this.flashlight.toggle(false);
            }
        }
        
        this.interactionSystem.update();
        
        if (this.monsterAI) {
            this.monsterAI.update(deltaTime, this.state);
        }
        
        if (this.state.dragon) {
            this.state.dragon.update(deltaTime, this.player, this.monsterAI, this.state);
        }

        this.audio.updateHallucinations(this.state);

        const breathingIntensity = 1.0 - (this.state.health / CONSTANTS.PLAYER_HEALTH_MAX) * 0.5
            + (1.0 - this.state.sanity / CONSTANTS.PLAYER_SANITY_MAX) * 0.5;
        this.audio.playerBreathingIntensity(breathingIntensity);
        
        this.updateSanityVisuals();
        
        // FIX #5: Update damage flash
        this.updateDamageFlash();
        
        this.updateUI();
        this.renderer.render(this.scene, this.camera);
    }
    
    // FIX #6, #7, #9: Darkness detection + sanity restore zones
    updateDarknessAndSanity(deltaTime) {
        const playerPos = this.player.position;
        const lightSources = this.levelBuilder.getLightSources();
        
        // FIX #6: Check if player is in darkness (not near any light source)
        let inDarkness = true;
        let nearLight = false;
        
        // Check flashlight
        if (this.state.flashlightOn && this.state.battery > 0) {
            inDarkness = false;
        }
        
        // FIX #7: Check dragon light
        if (this.state.dragon) {
            const distToDragon = playerPos.distanceTo(this.state.dragon.position);
            if (distToDragon < CONSTANTS.DRAGON_LIGHT_DISTANCE) {
                inDarkness = false;
                nearLight = true;
            }
        }
        
        // Check room lights
        for (const light of lightSources) {
            const distToLight = playerPos.distanceTo(light.position);
            if (distToLight < light.distance) {
                inDarkness = false;
                nearLight = true;
                break;
            }
        }
        
        // Apply darkness sanity drain
        if (inDarkness) {
            this.state.drainSanity(CONSTANTS.SANITY_DRAIN_DARKNESS * deltaTime);
        }
        
        // FIX #9: Apply sanity restore near lights
        if (nearLight && !inDarkness) {
            this.state.restoreSanity(CONSTANTS.SANITY_RESTORE_LIGHT * deltaTime);
        }
    }
    
    updateSanityVisuals() {
        const body = document.body;
        
        if (this.state.sanity === 0) {
            if (!body.classList.contains('ui-glitch')) {
                body.classList.add('ui-glitch');
            }
        } else {
            body.classList.remove('ui-glitch');
        }
        
        const vignetteIntensity = 1.0 - (this.state.sanity / CONSTANTS.PLAYER_SANITY_MAX);
        body.style.setProperty('--vignette-intensity', vignetteIntensity);
    }
    
    // FIX #5: Update damage flash effect
    updateDamageFlash() {
        const body = document.body;
        
        if (this.state.damageFlashActive && Date.now() < this.state.damageFlashEnd) {
            if (!body.classList.contains('damage-flash')) {
                body.classList.add('damage-flash');
            }
        } else {
            body.classList.remove('damage-flash');
            this.state.damageFlashActive = false;
        }
    }
    
    updateUI() {
        document.getElementById('healthValue').textContent = Math.floor(this.state.health);
        document.getElementById('sanityValue').textContent = Math.floor(this.state.sanity);
        document.getElementById('ammoValue').textContent = this.state.ammo;
        document.getElementById('batteryValue').textContent = Math.floor(this.state.battery);
        
        const flashlightStatus = document.getElementById('flashlightStatus');
        flashlightStatus.textContent = this.state.flashlightOn ? 'ON' : 'OFF';
        flashlightStatus.style.color = this.state.flashlightOn ? '#44ff44' : '#888888';
        
        const dragonUI = document.getElementById('dragonUI');
        if (this.state.dragon) {
            dragonUI.classList.remove('hidden');
            dragonUI.style.display = 'block';
            document.getElementById('dragonTrustValue').textContent = Math.floor(this.state.dragonTrust);
            document.getElementById('abilityUsesValue').textContent = this.state.dragonAbilityUses;
        } else {
            dragonUI.classList.add('hidden');
            dragonUI.style.display = 'none';
        }
    }
    
    showLoreText(title, text) {
        const modal = document.getElementById('loreModal');
        document.getElementById('loreTitle').textContent = title;
        document.getElementById('loreText').textContent = text;
        modal.classList.remove('hidden');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, CONSTANTS.LORE_LOG_DURATION);
    }
}

// ============================================================================
// INITIALIZE GAME
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
    new GameManager();
});