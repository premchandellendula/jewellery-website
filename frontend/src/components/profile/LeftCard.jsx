import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../pages/auth/AuthProvider'
import axios from 'axios';
import { isTokenExpired } from '../../utils/auth';

const LeftCard = () => {
  const {logout} = useAuth();
  const [name, setName] = useState(localStorage.getItem('name') || '')

  const fetchDetails = async () => {
    if (isTokenExpired()) {
      logout(); // Trigger logout if token has expired
      return;
    }
    await axios.get('http://localhost:3000/api/v1/profile', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    })
    .then(response => {
        const {name} = response.data
        setName(name || '');
        localStorage.setItem('name', name || '');
    })
    .catch(err => {
        console.error(err)
        logout();
    })
  }
  useEffect(() => {
    if (!name) {
      fetchDetails();
    }
  }, [name]);
  const firstLetter = name.split(' ')[0] || ''
  const secondLetter = name.split(' ')[1] || ''

  return (
    <div className='bg-violet-500 rounded-xl'>
        <div className='flex bg-violet-500 rounded-xl shadow-lg shadow-violet-600 p-4'>
          <div className='bg-violet-300 text-white font-semibold p-3.5 rounded-full text-xl'>
            {firstLetter[0]}{secondLetter[0]}
          </div>
          <div className='flex justify-center items-center ml-4 text-xl text-white'>
            {name}
          </div>
        </div>

        <div className='w-[75%] m-auto mt-5 flex'>
          <div className='w-[100%] flex flex-col justify-between gap-2'> 

            <NavLink to="/profile" end className={({isActive}) => isActive ? 'cursor-pointer rounded-md flex justify-start items-center bg-violet-400 h-12 p-2' : 'cursor-pointer rounded-md flex justify-start items-center hover:bg-violet-400 h-12 p-2'}>
              <i className='bx bx-user text-white mr-3 text-2xl'></i>
              <a href="" className='text-white text-xl text-center'>My Profile</a>
            </NavLink> 

            <NavLink to="/profile/address" className={({isActive}) => isActive ? 'cursor-pointer rounded-md flex justify-start items-center bg-violet-400 h-12 p-2' : 'cursor-pointer rounded-md flex justify-start items-center hover:bg-violet-400 h-12 p-2'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none" className='mr-3'>
                  <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="2" />
                  <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="2" />
              </svg>
              <a href="" className='text-white text-xl text-center'>Address</a>
            </NavLink>

            <NavLink to="/profile/orders" className={({isActive}) => isActive ? 'cursor-pointer rounded-md flex justify-start items-center bg-violet-400 h-12 p-2' : 'cursor-pointer rounded-md flex justify-start items-center hover:bg-violet-400 h-12 p-2'}>
              <i class='bx bx-shopping-bag text-white mr-3 text-2xl'></i>
              <a href="" className='text-white text-xl text-center'>Orders</a>
            </NavLink>


            <NavLink to="/profile/wishlist" className={({isActive}) => isActive ? 'cursor-pointer rounded-md flex justify-start items-center bg-violet-400 h-12 p-2' : 'cursor-pointer rounded-md flex justify-start items-center hover:bg-violet-400 h-12 p-2'}>
              <i class='bx bx-heart text-white mr-3 text-2xl' ></i>
              <a href="" className='text-white text-xl text-center'>Wishlist</a>
            </NavLink>

            <NavLink to="/profile/changepassword" className={({isActive}) => isActive ? 'cursor-pointer rounded-md flex justify-start items-center bg-violet-400 h-12 p-2' : 'cursor-pointer rounded-md flex justify-start items-center hover:bg-violet-400 h-12 p-2'}>
              <i class='bx bx-lock-open-alt text-white mr-3 text-2xl'></i>
              <a href="" className='text-white text-xl text-center'>Change Password</a>
            </NavLink>

            <div onClick={logout} className='cursor-pointer rounded-md flex justify-start items-center hover:bg-violet-400 h-12 p-2 mb-5'>
              <i class='bx bx-exit mr-3 text-white text-2xl' ></i>
              <a href="" className='text-white text-xl text-center'>Logout</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LeftCard