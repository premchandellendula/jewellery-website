import React from 'react'

const CartItemLoader = () => {
  return (
    <div>
        <div className='flex w-[95%] m-auto justify-between mt-10'>
            <div className='w-[75%] flex flex-col gap-y-4'>                
                <div role="status" className="bg-gray-100 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center p-4">
                    <div class="flex items-center justify-center w-40 h-40 bg-gray-100 rounded sm:w-96 dark:bg-gray-300 p-4">
                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                    <div class="w-full">
                        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-201 rounded-full dark:bg-gray-300 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-201 rounded-full dark:bg-gray-300 mb-2.5"></div>
                        <div className="h-2 bg-gray-201 rounded-full dark:bg-gray-300 max-w-[360px]"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>

                <div role="status" class="bg-gray-100 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center p-4">
                    <div class="flex items-center justify-center w-40 h-40 bg-gray-100 rounded sm:w-96 dark:bg-gray-300">
                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                    <div class="w-full">
                        <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-201 rounded-full dark:bg-gray-300 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-201 rounded-full dark:bg-gray-300 mb-2.5"></div>
                        <div className="h-2 bg-gray-201 rounded-full dark:bg-gray-300 max-w-[360px]"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div className=' w-[25%] h-60 ml-6 shadow-xl animate-pulse rounded-md bg-gray-200'>
                
            </div>
        </div>
    </div>
  )
}

export default CartItemLoader