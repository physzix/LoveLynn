(() => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const noZone = document.getElementById('noZone');
  const actions = document.querySelector('.actions');

  if (!yesBtn || !noBtn || !noZone || !actions) return;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  function moveNoButton() {
    const zoneRect = noZone.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 6;
    const maxX = Math.max(padding, zoneRect.width - btnRect.width - padding);
    const maxY = Math.max(padding, zoneRect.height - btnRect.height - padding);

    const x = clamp(Math.random() * maxX, padding, maxX);
    const y = clamp(Math.random() * maxY, padding, maxY);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = 'none';
  }

  // Move once after first layout so it starts in a "shy" position.
  requestAnimationFrame(() => {
    moveNoButton();
  });

  // Desktop hover
  noBtn.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      moveNoButton();
    }
  });

  // Mobile/touch: make it jump when someone tries to tap it
  noBtn.addEventListener(
    'pointerdown',
    (e) => {
      if (e.pointerType === 'touch') {
        e.preventDefault();
        moveNoButton();
      }
    },
    { passive: false }
  );

  // If they keep chasing it by moving inside the zone, occasionally jump again
  let lastMove = 0;
  actions.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;

    const now = Date.now();
    if (now - lastMove < 120) return;

    const b = noBtn.getBoundingClientRect();
    const dx = e.clientX - (b.left + b.width / 2);
    const dy = e.clientY - (b.top + b.height / 2);
    const dist = Math.hypot(dx, dy);

    if (dist < 70) {
      lastMove = now;
      moveNoButton();
    }
  });

  yesBtn.addEventListener('click', () => {
    window.location.href = './success.html';
  });
})();
