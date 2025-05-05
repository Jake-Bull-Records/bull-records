import './profile.css';
import '../App.css';
import {signUp} from './profile.js'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {supabase} from '../supabaseClient'

function SignUp(){
    const [session, setSession] = useState(null)
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      return () => subscription.unsubscribe()
    }, [])
    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>)
    }
    else {
      return (<div>Logged in!</div>)
    }
// return(
//     <div className='pageContent'>
//         <h1>Sign Up</h1>
//         <form>
//             <label htmlFor='username'>Username: </label>
//             <input type='text' id='username' required></input>
//             <br/>
//             <label htmlFor='email'>Email: </label>
//             <input type='text' id='email' required></input>
//             <br/>
//             <label htmlFor='password'>Password: </label>
//             <input type='text' id='password' required></input>
//             <br/>
//             <input type='submit' value='Sign Up'></input>
//         </form>
//     </div>
// );
}

export default SignUp