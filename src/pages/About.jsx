export default function About() {
  return (
    <>
      <h2 className='text-center text-xl uppercase my-4 sm:my-6'>
        about
      </h2>
      <p>
        Built by:
        <a 
          href='https://github.com/mrjgamboa'
          className='text-blue-500 hover:text-blue-700 ml-1'
        >
          L4ck (mrjgamboa)
        </a>
      </p>
      <p>
        Source code:
        <a 
          href='https://github.com/mrjgamboa/where-s-waldo'
          className='text-blue-500 hover:text-blue-700 ml-1'
        >
          https://github.com/mrjgamboa/where-s-waldo
        </a>
      </p>
      <p>
        Game console arts by:
        <a 
          href='https://www.artstation.com/pierreroussel'
          className='text-blue-500 hover:text-blue-700 ml-1'
        >
          Pierre Roussel
        </a>
      </p>
    </>
  );
};
