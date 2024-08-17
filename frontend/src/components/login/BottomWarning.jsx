import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label, buttonText, to}) => {
  return (
    <div className='flex justify-center py-2 text-[0.95rem]'>
        <div className='text-gray-600'>
            {label}
        </div>
        <Link to={to} className='pointer underline pl-1 cursor-pointer text-[0.95rem] text-violet-600'>{buttonText}</Link>
    </div>
  )
}

export default BottomWarning