import { Section } from './Section';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import qrCode from '../assets/kefufeishu.jpg';

export function Consultation() {
  const [showQR, setShowQR] = useState(false);

  return (
    <Section id="consultation" className="bg-gray-900 text-white rounded-3xl shadow-xl my-10 py-16 relative overflow-hidden">
      <div className="text-center relative z-10">
        <MessageCircle className="w-12 h-12 text-bitcoin-orange mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">免费咨询服务</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 px-4 font-normal">
          如果你确定使用我的邀请码注册交易所，并且能完成<strong className="text-bitcoin-orange text-xl mx-1">实名认证+100USDT</strong>的现货比特币交易，我可以免费指导你完成从交易所提币到钱包的全过程。
          <br />
          请通过飞书添加我的账号进行沟通。
        </p>
        
        <div className="relative inline-block">
          <button 
            className="bg-bitcoin-orange text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-orange-600 transition-transform hover:scale-105 active:scale-95 shadow-lg relative z-20"
            onMouseEnter={() => window.innerWidth >= 768 && setShowQR(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setShowQR(false)}
            onClick={() => setShowQR((prev) => !prev)}
          >
            飞书联系
          </button>

          <AnimatePresence>
            {showQR && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 z-50"
              >
                <div className="bg-white p-4 rounded-2xl shadow-2xl relative">
                  <div className="w-48 h-48 md:w-56 md:h-56">
                    <img 
                      src={qrCode} 
                      alt="Feishu QR Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 transform"></div>
                  <div className="text-center mt-2">
                    <p className="text-gray-900 text-sm font-bold">扫码添加飞书</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          * 硬件钱包咨询需提供购买凭证
        </p>
      </div>

      {/* Mobile Modal Fallback for better UX on small screens if needed, 
          but the tooltip above works well. Let's add a backdrop for mobile click. */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden flex items-center justify-center p-4"
            onClick={() => setShowQR(false)}
          >
             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-3xl max-w-sm w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setShowQR(false)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">飞书联系</h3>
                <div className="aspect-square w-full bg-gray-50 rounded-xl overflow-hidden mb-4">
                  <img 
                    src={qrCode} 
                    alt="Feishu QR Code" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <a
                  href={qrCode}
                  download="feishu-qr.jpg"
                  className="flex items-center justify-center w-full rounded-full border border-gray-200 text-gray-700 font-semibold py-2.5 mb-3 hover:border-gray-300 hover:text-gray-900 transition"
                >
                  保存二维码到相册
                </a>
                <p className="text-center text-gray-600 font-medium">
                  请截图扫码添加飞书，或长按图片保存
                </p>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
