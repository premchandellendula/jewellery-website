import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import axios from 'axios';
import Footer from '../../components/footer/Footer';
import { useCart } from '../../utils/CartContext';
import PaymentSummary from '../../components/cart/PaymentSummary';
import CartItemLoader from '../../components/loaders/CartItemLoader';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { setQuantity } = useCart();
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
        axios.get('http://localhost:3000/api/v1/cart', {
            headers: {
                Authorization : "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => {
            setCartItems(response.data.cart)
            const quantity = response.data.cart.reduce((lastQuantity, item) => lastQuantity + item.quantity, 0);
            const price = response.data.cart.reduce((lastPrice, item) => lastPrice + (item.price * item.quantity), 0);
            setTotalQuantity(quantity)
            setQuantity(quantity);
            setTotalPrice(price);
        })
        .catch(error => {
            console.error('Failed to load the cart items:', error);
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchProducts();
    }, [setQuantity])


    if(loading){
        return <div>
            <Appbar />
            <CartItemLoader />
            <Footer />
        </div>
    }

    
  return (
    <div>
        <Appbar />
        
        <div className='flex w-[95%] m-auto justify-between mt-10'>
            <div className='w-[75%] pr-4'>
                {cartItems.map((cart) => <CartCard key={cart.id} cart={cart} setCartItems={setCartItems} setQuantity={setQuantity} onProductDeleted={fetchProducts} fetchProducts={fetchProducts} />)}
            </div>
            <div className=' bg-gray-100 w-[25%] h-60 ml-6 shadow-xl'>
                <PaymentSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
            </div>
        </div>

        <Footer />
    </div>
  )
}


function CartCard({cart, setCartItems, setQuantity, onProductDeleted, fetchProducts}){
    const [selectedQuantity, setSelectedQuantity] = useState(cart.quantity);
    const [loading, setLoading] = useState(false);

    const handleQuantityChange = async (e) => {
        const newQuantity = Number(e.target.value);
        setSelectedQuantity(newQuantity)

        try{
            await axios.put(`http://localhost:3000/api/v1/cart/${cart.id}`, {
                quantity: newQuantity
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })

            const response = await axios.get('http://localhost:3000/api/v1/cart', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            
            const cartItems = response.data.cart
            setCartItems(cartItems)

            const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
            setQuantity(totalQuantity)

            fetchProducts();
        }catch(e){
            console.error('Failed to update the quantity: ', e)
        }
    }

    return <div className='bg-gray-100 flex p-6 mb-6 shadow-md'>
        <div className='w-[20%]'>
            <img src={cart.imageUrl} alt="hello" className='border border-red-300 h-40' />
        </div>

        <div className='w-[80%] ml-10 flex flex-col border border-blue-500 px-4'>
            <h3 className='text-[1.4rem]'>
                {cart.name}
            </h3>
            <p className='text-[1.1rem]'>
                {cart.description}
            </p>
            <p className='text-[1.5rem] text-violet-600 font-semibold my-2'>Rs. {cart.price}</p>
            <div className='flex h-10 justify-between items-center'>
              <div className='flex'>
                <p className='text-lg font-medium'>Qty: </p>
                <select value={selectedQuantity} onChange={handleQuantityChange}
                className=" text-[14px] border border-gray-400 border-solid outline-none">
                    {[1,2,3,4,5].map((quantity) => (
                        <option key={quantity} value={quantity} className={quantity === selectedQuantity ? 'bg-violet-300' : ''}>{quantity}</option>
                    ))}
                </select>
              </div>

              <button
              onClick={async () => {
                // console.log(cart.id)
                try{
                    setLoading(true);
                    const response = await axios.delete(`http://localhost:3000/api/v1/cart/${cart.id}`, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    })
                    
                    onProductDeleted();
                    console.log(response.data);
                }catch(e){
                    console.error('Failed to delete the cart item:', e);
                }finally{
                    setLoading(false)
                  }
              }}
              type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-full text-base px-2 py-2 me-2 mb-2 shadow-md w-[12%]">
                {loading ? (
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                ) : (
                'Delete'
                )}
              </button>
            </div>
        </div>
    </div>
}

export default Cart