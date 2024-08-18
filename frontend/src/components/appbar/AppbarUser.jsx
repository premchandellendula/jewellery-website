import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavList from './NavList'

const AppbarUser = () => {
  return (
    <div className={`w-full flex justify-between px-6 py-4 z-50 border-b shadow-md bg-white`}>
        <Link to={'/'} className='flex items-center'>
            <div className='flex flex-col justify-center text-2xl font-semibold cursor-pointer'>
                LogoReveal
            </div>
        </Link>

        <NavList />

        <div className='flex justify-center gap-10'>
            <Link to={"/signin"} className=''>
              <div className='relative top-1'>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="36" 
                  height="36" 
                  viewBox="0 0 24 24" 
                  style={{fill: 'rgba(0, 0, 0, 0.5)', transform: '', msFilter: ''}}>
                  <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
                  <circle cx="10.5" cy="19.5" r="1.5"></circle>
                  <circle cx="17.5" cy="19.5" r="1.5"></circle>
                </svg>
                <div className='absolute -top-2 left-4 z-50 text-violet-600 font-semibold text-[17px]'>0</div>
              </div>
            </Link>

            <Link to={"/signup"}>
              <div className='bg-gray-400 rounded-full p-2'>
                <svg
                  xmlns="http://www.w3.org/2000/svg" 
                  width="22" 
                  height="22" 
                  viewBox="0 0 24 24" 
                  style={{fill: 'rgba(255, 255, 255)', transform: '', msFilter: ''}}>
                    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
                </svg>
              </div>
            </Link>
        </div>
    </div>
  )
}

export default AppbarUser