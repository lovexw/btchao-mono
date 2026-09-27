// chainquery.com /api/edu/* 统一数据源（与原站 LearnBitcoin.com 相同的公开端点）
// 各组件共用：拉取 + stale 标记 + 每 N 秒刷新 + 组件卸载时清理
//
// 重要：只在客户端挂载后才发起请求与轮询。构建期 SSR 阶段 onUnmounted
// 不会触发，若在这里 setInterval，构建进程会被定时器挂住无法退出。
import { onMounted, onUnmounted, ref } from 'vue'

export interface EduResponse<T> {
  schema_version: string
  ts_utc: string
  data_age_sec: number
  stale: boolean
  data: T
}

export function useChainQuery<T>(path: string, refreshMs: number) {
  const data = ref<T | null>(null)
  const loading = ref(true)
  const stale = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    try {
      const res = await fetch(`https://chainquery.com/api/edu/${path}`, {
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('chainquery offline')
      const json = (await res.json()) as EduResponse<T>
      if (!json.data) throw new Error('no data')
      data.value = json.data
      stale.value = !!json.stale
      error.value = null
    } catch {
      // 已有数据时静默保留旧值（原站行为：失败不打断展示）
      if (!data.value) error.value = '暂时连不上节点，稍后自动重试。'
    } finally {
      loading.value = false
    }
  }

  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    load()
    timer = setInterval(load, refreshMs)
  })

  onUnmounted(() => timer && clearInterval(timer))

  return { data, loading, stale, error, reload: load }
}

// 大数字千分位（中文语境沿用 en-US 逗号分组，链上工具惯例）
export function fmtInt(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

export function fmtNum(n: number, max = 2, min = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(n)
}
