/**
 * btchao.com 全站统一页脚注入脚本
 * 用法（在分站 HTML 末尾）：
 *   <div id="btc-footer"></div>
 *   <script src="https://assets.btchao.com/footer.js?v=1" defer></script>
 * 不放 <div id="btc-footer"> 时会自动追加到 </body> 前。
 */
(function () {
  var host = document.getElementById("btc-footer");
  if (!host) {
    host = document.createElement("div");
    host.id = "btc-footer";
    document.body.appendChild(host);
  }

  // TODO: 替换为你的真实赞助地址（与主站保持一致）
  var DONATE_ADDR = "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  var year = new Date().getFullYear();
  host.innerHTML =
    '<footer style="margin-top:48px;padding:24px 16px;text-align:center;' +
    "color:var(--btc-text-muted,#999);font-size:13px;line-height:2;" +
    'border-top:1px solid var(--btc-border,#EEE);">' +
    '<div><a href="https://btchao.com" style="color:inherit;">\u2190 \u8fd4\u56de btchao.com \u4e3b\u7ad9</a></div>' +
    '<div>\u672c\u7ad9\u5185\u5bb9\u4ec5\u4f9b\u5b66\u4e60\u4e0e\u7814\u7a76\uff0c\u4e0d\u6784\u6210\u4efb\u4f55\u6295\u8d44\u5efa\u8bae\uff1b' +
    "\u6bd4\u7279\u5e01\u6709\u98ce\u9669\uff0c\u51b3\u7b56\u9700\u72ec\u7acb\u5224\u65ad\u3002</div>" +
    '<div>\u8d5e\u52a9\uff1a<code style="font-size:12px;word-break:break-all;">' + DONATE_ADDR + "</code></div>" +
    "<div>\u00a9 " + year + " btchao.com \u00b7 \u5c0f\u5434\u4e50\u610f</div>" +
    "</footer>";
})();
