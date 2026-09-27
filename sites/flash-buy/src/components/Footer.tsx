export function Footer() {
  return (
    <footer className="py-10 px-4 text-center text-gray-400 text-xs md:text-sm bg-gray-900 mt-20">
      <div className="max-w-4xl mx-auto space-y-4">
        <p className="font-bold text-gray-300 text-base">风险提示 (Risk Warning)</p>
        <p className="leading-relaxed">
          本站内容仅供科普和教育目的，不构成任何投资建议。
          <br className="hidden md:block" />
          加密货币市场波动巨大，存在较高的市场风险和法律风险，请务必遵守您所在国家或地区的法律法规。
        </p>
        <p className="text-red-400/90 font-medium">
          如果您是抱有短期投机、杠杆交易或赌徒心态，请勿购买比特币，也请勿联系咨询。
        </p>
        <p>
          投资有风险，入市需谨慎。
        </p>
        
        <div className="pt-8 border-t border-gray-800 mt-8 text-gray-500">
          <p>© {new Date().getFullYear()} Bitcoin Flash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
