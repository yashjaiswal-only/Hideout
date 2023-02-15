import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';


const Signin = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const {signin, signInWithGoogle, signInWithFacebook, currentUser} = useAuth();
  const [error, setError]= useState('');
  const [loading, setLoading]= useState(false);

  async function handleSubmit(e){
    e.preventDefault();

    try{
      setError('')
      setLoading(true)
      await signin(emailRef.current.value,passwordRef.current.value)
      setError('Signed in')
    }catch(error){
      setError('Failed to sign in!! Please try again')
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
            <button type='submit' disabled={loading}>Log in</button>
        </form>
        <div>
          <div><button onClick={googleSignin}>Sign up With Google</button></div>
          <div><button onClick={fbSignin}>Sign up With Facebook</button></div>
          <Link to='/signup'>
            <span>New User? Sign Up</span>
          </Link>
          
        </div>
    </div>
  )
}

export default Signin