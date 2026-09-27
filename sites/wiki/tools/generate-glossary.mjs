// 生成术语表页面：对每个 slug，若 docs/glossary/<slug>.md 已存在则跳过（页面文件是最终事实源），
// 否则用 tools/glossary-zh.json 的中文标题+短定义生成「待精翻」存根页。
// 用法: node tools/generate-glossary.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const meta = JSON.parse(fs.readFileSync(path.join(__dirname, 'glossary-meta.json'), 'utf8'))
const zh = JSON.parse(fs.readFileSync(path.join(__dirname, 'glossary-zh.json'), 'utf8'))
const outDir = path.join(root, 'docs', 'glossary')
fs.mkdirSync(outDir, { recursive: true })

let created = 0
let skipped = 0
for (const m of meta) {
  if (m.draft) continue
  const file = path.join(outDir, `${m.slug}.md`)
  if (fs.existsSync(file)) { skipped++; continue }
  const z = zh[m.slug] || {}
  const title = z.t || m.title
  const short = z.s || m.shortDefinition
  const body = `---
title: ${title}
---

<!-- glossary-stub：本页由工具生成，全文精翻时请直接重写本文件（保留 frontmatter 的 title，删除本注释） -->

# ${title}

> **一句话定义：** ${short}

**英文原名：** ${m.title}

*本词条的完整中文讲解正在撰写中。上面的一句话定义已可使用；需要更深入的解释，欢迎先用右上角搜索查阅相关词条，或阅读[学习之旅](/journey/)与[深度专题](/rabbit-holes/)中的对应章节。*
`
  fs.writeFileSync(file, body)
  created++
}
console.log(`生成 ${created} 页，跳过已存在 ${skipped} 页，共 ${meta.length} 条`)
