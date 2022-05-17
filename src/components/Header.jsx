import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-red-200'>
      <h1 
        className='font-semibold font-sans text-2xl
        '
      >
        Where's Waldo
      </h1>
      <div className='px-4 cursor-pointer md:hidden'>
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" fill="none" 
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" 
            strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      <nav
        className='flex justify-around flex-col
        text-right
        md:flex-row'
      >
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/leaderboard'>Leaderboard</NavLink>
      </nav>
    </header>
  );
};
