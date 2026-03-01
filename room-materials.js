// ============================================================================
// ROOM MATERIALS MODULE - Themed wall/floor/ceiling materials per zone
// ============================================================================

/**
 * Room keys aligned with the 5-zone architecture.
 */
const ROOM_KEYS = Object.freeze({
    ENTRANCE: 'ENTRANCE',
    LIBRARY: 'LIBRARY',
    FORGE: 'FORGE',
    HATCHERY: 'HATCHERY',
    VAULT: 'VAULT'
});

/**
 * Color themes (hex) for each zone.
 * These are pure data constants; material instances are created by createRoomMaterials().
 */
const ROOM_THEME_COLORS = Object.freeze({
    [ROOM_KEYS.ENTRANCE]: {
        wall: 0x3a2a1a,
        floor: 0x2a1a0a,
        ceiling: 0x1a120a,
        trim: 0x4a3a2a
    },
    [ROOM_KEYS.LIBRARY]: {
        wall: 0x1a2a3a,
        floor: 0x2a2a2a,
        ceiling: 0x121820,
        trim: 0x2a3a4a
    },
    [ROOM_KEYS.FORGE]: {
        wall: 0x3a1a1a,
        floor: 0x1a1a1a,
        ceiling: 0x120a0a,
        trim: 0x4a2a2a,
        emissive: 0x220000,
        emissiveIntensity: 0.12
    },
    [ROOM_KEYS.HATCHERY]: {
        wall: 0x1a3a2a,
        floor: 0x2a3a2a,
        ceiling: 0x0e1a14,
        trim: 0x2a4a3a
    },
    [ROOM_KEYS.VAULT]: {
        wall: 0x2a1a3a,
        floor: 0x1a1a2a,
        ceiling: 0x100a1a,
        trim: 0x3a2a4a,
        emissive: 0x110022,
        emissiveIntensity: 0.18
    }
});

/**
 * Creates MeshStandardMaterial sets for each room.
 * @returns {Object<string, {wall: THREE.Material, floor: THREE.Material, ceiling: THREE.Material, trim: THREE.Material}>}
 */
function createRoomMaterials() {
    if (typeof THREE === 'undefined') {
        console.error('[ROOM_MATERIALS] THREE not found. Ensure three.js is loaded before room-materials.js');
        return {};
    }

    /**
     * Material helper to avoid repeated boilerplate.
     */
    const makeStandard = (opts) => new THREE.MeshStandardMaterial({
        color: opts.color,
        roughness: opts.roughness,
        metalness: opts.metalness,
        emissive: opts.emissive,
        emissiveIntensity: opts.emissiveIntensity
    });

    const materials = {};

    Object.keys(ROOM_THEME_COLORS).forEach((key) => {
        const c = ROOM_THEME_COLORS[key];

        const wall = makeStandard({
            color: c.wall,
            roughness: 0.88,
            metalness: 0.05,
            emissive: c.emissive || 0x000000,
            emissiveIntensity: c.emissiveIntensity || 0.0
        });

        const floor = makeStandard({
            color: c.floor,
            roughness: 0.92,
            metalness: key === ROOM_KEYS.FORGE ? 0.25 : 0.08,
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });

        const ceiling = makeStandard({
            color: c.ceiling,
            roughness: 0.95,
            metalness: 0.02,
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });

        const trim = makeStandard({
            color: c.trim,
            roughness: 0.8,
            metalness: 0.1,
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });

        materials[key] = { wall, floor, ceiling, trim };
    });

    return materials;
}

/**
 * Gets a safe materials set for a room key.
 * @param {Object} materials - return value from createRoomMaterials()
 * @param {string} roomKey - one of ROOM_KEYS
 */
function getRoomMaterialSet(materials, roomKey) {
    if (!materials || typeof materials !== 'object') {
        console.warn('[ROOM_MATERIALS] materials missing; returning empty');
        return null;
    }

    if (materials[roomKey]) return materials[roomKey];

    console.warn(`[ROOM_MATERIALS] Unknown roomKey: ${roomKey}. Falling back to ENTRANCE.`);
    return materials[ROOM_KEYS.ENTRANCE] || null;
}

/**
 * Disposes all materials created by createRoomMaterials().
 * Call this only if you rebuild the entire level and want to free GPU memory.
 */
function disposeRoomMaterials(materials) {
    if (!materials || typeof materials !== 'object') return;

    Object.keys(materials).forEach((k) => {
        const set = materials[k];
        if (!set) return;
        ['wall', 'floor', 'ceiling', 'trim'].forEach((part) => {
            const mat = set[part];
            if (mat && typeof mat.dispose === 'function') mat.dispose();
        });
    });
}
