const CONFIG = {
    TRANSACTIONS_KEY: 'btc_transactions',
    PRICE_API: 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
    FALLBACK_PRICE_API: 'https://ahr999.btchao.com/api/ahr999/latest',
    PRICE_UPDATE_INTERVAL: 60000,
};

let currentBTCPrice = 0;
let currentAhr999 = null;
let priceUpdateTimer = null;
let editingTransactionId = null;

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transaction-date').value = today;

    document.getElementById('transaction-form').addEventListener('submit', handleTransactionSubmit);

    document.getElementById('import-file-input').addEventListener('change', handleFileImport);
    
    setupCalculationListeners();
});

function initApp() {
    updateBTCPrice();
    renderTransactions();
    updateStatistics();
    
    // 定期更新价格
    priceUpdateTimer = setInterval(updateBTCPrice, CONFIG.PRICE_UPDATE_INTERVAL);
}

// 获取比特币实时价格
async function updateBTCPrice() {
    try {
        const response = await fetch(CONFIG.PRICE_API);
        const data = await response.json();
        currentBTCPrice = parseFloat(data.data.amount);
        currentAhr999 = null;
        
        displayPriceAndUpdate(false);
        
        try {
            const ahr999Response = await fetch(CONFIG.FALLBACK_PRICE_API);
            const ahr999Data = await ahr999Response.json();
            currentAhr999 = parseFloat(ahr999Data.ahr999);
            displayAhr999Indicator();
        } catch (ahr999Error) {
            console.error('获取AHR999指数失败:', ahr999Error);
        }
    } catch (error) {
        console.error('主API获取比特币价格失败:', error);
        try {
            const fallbackResponse = await fetch(CONFIG.FALLBACK_PRICE_API);
            const fallbackData = await fallbackResponse.json();
            currentBTCPrice = parseFloat(fallbackData.currentPrice);
            currentAhr999 = parseFloat(fallbackData.ahr999);
            
            displayPriceAndUpdate(true);
            displayAhr999Indicator();
        } catch (fallbackError) {
            console.error('备用API获取比特币价格失败:', fallbackError);
            document.getElementById('btc-price').textContent = '获取失败';
            document.getElementById('price-update').textContent = '请检查网络连接';
        }
    }
}

function displayPriceAndUpdate(isFallback) {
    document.getElementById('btc-price').textContent = `${currentBTCPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
    
    const now = new Date();
    const updateText = isFallback ? `更新时间：${now.toLocaleString('zh-CN')} (备用源)` : `更新时间：${now.toLocaleString('zh-CN')}`;
    document.getElementById('price-update').textContent = updateText;
    
    const priceInput = document.getElementById('transaction-price');
    if (!editingTransactionId && (!priceInput.value || priceInput.value === '0')) {
        priceInput.value = currentBTCPrice.toFixed(2);
    }
    
    updateStatistics();
}

function displayAhr999Indicator() {
    const valueElement = document.getElementById('ahr999-value');
    const tipElement = document.getElementById('ahr999-tip');
    
    if (currentAhr999 === null || isNaN(currentAhr999)) {
        valueElement.textContent = 'AHR999 指数：--';
        tipElement.textContent = '数据获取中...';
        tipElement.className = 'ahr999-tip';
        return;
    }
    
    valueElement.textContent = `AHR999 指数：${currentAhr999.toFixed(4)}`;
    
    let tipText = '';
    let tipClass = 'ahr999-tip';
    
    if (currentAhr999 < 0.45) {
        tipText = '🎯 可以抄底';
        tipClass += ' bottom';
    } else if (currentAhr999 < 0.7) {
        tipText = '✨ 定投好时机';
        tipClass += ' good';
    } else if (currentAhr999 < 1.2) {
        tipText = '📊 可以定投';
        tipClass += ' ok';
    } else {
        tipText = '⏸️ 暂停定投';
        tipClass += ' pause';
    }
    
    tipElement.textContent = tipText;
    tipElement.className = tipClass;
}

function setupCalculationListeners() {
    const priceInput = document.getElementById('transaction-price');
    const amountInput = document.getElementById('transaction-amount');
    const totalInput = document.getElementById('transaction-total');
    
    let lastChanged = null;
    
    priceInput.addEventListener('input', () => {
        lastChanged = 'price';
        calculateFields();
    });
    
    amountInput.addEventListener('input', () => {
        lastChanged = 'amount';
        calculateFields();
    });
    
    totalInput.addEventListener('input', () => {
        lastChanged = 'total';
        calculateFields();
    });
    
    function calculateFields() {
        const price = parseFloat(priceInput.value) || 0;
        const amount = parseFloat(amountInput.value) || 0;
        const total = parseFloat(totalInput.value) || 0;
        
        if (lastChanged === 'total' && price > 0) {
            amountInput.value = (total / price).toFixed(8);
        } else if ((lastChanged === 'price' || lastChanged === 'amount') && (price > 0 || amount > 0)) {
            totalInput.value = (price * amount).toFixed(2);
        }
    }
}

function getTransactions() {
    const data = localStorage.getItem(CONFIG.TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
}

// 保存交易
function saveTransactions(transactions) {
    localStorage.setItem(CONFIG.TRANSACTIONS_KEY, JSON.stringify(transactions));
}

// 添加或更新交易
function handleTransactionSubmit(e) {
    e.preventDefault();

    const transactions = getTransactions();

    if (editingTransactionId) {
        const index = transactions.findIndex(t => t.id === editingTransactionId);
        if (index !== -1) {
            transactions[index] = {
                ...transactions[index],
                type: document.getElementById('transaction-type').value,
                date: document.getElementById('transaction-date').value,
                price: parseFloat(document.getElementById('transaction-price').value),
                amount: parseFloat(document.getElementById('transaction-amount').value),
                note: document.getElementById('transaction-note').value,
            };
        }
        editingTransactionId = null;
        updateFormUI();
    } else {
        const transaction = {
            id: Date.now().toString(),
            type: document.getElementById('transaction-type').value,
            date: document.getElementById('transaction-date').value,
            price: parseFloat(document.getElementById('transaction-price').value),
            amount: parseFloat(document.getElementById('transaction-amount').value),
            note: document.getElementById('transaction-note').value,
            timestamp: Date.now()
        };
        transactions.push(transaction);
    }

    saveTransactions(transactions);

    document.getElementById('transaction-form').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transaction-date').value = today;
    if (currentBTCPrice > 0) {
        document.getElementById('transaction-price').value = currentBTCPrice.toFixed(2);
    }

    renderTransactions();
    updateStatistics();
}

// 编辑交易
function editTransaction(id) {
    const transactions = getTransactions();
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) return;

    editingTransactionId = id;
    
    document.getElementById('transaction-type').value = transaction.type;
    document.getElementById('transaction-date').value = transaction.date;
    document.getElementById('transaction-price').value = transaction.price;
    document.getElementById('transaction-amount').value = transaction.amount;
    document.getElementById('transaction-total').value = (transaction.price * transaction.amount).toFixed(2);
    document.getElementById('transaction-note').value = transaction.note || '';
    
    updateFormUI();
    
    document.getElementById('transaction-form').scrollIntoView({ behavior: 'smooth' });
}

// 取消编辑
function cancelEdit() {
    editingTransactionId = null;
    document.getElementById('transaction-form').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transaction-date').value = today;
    if (currentBTCPrice > 0) {
        document.getElementById('transaction-price').value = currentBTCPrice.toFixed(2);
    }
    updateFormUI();
}

// 更新表单UI
function updateFormUI() {
    const formTitle = document.querySelector('.add-transaction h2');
    const submitButton = document.querySelector('.btn-primary');
    const cancelButton = document.getElementById('cancel-edit-btn');
    
    if (editingTransactionId) {
        formTitle.textContent = '编辑交易记录';
        submitButton.textContent = '更新记录';
        if (cancelButton) {
            cancelButton.style.display = 'inline-block';
        }
    } else {
        formTitle.textContent = '添加交易记录';
        submitButton.textContent = '添加记录';
        if (cancelButton) {
            cancelButton.style.display = 'none';
        }
    }
}

// 删除交易
function deleteTransaction(id) {
    if (confirm('确定要删除这条交易记录吗？')) {
        let transactions = getTransactions();
        transactions = transactions.filter(t => t.id !== id);
        saveTransactions(transactions);
        
        if (editingTransactionId === id) {
            cancelEdit();
        }
        
        renderTransactions();
        updateStatistics();
    }
}

// 应用筛选
function applyFilters() {
    renderTransactions();
}

// 渲染交易列表
function renderTransactions() {
    let transactions = getTransactions();
    const container = document.getElementById('transactions-list');

    if (transactions.length === 0) {
        container.innerHTML = '<p class="empty-state">暂无交易记录</p>';
        return;
    }

    const filterType = document.getElementById('filter-type')?.value || 'all';
    const filterSort = document.getElementById('filter-sort')?.value || 'date-desc';

    // 按类型筛选
    if (filterType !== 'all') {
        transactions = transactions.filter(t => t.type === filterType);
    }

    // 排序
    switch (filterSort) {
        case 'date-asc':
            transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'amount-asc':
            transactions.sort((a, b) => (a.price * a.amount) - (b.price * b.amount));
            break;
        case 'amount-desc':
            transactions.sort((a, b) => (b.price * b.amount) - (a.price * a.amount));
            break;
    }

    if (transactions.length === 0) {
        container.innerHTML = '<p class="empty-state">无符合条件的交易记录</p>';
        return;
    }

    container.innerHTML = transactions.map(t => {
        const totalCost = (t.price * t.amount).toFixed(2);
        const typeText = t.type === 'buy' ? '买入' : '卖出';
        const typeClass = t.type === 'buy' ? 'buy' : 'sell';

        return `
            <div class="transaction-item">
                <div class="transaction-header">
                    <span class="transaction-type ${typeClass}">${typeText}</span>
                    <span class="transaction-date">${formatDate(t.date)}</span>
                </div>
                <div class="transaction-details">
                    <div class="detail-item">
                        <span class="detail-label">价格</span>
                        <span class="detail-value">$${t.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">数量</span>
                        <span class="detail-value">${t.amount.toFixed(8)} BTC</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">总额</span>
                        <span class="detail-value">$${parseFloat(totalCost).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                    </div>
                </div>
                ${t.note ? `
                    <div class="transaction-note">
                        <p>${escapeHtml(t.note)}</p>
                    </div>
                ` : ''}
                <div class="transaction-actions">
                    <button class="btn-edit" onclick="editTransaction('${t.id}')">编辑</button>
                    <button class="btn-delete" onclick="deleteTransaction('${t.id}')">删除</button>
                </div>
            </div>
        `;
    }).join('');
}

// 更新统计数据
function updateStatistics() {
    const transactions = getTransactions();
    
    let totalHoldings = 0;
    let totalBuyAmount = 0;
    let totalBuyCost = 0;
    let totalSellAmount = 0;
    let totalSellRevenue = 0;

    transactions.forEach(t => {
        if (t.type === 'buy') {
            totalHoldings += t.amount;
            totalBuyAmount += t.amount;
            totalBuyCost += t.price * t.amount;
        } else {
            totalHoldings -= t.amount;
            totalSellAmount += t.amount;
            totalSellRevenue += t.price * t.amount;
        }
    });

    // 平均买入成本
    const avgCost = totalBuyAmount > 0 ? totalBuyCost / totalBuyAmount : 0;

    // 当前市值
    const currentValue = totalHoldings * currentBTCPrice;

    // 当前持仓成本（使用平均成本）
    const currentHoldingsCost = totalHoldings * avgCost;

    // 已卖出部分的成本（使用平均成本）
    const soldCost = totalSellAmount * avgCost;

    // 已实现收益（卖出收入 - 卖出成本）
    const realizedProfit = totalSellRevenue - soldCost;
    const realizedProfitPercent = soldCost > 0 ? (realizedProfit / soldCost) * 100 : 0;

    // 未实现收益（当前市值 - 当前持仓成本）
    const unrealizedProfit = currentValue - currentHoldingsCost;
    const unrealizedProfitPercent = currentHoldingsCost > 0 ? (unrealizedProfit / currentHoldingsCost) * 100 : 0;

    // 总收益
    const totalProfit = realizedProfit + unrealizedProfit;
    const totalInvested = totalBuyCost;
    const totalProfitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    // 净投入（总买入 - 卖出收入）
    const netInvested = totalBuyCost - totalSellRevenue;

    // 更新界面
    document.getElementById('total-holdings').textContent = `${totalHoldings.toFixed(8)} BTC`;
    document.getElementById('avg-cost').textContent = `$${avgCost.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
    document.getElementById('total-invested').textContent = `$${netInvested.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
    document.getElementById('current-value').textContent = `$${currentValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

    // 未实现收益
    const unrealizedElement = document.getElementById('unrealized-profit');
    const unrealizedText = `$${unrealizedProfit.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} (${unrealizedProfitPercent >= 0 ? '+' : ''}${unrealizedProfitPercent.toFixed(2)}%)`;
    unrealizedElement.textContent = unrealizedText;
    unrealizedElement.style.color = unrealizedProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)';

    // 已实现收益
    const realizedElement = document.getElementById('realized-profit');
    const realizedText = `$${realizedProfit.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} (${realizedProfitPercent >= 0 ? '+' : ''}${realizedProfitPercent.toFixed(2)}%)`;
    realizedElement.textContent = realizedText;
    realizedElement.style.color = realizedProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)';

    // 总收益
    const totalProfitElement = document.getElementById('total-profit');
    const totalProfitText = `$${totalProfit.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} (${totalProfitPercent >= 0 ? '+' : ''}${totalProfitPercent.toFixed(2)}%)`;
    totalProfitElement.textContent = totalProfitText;
    totalProfitElement.style.color = totalProfit >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
}

// 导出数据
function exportData() {
    const transactions = getTransactions();
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `btc-journal-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 导入数据
function importData() {
    document.getElementById('import-file-input').click();
}

// 处理文件导入
function handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const transactions = JSON.parse(event.target.result);
            if (Array.isArray(transactions)) {
                if (confirm(`将导入 ${transactions.length} 条记录。这将覆盖现有数据，确定继续吗？`)) {
                    saveTransactions(transactions);
                    renderTransactions();
                    updateStatistics();
                    alert('导入成功！');
                }
            } else {
                alert('文件格式错误');
            }
        } catch (error) {
            alert('导入失败：文件格式不正确');
            console.error('导入错误:', error);
        }
    };
    reader.readAsText(file);
    
    // 重置文件输入
    e.target.value = '';
}

// 清空所有数据
function clearAllData() {
    if (confirm('警告：此操作将删除所有交易记录，且无法恢复。确定继续吗？')) {
        if (confirm('再次确认：真的要删除所有数据吗？')) {
            localStorage.removeItem(CONFIG.TRANSACTIONS_KEY);
            renderTransactions();
            updateStatistics();
            alert('所有数据已清空');
        }
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
