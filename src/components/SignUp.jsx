import './profile.css';
import '../app.css';
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {supabase} from '../supabaseClient'
import {NavLink} from "react-router-dom";

function SignUp({session}){
  if (!session.session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  const handleSignOut = async () => {
      await supabase.auth.signOut();
  };

  return (
    <div className="pageContent">
      <h1>You're logged in right now brother</h1>
      <p>Email: {session.session.user.email}</p> 
          <NavLink to='/MyStore'>
              <button className='NavLinkButton'>My Store</button>
            </NavLink>
      <button onClick={handleSignOut}>Log Out</button>
    </div>
  );
}

export default SignUp