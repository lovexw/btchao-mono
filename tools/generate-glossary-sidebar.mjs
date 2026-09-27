// 生成术语侧边栏：按英文 slug 首字母分组（折叠），标签用中文标题。
// 用法: node tools/generate-glossary-sidebar.mjs
// 输出: docs/.vitepress/glossary-sidebar.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const meta = JSON.parse(fs.readFileSync(path.join(__dirname, 'glossary-meta.json'), 'utf8'))
const zh = JSON.parse(fs.readFileSync(path.join(__dirname, 'glossary-zh.json'), 'utf8'))

const groups = new Map()
for (const m of meta) {
  if (m.draft) continue
  const letter = (m.slug[0] || '#').toUpperCase()
  if (!groups.has(letter)) groups.set(letter, [])
  const label = (zh[m.slug] && zh[m.slug].t) || m.title
  groups.get(letter).push({ text: label, link: `/glossary/${m.slug}` })
}

const letters = [...groups.keys()].sort()
const lines = [
  '// 术语表侧边栏 —— 由 `npm run glossary:sidebar` 重新生成',
  '// 手动编辑会被覆盖；新增条目请运行生成命令',
  'export const glossarySidebar = [',
  '  {',
  "    text: '术语表',",
  '    collapsed: false,',
  "    items: [{ text: '总览与高频词', link: '/glossary/' }],",
  '  },',
]
for (const L of letters) {
  const items = groups
    .get(L)
    .sort((a, b) => a.text.localeCompare(b.text, 'zh'))
    .map((it) => `      { text: ${JSON.stringify(it.text)}, link: '${it.link}' },`)
    .join('\n')
  lines.push('  {')
  lines.push(`    text: '${L}',`)
  lines.push('    collapsed: true,')
  lines.push('    items: [')
  lines.push(items)
  lines.push('    ],')
  lines.push('  },')
}
lines.push(']')

const out = path.join(root, 'docs', '.vitepress', 'glossary-sidebar.mjs')
fs.writeFileSync(out, lines.join('\n') + '\n')
console.log(`侧边栏已生成: ${letters.length} 个字母分组, ${meta.filter(m => !m.draft).length} 个条目 -> ${out}`)
