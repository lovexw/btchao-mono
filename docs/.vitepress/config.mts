import { defineConfig } from 'vitepress'
import { glossarySidebar } from './glossary-sidebar.mjs'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'BTC Wiki',
  description:
    '诚实的比特币中文百科：从"钱为什么坏了"到"运行自己的节点"，循序渐进、不忽悠的比特币学习路径。内容源自 LearnBitcoin.com（CC-BY-SA-4.0），为中文读者全面重写。',
  ignoreDeadLinks: process.env.STRICT_LINKS !== '1',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f7931a' }],
    ['meta', { property: 'og:title', content: 'BTC Wiki · 诚实的比特币中文百科' }],
    ['meta', { property: 'og:description', content: '从"钱为什么坏了"到"运行自己的节点"，循序渐进、不忽悠的比特币学习路径。' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'BTC Wiki',

    nav: [
      { text: '学习之旅', link: '/journey/', activeMatch: '/journey/' },
      { text: '深度专题', link: '/rabbit-holes/', activeMatch: '/rabbit-holes/' },
      { text: '术语表', link: '/glossary/', activeMatch: '/glossary/' },
      {
        text: '实用指南',
        items: [
          { text: '隐私指南', link: '/privacy' },
          { text: '安全指南', link: '/security' },
          { text: '运行自己的节点', link: '/node' },
        ],
      },
      { text: '宣言', link: '/manifesto' },
      { text: '关于', link: '/about' },
    ],

    sidebar: {
      '/journey/': [
        {
          text: '学习之旅',
          items: [{ text: '导览', link: '/journey/' }],
        },
        {
          text: '章节',
          items: [
            { text: '第 1 章 · 法币为什么坏了', link: '/journey/why-money-is-broken' },
            { text: '第 2 章 · 比特币到底是什么', link: '/journey/what-bitcoin-actually-is' },
            { text: '第 3 章 · 比特币如何运转', link: '/journey/how-bitcoin-works' },
            { text: '第 4 章 · 成为自己的银行', link: '/journey/be-your-own-bank' },
            { text: '第 5 章 · 如何使用比特币', link: '/journey/using-bitcoin' },
            { text: '第 6 章 · 主权：最终的自立', link: '/journey/sovereignty' },
          ],
        },
      ],
      '/rabbit-holes/': [
        {
          text: '深度专题',
          items: [{ text: '全部专题', link: '/rabbit-holes/' }],
        },
        {
          text: '协议与机制',
          items: [
            { text: 'UTXO：比特币的记账模型', link: '/rabbit-holes/utxos' },
            { text: '供应量：2100 万从何而来', link: '/rabbit-holes/supply' },
            { text: '减半：四年一次的供应刹车', link: '/rabbit-holes/halvings' },
            { text: '挖矿：算力、难度与激励', link: '/rabbit-holes/mining' },
            { text: '内存池：交易候客厅', link: '/rabbit-holes/mempool' },
            { text: '去中心化的真实含义', link: '/rabbit-holes/decentralization' },
          ],
        },
        {
          text: '密钥与安全',
          items: [
            { text: '密钥空间：天文数字的安全边际', link: '/rabbit-holes/key-space' },
            { text: '助记词备份策略', link: '/rabbit-holes/seed-backup-strategies' },
            { text: '从门头沟到 FTX：托管交易所坟场', link: '/rabbit-holes/mt-gox-ftx-graveyard' },
          ],
        },
        {
          text: '钱与经济',
          items: [
            { text: '比特币单位：从聪到 BTC', link: '/rabbit-holes/bitcoin-units' },
            { text: '比特币与能源', link: '/rabbit-holes/energy' },
            { text: '通胀漏洞复盘', link: '/rabbit-holes/inflation-bug-postmortem' },
          ],
        },
        {
          text: '隐私与发展',
          items: [
            { text: '比特币隐私：什么有效、什么无效', link: '/rabbit-holes/bitcoin-privacy' },
            { text: '闪电网络路由', link: '/rabbit-holes/lightning-routing' },
            { text: '扩容战争', link: '/rabbit-holes/block-size-war' },
            { text: 'BIP：比特币改进提案流程', link: '/rabbit-holes/bip-process' },
            { text: '量子计算与比特币', link: '/rabbit-holes/quantum-and-bitcoin' },
          ],
        },
      ],
      '/glossary/': glossarySidebar,
      '/': [
        {
          text: '实用指南',
          items: [
            { text: '隐私指南', link: '/privacy' },
            { text: '安全指南', link: '/security' },
            { text: '运行自己的节点', link: '/node' },
          ],
        },
        {
          text: '本站',
          items: [
            { text: '宣言', link: '/manifesto' },
            { text: '关于 · 版权', link: '/about' },
          ],
        },
      ],
    },

    outline: { level: [2, 3], label: '本页目录' },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清空',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
        miniSearch: {
          options: {
            tokenize: (text) => {
              // 中文按双字分词 + 英文按单词，兼顾精确与召回
              const tokens = []
              const re = /[a-zA-Z0-9]+|[\u4e00-\u9fff]/g
              let m
              const chars = []
              while ((m = re.exec(text))) {
                const t = m[0]
                if (/^[\u4e00-\u9fff]$/.test(t)) chars.push(t)
                else tokens.push(t.toLowerCase())
              }
              for (let i = 0; i < chars.length; i++) {
                tokens.push(chars[i])
                if (i + 1 < chars.length) tokens.push(chars[i] + chars[i + 1])
              }
              return tokens
            },
          },
        },
      },
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/lovexw/btc-wiki' }],

    footer: {
      message: '内容基于 <a href="https://learnbitcoin.com" target="_blank" rel="noopener">LearnBitcoin.com</a> 改编，遵循 CC-BY-SA-4.0 协议。',
      copyright: 'BTC Wiki · 仅作学习用途，不构成投资建议',
    },

    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    externalLinkIcon: true,
  },

  // plugin-vue 5.2+ 构建模式默认把绝对路径 src 编译成模块 import，
  // 而 /images/* 位于 public 目录、Rollup 无法解析，会导致 build 失败，故显式关闭
  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    },
  },

  markdown: {
    lineNumbers: false,
  },
})
