import { Section } from './Section';
import { ExternalLink, Copy, Check, Star } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HowToBuy() {
  const [copiedOkx, setCopiedOkx] = useState(false);
  
  const okxCode = '2160255';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedOkx(true);
    setTimeout(() => setCopiedOkx(false), 2000);
  };

  return (
    <Section id="how-to-buy" className="bg-white rounded-3xl shadow-sm my-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">如何购买0.003枚比特币？</h2>
      <div className="space-y-6 text-lg text-gray-800 leading-relaxed font-normal">
        <p>
          连接现实世界与数字黄金的桥梁，就是<strong>交易所</strong>。
        </p>
        <p>
          最常用的方式是 <strong>C2C (Customer to Customer)</strong> 交易。
          它的逻辑和淘宝购物一样：
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>你在平台下单购买。</li>
          <li>你向卖家转账（支付宝/微信/银行卡）。</li>
          <li>卖家确认收款，平台放币给你。</li>
        </ol>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* OKX Card - Priority Recommended */}
          <div className="relative group block p-6 border-2 border-bitcoin-orange rounded-xl shadow-lg transform transition-transform hover:-translate-y-1 bg-orange-50/30">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bitcoin-orange text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
              <Star className="w-3 h-3 fill-current" />
              重点推荐
            </div>
            
            <a 
              href="https://www.glneokotyjv.com/join/2160255" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex justify-between items-center mb-4 hover:opacity-80 transition-opacity"
            >
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                OKX (欧易)
              </h3>
              <ExternalLink className="w-5 h-5 text-bitcoin-orange" />
            </a>
            <p className="text-sm text-gray-600 mb-4 font-medium">
              中文体验极佳，对新手最友好的老牌交易所
            </p>
            
            <div 
              className="bg-white p-3 rounded-lg border border-dashed border-bitcoin-orange/50 cursor-pointer hover:bg-orange-50 transition-colors flex items-center justify-between group/code relative"
              onClick={() => copyToClipboard(okxCode)}
              title="点击复制邀请码"
            >
              <span className="text-sm text-gray-500">邀请码:</span>
              <div className="flex items-center gap-2">
                <code className="font-mono font-bold text-bitcoin-orange text-lg tracking-wide">{okxCode}</code>
                {copiedOkx ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 group-hover/code:text-bitcoin-orange transition-colors" />
                )}
              </div>
              <AnimatePresence>
                {copiedOkx && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-8 right-0 text-xs text-green-600 font-medium bg-white px-2 py-1 rounded shadow border border-green-100 whitespace-nowrap z-20"
                  >
                    已复制！
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tutorial Card */}
          <div className="relative group block p-6 border border-gray-200 rounded-xl hover:border-gray-400 transition-colors">
            <a 
              href="https://buy.btchao.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex justify-between items-center mb-4 hover:opacity-80 transition-opacity"
            >
              <h3 className="text-xl font-bold text-gray-900">
                中国大陆用户购买比特币教程
              </h3>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </a>
            <p className="text-sm text-gray-500 mb-4">
              详细的安全指南，手把手教你如何合规购买
            </p>
            
            <a 
              href="https://buy.btchao.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 rounded-lg border border-gray-200 transition-colors"
            >
              查看完整教程
            </a>
          </div>
        </div>
        <p className="text-xs text-center text-gray-400 mt-4">
          *使用邀请链接注册可享受交易手续费减免
        </p>
      </div>
    </Section>
  );
}
