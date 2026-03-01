// ============================================================================
// GAME.JS VISUAL SYSTEMS RUNTIME PATCH
// ============================================================================
// This script monkey-patches game.js functions to integrate visual systems
// without modifying the original 2800-line file directly.
// Load AFTER game.js in index.html.

(function() {
    'use strict';
    
    console.log('[VISUAL_PATCH] Initializing runtime patches...');
    
    // ========================================================================
    // PATCH 1: Wrap init() to call initVisualSystems after createLevel
    // ========================================================================
    if (typeof window.init === 'function') {
        const originalInit = window.init;
        window.init = function() {
            console.log('[VISUAL_PATCH] Calling original init()');
            originalInit.call(this);
            
            // After original init completes, initialize visual systems
            if (typeof window.initVisualSystems === 'function') {
                console.log('[VISUAL_PATCH] Calling initVisualSystems(scene)');
                try {
                    window.initVisualSystems(window.scene);
                    console.log('[VISUAL_PATCH] ✅ Visual systems initialized successfully');
                } catch (error) {
                    console.error('[VISUAL_PATCH] ❌ Failed to initialize visual systems:', error);
                }
            } else {
                console.warn('[VISUAL_PATCH] ⚠️ initVisualSystems not found - visual modules may not be loaded');
            }
        };
        console.log('[VISUAL_PATCH] ✅ Patched init() function');
    } else {
        console.error('[VISUAL_PATCH] ❌ window.init function not found');
    }
    
    // ========================================================================
    // PATCH 2: Wrap animate() to call updateVisualSystems every frame
    // ========================================================================
    if (typeof window.animate === 'function') {
        const originalAnimate = window.animate;
        window.animate = function() {
            // Call update at start of frame (before original logic)
            if (typeof window.updateVisualSystems === 'function') {
                try {
                    // Calculate delta for visual systems
                    const now = performance.now();
                    if (!window._lastVisualUpdateTime) {
                        window._lastVisualUpdateTime = now;
                    }
                    const visualDelta = (now - window._lastVisualUpdateTime) / 1000;
                    window._lastVisualUpdateTime = now;
                    
                    window.updateVisualSystems(visualDelta);
                } catch (error) {
                    console.error('[VISUAL_PATCH] Error in updateVisualSystems:', error);
                }
            }
            
            // Call original animate
            originalAnimate.call(this);
        };
        console.log('[VISUAL_PATCH] ✅ Patched animate() function');
    } else {
        console.error('[VISUAL_PATCH] ❌ window.animate function not found');
    }
    
    // ========================================================================
    // PATCH 3: Hook into createLevel() to add door frames
    // ========================================================================
    if (typeof window.createLevel === 'function') {
        const originalCreateLevel = window.createLevel;
        window.createLevel = function() {
            console.log('[VISUAL_PATCH] Calling original createLevel()');
            originalCreateLevel.call(this);
            
            // After level created, add door frames
            if (typeof window.createDoorFramesForDoors === 'function') {
                console.log('[VISUAL_PATCH] Adding door frames...');
                try {
                    // Define door array matching game.js positions
                    const doorArray = [
                        { 
                            name: 'entranceToLibrary', 
                            position: new THREE.Vector3(10, 0, 0), 
                            locked: false, 
                            rotation: Math.PI/2 
                        },
                        { 
                            name: 'libraryToForge', 
                            position: new THREE.Vector3(27, 0, 0), 
                            locked: false, 
                            rotation: Math.PI/2 
                        },
                        { 
                            name: 'forgeToHatchery', 
                            position: new THREE.Vector3(35, 0, -7.5), 
                            locked: true, 
                            rotation: 0 
                        },
                        { 
                            name: 'hatcheryToVault', 
                            position: new THREE.Vector3(35, 0, -22.5), 
                            locked: true, 
                            rotation: 0 
                        }
                    ];
                    
                    window.createDoorFramesForDoors(window.scene, doorArray);
                    console.log('[VISUAL_PATCH] ✅ Door frames created');
                } catch (error) {
                    console.error('[VISUAL_PATCH] ❌ Failed to create door frames:', error);
                }
            } else {
                console.warn('[VISUAL_PATCH] ⚠️ createDoorFramesForDoors not found');
            }
        };
        console.log('[VISUAL_PATCH] ✅ Patched createLevel() function');
    } else {
        console.error('[VISUAL_PATCH] ❌ window.createLevel function not found');
    }
    
    // ========================================================================
    // HELPER: Expose unlock door function for game logic
    // ========================================================================
    window.visuallyUnlockDoorByName = function(doorName) {
        if (typeof window.visuallyUnlockDoor === 'function') {
            console.log(`[VISUAL_PATCH] Unlocking door: ${doorName}`);
            window.visuallyUnlockDoor(doorName);
        }
    };
    
    console.log('[VISUAL_PATCH] ✅ All patches applied successfully');
    console.log('[VISUAL_PATCH] Waiting for game initialization...');
})();
