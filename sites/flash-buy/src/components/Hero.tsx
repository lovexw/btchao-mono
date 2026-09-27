import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-24 h-24 bg-bitcoin-orange rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
          <span className="text-white text-5xl font-bold">₿</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
          Bitcoin
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-normal">
          从 0 到 100 的认知跨越
        </p>
        <p className="mt-4 text-gray-500">
          简单 • 纯粹 • 自由
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10"
      >
        <ArrowDown className="w-6 h-6 text-gray-400 animate-bounce" />
      </motion.div>
    </div>
  );
}
