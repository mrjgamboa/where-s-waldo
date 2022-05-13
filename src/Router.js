import { 
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/LeaderBoard';
import NotFound from './pages/NotFound';

export default function Router() {
  //! use <BrowserRouter basename='/where-s-waldo'>
  //! when adding to gh-pages
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='game' element={<Game />} />
          <Route path='leaderboard' element={<Leaderboard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
