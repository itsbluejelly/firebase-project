// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import { useState } from 'react';

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider 
} from 'firebase/auth';

    // IMPORTING COMPONENTS
import { Link, useNavigate } from 'react-router-dom'; 
  // IMPORTING STYLESHEETS
import '../css/App.css';

// EXPORTING A FUNCTION THAT RETURNS A SIGNUP PAGE
export default function Signup() {
  const navigate = useNavigate()

  // DEFINING A STATE TO TRACK THE FORM
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // DEFINING A STATE TO TRACK THE SUCCESS AND LOADING STATES
  const [states, setStates]= useState({
    success: '',
    loading: false
  })

  // GETTING THE USER CREDENTIALS
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  // A FUNCTION TO HANDLE FORMDATA
  function handleFormData(event){
    const {name, value} = event.target
    setFormData({ ...formData, [name]: value });
  }

  // A FUNCTION TO HANDLE FORM SUBMISSION
  const handleSubmit = async () => {
    setStates(prevState => ({...prevState, loading: true}))

    try{
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      setStates(prevState => ({...prevState, success: "Signed up successfully"}))
      return navigate('/contacts')
    }catch(error){
      setStates(prevState => ({...prevState, success: ""}))
      alert(error.message);
    }finally{
      setStates(prevState => ({...prevState, loading: false}))
    }
  };

  // A FUNCTION TO HANDLE GOOGLE SIGN IN
  const handleGoogle = async () => {
    setStates(prevState => ({...prevState, loading: true}))

    try{
        await signInWithPopup(auth, googleProvider)
        setStates(prevState => ({...prevState, success: "Signed up successfully"}))
        return navigate('/contacts')
    }catch(error){
      setStates(prevState => ({...prevState, success: ""}))

      alert(
        error.code === "auth/account-exists-with-different-credential" 
          ?
        "You already signed in with another provider, try using github"
          : 
        error.message
      );
    }finally{
      setStates(prevState => ({...prevState, loading: false}))
    }
  };

  // A FUNCTION TO HANDLE GITHUB SIGN IN
  const handleGithub = async () => {
    setStates(prevState => ({...prevState, loading: true}))

    try{
        await signInWithPopup(auth, githubProvider)
        setStates(prevState => ({...prevState, success: "Signed up successfully"}))
        return navigate('/contacts')
    }catch(error){
      setStates(prevState => ({...prevState, success: ""}))
      
      alert(
        error.code === "auth/account-exists-with-different-credential" 
          ?
        "You already signed in with another provider, try using google"
          : 
        error.message
      );
    }finally{
      setStates(prevState => ({...prevState, loading: false}))
    }
  };

  return (
    <div className='App'>
      <input
        className="input-field"
        type="email"
        name='email'
        placeholder='email'
        onChange={(e) => handleFormData(e)}
      />

      <input
        className="input-field"
        type="password"
        name='password'
        placeholder='password'
        onChange={(e) => handleFormData(e)}
      />

      <button className="button" disabled={states.loading} onClick={handleSubmit}>Log in with email</button>
      <button className="button" disabled={states.loading} onClick={handleGoogle}>Log in with Google</button>
      <button className="button" disabled={states.loading} onClick={handleGithub}>Log in with Github</button>
      <Link to="/login">Already have an account? Login</Link>

      {states.loading && <p>Loading...</p>}
      {states.success && <p>{states.success}</p>}
    </div>
  );
}