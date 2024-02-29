// IMPORTING NECESSARY FILES
  // IMPORTING MODULES
import { getAuth, deleteUser} from 'firebase/auth';
import { useState } from 'react';
    // IMPORTING COMPONENTS
import { Link, useNavigate } from 'react-router-dom'; 
  // IMPORTING STYLESHEETS
import '../css/App.css';

// EXPORTING A FUNCTION THAT RETURNS A SIGNOUT PAGE
export default function Signout() {
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
        await deleteUser(auth.currentUser)
        setStates(prevState => ({...prevState, success: "Signed out successfully"}))
        navigate('/')
    }catch(error){
        setStates(prevState => ({...prevState, success: ""}))
        alert(error.message);
    }finally{
      setStates(prevState => ({...prevState, loading: false}))
    }
  };

  return (
    <div className='App'>
      <button className="button" onClick={handleSignout} disabled={states.loading}>Sign out</button>
      <Link to="/contacts">Go back home</Link>
      <Link to="/logout">Log out</Link>

      {states.loading && <p>Loading...</p>}
      {states.success && <p>{states.success}</p>}
    </div>
  );
}