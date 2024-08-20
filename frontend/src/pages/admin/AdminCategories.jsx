import React, { useState } from 'react'

import ringImg from '../../images/gallery/ring1.jpg'
import bangleImg from '../../images/gallery/banlge1.jpg'
import braceletImg from '../../images/gallery/bracelet1.jpg'
import necklateImg from '../../images/gallery/necklace1.jpg'
import { Link } from 'react-router-dom'
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin'
import Footer from '../../components/footer/Footer'
import InputBox from '../../components/login/InputBox'
import axios from 'axios'

const AdminCategories = () => {

  const categoriesList = [
    ringImg,
    bangleImg,
    braceletImg,
    necklateImg
  ]
  return (
    <div>
      <AppBarAdmin />

      <AddCategory />

      <div className='grid grid-cols-3 w-[85%] m-auto gap-y-10 my-20'>
        {categoriesList.map((img, idx) => <CategoryCard key={idx} img={img}/>)}
      </div>

      <Footer />
    </div>
  )
}

function CategoryCard({img}){
  return <div className="relative border w-[90%] h-[25rem] m-auto rounded-3xl shadow-2xl">
        <div className="w-full h-full">
            <img src={img} alt="" className="object-cover h-full w-full rounded-3xl" style={{ filter: 'blur(0.5px)' }}/>
        </div>

        <div className="absolute inset-0">
            <Link to="/contact">
                <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-[35%] absolute bottom-0 left-4">Check out</button>
            </Link>
        </div>
    </div>
}

function AddCategory(){
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return <div className='w-[83%] m-auto text-right pt-10'>
    <button
      onClick={() => setIsPopUpOpen(true)}
      type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-36">
        Add Category
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
              label={"Category Name"}
              placeholder={"Rings, Bangles etc.,"}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />

            <InputBox
              label={"Image Url"}
              placeholder={"https://google.com/rings"}
              onChange={(e) => {
                setImageUrl(e.target.value)
              }}
            />
          </div>

          <button 
            onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/admin/category/category", {
                name, 
                imageUrl
              })

              console.log(response.data)
            }}
            type="button" 
            className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 mt-2 mb-2 shadow-md w-[20%]">Add</button>
        </div>
      </div>  
    )}
  </div>
}

export default AdminCategories