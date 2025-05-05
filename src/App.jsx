import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import CrateDigger from './pages/crate-digger';
import PageNotFound from './pages/pagenotfound';
import NavBar from './components/NavBar';
import Footer from './components/footer';
import Profile from './pages/profile'

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
