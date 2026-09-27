/**
 * 量子时代的比特币 —— 从零到终局
 * 轻量交互：阅读进度条 / 返回顶部 / 章节目录
 */
(function () {
  'use strict';

  /* 阅读进度条 */
  var bar = document.querySelector('.progress');
  function updateProgress() {
    if (!bar) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.width = (ratio * 100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  /* 返回顶部 */
  var topBtn = document.createElement('button');
  topBtn.id = 'backTop';
  topBtn.type = 'button';
  topBtn.setAttribute('aria-label', '返回顶部');
  topBtn.textContent = '↑';
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', function () {
    topBtn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  /* 章节目录：点击其他区域时收起 */
  document.addEventListener('click', function (e) {
    document.querySelectorAll('details.toc-drop[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });

  /* 目录中标记当前页 */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.toc-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here) {
      a.classList.add('current');
      a.setAttribute('aria-current', 'page');
    }
  });
})();
