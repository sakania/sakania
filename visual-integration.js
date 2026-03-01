// ============================================================================
// VISUAL INTEGRATION PATCH
// Connects room-materials.js + visual-systems.js to existing game.js
// ============================================================================

/**
 * Global storage for room materials and lights.
 * Will be initialized by initVisualSystems() called from game.js init.
 */
window.VISUAL_SYSTEMS = {
    roomMaterials: null,
    roomLights: null,
    animationTime: 0
};

/**
 * Initializes visual systems - call this ONCE in game.js init().
 * @param {THREE.Scene} scene - Main Three.js scene
 */
function initVisualSystems(scene) {
    if (!scene || !scene.isScene) {
        console.error('[VISUAL_INTEGRATION] Invalid scene provided');
        return;
    }

    console.log('[VISUAL_INTEGRATION] Initializing visual systems...');

    // Create room materials
    if (typeof createRoomMaterials === 'function') {
        window.VISUAL_SYSTEMS.roomMaterials = createRoomMaterials();
        console.log('[VISUAL_INTEGRATION] Room materials created');
    } else {
        console.warn('[VISUAL_INTEGRATION] createRoomMaterials() not found');
    }

    // Add furniture
    if (typeof addFurniture === 'function') {
        addFurniture(scene);
        console.log('[VISUAL_INTEGRATION] Furniture added');
    } else {
        console.warn('[VISUAL_INTEGRATION] addFurniture() not found');
    }

    // Add room lights
    if (typeof addRoomLights === 'function') {
        window.VISUAL_SYSTEMS.roomLights = addRoomLights(scene);
        console.log('[VISUAL_INTEGRATION] Room lights added');
    } else {
        console.warn('[VISUAL_INTEGRATION] addRoomLights() not found');
    }

    console.log('[VISUAL_INTEGRATION] Visual systems initialized successfully');
}

/**
 * Updates animated lights - call this in game loop (animate function).
 * @param {number} deltaTime - Time since last frame
 */
function updateVisualSystems(deltaTime) {
    if (!window.VISUAL_SYSTEMS.roomLights) return;

    window.VISUAL_SYSTEMS.animationTime += deltaTime;

    if (typeof animateRoomLights === 'function') {
        animateRoomLights(window.VISUAL_SYSTEMS.roomLights, window.VISUAL_SYSTEMS.animationTime);
    }
}

/**
 * Applies themed materials to a room mesh.
 * Call this when creating room geometry in createLevel().
 * 
 * @param {THREE.Mesh} wallMesh - Wall mesh to apply material
 * @param {THREE.Mesh} floorMesh - Floor mesh to apply material
 * @param {THREE.Mesh} ceilingMesh - Ceiling mesh to apply material
 * @param {string} roomKey - One of: 'ENTRANCE', 'LIBRARY', 'FORGE', 'HATCHERY', 'VAULT'
 */
function applyRoomMaterials(wallMesh, floorMesh, ceilingMesh, roomKey) {
    if (!window.VISUAL_SYSTEMS.roomMaterials) {
        console.warn('[VISUAL_INTEGRATION] Room materials not initialized');
        return;
    }

    if (typeof getRoomMaterialSet !== 'function') {
        console.warn('[VISUAL_INTEGRATION] getRoomMaterialSet() not found');
        return;
    }

    const materials = getRoomMaterialSet(window.VISUAL_SYSTEMS.roomMaterials, roomKey);
    if (!materials) {
        console.warn(`[VISUAL_INTEGRATION] No materials found for room: ${roomKey}`);
        return;
    }

    if (wallMesh && wallMesh.isMesh) {
        wallMesh.material = materials.wall;
        console.log(`[VISUAL_INTEGRATION] Applied ${roomKey} wall material`);
    }

    if (floorMesh && floorMesh.isMesh) {
        floorMesh.material = materials.floor;
        console.log(`[VISUAL_INTEGRATION] Applied ${roomKey} floor material`);
    }

    if (ceilingMesh && ceilingMesh.isMesh) {
        ceilingMesh.material = materials.ceiling;
        console.log(`[VISUAL_INTEGRATION] Applied ${roomKey} ceiling material`);
    }
}

/**
 * Creates door frames for existing door positions.
 * Call this after DOORS array is populated in game.js.
 * 
 * @param {THREE.Scene} scene - Main scene
 * @param {Array} doorsArray - DOORS array from game.js
 */
function createDoorFramesForDoors(scene, doorsArray) {
    if (!scene || !doorsArray || !Array.isArray(doorsArray)) {
        console.warn('[VISUAL_INTEGRATION] Invalid scene or doors array');
        return;
    }

    if (typeof createDoorFrame !== 'function') {
        console.warn('[VISUAL_INTEGRATION] createDoorFrame() not found');
        return;
    }

    console.log(`[VISUAL_INTEGRATION] Creating door frames for ${doorsArray.length} doors...`);

    doorsArray.forEach((door, index) => {
        if (!door || !door.position) {
            console.warn(`[VISUAL_INTEGRATION] Door ${index} missing position`);
            return;
        }

        const doorName = door.name || `door_${index}`;
        const isLocked = door.locked !== undefined ? door.locked : true;

        const doorFrame = createDoorFrame(
            door.position.x,
            door.position.z,
            door.rotation || 0,
            isLocked,
            doorName
        );

        scene.add(doorFrame);
        console.log(`[VISUAL_INTEGRATION] Added door frame: ${doorName} (locked: ${isLocked})`);
    });
}

/**
 * Helper to unlock a door visually.
 * Call this when a door is unlocked in game logic.
 * 
 * @param {THREE.Scene} scene - Main scene
 * @param {string} doorName - Name of door to unlock
 */
function visuallyUnlockDoor(scene, doorName) {
    if (typeof unlockDoor === 'function') {
        unlockDoor(scene, doorName);
        console.log(`[VISUAL_INTEGRATION] Door ${doorName} visually unlocked`);
    } else {
        console.warn('[VISUAL_INTEGRATION] unlockDoor() not found');
    }
}

console.log('[VISUAL_INTEGRATION] Integration patch loaded');
