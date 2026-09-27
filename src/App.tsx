import { WhatIsBitcoin } from './components/WhatIsBitcoin';
import { HowToBuy } from './components/HowToBuy';
import { Experience } from './components/Experience';
import { Wallet } from './components/Wallet';
import { LongTerm } from './components/LongTerm';
import { Consultation } from './components/Consultation';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-bitcoin-orange selection:text-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <WhatIsBitcoin />
        <Experience />
        <HowToBuy />
        <Wallet />
        <LongTerm />
        <Consultation />
      </div>
      <Footer />
    </div>
  );
}

export default App;
