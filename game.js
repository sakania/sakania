// ============================================================================
// ATC HORROR ECONOMICS GAME - TURN 1: FOUNDATION
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
};

// UI TEXT CONSTANTS (for easy translation)
const UI_TEXT = {
    CLICK_TO_START: "Click to start",
    PRESS_E_INTERACT: "Press E to interact",
    HEALTH_LABEL: "Health",
    SANITY_LABEL: "Sanity",
    AMMO_LABEL: "Stun Rounds",
    BATTERY_LABEL: "Battery",
    FLASHLIGHT_LABEL: "Flashlight",
    DRAGON_BOND_LABEL: "Dragon Bond",
    ABILITY_USES_LABEL: "Ability Uses",
};

// ============================================================================
// GAME STATE
// ============================================================================
class GameState {
    constructor() {
        // Player stats
        this.health = CONSTANTS.PLAYER_HEALTH_MAX;
        this.sanity = CONSTANTS.PLAYER_SANITY_MAX;
        this.ammo = CONSTANTS.PLAYER_AMMO_MAX;
        this.battery = CONSTANTS.PLAYER_BATTERY_MAX;
        this.flashlightOn = false;
        
        // Dragon state (null until chosen)
        this.dragon = null;
        this.dragonTrust = 50;
        this.dragonAbilityUses = 3;
        
        // Game phase
        this.phase = 'ENTRANCE'; // ENTRANCE, LIBRARY, FORGE, HATCHERY, VAULT, ENDED
        
        // Progress flags
        this.loreNotesCollected = 0;
        this.forgePuzzleSolved = false;
        this.hatcheryDoorUnlocked = false;
        this.vaultDoorUnlocked = false;
        this.ritualCompleted = false;
        this.discoveredOriginalDragonTruth = false;
    }
}

// ============================================================================
// GAME MANAGER (Main Controller)
// ============================================================================
class GameManager {
    constructor() {
        this.state = new GameState();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.clock = new THREE.Clock();
        
        // Pointer lock state
        this.isPointerLocked = false;
        
        // DOM references
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
        this.setupPointerLock();
        this.setupControls();
        this.animate();
    }
    
    setupThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.Fog(0x000000, 10, 100);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            CONSTANTS.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            CONSTANTS.CAMERA_NEAR,
            CONSTANTS.CAMERA_FAR
        );
        this.camera.position.set(0, 1.6, 0); // Eye level height
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        
        // Basic lighting (temporary for Turn 1)
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupPointerLock() {
        const canvas = this.renderer.domElement;
        
        // Request pointer lock on click
        this.dom.lockInstruction.addEventListener('click', () => {
            canvas.requestPointerLock();
        });
        
        // Pointer lock change events
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
    }
    
    setupControls() {
        // Camera rotation (pitch and yaw)
        this.camera.rotation.order = 'YXZ';
        this.cameraRotation = { yaw: 0, pitch: 0 };
        
        // Mouse move handler
        document.addEventListener('mousemove', (event) => {
            if (!this.isPointerLocked) return;
            
            // Update yaw (horizontal rotation)
            this.cameraRotation.yaw -= event.movementX * CONSTANTS.MOUSE_SENSITIVITY;
            
            // Update pitch (vertical rotation) with limits
            this.cameraRotation.pitch -= event.movementY * CONSTANTS.MOUSE_SENSITIVITY;
            this.cameraRotation.pitch = Math.max(
                -CONSTANTS.CAMERA_PITCH_LIMIT,
                Math.min(CONSTANTS.CAMERA_PITCH_LIMIT, this.cameraRotation.pitch)
            );
            
            // Apply rotation to camera
            this.camera.rotation.y = this.cameraRotation.yaw;
            this.camera.rotation.x = this.cameraRotation.pitch;
        });
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    updateHUD() {
        // Update health bar
        const healthPercent = (this.state.health / CONSTANTS.PLAYER_HEALTH_MAX) * 100;
        this.dom.healthBar.querySelector('.bar-fill').style.width = healthPercent + '%';
        this.dom.healthValue.textContent = Math.floor(this.state.health);
        
        // Update sanity bar
        const sanityPercent = (this.state.sanity / CONSTANTS.PLAYER_SANITY_MAX) * 100;
        this.dom.sanityBar.querySelector('.bar-fill').style.width = sanityPercent + '%';
        this.dom.sanityValue.textContent = Math.floor(this.state.sanity);
        
        // Update inventory
        this.dom.ammoCount.textContent = this.state.ammo;
        this.dom.batteryCount.textContent = Math.floor(this.state.battery) + '%';
        this.dom.flashlightStatus.textContent = this.state.flashlightOn ? 'ON' : 'OFF';
        
        // Update dragon info (only visible when dragon exists)
        if (this.state.dragon) {
            this.dom.dragonInfo.style.display = 'block';
            
            const trustPercent = this.state.dragonTrust;
            this.dom.dragonTrustBar.querySelector('.bar-fill').style.width = trustPercent + '%';
            
            // Trust label
            let trustLabel = 'Fractured';
            if (trustPercent >= 70) trustLabel = 'Loyal';
            else if (trustPercent >= 30) trustLabel = 'Unstable';
            this.dom.trustLabel.textContent = trustLabel;
            
            this.dom.abilityUses.textContent = `${this.state.dragonAbilityUses}/3`;
        } else {
            this.dom.dragonInfo.style.display = 'none';
        }
    }
    
    update(deltaTime) {
        // Update systems here (will be expanded in future turns)
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
});