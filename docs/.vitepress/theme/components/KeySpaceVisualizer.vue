<script setup lang="ts">
// 复刻自原站 KeySpaceVisualizer：拖动滑块逐级放大 2^8 → 2^256，每档配一个现实类比
import { computed, ref } from 'vue'

interface Step {
  exponent: number
  label: string
  comparison: string
  accent?: boolean
}

const STEPS: Step[] = [
  { exponent: 8, label: '2^8 = 256', comparison: '一个字节。RGB 颜色值的取值范围。两副国际象棋棋盘的格数。' },
  { exponent: 16, label: '2^16 = 65,536', comparison: '一个 /16 子网里的全部 IPv4 地址。MIDI 键盘的全部音高取值。' },
  { exponent: 32, label: '2^32 ≈ 43 亿', comparison: '整个互联网的 IPv4 地址总数。大约等于地球总人口的一半。' },
  { exponent: 64, label: '2^64 ≈ 1.8 × 10^19', comparison: '比地球上所有海滩的沙粒加起来还多（约 7.5 × 10^18）。' },
  { exponent: 96, label: '2^96 ≈ 7.9 × 10^28', comparison: '2 千克水里的分子数。' },
  { exponent: 128, label: '2^128 ≈ 3.4 × 10^38', comparison: '你身体里的原子数。AES-128 的密钥空间。已被认为暴力破解不可行。' },
  { exponent: 160, label: '2^160 ≈ 1.5 × 10^48', comparison: '全部可能的比特币地址（160 位哈希）。地址空间的总规模。' },
  { exponent: 192, label: '2^192 ≈ 6.3 × 10^57', comparison: '比整个太阳的原子数还多（约 10^57）。' },
  { exponent: 224, label: '2^224 ≈ 2.7 × 10^67', comparison: '接近整个银河系的原子总数（约 10^67）。' },
  {
    exponent: 256,
    label: '2^256 ≈ 1.16 × 10^77',
    comparison: '比特币的私钥空间。已接近可观测宇宙的原子总数（约 10^80）。',
    accent: true,
  },
]

const index = ref(9)
const current = computed(() => STEPS[index.value])
</script>

<template>
  <figure class="ksv">
    <header class="ksv-head">
      <h3 class="ksv-title">密钥空间可视化</h3>
      <span class="ksv-hint">拖动滑块，或点击任意档位</span>
    </header>

    <div class="ksv-panel" :class="{ accent: current.accent }">
      <p class="ksv-label" :class="{ accent: current.accent }">{{ current.label }}</p>
      <p class="ksv-comparison">{{ current.comparison }}</p>
    </div>

    <input
      v-model.number="index"
      class="ksv-slider"
      type="range"
      min="0"
      :max="STEPS.length - 1"
      step="1"
      aria-label="密钥空间指数滑块"
    />

    <div class="ksv-steps">
      <button
        v-for="(s, i) in STEPS"
        :key="s.exponent"
        type="button"
        class="ksv-step"
        :class="{ active: i === index }"
        :aria-label="`跳到 2^${s.exponent}`"
        @click="index = i"
      >{{ s.exponent }}</button>
    </div>

    <p class="ksv-note">
      数据口径：可观测宇宙的原子总数约 10<sup>78</sup>–10<sup>82</sup>；地球上的沙粒约
      7.5 × 10<sup>18</sup>。比特币的私钥空间是 2<sup>256</sup>，与 SHA-256
      的输出空间等宽。暴力猜出一把在用的私钥——做不到。
    </p>
  </figure>
</template>

<style scoped>
.ksv {
  margin: 2.5rem 0;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.ksv-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.ksv-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.ksv-hint {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.ksv-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 24px;
  transition: all 0.3s ease;
}

.ksv-panel.accent {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.ksv-label {
  font-family: var(--vp-font-family-mono);
  font-size: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  transition: color 0.3s ease;
}

.ksv-label.accent {
  color: var(--vp-c-brand-1);
}

.ksv-comparison {
  margin-top: 12px;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.ksv-slider {
  margin-top: 24px;
  width: 100%;
  accent-color: var(--vp-c-brand-1);
}

.ksv-steps {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 4px;
}

.ksv-step {
  border: none;
  background: transparent;
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.2s;
}

.ksv-step:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.ksv-step.active {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.ksv-note {
  margin-top: 24px;
  font-size: 0.72rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}
</style>
