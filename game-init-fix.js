/**
 * GAME INITIALIZATION FIX
 * Forces START button to work by ensuring event listener is attached
 * This runs AFTER game.js to fix any initialization issues
 */

(function() {
    'use strict';
    
    console.log('[INIT_FIX] Loading game initialization fix...');
    
    // Wait for DOM to be fully loaded
    function initGameStart() {
        const btn = document.getElementById('startGameBtn');
        
        if (!btn) {
            console.error('[INIT_FIX] START button not found in DOM!');
            return;
        }
        
        console.log('[INIT_FIX] START button found, attaching click handler...');
        
        // Remove any existing listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add our own click handler
        newBtn.addEventListener('click', function() {
            console.log('[INIT_FIX] START button clicked!');
            
            // Hide start screen
            const startScreen = document.getElementById('startScreen');
            if (startScreen) {
                startScreen.style.display = 'none';
                console.log('[INIT_FIX] Start screen hidden');
            }
            
            // Try to call game's start function if it exists
            if (typeof window.startGame === 'function') {
                console.log('[INIT_FIX] Calling window.startGame()');
                window.startGame();
            } else if (typeof window.initGame === 'function') {
                console.log('[INIT_FIX] Calling window.initGame()');
                window.initGame();
            } else {
                console.log('[INIT_FIX] No global start function found, game should auto-start');
            }
            
            // Request pointer lock for FPS controls
            document.body.requestPointerLock = document.body.requestPointerLock ||
                                               document.body.mozRequestPointerLock ||
                                               document.body.webkitRequestPointerLock;
            if (document.body.requestPointerLock) {
                document.body.requestPointerLock();
                console.log('[INIT_FIX] Pointer lock requested');
            }
        });
        
        console.log('[INIT_FIX] Click handler attached successfully!');
        
        // Make button more visible for debugging
        newBtn.style.cursor = 'pointer';
        newBtn.style.pointerEvents = 'auto';
    }
    
    // Try multiple initialization methods to ensure it works
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGameStart);
    } else {
        // DOM already loaded
        initGameStart();
    }
    
    // Also try after a delay as fallback
    setTimeout(initGameStart, 500);
    setTimeout(initGameStart, 1000);
    
    console.log('[INIT_FIX] Initialization fix loaded');
})();
