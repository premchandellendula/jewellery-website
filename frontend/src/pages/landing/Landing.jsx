import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'
import bannerImg from '../../images/banner/main-banner.jpg'
import Slider from '../../components/slider/Slider'
import Testimonials from '../../components/testimonials/Testimonials'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();
  const date = new Date().getDay();

  const routes = {
    1: "/category/22/products",
    2: "/category/23/products",
    3: "/category/24/products",
    4: "/category/22/products",
    5: "/category/23/products",
    6: "/category/24/products",
    7: "/category/25/products",
  };

  return (
    <div className='h-[700px]' >
      <Appbar />

      <div className='relative'>
        <img src={bannerImg} alt="" className='h-96 w-full' />
        <h2 className='absolute inset-0 top-24 left-[55%] font-bold text-[2.1rem] text-gray-800 uppercase italic'>Ellendula</h2>
        <p className='absolute inset-0 top-[38%] left-[55%] font-semibold text-[1.4rem] text-gray-700 font-moderustic italic'>Embrace the Elegance of Handcrafted Jewels</p>
        <button onClick={() => {
          if(routes[date]){
            navigate(routes[date]);
          }
        }}
         type="button" className="text-violet-600 border border-violet-500 hover:border-violet-800 focus:ring-offset-violet-600 focus:ring-1 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-32 h-12 absolute inset-0 top-[50%] left-[77%] hover:text-white hover:bg-violet-600">Check out</button>
      </div>

      <Slider heading={"Rings"} />
      <Slider heading={"Bracelets"} />
      <Slider heading={"Chains"} />

      <Testimonials />

      <Footer/>
    </div>
  )
}

export default Landing