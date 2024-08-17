import React from 'react'

const Button = ({label}) => {
  return (
    <div className='py-3'>
        <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-full">{label}</button>
    </div>
  )
}

export default Button