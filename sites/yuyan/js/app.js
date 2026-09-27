// ==================================================================
// 比特币价格预测归档 — App
// ==================================================================

const YEAR_ORDER = ["2025", "2026", "2027", "2028", "2029", "2030+", "长期", "观点"];

const SENTIMENT = {
    bullish: { text: "看涨", emoji: "📈" },
    bearish: { text: "看跌", emoji: "📉" },
    neutral: { text: "中性", emoji: "➡️" }
};

const state = {
    all: [],
    search: "",
    sentiment: "all",
    year: "all",
    sort: "date-desc",
    livePrice: null
};

// ---------- 工具 ----------
const $ = (id) => document.getElementById(id);

function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function formatUsd(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
}

function formatDate(dateString) {
    const d = new Date(dateString + (dateString.length === 10 ? "T00:00:00" : ""));
    if (isNaN(d)) return dateString;
    return d.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

function avatarText(name) {
    const s = String(name || "₿").trim();
    const cjk = s.match(/[\u4e00-\u9fa5]/);
    if (cjk) return cjk[0];
    const words = s.split(/[\s·]+/).filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return s.slice(0, 2).toUpperCase();
}

function effectivePrice(p) {
    if (Array.isArray(p.priceRange) && p.priceRange.length === 2) return (p.priceRange[0] + p.priceRange[1]) / 2;
    return typeof p.targetPrice === "number" ? p.targetPrice : null;
}

function priceDisplay(p) {
    if (Array.isArray(p.priceRange) && p.priceRange.length === 2) {
        return { cls: "price-range", text: `${formatUsd(p.priceRange[0])} — ${formatUsd(p.priceRange[1])}` };
    }
    if (typeof p.targetPrice === "number") {
        return { cls: "", text: formatUsd(p.targetPrice) };
    }
    return { cls: "price-opinion", text: "观点 / 无具体目标价" };
}

// ---------- 初始化 ----------
document.addEventListener("DOMContentLoaded", async () => {
    initializeTheme();
    await loadPredictions();
    initializeEventListeners();
    renderYearChips();
    renderChart();
    filterAndRender();
    updateHeroStats();
    loadBitcoinPrice();
    setInterval(loadBitcoinPrice, 60000);
});

// ---------- 数据加载 ----------
async function loadPredictions() {
    try {
        const res = await fetch("data/predictions.json", { cache: "no-cache" });
        const data = await res.json();
        state.all = data.predictions || [];
        $("lastUpdated").textContent = `最后更新: ${new Date().toLocaleDateString("zh-CN")}`;
    } catch (err) {
        console.error("加载数据失败:", err);
        $("predictionsContainer").innerHTML =
            '<div class="no-results">⚠️ 数据加载失败，请刷新页面重试</div>';
    }
}

// ---------- 实时价格（主源 + 兜底） ----------
async function fetchWithTimeout(url, ms = 8000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
        return await fetch(url, { signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }
}

async function loadBitcoinPrice() {
    let price = null;
    try {
        const res = await fetchWithTimeout("https://ahr999.btchao.com/api/ahr999/latest");
        const data = await res.json();
        if (data && data.currentPrice) price = Number(data.currentPrice);
    } catch (_) { /* 主源失败，走兜底 */ }

    if (!price) {
        try {
            const res = await fetchWithTimeout(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
            );
            const data = await res.json();
            if (data && data.bitcoin && data.bitcoin.usd) price = Number(data.bitcoin.usd);
        } catch (_) { /* 兜底也失败 */ }
    }

    if (price) {
        state.livePrice = price;
        const usd = formatUsd(price);
        $("livePrice").textContent = usd;
        $("navPriceValue").textContent = usd;
        const now = new Date();
        $("priceUpdateTime").textContent = `更新于 ${now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;

        // 距 $100,000 进度
        const pct = Math.min(100, (price / 100000) * 100);
        $("priceProgressBar").style.width = pct.toFixed(1) + "%";
        $("distanceTo100k").textContent = price >= 100000
            ? "已站上六位数 ✓"
            : `还需 +${(((100000 - price) / price) * 100).toFixed(1)}%`;

        renderChart(); // 更新图表中的“当前市价”虚线
    } else {
        $("priceUpdateTime").textContent = "价格获取失败，稍后重试";
    }
}

// ---------- 主题 ----------
function initializeTheme() {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
    renderChart();
}

function updateThemeIcon(theme) {
    const icon = document.querySelector(".theme-icon");
    if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// ---------- 事件 ----------
function initializeEventListeners() {
    $("themeToggle").addEventListener("click", toggleTheme);

    $("searchInput").addEventListener("input", (e) => {
        state.search = e.target.value.trim().toLowerCase();
        filterAndRender();
    });

    $("sortBy").addEventListener("change", (e) => {
        state.sort = e.target.value;
        filterAndRender();
    });

    $("sentimentChips").addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        state.sentiment = chip.dataset.sentiment;
        document.querySelectorAll("#sentimentChips .chip").forEach(c => c.classList.toggle("active", c === chip));
        filterAndRender();
    });

    $("yearChips").addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        setYearFilter(chip.dataset.year);
    });

    // 图表行点击 → 筛选对应年份
    $("yearChart").addEventListener("click", (e) => {
        const row = e.target.closest(".chart-row");
        if (row && row.dataset.year) {
            setYearFilter(row.dataset.year);
            $("predictions").scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

function setYearFilter(year) {
    state.year = state.year === year ? "all" : year;
    document.querySelectorAll("#yearChips .chip").forEach(c =>
        c.classList.toggle("active", c.dataset.year === state.year || (state.year === "all" && c.dataset.year === "all"))
    );
    filterAndRender();
}

// ---------- 分桶统计 ----------
function bucketStats() {
    const map = new Map();
    for (const p of state.all) {
        const year = p.targetYear || "观点";
        if (!map.has(year)) map.set(year, []);
        map.get(year).push(p);
    }
    return YEAR_ORDER
        .filter(y => map.has(y))
        .map(y => {
            const items = map.get(y);
            const priced = items.map(effectivePrice).filter(v => v != null);
            const prices = items.map(p => typeof p.targetPrice === "number" ? p.targetPrice : null).filter(v => v != null);
            let min = Infinity, max = -Infinity;
            for (const p of items) {
                const range = Array.isArray(p.priceRange) ? p.priceRange : [effectivePrice(p)];
                if (range[0] != null) min = Math.min(min, range[0]);
                if (range[range.length - 1] != null) max = Math.max(max, range[range.length - 1]);
            }
            return {
                year: y,
                count: items.length,
                hasPrice: priced.length > 0,
                min: min === Infinity ? null : min,
                max: max === -Infinity ? null : max,
                avg: priced.length ? priced.reduce((a, b) => a + b, 0) / priced.length : null
            };
        });
}

// ---------- 年度筛选 chips ----------
function renderYearChips() {
    const stats = bucketStats();
    const chips = [{ year: "all", label: "全部" }]
        .concat(stats.map(s => ({ year: s.year, label: s.year === "观点" ? "观点类" : s.year })));
    $("yearChips").innerHTML = chips.map(c =>
        `<button class="chip ${c.year === "all" ? "active" : ""}" data-year="${c.year}">${c.label}</button>`
    ).join("");
}

// ---------- 年度目标价图谱（SVG · 对数坐标） ----------
function renderChart() {
    const host = $("yearChart");
    if (!host) return;
    const stats = bucketStats().filter(s => s.hasPrice);
    if (!stats.length) { host.innerHTML = ""; return; }

    const W = 880, labelW = 118, rightW = 148;
    const plotW = W - labelW - rightW;
    const rowH = 62, topPad = 46, axisH = 34;
    const H = topPad + stats.length * rowH + axisH;

    // 对数坐标：5,000 → 50,000,000
    const logMin = Math.log10(5000), logMax = Math.log10(50000000);
    const x = (v) => labelW + ((Math.log10(v) - logMin) / (logMax - logMin)) * plotW;

    const ticks = [
        [10000, "$1万"], [50000, "$5万"], [100000, "$10万"], [500000, "$50万"],
        [1000000, "$100万"], [5000000, "$500万"], [20000000, "$2000万"]
    ];

    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="年度目标价图谱">`;
    svg += `<defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f7931a" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.95"/>
        </linearGradient>
    </defs>`;

    // 网格 + 刻度
    for (const [v, label] of ticks) {
        const gx = x(v);
        svg += `<line x1="${gx}" y1="${topPad - 14}" x2="${gx}" y2="${topPad + stats.length * rowH}" style="stroke:var(--border);stroke-width:1" stroke-dasharray="3 4"/>`;
        svg += `<text x="${gx}" y="${H - 12}" text-anchor="middle" font-size="11" style="fill:var(--text-3)">${label}</text>`;
    }

    // 当前市价虚线
    if (state.livePrice && state.livePrice > 5000 && state.livePrice < 50000000) {
        const px = x(state.livePrice);
        svg += `<line x1="${px}" y1="${topPad - 22}" x2="${px}" y2="${topPad + stats.length * rowH}" style="stroke:var(--bull);stroke-width:1.5" stroke-dasharray="5 4" opacity="0.9"/>`;
        svg += `<text x="${px}" y="${topPad - 28}" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--bull)">当前 ${formatUsd(state.livePrice)}</text>`;
    }

    // 每一行
    stats.forEach((s, i) => {
        const cy = topPad + i * rowH + rowH / 2;
        const xmin = x(Math.max(s.min, 5000));
        const xmax = x(Math.min(s.max, 50000000));

        svg += `<g class="chart-row" data-year="${s.year}">`;
        // 行背景（hover 高亮用）
        svg += `<rect x="0" y="${cy - rowH / 2 + 4}" width="${W}" height="${rowH - 8}" rx="10" style="fill:transparent"/>`;

        // 左侧标签
        svg += `<text x="8" y="${cy - 4}" font-size="15" font-weight="800" style="fill:var(--text)">${s.year === "观点" ? "观点" : s.year}</text>`;
        svg += `<text x="8" y="${cy + 15}" font-size="11" style="fill:var(--text-3)">${s.count} 条预测</text>`;

        // 区间条 / 单点
        if (xmax - xmin < 6) {
            svg += `<circle class="chart-bar" cx="${(xmin + xmax) / 2}" cy="${cy}" r="6" fill="url(#barGrad)" stroke="#f7931a" stroke-width="1.5" opacity="0.95"/>`;
        } else {
            svg += `<rect class="chart-bar" x="${xmin}" y="${cy - 9}" width="${xmax - xmin}" height="18" rx="9" fill="url(#barGrad)" opacity="0.9"/>`;
        }

        // 均值菱形
        if (s.avg) {
            const ax = x(s.avg);
            svg += `<path d="M ${ax} ${cy - 7} L ${ax + 6} ${cy} L ${ax} ${cy + 7} L ${ax - 6} ${cy} Z" fill="var(--bg)" stroke="#f7931a" stroke-width="2"/>`;
        }

        // 右侧范围文本
        svg += `<text x="${W - 8}" y="${cy - 4}" text-anchor="end" font-size="12" font-weight="700" style="fill:var(--text)">${formatUsd(s.min)} – ${formatUsd(s.max)}</text>`;
        svg += `<text x="${W - 8}" y="${cy + 15}" text-anchor="end" font-size="11" style="fill:var(--text-3)">均值 ${s.avg ? formatUsd(s.avg) : "—"}</text>`;
        svg += `</g>`;
    });

    svg += "</svg>";
    host.innerHTML = svg;
}

// ---------- 筛选 + 渲染 ----------
function filterAndRender() {
    const list = state.all.filter(p => {
        const hay = `${p.institution || ""} ${p.person || ""} ${p.role || ""} ${p.content || ""} ${p.targetDate || ""}`.toLowerCase();
        const okSearch = !state.search || hay.includes(state.search);
        const okSent = state.sentiment === "all" || p.sentiment === state.sentiment;
        const okYear = state.year === "all" || (p.targetYear || "观点") === state.year;
        return okSearch && okSent && okYear;
    });

    const dir = state.sort.endsWith("desc") ? -1 : 1;
    const key = state.sort.startsWith("date") ? "date" : "price";
    list.sort((a, b) => {
        if (key === "date") {
            return (new Date(a.date) - new Date(b.date)) * dir;
        }
        const pa = effectivePrice(a), pb = effectivePrice(b);
        if (pa == null && pb == null) return 0;
        if (pa == null) return 1;   // 无价格者排最后
        if (pb == null) return -1;
        return (pa - pb) * dir;
    });

    $("resultCount").textContent = `共 ${list.length} 条记录${state.year !== "all" ? ` · 目标年份 ${state.year}` : ""}`;
    $("predictionsContainer").innerHTML = list.length
        ? list.map((p, i) => createPredictionCard(p, i)).join("")
        : '<div class="no-results">😔 没有匹配的预测记录，换个条件试试</div>';
}

function createPredictionCard(p, index) {
    const s = SENTIMENT[p.sentiment] || SENTIMENT.neutral;
    const price = priceDisplay(p);
    const personLine = p.person
        ? escapeHtml(p.person) + (p.role ? ` · ${escapeHtml(p.role)}` : "")
        : escapeHtml(p.role || "");

    const changeHtml = typeof p.change === "number"
        ? `<span class="change-badge ${p.change >= 0 ? "change-positive" : "change-negative"}">${p.change > 0 ? "+" : ""}${p.change}%</span>`
        : "";

    const yearTag = `<span class="target-year-tag">🎯 ${escapeHtml(p.targetYear || "观点")}</span>`;

    const longTermHtml = p.longTermPrice
        ? `<div class="long-term-prediction"><span>🔭 长期目标</span><b>${formatUsd(p.longTermPrice)}</b><span>（${escapeHtml(p.longTermDate || "")}）</span></div>`
        : "";

    const quoteHtml = p.quoteEn
        ? `<div class="prediction-quote">${escapeHtml(p.quoteEn)}</div>`
        : "";

    const imageHtml = p.imageUrl
        ? `<div class="prediction-image"><img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.institution)} 相关图片" loading="lazy" onclick="openImageModal('${escapeHtml(p.imageUrl)}', '${escapeHtml(p.institution)}')"></div>`
        : "";

    const sourceHtml = p.sourceUrl
        ? `<a href="${escapeHtml(p.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="source-link">查看原文 →</a>`
        : "";

    return `
        <article class="prediction-card sentiment-${p.sentiment}" style="--i:${index % 12}">
            <div class="prediction-header">
                <div class="avatar" data-category="${escapeHtml(p.category || "market")}" aria-hidden="true">${escapeHtml(avatarText(p.institution))}</div>
                <div class="prediction-id-block">
                    <div class="institution-name">${escapeHtml(p.institution)}</div>
                    ${personLine ? `<div class="person-info">${personLine}</div>` : ""}
                </div>
                <div class="header-side">
                    <span class="sentiment-badge sentiment-${p.sentiment}">${s.emoji} ${s.text}</span>
                    <span class="prediction-date">📅 ${formatDate(p.date)}</span>
                </div>
            </div>

            <div class="prediction-price">
                <div class="price-block-main">
                    <span class="price-label">目标价格</span>
                    <span class="price-value ${price.cls}">${price.text}</span>
                    <span class="price-date">预期时间：${escapeHtml(p.targetDate || "—")}</span>
                </div>
                <div class="price-side">
                    ${yearTag}
                    ${changeHtml}
                </div>
            </div>
            ${longTermHtml}

            ${quoteHtml}
            <p class="prediction-content">${escapeHtml(p.content)}</p>
            ${imageHtml}

            <div class="prediction-footer">
                <span class="source-name">来源：${escapeHtml(p.sourceName || "公开报道")}</span>
                ${sourceHtml}
            </div>
        </article>
    `;
}

// ---------- 顶部统计 ----------
function updateHeroStats() {
    const all = state.all;
    if (!all.length) return;

    $("statTotal").textContent = all.length;

    $("statInstitutions").textContent = new Set(all.map(p => p.institution)).size;

    const bulls = all.filter(p => p.sentiment === "bullish").length;
    $("statBullRatio").textContent = Math.round((bulls / all.length) * 100) + "%";

    const y26 = all.filter(p => p.targetYear === "2026").map(effectivePrice).filter(v => v != null).sort((a, b) => a - b);
    if (y26.length) {
        const mid = Math.floor(y26.length / 2);
        const median = y26.length % 2 ? y26[mid] : (y26[mid - 1] + y26[mid]) / 2;
        $("statYear26").textContent = formatUsd(median);
    } else {
        $("statYear26").textContent = "—";
    }
}

// ---------- 图片模态框 ----------
function openImageModal(imageUrl, institution) {
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = `
        <div class="image-modal-overlay" onclick="closeImageModal()"></div>
        <div class="image-modal-content">
            <button class="image-modal-close" onclick="closeImageModal()">×</button>
            <img src="${imageUrl}" alt="相关图片" class="image-modal-img">
            <div class="image-modal-caption">${institution}</div>
        </div>`;
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
    setTimeout(() => modal.classList.add("show"), 10);
    modal.addEventListener("keydown", (e) => { if (e.key === "Escape") closeImageModal(); });
}

function closeImageModal() {
    const modal = document.querySelector(".image-modal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
        setTimeout(() => modal.remove(), 300);
    }
}
