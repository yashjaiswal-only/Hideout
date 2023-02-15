import React,{useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signup, signInWithGoogle, signInWithFacebook, currentUser} = useAuth();
  const [error, setError]= useState('');
  const [loading, setLoading]= useState(false);

  async function handleSubmit(e){
    e.preventDefault();

    if(passwordConfirmRef.current.value!==passwordRef.current.value){
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value,passwordRef.current.value)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setError('Failed to sign up!! Please try again')
    }
    setLoading(false)
  }

  async function googleSignin(e){
    e.preventDefault()
    try{
      setError('')
      setLoading(true)
      await signInWithGoogle()
      setError('Signed in')
    }catch(error){
      setError('Failed to sign in!! Please try again')
    }
    setLoading(false)
  }


  async function fbSignin(e){
    e.preventDefault()
    try{
      setError('')
      setLoading(true)
      await signInWithFacebook()
      setError('Signed in')
    }catch(error){
      setError('Failed to sign in!! Please try again')
    }
    setLoading(false)
  }

  return (
    <div>
        {error && <span>{error}</span>}
        <form onSubmit={handleSubmit}>
            <input placeholder='Email' type="email" ref={emailRef} required/>
            <input placeholder='Password' type="password" ref={passwordRef} required/>
            <input placeholder='Confirm Password' type="password" ref={passwordConfirmRef} required/>
            <button disabled={loading} type="submit"> Sign Up </button>
        </form>
        <div>
        <div><button onClick={googleSignin}>Sign in With Google</button></div>
        <div><button onClick={fbSignin}>Sign in With Facebook</button></div>
          <Link to='/signin'>
            <span>Already have an account? Log in</span>
          </Link>
          
        </div>
    </div>
  )
}

export default Signup