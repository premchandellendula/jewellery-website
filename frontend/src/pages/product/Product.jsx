import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Appbar from '../../components/appbar/Appbar';
import Footer from '../../components/footer/Footer';
import ProductDetailSkeleton from '../../components/loaders/ProductDetailSkeleton';
import { useCart } from '../../utils/CartContext';
import { useAuth } from '../auth/AuthProvider';

const Product = () => {
  const { id } = useParams();
  const { setQuantity } = useCart();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/product/${id}`)
      .then(res => {
        setProduct(res.data.product);
        setLoading(false)
      })
  }, [id])

  if(loading){
    return <div>
      <Appbar />
      <div className='w-[85%] m-auto flex mt-12'>
        <ProductDetailSkeleton />
      </div>
    <Footer />
    </div>
  }

  return (
    <div>
      <Appbar />
      <div className='w-[85%] m-auto flex mt-12'>
        {/* left div */}
        <div className='w-[50%] p-4'>
          <img src={product.imageUrl} alt="hsdfhf" className='h-96 w-[100%] border' />
        </div>

        {/* right div */}
        <div className='w-[50%] p-4'>
          <h2 className='text-3xl'>{product.name}</h2>
          <h4 className='uppercase text-lg font-[500] mt-4'>product details</h4>
          <p className='my-2 text-lg'>{product.description}</p>
          <p className='text-[1.5rem] text-violet-600 font-semibold my-4'>Rs. {product.price}</p>
          <div className='flex gap-4'>
            <button 
              onClick={async () => {
                setButtonLoading(true);
                if(!isAuthenticated){
                  console.log('clicked')
                  navigate('/signin')
                }

                try{
                  // setQuantity(prevQuantity => prevQuantity + cartQuantity)
                  const response = await axios.post('http://localhost:3000/api/v1/cart', {
                    productId: parseInt(id),
                    quantity: cartQuantity
                  }, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem('token')
                    }
                  })

                  const fetchCartData = async () => {
                    try{
                      const response = await axios.get('http://localhost:3000/api/v1/cart', {
                        headers: {
                          Authorization: "Bearer " + localStorage.getItem('token')
                        }
                      })

                      const cartItems = response.data.cart;
                      const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
                      setQuantity(totalQuantity);
                    }catch(e){
                      console.error('Failed to fetch the cart data:', e)
                    }
                  }
                  fetchCartData();
                  console.log(response.data);
                }catch(e){
                  console.error('Failed to add the product:', e)
                }finally{
                  setButtonLoading(false);
                }

              }}  
            type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-[25%]">
              {buttonLoading ? (
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mx-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
              ): (
                'Add to cart'
              )}
            </button>

            <div className='flex h-10 justify-center items-center'>
              <p className='text-lg font-medium'>Quantity : </p>
              <select value={cartQuantity}
              onChange={(e) => setCartQuantity(Number(e.target.value))}
              className=" text-[14px] border border-gray-400 border-solid outline-none">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Product