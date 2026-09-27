import { Section } from './Section';

export function WhatIsBitcoin() {
  return (
    <Section id="what-is-bitcoin">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">第一性原理：什么是比特币？</h2>
      <div className="space-y-6 text-lg text-gray-800 leading-relaxed font-normal">
        <p>
          想象一个巨大的、公开的账本，漂浮在云端。没有银行，没有管理员，没有CEO。
        </p>
        <p>
          这个账本记录着每一笔交易，但它不属于任何人，而是属于所有人。
          通过数学和代码（而非信任），它保证了：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>稀缺性：</strong> 总量恒定 2100 万枚，无法增发。</li>
          <li><strong>不可篡改：</strong> 一旦写入，永远无法撤销。</li>
          <li><strong>去中心化：</strong> 只要有网络，你的资产就真正属于你。</li>
        </ul>
        <p className="font-medium text-xl text-bitcoin-orange pt-4">
          它是数字世界的黄金，是绝对的数学真理。
        </p>
      </div>
    </Section>
  );
}
