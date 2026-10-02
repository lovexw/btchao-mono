// [优先级 1] 移动设备和浏览器检测工具 - 核心功能
window.mobileUtil = (function(win, doc) {
    const UA = navigator.userAgent,
    isAndroid = /android|adr/gi.test(UA),
    isIOS = /iphone|ipod|ipad/gi.test(UA) && !(/android|adr/gi.test(UA)),
    isBlackBerry = /BlackBerry/i.test(UA),
    isWindowPhone = /IEMobile/i.test(UA),
    isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone;
    return {
        isAndroid: isAndroid,
        isIOS: isIOS,
        isMobile: isMobile,
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: /QQ/gi.test(UA)
    };
})(window, document);

// [优先级 2] 检测微信浏览器 - 安全提示展示
function isWeChatBrowser() {
    return window.mobileUtil.isWeixin;
}

// [优先级 3] 显示微信浏览器警告 - UI提示
function showWeChatWarning() {
    const warningElement = document.getElementById('wechat-warning');
    if (warningElement) {
        warningElement.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        updateWarningContent();
    }
}

// [优先级 4] 根据平台更新警告内容 - 平台适配
function updateWarningContent() {
    const stepText2 = document.querySelector('.step:nth-child(2) .step-text');
    if (stepText2) {
        if (mobileUtil.isIOS) {
            stepText2.innerHTML = '选择 <strong>「在Safari中打开」</strong>';
        } else if (mobileUtil.isAndroid) {
            stepText2.innerHTML = '选择 <strong>「在浏览器中打开」</strong>';
        }
    }
}

// [优先级 5] 关闭警告提示 - 用户交互
function closeWarning() {
    const warningElement = document.getElementById('wechat-warning');
    if (warningElement) {
        warningElement.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// [优先级 6] 复制当前网址 - 用户功能
function copyCurrentUrl(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const currentUrl = window.location.href;
    const toastElement = document.getElementById('copy-toast');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                showCopySuccessToast(toastElement);
            })
            .catch((err) => {
                fallbackCopyTextToClipboard(currentUrl, toastElement);
            });
    } else {
        fallbackCopyTextToClipboard(currentUrl, toastElement);
    }
}

// [优先级 7] 传统复制方法 - 兼容性支持
function fallbackCopyTextToClipboard(text, toastElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful && toastElement) {
            showCopySuccessToast(toastElement);
        } else if (!successful) {
            console.error('复制失败');
        }
    } catch (err) {
        console.error('复制出错:', err);
    }
    
    document.body.removeChild(textArea);
}

// [优先级 8] 显示复制成功提示 - 用户反馈
function showCopySuccessToast(toastElement) {
    if (toastElement) {
        toastElement.classList.remove('hidden');
        setTimeout(() => {
            toastElement.classList.add('hidden');
        }, 3000);
    }
}

// [优先级 9] 配置：iOS微信跳转服务URL - 可选配置
const IOS_JUMP_SERVICE_URL = "";

// [优先级 10] 继续访问 - 尝试跳转到系统浏览器 - 核心跳转逻辑
function continueToVisit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const currentUrl = window.location.href;
    
    if (mobileUtil.isWeixin) {
        if (mobileUtil.isIOS) {
            // iOS微信：尝试跳转到中间服务或提示用户
            if (IOS_JUMP_SERVICE_URL) {
                // 如果配置了跳转服务，使用它
                const jumpUrl = IOS_JUMP_SERVICE_URL + encodeURIComponent(currentUrl);
                window.location.href = jumpUrl;
            } else {
                // 否则，尝试通过Universal Link或提示用户
                // 创建一个临时链接尝试打开Safari
                const tempLink = document.createElement('a');
                tempLink.href = currentUrl;
                tempLink.target = '_blank';
                tempLink.rel = 'noopener noreferrer';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                
                // 显示提示
                setTimeout(() => {
                    alert('请点击右上角「···」菜单，选择「在Safari中打开」');
                }, 500);
            }
            
            // iOS也自动复制链接，方便用户手动粘贴
            copyUrlSilently(currentUrl);
            
        } else if (mobileUtil.isAndroid) {
            // Android微信：使用intent协议尝试调起Chrome浏览器
            // 这是最可靠的方法，可以直接调起系统默认浏览器或Chrome
            try {
                // 移除协议头，构造intent URL
                const urlWithoutProtocol = currentUrl.replace(/^https?:\/\//i, '');
                const scheme = currentUrl.startsWith('https') ? 'https' : 'http';
                
                // 方法1：使用intent协议尝试调起Chrome
                const intentUrl = `intent://${urlWithoutProtocol}#Intent;scheme=${scheme};package=com.android.chrome;end`;
                window.location.href = intentUrl;
                
                // 备用方案：尝试调起系统默认浏览器
                setTimeout(() => {
                    const intentUrlDefault = `intent://${urlWithoutProtocol}#Intent;scheme=${scheme};action=android.intent.action.VIEW;end`;
                    window.location.href = intentUrlDefault;
                }, 800);
                
                // 方法2：尝试使用window.open作为备用
                setTimeout(() => {
                    window.open(currentUrl, '_blank');
                }, 1500);
                
            } catch (err) {
                console.error('Intent调用失败:', err);
            }
            
            // 自动复制链接到剪贴板，方便用户手动粘贴
            copyUrlSilently(currentUrl);
            
            // 延迟提示用户
            setTimeout(() => {
                alert('链接已复制！如未自动打开，请点击右上角「···」菜单，选择「在浏览器中打开」或手动粘贴链接到浏览器访问');
            }, 2000);
        }
    } else {
        // 非微信浏览器，关闭警告
        closeWarning();
    }
}

// [优先级 11] 静默复制URL - 后台功能
function copyUrlSilently(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => {
            fallbackCopyTextToClipboard(url, null);
        });
    } else {
        fallbackCopyTextToClipboard(url, null);
    }
}

// [优先级 12] 页面加载时检测浏览器 - 初始化
document.addEventListener('DOMContentLoaded', function() {
    if (isWeChatBrowser()) {
        showWeChatWarning();
    }

    // 添加卡片点击追踪（可选）
    const cards = document.querySelectorAll('.card:not(.card-placeholder)');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.href) {
                console.log('访问:', this.href);
            }
        });
    });

    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWarning();
        }
    });

    // 点击背景关闭警告（已通过 onclick 处理）
    // 但保持兼容性代码
    const warningElement = document.getElementById('wechat-warning');
    if (warningElement) {
        // 阻止警告内容区域的点击事件冒泡
        const warningContent = warningElement.querySelector('.warning-content');
        if (warningContent) {
            warningContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 直接显示所有卡片（移除懒加载，立即显示所有内容）
    const cardsToShow = document.querySelectorAll('.card');
    cardsToShow.forEach((card, index) => {
        // 直接设置卡片为可见状态
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    });

    // 性能优化：预加载链接
    const links = document.querySelectorAll('a[href^="https://"]');
    links.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'dns-prefetch';
        prefetchLink.href = new URL(link.href).origin;
        document.head.appendChild(prefetchLink);
    });
});

// 添加网络状态监测（可选）
window.addEventListener('online', function() {
    console.log('网络连接已恢复');
});

// 添加网络状态监测（可选）
window.addEventListener('offline', function() {
    console.log('网络连接已断开');
});

// === 修改开始：注销 Service Worker 以解决缓存不更新问题 ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // 不再注册 register，而是获取现有的 registrations 并注销
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister().then(function(boolean) {
                    if(boolean) {
                        console.log('ServiceWorker 已成功注销 (Unregistered)，下次访问将直接获取最新内容');
                        // 可选：注销成功后强制刷新一次页面，确保用户立即看到新版
                        // window.location.reload(); 
                    }
                });
            }
        });
    });
}
// === 修改结束 ===

// ===== 比特币地址查询功能 =====
function searchBTCAddress() {
    const input = document.getElementById('btc-address-input');
    const address = input.value.trim();
    
    if (!address) {
        alert('请输入比特币地址');
        input.focus();
        return;
    }
    
    if (!validateBTCAddress(address)) {
        alert('请输入有效的比特币地址\n\n支持的地址格式：\n- Legacy (以1开头)\n- SegWit (以3开头)\n- Native SegWit/Bech32 (以bc1开头)');
        input.focus();
        input.select();
        return;
    }
    
    const mempoolUrl = `https://mempool.space/address/${address}`;
    window.open(mempoolUrl, '_blank', 'noopener,noreferrer');
}

function validateBTCAddress(address) {
    if (!address || typeof address !== 'string') {
        return false;
    }
    
    const legacy = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const segwit = /^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const bech32 = /^(bc1|tb1)[a-z0-9]{25,87}$/i;
    
    return legacy.test(address) || segwit.test(address) || bech32.test(address);
}

document.addEventListener('DOMContentLoaded', function() {
    const addressInput = document.getElementById('btc-address-input');
    if (addressInput) {
        addressInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchBTCAddress();
            }
        });
    }
});

// ===== 赞助支持功能 =====
function copySponsorAddress() {
    // 优先使用底部的新地址元素
    const bottomAddressElement = document.querySelector('.sponsor-address-bottom');
    const topAddressElement = document.querySelector('.sponsor-address');
    
    const addressElement = bottomAddressElement || topAddressElement;
    const address = addressElement ? addressElement.getAttribute('data-address') : '3KLy733p6vQDyaKdEY61iGdQPf9pYt9hPv';
    
    // 优先使用底部的新 toast 元素
    const bottomToastElement = document.getElementById('sponsor-copy-toast-bottom');
    const topToastElement = document.getElementById('sponsor-copy-toast');
    const toastElement = bottomToastElement || topToastElement;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address)
            .then(() => {
                showSponsorCopyToast(toastElement);
            })
            .catch((err) => {
                fallbackCopySponsorAddress(address, toastElement);
            });
    } else {
        fallbackCopySponsorAddress(address, toastElement);
    }
}

function fallbackCopySponsorAddress(text, toastElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful && toastElement) {
            showCopySuccessToast(toastElement);
        } else if (!successful) {
            console.error('复制失败');
        }
    } catch (err) {
        console.error('复制出错:', err);
    }
    
    document.body.removeChild(textArea);
}

function showSponsorCopyToast(toastElement) {
    if (toastElement) {
        toastElement.classList.remove('hidden');
        setTimeout(() => {
            toastElement.classList.add('hidden');
        }, 2500);
    }
}

// ===== 比特币汇率及计算器功能 =====
let btcToUsd = 0;
let btcToCny = 0;
let lastSource = 'btc';
let usdToCnyRate = 0; // 0 表示尚未获取到真实汇率
let lastPriceSourceName = '';
const USD_CNY_FALLBACK = 7.20;

// 带 6 秒超时的 fetch，避免单个行情源卡住整个页面
function fetchWithTimeout(url, ms = 6000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

// 美元兑人民币汇率：免费汇率接口，失败时用估算值兜底
async function fetchUsdCnyRate() {
    try {
        const response = await fetchWithTimeout('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        if (data && data.rates && data.rates.CNY > 5 && data.rates.CNY < 10) {
            usdToCnyRate = data.rates.CNY;
            // 汇率晚于价格到达时，立即用真实汇率重算 CNY 展示与计算器
            if (btcToUsd > 0 && lastPriceSourceName !== 'CoinGecko') {
                btcToCny = btcToUsd * usdToCnyRate;
                updatePriceDisplay();
                if (!document.activeElement || !['calc-btc', 'calc-cny', 'calc-usd'].includes(document.activeElement.id)) {
                    updateCalculatorValues(lastSource);
                }
            }
        }
    } catch (error) {
        if (!usdToCnyRate) usdToCnyRate = USD_CNY_FALLBACK;
    }
}

// 行情源按国内可达性优先排序：OKX / HTX 国内可直连，Gate / Binance / CoinGecko 兜底
const PRICE_SOURCES = [
    {
        name: 'OKX',
        getUsd: async () => {
            const r = await fetchWithTimeout('https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT');
            const d = await r.json();
            const px = parseFloat(d && d.data && d.data[0] && d.data[0].last);
            if (!px) throw new Error('bad data');
            return px;
        }
    },
    {
        name: 'HTX',
        getUsd: async () => {
            const r = await fetchWithTimeout('https://api.htx.com/market/detail/merged?symbol=btcusdt');
            const d = await r.json();
            const px = parseFloat(d && d.tick && d.tick.close);
            if (!px) throw new Error('bad data');
            return px;
        }
    },
    {
        name: 'Gate',
        getUsd: async () => {
            const r = await fetchWithTimeout('https://api.gateio.ws/api/v4/spot/tickers?currency_pair=BTC_USDT');
            const d = await r.json();
            const px = parseFloat(d && d[0] && d[0].last);
            if (!px) throw new Error('bad data');
            return px;
        }
    },
    {
        name: 'Binance',
        getUsd: async () => {
            const r = await fetchWithTimeout('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
            const d = await r.json();
            const px = parseFloat(d.price);
            if (!px) throw new Error('bad data');
            return px;
        }
    },
    {
        // CoinGecko 直接返回 USD 与 CNY 两种计价，作为最终兜底
        name: 'CoinGecko',
        getUsd: async () => {
            const r = await fetchWithTimeout('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,cny');
            const d = await r.json();
            const usd = d && d.bitcoin && d.bitcoin.usd;
            if (!usd) throw new Error('bad data');
            if (d.bitcoin.cny) btcToCny = d.bitcoin.cny;
            return usd;
        }
    }
];

async function fetchBtcPrice() {
    // 汇率未获取时异步补拉（失败不影响行情展示，用估算值）
    if (!usdToCnyRate) {
        fetchUsdCnyRate();
    }

    for (const source of PRICE_SOURCES) {
        try {
            const usd = await source.getUsd();
            btcToUsd = usd;
            lastPriceSourceName = source.name;
            // 非 CoinGecko 源只返回 USD 价，CNY 用实时汇率换算
            if (source.name !== 'CoinGecko') {
                btcToCny = usd * (usdToCnyRate || USD_CNY_FALLBACK);
            }

            if (!document.activeElement || !['calc-btc', 'calc-cny', 'calc-usd'].includes(document.activeElement.id)) {
                updateCalculatorValues(lastSource);
            }
            updatePriceDisplay();
            return;
        } catch (error) {
            console.warn(`行情源 ${source.name} 失败，切换下一个`);
        }
    }
    console.error('所有行情源均失效，保留上次显示的价格');
}

function parseValue(val) {
    if (val === null || val === undefined || val === '') return null;
    const cleaned = val.toString().replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
}

function updatePriceDisplay() {
    const cnyDisplay = document.getElementById('btc-price-cny');
    const usdDisplay = document.getElementById('btc-price-usd');
    const timeElement = document.getElementById('price-update-time');
    
    // 显示 1 BTC 的价格
    if (cnyDisplay && btcToCny > 0) {
        cnyDisplay.innerText = "¥" + btcToCny.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
    
    if (usdDisplay && btcToUsd > 0) {
        usdDisplay.innerText = "$" + btcToUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    if (timeElement) {
        timeElement.innerText = lastPriceSourceName
            ? `${new Date().toLocaleTimeString()} · ${lastPriceSourceName}`
            : new Date().toLocaleTimeString();
    }

    // 周期模块的回撤/价格差值随行情同步刷新
    updateCycleLiveStats();
}

function updateCalculatorValues(source) {
    const btcInput = document.getElementById('calc-btc');
    const cnyInput = document.getElementById('calc-cny');
    const usdInput = document.getElementById('calc-usd');
    
    if (!btcInput || !cnyInput || !usdInput || btcToUsd === 0) return;
    lastSource = source;

    if (source === 'btc') {
        const btcValue = parseValue(btcInput.value);
        if (btcValue === null) {
            cnyInput.value = '';
            usdInput.value = '';
        } else {
            cnyInput.value = (btcValue * btcToCny).toFixed(2);
            usdInput.value = (btcValue * btcToUsd).toFixed(2);
        }
    } else if (source === 'cny') {
        const cnyValue = parseValue(cnyInput.value);
        if (cnyValue === null) {
            btcInput.value = '';
            usdInput.value = '';
        } else {
            const btcValue = cnyValue / btcToCny;
            btcInput.value = btcValue.toFixed(8).replace(/\.?0+$/, '');
            usdInput.value = (btcValue * btcToUsd).toFixed(2);
        }
    } else if (source === 'usd') {
        const usdValue = parseValue(usdInput.value);
        if (usdValue === null) {
            btcInput.value = '';
            cnyInput.value = '';
        } else {
            const btcValue = usdValue / btcToUsd;
            btcInput.value = btcValue.toFixed(8).replace(/\.?0+$/, '');
            cnyInput.value = (btcValue * btcToCny).toFixed(2);
        }
    }
    
    updatePriceDisplay();
}

function initExchangeRate() {
    const btcInput = document.getElementById('calc-btc');
    const cnyInput = document.getElementById('calc-cny');
    const usdInput = document.getElementById('calc-usd');
    
    const inputs = [btcInput, cnyInput, usdInput];
    inputs.forEach(input => {
        if (!input) return;
        
        // 当获得焦点时，点击全选
        input.addEventListener('focus', () => {
            input.select();
        });
        
        input.addEventListener('input', () => {
            const source = input.id.replace('calc-', '');
            updateCalculatorValues(source);
        });
    });
    
    // 初始化时如果 BTC 为空，设为 1
    if (btcInput && btcInput.value === '') {
        btcInput.value = '1';
    }
    
    fetchBtcPrice();
    setInterval(fetchBtcPrice, 60000);
}

// ===== 市场情绪与宏观指标（恐惧贪婪指数 + 美元指数） =====
const FNG_CACHE_KEY = 'btchao_fng_cache_v1';
const DXY_CACHE_KEY = 'btchao_dxy_cache_v1';

// 恐惧贪婪指数分级：英文分类 → 中文标签与配色
const FNG_CLASS_MAP = {
    'Extreme Fear': { label: '极度恐惧', color: '#ff3b30', bg: 'rgba(255, 59, 48, 0.10)' },
    'Fear':         { label: '恐惧',     color: '#ff7a45', bg: 'rgba(255, 122, 69, 0.12)' },
    'Neutral':      { label: '中性',     color: '#e8930c', bg: 'rgba(232, 147, 12, 0.12)' },
    'Greed':        { label: '贪婪',     color: '#52c41a', bg: 'rgba(82, 196, 26, 0.12)' },
    'Extreme Greed':{ label: '极度贪婪', color: '#00b578', bg: 'rgba(0, 181, 120, 0.12)' }
};

function readIndicatorCache(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        return null;
    }
}

function writeIndicatorCache(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // 隐私模式等场景下写入失败不影响展示
    }
}

// 恐惧贪婪指数：alternative.me 免费接口（支持跨域），每日更新
async function fetchFearGreedIndex() {
    try {
        const response = await fetchWithTimeout('https://api.alternative.me/fng/?limit=10', 8000);
        const data = await response.json();
        const current = data && data.data && data.data[0];
        if (!current || !current.value) throw new Error('bad data');
        const value = parseInt(current.value, 10);
        const meta = FNG_CLASS_MAP[current.value_classification] || FNG_CLASS_MAP.Neutral;
        const prevValue = data.data[1] ? parseInt(data.data[1].value, 10) : null;
        renderFearGreedIndex(value, meta, prevValue);
        writeIndicatorCache(FNG_CACHE_KEY, { value, classification: current.value_classification, prev: prevValue });
    } catch (error) {
        console.warn('恐惧贪婪指数获取失败，尝试备用源');
        // 备用源：仪表盘 overview 接口自带的恐惧贪婪值（数据同为 alternative.me）
        if (lastOverview && lastOverview.fgi && lastOverview.fgi.value) {
            const meta = FNG_CLASS_MAP[lastOverview.fgi.label] || FNG_CLASS_MAP.Neutral;
            renderFearGreedIndex(lastOverview.fgi.value, meta, null);
        }
    }
}

function renderFearGreedIndex(value, meta, prevValue) {
    const valueEl = document.getElementById('fng-value');
    const badgeEl = document.getElementById('fng-badge');
    const markerEl = document.getElementById('fng-marker');
    const metaEl = document.getElementById('fng-meta');
    if (!valueEl || !badgeEl || !markerEl || !metaEl) return;

    valueEl.innerText = value;
    valueEl.style.color = meta.color;
    badgeEl.innerText = meta.label;
    badgeEl.style.color = meta.color;
    badgeEl.style.background = meta.bg;
    badgeEl.style.visibility = 'visible';
    // 标记点按指数值定位，缩进 4% 避免端点被裁切
    markerEl.style.left = Math.min(96, Math.max(4, value)) + '%';
    markerEl.style.borderColor = meta.color;
    metaEl.innerText = prevValue !== null ? `昨日 ${prevValue} · alternative.me` : 'alternative.me';
}

function renderFearGreedFromCache() {
    const cached = readIndicatorCache(FNG_CACHE_KEY);
    if (!cached || !cached.value) return;
    const meta = FNG_CLASS_MAP[cached.classification] || FNG_CLASS_MAP.Neutral;
    renderFearGreedIndex(cached.value, meta, cached.prev !== undefined ? cached.prev : null);
}

// 美元指数：腾讯行情接口返回"全局变量赋值"脚本（v_whUSDX="..."），
// 用 script 标签注入即可拿到数据、绕开跨域限制，且国内直连速度快
function fetchDxyIndex() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const timer = setTimeout(() => {
            cleanup();
            reject(new Error('timeout'));
        }, 6000);

        function cleanup() {
            clearTimeout(timer);
            if (script.parentNode) script.parentNode.removeChild(script);
        }

        script.setAttribute('charset', 'gbk'); // 接口返回 GBK 编码，须在插入前声明
        script.onload = () => {
            try {
                const raw = window.v_whUSDX;
                cleanup();
                if (!raw) throw new Error('no data');
                const fields = raw.split('~');
                // 字段：3=最新价 7=昨收 8=最高 9=最低 13=涨跌幅%
                const price = parseFloat(fields[3]);
                const high = parseFloat(fields[8]);
                const low = parseFloat(fields[9]);
                const changePct = parseFloat(fields[13]);
                if (!price) throw new Error('bad data');
                resolve({ price, high, low, changePct });
            } catch (error) {
                reject(error);
            }
        };
        script.onerror = () => {
            cleanup();
            reject(new Error('network'));
        };
        script.src = 'https://qt.gtimg.cn/q=whUSDX&r=' + Date.now();
        document.head.appendChild(script);
    });
}

function renderDxyIndex(data) {
    const valueEl = document.getElementById('dxy-value');
    const changeEl = document.getElementById('dxy-change');
    const markerEl = document.getElementById('dxy-range-marker');
    const metaEl = document.getElementById('dxy-meta');
    if (!valueEl || !changeEl || !markerEl || !metaEl) return;

    valueEl.innerText = data.price.toFixed(2);

    // 涨跌配色：涨绿跌红，与国际行情惯例一致
    if (data.changePct > 0) {
        changeEl.innerText = '+' + data.changePct.toFixed(2) + '%';
        changeEl.className = 'index-change up';
    } else if (data.changePct < 0) {
        changeEl.innerText = data.changePct.toFixed(2) + '%';
        changeEl.className = 'index-change down';
    } else {
        changeEl.innerText = '0.00%';
        changeEl.className = 'index-change flat';
    }
    changeEl.style.visibility = 'visible';

    // 标记点按现价在日内低-高区间的位置定位，缩进 4% 避免端点被裁切
    let ratio = 0.5;
    if (data.high > data.low) {
        ratio = (data.price - data.low) / (data.high - data.low);
    }
    markerEl.style.left = (4 + Math.min(1, Math.max(0, ratio)) * 92) + '%';
    metaEl.innerText = `日内 ${data.low.toFixed(2)} – ${data.high.toFixed(2)} · 腾讯行情`;
}

async function refreshDxyIndex() {
    try {
        const data = await fetchDxyIndex();
        renderDxyIndex(data);
        writeIndicatorCache(DXY_CACHE_KEY, data);
    } catch (error) {
        console.warn('美元指数获取失败，保留当前显示');
    }
}

function renderDxyFromCache() {
    const cached = readIndicatorCache(DXY_CACHE_KEY);
    if (cached && cached.price) renderDxyIndex(cached);
}

// AHR999 与减半倒计时：来自本站仪表盘 db.btchao.com 的 /api/overview（自带跨域头，边缘缓存 60s）
// 该接口由 btc-dashboard 项目提供，若字段调整需同步本站
const DASHBOARD_OVERVIEW_URL = 'https://db.btchao.com/api/overview';
const AHR_CACHE_KEY = 'btchao_ahr_cache_v1';
const HALVING_CACHE_KEY = 'btchao_halving_cache_v1';
let lastOverview = null; // 兼作恐惧贪婪指数的备用数据源

// AHR999 分区：<0.45 抄底区，0.45-1.2 定投区，>1.2 止盈区
function ahrZone(value) {
    if (value < 0.45) return { label: '抄底区', color: '#00b578', bg: 'rgba(0, 181, 120, 0.12)' };
    if (value <= 1.2) return { label: '定投区', color: '#e8930c', bg: 'rgba(232, 147, 12, 0.12)' };
    return { label: '止盈区', color: '#ff3b30', bg: 'rgba(255, 59, 48, 0.10)' };
}

function renderAhr999(value, dca200) {
    const valueEl = document.getElementById('ahr-value');
    const badgeEl = document.getElementById('ahr-badge');
    const markerEl = document.getElementById('ahr-marker');
    const metaEl = document.getElementById('ahr-meta');
    if (!valueEl || !badgeEl || !markerEl || !metaEl) return;

    const zone = ahrZone(value);
    valueEl.innerText = value;
    valueEl.style.color = zone.color;
    badgeEl.innerText = zone.label;
    badgeEl.style.color = zone.color;
    badgeEl.style.background = zone.bg;
    badgeEl.style.visibility = 'visible';
    // 标记点按数值在 0-2 量程上定位，缩进 4% 避免端点被裁切
    markerEl.style.left = (4 + Math.min(2, Math.max(0, value)) / 2 * 92) + '%';
    markerEl.style.borderColor = zone.color;
    metaEl.innerText = dca200 ? `200日定投成本 $${Math.round(dca200).toLocaleString()}` : 'db.btchao.com';
}

function renderHalving(halving) {
    const valueEl = document.getElementById('halving-value');
    const badgeEl = document.getElementById('halving-badge');
    const fillEl = document.getElementById('halving-fill');
    const metaEl = document.getElementById('halving-meta');
    if (!valueEl || !badgeEl || !fillEl || !metaEl) return;

    valueEl.innerText = `约 ${halving.etaDays} 天`;
    badgeEl.innerText = halving.etaDate;
    badgeEl.style.visibility = 'visible';
    fillEl.style.width = Math.min(100, Math.max(0, halving.epochProgressPct)) + '%';
    metaEl.innerText = `剩 ${halving.blocksLeft.toLocaleString()} 块 · 高度 ${halving.tipHeight.toLocaleString()}`;
}

async function fetchDashboardOverview() {
    try {
        const response = await fetchWithTimeout(DASHBOARD_OVERVIEW_URL, 10000);
        const data = await response.json();
        if (!data || !data.valuation) throw new Error('bad data');
        lastOverview = data;

        if (data.valuation.ahr999) {
            renderAhr999(data.valuation.ahr999, data.valuation.dca200);
            writeIndicatorCache(AHR_CACHE_KEY, { value: data.valuation.ahr999, dca200: data.valuation.dca200 });
        }
        if (data.halving) {
            renderHalving(data.halving);
            writeIndicatorCache(HALVING_CACHE_KEY, data.halving);
        }
    } catch (error) {
        console.warn('AHR999/减半数据获取失败，保留当前显示');
    }
}

function renderAhrFromCache() {
    const cached = readIndicatorCache(AHR_CACHE_KEY);
    if (cached && cached.value) renderAhr999(cached.value, cached.dca200);
}

function renderHalvingFromCache() {
    const cached = readIndicatorCache(HALVING_CACHE_KEY);
    if (cached && cached.etaDays) renderHalving(cached);
}

function initMarketIndicators() {
    // 优先用上次数据立即渲染，再异步刷新，避免加载期间空白
    renderFearGreedFromCache();
    fetchFearGreedIndex();
    setInterval(fetchFearGreedIndex, 30 * 60 * 1000); // 指数每日更新，30 分钟刷新足够

    renderDxyFromCache();
    refreshDxyIndex();
    setInterval(refreshDxyIndex, 60000); // 与 BTC 行情刷新频率保持一致

    renderAhrFromCache();
    renderHalvingFromCache();
    fetchDashboardOverview();
    setInterval(fetchDashboardOverview, 10 * 60 * 1000); // 指数与区块高度变化慢，10 分钟刷新足够

    initCyclePanel();
    updateCycleLiveStats();
}

// ===== 牛市顶点回归周期模块 =====
// 顶点/回归日期为公认历史事实（日线口径）：2017-12-17 顶 → 2020-12-01 重回前高；
// 2021-11-10 顶 → 2024-03-05 重回前高。2025 顶点价格取 OKX 日线最高（与主站行情源口径一致）。
const CYCLE_SCALE_DAYS = 1100; // 三条轨道共用的时间刻度上限（天），填充长度可直接横向对比
const CYCLES = [
    { name: '2017 周期', topPrice: 19783,  topDate: [2017, 12, 17], recoverDate: [2020, 12, 1] },
    { name: '2021 周期', topPrice: 69000,  topDate: [2021, 11, 10], recoverDate: [2024, 3, 5] },
    { name: '2025 周期', topPrice: 126200, topDate: [2025, 10, 6],  recoverDate: null } // 进行中
];

function cycleTs(dateParts) {
    return Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]);
}

function cycleFmtDate(ts) {
    const t = new Date(ts);
    const pad = (n) => String(n).padStart(2, '0');
    return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}

// 当前周期"按历史节奏回归"的推算：沿用前两轮顶点→重回前高的实际天数
function cyclePredictions(topTs) {
    return CYCLES
        .filter((c) => c.recoverDate)
        .map((c) => {
            const days = Math.round((cycleTs(c.recoverDate) - cycleTs(c.topDate)) / 86400000);
            return { days, ts: topTs + days * 86400000 };
        })
        .sort((a, b) => a.days - b.days);
}

function initCyclePanel() {
    const container = document.getElementById('cycle-rows');
    if (!container) return;

    const current = CYCLES[CYCLES.length - 1];
    const topTs = cycleTs(current.topDate);
    const elapsed = Math.max(0, Math.floor((Date.now() - topTs) / 86400000));
    const nowPct = (Math.min(elapsed, CYCLE_SCALE_DAYS) / CYCLE_SCALE_DAYS * 100).toFixed(1);
    const predictions = cyclePredictions(topTs);

    const historyRows = CYCLES.filter((c) => c.recoverDate).map((c) => {
        const days = Math.round((cycleTs(c.recoverDate) - cycleTs(c.topDate)) / 86400000);
        const pct = (days / CYCLE_SCALE_DAYS * 100).toFixed(1);
        return `
            <div class="cycle-row">
                <div class="cycle-head">
                    <span class="cycle-name">${c.name}</span>
                    <span class="cycle-top">顶点 $${c.topPrice.toLocaleString()} · ${cycleFmtDate(cycleTs(c.topDate))}</span>
                    <span class="cycle-result">${days} 天回归 · ${cycleFmtDate(cycleTs(c.recoverDate))}</span>
                </div>
                <div class="cycle-track"><div class="cycle-fill done" style="width:${pct}%"></div></div>
            </div>`;
    }).join('');

    const currentRow = `
        <div class="cycle-row">
            <div class="cycle-head">
                <span class="cycle-name">${current.name}</span>
                <span class="cycle-top">顶点 $${current.topPrice.toLocaleString()} · ${cycleFmtDate(topTs)}（OKX 日线最高）</span>
                <span class="cycle-result ongoing">已过 ${elapsed.toLocaleString()} 天 · 进行中</span>
            </div>
            <div class="cycle-track">
                <div class="cycle-fill ongoing" style="width:${nowPct}%"></div>
                <div class="cycle-now" style="left:${nowPct}%"></div>
                ${predictions.map((p) => `<div class="cycle-mark" style="left:${(p.days / CYCLE_SCALE_DAYS * 100).toFixed(1)}%"></div>`).join('')}
            </div>
            <p class="cycle-forecast">按历史节奏推算回归窗口：
                <strong>${cycleFmtDate(predictions[0].ts)}</strong>（同 2021 节奏 ${predictions[0].days} 天） ~
                <strong>${cycleFmtDate(predictions[1].ts)}</strong>（同 2017 节奏 ${predictions[1].days} 天）
            </p>
        </div>`;

    container.innerHTML = historyRows + currentRow;
}

// 实时差值：随行情刷新（60s）更新回撤幅度与价格差值
function updateCycleLiveStats() {
    const drawdownEl = document.getElementById('cycle-drawdown');
    const gapEl = document.getElementById('cycle-gap');
    const windowEl = document.getElementById('cycle-window');
    const remainingEl = document.getElementById('cycle-remaining');
    if (!drawdownEl || !gapEl || !windowEl || !remainingEl) return;

    const current = CYCLES[CYCLES.length - 1];
    const topTs = cycleTs(current.topDate);
    const predictions = cyclePredictions(topTs);
    const elapsed = Math.max(0, Math.floor((Date.now() - topTs) / 86400000));

    windowEl.innerText = `${cycleFmtDate(predictions[0].ts).slice(0, 7)} ~ ${cycleFmtDate(predictions[1].ts).slice(0, 7)}`;
    remainingEl.innerText = `约 ${(predictions[0].days - elapsed).toLocaleString()} ~ ${(predictions[1].days - elapsed).toLocaleString()} 天`;

    // 价格相关差值依赖实时行情，未取到前显示占位
    if (!btcToUsd) {
        drawdownEl.innerText = '--';
        gapEl.innerText = '--';
        return;
    }
    const drawdownPct = (btcToUsd / current.topPrice - 1) * 100;
    drawdownEl.innerText = (drawdownPct > 0 ? '+' : '') + drawdownPct.toFixed(1) + '%';
    drawdownEl.classList.toggle('down', drawdownPct < 0);
    const gap = current.topPrice - btcToUsd;
    gapEl.innerText = gap > 0 ? `还差 $${Math.round(gap).toLocaleString()}` : '已重回顶点 ✓';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initExchangeRate();
        initMarketIndicators();
    });
} else {
    setTimeout(() => {
        initExchangeRate();
        initMarketIndicators();
    }, 100);
}

// ============================================================
// 神秘暗号入口（彩蛋）
// 暗号与答对后跳转的隐藏页都在这里改；SECRET_URL 留空则提示建设中
// ============================================================
const SECRET_CODE = 'satoshi';
const SECRET_URL = 'https://1a1zp1ep5qgefi2dmptftl5slmv7divfna.com';

function showSecretFeedback(msg, ok) {
    const el = document.getElementById('secret-error');
    const input = document.getElementById('secret-code-input');
    if (el) {
        el.textContent = msg;
        el.classList.toggle('show', true);
        el.classList.toggle('ok', !!ok);
    }
    if (input) {
        input.classList.remove('secret-shake');
        void input.offsetWidth; // 重新触发抖动动画
        input.classList.add('secret-shake');
        input.focus();
        input.select();
    }
}

function unlockSecret() {
    const input = document.getElementById('secret-code-input');
    if (!input) return;
    const value = (input.value || '').trim();
    if (!value) {
        showSecretFeedback('先输入暗号，再解锁');
        return;
    }
    if (value.toLowerCase() === SECRET_CODE.toLowerCase()) {
        if (SECRET_URL) {
            const el = document.getElementById('secret-error');
            if (el) el.classList.remove('show');
            window.open(SECRET_URL, '_blank', 'noopener');
        } else {
            showSecretFeedback('暗号正确！但隐藏入口还在建设中…', true);
        }
    } else {
        showSecretFeedback('暗号不对，再想想…');
    }
}
