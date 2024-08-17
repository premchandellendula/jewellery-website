import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavList from './NavList'

const Appbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 30){
        setScrolled(true);
      }else{
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`w-full flex justify-between px-6 py-4 z-50 border-b shadow-md bg-white`}>
        <Link to={'/'} className='flex items-center'>
            <div className='flex flex-col justify-center text-2xl font-semibold cursor-pointer'>
                LogoReveal
            </div>
        </Link>

        <NavList />

        <div className='flex justify-center'>
            <Link to={"/signin"}>
              <button type="button" className="text-black bg-slate-200 hover:bg-slate-300 focus:outline-none font-medium rounded-full text-base px-5 py-2.5 text-center me-2 w-28 shadow-md">Sign In</button>
            </Link>

            <Link to={"/signup"}>
              <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-full text-base px-5 py-2.5 text-center me-2 w-28 shadow-md">Sign Up</button>
            </Link>
        </div>
    </div>
  )
}

export default Appbar