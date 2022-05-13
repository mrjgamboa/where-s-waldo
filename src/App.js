import Header from './components/Header';
import { Outlet } from 'react-router-dom';

export default function App() {
  // wrap div inside context providers
  return (
    <div
      className='
        h-screen flex flex-col overflow-auto
        bg-primary text-secondary
      '
    >
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      {/* footer */}
    </div>
  );
}
