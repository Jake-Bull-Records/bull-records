import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './app.css';
import Home from './pages/Home.jsx';
import CrateDigger from './pages/CrateDigger.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Profile from './pages/Profile.jsx';
import MyStore from './pages/MyStore.jsx';
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {supabase} from './supabaseClient'

function App() {
  const [session, setSession] = useState(null); //Initializes session as null
  const [loading, setLoading] = useState(true); //Initializes loading as true

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { 
      // console.log("Initial session from getSession:", session);
      setSession(session);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log("Auth event:", event, "Session:", session);
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (loading) { //While loading is true, just return this little div here
    return <div className='pageContent'><h1>Loading...</h1></div>;
  }
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/crate-digger' element={<CrateDigger/>} />
        <Route path='*' element={<PageNotFound/>} />
        <Route path="Profile" element={<Profile session={session} />} /> 
        <Route path="MyStore" element={<MyStore session={session} />} />
      </Routes>
      <Footer />
    </Router>
   );
  }
export default App
