// IMPORTING NECESSARY FILES
  // IMPORTING MODULES
import { useState, useEffect } from 'react';

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider 
} from 'firebase/auth';

    // IMPORTING COMPONENTS
import { Link, useNavigate } from 'react-router-dom'; 
  // IMPORTING STYLESHEETS
import '../css/App.css';

// EXPORTING A FUNCTION THAT RETURNS A SIGNIN PAGE
export default function Signin() {
  // ENSURE USER IS NOT AUTHENTICATEDD
  const user = getAuth();
  const navigate = useNavigate()
  useEffect(() => {if(user.currentUser) navigate('/home/contacts')}, [user.currentUser, navigate])
  
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
      await signInWithEmailAndPassword(user, formData.email, formData.password)
      setStates(prevState => ({...prevState, success: "Signed in successfully"}))
      return navigate('/home/contacts')
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
        await signInWithPopup(user, googleProvider)
        setStates(prevState => ({...prevState, success: "Signed in successfully"}))
        return navigate('/home/contacts')
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
        await signInWithPopup(user, githubProvider)
        setStates(prevState => ({...prevState, success: "Signed in successfully"}))
        return navigate('/home/contacts')
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

      <button className="button" disabled={states.loading} onClick={handleSubmit}>Sign in with email</button>
      <button className="button" disabled={states.loading} onClick={handleGoogle}>Sign in with Google</button>
      <button className="button" disabled={states.loading} onClick={handleGithub}>Sign in with Github</button>
      <Link to="/auth/signup">Don&apos;t have an account? Sign up</Link>

      {states.loading && <p>Loading...</p>}
      {states.success && <p>{states.success}</p>}
    </div>
  );
}