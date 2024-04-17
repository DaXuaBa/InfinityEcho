export default function Blog() {
  return (
    <div className='flex flex-col justify-center items-center gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to DaXuBa Blog</h1>
      <p className='text-gray-500 text-xs sm:text-sm text-center'>
          Discover our real-time US election forecasting system! <br />
          Using cutting-edge technology, we analyze social media, polls, and more to 
          deliver instant insights into the <br />
          ever-changing political climate. Stay ahead of the curve with our accurate predictions and timely updates!
      </p>
      <p className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        LEARN MORE
      </p>
    </div> 
  )
}
