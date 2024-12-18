import React, { useState } from 'react'
import { Link } from 'react-router'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'


export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      setError(`Error: ${error}`)
    }
  }

  return (
    <div className='signup'>
      <h2>Sign Up</h2>
      <input className='inputsignInUp' type="email" placeholder='Enter Username' onChange={(e) => setEmail(e.target.value)} required/>
      <input className='inputsignInUp' type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required/>
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p style={{ color: '#ff4d4f' }}>{error}</p>}
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  )
}

export default SignUp
