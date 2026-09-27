<script setup lang="ts">
// 复刻自原站 DifficultyClock：难度调整期进度钟 + 预计调整方向
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmtInt, useChainQuery } from '../chainquery'

const { data, loading, stale, error } = useChainQuery<{
  current_difficulty: number
  blocks_into_epoch: number
  blocks_remaining_in_epoch: number
  epoch_avg_block_time_seconds: number
  next_adjustment_eta_utc: string
  estimated_change_pct: number
}>('difficulty', 60000)

const now = ref(Date.now())
let tick: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  tick = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => tick && clearInterval(tick))

const pct = computed(() =>
  data.value ? (data.value.blocks_into_epoch / 2016) * 100 : 0,
)

const eta = computed(() => {
  if (!data.value) return ''
  const target = new Date(data.value.next_adjustment_eta_utc).getTime()
  const sec = Math.max(0, Math.floor((target - now.value) / 1000))
  const d = Math.floor(sec / 86400)
  const h = Math.floor((sec % 86400) / 3600)
  const m = Math.floor((sec % 3600) / 60)
  if (d > 0) return `${d} 天 ${h} 小时 ${m} 分`
  if (h > 0) return `${h} 小时 ${m} 分`
  return `${m} 分钟`
})

function sci(n: number): string {
  return n.toExponential(2).replace('e+', ' × 10^')
}
</script>

<template>
  <div class="chainquery-widget">
    <div class="cw-head">
      <h3 class="cw-title">难度调整期</h3>
      <span class="cw-status">
        {{ loading && !data ? '正在连接节点…' : stale ? '显示最近一次已知数据' : error && !data ? error : '数据：ChainQuery.com' }}
      </span>
    </div>

    <div v-if="data">
      <div class="dc-top">
        <span class="dc-into">
          {{ fmtInt(data.blocks_into_epoch) }} <small>/ 2,016 块</small>
        </span>
        <span class="dc-pct">{{ pct.toFixed(1) }}%</span>
      </div>
      <div class="cw-bar-track dc-bar">
        <div class="cw-bar-fill" :style="{ width: pct + '%' }"></div>
      </div>

      <dl class="cw-stats">
        <div class="row">
          <dt>当前难度</dt>
          <dd>{{ sci(data.current_difficulty) }}</dd>
        </div>
        <div class="row">
          <dt>本期平均出块</dt>
          <dd>{{ data.epoch_avg_block_time_seconds.toFixed(0) }} 秒</dd>
        </div>
        <div class="row">
          <dt>本周期剩余</dt>
          <dd>{{ fmtInt(data.blocks_remaining_in_epoch) }} 块</dd>
        </div>
        <div class="row">
          <dt>下次调整还有</dt>
          <dd>{{ eta }}</dd>
        </div>
      </dl>

      <div class="dc-change">
        <div class="dc-change-cap">预计调整幅度</div>
        <div class="dc-change-val" :class="data.estimated_change_pct >= 0 ? 'up' : 'down'">
          {{ data.estimated_change_pct >= 0 ? '+' : '' }}{{ data.estimated_change_pct.toFixed(2) }}%
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="cw-state">加载中…</div>
    <div v-else class="cw-state">{{ error ?? '难度数据暂不可用。' }}</div>

    <p class="cw-note">
      估算假设本周期剩余时间延续当前出块节奏。正数表示出块快于 10 分钟——难度将上调，把它们压慢回来。
    </p>
  </div>
</template>

<style scoped>
.dc-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.dc-into {
  font-family: var(--vp-font-family-mono);
  font-size: 1.4rem;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.dc-into small {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

.dc-pct {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.dc-bar {
  height: 16px;
}

.dc-change {
  margin-top: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  text-align: center;
}

.dc-change-cap {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--vp-c-text-3);
}

.dc-change-val {
  margin-top: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 1.5rem;
  font-variant-numeric: tabular-nums;
}

/* 难度上调 = 挖矿更卷（红）；下调 = 更宽松（绿），沿用原站配色 */
.dc-change-val.up {
  color: #e5484d;
}

.dc-change-val.down {
  color: #12a66c;
}
</style>
