import { useState } from 'react';
import USMap from './USMap';
import SOL from './SizeOfLead';
import BTG from './Battleground';
import FS from './FlippedSeats';
import StateResult from './StateResult';
import ElectioneersPage from './ElectioneersPage';
import GetData from './GetData';

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
      <div className="w-full mt-10 flex justify-center gap-12">
          <div className="flex items-center">
            <span className='text-lg antialiased font-serif'>Shell</span>
          </div>
          <div className="flex items-center">
              <img src="b.jpg" alt="BP" className="w-12" />
          </div>
          <div className="flex items-center">
              <img src="c.jpg" alt="Chevron" className="w-12" />
          </div>
          <div className="flex items-center">
            <span className='text-lg font-serif	antialiased italic'>Chevron</span>
          </div>
          <div className="flex items-center">
            <span className='text-lg subpixel-antialiased font-sans'>ExxonMobil</span>
          </div>
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

      <div className="my-20 h-[6px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <p className='mb-10 text-4xl text-teal-500 font-bold hover:underline text-center'>STATE RESULTS</p>
      <div className="flex justify-center items-center my-8">
        <iframe
          src="http://leesin.click:3000/d-solo/cdlslwhwvgruob/election?orgId=1&from=1715776706815&to=1715787506815&panelId=1"
          width="1050"
          height="400"
        ></iframe>
      </div>      
      <GetData />
      <StateResult />
    </div>
  );
}
