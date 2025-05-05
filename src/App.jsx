import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import CrateDigger from './pages/CrateDigger.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Profile from './pages/Profile.jsx';

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
