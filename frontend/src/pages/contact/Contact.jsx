import React, { useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const params = new URLSearchParams();
    params.append('Fullname', name);
    params.append('Email', email);
    params.append('Category', category);
    params.append('Comment', comment);

    try{
      const response = await axios.post('https://script.google.com/macros/s/AKfycbwoKgJno7Me4vVcUtu8guEbI7XHWLJgk-_kbaf9hs0rpSVbahz5iYfckJpkK64qS1MEsw/exec', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data)
      setName('');
      setEmail('')
      setCategory('');
      setComment('');
    }catch(err){
      console.log('Failed to send the message:', err);
      alert('Catch error');
    }finally{
      setLoading(false);
    }
  }
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
          <form onSubmit={handleSubmit}>
            <input onChange={(e) => {
              setName(e.target.value)
            }} type="text" placeholder='Full Name *' name='Fullname' value={name} className='w-full border border-solid border-[#e4e4e4] outline-none py-[12px] px-[20px] h-[51px] text-[14px] mb-8' />
            <input onChange={(e) => {
              setEmail(e.target.value)
            }} type="email" placeholder='Email address *' name='Email' value={email} className='w-full border border-solid border-[#e4e4e4] outline-none py-[12px] px-[20px] h-[51px] text-[14px] mb-8' />
            <select onChange={(e) => {
              setCategory(e.target.value)
            }} name='Category' value={category} className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
                <option>Select Category</option>
                <option>Bangles</option>
                <option>Braclets</option>
                <option>Chains</option>
                <option>Necklaces</option>
                <option>Rings</option>
                <option>Recent works</option>
            </select>
            <textarea onChange={(e) => {
              setComment(e.target.value)
            }}
            placeholder="Comment"
            name='Comment'
            value={comment}
            className="w-full py-[12px] px-[20px] h-[140px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
            ></textarea>

            <button type="submit" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-full">
            {loading ? (
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
            ) : (
              'Submit'
            )}
            </button>
          </form>
        </div>
      </div>

      

      <Footer />
    </div>
  )
}

export default Contact