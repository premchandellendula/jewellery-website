import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Appbar from '../../components/appbar/Appbar';
import Footer from '../../components/footer/Footer';
import ProductDetailSkeleton from '../../components/loaders/ProductDetailSkeleton';
import { useCart } from '../../utils/CartContext';

const Product = () => {
  const { id } = useParams();
  const { setQuantity } = useCart();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(1);

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
          <img src={product.imageUrl} alt="hsdfhf" className='border border-gray-400 h-96' />
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
                }

              }}  
            type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-[25%]">Add to cart</button>

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