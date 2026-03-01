# VISUAL SYSTEMS INTEGRATION INSTRUCTIONS

## ✅ COMPLETED STEPS
1. ✅ `room-materials.js` created
2. ✅ `visual-systems.js` created
3. ✅ `visual-integration.js` created
4. ✅ `index.html` updated with all script tags in correct order

## 🔧 MANUAL STEPS REQUIRED

You need to add **3 small code snippets** to `game.js` to activate the visual systems.

---

### **SNIPPET 1: Call `initVisualSystems()` in `init()` function**

**Location**: Inside the `init()` function, **AFTER** `createLevel()` is called.

**Find this code** (around line 200-300):
```javascript
function init() {
    // ... existing code ...
    createLevel();
    // ... existing code ...
}
```

**Add these 2 lines AFTER `createLevel()`:**
```javascript
    createLevel();
    
    // VISUAL SYSTEMS INTEGRATION
    initVisualSystems(scene);
```

---

### **SNIPPET 2: Call `updateVisualSystems()` in `animate()` loop**

**Location**: Inside the `animate()` function, **AFTER** `delta` is calculated.

**Find this code** (near the end of game.js):
```javascript
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    // ... existing game loop code ...
}
```

**Add this line AFTER `const delta = clock.getDelta();`:**
```javascript
    const delta = clock.getDelta();
    
    // VISUAL SYSTEMS ANIMATION
    updateVisualSystems(delta);
    
    // ... rest of game loop ...
```

---

### **SNIPPET 3: Call `createDoorFramesForDoors()` AFTER doors are created**

**Location**: Inside `createLevel()` function, **AFTER** the `DOORS` array is populated.

**Find this code** (inside `createLevel()` function):
```javascript
function createLevel() {
    // ... room creation code ...
    
    // DOORS array population
    DOORS = [
        { name: 'entranceToLibrary', position: new THREE.Vector3(10, 0, 0), locked: false, rotation: Math.PI/2 },
        { name: 'libraryToForge', position: new THREE.Vector3(28, 0, 0), locked: false, rotation: Math.PI/2 },
        { name: 'forgeToHatchery', position: new THREE.Vector3(35, 0, -9), locked: true, rotation: 0 },
        { name: 'hatcheryToVault', position: new THREE.Vector3(35, 0, -23), locked: true, rotation: 0 }
    ];
    
    // ... more level code ...
}
```

**Add these 2 lines AFTER the `DOORS = [...]` assignment:**
```javascript
    ];
    
    // VISUAL SYSTEMS: Create door frames
    createDoorFramesForDoors(scene, DOORS);
```

---

## 🎯 EXPECTED RESULT AFTER INTEGRATION

Once these 3 snippets are added to `game.js`:

1. ✅ Each room will have **themed colors** (Entrance=brown, Library=blue, Forge=red, Hatchery=teal, Vault=purple)
2. ✅ Doors will have **visible wooden frames** with **lock indicator lights** (red=locked, green=unlocked)
3. ✅ Furniture will appear:
   - Tables in Entrance + Library
   - Bookshelves in Library (with books)
   - Anvil + Workbench in Forge
   - Chains in Hatchery
   - 6 Ritual pillars in Vault
4. ✅ Colored lights per room:
   - Entrance: Warm orange torchlight
   - Library: Cool blue reading lights
   - Forge: Flickering red-orange (animated)
   - Hatchery: Teal mystical glow
   - Vault: Purple pulsing ritual light (animated)

---

## 🧪 TESTING

1. Save `game.js` after adding the 3 snippets
2. Open browser at `localhost:8000`
3. Start game and pointer-lock
4. Expected behavior:
   - Room walls/floors have distinct colors
   - Door frames visible at each door
   - Furniture props visible in correct rooms
   - Forge light flickers
   - Vault light pulses

---

## 🐛 TROUBLESHOOTING

**If nothing visual changes:**
1. Open browser console (F12)
2. Look for `[VISUAL_INTEGRATION]` log messages
3. Check for JavaScript errors
4. Verify all 3 script tags are in `index.html` before `game.js`

**If console shows "function not found" warnings:**
- Clear browser cache (Ctrl+Shift+R)
- Verify script load order in `index.html`

**If door frames appear but materials don't change:**
- Check that `initVisualSystems(scene)` is called AFTER `createLevel()`
- Verify `scene` variable is accessible in that scope

---

## 📋 VERIFICATION CHECKLIST

- [ ] `initVisualSystems(scene)` called in `init()` after `createLevel()`
- [ ] `updateVisualSystems(delta)` called in `animate()` loop
- [ ] `createDoorFramesForDoors(scene, DOORS)` called after DOORS array populated
- [ ] Browser console shows no JavaScript errors
- [ ] Rooms have distinct colored materials
- [ ] Door frames visible with lock lights
- [ ] Furniture visible in correct positions
- [ ] Forge light flickers, Vault light pulses

---

## 🚀 NEXT STEPS AFTER INTEGRATION

Once visual systems are working, proceed to **TURN GAP-1D: Final Testing & Documentation**.
