const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
const closeMenu=()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.open).showModal()));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelector('a[href="#routine-guide"]').addEventListener('click',()=>document.getElementById('routine-guide').open=true);
document.querySelector('#newsletter').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#newsletter-status').textContent='입력 형식을 확인했습니다. 데모이므로 신청되거나 전송되지 않습니다.'});
const pages=[['Daily Nutrition Support · 제품 소개','shop','제품 쇼핑 캡슐 shop daily nutrition'],['Our Story · 브랜드 이야기','story','브랜드 이야기 story'],['Our Formula · 패키지 정보','formula','성분 영양 포뮬러 ingredients formula'],['Daily Routine · 일상의 작은 습관','routine','루틴 routine'],['Wellness Journal · 웰니스 이야기','journal','저널 journal 아침 습관'],['FAQ · 자주 묻는 질문','faq','faq 질문 섭취 캡슐']];
function search(){const q=document.querySelector('#search').value.trim().toLowerCase(),results=document.querySelector('#search-results');results.replaceChildren();const found=pages.filter(p=>(p[0]+' '+p[2]).toLowerCase().includes(q));for(const [title,id] of found){const a=document.createElement('a');a.href='#'+id;a.textContent=title+' ↗';a.addEventListener('click',()=>document.querySelector('#search-dialog').close());results.append(a)}if(!found.length)results.textContent='검색 결과가 없습니다. 제품, 루틴, 성분으로 다시 검색해 보세요.'}
document.querySelector('#search').addEventListener('input',search);search();
