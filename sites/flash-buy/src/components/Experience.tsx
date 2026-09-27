import { Section } from './Section';

export function Experience() {
  return (
    <Section id="experience">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">先上车，后补票</h2>
      <div className="space-y-6 text-lg text-gray-800 leading-relaxed font-normal">
        <p>
          不要试图完全理解了才开始。游泳是游出来的，不是看书看出来的。
        </p>
        <p className="font-bold text-xl text-center py-4">
          最好的学习方式，就是拥有你的第一笔比特币。
        </p>
        <p>
          不需要买一个完整的比特币（太贵了！）。你可以只买 <strong>1000 元</strong>。
          当你拥有了它，你就会开始关注它，去学习它的波动，去理解它的价值。
        </p>
        <div className="bg-gray-100 p-6 rounded-xl border-l-4 border-bitcoin-orange">
          <p className="italic text-gray-600">
            "纸上得来终觉浅，绝知此事要躬行。"
          </p>
        </div>
      </div>
    </Section>
  );
}
