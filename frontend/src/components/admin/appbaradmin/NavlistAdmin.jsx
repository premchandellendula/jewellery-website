import React from 'react'
import { Link } from 'react-router-dom'

const NavListAdmin = () => {
  return (
    <div className='flex flex-col justify-center'>
        <ul className='flex justify-between text-black'>
            <Link to={'/admin/'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Home</li>
            </Link>

            <Link to={'/admin/categories'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Categories</li>
            </Link>

            <Link to={'/admin/gallery'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Gallery</li>
            </Link>

            <Link to={'/admin/works'}>
                <li className='px-5 text-lg hover:text-violet-800 ease-in font-medium'>Works</li>
            </Link>
        </ul>
    </div>
  )
}

export default NavListAdmin