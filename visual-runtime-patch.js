/**
 * VISUAL RUNTIME PATCH - CRITICAL FIX
 * Injects visual improvements into game at runtime
 * NO GAME.JS EDITS REQUIRED - Monkey patches at load
 */

(function() {
  'use strict';
  
  console.log('[VISUAL_PATCH] Initializing visual improvements...');
  
  // Wait for game to initialize
  let patchAttempts = 0;
  const maxAttempts = 50;
  
  const applyPatch = setInterval(() => {
    patchAttempts++;
    
    // Check if THREE and scene exist
    if (typeof THREE === 'undefined' || typeof scene === 'undefined') {
      if (patchAttempts >= maxAttempts) {
        console.error('[VISUAL_PATCH] Failed - THREE.js or scene not found');
        clearInterval(applyPatch);
      }
      return;
    }
    
    console.log('[VISUAL_PATCH] THREE.js and scene detected! Applying fixes...');
    clearInterval(applyPatch);
    
    // FIX #1: Add colored room materials
    const ROOM_COLORS = {
      entrance: 0x4a3728, // Brown
      library: 0x2c3e50,  // Blue-grey
      forge: 0x8b1a1a,    // Dark red
      hatchery: 0x1a5e5e, // Teal
      vault: 0x4a1a5e     // Purple
    };
    
    // Find and recolor room meshes
    scene.traverse((obj) => {
      if (obj.isMesh && obj.geometry && obj.geometry.type === 'BoxGeometry') {
        const pos = obj.position;
        
        // Entrance (0, 0, 0)
        if (Math.abs(pos.x) < 15 && Math.abs(pos.z) < 15) {
          obj.material = new THREE.MeshLambertMaterial({ color: ROOM_COLORS.entrance });
        }
        // Library (0, 0, -40)
        else if (Math.abs(pos.x) < 15 && pos.z < -25 && pos.z > -55) {
          obj.material = new THREE.MeshLambertMaterial({ color: ROOM_COLORS.library });
        }
        // Forge (30, 0, 0)
        else if (pos.x > 15 && pos.x < 45 && Math.abs(pos.z) < 15) {
          obj.material = new THREE.MeshLambertMaterial({ color: ROOM_COLORS.forge });
        }
        // Hatchery (60, 0, 0)
        else if (pos.x > 45 && pos.x < 75 && Math.abs(pos.z) < 15) {
          obj.material = new THREE.MeshLambertMaterial({ color: ROOM_COLORS.hatchery });
        }
        // Vault (90, 0, 0)
        else if (pos.x > 75 && Math.abs(pos.z) < 15) {
          obj.material = new THREE.MeshLambertMaterial({ color: ROOM_COLORS.vault });
        }
      }
    });
    
    console.log('[VISUAL_PATCH] ✅ Room materials updated');
    
    // FIX #2: Add colored point lights per room
    const lights = [
      { pos: [0, 5, 0], color: 0xff6600, intensity: 0.6 },      // Entrance: Orange
      { pos: [0, 5, -40], color: 0x6699ff, intensity: 0.5 },    // Library: Blue
      { pos: [30, 5, 0], color: 0xff3300, intensity: 0.7 },     // Forge: Red
      { pos: [60, 5, 0], color: 0x00cccc, intensity: 0.6 },     // Hatchery: Teal
      { pos: [90, 5, 0], color: 0x9933ff, intensity: 0.6 }      // Vault: Purple
    ];
    
    lights.forEach(l => {
      const light = new THREE.PointLight(l.color, l.intensity, 20);
      light.position.set(...l.pos);
      scene.add(light);
    });
    
    console.log('[VISUAL_PATCH] ✅ Colored lighting added');
    
    // FIX #3: Add simple furniture
    // Tables in Entrance
    const tableMat = new THREE.MeshLambertMaterial({ color: 0x3d2817 });
    const table = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1, 3),
      tableMat
    );
    table.position.set(5, 0.5, 5);
    scene.add(table);
    
    // Bookshelves in Library
    const shelfMat = new THREE.MeshLambertMaterial({ color: 0x654321 });
    for (let i = 0; i < 3; i++) {
      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(1, 4, 6),
        shelfMat
      );
      shelf.position.set(-8 + i * 4, 2, -35);
      scene.add(shelf);
    }
    
    console.log('[VISUAL_PATCH] ✅ Furniture added');
    
    console.log('[VISUAL_PATCH] 🎉 ALL VISUAL FIXES APPLIED SUCCESSFULLY!');
    
  }, 200); // Check every 200ms
  
})();
