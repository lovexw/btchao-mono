/* 比特币品牌素材库 · 交互脚本
   语录轮播 / 复制色值 / 复制按钮与卡片 CSS / 术语搜索 / 移动菜单 / 滚动浮现 */
(function () {
  'use strict';

  var data = window.BTC_DATA || { quotes: [], stories: [], terms: [] };

  /* ── toast ── */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    // 触发过渡
    requestAnimationFrame(function () { toast.classList.add('show'); });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.hidden = true; }, 250);
    }, 1800);
  }

  /* ── 移动端菜单 ── */
  var navToggle = document.querySelector('.nav-toggle');
  var topnav = document.querySelector('.topnav');
  if (navToggle && topnav) {
    navToggle.addEventListener('click', function () {
      var open = topnav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.textContent = open ? '✕' : '☰';
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        topnav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });
  }

  /* ── 复制到剪贴板（http 环境降级） ── */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); resolve(); }
      catch (e) { reject(e); }
      finally { document.body.removeChild(ta); }
    });
  }

  document.querySelectorAll('.swatch[data-hex]').forEach(function (el) {
    function doCopy() {
      copyText(el.getAttribute('data-hex')).then(function () {
        showToast('已复制 ' + el.getAttribute('data-hex'));
      }).catch(function () {
        showToast('复制失败，请手动选择色值');
      });
    }
    el.addEventListener('click', doCopy);
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doCopy(); }
    });
  });

  /* ── 按钮规范：点击示例复制 CSS ── */
  document.querySelectorAll('[data-btn-css]').forEach(function (el) {
    el.addEventListener('click', function () {
      var key = el.getAttribute('data-btn-css');
      var css = data.buttonCss && data.buttonCss[key];
      if (!css) return;
      copyText(css).then(function () {
        showToast('已复制 .btn-' + key + ' 的 CSS');
      }).catch(function () {
        showToast('复制失败，请手动复制样式');
      });
    });
  });

  /* ── 卡片规范：点击复制 CSS ── */
  document.querySelectorAll('[data-card-css]').forEach(function (el) {
    el.addEventListener('click', function () {
      var key = el.getAttribute('data-card-css');
      var css = data.cardCss && data.cardCss[key];
      if (!css) return;
      copyText(css).then(function () {
        showToast('已复制 .' + key + ' 的 CSS');
      }).catch(function () {
        showToast('复制失败，请手动复制样式');
      });
    });
  });

  /* ── 语录轮播 ── */
  var qText = document.getElementById('quote-text');
  var qCn = document.getElementById('quote-cn');
  var qSrc = document.getElementById('quote-src');
  var qIndex = document.getElementById('q-index');
  var qPrev = document.getElementById('q-prev');
  var qNext = document.getElementById('q-next');
  var qi = 0;

  function renderQuote() {
    if (!qText) return;
    var q = data.quotes[qi];
    if (!q) return;
    qText.textContent = q.en;
    qCn.textContent = q.cn;
    var a = document.createElement('a');
    a.href = q.url; a.target = '_blank'; a.rel = 'noopener';
    a.className = 'ext';
    a.textContent = q.src;
    qSrc.textContent = '';
    qSrc.appendChild(a);
    qIndex.textContent = (qi + 1) + ' / ' + data.quotes.length;
  }
  function stepQuote(d) {
    qi = (qi + d + data.quotes.length) % data.quotes.length;
    renderQuote();
  }
  if (qNext) qNext.addEventListener('click', function () { stepQuote(1); });
  if (qPrev) qPrev.addEventListener('click', function () { stepQuote(-1); });
  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') stepQuote(-1);
    if (e.key === 'ArrowRight') stepQuote(1);
  });
  renderQuote();

  /* ── 社区故事 ── */
  var timeline = document.getElementById('timeline');
  if (timeline) {
    data.stories.forEach(function (s) {
      var item = document.createElement('article');
      item.className = 'story-item';

      var year = document.createElement('div');
      year.className = 'story-year';
      year.textContent = s.year;

      var dotWrap = document.createElement('div');
      var dot = document.createElement('div');
      dot.className = 'story-dot';
      dotWrap.appendChild(dot);

      var body = document.createElement('div');
      body.className = 'story-body';
      var h = document.createElement('h3');
      h.textContent = s.title;
      var p = document.createElement('p');
      p.textContent = s.body;
      var en = document.createElement('p');
      en.className = 'story-en';
      en.textContent = s.en || '';
      var src = document.createElement('p');
      src.className = 'story-src';
      var a = document.createElement('a');
      a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = '出处：' + s.src;
      src.appendChild(a);

      body.appendChild(h); body.appendChild(p);
      if (s.en) body.appendChild(en);
      body.appendChild(src);

      item.appendChild(year); item.appendChild(dotWrap); item.appendChild(body);
      timeline.appendChild(item);
    });
  }

  /* ── 术语搜索 ── */
  var grid = document.getElementById('term-grid');
  var count = document.getElementById('term-count');
  var empty = document.getElementById('term-empty');
  var search = document.getElementById('term-search');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function hi(text, kw) {
    var safe = esc(text);
    if (!kw) return safe;
    var re = new RegExp('(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  }

  function renderTerms(kw) {
    if (!grid) return;
    kw = (kw || '').trim().toLowerCase();
    var list = data.terms.filter(function (t) {
      if (!kw) return true;
      var hay = (t.zh + ' ' + t.en + ' ' + t.desc + ' ' + (t.alt || '')).toLowerCase();
      return hay.indexOf(kw) !== -1;
    });
    grid.innerHTML = '';
    list.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'card term-card';
      card.innerHTML =
        '<h3>' + hi(t.zh, kw) + ' <span class="term-en">' + hi(t.en, kw) + '</span></h3>' +
        '<p>' + hi(t.desc, kw) + '</p>';
      grid.appendChild(card);
    });
    var n = list.length;
    if (count) count.textContent = n ? ('共 ' + n + ' 个术语' + (kw ? ' · 关键词「' + kw + '」' : '')) : '';
    if (empty) empty.hidden = n > 0;
  }
  if (search) {
    var debounce = null;
    search.addEventListener('input', function () {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(function () { renderTerms(search.value); }, 120);
    });
  }
  renderTerms('');

  /* ── 滚动浮现（reduced-motion 下自动跳过） ── */
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.section > .container > .stack, .section .grid-3, .section .grid-4');
  if (!reduced && 'IntersectionObserver' in window) {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
    // 兜底：3 秒后强制显示，防误判
    setTimeout(function () {
      targets.forEach(function (el) { el.classList.add('in'); });
    }, 3000);
  }
})();
