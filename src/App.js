import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

export default function App() {
  // wrap div inside context providers
  return (
    <div
      className='h-screen overflow-auto
      bg-primary text-secondary'
    >
      <div
        className='flex flex-col
        mx-1 md:mx-auto
        min-h-full md:w-5/6 md:max-w-screen-xl'
      >
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
