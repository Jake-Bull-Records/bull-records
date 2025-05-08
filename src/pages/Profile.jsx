import SignUp from '../components/SignUp'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {supabase} from '../supabaseClient'

function Profile(session){
return(
    <SignUp session={session}></SignUp>
);
}

export default Profile;