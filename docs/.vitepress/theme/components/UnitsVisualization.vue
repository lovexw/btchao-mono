<script setup lang="ts">
// 复刻自原站 UnitsVisualization：九个圆点展示「该单位覆盖到小数点后哪一位」
// 橙色实心 = 该单位本身及更细的所有位；浅色描边 = 比它更粗的更高面额位
import { computed } from 'vue'

const props = withDefaults(defineProps<{ unit?: string; showLabel?: boolean }>(), {
  unit: 'finney',
  showLabel: true,
})

const UNITS: Record<string, { label: string; decimals: number }> = {
  btc: { label: 'BTC', decimals: 0 },
  dbtc: { label: 'dBTC', decimals: 1 },
  cbtc: { label: 'cBTC', decimals: 2 },
  mbtc: { label: 'mBTC', decimals: 3 },
  finney: { label: 'Finney', decimals: 4 },
  p5: { label: '', decimals: 5 },
  ubtc: { label: 'μBTC', decimals: 6 },
  p7: { label: '', decimals: 7 },
  sat: { label: '聪', decimals: 8 },
}

const current = computed(() => UNITS[props.unit] ?? UNITS.finney)
const positions = [1, 2, 3, 4, 5, 6, 7, 8]
</script>

<template>
  <figure v-if="current" class="unit-viz">
    <div class="unit-dots">
      <span
        class="coin-main"
        :class="{ solid: current.decimals === 0 }"
        :title="`BTC 整币（10^0 BTC）`"
      >₿</span>
      <span class="dot-sep" aria-hidden="true">·</span>
      <span
        v-for="p in positions"
        :key="p"
        class="unit-dot"
        :class="{ fine: p >= current.decimals }"
        :title="`10^-${p} BTC`"
      >{{ p }}</span>
    </div>
    <figcaption v-if="showLabel && current.label" class="unit-label">{{ current.label }}</figcaption>
  </figure>
</template>

<style scoped>
.unit-viz {
  margin: 1.5rem 0;
}

.unit-dots {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.coin-main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
}

/* unit=btc 时整币实心强调 */
.coin-main.solid {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.unit-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* 该单位本身及更细的位置：实心橙 */
.unit-dot.fine {
  background: var(--vp-c-brand-1);
  color: #fff;
}

/* 比该单位更粗的面额位：浅色虚线描边 */
.unit-dot:not(.fine) {
  border: 1px dashed var(--vp-c-brand-3);
  color: var(--vp-c-text-3);
}

.dot-sep {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--vp-c-brand-2);
}

.unit-label {
  margin-top: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
</style>
