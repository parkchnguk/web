// In-place mobile inspection; original artwork stays unchanged.
document.querySelectorAll('.hb-banner-zoom').forEach(button => {
  button.addEventListener('click', () => {
    const viewport = document.getElementById(button.getAttribute('aria-controls'));
    const expanded = viewport.classList.toggle('is-zoomed');
    button.setAttribute('aria-pressed', String(expanded));
    button.textContent = expanded ? '전체 보기 − · 좌우로 밀어 확인' : '배너 크게 보기 +';
    if (!expanded) viewport.scrollLeft = 0;
  });
});
