<script setup lang="ts">
// 复刻自原站 HalvingCountdown：下次减半倒计时（天/时/分/秒）+ 关键数字面板
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmtInt, useChainQuery } from '../chainquery'

interface HalvingData {
  current_height: number
  current_subsidy_btc: number
  next_halving: {
    block_height: number
    blocks_remaining: number
    estimated_date_utc: string
    next_subsidy_btc: number
  }
}

const { data, loading, stale, error } = useChainQuery<HalvingData>('halving', 60000)

const now = ref(Date.now())
let tick: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  tick = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => tick && clearInterval(tick))

const countdown = computed(() => {
  if (!data.value) return null
  const target = new Date(data.value.next_halving.estimated_date_utc).getTime()
  const diff = Math.max(0, target - now.value)
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  }
})

const estDate = computed(() => {
  if (!data.value) return ''
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(data.value.next_halving.estimated_date_utc))
})

function pad(n: number): string {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <div class="chainquery-widget">
    <div class="cw-head">
      <h3 class="cw-title">下次减半</h3>
      <span class="cw-status">
        {{ loading && !data ? '正在连接节点…' : stale ? '显示最近一次已知数据' : error && !data ? error : '数据：ChainQuery.com' }}
      </span>
    </div>

    <div v-if="data && countdown">
      <div class="hc-grid">
        <div class="hc-cell">
          <div class="hc-num">{{ countdown.days }}</div>
          <div class="hc-cap">天</div>
        </div>
        <div class="hc-cell">
          <div class="hc-num">{{ pad(countdown.hours) }}</div>
          <div class="hc-cap">时</div>
        </div>
        <div class="hc-cell">
          <div class="hc-num">{{ pad(countdown.minutes) }}</div>
          <div class="hc-cap">分</div>
        </div>
        <div class="hc-cell">
          <div class="hc-num">{{ pad(countdown.seconds) }}</div>
          <div class="hc-cap">秒</div>
        </div>
      </div>

      <dl class="cw-stats">
        <div class="row">
          <dt>当前区块</dt>
          <dd>{{ fmtInt(data.current_height) }}</dd>
        </div>
        <div class="row">
          <dt>减半区块</dt>
          <dd>{{ fmtInt(data.next_halving.block_height) }}</dd>
        </div>
        <div class="row">
          <dt>剩余区块数</dt>
          <dd>{{ fmtInt(data.next_halving.blocks_remaining) }}</dd>
        </div>
        <div class="row">
          <dt>预计日期</dt>
          <dd>{{ estDate }}</dd>
        </div>
      </dl>

      <div class="hc-subsidy">
        <div>
          <div class="hc-subsidy-cap">当前补贴</div>
          <div class="hc-subsidy-num">{{ data.current_subsidy_btc }} BTC</div>
        </div>
        <div class="hc-arrow">→</div>
        <div>
          <div class="hc-subsidy-cap">减半后</div>
          <div class="hc-subsidy-num brand">{{ data.next_halving.next_subsidy_btc }} BTC</div>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="cw-state">加载中…</div>
    <div v-else class="cw-state">{{ error ?? '减半数据暂不可用。' }}</div>

    <p class="cw-note">
      估算按平均 10 分钟一块推算。真实出块有快有慢；临近减半时，日期会在几个小时内来回漂移。
    </p>
  </div>
</template>

<style scoped>
.hc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  text-align: center;
}

.hc-cell {
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  padding: 12px 8px;
}

.hc-num {
  font-family: var(--vp-font-family-mono);
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  font-weight: 700;
  color: var(--vp-c-brand-1);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.hc-cap {
  margin-top: 4px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--vp-c-text-3);
}

.hc-subsidy {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 12px 16px;
  text-align: center;
}

.hc-subsidy-cap {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--vp-c-text-3);
}

.hc-subsidy-num {
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

.hc-arrow {
  font-size: 1.5rem;
  color: var(--vp-c-brand-2);
}

.brand {
  color: var(--vp-c-brand-1);
}
</style>
