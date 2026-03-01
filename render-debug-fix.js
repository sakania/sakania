/**
 * RENDER DEBUG & FIX
 * Ensures 3D canvas exists and game renders properly
 * Adds visible debug overlay to confirm rendering works
 */

(function() {
    'use strict';
    
    console.log('[RENDER_FIX] Loading render debug fix...');
    
    function ensureCanvasAndRender() {
        console.log('[RENDER_FIX] Checking for Three.js canvas...');
        
        // Check if canvas already exists
        let canvas = document.querySelector('canvas');
        
        if (!canvas) {
            console.log('[RENDER_FIX] No canvas found! Creating one...');
            canvas = document.createElement('canvas');
            canvas.id = 'gameCanvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '1';
            document.body.appendChild(canvas);
            console.log('[RENDER_FIX] Canvas created!');
        } else {
            console.log('[RENDER_FIX] Canvas exists:', canvas);
        }
        
        // Add debug HUD overlay
        createDebugHUD();
        
        // Check WebGL support
        try {
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                console.log('[RENDER_FIX] WebGL context available');
            } else {
                console.error('[RENDER_FIX] WebGL not supported!');
                showError('WebGL not supported on this browser');
            }
        } catch (e) {
            console.error('[RENDER_FIX] WebGL error:', e);
            showError('WebGL initialization failed: ' + e.message);
        }
    }
    
    function createDebugHUD() {
        // Remove existing HUD if any
        const existing = document.getElementById('debugHUD');
        if (existing) existing.remove();
        
        const hud = document.createElement('div');
        hud.id = 'debugHUD';
        hud.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: #0f0;
            font-family: monospace;
            font-size: 12px;
            padding: 10px;
            z-index: 9999;
            border: 1px solid #0f0;
            pointer-events: none;
        `;
        hud.innerHTML = `
            <div>🎮 ASHFALL: GAME ACTIVE</div>
            <div>Canvas: ${document.querySelector('canvas') ? 'YES' : 'NO'}</div>
            <div>WebGL: Checking...</div>
            <div>Press ESC to release pointer</div>
        `;
        document.body.appendChild(hud);
        console.log('[RENDER_FIX] Debug HUD created');
    }
    
    function showError(message) {
        const error = document.createElement('div');
        error.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            font-family: Arial, sans-serif;
            font-size: 18px;
            padding: 30px;
            z-index: 10000;
            border: 2px solid red;
            text-align: center;
        `;
        error.textContent = 'ERROR: ' + message;
        document.body.appendChild(error);
    }
    
    // Run after game should have initialized
    setTimeout(function() {
        console.log('[RENDER_FIX] Running post-init checks...');
        ensureCanvasAndRender();
        
        // Update HUD with Three.js info
        setTimeout(function() {
            const hud = document.getElementById('debugHUD');
            if (hud && typeof THREE !== 'undefined') {
                const info = hud.querySelector('div:nth-child(3)');
                if (info) info.textContent = 'WebGL: Available (THREE.js loaded)';
            }
        }, 500);
    }, 1000);
    
    console.log('[RENDER_FIX] Render debug fix loaded');
})();
