import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NavListAdmin from './NavlistAdmin'
import { useAuth } from '../../../pages/auth/AuthProvider'

const AppBarAdmin
 = () => {
  return (
    <div className={`w-full flex justify-between px-6 py-4 z-50 border-b shadow-md bg-white`}>
        <Link to={'/admin'} className='flex items-center'>
            <div className='flex flex-col justify-center text-2xl font-semibold cursor-pointer'>
                LogoReveal
            </div>
        </Link>

        <NavListAdmin />

        <div className='flex justify-center'>
            {/* <Link to={"/signin"}>
              <button type="button" className="text-black bg-slate-200 hover:bg-slate-300 focus:outline-none font-medium rounded-full text-base px-5 py-2.5 text-center me-2 w-28 shadow-md">Sign In</button>
            </Link> */}

            
              <FlyoutLink>
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  width="22" 
                  height="22" 
                  viewBox="0 0 24 24" 
                  style={{fill: 'rgba(255, 255, 255)', transform: '', msFilter: ''}}>
                    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                </svg>
              </FlyoutLink>
            
        </div>
    </div>
  )
}




export default AppBarAdmin
