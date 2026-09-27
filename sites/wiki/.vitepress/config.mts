import { defineConfig } from 'vitepress'
import docsConfig from '../docs/.vitepress/config.mts'

// 兜底配置：仅在仓库根目录直接运行 `vitepress build`（不写 srcDir 参数，
// 比如 Cloudflare Pages CI 的构建命令）时被加载。
// 正常构建（npm run build = vitepress build docs）走 docs/.vitepress/config.mts，
// 本文件不会被读取。若删掉本文件，请确认 CI 构建命令带上了 docs 参数。
export default defineConfig({
  ...docsConfig,
  srcDir: 'docs',
  outDir: 'docs/.vitepress/dist',
  cacheDir: 'docs/.vitepress/cache',
})
