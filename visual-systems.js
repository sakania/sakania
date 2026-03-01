// ============================================================================
// VISUAL SYSTEMS MODULE - Door frames, furniture, and room lighting
// ============================================================================

/**
 * Creates a visible door frame with lock indicator
 * @param {number} x - X position
 * @param {number} z - Z position
 * @param {number} rotation - Y-axis rotation in radians
 * @param {boolean} isLocked - Whether door is currently locked
 * @param {string} doorName - Unique name for this door
 * @returns {THREE.Group} Door frame group
 */
function createDoorFrame(x, z, rotation, isLocked, doorName) {
    const doorGroup = new THREE.Group();
    doorGroup.name = doorName;
    
    // Wood material for frame
    const frameMat = new THREE.MeshStandardMaterial({ 
        color: 0x4a3a2a,
        roughness: 0.8,
        metalness: 0.1
    });
    
    // Left post
    const postGeo = new THREE.BoxGeometry(0.2, 3, 0.2);
    const leftPost = new THREE.Mesh(postGeo, frameMat);
    leftPost.position.set(-1.35, 1.5, 0);
    leftPost.castShadow = true;
    doorGroup.add(leftPost);
    
    // Right post
    const rightPost = new THREE.Mesh(postGeo, frameMat);
    rightPost.position.set(1.35, 1.5, 0);
    rightPost.castShadow = true;
    doorGroup.add(rightPost);
    
    // Top beam
    const beamGeo = new THREE.BoxGeometry(2.9, 0.3, 0.2);
    const topBeam = new THREE.Mesh(beamGeo, frameMat);
    topBeam.position.set(0, 3, 0);
    topBeam.castShadow = true;
    doorGroup.add(topBeam);
    
    // Door panel (only if locked)
    if (isLocked) {
        const doorPanelMat = new THREE.MeshStandardMaterial({ 
            color: 0x2a1a1a,
            roughness: 0.6,
            metalness: 0.2
        });
        const doorPanel = new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 3, 0.15),
            doorPanelMat
        );
        doorPanel.position.set(0, 1.5, 0);
        doorPanel.name = 'doorPanel';
        doorPanel.castShadow = true;
        doorGroup.add(doorPanel);
        
        // Red lock indicator light
        const lockLight = new THREE.PointLight(0xff0000, 0.5, 3);
        lockLight.position.set(1, 1.5, 0.5);
        lockLight.name = 'lockIndicator';
        doorGroup.add(lockLight);
    }
    
    doorGroup.position.set(x, 0, z);
    doorGroup.rotation.y = rotation;
    
    return doorGroup;
}

/**
 * Unlocks a door by removing panel and changing lock light to green
 * @param {THREE.Scene} scene - Three.js scene
 * @param {string} doorName - Name of door to unlock
 */
function unlockDoor(scene, doorName) {
    const doorGroup = scene.getObjectByName(doorName);
    if (!doorGroup) {
        console.warn(`Door ${doorName} not found in scene`);
        return;
    }
    
    // Remove door panel
    const panel = doorGroup.getObjectByName('doorPanel');
    if (panel) {
        doorGroup.remove(panel);
    }
    
    // Remove red lock light
    const lockLight = doorGroup.getObjectByName('lockIndicator');
    if (lockLight) {
        doorGroup.remove(lockLight);
    }
    
    // Add green unlock light
    const unlockLight = new THREE.PointLight(0x00ff00, 0.3, 3);
    unlockLight.position.set(1, 1.5, 0.5);
    unlockLight.name = 'unlockIndicator';
    doorGroup.add(unlockLight);
    
    console.log(`[VISUAL] Door ${doorName} unlocked`);
}

/**
 * Creates a simple table with 4 legs
 * @param {number} color - Hex color for wood
 * @returns {THREE.Group} Table group
 */
function createTable(color) {
    const group = new THREE.Group();
    
    const woodMat = new THREE.MeshStandardMaterial({ 
        color: color,
        roughness: 0.7 
    });
    
    // Tabletop
    const topGeo = new THREE.BoxGeometry(2, 0.1, 1.2);
    const top = new THREE.Mesh(topGeo, woodMat);
    top.position.y = 0.8;
    top.castShadow = true;
    top.receiveShadow = true;
    group.add(top);
    
    // 4 legs
    const legGeo = new THREE.BoxGeometry(0.08, 0.8, 0.08);
    const legMat = new THREE.MeshStandardMaterial({ 
        color: color - 0x111111,
        roughness: 0.8 
    });
    
    const legPositions = [
        [-0.9, -0.5], [0.9, -0.5],
        [-0.9, 0.5], [0.9, 0.5]
    ];
    
    legPositions.forEach(([x, z]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, 0.4, z);
        leg.castShadow = true;
        group.add(leg);
    });
    
    return group;
}

/**
 * Creates a bookshelf with 4 levels and books
 * @returns {THREE.Group} Bookshelf group
 */
function createBookshelf() {
    const group = new THREE.Group();
    
    const shelfMat = new THREE.MeshStandardMaterial({ 
        color: 0x3a2a1a,
        roughness: 0.8 
    });
    
    // Back panel
    const backGeo = new THREE.BoxGeometry(2, 3, 0.1);
    const back = new THREE.Mesh(backGeo, shelfMat);
    back.position.set(0, 1.5, 0.45);
    back.castShadow = true;
    back.receiveShadow = true;
    group.add(back);
    
    // 4 shelf levels
    for (let i = 0; i < 4; i++) {
        const shelfGeo = new THREE.BoxGeometry(2, 0.05, 0.5);
        const shelf = new THREE.Mesh(shelfGeo, shelfMat);
        shelf.position.set(0, 0.2 + i * 0.8, 0.25);
        shelf.castShadow = true;
        shelf.receiveShadow = true;
        group.add(shelf);
        
        // Add 5 books per shelf
        for (let j = 0; j < 5; j++) {
            const bookColor = Math.random() > 0.5 ? 0x4a1a1a : 0x1a1a4a;
            const bookMat = new THREE.MeshStandardMaterial({ 
                color: bookColor,
                roughness: 0.9 
            });
            
            const bookGeo = new THREE.BoxGeometry(0.15, 0.25, 0.35);
            const book = new THREE.Mesh(bookGeo, bookMat);
            book.position.set(
                -0.8 + j * 0.4,
                0.35 + i * 0.8,
                0.25
            );
            book.rotation.y = (Math.random() - 0.5) * 0.2;
            book.castShadow = true;
            group.add(book);
        }
    }
    
    return group;
}

/**
 * Creates forge anvil prop
 * @returns {THREE.Group} Anvil group
 */
function createAnvil() {
    const group = new THREE.Group();
    
    const metalMat = new THREE.MeshStandardMaterial({ 
        color: 0x3a3a3a,
        roughness: 0.4,
        metalness: 0.8 
    });
    
    // Base
    const baseGeo = new THREE.BoxGeometry(0.8, 0.3, 0.8);
    const base = new THREE.Mesh(baseGeo, metalMat);
    base.position.y = 0.15;
    base.castShadow = true;
    group.add(base);
    
    // Body
    const bodyGeo = new THREE.BoxGeometry(0.5, 0.4, 0.6);
    const body = new THREE.Mesh(bodyGeo, metalMat);
    body.position.y = 0.5;
    body.castShadow = true;
    group.add(body);
    
    // Horn
    const hornGeo = new THREE.ConeGeometry(0.15, 0.3, 4);
    const horn = new THREE.Mesh(hornGeo, metalMat);
    horn.position.set(0.3, 0.85, 0);
    horn.rotation.z = Math.PI / 2;
    horn.castShadow = true;
    group.add(horn);
    
    return group;
}

/**
 * Creates workbench with tools
 * @returns {THREE.Group} Workbench group
 */
function createWorkbench() {
    const group = new THREE.Group();
    
    const woodMat = new THREE.MeshStandardMaterial({ 
        color: 0x3a2a1a,
        roughness: 0.8 
    });
    
    // Top surface
    const topGeo = new THREE.BoxGeometry(3, 0.1, 1.5);
    const top = new THREE.Mesh(topGeo, woodMat);
    top.position.y = 0.9;
    top.castShadow = true;
    top.receiveShadow = true;
    group.add(top);
    
    // 4 legs
    const legGeo = new THREE.BoxGeometry(0.1, 0.9, 0.1);
    const legPositions = [
        [-1.3, -0.6], [1.3, -0.6],
        [-1.3, 0.6], [1.3, 0.6]
    ];
    
    legPositions.forEach(([x, z]) => {
        const leg = new THREE.Mesh(legGeo, woodMat);
        leg.position.set(x, 0.45, z);
        leg.castShadow = true;
        group.add(leg);
    });
    
    // Tool on bench (hammer)
    const hammerMat = new THREE.MeshStandardMaterial({ 
        color: 0x4a3a2a,
        roughness: 0.7 
    });
    const hammerGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.6);
    const hammer = new THREE.Mesh(hammerGeo, hammerMat);
    hammer.position.set(-0.5, 1.0, 0.3);
    hammer.rotation.z = Math.PI / 4;
    hammer.castShadow = true;
    group.add(hammer);
    
    return group;
}

/**
 * Creates hanging chain decoration
 * @returns {THREE.Group} Chain group
 */
function createChain() {
    const group = new THREE.Group();
    
    const chainMat = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        roughness: 0.6,
        metalness: 0.5 
    });
    
    // 8 chain links
    for (let i = 0; i < 8; i++) {
        const linkGeo = new THREE.TorusGeometry(0.08, 0.02, 8, 12);
        const link = new THREE.Mesh(linkGeo, chainMat);
        link.position.y = -i * 0.15;
        link.rotation.x = i % 2 === 0 ? 0 : Math.PI / 2;
        link.castShadow = true;
        group.add(link);
    }
    
    return group;
}

/**
 * Creates ritual pillar with glowing rune
 * @returns {THREE.Group} Pillar group
 */
function createPillar() {
    const group = new THREE.Group();
    
    const stoneMat = new THREE.MeshStandardMaterial({ 
        color: 0x3a2a4a,
        roughness: 0.9,
        emissive: 0x110022,
        emissiveIntensity: 0.2
    });
    
    // Base
    const baseGeo = new THREE.CylinderGeometry(0.4, 0.5, 0.3, 8);
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 0.15;
    base.castShadow = true;
    group.add(base);
    
    // Column
    const columnGeo = new THREE.CylinderGeometry(0.3, 0.3, 2.5, 8);
    const column = new THREE.Mesh(columnGeo, stoneMat);
    column.position.y = 1.5;
    column.castShadow = true;
    group.add(column);
    
    // Top
    const topGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.3, 8);
    const top = new THREE.Mesh(topGeo, stoneMat);
    top.position.y = 2.85;
    top.castShadow = true;
    group.add(top);
    
    // Glowing rune
    const runeMat = new THREE.MeshBasicMaterial({ 
        color: 0x9966ff,
        transparent: true,
        opacity: 0.6 
    });
    const runeGeo = new THREE.CircleGeometry(0.15, 16);
    const rune = new THREE.Mesh(runeGeo, runeMat);
    rune.position.set(0.31, 1.5, 0);
    rune.rotation.y = Math.PI / 2;
    group.add(rune);
    
    return group;
}

/**
 * Adds all furniture to scene in correct positions
 * @param {THREE.Scene} scene - Three.js scene
 */
function addFurniture(scene) {
    console.log('[VISUAL] Adding furniture to rooms...');
    
    // ENTRANCE: Welcome table
    const entranceTable = createTable(0x4a3a2a);
    entranceTable.position.set(-3, 0, 2);
    scene.add(entranceTable);
    
    // LIBRARY: 3 Bookshelves
    for (let i = 0; i < 3; i++) {
        const shelf = createBookshelf();
        shelf.position.set(17 + i * 2.5, 0, -4);
        scene.add(shelf);
    }
    
    // LIBRARY: Reading table
    const libTable = createTable(0x3a2a1a);
    libTable.position.set(20, 0, 3);
    scene.add(libTable);
    
    // FORGE: Anvil
    const anvil = createAnvil();
    anvil.position.set(35, 0.5, 2);
    scene.add(anvil);
    
    // FORGE: Workbench
    const workbench = createWorkbench();
    workbench.position.set(32, 0, -3);
    scene.add(workbench);
    
    // HATCHERY: Decorative chains
    const chain1 = createChain();
    chain1.position.set(33, 3, -15);
    scene.add(chain1);
    
    const chain2 = createChain();
    chain2.position.set(37, 3, -15);
    scene.add(chain2);
    
    // VAULT: Ritual pillars (6 in circle)
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
        const pillar = createPillar();
        const radius = 4;
        pillar.position.set(
            35 + Math.cos(angle) * radius,
            0,
            -30 + Math.sin(angle) * radius
        );
        scene.add(pillar);
    }
    
    console.log('[VISUAL] Furniture added successfully');
}

/**
 * Adds colored lighting to each room with effects
 * @param {THREE.Scene} scene - Three.js scene
 * @returns {Object} Object containing light references for animation
 */
function addRoomLights(scene) {
    console.log('[VISUAL] Adding room lighting...');
    
    const lights = {};
    
    // ENTRANCE: Warm torchlight
    const entranceLight = new THREE.PointLight(0xffaa44, 1.2, 15);
    entranceLight.position.set(0, 3, 0);
    entranceLight.castShadow = true;
    scene.add(entranceLight);
    lights.entrance = entranceLight;
    
    // LIBRARY: Cool blue reading lights (2x)
    const libLight1 = new THREE.PointLight(0x6688ff, 0.8, 12);
    libLight1.position.set(17, 3, 0);
    libLight1.castShadow = true;
    scene.add(libLight1);
    
    const libLight2 = new THREE.PointLight(0x6688ff, 0.8, 12);
    libLight2.position.set(23, 3, 0);
    libLight2.castShadow = true;
    scene.add(libLight2);
    lights.library1 = libLight1;
    lights.library2 = libLight2;
    
    // FORGE: Red-orange forge glow (flickering)
    const forgeLight = new THREE.PointLight(0xff4400, 1.5, 14);
    forgeLight.position.set(35, 2, 0);
    forgeLight.castShadow = true;
    scene.add(forgeLight);
    lights.forge = forgeLight;
    
    // HATCHERY: Teal mystical glow
    const hatcheryLight = new THREE.PointLight(0x00ffaa, 1.0, 13);
    hatcheryLight.position.set(35, 3, -15);
    hatcheryLight.castShadow = true;
    scene.add(hatcheryLight);
    lights.hatchery = hatcheryLight;
    
    // VAULT: Purple ritual glow (pulsing)
    const vaultLight = new THREE.PointLight(0x9966ff, 1.3, 15);
    vaultLight.position.set(35, 2.5, -30);
    vaultLight.castShadow = true;
    scene.add(vaultLight);
    lights.vault = vaultLight;
    
    console.log('[VISUAL] Room lighting added successfully');
    
    return lights;
}

/**
 * Animates forge flickering and vault pulsing lights
 * @param {Object} lights - Light references from addRoomLights
 * @param {number} time - Current time in seconds
 */
function animateRoomLights(lights, time) {
    // Forge flickering (fast random)
    if (lights.forge) {
        lights.forge.intensity = 1.3 + Math.random() * 0.4;
    }
    
    // Vault pulsing (smooth sine wave)
    if (lights.vault) {
        lights.vault.intensity = 1.1 + Math.sin(time * 2) * 0.3;
    }
}
