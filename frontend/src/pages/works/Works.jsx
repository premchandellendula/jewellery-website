import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'

const Works = () => {
  return (
    <div>
      <Appbar />

      <div className='w-[80%] m-auto h-80 mt-10 flex justify-center border'>
        <div className='flex flex-col justify-center'>
          <p className='text-3xl font-semibold'>Coming soon....</p>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Works