import USMap from './USMap';

export default function Home() {
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex flex-col justify-center items-center gap-6 p-25 px-3'>
        <p className='mt-5 text-3xl font-bold lg:text-6xl'>US Election Prediction</p>
        <div className="w-full h-[6px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="flex items-center gap-4 mt-6">
          <p className="antialiased font-extrabold text-lg mr-2">My Election</p>
          <div className="w-4 h-4 bg-customBlue rounded-full"></div>
          <p className="text-sm">Biden</p>
          <div className="w-4 h-4 bg-customRed rounded-full"></div>
          <p className="text-sm">Trump</p>
        </div>
      </div>
      <USMap />
      <p className='mt-20 mb-80 text-xs sm:text-sm text-teal-500 font-bold hover:underline text-center'>Battleground States</p>
    </div>
  );
}