import React from 'react'
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin'
import Footer from '../../components/footer/Footer'
import bannerImg from '../../images/banner/main-banner.jpg'
import Slider from '../../components/slider/Slider'

const AdminLanding = () => {
  return (
    <div>
      <AppBarAdmin />

      <div className='relative'>
        <img src={bannerImg} alt="" className='h-96 w-full' />
        <h2 className='absolute inset-0 top-24 left-[55%] font-bold text-[2.1rem] text-gray-800 uppercase'>LogoReveal</h2>
        <p className='absolute inset-0 top-[38%] left-[55%] font-bold text-[1.1rem] text-gray-700 font-moderustic'>Embrace the Elegance of Handcrafted Jewels</p>
        <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-32 h-12 absolute inset-0 top-[50%] left-[70%]">Check out</button>
      </div>

      <Slider heading={"Rings"} />
      <Slider heading={"Bangles"} />
      <Slider heading={"Bracelets"} />

      <Footer />
    </div>
  )
}

export default AdminLanding