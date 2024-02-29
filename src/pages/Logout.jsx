// IMPORTING NECESSARY FILES
  // IMPORTING MODULES
import { useState } from 'react';
import { getAuth, signOut} from 'firebase/auth';
    // IMPORTING COMPONENTS
import { Link, useNavigate } from 'react-router-dom'; 
  // IMPORTING STYLESHEETS
import '../css/App.css';

// EXPORTING A FUNCTION THAT RETURNS A LOGOUT PAGE
export default function Logout() {
  // DEFINING A STATE TO TRACK THE SUCCESS AND LOADING STATES
  const [states, setStates]= useState({
    success: '',
    loading: false
  })

  // GETTING THE USER CREDENTIALS
  const auth = getAuth();
  const navigate = useNavigate()

  // A FUNCTION TO HANDLE SIGNING OUT
  const handleSignout = async () => {
    setStates(prevState => ({...prevState, loading: true}))

    try{
        await signOut(auth)
        setStates(prevState => ({...prevState, success: "Logged out successfully"}))
        navigate('/')
    }catch(error){
        alert(error.message);
    }finally{
      setStates(prevState => ({...prevState, loading: false}))
    }
  };

  return (
    <div className='App'>
      <button className="button" onClick={handleSignout} disabled={states.loading}>Log out</button>
      <Link to="/contacts">Go back home</Link>
      <Link to="/signout">Sign out</Link>

      {states.loading && <p>Loading...</p>}
      {states.success && <p>{states.success}</p>}
    </div>
  );
}