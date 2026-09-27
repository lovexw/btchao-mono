<script setup lang="ts">
// 复刻自原站 UnitsConverter：任意单位互算 + 实时 USD 参考价
// 换算全在浏览器本地完成；USD 价格拉取 chainquery /api/edu/price（失败只隐藏该行）
import { computed, ref } from 'vue'
import { fmtNum, useChainQuery } from '../chainquery'

const UNITS = [
  { key: 'btc', label: 'BTC', btcPer: 1, decimals: 8 },
  { key: 'mbtc', label: 'mBTC', btcPer: 0.001, decimals: 5 },
  { key: 'finney', label: 'Finney', btcPer: 0.0001, decimals: 4 },
  { key: 'ubtc', label: 'μBTC（bit）', btcPer: 0.000001, decimals: 2 },
  { key: 'sat', label: '聪（sat）', btcPer: 1e-8, decimals: 0 },
]

const amount = ref<number>(1)
const unitKey = ref<string>('btc')

const { data: price } = useChainQuery<{ usd_per_btc: number }>('price', 300000)

const btcAmount = computed(() => {
  const u = UNITS.find((x) => x.key === unitKey.value)
  return (Number.isFinite(amount.value) ? amount.value : 0) * (u?.btcPer ?? 1)
})

function fmt(e: number, decimals: number): string {
  return Number.isFinite(e) ? fmtNum(e, decimals) : '–'
}
</script>

<template>
  <div class="chainquery-widget">
    <div class="cw-head">
      <h3 class="cw-title">单位换算器</h3>
      <span class="cw-status">
        {{ price?.usd_per_btc ? `1 BTC ≈ $${fmtNum(price.usd_per_btc, 0)}` : '美元价获取中…' }}
      </span>
    </div>

    <div class="uc-inputs">
      <label class="uc-field uc-field-amount">
        <span class="uc-field-label">金额</span>
        <input v-model.number="amount" type="number" min="0" step="any" />
      </label>
      <label class="uc-field">
        <span class="uc-field-label">单位</span>
        <select v-model="unitKey">
          <option v-for="u in UNITS" :key="u.key" :value="u.key">{{ u.label }}</option>
        </select>
      </label>
    </div>

    <dl class="cw-stats">
      <div v-for="u in UNITS" :key="u.key" class="row">
        <dt>{{ u.label }}</dt>
        <dd>{{ fmt(btcAmount / u.btcPer, u.decimals) }}</dd>
      </div>
      <div v-if="price?.usd_per_btc" class="row row-usd">
        <dt>美元</dt>
        <dd>${{ fmtNum(btcAmount * price.usd_per_btc, 2) }}</dd>
      </div>
    </dl>

    <p class="cw-note">换算在本地浏览器完成，不离开本页。发送前务必核对小数位——「10,000 聪」和「0.0001 BTC」一样多，但「10,000 sats」和「100,000 sats」差十倍。</p>
  </div>
</template>

<style scoped>
.uc-inputs {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
}

.uc-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.uc-field-amount {
  flex: 1;
  min-width: 160px;
}

.uc-field-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.uc-field input,
.uc-field select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  outline: none;
  transition: border-color 0.2s;
}

.uc-field input:focus,
.uc-field select:focus {
  border-color: var(--vp-c-brand-1);
}

.row-usd dt {
  color: var(--vp-c-brand-1);
}
</style>
