/**
 * btchao.com 全站统一页脚注入脚本（v2）
 * 设计基准：ahr-dca 页脚 —— 品牌块 + 三张关联卡片（主站 / GitHub / 小吴乐意）
 *           + meta 行 + 版权/赞助行。样式自包含，深浅色主题自适应
 *           （文字继承站点颜色，表面用中性半透明，强调色固定比特币橙）。
 *
 * 用法（在分站 HTML 末尾，挂载点可省略）：
 *   <div id="btc-footer"></div>
 *   <script src="btc-shared/footer.js?v=2"
 *           data-name="AHR999 定投仪表盘"
 *           data-desc="基于官方公式的比特币定投指数与回测工具"
 *           data-repo="lovexw/btchao-mono"
 *           data-meta="<span>自定义 meta 行 HTML（可含 span#footer-updated 等站点钩子）</span>"
 *   ></script>
 *
 * 配置优先级：script 标签 data-* 属性 > window.BTC_FOOTER_CONFIG > 内置默认。
 * data-meta 为站点自有 HTML，按可信内容处理；name/desc/repo 会被转义。
 */
(function () {
  function boot() {
    var script =
      (document.currentScript && document.currentScript.tagName === "SCRIPT")
        ? document.currentScript
        : (function () {
            var all = document.getElementsByTagName("script");
            for (var i = all.length - 1; i >= 0; i--) {
              if (/footer\.js/.test(all[i].src || "")) return all[i];
            }
            return null;
          })();

    function cfg(key, fallback) {
      if (script && script.getAttribute("data-" + key)) return script.getAttribute("data-" + key);
      if (window.BTC_FOOTER_CONFIG && window.BTC_FOOTER_CONFIG[key] != null) {
        return String(window.BTC_FOOTER_CONFIG[key]);
      }
      return fallback;
    }

    var DONATE_ADDR = cfg("addr", "3KLy733p6vQDyaKdEY61iGdQPf9pYt9hPv");
    var DONATE_QR = cfg("qr", "https://tc.xiaowuleyi.com/file/1763893479341_image.png");
    var SITE_NAME = cfg("name", "btchao.com 分站");
    var SITE_DESC = cfg("desc", "");
    var REPO = cfg("repo", "lovexw"); // GitHub 卡：仓库全名或用户名
    var META_HTML = cfg("meta", ""); // 站点自定义 meta 行（原始 HTML）
    var REPO_URL = "https://github.com/" + REPO;

    var host = document.getElementById("btc-footer");
    if (!host) {
      host = document.createElement("div");
      host.id = "btc-footer";
      document.body.appendChild(host);
    }
    if (host.firstChild) return; // 已渲染过（SPA 场景防重复）

    // 官方标准比特币 Logo（橙圆 + 白 ₿，bitcoin-brand-kit/assets/logos/bitcoin.svg）
    var LOGO_SVG =
      '<svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true"><g transform="translate(0.00630876,-0.00301984)">' +
      '<path fill="#f7931a" d="m63.033,39.744c-4.274,17.143-21.637,27.576-38.782,23.301-17.138-4.274-27.571-21.638-23.295-38.78,4.272-17.145,21.635-27.579,38.775-23.305,17.144,4.274,27.576,21.64,23.302,38.784z"/>' +
      '<path fill="#FFF" d="m46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-0.875-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653-3.509-0.875-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018-4.842-1.209-0.934,3.75s2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834,0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019,4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834,3.507,0.875,1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745,3.511,0.875,1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739,1.527-4.36-0.076-6.875-3.226-8.515,2.294-0.529,4.022-2.038,4.483-5.155zm-8.022,11.249c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729c2.38,0.594,10.012,1.77,8.878,6.317zm1.086-11.312c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.01c1.982,0.494,8.365,1.416,7.334,5.553z"/>' +
      "</g></svg>";

    // 官方 ₿ 字形（白色 B 部分，随容器颜色着色）
    var B_GLYPH =
      '<svg viewBox="12 8 40 48" fill="currentColor" aria-hidden="true"><path d="m46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-0.875-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653-3.509-0.875-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018-4.842-1.209-0.934,3.75s2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834,0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019,4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834,3.507,0.875,1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745,3.511,0.875,1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739,1.527-4.36-0.076-6.875-3.226-8.515,2.294-0.529,4.022-2.038,4.483-5.155zm-8.022,11.249c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729c2.38,0.594,10.012,1.77,8.878,6.317zm1.086-11.312c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.01c1.982,0.494,8.365,1.416,7.334,5.553z"/></svg>';

    var GITHUB_SVG =
      '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';

    function esc(s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    }

    function fcard(href, iconHtml, title, sub) {
      return (
        '<a class="btcft-card" href="' + href + '" target="_blank" rel="noopener">' +
        '<span class="btcft-icon" aria-hidden="true">' + iconHtml + "</span>" +
        '<span class="btcft-card-text"><b>' + esc(title) + "</b><i>" + esc(sub) + "</i></span>" +
        '<span class="btcft-arrow" aria-hidden="true">\u2197</span>' +
        "</a>"
      );
    }

    var year = new Date().getFullYear();
    var metaRow = META_HTML
      ? META_HTML
      : "\u672c\u7ad9\u5185\u5bb9\u4ec5\u4f9b\u5b66\u4e60\u4e0e\u7814\u7a76\uff0c\u4e0d\u6784\u6210\u4efb\u4f55\u6295\u8d44\u5efa\u8bae\uff1b\u6bd4\u7279\u5e01\u6709\u98ce\u9669\uff0c\u51b3\u7b56\u9700\u72ec\u7acb\u5224\u65ad\u3002";

    host.innerHTML =
      '<style>' +
      '.btcft{margin-top:48px;border-top:1px solid rgba(127,127,127,.22);' +
      'background:linear-gradient(180deg,transparent,rgba(127,127,127,.06) 46%);' +
      'color:inherit;font-family:inherit;}' +
      '.btcft-in{max-width:1180px;margin:0 auto;padding:30px 20px 14px;}' +
      '.btcft-top{display:flex;justify-content:space-between;align-items:center;gap:26px;flex-wrap:wrap;}' +
      '.btcft-brand{display:flex;gap:12px;align-items:flex-start;max-width:420px;}' +
      '.btcft-brand svg{flex:none;margin-top:2px;}' +
      '.btcft-brand b{font-size:15px;display:block;}' +
      '.btcft-brand p{font-size:13px;opacity:.66;margin:3px 0 0;line-height:1.6;}' +
      '.btcft-cards{display:grid;grid-template-columns:repeat(3,minmax(188px,226px));gap:12px;}' +
      '.btcft-card{display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:14px;' +
      'border:1px solid rgba(127,127,127,.22);background:rgba(127,127,127,.06);' +
      'text-decoration:none;color:inherit;' +
      'transition:transform .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease;}' +
      '.btcft-card:hover{transform:translateY(-2px);border-color:rgba(247,147,26,.5);' +
      'background:rgba(247,147,26,.1);box-shadow:0 6px 18px rgba(247,147,26,.16);}' +
      '.btcft-icon{width:34px;height:34px;flex:none;border-radius:10px;display:grid;place-items:center;' +
      'background:rgba(247,147,26,.14);color:var(--btc-orange,#f7931a);font-weight:700;font-size:16px;}' +
      '.btcft-icon svg{width:17px;height:17px;}' +
      '.btcft-card-text{display:flex;flex-direction:column;line-height:1.35;min-width:0;}' +
      '.btcft-card-text b{font-size:13.5px;font-weight:600;white-space:nowrap;}' +
      '.btcft-card-text i{font-style:normal;font-size:11.5px;opacity:.6;font-variant-numeric:tabular-nums;' +
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
      '.btcft-arrow{margin-left:auto;opacity:.6;font-size:13px;' +
      'transition:transform .22s ease,color .22s ease;}' +
      '.btcft-card:hover .btcft-arrow{transform:translate(2px,-2px);color:var(--btc-orange,#f7931a);opacity:1;}' +
      '.btcft-meta{border-top:1px solid rgba(127,127,127,.18);margin-top:24px;padding:14px 0 10px;' +
      'font-size:12.5px;opacity:.66;display:flex;gap:8px;flex-wrap:wrap;align-items:center;' +
      'font-variant-numeric:tabular-nums;}' +
      '.btcft-meta .dot{opacity:.5;}' +
      '.btcft-bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;' +
      'border-top:1px solid rgba(127,127,127,.18);margin-top:4px;padding:12px 0 2px;font-size:12.5px;opacity:.8;}' +
      '.btcft-donate{display:flex;align-items:center;gap:8px;min-width:0;}' +
      '.btcft-addr{cursor:pointer;font-size:12px;word-break:break-all;font-family:ui-monospace,Menlo,Consolas,monospace;}' +
      '.btcft-qr{border-radius:6px;vertical-align:middle;flex:none;}' +
      '.btcft a{color:inherit;}' +
      '@media (max-width:900px){' +
      '.btcft-top{flex-direction:column;align-items:stretch;}' +
      '.btcft-brand{max-width:none;}' +
      '.btcft-cards{grid-template-columns:repeat(auto-fit,minmax(200px,1fr));}}' +
      "</style>" +
      '<footer class="btcft"><div class="btcft-in">' +
      '<div class="btcft-top">' +
      '<div class="btcft-brand">' + LOGO_SVG +
      "<div><b>" + esc(SITE_NAME) + "</b>" +
      (SITE_DESC ? "<p>" + esc(SITE_DESC) + "</p>" : "") +
      "</div></div>" +
      '<nav class="btcft-cards" aria-label="\u76f8\u5173\u7ad9\u70b9">' +
      fcard("https://www.btchao.com", B_GLYPH, "\u6bd4\u7279\u56e4\u5e01\u4e3b\u7ad9", "www.btchao.com") +
      fcard(REPO_URL, GITHUB_SVG, "GitHub \u4ed3\u5e93", REPO) +
      fcard("https://www.xiaowuleyi.com/", "\u4e50", "\u5c0f\u5434\u4e50\u610f\u4e3b\u9875", "www.xiaowuleyi.com") +
      "</nav></div>" +
      '<div class="btcft-meta">' + metaRow + "</div>" +
      '<div class="btcft-bottom">' +
      "<span>\u00a9 " + year + " btchao.com \u00b7 \u5c0f\u5434\u4e50\u610f</span>" +
      '<span class="btcft-donate">\u8d5e\u52a9\uff1a' +
      '<code class="btcft-addr" title="\u70b9\u51fb\u590d\u5236">' + esc(DONATE_ADDR) + "</code>" +
      '<img class="btcft-qr" src="' + esc(DONATE_QR) + '" alt="BTC \u8d5e\u52a9\u4e8c\u7ef4\u7801" width="44" height="44" loading="lazy" decoding="async"/>' +
      "</span></div>" +
      "</div></footer>";

    var addrEl = host.querySelector(".btcft-addr");
    if (addrEl) {
      addrEl.addEventListener("click", function () {
        var done = function () {
          var old = addrEl.title;
          addrEl.title = "\u2713 \u5df2\u590d\u5236";
          setTimeout(function () { addrEl.title = old; }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(DONATE_ADDR).then(done, function () {});
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
