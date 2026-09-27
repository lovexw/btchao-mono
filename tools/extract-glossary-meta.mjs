// 从 learnbitcoin-content 源仓库提取全部术语的 frontmatter 元数据
// 用法: node tools/extract-glossary-meta.mjs [源仓库路径]
// 输出: tools/glossary-meta.json
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const SRC = process.argv[2] || '/Users/xwmacbook/Documents/Github/learnbitcoin-content'
const srcDir = path.join(SRC, 'glossary')
const outFile = new URL('./glossary-meta.json', import.meta.url).pathname

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md')).sort()
const terms = []
for (const f of files) {
  const raw = fs.readFileSync(path.join(srcDir, f), 'utf8')
  const { data } = matter(raw)
  terms.push({
    slug: data.slug || f.replace(/\.md$/, ''),
    title: data.title || '',
    shortDefinition: (data.shortDefinition || '').trim(),
    keyTakeaways: data.keyTakeaways || [],
    relatedTerms: data.relatedTerms || [],
    draft: !!data.draft,
  })
}
fs.writeFileSync(outFile, JSON.stringify(terms, null, 2))
console.log(`提取完成: ${terms.length} 条 -> ${outFile}`)
