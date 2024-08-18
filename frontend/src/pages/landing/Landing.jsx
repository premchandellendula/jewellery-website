import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'
import bannerImg from '../../images/banner/main-banner.jpg'

const Landing = () => {
  return (
    <div className='h-[700px]' >
      <Appbar />

      <div className='relative'>
        <img src={bannerImg} alt="" className='h-96 w-full' />
        <h2 className='absolute inset-0 top-24 left-[55%] font-bold text-[2.1rem] text-gray-800 uppercase'>LogoReveal</h2>
        <p className='absolute inset-0 top-[38%] left-[55%] font-bold text-[1.1rem] text-gray-700 font-moderustic'>Embrace the Elegance of Handcrafted Jewels</p>
        <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-32 h-12 absolute inset-0 top-[50%] left-[70%]">Check out</button>
      </div>

      <Footer/>
    </div>
  )
}

export default Landing