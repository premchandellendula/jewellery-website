import React, { useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'

import ringImg from '../../images/gallery/ring1.jpg'
import bangleImg from '../../images/gallery/banlge1.jpg'
import braceletImg from '../../images/gallery/bracelet1.jpg'
import necklateImg from '../../images/gallery/necklace1.jpg'
import { Link } from 'react-router-dom'

const Categories = () => {

  const categoriesList = [
    ringImg,
    bangleImg,
    braceletImg,
    necklateImg
  ]
  return (
    <div>
      <Appbar />

      <div className='grid grid-cols-3 w-[87%] m-auto gap-y-10 my-20'>
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

export default Categories