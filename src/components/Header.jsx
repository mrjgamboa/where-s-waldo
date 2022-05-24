import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleNav = () => isVisible ? setIsVisible(false) :  setIsVisible(true);

  return (
    <header>
      <div className='flex justify-between items-center my-2'>
        <h1 
          className='font-semibold font-sans text-2xl
          '
        >
          Where's Waldo
        </h1>
        <div onClick={toggleNav}
          tabIndex={0}
          className= 'px-1 cursor-pointer md:hidden'
        >
          <svg xmlns='http://www.w3.org/2000/svg' 
            className='h-6 w-6' fill='none' 
            viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}
          >
            <path strokeLinecap='round' 
              strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </div>
      </div>
      <nav
        className={(isVisible ? 'hidden ' : '') +
          `flex md:flex flex-col md:flex-row items-end 
          m-2 md:w-80 md:place-content-around md:ml-auto`
        }
      >
        <NavLink to='/' 
          className='flex flex-row-reverse md:flex-row  items-center'
        >
          <svg xmlns='http://www.w3.org/2000/svg' 
            className='h-5 w-5 inline-block ml-1 md:ml-0 md:mr-1' 
            fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' 
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 
              1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 
              1 0 001 1m-6 0h6'
            />
          </svg>
          Home
        </NavLink>
        <NavLink to='/leaderboard'
          className='flex flex-row-reverse md:flex-row  items-center'
        >
          <svg xmlns='http://www.w3.org/2000/svg' 
            className='h-5 w-5 inline-block ml-1 md:ml-0 md:mr-1' 
            fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' 
              d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 
              3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 
              0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 
              9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Leaderboard
        </NavLink>
      </nav>
    </header>
  );
};
