import { Section } from './Section';
import { Smartphone, HardDrive, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Wallet() {
  const [copied, setCopied] = useState(false);
  const discountCode = '353NJY';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="wallet" className="bg-white rounded-3xl shadow-sm my-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">真正拥有你的资产</h2>
      <div className="space-y-6 text-lg text-gray-800 leading-relaxed font-normal">
        <p>
          放在交易所的币，严格来说不属于你，那是交易所欠你的债（IOU）。
          只有提币到自己的钱包，掌握了<strong>私钥</strong>，你才是真正的主人。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
            <Smartphone className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">软件钱包 (热钱包)</h3>
            <p className="text-sm text-gray-500 mb-4">适合小额日常使用，免费、便捷</p>
            <ul className="text-left space-y-2 w-full">
              <li className="border-b border-gray-200 pb-2">
                <strong>OneKey App:</strong> 体验极佳，开源安全
              </li>
              <li className="pt-1">
                <strong>imToken:</strong> 老牌国产钱包
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-bitcoin-orange/20 relative">
            <HardDrive className="w-12 h-12 text-bitcoin-orange mb-4" />
            <h3 className="text-xl font-bold mb-2">硬件钱包 (冷钱包)</h3>
            <p className="text-sm text-gray-500 mb-4">大额资产必备，私钥永不触网</p>
            <p className="mb-4 text-left w-full">
              推荐 <strong>OneKey</strong> 硬件钱包。安全、易用、全平台支持。
            </p>
            <a 
              href="https://onekey.so/r/G7CPQB" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bitcoin-orange text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors w-full mb-4 shadow-md hover:shadow-lg"
            >
              购买 OneKey
            </a>
            
            <div 
              className="w-full bg-white px-4 py-2 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:border-bitcoin-orange hover:bg-orange-50 transition-all group flex items-center justify-between relative z-10"
              onClick={copyToClipboard}
              role="button"
              title="点击复制优惠码"
            >
              <span className="text-sm font-bold text-bitcoin-orange">优惠码（10%折扣）:</span>
              <div className="flex items-center gap-2">
                <code className="font-mono font-bold text-bitcoin-orange text-lg tracking-wide">{discountCode}</code>
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-bitcoin-orange transition-colors" />
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-1 text-xs text-green-600 font-medium bg-white px-2 py-0.5 rounded-md shadow-sm border border-green-100 z-20"
                >
                  已复制优惠码！
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
