/* ============================================================
   比特币白皮书 · 小吴乐意翻译版
   主题切换 / 目录高亮 / 阅读进度 / 互动演示（内置 SHA-256，纯本地计算）
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- SHA-256（内置实现，同步、无依赖） ---------------- */
  var SHA256_K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function sha256Bytes(bytes) {
    var bitLenHi = Math.floor(bytes.length / 536870912);
    var bitLenLo = (bytes.length << 3) >>> 0;
    var paddedLen = ((bytes.length + 9 + 63) >> 6) << 6;
    var data = new Uint8Array(paddedLen);
    data.set(bytes);
    data[bytes.length] = 0x80;
    var dv = new DataView(data.buffer);
    dv.setUint32(paddedLen - 8, bitLenHi);
    dv.setUint32(paddedLen - 4, bitLenLo);
    var h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var w = new Int32Array(64);
    function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
    for (var off = 0; off < paddedLen; off += 64) {
      var i;
      for (i = 0; i < 16; i++) w[i] = dv.getInt32(off + i * 4);
      for (i = 16; i < 64; i++) {
        var x15 = w[i - 15] | 0, x2 = w[i - 2] | 0;
        var s0 = rotr(x15, 7) ^ rotr(x15, 18) ^ (x15 >>> 3);
        var s1 = rotr(x2, 17) ^ rotr(x2, 19) ^ (x2 >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      var a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
      for (i = 0; i < 64; i++) {
        var S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (hh + S1 + ch + SHA256_K[i] + w[i]) | 0;
        var S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + maj) | 0;
        hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0;
      h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0;
    }
    var out = '';
    for (i = 0; i < 8; i++) out += (h[i] >>> 0).toString(16).padStart(8, '0');
    return out;
  }

  var encoder = new TextEncoder();
  function sha256(text) { return sha256Bytes(encoder.encode(text)); }

  function $(id) { return document.getElementById(id); }

  /* ---------------- 主题切换 ---------------- */
  var themeToggle = $('themeToggle');
  var storedTheme = null;
  try { storedTheme = localStorage.getItem('btcwp-theme'); } catch (e) { /* 隐私模式忽略 */ }
  function applyTheme(t) {
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }
  applyTheme(storedTheme || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('btcwp-theme', next); } catch (e) { /* 忽略 */ }
    });
  }

  /* ---------------- 阅读进度条 ---------------- */
  var progress = $('progress');
  function onScroll() {
    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }
    if (backTop) backTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- 回到顶部 ---------------- */
  var backTop = $('backTop');
  if (backTop) backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------------- 目录高亮（scrollspy） ---------------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc-nav a[data-spy]'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      byId[id] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          var link = byId[en.target.id];
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* ---------------- 演示 1：哈希指纹机 ---------------- */
  var hashInput = $('hashInput');
  var hashOutput = $('hashOutput');
  var hashNote = $('hashNote');
  var hashDefault = hashInput ? hashInput.value : '';
  function renderHash() {
    if (!hashInput || !hashOutput) return;
    hashOutput.textContent = sha256(hashInput.value);
  }
  if (hashInput) {
    hashInput.addEventListener('input', function () { renderHash(); if (hashNote) hashNote.textContent = ''; });
    renderHash();
  }
  var hashAvalanche = $('hashAvalanche');
  if (hashAvalanche) {
    hashAvalanche.addEventListener('click', function () {
      hashInput.value = hashInput.value + '。';
      renderHash();
      if (hashNote) hashNote.textContent = '只多了一个句号，指纹就变得面目全非——这叫「雪崩效应」。原文里「哈希以若干个 0 开头」之所以难找，正是因为无法反推输入，只能一个个试。';
    });
  }
  var hashReset = $('hashReset');
  if (hashReset) {
    hashReset.addEventListener('click', function () {
      hashInput.value = hashDefault;
      renderHash();
      if (hashNote) hashNote.textContent = '';
    });
  }

  /* ---------------- 演示 2：挖矿模拟器 ---------------- */
  var mineToggle = $('mineToggle');
  var mineBlock = $('mineBlock');
  var mineTry = $('mineTry');
  var mineHash = $('mineHash');
  var mineCount = $('mineCount');
  var mineNote = $('mineNote');
  var mineDifficulty = $('mineDifficulty');
  var mining = false;
  var mineNonce = 0, mineTries = 0, mineTimer = null;

  function leadingZeros(hex) {
    var n = 0;
    while (n < hex.length && hex[n] === '0') n++;
    return n;
  }

  function mineChunk() {
    if (!mining) return;
    var diff = parseInt(mineDifficulty.value, 10);
    var target = new Array(diff + 1).join('0');
    var start = performance.now();
    while (performance.now() - start < 40) {
      var hex = sha256(mineBlock.textContent + '#' + mineNonce);
      mineTries++;
      if (hex.slice(0, diff) === target) {
        mining = false;
        mineTry.textContent = 'nonce = ' + mineNonce;
        mineHash.textContent = hex;
        mineHash.classList.add('found');
        mineCount.textContent = mineTries.toLocaleString() + ' 次';
        if (mineNote) mineNote.textContent = '「出块」成功！nonce = ' + mineNonce.toLocaleString() + '，共算了 ' + mineTries.toLocaleString() + ' 次哈希。而验证它只需要 1 次——这就是第 4 节说的「做起来极难、验起来极易」。提高难度再试，体会指数增长。';
        mineToggle.textContent = '再挖一次';
        mineNonce = 0; mineTries = 0;
        return;
      }
      mineNonce++;
    }
    mineTry.textContent = 'nonce = ' + mineNonce;
    mineHash.textContent = sha256(mineBlock.textContent + '#' + (mineNonce - 1));
    mineCount.textContent = mineTries.toLocaleString() + ' 次';
    mineTimer = setTimeout(mineChunk, 0);
  }

  if (mineToggle) {
    mineToggle.addEventListener('click', function () {
      if (mining) {
        mining = false;
        clearTimeout(mineTimer);
        mineToggle.textContent = '开始挖矿';
        if (mineNote) mineNote.textContent = '已暂停。这就是第 4 节的工作量证明：不断递增 nonce，直到哈希值以足够多的 0 开头。';
        return;
      }
      mining = true;
      mineNonce = 0; mineTries = 0;
      mineHash.classList.remove('found');
      mineToggle.textContent = '暂停';
      if (mineNote) mineNote.textContent = '正在暴力搜索……（难度越大，平均要试的次数呈指数增长：每多一个 0，约 ×16）';
      mineChunk();
    });
    if (mineDifficulty) mineDifficulty.addEventListener('change', function () {
      if (!mining && mineNote) mineNote.textContent = '难度已调整，点「开始挖矿」感受一下指数曲线。';
    });
  }

  /* ---------------- 演示 3：篡改实验室 ---------------- */
  var DIFF = 3;
  var INIT_DATA = [
    '创世区块 · 2026-09-18 · 「小吴乐意翻译版」上线',
    'Alice 支付 1 BTC 给 Bob',
    'Bob 支付 0.5 BTC 给 Carol'
  ];
  var tamperChain = $('tamperChain');
  var tamperNote = $('tamperNote');
  var tamperRemine = $('tamperRemine');
  var tamperReset = $('tamperReset');
  var blocks = [];
  var remineTarget = -1;

  function newBlockSet() {
    blocks = INIT_DATA.map(function (data, i) {
      return { prev: i === 0 ? '00000000' : null, data: data, nonce: 0, hash: '' };
    });
    // 预先挖好初始链
    for (var i = 0; i < blocks.length; i++) {
      if (i > 0) blocks[i].prev = blocks[i - 1].hash;
      mineBlockOnce(i);
    }
    remineTarget = -1;
  }

  function mineBlockOnce(i) {
    var b = blocks[i];
    var prefix = new Array(DIFF + 1).join('0');
    var nonce = 0;
    while (true) {
      var hex = sha256(b.prev + '|' + b.data + '|' + nonce);
      if (hex.slice(0, DIFF) === prefix) { b.nonce = nonce; b.hash = hex; return; }
      nonce++;
    }
  }

  function computeHash(i) {
    var b = blocks[i];
    return sha256(b.prev + '|' + b.data + '|' + b.nonce);
  }

  function validity() {
    // 返回每个块的状态：0 有效 / 1 自己的难度不满足 / 2 前向指针断裂
    var hashes = blocks.map(function (b, i) { return computeHash(i); });
    return hashes.map(function (h, i) {
      if (h.slice(0, DIFF) !== new Array(DIFF + 1).join('0')) return 1;
      if (i > 0 && blocks[i].prev !== hashes[i - 1]) return 2;
      return 0;
    });
  }

  function hlZeros(hex) {
    var m = hex.match(/^0*/);
    var zeros = m ? m[0] : '';
    if (zeros.length >= DIFF) return '<span class="hl">' + zeros + '</span>' + hex.slice(zeros.length);
    return hex;
  }

  function renderTamper() {
    if (!tamperChain) return;
    var st = validity();
    tamperChain.innerHTML = '';
    blocks.forEach(function (b, i) {
      var card = document.createElement('div');
      card.className = 'block-card ' + (st[i] === 0 ? 'valid' : 'broken');
      var head = document.createElement('div');
      head.className = 'block-head';
      head.innerHTML = '<b>区块 #' + i + '</b>';
      var status = document.createElement('span');
      status.className = 'block-status';
      status.textContent = st[i] === 0 ? '✓ 有效' : (st[i] === 1 ? '✕ 难度不满足（记录变了）' : '✕ 指针断裂（前块变了）');
      head.appendChild(status);
      card.appendChild(head);

      var fd = document.createElement('label');
      fd.className = 'block-field';
      fd.innerHTML = '<span>记录（可编辑，试着改一个字）</span>';
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.value = b.data;
      inp.dataset.idx = i;
      inp.addEventListener('input', function () {
        blocks[+inp.dataset.idx].data = inp.value;
        remineTarget = +inp.dataset.idx;
        if (tamperRemine) tamperRemine.disabled = false;
        renderTamper();
      });
      fd.appendChild(inp);
      card.appendChild(fd);

      var hp = document.createElement('div');
      hp.className = 'block-hash';
      hp.textContent = '前块哈希：' + b.prev;
      card.appendChild(hp);

      var h1 = document.createElement('div');
      h1.className = 'block-hash';
      h1.innerHTML = '本块哈希：<span>' + hlZeros(computeHash(i)) + '</span>（nonce = ' + b.nonce.toLocaleString() + '）';
      card.appendChild(h1);

      tamperChain.appendChild(card);
    });
  }

  if (tamperChain) {
    newBlockSet();
    renderTamper();

    if (tamperRemine) {
      tamperRemine.addEventListener('click', function () {
        var st = validity();
        var firstBroken = -1;
        for (var i = 0; i < st.length; i++) { if (st[i] !== 0) { firstBroken = i; break; } }
        if (firstBroken < 0) {
          tamperRemine.disabled = true;
          remineTarget = -1;
          return;
        }
        // 修复下一个坏块：先校正前向指针，再重新寻找满足难度的 nonce
        if (firstBroken > 0) blocks[firstBroken].prev = computeHash(firstBroken - 1);
        mineBlockOnce(firstBroken);
        remineTarget = firstBroken;
        renderTamper();
        st = validity();
        var stillBroken = 0, nextBroken = -1;
        for (i = 0; i < st.length; i++) { if (st[i] !== 0) { if (nextBroken < 0) nextBroken = i; stillBroken++; } }
        if (stillBroken > 0 && tamperNote) {
          tamperNote.textContent = '第 ' + firstBroken + ' 块重挖好了，但链上还有 ' + stillBroken + ' 个坏块——后面每个区块的「前块哈希」都指着旧值。继续点按钮逐个重挖，你会亲手体会到：改动越早的记录，要重挖的区块越多。';
        } else if (tamperNote) {
          tamperNote.textContent = '整条链修复了！你一共重挖了第 ' + remineTarget + ' 块及其后面的所有区块——这正是第 4 节说的「重做其后所有区块的工作量」。在真实网络里，诚实矿工还在不停往前挖，想追上全网算力，几乎不可能。';
          tamperRemine.disabled = true;
          remineTarget = -1;
        }
      });
    }
    if (tamperReset) {
      tamperReset.addEventListener('click', function () {
        newBlockSet();
        renderTamper();
        if (tamperRemine) tamperRemine.disabled = true;
        if (tamperNote) tamperNote.textContent = '已恢复原链。再试试改动某个区块的记录，观察链条如何「报警」。';
      });
    }
  }

  /* ---------------- 演示 4：确认数计算器 ---------------- */
  var qRange = $('qRange');
  var qLabel = $('qLabel');
  var pTarget = $('pTarget');
  var zResult = $('zResult');
  var confirmNote = $('confirmNote');

  // 白皮书第 11 节的公式（与其 C 代码等价）
  function attackerSuccessProb(q, z) {
    var p = 1 - q;
    var lambda = z * (q / p);
    var sum = 1;
    for (var k = 0; k <= z; k++) {
      var poisson = Math.exp(-lambda);
      for (var i = 1; i <= k; i++) poisson *= lambda / i;
      sum -= poisson * (1 - Math.pow(q / p, z - k));
    }
    return sum;
  }

  function requiredConfirmations(q, targetP) {
    for (var z = 1; z <= 1000; z++) {
      if (attackerSuccessProb(q, z) < targetP) return z;
    }
    return -1;
  }

  function updateConfirm() {
    if (!qRange || !zResult) return;
    var q = parseInt(qRange.value, 10) / 100;
    var target = parseFloat(pTarget.value) / 100;
    qLabel.textContent = qRange.value + '%';
    var z = requiredConfirmations(q, target);
    zResult.textContent = z < 0 ? '1000+' : z;
    var pct = (q * 100).toFixed(0);
    if (z < 0) {
      confirmNote.textContent = '在攻击者占 ' + pct + '% 算力的情况下，1000 个确认内都压不到目标线——越接近 50%，等待时间暴涨，这就是「51% 攻击」名字的由来。';
    } else {
      confirmNote.textContent = '攻击者占 ' + pct + '% 算力时，等 ' + z + ' 个确认，其翻盘概率即低于 ' + (target * 100) + '%——按白皮书第 11 节的泊松公式实时算出。q=10% 时取 5，与论文的表完全一致。';
    }
  }
  if (qRange) {
    qRange.addEventListener('input', updateConfirm);
    if (pTarget) pTarget.addEventListener('change', updateConfirm);
    updateConfirm();
  }
})();
