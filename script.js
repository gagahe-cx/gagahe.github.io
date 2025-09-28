document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
toggle?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      nav.classList.remove('open');
    }
  });
});

const images = Array.from(document.querySelectorAll('.grid .item img'));
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-image');
const lbCaption = document.getElementById('lb-caption');
const lbArticles = document.getElementById('lb-articles'); 
const btnClose = lb.querySelector('.lb-close');
const btnPrev = lb.querySelector('.lb-prev');
const btnNext = lb.querySelector('.lb-next');
let cur = -1;

function renderArticlesFrom(imgEl){
  // 清空旧列表
  lbArticles.innerHTML = '';

  const raw = imgEl.getAttribute('data-articles');
  if (!raw) {
    lbArticles.style.display = 'none';
    return;
  }
  let list = [];
  try {
    list = JSON.parse(raw);
  } catch (e) {
    console.warn('data-articles 不是合法 JSON：', e);
  }
  if (!Array.isArray(list) || list.length === 0) {
    lbArticles.style.display = 'none';
    return;
  }

  // 有内容就显示
  lbArticles.style.display = '';

  list.forEach(({title, url}) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = title || 'Untitled';
    a.href = url || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    li.appendChild(a);
    lbArticles.appendChild(li);
  });
}

function openAt(i){
  cur = (i + images.length) % images.length;
  const img = images[cur];
  lbImg.src = img.getAttribute('src');
  lbImg.alt = img.getAttribute('alt') || '';
  lbCaption.textContent = img.dataset.caption || img.alt || '';

  // 新增：渲染文章列表
  renderArticlesFrom(img);

  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
}

function closeLb(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
  // 关闭时可选地清空列表（不是必须）
  // lbArticles.innerHTML = '';
}


images.forEach((img, i) => img.addEventListener('click', () => openAt(i)));
btnClose.addEventListener('click', closeLb);
btnPrev.addEventListener('click', () => openAt(cur - 1));
btnNext.addEventListener('click', () => openAt(cur + 1));

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') openAt(cur - 1);
  if (e.key === 'ArrowRight') openAt(cur + 1);
});

lb.addEventListener('click', (e) => {
  const isButton = e.target.closest('.lb-close, .lb-prev, .lb-next');
  const isFigure = e.target.closest('.lb-figure');
  if (!isButton && !isFigure) closeLb();
});
