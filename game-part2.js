// ============================================================================
// ATC HORROR ECONOMICS GAME - TURN 10a: AUDIO SYSTEM (PART 2)
// ============================================================================
// This file contains the remaining classes with audio integration hooks.
// Merge this with game.js part 1 for the complete system.

// ============================================================================
// INTERACTABLE OBJECT (TURN 10a: audio hooks for lore notes)
// ============================================================================
class InteractableObject {
    constructor(type, mesh, data, audio = null) {
        this.type = type;
        this.mesh = mesh;
        this.data = data;
        this.audio = audio; // TURN 10a
        this.collected = false;
    }
    
    interact(gameState) {
        if (this.collected) {
            return null;
        }
        
        this.collected = true;
        
        // TURN 10a: Audio feedback for lore notes
        if (this.type === 'LORE_NOTE' && this.audio) {
            this.audio.uiChime(true);
        }
        
        // Hide the object
        this.mesh.visible = false;
        
        return {
            type: this.type,
            data: this.data
        };
    }
}

// ============================================================================
// INTERACTION SYSTEM (TURN 10a: audio feedback)
// ============================================================================
class InteractionSystem {
    constructor(playerController, gameManager) {
        this.playerController = playerController;
        this.gameManager = gameManager;
        this.interactables = [];
        this.currentTarget = null;
        this.raycaster = new THREE.Raycaster();
        
        this.setupKeyBindings();
    }
    
    setupKeyBindings() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'e' || e.key === 'E') {
                this.tryInteract();
            }
        });
    }
    
    addInteractable(interactable) {
        this.interactables.push(interactable);
    }
    
    update() {
        this.currentTarget = null;
        
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
        
        this.updateUI();
    }
    
    updateUI() {
        const prompt = document.getElementById('interactionPrompt');
        
        if (this.currentTarget) {
            let promptText = UI_TEXT.PRESS_E_INTERACT;
            
            if (this.currentTarget.type === 'FORGE_ALTAR') {
                promptText = UI_TEXT.PRESS_E_FORGE;
            } else if (this.currentTarget.type === 'DRAGON_EGG') {
                promptText = UI_TEXT.PRESS_E_EGG;
            } else if (this.currentTarget.type === 'VAULT_RITUAL') {
                promptText = UI_TEXT.PRESS_E_RITUAL;
            }
            
            prompt.textContent = promptText;
            prompt.classList.remove('hidden');
        } else {
            prompt.classList.add('hidden');
        }
    }
    
    tryInteract() {
        if (!this.currentTarget) return;
        
        const result = this.currentTarget.interact(this.gameManager.state);
        
        if (!result) return;
        
        // TURN 10a: Audio feedback
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
        
        // TURN 10a: Audio feedback
        if (this.gameManager.audio) {
            this.gameManager.audio.uiChime(true);
        }
        
        console.log(`Battery restored: +${CONSTANTS.BATTERY_RESTORE_PICKUP}`);
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
// PLAYER CONTROLLER (TURN 10a: footstep audio + breathing intensity)
// ============================================================================
class PlayerController {
    constructor(camera, audio = null) {
        this.camera = camera;
        this.audio = audio; // TURN 10a
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

        // TURN 10a: Footstep timing
        this._footstepTimer = 0;
        
        this.setupControls();
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
            this.position.add(moveVector);

            // TURN 10a: Footstep audio
            this.updateFootstepAudio(deltaTime);
        } else {
            this._footstepTimer = 0; // Reset when not moving
        }
        
        this.camera.position.copy(this.position);
        this.camera.quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
    }

    // TURN 10a: Footstep audio timing
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
// FLASHLIGHT SYSTEM (unchanged)
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
// LEVEL BUILDER (unchanged)
// ============================================================================
class LevelBuilder {
    constructor(scene, interactionSystem, audio = null) {
        this.scene = scene;
        this.interactionSystem = interactionSystem;
        this.audio = audio; // TURN 10a (passed to interactables)
    }
    
    buildLevel() {
        this.createEntrance();
        this.createLibrary();
        this.createForge();
        this.createHatchery();
        this.createVault();
        this.createLights();
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
        
        const wallNorth = this.createWall(width, wallHeight, CONSTANTS.WALL_THICKNESS);
        wallNorth.position.set(x, wallHeight / 2, z - depth / 2);
        this.scene.add(wallNorth);
        
        const wallSouth = this.createWall(width, wallHeight, CONSTANTS.WALL_THICKNESS);
        wallSouth.position.set(x, wallHeight / 2, z + depth / 2);
        this.scene.add(wallSouth);
        
        const wallWest = this.createWall(CONSTANTS.WALL_THICKNESS, wallHeight, depth);
        wallWest.position.set(x - width / 2, wallHeight / 2, z);
        this.scene.add(wallWest);
        
        const wallEast = this.createWall(CONSTANTS.WALL_THICKNESS, wallHeight, depth);
        wallEast.position.set(x + width / 2, wallHeight / 2, z);
        this.scene.add(wallEast);
        
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
        });
    }
}

// ============================================================================
// GAME MANAGER (TURN 10a: Full audio integration)
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

        // TURN 10a: Audio manager
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
        // TURN 10a: Pass audio to PlayerController
        this.player = new PlayerController(this.camera, this.audio);
    }
    
    setupFlashlight() {
        this.flashlight = new FlashlightSystem(this.camera, this.scene);
    }
    
    setupInteractionSystem() {
        this.interactionSystem = new InteractionSystem(this.player, this);
    }
    
    setupLevel() {
        // TURN 10a: Pass audio to LevelBuilder
        this.levelBuilder = new LevelBuilder(this.scene, this.interactionSystem, this.audio);
        this.levelBuilder.buildLevel();
    }
    
    setupMonster() {
        // TURN 10a: Pass audio to MonsterAI
        this.monsterAI = new MonsterAI(this.scene, this.player, this.audio);
    }
    
    setupModals() {
        this.forgePuzzle = new ForgePuzzle(this);
        this.dragonChoiceModal = new DragonChoiceModal(this);
        this.vaultRitualModal = new VaultRitualModal(this);
    }
    
    setupUI() {
        this.updateUI();
        
        const tutorialText = document.getElementById('tutorialText');
        tutorialText.textContent = UI_TEXT.TUTORIAL_TEXT;
        
        const testKeysInfo = document.getElementById('testKeysInfo');
        testKeysInfo.textContent = UI_TEXT.TEST_KEYS_INFO;
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
            // TURN 10a: Unlock audio context on first user interaction
            this.audio.unlock();
            
            startScreen.classList.add('hidden');
            document.body.requestPointerLock();
            this.startGame();
        });
    }
    
    startGame() {
        console.log('Game started');

        // TURN 10a: Start ambience
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

        // TURN 10a: Update hallucination audio based on sanity
        this.audio.updateHallucinations(this.state);

        // TURN 10a: Update breathing intensity based on health/sanity
        const breathingIntensity = 1.0 - (this.state.health / CONSTANTS.PLAYER_HEALTH_MAX) * 0.5
            + (1.0 - this.state.sanity / CONSTANTS.PLAYER_SANITY_MAX) * 0.5;
        this.audio.playerBreathingIntensity(breathingIntensity);
        
        this.updateUI();
        this.renderer.render(this.scene, this.camera);
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
            document.getElementById('dragonTrustValue').textContent = Math.floor(this.state.dragonTrust);
            document.getElementById('abilityUsesValue').textContent = this.state.dragonAbilityUses;
        } else {
            dragonUI.classList.add('hidden');
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
