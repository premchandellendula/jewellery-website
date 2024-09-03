import React from 'react'

const PaymentSummary = ({totalQuantity, totalPrice}) => {
    
    return <div className='p-6'>
        <h2 className='text-lg font-semibold'>Order Summary</h2>
        <div className='flex justify-between mt-2'>
            <p>Items ({totalQuantity}): </p>
            <p>Rs. {totalPrice}</p>
        </div>
        <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-full text-base px-2 py-2 me-2 mb-2 mt-6 shadow-md w-full">Place your order</button>
    </div>
}

export default PaymentSummary