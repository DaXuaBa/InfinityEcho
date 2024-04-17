export default function About() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-4xl mx-auto py-12 px-6'>
        <h1 className='text-4xl font-bold text-center mb-8'>About DaXuBa Blog</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
            <p className='text-gray-700'>
              Welcome to DaXuBa Blog! Our mission is to provide valuable insights, tutorials, and resources for developers and technology enthusiasts. We strive to create a vibrant community where people can learn, grow, and connect with like-minded individuals.
            </p>
          </div>
          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Meet DaXuBa Professor</h2>
            <p className='text-gray-700'>
              DaXuBa is the creator of DaXuBa Blog. With a passion for technology and coding, DaXuBa shares his knowledge and experiences through engaging articles and tutorials. He believes in the power of continuous learning and is committed to helping others on their journey in the world of software development.
            </p>
          </div>
          <div className='bg-white shadow-lg rounded-lg p-6 col-span-2'>
            <h2 className='text-2xl font-semibold mb-4'>Join Our Community</h2>
            <p className='text-gray-700'>
              We invite you to join our growing community of learners and developers. Explore our articles, leave comments, and interact with fellow readers. Together, we can create a supportive environment where everyone can thrive and succeed in their coding journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
