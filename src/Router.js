import { 
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';

export default function Router(params) {
  //! use <BrowserRouter basename='/where-s-waldo'>
  //! when adding to gh-pages
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          {/* <Route index element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
