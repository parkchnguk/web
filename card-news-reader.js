/* A readable companion to each square card, without changing its design. */
const reader = document.createElement('dialog');
reader.className = 'card-reader';
reader.setAttribute('aria-labelledby', 'reader-title');
reader.innerHTML = '<div class="reader-top"><h2 id="reader-title">카드 크게 읽기</h2><button type="button" class="reader-close" aria-label="확대 보기 닫기">닫기 ×</button></div><div class="reader-text"></div><p class="reader-hint">아래 확대 카드는 좌우로 움직여 확인할 수 있습니다.</p><div class="reader-scroll" tabindex="0" aria-label="확대 카드, 좌우로 스크롤할 수 있습니다"></div>';
document.body.append(reader);
let returnFocus;
reader.querySelector('.reader-close').addEventListener('click', () => reader.close());
reader.addEventListener('close', () => { document.body.classList.remove('reader-open'); returnFocus?.focus(); });
reader.addEventListener('click', event => { if (event.target === reader) reader.close(); });
document.querySelectorAll('.card-sequence > .news-card').forEach(card => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'card-read-button';
  button.textContent = '크게 읽기 +';
  button.setAttribute('aria-label', card.getAttribute('aria-label') + ' 크게 읽기');
  button.addEventListener('click', () => {
    returnFocus = button;
    const clone = card.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelector('.card-read-button')?.remove();
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    reader.querySelector('.reader-scroll').replaceChildren(clone);
    const text = reader.querySelector('.reader-text');
    text.replaceChildren();
    const title = document.createElement('h3');
    title.textContent = card.querySelector('h3').innerText;
    text.append(title);
    const content = card.querySelector('.card-inner').cloneNode(true);
    content.querySelectorAll('header,footer,h3,svg,img,.orbit').forEach(el => el.remove());
    const paragraph = document.createElement('div');
    paragraph.textContent = content.textContent.replace(/\s+/g, ' ').trim();
    // Preserve meaningful line breaks in the visible card's text.
    paragraph.textContent = [...card.querySelectorAll('.body,.point,.tile strong,.tile>span,.setting,.two-habits strong,.checklist li,.message,.micro-key')].map(el=>el.innerText).join('\n\n') || paragraph.textContent;
    text.append(paragraph);
    document.body.classList.add('reader-open');
    reader.showModal();
    reader.querySelector('.reader-scroll').scrollLeft = 0;
  });
  card.append(button);
});
