import { Outlet } from 'react-router-dom';

export default function App() {
  // wrap div inside context providers
  return (
    <div
      className='h-screen flex flex-col overflow-auto bg-primary text-secondary'
    >
      <Outlet />
    </div>
  );
}
