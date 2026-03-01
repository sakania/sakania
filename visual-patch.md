# Visual Improvements Required

## Issues Identified
1. **No visible doors** - Players can't see door frames
2. **Dull coloring** - All rooms look the same (grey)
3. **No furniture** - Empty rooms feel lifeless
4. **Poor lighting** - Dark and monotone

## Required Changes to game.js

### 1. Door Visuals (Add to createLevel function)

```javascript
// Add visible door frames
function createDoorFrame(x, z, rotation, isLocked) {
    const doorGroup = new THREE.Group();
    
    // Door frame (always visible)
    const frameGeo = new THREE.BoxGeometry(0.2, 3, 2.5);
    const frameMat = new THREE.MeshStandardMaterial({ 
        color: 0x4a3a2a,
        roughness: 0.8 
    });
    
    const leftPost = new THREE.Mesh(frameGeo, frameMat);
    leftPost.position.set(-1.35, 1.5, 0);
    doorGroup.add(leftPost);
    
    const rightPost = leftPost.clone();
    rightPost.position.set(1.35, 1.5, 0);
    doorGroup.add(rightPost);
    
    const topBeam = new THREE.Mesh(
        new THREE.BoxGeometry(2.9, 0.3, 0.2),
        frameMat
    );
    topBeam.position.set(0, 3, 0);
    doorGroup.add(topBeam);
    
    // Door panel (visible when locked)
    if (isLocked) {
        const doorPanel = new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 3, 0.15),
            new THREE.MeshStandardMaterial({ 
                color: 0x2a1a1a,
                roughness: 0.6,
                metalness: 0.2
            })
        );
        doorPanel.position.set(0, 1.5, 0);
        doorPanel.name = 'doorPanel';
        doorGroup.add(doorPanel);
        
        // Lock indicator (red glow)
        const lockLight = new THREE.PointLight(0xff0000, 0.5, 3);
        lockLight.position.set(1, 1.5, 0.5);
        lockLight.name = 'lockIndicator';
        doorGroup.add(lockLight);
    }
    
    doorGroup.position.set(x, 0, z);
    doorGroup.rotation.y = rotation;
    return doorGroup;
}
```

### 2. Colored Room Materials

```javascript
// Replace grey materials with themed colors
const ROOM_MATERIALS = {
    ENTRANCE: {
        wall: new THREE.MeshStandardMaterial({ 
            color: 0x3a2a1a, // Dark brown
            roughness: 0.9 
        }),
        floor: new THREE.MeshStandardMaterial({ 
            color: 0x2a1a0a, // Darker wood
            roughness: 0.8 
        })
    },
    LIBRARY: {
        wall: new THREE.MeshStandardMaterial({ 
            color: 0x1a2a3a, // Dark blue-grey
            roughness: 0.85 
        }),
        floor: new THREE.MeshStandardMaterial({ 
            color: 0x2a2a2a,
            roughness: 0.7 
        })
    },
    FORGE: {
        wall: new THREE.MeshStandardMaterial({ 
            color: 0x3a1a1a, // Dark red
            roughness: 0.7,
            emissive: 0x220000,
            emissiveIntensity: 0.1
        }),
        floor: new THREE.MeshStandardMaterial({ 
            color: 0x1a1a1a,
            roughness: 0.9,
            metalness: 0.3
        })
    },
    HATCHERY: {
        wall: new THREE.MeshStandardMaterial({ 
            color: 0x1a3a2a, // Dark teal
            roughness: 0.8 
        }),
        floor: new THREE.MeshStandardMaterial({ 
            color: 0x2a3a2a,
            roughness: 0.85 
        })
    },
    VAULT: {
        wall: new THREE.MeshStandardMaterial({ 
            color: 0x2a1a3a, // Dark purple
            roughness: 0.7,
            emissive: 0x110022,
            emissiveIntensity: 0.15
        }),
        floor: new THREE.MeshStandardMaterial({ 
            color: 0x1a1a2a,
            roughness: 0.8 
        })
    }
};
```

### 3. Furniture Creation Functions

```javascript
// Add to scene after level creation
function addFurniture(scene) {
    // ENTRANCE: Welcome table
    const entranceTable = createTable(0x4a3a2a);
    entranceTable.position.set(-3, 0, 2);
    scene.add(entranceTable);
    
    // LIBRARY: Bookshelves
    for (let i = 0; i < 3; i++) {
        const shelf = createBookshelf();
        shelf.position.set(17 + i * 2.5, 0, -4);
        scene.add(shelf);
    }
    
    // LIBRARY: Reading table
    const libTable = createTable(0x3a2a1a);
    libTable.position.set(20, 0, 3);
    scene.add(libTable);
    
    // FORGE: Anvil prop
    const anvil = createAnvil();
    anvil.position.set(35, 0.5, 2);
    scene.add(anvil);
    
    // FORGE: Workbench
    const workbench = createWorkbench();
    workbench.position.set(32, 0, -3);
    scene.add(workbench);
    
    // HATCHERY: Pedestals (already exists for eggs)
    // Add decorative chains
    const chain1 = createChain();
    chain1.position.set(33, 3, -15);
    scene.add(chain1);
    
    // VAULT: Ritual pillars
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
}

function createTable(color) {
    const group = new THREE.Group();
    
    // Tabletop
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.1, 1.2),
        new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
    );
    top.position.y = 0.8;
    group.add(top);
    
    // Legs
    const legGeo = new THREE.BoxGeometry(0.08, 0.8, 0.08);
    const legMat = new THREE.MeshStandardMaterial({ color: color - 0x111111, roughness: 0.8 });
    
    for (let x = -0.9; x <= 0.9; x += 1.8) {
        for (let z = -0.5; z <= 0.5; z += 1.0) {
            const leg = new THREE.Mesh(legGeo, legMat);
            leg.position.set(x, 0.4, z);
            group.add(leg);
        }
    }
    
    return group;
}

function createBookshelf() {
    const group = new THREE.Group();
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.8 });
    
    // Back panel
    const back = new THREE.Mesh(
        new THREE.BoxGeometry(2, 3, 0.1),
        shelfMat
    );
    back.position.set(0, 1.5, 0.45);
    group.add(back);
    
    // Shelves (4 levels)
    for (let i = 0; i < 4; i++) {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.05, 0.5),
            shelfMat
        );
        shelf.position.set(0, 0.2 + i * 0.8, 0.25);
        group.add(shelf);
        
        // Books on shelf
        for (let j = 0; j < 5; j++) {
            const book = new THREE.Mesh(
                new THREE.BoxGeometry(0.15, 0.25, 0.35),
                new THREE.MeshStandardMaterial({ 
                    color: Math.random() > 0.5 ? 0x4a1a1a : 0x1a1a4a,
                    roughness: 0.9 
                })
            );
            book.position.set(
                -0.8 + j * 0.4,
                0.35 + i * 0.8,
                0.25
            );
            book.rotation.y = (Math.random() - 0.5) * 0.2;
            group.add(book);
        }
    }
    
    return group;
}

function createAnvil() {
    const group = new THREE.Group();
    const metalMat = new THREE.MeshStandardMaterial({ 
        color: 0x3a3a3a,
        roughness: 0.4,
        metalness: 0.8 
    });
    
    // Base
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.3, 0.8),
        metalMat
    );
    base.position.y = 0.15;
    group.add(base);
    
    // Body
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.4, 0.6),
        metalMat
    );
    body.position.y = 0.5;
    group.add(body);
    
    // Horn
    const horn = new THREE.Mesh(
        new THREE.ConeGeometry(0.15, 0.3, 4),
        metalMat
    );
    horn.position.set(0.3, 0.85, 0);
    horn.rotation.z = Math.PI / 2;
    group.add(horn);
    
    return group;
}

function createWorkbench() {
    const group = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.8 });
    
    // Top surface
    const top = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.1, 1.5),
        woodMat
    );
    top.position.y = 0.9;
    group.add(top);
    
    // Legs
    for (let x = -1.3; x <= 1.3; x += 2.6) {
        for (let z = -0.6; z <= 0.6; z += 1.2) {
            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.1, 0.9, 0.1),
                woodMat
            );
            leg.position.set(x, 0.45, z);
            group.add(leg);
        }
    }
    
    // Tools on bench
    const hammer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.6),
        new THREE.MeshStandardMaterial({ color: 0x4a3a2a, roughness: 0.7 })
    );
    hammer.position.set(-0.5, 1.0, 0.3);
    hammer.rotation.z = Math.PI / 4;
    group.add(hammer);
    
    return group;
}

function createChain() {
    const group = new THREE.Group();
    const chainMat = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        roughness: 0.6,
        metalness: 0.5 
    });
    
    for (let i = 0; i < 8; i++) {
        const link = new THREE.Mesh(
            new THREE.TorusGeometry(0.08, 0.02, 8, 12),
            chainMat
        );
        link.position.y = -i * 0.15;
        link.rotation.x = i % 2 === 0 ? 0 : Math.PI / 2;
        group.add(link);
    }
    
    return group;
}

function createPillar() {
    const group = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ 
        color: 0x3a2a4a,
        roughness: 0.9,
        emissive: 0x110022,
        emissiveIntensity: 0.2
    });
    
    // Base
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.5, 0.3, 8),
        stoneMat
    );
    base.position.y = 0.15;
    group.add(base);
    
    // Column
    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 2.5, 8),
        stoneMat
    );
    column.position.y = 1.5;
    group.add(column);
    
    // Top
    const top = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.3, 0.3, 8),
        stoneMat
    );
    top.position.y = 2.85;
    group.add(top);
    
    // Glowing rune on pillar
    const rune = new THREE.Mesh(
        new THREE.CircleGeometry(0.15, 16),
        new THREE.MeshBasicMaterial({ 
            color: 0x9966ff,
            transparent: true,
            opacity: 0.6 
        })
    );
    rune.position.set(0.31, 1.5, 0);
    rune.rotation.y = Math.PI / 2;
    group.add(rune);
    
    return group;
}
```

### 4. Enhanced Lighting

```javascript
// Add to init() function after creating level
function addRoomLights(scene) {
    // ENTRANCE: Warm torchlight
    const entranceLight = new THREE.PointLight(0xffaa44, 1.2, 15);
    entranceLight.position.set(0, 3, 0);
    scene.add(entranceLight);
    
    // LIBRARY: Cool blue reading lights
    const libLight1 = new THREE.PointLight(0x6688ff, 0.8, 12);
    libLight1.position.set(17, 3, 0);
    scene.add(libLight1);
    
    const libLight2 = libLight1.clone();
    libLight2.position.set(23, 3, 0);
    scene.add(libLight2);
    
    // FORGE: Red-orange forge glow
    const forgeLight = new THREE.PointLight(0xff4400, 1.5, 14);
    forgeLight.position.set(35, 2, 0);
    scene.add(forgeLight);
    
    // Flickering forge effect
    setInterval(() => {
        if (forgeLight.visible) {
            forgeLight.intensity = 1.3 + Math.random() * 0.4;
        }
    }, 120);
    
    // HATCHERY: Teal mystical glow
    const hatcheryLight = new THREE.PointLight(0x00ffaa, 1.0, 13);
    hatcheryLight.position.set(35, 3, -15);
    scene.add(hatcheryLight);
    
    // VAULT: Purple ritual glow
    const vaultLight = new THREE.PointLight(0x9966ff, 1.3, 15);
    vaultLight.position.set(35, 2.5, -30);
    scene.add(vaultLight);
    
    // Pulsing vault effect
    let vaultPulse = 0;
    setInterval(() => {
        if (vaultLight.visible) {
            vaultPulse += 0.05;
            vaultLight.intensity = 1.1 + Math.sin(vaultPulse) * 0.3;
        }
    }, 50);
}
```

### 5. Implementation Steps

1. **Find `createLevel()` function** in game.js
2. **Replace grey materials** with `ROOM_MATERIALS[roomName].wall` and `.floor`
3. **Add door creation** after each room's walls
4. **Call `addFurniture(scene)`** after level is built
5. **Call `addRoomLights(scene)`** after furniture
6. **Update door unlock logic** to remove red light and door panel:

```javascript
function unlockDoor(doorName) {
    const doorGroup = scene.getObjectByName(doorName);
    if (doorGroup) {
        const panel = doorGroup.getObjectByName('doorPanel');
        const lockLight = doorGroup.getObjectByName('lockIndicator');
        
        if (panel) doorGroup.remove(panel);
        if (lockLight) doorGroup.remove(lockLight);
        
        // Add green unlock light
        const unlockLight = new THREE.PointLight(0x00ff00, 0.3, 3);
        unlockLight.position.set(1, 1.5, 0.5);
        doorGroup.add(unlockLight);
    }
}
```

## Result
- ✅ Visible door frames with lock indicators (red = locked, green = unlocked)
- ✅ Each room has distinct color theme (brown, blue, red, teal, purple)
- ✅ Furniture: tables, bookshelves, anvil, workbench, chains, pillars
- ✅ Colored point lights per room with effects (flickering forge, pulsing vault)
- ✅ Better atmosphere and visual navigation
