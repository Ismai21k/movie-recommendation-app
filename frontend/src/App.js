import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Recommendations from './pages/Recommendations';
import SaveCollections from './pages/saveCollections';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/getcollection/:id' element={<SaveCollections />} />
        <Route path="/home"  element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/recommend/:tmdbId" element={<Recommendations />} />
      </Routes>
    </Router>
  );
}

export default App;
