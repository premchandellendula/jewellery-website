import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavList from './NavList'
import { useAuth } from '../../pages/auth/AuthProvider'
import FlyoutLink from '../utils/FlyoutLink'
import { useCart } from '../../utils/CartContext'

const Appbar = () => {
  const { isAuthenticated } = useAuth();
  const { quantity } = useCart();
  return (
    <div className={`w-full flex justify-between px-6 py-4 z-50 border-b shadow-md bg-white`}>
        <Link to={'/'} className='flex items-center'>
            <div className='flex flex-col justify-center text-2xl font-semibold cursor-pointer'>
                LogoReveal
            </div>
        </Link>

        <NavList />

        {!isAuthenticated ? (
          <div className='flex justify-center'>
          <Link to={"/signin"}>
            <button type="button" className="text-black bg-slate-200 hover:bg-slate-300 focus:outline-none font-medium rounded-full text-base px-5 py-2.5 text-center me-2 w-28 shadow-md">Sign In</button>
          </Link>

          <Link to={"/signup"}>
            <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-full text-base px-5 py-2.5 text-center me-2 w-28 shadow-md">Sign Up</button>
          </Link>
      </div>
        ) : (
          <div className='flex justify-center gap-10'>
            <Link to={"/cart"} className=''>
              <div className='relative top-1'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="36" 
                  height="36" 
                  viewBox="0 0 24 24" 
                  style={{fill: 'rgba(0, 0, 0, 0.7)', transform: '', msFilter: ''}}>
                  <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
                  <circle cx="10.5" cy="19.5" r="1.5"></circle>
                  <circle cx="17.5" cy="19.5" r="1.5"></circle>
                </svg>
                <div className='absolute -top-0 left-4 z-50 text-white bg-violet-500 rounded-full font-semibold text-[12px] w-[50%] text-center'>{quantity}</div>
              </div>
            </Link>

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
        )}
    </div>
  )
}

export default Appbar