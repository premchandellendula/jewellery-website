import React from 'react'
import { Link } from 'react-router-dom'

const UserNavList = () => {
  return (
    <div className='flex flex-col justify-center'>
        <ul className='flex justify-between text-black'>
            <Link to={'/homepage'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Home</li>
            </Link>

            <Link to={'/about'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>About</li>
            </Link>

            <Link to={'/categories'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Categories</li>
            </Link>

            <Link to={'/gallery'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Gallery</li>
            </Link>

            <Link to={'/contact'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Contact</li>
            </Link>
        </ul>
    </div>
  )
}

export default UserNavList