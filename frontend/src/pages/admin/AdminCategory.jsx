import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Appbar from '../../components/appbar/Appbar';
import Footer from '../../components/footer/Footer';
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin';
import InputBox from '../../components/login/InputBox';

const AdminCategory = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/category/${id}/products`)
            .then(res => {
                setProducts(res.data.products)
            })
    }, [])

    return (
        <div>
            <AppBarAdmin />

            <AddProduct />

            <div className='grid grid-cols-3 w-[85%] m-auto gap-y-10 my-20'>
                {products.map((product) => <ProductCard key={product.id} product={product}/>)}
            </div>

            <Footer />
    </div>
    )
}

function ProductCard({product}){
    return <div className="relative border w-[90%] h-[25rem] m-auto rounded-3xl shadow-2xl">
        <div className="w-full h-full">
            <img src={product.imageUrl} alt="" className="object-cover h-full w-full rounded-3xl" style={{ filter: 'blur(0.5px)' }}/>
        </div>

        <div className="absolute inset-0">
            <Link to={`/admin/product/${product.id}`}>
                <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-[35%] absolute bottom-0 left-4">Check out</button>
            </Link>
        </div>
    </div>
}

function AddProduct(){
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
  
    return <div className='w-[83%] m-auto text-right pt-10'>
      <button
        onClick={() => setIsPopUpOpen(true)}
        type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-36">
          Add Product
      </button>
  
      {isPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className='bg-white w-[40%] m-auto rounded-lg shadow-md p-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>Add Category</h2>
              <button onClick={() => setIsPopUpOpen(false)}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  style={{fill: 'rgba(0, 0, 0, 1)', transform: '', msFilter: ''}}
                  className='hover:bg-gray-200 rounded-sm'
                  >
                    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
              </button>
            </div>
  
            <div>
              <InputBox
                label={"Product Name"}
                placeholder={"Rings, Bangles etc.,"}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />

            <InputBox
                label={"Description"}
                placeholder={"This is a 8gm chain"}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
            />

            <div className='flex justify-between'>
                <InputBox
                    label={"Price"}
                    placeholder={"45999.33"}
                    onChange={(e) => {
                        setPrice(parseFloat(e.target.value))
                    }}
                    />

                <InputBox
                    label={"Category"}
                    placeholder={"Rings, Bangles etc.,"}
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                />
            </div>

            <InputBox
                label={"Image Url"}
                placeholder={"https://google.com/chain"}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                }}
            />
  
            
            </div>
  
            <button 
              onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/admin/category/category", {
                  name, 
                  description,
                  price,
                  imageUrl,
                  category
                })
  
                console.log(response.data)
              }}
              type="button" 
              className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 mt-1 mb-1 shadow-md w-[20%]">Add</button>
          </div>
        </div>  
      )}
    </div>
}

export default AdminCategory