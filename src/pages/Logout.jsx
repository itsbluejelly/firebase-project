// IMPORTING NECESSARY FILES
  // IMPORTING MODULES
import { useState, useEffect } from 'react';
import { getAuth, signOut} from 'firebase/auth';
    // IMPORTING COMPONENTS
import { Link, useNavigate } from 'react-router-dom'; 
  // IMPORTING STYLESHEETS
import '../css/App.css';

// EXPORTING A FUNCTION THAT RETURNS A LOGOUT PAGE
export default function Logout() {
  // ENSURE USER IS AUTHENTICATEDD
  const user = getAuth();
  const navigate = useNavigate()
  useEffect(() => {if(!user.currentUser) navigate('/auth/login')}, [user.currentUser, navigate])

  // DEFINING A STATE TO TRACK THE SUCCESS AND LOADING STATES
  const [states, setStates]= useState({
    success: '',
    loading: false
  })

  // A FUNCTION TO HANDLE SIGNING OUT
  const handleSignout = async () => {
    setStates(prevState => ({...prevState, loading: true}))

    try{
        await signOut(user)
        setStates(prevState => ({...prevState, success: "Logged out successfully"}))
        navigate('/auth/login')
    }catch(error){
        setStates(prevState => ({...prevState, success: ""}))
        alert(error.message);
    }finally{
      setStates(prevState => ({...prevState, loading: false}))
    }
  };

  return (
    <div className='App'>
      <button className="button" onClick={handleSignout} disabled={states.loading}>Log out</button>
      <Link to="/home/contacts">Go back home</Link>
      <Link to="/home/signout">Sign out</Link>

      {states.loading && <p>Loading...</p>}
      {states.success && <p>{states.success}</p>}
    </div>
  );
}