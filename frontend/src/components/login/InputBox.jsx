import React from 'react'

const InputBox = ({label, placeholder, onChange}) => {
  return (
    <div className='py-3'>
        <div className='text-base text-left font-medium py-2'>
            {label}
        </div>
        <input onChange={onChange} type="text" placeholder={placeholder} className='w-full h-10 px-2 py-1 border rounded border-slate-200 focus:ring-2 focus:ring-violet-300 focus:outline-none' />
    </div>
  )
}

export default InputBox