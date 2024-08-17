import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'

const Contact = () => {
  return (
    <div>
      <Appbar />

      <div className='w-[50%] m-auto mt-12'>
        <h3 className='text-center text-[2.1rem] font-semibold p-3'>
          How can we help?
        </h3>
        <p className='text-[1.2rem] text-center text-gray-700'>
          Contact us for any inquiries or custom jewellery requests. We're here to help you find the perfect piece that suits your style.
        </p>
      </div>

      <div className='w-[40%] m-auto bg-gray-100 p-8 mt-[2.4rem]'>
        <div>
          <h3 className='text-[1.5rem] font-semibold text-center mb-6'>Leave us your Info</h3>
          <input type="text" placeholder='Full Name *' className='w-full border border-solid border-[#e4e4e4] outline-none py-[12px] px-[20px] h-[51px] text-[14px] mb-8' />
          <input type="email" placeholder='Email address *' className='w-full border border-solid border-[#e4e4e4] outline-none py-[12px] px-[20px] h-[51px] text-[14px] mb-8' />
          <select className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
              <option>Select Category</option>
              <option>Bangles</option>
              <option>Braclets</option>
              <option>Chains</option>
              <option>Necklaces</option>
              <option>Rings</option>
              <option>Recent works</option>
          </select>
          <textarea
          placeholder="Comment"
          className="w-full py-[12px] px-[20px] h-[140px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
          ></textarea>

          <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-full">Submit</button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact