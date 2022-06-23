import { 
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/LeaderBoard';
import About from './pages/About';
import Admin from './pages/Admin';

export default function Router() {
  //! use <BrowserRouter basename='/where-s-waldo'>
  //! when adding to gh-pages
  //! remove basename if starting in localhost
  return (
    <BrowserRouter basename='/where-s-waldo'>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='leaderboard' element={<Leaderboard />} />
          <Route path='location/:location' element={<Game />} />
          <Route path='about' element={<About />} />
          <Route path='admin' element={<Admin />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
