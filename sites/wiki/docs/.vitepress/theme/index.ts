import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import './style.css'

import UnitsConverter from './components/UnitsConverter.vue'
import UnitsVisualization from './components/UnitsVisualization.vue'
import KeySpaceVisualizer from './components/KeySpaceVisualizer.vue'
import SupplyChart from './components/SupplyChart.vue'
import HalvingCountdown from './components/HalvingCountdown.vue'
import DifficultyClock from './components/DifficultyClock.vue'
import MempoolHistogram from './components/MempoolHistogram.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // 链上数据交互组件（复刻自原站 Svelte widgets），markdown 内直接以标签使用
    app.component('UnitsConverter', UnitsConverter)
    app.component('UnitsVisualization', UnitsVisualization)
    app.component('KeySpaceVisualizer', KeySpaceVisualizer)
    app.component('SupplyChart', SupplyChart)
    app.component('HalvingCountdown', HalvingCountdown)
    app.component('DifficultyClock', DifficultyClock)
    app.component('MempoolHistogram', MempoolHistogram)
  },
}
