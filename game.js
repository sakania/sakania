// ============================================================================
// ATC HORROR ECONOMICS GAME - TURN 5: INTERACTIONS + ATC LORE NOTES
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
    
    // Test room dimensions
    ROOM_WIDTH: 12,
    ROOM_HEIGHT: 4,
    ROOM_DEPTH: 12,
    WALL_THICKNESS: 0.3,
    
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
    LORE_LOG_DURATION: 5000, // 5 seconds in milliseconds
    
    // Darkness threshold
    DARKNESS_THRESHOLD: 0.5,
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
    TUTORIAL_TEXT: "WASD to move. Shift to sprint. F for flashlight. E to interact.",
    TEST_KEYS_INFO: "[TEST MODE] 1: Damage, 2: Drain Sanity, 3: Restore Sanity, 4: Drain Battery, 5: Restore Battery, F: Toggle Flashlight, E: Interact",
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
    }
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
        this.phase = 'ENTRANCE';
        
        // Progress flags
        this.loreNotesCollected = 0;
        this.forgePuzzleSolved = false;
        this.hatcheryDoorUnlocked = false;
        this.vaultDoorUnlocked = false;
        this.ritualCompleted = false;
        this.discoveredOriginalDragonTruth = false;
    }
    
    // ========================================================================
    // STAT MODIFICATION METHODS
    // ========================================================================
    
    takeDamage(amount) {
        if (amount < 0) {
            console.warn('takeDamage called with negative amount:', amount);
            return;
        }
        
        this.health = Math.max(0, this.health - amount);
        
        if (this.health === 0) {
            console.log('Player health reached 0');
        }
    }
    
    restoreHealth(amount) {
        if (amount < 0) {
            console.warn('restoreHealth called with negative amount:', amount);
            return;
        }
        
        this.health = Math.min(CONSTANTS.PLAYER_HEALTH_MAX, this.health + amount);
    }
    
    drainSanity(amount) {
        if (amount < 0) {
            console.warn('drainSanity called with negative amount:', amount);
            return;
        }
        
        const oldSanity = this.sanity;
        this.sanity = Math.max(0, this.sanity - amount);
        
        // Check sanity thresholds
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
        if (amount < 0) {
            console.warn('restoreSanity called with negative amount:', amount);
            return;
        }
        
        this.sanity = Math.min(CONSTANTS.PLAYER_SANITY_MAX, this.sanity + amount);
    }
    
    drainBattery(amount) {
        if (amount < 0) {
            console.warn('drainBattery called with negative amount:', amount);
            return;
        }
        
        this.battery = Math.max(0, this.battery - amount);
        
        // Auto-turn off flashlight when battery depleted
        if (this.battery === 0 && this.flashlightOn) {
            this.flashlightOn = false;
            console.log('Battery depleted - flashlight auto-off');
        }
    }
    
    restoreBattery(amount) {
        if (amount < 0) {
            console.warn('restoreBattery called with negative amount:', amount);
            return;
        }
        
        this.battery = Math.min(CONSTANTS.PLAYER_BATTERY_MAX, this.battery + amount);
    }
    
    useAmmo() {
        if (this.ammo <= 0) {
            console.warn('useAmmo called but ammo is 0');
            return false;
        }
        
        this.ammo--;
        return true;
    }
    
    addAmmo(amount) {
        if (amount < 0) {
            console.warn('addAmmo called with negative amount:', amount);
            return;
        }
        
        this.ammo = Math.min(CONSTANTS.PLAYER_AMMO_MAX, this.ammo + amount);
    }
    
    useDragonAbility() {
        if (!this.dragon) {
            console.warn('useDragonAbility called but no dragon exists');
            return false;
        }
        
        if (this.dragonAbilityUses <= 0) {
            console.warn('useDragonAbility called but no uses remaining');
            return false;
        }
        
        this.dragonAbilityUses--;
        return true;
    }
    
    modifyDragonTrust(amount) {
        if (!this.dragon) {
            console.warn('modifyDragonTrust called but no dragon exists');
            return;
        }
        
        const oldTrust = this.dragonTrust;
        this.dragonTrust = Math.max(0, Math.min(100, this.dragonTrust + amount));
        
        // Check trust threshold transitions
        if (oldTrust >= 30 && this.dragonTrust < 30) {
            console.log('Dragon trust: Fractured (< 30) - may refuse commands');
        } else if (oldTrust < 30 && this.dragonTrust >= 30) {
            console.log('Dragon trust: Unstable (30-69) - normal behavior');
        } else if (oldTrust < 70 && this.dragonTrust >= 70) {
            console.log('Dragon trust: Loyal (≥ 70) - reduced cooldowns, enables endings');
        } else if (oldTrust >= 70 && this.dragonTrust < 70) {
            console.log('Dragon trust: Dropped below Loyal threshold');
        }
    }
    
    toggleFlashlight() {
        // Cannot toggle if battery is 0
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
        console.log(`Lore notes collected: ${this.loreNotesCollected}/4`);
    }
}

// ============================================================================
// INTERACTABLE OBJECT
// ============================================================================
class InteractableObject {
    constructor(mesh, type, data) {
        this.mesh = mesh;
        this.type = type; // 'lore_note', 'door', 'pickup', etc.
        this.data = data; // Custom data for this interactable
        this.isActive = true;
        
        // Mark mesh as interactable
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
        // Display lore text
        gameManager.showLoreText(this.data.title, this.data.text);
        
        // Update game state
        gameManager.state.collectLoreNote();
        
        // Remove from scene
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
    
    update() {
        // Raycast from center of screen
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(this.camera.quaternion);
        
        this.raycaster.set(this.camera.position, direction);
        
        // Get all objects in scene
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        
        // Find first interactable object
        this.currentTarget = null;
        for (let intersect of intersects) {
            const interactable = intersect.object.userData.interactable;
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
        
        // Movement state
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isSprinting = false;
        
        // Collision bounds (AABB)
        this.radius = CONSTANTS.PLAYER_RADIUS;
        this.height = CONSTANTS.PLAYER_HEIGHT;
        
        this.setupKeyboardControls();
    }
    
    setupKeyboardControls() {
        // Key down handler
        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'KeyW':
                    this.moveForward = true;
                    break;
                case 'KeyS':
                    this.moveBackward = true;
                    break;
                case 'KeyA':
                    this.moveLeft = true;
                    break;
                case 'KeyD':
                    this.moveRight = true;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.isSprinting = true;
                    break;
            }
        });
        
        // Key up handler
        document.addEventListener('keyup', (event) => {
            switch(event.code) {
                case 'KeyW':
                    this.moveForward = false;
                    break;
                case 'KeyS':
                    this.moveBackward = false;
                    break;
                case 'KeyA':
                    this.moveLeft = false;
                    break;
                case 'KeyD':
                    this.moveRight = false;
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.isSprinting = false;
                    break;
            }
        });
    }
    
    update(deltaTime, collisionGeometry) {
        // Calculate movement direction
        const direction = new THREE.Vector3();
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        
        // Get camera forward and right vectors (ignore vertical component)
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        
        right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
        right.normalize();
        
        // Calculate movement vector
        if (this.moveForward) direction.add(forward);
        if (this.moveBackward) direction.sub(forward);
        if (this.moveRight) direction.add(right);
        if (this.moveLeft) direction.sub(right);
        
        // Normalize to prevent faster diagonal movement
        if (direction.length() > 0) {
            direction.normalize();
        }
        
        // Apply speed
        const speed = this.isSprinting ? CONSTANTS.PLAYER_SPRINT_SPEED : CONSTANTS.PLAYER_WALK_SPEED;
        this.velocity.x = direction.x * speed;
        this.velocity.z = direction.z * speed;
        
        // Calculate new position
        const newPosition = this.position.clone();
        newPosition.x += this.velocity.x * deltaTime;
        newPosition.z += this.velocity.z * deltaTime;
        
        // Check collision and update position
        if (!this.checkCollision(newPosition, collisionGeometry)) {
            this.position.copy(newPosition);
        } else {
            // Try sliding along walls (check X and Z separately)
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
        
        // Update camera position
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
        // Player AABB
        const playerMinX = playerPos.x - this.radius;
        const playerMaxX = playerPos.x + this.radius;
        const playerMinY = playerPos.y - this.height;
        const playerMaxY = playerPos.y;
        const playerMinZ = playerPos.z - this.radius;
        const playerMaxZ = playerPos.z + this.radius;
        
        // Wall AABB
        const wallMinX = wall.position.x - wall.size.x / 2;
        const wallMaxX = wall.position.x + wall.size.x / 2;
        const wallMinY = wall.position.y - wall.size.y / 2;
        const wallMaxY = wall.position.y + wall.size.y / 2;
        const wallMinZ = wall.position.z - wall.size.z / 2;
        const wallMaxZ = wall.position.z + wall.size.z / 2;
        
        // AABB intersection test
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
        
        // Create flashlight spotlight
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
        
        // Position light at camera
        this.light.position.copy(camera.position);
        
        // Create target for spotlight direction
        this.target = new THREE.Object3D();
        this.scene.add(this.target);
        this.light.target = this.target;
        
        // Initially off
        this.light.visible = false;
        
        this.scene.add(this.light);
    }
    
    update(isOn) {
        // Update visibility
        this.light.visible = isOn;
        
        if (isOn) {
            // Update light position to camera
            this.light.position.copy(this.camera.position);
            
            // Update target position (point in camera direction)
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
    constructor(scene) {
        this.scene = scene;
        this.collisionGeometry = [];
        this.interactables = [];
    }
    
    buildTestRoom() {
        const roomWidth = CONSTANTS.ROOM_WIDTH;
        const roomHeight = CONSTANTS.ROOM_HEIGHT;
        const roomDepth = CONSTANTS.ROOM_DEPTH;
        const wallThickness = CONSTANTS.WALL_THICKNESS;
        
        // Materials
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2a2d35,
            roughness: 0.8,
            metalness: 0.2
        });
        
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1d25,
            roughness: 0.9,
            metalness: 0.1
        });
        
        const ceilingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x15181f,
            roughness: 0.7,
            metalness: 0.3
        });
        
        // Floor
        const floorGeometry = new THREE.BoxGeometry(roomWidth, wallThickness, roomDepth);
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.set(0, -wallThickness / 2, 0);
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        this.collisionGeometry.push({
            position: floor.position.clone(),
            size: new THREE.Vector3(roomWidth, wallThickness, roomDepth)
        });
        
        // Ceiling
        const ceilingGeometry = new THREE.BoxGeometry(roomWidth, wallThickness, roomDepth);
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.position.set(0, roomHeight - wallThickness / 2, 0);
        ceiling.receiveShadow = true;
        this.scene.add(ceiling);
        
        // North wall
        const northWallGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, wallThickness);
        const northWall = new THREE.Mesh(northWallGeometry, wallMaterial);
        northWall.position.set(0, roomHeight / 2, roomDepth / 2);
        northWall.castShadow = true;
        northWall.receiveShadow = true;
        this.scene.add(northWall);
        
        this.collisionGeometry.push({
            position: northWall.position.clone(),
            size: new THREE.Vector3(roomWidth, roomHeight, wallThickness)
        });
        
        // South wall
        const southWallGeometry = new THREE.BoxGeometry(roomWidth, roomHeight, wallThickness);
        const southWall = new THREE.Mesh(southWallGeometry, wallMaterial);
        southWall.position.set(0, roomHeight / 2, -roomDepth / 2);
        southWall.castShadow = true;
        southWall.receiveShadow = true;
        this.scene.add(southWall);
        
        this.collisionGeometry.push({
            position: southWall.position.clone(),
            size: new THREE.Vector3(roomWidth, roomHeight, wallThickness)
        });
        
        // East wall
        const eastWallGeometry = new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth);
        const eastWall = new THREE.Mesh(eastWallGeometry, wallMaterial);
        eastWall.position.set(roomWidth / 2, roomHeight / 2, 0);
        eastWall.castShadow = true;
        eastWall.receiveShadow = true;
        this.scene.add(eastWall);
        
        this.collisionGeometry.push({
            position: eastWall.position.clone(),
            size: new THREE.Vector3(wallThickness, roomHeight, roomDepth)
        });
        
        // West wall
        const westWallGeometry = new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth);
        const westWall = new THREE.Mesh(westWallGeometry, wallMaterial);
        westWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
        westWall.castShadow = true;
        westWall.receiveShadow = true;
        this.scene.add(westWall);
        
        this.collisionGeometry.push({
            position: westWall.position.clone(),
            size: new THREE.Vector3(wallThickness, roomHeight, roomDepth)
        });
        
        this.addTestProps();
        this.addLoreNotes();
    }
    
    addTestProps() {
        // Simple table in center of room
        const tableMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3d2f1f,
            roughness: 0.7
        });
        
        // Table top
        const tableTopGeometry = new THREE.BoxGeometry(2, 0.1, 1);
        const tableTop = new THREE.Mesh(tableTopGeometry, tableMaterial);
        tableTop.position.set(0, 0.8, 0);
        tableTop.castShadow = true;
        tableTop.receiveShadow = true;
        this.scene.add(tableTop);
        
        // Table legs
        const legGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.1);
        const positions = [
            [-0.9, 0.4, -0.4],
            [0.9, 0.4, -0.4],
            [-0.9, 0.4, 0.4],
            [0.9, 0.4, 0.4]
        ];
        
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, tableMaterial);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.castShadow = true;
            this.scene.add(leg);
        });
    }
    
    addLoreNotes() {
        // Create 4 lore notes with ATC educational content
        const notePositions = [
            { x: -4, y: 1.2, z: 4 },   // Northwest corner
            { x: 4, y: 1.2, z: 4 },    // Northeast corner
            { x: -4, y: 1.2, z: -4 },  // Southwest corner
            { x: 4, y: 1.2, z: -4 }    // Southeast corner
        ];
        
        const noteData = [
            LORE_NOTES.NOTE_1,
            LORE_NOTES.NOTE_2,
            LORE_NOTES.NOTE_3,
            LORE_NOTES.NOTE_4
        ];
        
        notePositions.forEach((pos, index) => {
            this.createLoreNote(pos, noteData[index]);
        });
    }
    
    createLoreNote(position, data) {
        // Create glowing paper mesh
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
        
        // Add point light for glow effect
        const light = new THREE.PointLight(CONSTANTS.LORE_NOTE_GLOW_COLOR, CONSTANTS.LORE_NOTE_GLOW_INTENSITY, 2);
        light.position.copy(mesh.position);
        this.scene.add(light);
        
        // Store light reference for removal later
        mesh.userData.light = light;
        
        this.scene.add(mesh);
        
        // Create interactable
        const interactable = new InteractableObject(mesh, 'lore_note', data);
        this.interactables.push(interactable);
    }
    
    getCollisionGeometry() {
        return this.collisionGeometry;
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
        this.player = null;
        this.levelBuilder = null;
        this.flashlightSystem = null;
        this.interactionSystem = null;
        this.clock = new THREE.Clock();
        
        // Pointer lock state
        this.isPointerLocked = false;
        
        // Visual effects state
        this.damageFlashAlpha = 0;
        
        // Lore text state
        this.loreTextTimeout = null;
        
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
        this.setupLevel();
        this.setupPlayer();
        this.setupFlashlight();
        this.setupInteractions();
        this.setupPointerLock();
        this.setupGameKeys();
        this.setupTestKeys();
        this.showTestInfo();
        this.animate();
    }
    
    setupThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0b0f);
        this.scene.fog = new THREE.Fog(0x0a0b0f, 5, 30);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            CONSTANTS.CAMERA_FOV,
            window.innerWidth / window.innerHeight,
            CONSTANTS.CAMERA_NEAR,
            CONSTANTS.CAMERA_FAR
        );
        this.camera.rotation.order = 'YXZ';
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        
        // Lighting (dim ambient - darkness causes sanity drain)
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -15;
        directionalLight.shadow.camera.right = 15;
        directionalLight.shadow.camera.top = 15;
        directionalLight.shadow.camera.bottom = -15;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupLevel() {
        this.levelBuilder = new LevelBuilder(this.scene);
        this.levelBuilder.buildTestRoom();
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
                    // Toggle flashlight
                    this.state.toggleFlashlight();
                    break;
                    
                case 'KeyE':
                    // Interact
                    this.interactionSystem.interact(this);
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
        // Clear existing timeout
        if (this.loreTextTimeout) {
            clearTimeout(this.loreTextTimeout);
        }
        
        // Update log box with lore text
        this.dom.logBox.innerHTML = `<strong>${title}</strong><br>${text}`;
        this.dom.logBox.style.opacity = '1';
        
        // Fade out after duration
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
        // Update flashlight system
        this.flashlightSystem.update(this.state.flashlightOn);
        
        // Drain battery when flashlight is on
        if (this.state.flashlightOn && this.state.battery > 0) {
            const drainAmount = CONSTANTS.BATTERY_DRAIN_RATE * deltaTime;
            this.state.drainBattery(drainAmount);
        }
    }
    
    updateSanityDrain(deltaTime) {
        // Drain sanity in darkness (when flashlight is off)
        if (!this.state.flashlightOn) {
            const drainAmount = CONSTANTS.SANITY_DRAIN_DARKNESS * deltaTime;
            this.state.drainSanity(drainAmount);
        }
    }
    
    updateInteractions() {
        // Check for interactable objects
        const hasTarget = this.interactionSystem.update();
        
        // Show/hide interact prompt
        if (hasTarget) {
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
        
        // Update flashlight status color
        if (this.state.flashlightOn) {
            this.dom.flashlightStatus.style.color = '#ffff00';
        } else {
            this.dom.flashlightStatus.style.color = '#fff';
        }
        
        // Update dragon info
        if (this.state.dragon) {
            this.dom.dragonInfo.style.display = 'block';
            
            const trustPercent = this.state.dragonTrust;
            this.dom.dragonTrustBar.querySelector('.bar-fill').style.width = trustPercent + '%';
            
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
        // Update player controller
        if (this.isPointerLocked && this.player) {
            this.player.update(deltaTime, this.levelBuilder.getCollisionGeometry());
        }
        
        // Update flashlight system
        this.updateFlashlight(deltaTime);
        
        // Update sanity drain from darkness
        this.updateSanityDrain(deltaTime);
        
        // Update interaction system
        this.updateInteractions();
        
        // Update visual effects
        this.updateDamageFlash(deltaTime);
        
        // Update HUD
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