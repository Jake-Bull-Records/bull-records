import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CrateDigger from './pages/CrateDigger';
import PageNotFound from './pages/PageNotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/crate-digger' element={<CrateDigger/>} />
        <Route path='*' element={<PageNotFound/>} />
        <Route path='profile' element={<Profile/>}/>
      </Routes>
      <Footer />
    </Router>
   );
  }
export default App
