import React, { useEffect, useState } from 'react'
import OrderCard from '../orders/OrderCard'
import axios from 'axios';
import OrderSkeleton from '../loaders/OrderSkeleton';

const ProfileOrdersCmp = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    })
  }, [])

  if(loading){
    return <div>
      <h2 className='text-2xl font-medium'>Your Orders</h2>
      <div className='mt-4'>
        <OrderSkeleton />
        <OrderSkeleton />
        <OrderSkeleton />
      </div>
    </div>
  }
  return (
    <div>
        <h2 className='text-2xl font-medium'>Your Orders</h2>
        <div className='mt-4'>
            {orderItems
              .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order, idx) => <OrderCard key={idx} orderId={order.orderId} createdAt={order.createdAt} price={order.price} name={order.name} imageUrl={order.imageUrl} quantity={order.quantity} />)}
        </div>
    </div>
  )
}

export default ProfileOrdersCmp