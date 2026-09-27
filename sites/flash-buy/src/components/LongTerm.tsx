import { Section } from './Section';
import { TrendingUp } from 'lucide-react';

export function LongTerm() {
  return (
    <Section id="long-term">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">长期主义与定投</h2>
      <div className="space-y-6 text-lg text-gray-800 leading-relaxed font-normal">
        <div className="flex justify-center mb-6">
          <TrendingUp className="w-16 h-16 text-bitcoin-orange" />
        </div>
        <p>
          比特币不是一夜暴富的彩票，而是对抗通胀的方舟。
        </p>
        <p>
          第一性原理告诉我们，法币（美元、人民币）的购买力长期看是下降的，而总量恒定的比特币长期看是上涨的。
        </p>
        <h3 className="text-2xl font-bold mt-6">最佳策略：定投 (DCA)</h3>
        <p>
          不要预测市场，没人能预测。
          <strong>定期、定额</strong>买入，无视短期波动。
          把时间拉长到 4 年（一个减半周期），你会感谢今天的自己。
        </p>
      </div>
    </Section>
  );
}
