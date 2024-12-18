import React from 'react'
import { useNavigate } from 'react-router'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export const SignOut = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const confirmSignOut = window.confirm('Are you sure you want to sign out?')
    if (confirmSignOut) {
        await signOut(auth)
        navigate('/signin')
    }
  }

  return <button onClick={handleSignOut}>Sign Out</button>
}

export default SignOut
