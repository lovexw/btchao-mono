// 慢者生存 v2 — 丝滑交互
(function() {
  'use strict';

  // ====== 页面进入动画 ======
  function pageEnter() {
    document.body.style.opacity = '';
    document.body.classList.add('page-ready');
    // 段落渐入 — 按序设置 --n
    var paras = document.querySelectorAll('article.al p, article.al h3, article.al h1');
    paras.forEach(function(el, i) {
      el.style.setProperty('--n', Math.min(i, 15));
    });
  }

  // ====== 进度条 (rAF 节流) ======
  var progressBar = document.querySelector('.scroll-progress');
  var ticking = false;

  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      requestAnimationFrame(updateNavScrolled);
      requestAnimationFrame(updateBackTop);
    }
    ticking = true;
  }

  // ====== 导航栏 scrolled 状态 ======
  var navEl = document.querySelector('nav.t');
  function updateNavScrolled() {
    if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 20);
  }

  // ====== 回到顶部 ======
  var backTop = document.querySelector('.back-to-top');
  function updateBackTop() {
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  }
  if (backTop) {
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== 移动端目录面板 ======
  var mobileToc = document.querySelector('.mobile-toc');
  var tocPanel = document.querySelector('.toc-panel');
  var tocOverlay = document.querySelector('.toc-overlay');

  if (mobileToc && tocPanel) {
    mobileToc.addEventListener('click', function() {
      tocPanel.classList.add('open');
      if (tocOverlay) tocOverlay.classList.add('open');
    });
    if (tocOverlay) {
      tocOverlay.addEventListener('click', function() {
        tocPanel.classList.remove('open');
        tocOverlay.classList.remove('open');
      });
    }
    if (tocPanel) {
      tocPanel.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          tocPanel.classList.remove('open');
          if (tocOverlay) tocOverlay.classList.remove('open');
        });
      });
    }
  }

  // ====== 桌面端侧边目录高亮 ======
  var tocSidebarLinks = document.querySelectorAll('.toc-sidebar a');
  var headings = document.querySelectorAll('article.al h3');

  if (tocSidebarLinks.length > 0 && headings.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          tocSidebarLinks.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });
    headings.forEach(function(h) { observer.observe(h); });
  }

  // ====== 导航栏菜单按钮 ======
  var navMenuBtn = document.querySelector('.nav-menu-btn');
  if (navMenuBtn) {
    navMenuBtn.addEventListener('click', function() {
      window.location.href = 'index.html#contents';
    });
  }

  // ====== 链接预加载 (Instant Navigation) ======
  // 预加载鼠标悬停的链接
  var preloadedUrls = {};

  function preloadUrl(url) {
    if (preloadedUrls[url]) return;
    preloadedUrls[url] = true;
    try {
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);
    } catch(e) {}
  }

  // 悬停预加载（桌面）
  document.querySelectorAll('a[href]').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    // 仅同源 .html 链接
    if (!/\.html($|\?|#)/.test(href) && href !== 'index.html' && !/^[a-z]+:\/\//.test(href) && href.indexOf('#') !== 0) return;
    if (/^[a-z]+:\/\//.test(href)) return;

    var hoverTimer;
    link.addEventListener('mouseenter', function() {
      hoverTimer = setTimeout(function() { preloadUrl(href); }, 80);
    });
    link.addEventListener('mouseleave', function() {
      clearTimeout(hoverTimer);
    });

    // 触摸开始预加载（移动端）
    link.addEventListener('touchstart', function() {
      preloadUrl(href);
    }, { passive: true });
  });

  // ====== 触摸滑动手势 ======
  var touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;

  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    var dx = touchEndX - touchStartX;
    var dy = touchEndY - touchStartY;

    // 水平滑动距离必须大于垂直滑动，且超过 60px
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    // 不在文章选中区域触发
    var target = document.elementFromPoint(touchStartX, touchStartY);
    if (target && target.closest('article.al p') && Math.abs(dx) < 100) return;

    if (dx > 0) {
      // 右滑 → 上一章
      var prevLink = document.querySelector('.cn-link.prev:not(.placeholder)');
      if (prevLink) {
        prevLink.style.transition = 'all 0.15s ease';
        prevLink.style.transform = 'translateX(-4px)';
        setTimeout(function() {
          window.location.href = prevLink.getAttribute('href');
        }, 100);
      }
    } else {
      // 左滑 → 下一章
      var nextLink = document.querySelector('.cn-link.next:not(.placeholder)');
      if (nextLink) {
        nextLink.style.transition = 'all 0.15s ease';
        nextLink.style.transform = 'translateX(4px)';
        setTimeout(function() {
          window.location.href = nextLink.getAttribute('href');
        }, 100);
      }
    }
  }

  // ====== 键盘导航 (桌面) ======
  document.addEventListener('keydown', function(e) {
    // 不在输入框中
    if (e.target.matches('input, textarea, select')) return;

    if (e.key === 'ArrowLeft') {
      var prev = document.querySelector('.cn-link.prev:not(.placeholder)');
      if (prev) { e.preventDefault(); window.location.href = prev.getAttribute('href'); }
    } else if (e.key === 'ArrowRight') {
      var next = document.querySelector('.cn-link.next:not(.placeholder)');
      if (next) { e.preventDefault(); window.location.href = next.getAttribute('href'); }
    }
  });

  // ====== 页面离开淡出 (不阻断导航) ======
  var navigating = false;
  document.querySelectorAll('a[href]').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (link.target === '_blank') return;

    link.addEventListener('click', function(e) {
      if (navigating) { e.preventDefault(); return; }
      navigating = true;

      // 让浏览器开始加载，同时淡出
      document.body.style.transition = 'opacity 0.15s ease-out';
      document.body.style.opacity = '0.7';

      // 如果是同源链接，让它自然跳转
      // 不阻止默认行为
    }, { capture: true });
  });

  // ====== 初始化 ======
  window.addEventListener('scroll', onScroll, { passive: true });
  updateProgress();
  updateNavScrolled();
  updateBackTop();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pageEnter);
  } else {
    pageEnter();
  }

  // 页面恢复时重置（bfcache）
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      document.body.style.opacity = '';
      document.body.style.transition = '';
      navigating = false;
    }
  });

})();
