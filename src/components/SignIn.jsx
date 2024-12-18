import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { googleProvider, auth } from '../firebase'

export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
    } catch (error) {
        setError(`Error: ${error}`)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider)
        navigate('/')
    } catch (error) {
        setError(`Error: ${error}`)
    }
  }

  return (
    <div className='signin'>
        <h2>Sign In</h2>
        <input className='inputsignInUp' type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Username' required/>
        <input className='inputsignInUp' type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required/>
        <button onClick={handleSignIn}>Sign In</button> | 
        <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
        {error && <p style={{ color: '#ff4d4f' }}>{error}</p>}
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  )
}

export default SignIn