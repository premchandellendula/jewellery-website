import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin';
import Footer from '../../components/footer/Footer';

const AdminWork = () => {
  const { id } = useParams();

  const [work, setWork] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/works/${id}`)
      .then(res => {
        setWork(res.data.product);
      })
  }, [id])

  return (
    <div>
      <AppBarAdmin />
      <div className='w-[85%] m-auto flex mt-12'>
        {/* left div */}
        <div className='w-[50%] p-4'>
          <img src={work.imageUrl} alt="hsdfhf" className='border border-gray-400 h-96' />
        </div>

        {/* right div */}
        <div className='w-[50%] p-4'>
          <h2 className='text-3xl'>{work.name}</h2>
          <h4 className='uppercase text-lg font-[500] mt-4'>product details</h4>
          <p className='my-2 text-lg'>{work.description}</p>
          <p className='text-[1.5rem] text-violet-600 font-semibold my-4'>Rs. {work.price}</p>
          <div className='flex gap-4'>
            <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-[25%]">Add to cart</button>

            <div className='flex h-10 justify-center items-center'>
              <p className='text-lg font-medium'>Quantity : </p>
              <select className=" text-[14px] border border-gray-400 border-solid outline-none">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminWork