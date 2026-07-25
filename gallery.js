/* Click a gallery photo to view it larger. Escape or the close button dismisses it. */
(function () {
  var box = document.getElementById('lightbox');
  if (!box) return;
  var img = document.getElementById('lightbox-img');
  var cap = document.getElementById('lightbox-cap');
  var closeBtn = box.querySelector('[data-close]');
  var lastFocused = null;

  function open(src, alt, caption) {
    lastFocused = document.activeElement;
    img.src = src;
    img.alt = alt || '';
    cap.textContent = caption || '';
    box.classList.add('is-open');
    closeBtn.focus();
  }

  function close() {
    box.classList.remove('is-open');
    img.src = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.gallery img').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var fig = thumb.closest('figure');
      var caption = fig && fig.querySelector('figcaption');
      open(thumb.src, thumb.alt, caption ? caption.textContent : '');
    });
  });

  closeBtn.addEventListener('click', close);
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.classList.contains('is-open')) close();
  });
})();
