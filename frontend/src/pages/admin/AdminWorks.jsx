import React, { useState } from 'react'
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin'
import Footer from '../../components/footer/Footer'
import InputBox from '../../components/login/InputBox';
import axios from 'axios';

const AdminWorks = () => {
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12'
  ];

  return (
    <div>
      <AppBarAdmin />

      <AddWork />

      <div className='grid grid-cols-3 w-[85%] m-auto my-8'>
        {items.map((d, idx) => <CategoryCard key={idx} img={d} />)}
      </div>

      <Footer />
    </div>
  )
}


function CategoryCard({img}){
  return <div className="border w-[90%] h-[15rem] m-6 border-gray-600 shadow-sm">
        {img}
    </div>
}


function AddWork(){
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  return <div className='w-[84%] m-auto text-right pt-10'>
    <button 
    onClick={() => setIsPopUpOpen(true)}
    type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-36">Add Work</button>

    {isPopUpOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className='bg-white w-[40%] m-auto rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Add Image</h2>
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
              label={"Name"}
              placeholder={"8gm Necklace"}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />

            <InputBox
              label={"Description"}
              placeholder={"This is a 8gm necklace"}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />

            <div className='py-3'>
                <div className='text-base text-left font-medium py-2'>
                    Price
                </div>
                <input onChange={(e) => {
                  setPrice(parseFloat(e.target.value))
                }} type='number' placeholder={"45999.99"} className='w-full h-10 px-2 py-1 border rounded border-slate-200 focus:ring-2 focus:ring-violet-300 focus:outline-none' />
            </div>

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
              
              try { 
                const response = await axios.post("http://localhost:3000/api/v1/admin/work", {
                  name,
                  description,
                  price,
                  imageUrl
                });

                console.log(response.data);
              } catch (error) {
                console.error(error.response?.data || error.message);
                // console.log("hello")
              }
            }}
            type="button" 
            className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 mt-2 mb-2 shadow-md w-[20%]">Add</button>
        </div>
      </div>  
    )}
  </div>
}

export default AdminWorks