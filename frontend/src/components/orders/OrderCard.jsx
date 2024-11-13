import React from 'react'
import { Link } from 'react-router-dom'

const OrderCard = ({orderId, createdAt, price, name, imageUrl, quantity}) => {
    return <div className='border shadow-md rounded-lg my-8'>
    <div className='bg-violet-50 h-16 rounded-t-lg flex justify-between px-4 py-2'>
        <div className='flex gap-x-6'>
            <div>
                <p className='text-xs font-medium text-gray-600'>ORDER PLACED</p>
                <p className='text-base text-gray-600'>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <div>
                <p className='text-xs font-medium text-gray-600'>TOTAL</p>
                <p className='text-base text-gray-600'>₹{(price * quantity).toFixed(2)}</p>
            </div>
        </div>

        <div>
            <p  className='text-xs font-medium text-gray-600'>ORDER: #{orderId}</p>
        </div>
    </div>

    <Link to={`/product/${orderId}`}>
    <div className='h-44 flex'>
        <div className='w-[20%] m-4'>
            <img src={imageUrl} alt={name} className='w-full h-full object-cover' />
        </div>
        <div className='w-[75%] m-4 px-2'>
            <p>{name}</p>
            <p>Quantity: {quantity}</p>
        </div>
    </div>
    </Link>
</div>
}

export default OrderCard