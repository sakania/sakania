const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const healthFill = document.querySelector('#healthBar i');
const sanityFill = document.querySelector('#sanityBar i');
const meta = document.getElementById('meta');
const panel = document.getElementById('panel');
const logEl = document.getElementById('log');

const titleMenu = document.getElementById('titleMenu');
const mainMenuButtons = document.getElementById('mainMenuButtons');
const otherMenuButtons = document.getElementById('otherMenuButtons');
const howPanel = document.getElementById('howPanel');
const settingsPanel = document.getElementById('settingsPanel');
const menuNotice = document.getElementById('menuNotice');
const volumeSlider = document.getElementById('volumeSlider');
const muteToggle = document.getElementById('muteToggle');

const tile = 24;
const world = { w: 40, h: 24 };
const keys = new Set();

const state = {
  paused: true,
  over: false,
  time: 0,
  dawnTimer: 180,
  finale: false,
  clues: 0,
  forgeSolved: false,
  hatcheryUnlocked: false,
  dragon: null,
  dragonTrust: 50,
  truthFound: false,
  ritualDone: false,
  sanityZeroDuringFinale: false,
  player: { x: 3, y: 3, hp: 100, sanity: 100, ammo: 2, speed: 3.5 },
  monster: { x: 30, y: 15, state: 'Roam', stun: 0, aggro: 0 },
  libraryClues: [{ x: 10, y: 5, taken: false }, { x: 13, y: 8, taken: false }, { x: 16, y: 6, taken: false }],
  fakeDoors: [{ x: 22, y: 17 }, { x: 25, y: 17 }],
  sound: { started: false, muted: false, volume: 0.45 },
};

const zones = {
  entrance: { x: 1, y: 1, w: 8, h: 8, dark: false },
  library: { x: 8, y: 2, w: 12, h: 10, dark: true },
  forge: { x: 20, y: 4, w: 9, h: 9, dark: true },
  hatchery: { x: 28, y: 5, w: 10, h: 10, dark: true },
  vault: { x: 24, y: 15, w: 14, h: 8, dark: true },
};

let audioCtx;
let ambienceGain;
let ambienceOsc;

function startHorrorSound() {
  if (state.sound.started) return;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  ambienceGain = audioCtx.createGain();
  ambienceGain.gain.value = state.sound.volume;
  ambienceGain.connect(audioCtx.destination);

  ambienceOsc = audioCtx.createOscillator();
  ambienceOsc.type = 'sawtooth';
  ambienceOsc.frequency.value = 47;

  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = 0.19;
  lfoGain.gain.value = 8;
  lfo.connect(lfoGain);
  lfoGain.connect(ambienceOsc.frequency);

  ambienceOsc.connect(ambienceGain);
  ambienceOsc.start();
  lfo.start();
  state.sound.started = true;
}

function updateVolume(value) {
  state.sound.volume = value / 100;
  if (ambienceGain) {
    ambienceGain.gain.value = state.sound.muted ? 0 : state.sound.volume;
  }
}

function toggleMute() {
  state.sound.muted = !state.sound.muted;
  muteToggle.textContent = `Mute: ${state.sound.muted ? 'On' : 'Off'}`;
  if (ambienceGain) ambienceGain.gain.value = state.sound.muted ? 0 : state.sound.volume;
}

function showOtherMenu() {
  mainMenuButtons.classList.add('hidden');
  otherMenuButtons.classList.remove('hidden');
  howPanel.classList.add('hidden');
  settingsPanel.classList.add('hidden');
  menuNotice.textContent = '';
}

function showMainMenu() {
  otherMenuButtons.classList.add('hidden');
  mainMenuButtons.classList.remove('hidden');
  howPanel.classList.add('hidden');
  settingsPanel.classList.add('hidden');
  menuNotice.textContent = '';
}

function startGameFromMenu() {
  startHorrorSound();
  titleMenu.classList.add('hidden');
  state.paused = false;
  log('Return to the academy. Find clues in the Library, solve the Forge, choose a dragon, survive the Vault.');
}

document.getElementById('playBtn').addEventListener('click', startGameFromMenu);
document.getElementById('otherBtn').addEventListener('click', () => {
  startHorrorSound();
  showOtherMenu();
});
document.getElementById('backBtn').addEventListener('click', showMainMenu);
document.getElementById('howBtn').addEventListener('click', () => {
  howPanel.classList.remove('hidden');
  settingsPanel.classList.add('hidden');
});
document.getElementById('settingsBtn').addEventListener('click', () => {
  settingsPanel.classList.remove('hidden');
  howPanel.classList.add('hidden');
});
document.getElementById('quitBtn').addEventListener('click', () => {
  menuNotice.textContent = 'Quit is blocked in most browsers. Close this tab to exit.';
  window.close();
});
volumeSlider.addEventListener('input', (e) => updateVolume(Number(e.target.value)));
muteToggle.addEventListener('click', toggleMute);

function log(msg) { logEl.textContent = msg; }

function inZone(z, x = state.player.x, y = state.player.y) {
  return x >= z.x && x < z.x + z.w && y >= z.y && y < z.y + z.h;
}

function drawRoom(z, color) {
  ctx.fillStyle = color;
  ctx.fillRect(z.x * tile, z.y * tile, z.w * tile, z.h * tile);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom(zones.entrance, '#21252f');
  drawRoom(zones.library, '#1d2028');
  drawRoom(zones.forge, '#2a1f19');
  drawRoom(zones.hatchery, '#1a2422');
  drawRoom(zones.vault, '#22192a');

  ctx.strokeStyle = '#555d70';
  [zones.entrance, zones.library, zones.forge, zones.hatchery, zones.vault].forEach((z) =>
    ctx.strokeRect(z.x * tile, z.y * tile, z.w * tile, z.h * tile)
  );

  ctx.fillStyle = state.hatcheryUnlocked ? '#6ec2ff' : '#8f3a3a';
  ctx.fillRect(27 * tile, 10 * tile, tile, tile * 2);
  ctx.fillStyle = state.dragon ? '#6ec2ff' : '#8f3a3a';
  ctx.fillRect(30 * tile, 14 * tile, tile * 2, tile);

  ctx.fillStyle = '#e3df8f';
  state.libraryClues.filter((c) => !c.taken).forEach((c) => ctx.fillRect(c.x * tile + 6, c.y * tile + 6, 12, 12));

  ctx.fillStyle = '#f2a35c';
  ctx.fillRect(23 * tile + 3, 8 * tile + 3, 18, 18);

  if (state.hatcheryUnlocked && !state.dragon) {
    ['#ff7a4d', '#8bc6ff', '#f1e065'].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc((31 + i * 2) * tile + 12, 9 * tile + 12, 8, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (!state.truthFound) {
    ctx.fillStyle = '#dbc0ff';
    ctx.fillRect(34 * tile + 6, 18 * tile + 6, 12, 12);
  }

  if (state.player.sanity <= 0) {
    ctx.fillStyle = 'rgba(95,130,255,0.35)';
    state.fakeDoors.forEach((d) => ctx.fillRect(d.x * tile, d.y * tile, tile, tile * 2));
  }

  ctx.fillStyle = state.monster.stun > 0 ? '#6bd3ff' : '#c24b4b';
  ctx.fillRect(state.monster.x * tile + 2, state.monster.y * tile + 2, 20, 20);

  if (state.dragon) {
    ctx.fillStyle = state.dragon === 'Ember Drake' ? '#ff8b57' : state.dragon === 'Mist Wyrm' ? '#8ec5ff' : '#ffe66d';
    ctx.beginPath();
    ctx.arc((state.player.x - 0.6) * tile, (state.player.y + 0.2) * tile, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#f4f4f6';
  ctx.fillRect(state.player.x * tile + 4, state.player.y * tile + 4, 16, 16);
}

function tryMove(dx, dy, dt) {
  const nx = state.player.x + dx * state.player.speed * dt;
  const ny = state.player.y + dy * state.player.speed * dt;
  const blockedHatcheryDoor = !state.hatcheryUnlocked && nx >= 27 && nx < 28 && ny >= 10 && ny <= 12;
  const blockedVaultDoor = !state.dragon && nx >= 30 && nx <= 32 && ny >= 14 && ny < 15;
  if (nx > 0 && ny > 0 && nx < world.w - 1 && ny < world.h - 1 && !blockedHatcheryDoor && !blockedVaultDoor) {
    state.player.x = nx;
    state.player.y = ny;
  }
}

function interact() {
  const p = state.player;
  if (inZone(zones.library)) {
    const clue = state.libraryClues.find((c) => !c.taken && Math.hypot(c.x - p.x, c.y - p.y) < 1.3);
    if (clue) {
      clue.taken = true;
      state.clues += 1;
      log(`Library clue found (${state.clues}/3).`);
      if (state.clues === 3) log('All clues found. The Forge answer waits: (2700+300)/100.');
      return;
    }
  }

  if (inZone(zones.forge) && Math.hypot(23 - p.x, 8 - p.y) < 2 && state.clues >= 3 && !state.forgeSolved) {
    showPanel(`
      <div class="card"><h2>Dragon Forge: ATC Puzzle</h2>
      <p>Fixed Cost = 2700, Variable Cost = 300, Units = 100. What is ATC?</p>
      <p><button data-a="30">a) 30</button> <button data-a="3">b) 3</button> <button data-a="24">c) 24</button> <button data-a="27">d) 27</button></p>
      <small>E to close.</small></div>`);
    panel.querySelectorAll('button').forEach((b) => {
      b.onclick = () => {
        const ans = Number(b.dataset.a);
        if (ans === 30) {
          state.forgeSolved = true;
          state.hatcheryUnlocked = true;
          hidePanel();
          log('Forge powered. Hatchery unlocked.');
        } else {
          state.player.sanity = Math.max(0, state.player.sanity - 12);
          state.monster.x = state.player.x + 2;
          state.monster.y = state.player.y + 1;
          hidePanel();
          log('Wrong. Lights flicker. The Husk is near.');
        }
      };
    });
    return;
  }

  if (inZone(zones.hatchery) && state.hatcheryUnlocked && !state.dragon && Math.hypot(31 - p.x, 9 - p.y) < 5) {
    showPanel(`<div class="card"><h2>Choose Your Corrupted Egg</h2>
      <p>1) Ember Drake (extra stun)</p>
      <p>2) Mist Wyrm (slower sanity drain)</p>
      <p>3) Volt Serpent (faster movement)</p>
      <p>Press 1/2/3 to choose.</p></div>`);
    return;
  }

  if (inZone(zones.vault) && !state.truthFound && Math.hypot(34 - p.x, 18 - p.y) < 1.5) {
    state.truthFound = true;
    state.dragonTrust += 15;
    log('Truth found: your original dragon guarded you until ash took its body.');
    return;
  }

  if (inZone(zones.vault) && state.dragon && !state.finale && Math.hypot(31 - p.x, 20 - p.y) < 3) {
    state.finale = true;
    state.monster.state = 'Relentless';
    log('Final ritual started. Survive until dawn.');
  }
}

function chooseDragon(choice) {
  if (!panel.classList.contains('hidden') && !state.dragon) {
    const map = { 1: 'Ember Drake', 2: 'Mist Wyrm', 3: 'Volt Serpent' };
    if (map[choice]) {
      state.dragon = map[choice];
      if (state.dragon === 'Volt Serpent') state.player.speed += 1.1;
      hidePanel();
      log(`${state.dragon} bonded. Trust begins at ${state.dragonTrust}.`);
    }
  }
}

function showPanel(html) {
  panel.innerHTML = html;
  panel.classList.remove('hidden');
  state.paused = true;
}

function hidePanel() {
  panel.classList.add('hidden');
  state.paused = false;
}

function updateMonster(dt) {
  const m = state.monster;
  if (m.stun > 0) {
    m.stun -= dt;
    return;
  }

  const dist = Math.hypot(m.x - state.player.x, m.y - state.player.y);
  if (state.finale || state.player.sanity === 0) m.state = 'Relentless';
  else if (dist < 5) m.state = 'Chase';
  else if (dist < 9) m.state = 'Stalk';
  else m.state = 'Roam';

  if (m.state === 'Roam') {
    m.x += (Math.random() - 0.5) * dt * 1.5;
    m.y += (Math.random() - 0.5) * dt * 1.5;
  } else {
    const speed = m.state === 'Relentless' ? 3.4 : m.state === 'Chase' ? 2.6 : 1.7;
    const vx = state.player.x - m.x;
    const vy = state.player.y - m.y;
    const mag = Math.hypot(vx, vy) || 1;
    m.x += (vx / mag) * speed * dt;
    m.y += (vy / mag) * speed * dt;
  }

  m.x = Math.max(1, Math.min(world.w - 2, m.x));
  m.y = Math.max(1, Math.min(world.h - 2, m.y));

  if (dist < 1.2) {
    state.player.hp = Math.max(0, state.player.hp - 22 * dt);
  }

  if (Math.random() < 0.002) log('Husk: "Thirty per ember, student. Your debts still breathe."');
}

function updateSanity(dt) {
  let drain = 0;
  const inDark = Object.values(zones).some((z) => inZone(z) && z.dark);
  const nearMonster = Math.hypot(state.player.x - state.monster.x, state.player.y - state.monster.y) < 6;
  if (inDark) drain += 2;
  if (nearMonster) drain += 5;
  if (state.dragon === 'Mist Wyrm') drain = Math.max(0.8, drain - 1.4);
  state.player.sanity = Math.max(0, state.player.sanity - drain * dt);

  if (state.player.sanity === 0 && state.finale) state.sanityZeroDuringFinale = true;
  if (state.player.sanity === 0 && Math.random() < 0.01 && state.dragon) state.player.hp = Math.max(0, state.player.hp - 8 * dt);

  if (state.player.sanity < 20 && state.dragon) state.dragonTrust = Math.max(0, state.dragonTrust - 3 * dt);
  if (state.player.sanity > 55 && state.dragon) state.dragonTrust = Math.min(100, state.dragonTrust + 1.2 * dt);

  document.body.classList.toggle('glitch', state.player.sanity === 0);
}

function fireStun() {
  if (state.player.ammo <= 0) return log('No rounds left.');
  const d = Math.hypot(state.player.x - state.monster.x, state.player.y - state.monster.y);
  if (d < 6) {
    state.player.ammo -= 1;
    state.monster.stun = state.dragon === 'Ember Drake' ? 6 : 4;
    log('Direct hit. The Husk is stunned briefly.');
  } else {
    state.player.ammo -= 1;
    log('Shot wasted into darkness.');
  }
}

function resolveEnding() {
  let ending = 'Escape Only';
  if (state.sanityZeroDuringFinale) ending = 'Corruption Ending';
  else if (state.truthFound && state.dragon === 'Mist Wyrm' && state.dragonTrust >= 70) ending = 'Reunion Ending';
  else if (state.forgeSolved && state.ritualDone && state.dragonTrust >= 70) ending = 'Banish the Husk';
  showPanel(`<div class="card"><h2>${ending}</h2>
    <p>Clues: ${state.clues}/3 · Dragon: ${state.dragon ?? 'None'} · Trust: ${state.dragonTrust.toFixed(0)} · Sanity: ${state.player.sanity.toFixed(0)}</p>
    <p>${ending === 'Banish the Husk' ? 'The ritual holds. Dawn finally answers you.' : 'The academy closes behind you with one more unanswered echo.'}</p>
    <p><a href="" style="color:#8ac0ff">Restart</a></p></div>`);
  state.over = true;
}

function update(dt) {
  if (state.paused || state.over) return;
  state.time += dt;

  let dx = 0;
  let dy = 0;
  if (keys.has('w') || keys.has('arrowup')) dy -= 1;
  if (keys.has('s') || keys.has('arrowdown')) dy += 1;
  if (keys.has('a') || keys.has('arrowleft')) dx -= 1;
  if (keys.has('d') || keys.has('arrowright')) dx += 1;
  const mag = Math.hypot(dx, dy) || 1;
  tryMove(dx / mag, dy / mag, dt);

  updateMonster(dt);
  updateSanity(dt);

  if (state.finale) {
    state.dawnTimer -= dt;
    if (state.dawnTimer <= 0) {
      state.ritualDone = true;
      resolveEnding();
    }
  }
  if (state.player.hp <= 0) {
    state.sanityZeroDuringFinale = true;
    resolveEnding();
  }

  healthFill.style.width = `${state.player.hp}%`;
  sanityFill.style.width = `${state.player.sanity}%`;
  meta.textContent = `Ammo: ${state.player.ammo} | Clues: ${state.clues}/3 | Dragon: ${state.dragon ?? 'None'} | Trust: ${state.dragonTrust.toFixed(0)} | Husk: ${state.monster.state} | ${state.finale ? `Dawn in ${Math.ceil(state.dawnTimer)}s` : 'Find answers'}`;
}

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
log('Open the title menu and press Play to begin.');

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  keys.add(k);
  if (!titleMenu.classList.contains('hidden')) {
    if (k === 'enter') startGameFromMenu();
    return;
  }

  if (k === 'e') {
    if (!panel.classList.contains('hidden')) hidePanel();
    else interact();
  }
  if (k === 'f') fireStun();
  if (k === 'p') state.paused = !state.paused;
  chooseDragon(k);
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
