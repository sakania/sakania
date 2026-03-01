# VISUAL SYSTEMS PATCH - EXACT SEARCH/REPLACE

Since `game.js` is 2800+ lines, use these **exact search/replace operations** in your code editor.

---

## PATCH 1: Init Visual Systems

### Search for:
```javascript
    createLevel();
    createEggPedestals();
```

### Replace with:
```javascript
    createLevel();
    createEggPedestals();
    
    // VISUAL SYSTEMS INTEGRATION
    if (typeof initVisualSystems === 'function') {
        initVisualSystems(scene);
    } else {
        console.warn('[GAME] initVisualSystems not found - visual modules may not be loaded');
    }
```

---

## PATCH 2: Animate Visual Systems

### Search for:
```javascript
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
```

### Replace with:
```javascript
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    // VISUAL SYSTEMS ANIMATION
    if (typeof updateVisualSystems === 'function') {
        updateVisualSystems(delta);
    }
```

---

## PATCH 3: Create Door Frames

### Search for:
```javascript
    // Hatchery door (locked initially)
    const forgeToHatcheryDoor = {
        position: new THREE.Vector3(35, 0, -7.5),
        width: 2.5,
        locked: true,
        name: 'forgeToHatchery'
    };
    
    // Vault door (locked initially)
    const hatcheryToVaultDoor = {
        position: new THREE.Vector3(35, 0, -22.5),
        width: 2.5,
        locked: true,
        name: 'hatcheryToVault'
    };
```

### Replace with:
```javascript
    // Hatchery door (locked initially)
    const forgeToHatcheryDoor = {
        position: new THREE.Vector3(35, 0, -7.5),
        width: 2.5,
        locked: true,
        name: 'forgeToHatchery'
    };
    
    // Vault door (locked initially)
    const hatcheryToVaultDoor = {
        position: new THREE.Vector3(35, 0, -22.5),
        width: 2.5,
        locked: true,
        name: 'hatcheryToVault'
    };
    
    // VISUAL SYSTEMS: Create door frames
    if (typeof createDoorFramesForDoors === 'function') {
        const doorArray = [
            { name: 'entranceToLibrary', position: { x: 10, z: 0 }, locked: false, rotation: Math.PI/2 },
            { name: 'libraryToForge', position: { x: 27, z: 0 }, locked: false, rotation: Math.PI/2 },
            { name: 'forgeToHatchery', position: { x: 35, z: -7.5 }, locked: true, rotation: 0 },
            { name: 'hatcheryToVault', position: { x: 35, z: -22.5 }, locked: true, rotation: 0 }
        ];
        createDoorFramesForDoors(scene, doorArray);
    }
```

---

## VERIFICATION

After applying all 3 patches:

1. **No syntax errors** - Check browser console
2. **Visual systems log** - Should see `[VISUAL_INTEGRATION]` messages
3. **Furniture appears** - Tables, bookshelves, anvil, chains, pillars
4. **Door frames visible** - Wooden frames with red lock lights
5. **Room lights active** - Forge flickers, Vault pulses
6. **Themed materials** - Rooms have distinct colors

---

## ALTERNATIVE: Manual Line Numbers

If search/replace fails, add at these approximate locations:

1. **Line ~180-200**: After `createLevel(); createEggPedestals();` in `init()`
2. **Line ~2700-2750**: After `const delta = clock.getDelta();` in `animate()`
3. **Line ~400-500**: After vault door definition in `createLevel()`

---

## TROUBLESHOOTING

**If functions not found:**
- Check `index.html` has all 3 script tags before `game.js`
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for load errors

**If visual effects don't appear:**
- Verify `initVisualSystems(scene)` is called AFTER `createLevel()`
- Check console for `[VISUAL_INTEGRATION]` success messages
- Verify `scene` variable is accessible at patch locations
