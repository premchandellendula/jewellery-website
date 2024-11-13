import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import OrderCard from '../../components/orders/OrderCard'
import OrderSkeleton from '../../components/loaders/OrderSkeleton'

const Orders = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/orders/orders', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then(res => {
            const items = res.data.orders.flatMap(order => 
                order.orderItems.map(item => ({
                    orderId: order.id,
                    createdAt: order.createdAt,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    ...item
                }))
            )
            setOrderItems(items);
            console.log(items);
            setLoading(false);
        })
    }, [])

    if(loading){
        return <div>
            <Appbar />
            <h2 className='text-2xl font-medium w-[60%] m-auto mt-16'>Your Orders</h2>
            <div className='w-[60%] m-auto mt-4'>
                <OrderSkeleton />
                <OrderSkeleton />
                <OrderSkeleton />
                <OrderSkeleton />
                <OrderSkeleton />
            </div>
            <Footer />
        </div>
    }
  return (
    <div>
        <Appbar />

        <h2 className='text-2xl font-medium w-[60%] m-auto mt-16'>Your Orders</h2>
        <div className=' w-[60%] m-auto mt-4'>
            {orderItems
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order, idx) => <OrderCard key={idx} orderId={order.orderId} createdAt={order.createdAt} price={order.price} name={order.name} imageUrl={order.imageUrl} quantity={order.quantity} />)}
            {/* <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard /> */}
        </div>

        <Footer />
    </div>
  )
}

// function OrderCard({orderId, createdAt, totalAmount, name, imageUrl, quantity}){
//     return <div className='border shadow-md rounded-lg my-8'>
//         <div className='bg-violet-50 h-16 rounded-t-lg flex justify-between px-4 py-2'>
//             <div className='flex gap-x-6'>
//                 <div>
//                     <p className='text-xs font-medium text-gray-600'>ORDER PLACED</p>
//                     <p className='text-base text-gray-600'>{new Date(createdAt).toLocaleDateString()}</p>
//                 </div>
//                 <div>
//                     <p className='text-xs font-medium text-gray-600'>TOTAL</p>
//                     <p className='text-base text-gray-600'>₹ {totalAmount.toFixed(2)}</p>
//                 </div>
//             </div>

//             <div>
//                 <p  className='text-xs font-medium text-gray-600'>ORDER: #{orderId}</p>
//             </div>
//         </div>

//         <div className='h-44 flex'>
//             <div className='w-[20%] m-4'>
//                 <img src={imageUrl} alt={name} className='w-full h-full object-cover' />
//             </div>
//             <div className='w-[75%] m-4 px-2'>
//                 <p>{name}</p>
//                 <p>Quantity: {quantity}</p>
//             </div>
//         </div>
//     </div>
// }

export default Orders