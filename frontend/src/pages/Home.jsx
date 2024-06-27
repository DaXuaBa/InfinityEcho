import { useState } from 'react';
import USMap from './USMap';
import SOL from './SizeOfLead';
import BTG from './Battleground';
import FS from './FlippedSeats';
import StateResult from './StateResult';
import ElectioneersPage from './ElectioneersPage';
import GetData from './GetData';
import ElectionSummary from './ElectionSummary';
import RealTimeChart from './RealtimeChart';

export default function Home() {
  const [showMap, setShowMap] = useState(true);
  const [showSOL, setShowSOL] = useState(false);
  const [showBTG, setShowBTG] = useState(false);
  const [showFS, setShowFS] = useState(false);

  const handleProjectionClick = () => {
    if (!showMap) {
      setShowMap(true);
      setShowSOL(false);
      setShowBTG(false);
      setShowFS(false);
    }
  };

  const handleSizeofLeadClick = () => {
    if (!showSOL) {
      setShowMap(false);
      setShowSOL(true);
      setShowBTG(false);
      setShowFS(false);
    }
  };

  const handleBattlegroundClick = () => {
    if (!showBTG) {
      setShowMap(false);
      setShowSOL(false);
      setShowBTG(true);
      setShowFS(false);
    }
  };

  const handleFlippedSeatsClick = () => {
    if (!showFS) {
      setShowMap(false);
      setShowSOL(false);
      setShowBTG(false);
      setShowFS(true);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center items-center gap-6 p-25 px-3'>
        <ElectioneersPage/>
      </div>
      <div className="w-full mt-4 flex justify-center gap-10">
        <a href="https://www.w3.org/html/" target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 bg-white shadow-md">
          <img src="html.svg" alt="HTML" className="w-8" />
        </a>
        <a href="https://www.w3.org/Style/CSS/" target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 bg-white shadow-md">
          <img src="css.svg" alt="CSS" className="w-8" />
        </a>
        <a href="https://www.javascript.com/" target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 bg-white shadow-md">
          <img src="js.svg" alt="JavaScript" className="w-8" />
        </a>
        <a href="https://reactjs.org/" target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 bg-white shadow-md">
          <img src="re.svg" alt="React" className="w-8" />
        </a>
        <a href="https://vitejs.dev/" target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 bg-white shadow-md">
          <img src="vite.svg" alt="Vite" className="w-8" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 bg-white shadow-md">
          <img src="tw.svg" alt="Tailwind CSS" className="w-8" />
        </a>
        <a href="https://fastapi.tiangolo.com/" target="_blank" className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 bg-white shadow-md">
          <img src="fa.svg" alt="FastAPI" className="w-8" />
        </a>
      </div>
      <div className="my-20 h-[6px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div className='flex items-center justify-evenly'>
        <div className='flex flex-col justify-start items-center gap-6 p-25 px-3'>
          {/* Button 1 */}
          <button className="text-sm font-bold focus:outline-none flex flex-col items-center border border-gray-500 rounded-lg p-2"
            onClick={handleProjectionClick} disabled={showMap}>
            <img src={'./call-m.svg'} alt="Button 1" className="w-24 h-12 rounded-mb" />
            <span>Projection</span>
          </button>
          {/* Button 2 */}
          <button className="text-sm font-bold focus:outline-none flex flex-col items-center border border-gray-500 rounded-lg p-2"
          onClick={handleSizeofLeadClick} disabled={showSOL}>
            <img src={'./lead-m.svg'} alt="Button 2" className="w-24 h-12 rounded-mb" />
            <span>Size of Lead</span>
          </button>
          {/* Button 3 */}
          <button className="text-sm font-bold focus:outline-none flex flex-col items-center border border-gray-500 rounded-lg p-2"
          onClick={handleBattlegroundClick} disabled={showBTG}>
            <img src={'./keyrace-m.svg'} alt="Button 3" className="w-24 h-12 rounded-mb" />
            <span>Battleground</span>
          </button>
          {/* Button 4 */}
          <button className="text-sm font-bold focus:outline-none flex flex-col items-center border border-gray-500 rounded-lg p-2"
          onClick={handleFlippedSeatsClick} disabled={showFS}>
            <img src={'./flip-m.svg'} alt="Button 4" className="w-24 h-12 rounded-mb" />
            <span>Flipped Seats</span>
          </button>
        </div>
        
        {/* Phần hiển thị component */}
        {showMap ? <USMap /> : null}
        {showSOL ? <SOL /> : null}
        {showBTG ? <BTG /> : null}
        {showFS ? <FS /> : null}
      </div>

      <div className="mt-20 h-[6px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <ElectionSummary />
      <div className="mb-14 flex flex-col items-center justify-center h-screen text-center">
        <h1 className="mb-5 text-4xl text-teal-500 font-bold hover:underline text-center">STATE RESULTS</h1>
        <div className="relative w-4/5 h-96">
            <RealTimeChart />
        </div>
      </div>    
      <GetData />
      <StateResult />
    </div>
  );
}
