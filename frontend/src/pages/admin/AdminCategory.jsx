import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Appbar from '../../components/appbar/Appbar';
import Footer from '../../components/footer/Footer';
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin';
import InputBox from '../../components/login/InputBox';
import ProductSkeleton from '../../components/loaders/ProductSkeleton';

const AdminCategory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchProducts = () => {
      axios.get(`http://localhost:3000/api/v1/category/${id}/products`)
            .then(res => {
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch(err => {
              console.error(err)
              setLoading(false)
            })
    }

    useEffect(() => {
        fetchProducts();
    }, [id])

    if(loading){
      return <div>
          <AppBarAdmin />

          <div className='grid grid-cols-3 w-[85%] m-auto gap-y-10 my-20'>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
          </div>

          <Footer />
      </div>
  }

    return (
        <div>
            <AppBarAdmin />

            <AddProduct onProductAdded={fetchProducts} />

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

function AddProduct({onProductAdded}){
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState('');

    const handleFileUpload = (e) => {
      const file = e.target.files[0]
      console.log(file)
  
      var reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(file);
    }

  
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
  
            <div className='flex flex-col justify-start'>
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

            <input type="file" onChange={handleFileUpload} className='mt-4' />  
            </div>
  
            <button 
              onClick={async (e) => {
                e.preventDefault();

                if(!preview) return;
                setLoading(true)
                try{
                  const response = await axios.post("http://localhost:3000/api/v1/admin/product/", {
                    name, 
                    description,
                    price,
                    imageUrl : preview,
                    category
                  }, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem('token')
                    }
                  })
  
                  setIsPopUpOpen(false)

                  onProductAdded();
    
                  console.log(response.data)
                }catch(e){
                  console.error('Failed to add the product: ', e)
                }finally{
                  setLoading(false)
                }
                
              }}
              type="button" 
              className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 mt-1 mb-1 shadow-md w-[20%]">
                {loading ? (
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
            ) : (
              'Add'
            )}
              </button>
          </div>
        </div>  
      )}
    </div>
}

export default AdminCategory