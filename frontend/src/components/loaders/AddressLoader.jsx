import React from 'react'

const AddressLoader = () => {
  return (
    <div role="status" class="w-[100%] animate-pulse">
        <div className='flex justify-center'>
            <div class="h-6 mt-6 bg-gray-100 rounded-full dark:bg-gray-200 w-44 mb-4"></div>
        </div>
        <div className="flex flex-col items-center w-[100%] h-56 bg-gray-100 rounded dark:bg-gray-200">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-56 my-5 z-10 "></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 my-2 mb-2.5 w-[95%] z-10"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 my-2 w-[95%] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 my-2 w-[95%] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 my-2 w-[95%]"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 my-2 w-[15%]"></div>
            <span class="sr-only">Loading...</span>
        </div>

        
    </div>
  )
}

export default AddressLoader