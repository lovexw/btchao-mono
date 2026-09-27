<script setup lang="ts">
// 复刻自原站 SupplyChart：实时流通量 vs 20,999,999.9769 BTC 渐近上限
import { computed } from 'vue'
import { fmtNum, useChainQuery } from '../chainquery'

const TRUE_MAX = 20999999.9769

const { data, loading, stale, error } = useChainQuery<{
  circulating_btc: number
  percent_mined: number
  current_subsidy_btc: number
  blocks_per_year_est: number
  annual_issuance_btc: number
  annual_inflation_rate_pct: number
}>('supply', 300000)

const pct = computed(() =>
  data.value ? (data.value.circulating_btc / TRUE_MAX) * 100 : 0,
)
</script>

<template>
  <div class="chainquery-widget">
    <div class="cw-head">
      <h3 class="cw-title">实时供应量</h3>
      <span class="cw-status">
        {{ loading && !data ? '正在连接节点…' : stale ? '显示最近一次已知数据' : error && !data ? error : '数据：ChainQuery.com' }}
      </span>
    </div>

    <div v-if="data">
      <div class="sc-top">
        <span class="sc-value">
          {{ fmtNum(data.circulating_btc, 2) }} <small>BTC</small>
        </span>
        <span class="sc-pct">{{ pct.toFixed(2) }}%</span>
      </div>
      <div class="cw-bar-track">
        <div class="cw-bar-fill" :style="{ width: pct + '%' }"></div>
        <span class="cw-bar-label">占 {{ fmtNum(TRUE_MAX, 2) }} BTC 上限</span>
      </div>

      <dl class="cw-stats">
        <div class="row">
          <dt>当前区块补贴</dt>
          <dd>{{ data.current_subsidy_btc }} BTC / 块</dd>
        </div>
        <div class="row">
          <dt>每年区块数（估）</dt>
          <dd>约 {{ fmtNum(data.blocks_per_year_est, 0) }}</dd>
        </div>
        <div class="row">
          <dt>年增发量</dt>
          <dd>{{ fmtNum(data.annual_issuance_btc, 0) }} BTC</dd>
        </div>
        <div class="row">
          <dt>通胀率</dt>
          <dd class="brand">{{ data.annual_inflation_rate_pct.toFixed(2) }}% / 年</dd>
        </div>
      </dl>
    </div>

    <div v-else-if="loading" class="cw-state">加载中…</div>
    <div v-else class="cw-state">{{ error ?? '供应量数据暂不可用。' }}</div>

    <p class="cw-note">
      流通量来自一个比特币全节点的 <code>gettxoutsetinfo</code>，经 ChainQuery.com 提供。真实渐近上限是
      20,999,999.9769 BTC（取整让 0.0231 BTC 永远挖不出来）——进度条按这个数、而不是整齐的 2100 万绘制。
    </p>
  </div>
</template>

<style scoped>
.sc-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.sc-value {
  font-family: var(--vp-font-family-mono);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.sc-value small {
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

.sc-pct {
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
}

.brand {
  color: var(--vp-c-brand-1);
}

.cw-note code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
}
</style>
