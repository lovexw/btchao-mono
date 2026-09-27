<script setup lang="ts">
// 复刻自原站 MempoolHistogram：实时内存池概要 + 按费率带分组的待确认体积条
import { computed } from 'vue'
import { fmtInt, fmtNum, useChainQuery } from '../chainquery'

interface FeeBand {
  low_sat_vb: number
  high_sat_vb: number
  tx_count: number
  vsize_vbytes: number
}

const { data, loading, stale, error } = useChainQuery<{
  tx_count: number
  vsize_vbytes: number
  total_fee_btc: number
  next_block_estimate_sat_vb: number
  half_hour_estimate_sat_vb: number
  hour_estimate_sat_vb: number
  fee_bands: FeeBand[]
}>('mempool-summary', 30000)

// 费率从高到低排，最高费率带在最上（矿工优先级顺序）；跳过空带
const bandsDesc = computed(() =>
  data.value
    ? [...data.value.fee_bands]
        .filter((b) => b.tx_count > 0 && b.vsize_vbytes > 0)
        .sort((a, b) => b.low_sat_vb - a.low_sat_vb)
    : [],
)

// 对数比例条宽：各费率带体积常差几个数量级，线性归一化会让小带不可见
// （log10(v) / log10(max)，最大带 100%，v=1 时也有 2% 保底）
const maxBandVsize = computed(() =>
  data.value
    ? Math.max(1, ...data.value.fee_bands.map((b) => b.vsize_vbytes))
    : 1,
)

function bandWidth(vsize: number): string {
  const maxLog = Math.log10(maxBandVsize.value)
  if (maxLog <= 0) return '100%'
  return Math.max(2, (Math.log10(Math.max(1, vsize)) / maxLog) * 100) + '%'
}

function bandLabel(b: FeeBand): string {
  return b.high_sat_vb >= 1000 ? `${b.low_sat_vb}+ sat/vB` : `${b.low_sat_vb}–${b.high_sat_vb} sat/vB`
}
</script>

<template>
  <div class="chainquery-widget">
    <div class="cw-head">
      <h3 class="cw-title">实时内存池</h3>
      <span class="cw-status">
        {{ loading && !data ? '正在连接节点…' : stale ? '显示最近一次已知数据' : error && !data ? error : '数据：ChainQuery.com' }}
      </span>
    </div>

    <div v-if="data">
      <div class="mp-cards">
        <div class="mp-card">
          <div class="mp-card-cap">待确认交易</div>
          <div class="mp-card-num">{{ fmtInt(data.tx_count) }}</div>
        </div>
        <div class="mp-card">
          <div class="mp-card-cap">总体积</div>
          <div class="mp-card-num">{{ (data.vsize_vbytes / 1e6).toFixed(2) }} MvB</div>
        </div>
        <div class="mp-card">
          <div class="mp-card-cap">总手续费</div>
          <div class="mp-card-num">{{ data.total_fee_btc.toFixed(4) }} BTC</div>
        </div>
        <div class="mp-card hot">
          <div class="mp-card-cap">进下个区块</div>
          <div class="mp-card-num">{{ data.next_block_estimate_sat_vb }} sat/vB</div>
        </div>
      </div>

      <div class="mp-bands">
        <div v-for="b in bandsDesc" :key="`${b.low_sat_vb}-${b.high_sat_vb}`" class="mp-band">
          <span class="mp-band-label">{{ bandLabel(b) }}</span>
          <span class="mp-band-track">
            <span
              class="mp-band-fill"
              :style="{ width: bandWidth(b.vsize_vbytes) }"
            ></span>
            <span class="mp-band-count">{{ fmtInt(b.tx_count) }} 笔</span>
          </span>
        </div>
      </div>

      <div class="mp-estimates">
        <div class="mp-est">
          <div class="mp-card-cap">约 30 分钟</div>
          <div class="mp-card-num">{{ data.half_hour_estimate_sat_vb }} sat/vB</div>
        </div>
        <div class="mp-est">
          <div class="mp-card-cap">约 1 小时</div>
          <div class="mp-card-num">{{ data.hour_estimate_sat_vb }} sat/vB</div>
        </div>
        <div class="mp-est">
          <div class="mp-card-cap">不着急</div>
          <div class="mp-card-num">1 sat/vB</div>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="cw-state">加载中…</div>
    <div v-else class="cw-state">{{ error ?? '内存池数据暂不可用。' }}</div>

    <p class="cw-note">
      矿工按费率从高到低装区块。上面的横条是此刻某节点内存池里按费率分组的未确认交易；30
      秒自动刷新一次。内存池空闲时几乎任何费率都能进下个区块；拥堵时，你得开出比前面排队的更高的价。
    </p>
  </div>
</template>

<style scoped>
.mp-cards,
.mp-estimates {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .mp-cards,
  .mp-estimates {
    grid-template-columns: repeat(4, 1fr);
  }
}

.mp-card,
.mp-est {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 8px 12px;
}

.mp-card.hot {
  border-color: var(--vp-c-brand-3);
  background: var(--vp-c-brand-soft);
}

.mp-card-cap {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--vp-c-text-3);
}

.mp-card.hot .mp-card-cap {
  color: var(--vp-c-brand-1);
}

.mp-card-num {
  font-family: var(--vp-font-family-mono);
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.mp-card.hot .mp-card-num {
  color: var(--vp-c-brand-1);
}

.mp-bands {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mp-band {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mp-band-label {
  width: 118px;
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.mp-band-track {
  position: relative;
  flex: 1;
  height: 28px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.mp-band-fill {
  display: block;
  height: 100%;
  background: linear-gradient(to right, #ffb95c, var(--vp-c-brand-1));
  transition: width 0.5s ease;
}

.mp-band-count {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.mp-estimates {
  margin: 24px 0 0;
  text-align: center;
}
</style>
