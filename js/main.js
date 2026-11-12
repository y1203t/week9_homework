'use strict';

const DATA_URL = 'data/cats.json';
const FALLBACK_IMAGE_MESSAGE = '貓咪照片預留區';

function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function addImageOrPlaceholder(container, cat, detail = false) {
  const wrapper = node('div', detail ? 'detail-photo' : 'card-photo');
  const placeholder = node('div', 'cat-placeholder');
  const glyph = node('span', 'placeholder-icon', '✧');
  glyph.setAttribute('aria-hidden', 'true');
  placeholder.append(glyph, node('span', '', FALLBACK_IMAGE_MESSAGE), node('small', '', cat.image || '尚未設定圖片'));
  const img = document.createElement('img');
  img.src = cat.image || '';
  img.alt = cat.imageAlt || `${cat.name}的照片`;
  img.loading = detail ? 'eager' : 'lazy';
  img.hidden = true;
  img.addEventListener('load', () => { img.hidden = false; placeholder.hidden = true; });
  img.addEventListener('error', () => { img.hidden = true; placeholder.hidden = false; });
  if (cat.image) wrapper.append(img);
  wrapper.append(placeholder);
  container.append(wrapper);
}

async function fetchCats() {
  const res = await fetch(DATA_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('資料讀取失敗');
  const cats = await res.json();
  if (!Array.isArray(cats)) throw new Error('貓咪資料格式有誤');
  return cats;
}

function catCard(cat) {
  const link = node('a', 'cat-card');
  link.href = `cat.html?id=${encodeURIComponent(cat.id)}`;
  addImageOrPlaceholder(link, cat);
  const info = node('div', 'card-info');
  info.append(node('span', 'mini-tag', cat.coat), node('h3', '', cat.name), node('p', 'english-name', cat.englishName), node('p', 'card-summary', cat.summary));
  const foot = node('div', 'card-foot');
  foot.append(node('span', '', '認識這隻喵星人'), node('span', 'arrow', '↗'));
  info.append(foot);
  link.append(info);
  return link;
}

function initIndex(cats) {
  const grid = document.getElementById('cat-grid');
  const count = document.getElementById('cat-count');
  const empty = document.getElementById('empty-state');
  const search = document.getElementById('search-input');
  const coat = document.getElementById('coat-filter');
  function render() {
    const q = search.value.trim().toLocaleLowerCase();
    const result = cats.filter(c => (coat.value === 'all' || c.coat === coat.value) && [c.name, c.englishName, c.summary, ...(c.tags || [])].join(' ').toLocaleLowerCase().includes(q));
    grid.replaceChildren(...result.map(catCard));
    count.textContent = `共 ${result.length} 種貓咪`;
    empty.hidden = result.length > 0;
  }
  search.addEventListener('input', render);
  coat.addEventListener('change', render);
  render();
}

function detailSection(title, content) {
  const section = node('section', 'detail-section');
  section.append(node('h2', '', title), node('p', '', content));
  return section;
}

function initDetail(cats) {
  const container = document.getElementById('detail-content');
  const id = new URLSearchParams(window.location.search).get('id');
  const cat = cats.find(c => c.id === id);
  if (!cat) {
    container.replaceChildren(node('div', 'error-panel', '找不到這個貓咪品種，請返回圖鑑選擇其他貓咪。'));
    return;
  }
  document.title = `${cat.name}｜Meowpedia 喵星人圖鑑`;
  const hero = node('section', 'detail-hero');
  addImageOrPlaceholder(hero, cat, true);
  const copy = node('div', 'detail-heading');
  copy.append(node('span', 'eyebrow', 'MEET THE CAT'), node('h1', '', cat.name), node('p', 'detail-english', cat.englishName), node('p', 'detail-summary', cat.summary));
  const meta = node('div', 'meta-chips');
  meta.append(node('span', '', `原產地：${cat.origin}`), node('span', '', `毛髮：${cat.coat}`));
  copy.append(meta);
  hero.append(copy);
  const content = node('div', 'detail-body');
  content.append(detailSection('外觀特徵', cat.appearance), detailSection('個性特色', cat.personality), detailSection('生活習性', cat.habits));
  const care = node('section', 'detail-section care-panel');
  care.append(node('h2', '', '照顧小提醒'));
  const ul = node('ul', 'care-list');
  (cat.care || []).forEach(item => ul.append(node('li', '', item)));
  care.append(ul);
  content.append(care);
  if (cat.sources && cat.sources.length) {
    const sec = node('section', 'detail-section');
    sec.append(node('h2', '', '參考來源'));
    const list = node('ul', 'sources-list');
    cat.sources.forEach(src => {
      if (typeof src !== 'string' || !/^https?:\/\//i.test(src)) return;
      const li = node('li');
      const a = node('a', '', src);
      a.href = src; a.target = '_blank'; a.rel = 'noopener noreferrer';
      li.append(a); list.append(li);
    });
    sec.append(list); content.append(sec);
  }
  const note = node('p', 'disclaimer', '※ 品種介紹為一般性資訊，個性與照顧需求因個體而異；健康問題請諮詢獸醫。');
  container.replaceChildren(hero, content, note);
}

(async function init() {
  const page = document.body.dataset.page;
  try {
    const cats = await fetchCats();
    if (page === 'index') initIndex(cats);
    if (page === 'detail') initDetail(cats);
  } catch (err) {
    const el = document.getElementById(page === 'index' ? 'cat-grid' : 'detail-content');
    if (el) el.replaceChildren(node('p', 'error-panel', '無法載入貓咪資料。請透過本機網站伺服器或 GitHub Pages 開啟（不要直接雙擊 HTML 檔案）。'));
    const count = document.getElementById('cat-count');
    if (count) count.textContent = '無法載入';
    console.error(err);
  }
})();
