import React from 'react'
import { useAuth } from '../../pages/auth/AuthProvider'
import Appbar from '../appbar/Appbar';

const Logout = () => {
    const { logout } = useAuth();
  return (
    <div>
        <Appbar />
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout