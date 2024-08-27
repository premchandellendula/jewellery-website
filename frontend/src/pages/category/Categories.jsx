import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'

import { Link } from 'react-router-dom'
import axios from 'axios'

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/category')
      .then(res => {
        setCategories(res.data.categories);
      })
  }, [])
  return (
    <div>
      <Appbar />

      <div className='grid grid-cols-3 w-[87%] m-auto gap-y-10 my-20'>
        {categories.map((category) => <CategoryCard key={category.id} category={category}/>)}
      </div>

      <Footer />
    </div>
  )
}

function CategoryCard({category}){
  return <div className="relative border w-[90%] h-[25rem] m-auto rounded-3xl shadow-2xl">
        <div className="w-full h-full">
            <img src={category.imageUrl} alt="" className="object-cover h-full w-full rounded-3xl" style={{ filter: 'blur(0.5px)' }}/>
        </div>

        <div className="absolute inset-0">
            <Link to={`/category/${category.id}/products`}>
                <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-[35%] absolute bottom-0 left-4">Check out</button>
            </Link>
        </div>
    </div>
}

export default Categories