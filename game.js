// ============================================================================
// ATC HORROR ECONOMICS GAME - TURN 2: PLAYER CONTROLLER + BASIC LEVEL
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
        // Simple AABB collision check against room bounds and walls
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
// LEVEL BUILDER
// ============================================================================
class LevelBuilder {
    constructor(scene) {
        this.scene = scene;
        this.collisionGeometry = [];
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
        
        // Collision data for floor
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
        
        // North wall (positive Z)
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
        
        // South wall (negative Z)
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
        
        // East wall (positive X)
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
        
        // West wall (negative X)
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
        
        // Add some visual props (table in center)
        this.addTestProps();
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
        this.setupLevel();
        this.setupPlayer();
        this.setupPointerLock();
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
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
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
        
        // Mouse move handler for camera rotation
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
        // Update player controller
        if (this.isPointerLocked && this.player) {
            this.player.update(deltaTime, this.levelBuilder.getCollisionGeometry());
        }
        
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