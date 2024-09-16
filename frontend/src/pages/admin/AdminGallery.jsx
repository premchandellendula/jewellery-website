import React, { useState } from 'react'
import Footer from '../../components/footer/Footer'
import GalleryCard from '../../components/gallery/GalleryCard'
import axios from 'axios'

import ringImg1 from '../../images/gallery/ring1.jpg'
import ringImg2 from '../../images/gallery/ring2.jpg'
import bangleImg1 from '../../images/gallery/banlge1.jpg'
import bangleImg2 from '../../images/gallery/bangle2.jpg'
import braceletImg1 from '../../images/gallery/bracelet1.jpg'
import braceletImg2 from '../../images/gallery/bracelet2.jpg'
import necklaceImg1 from '../../images/gallery/necklace1.jpg'
import necklaceImg2 from '../../images/gallery/necklace2.jpg'
import necklaceImg3 from '../../images/gallery/necklace3.jpg'
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin'
import InputBox from '../../components/login/InputBox'

const AdminGallery = () => {
  const galleryList = [
    ringImg1, ringImg2, braceletImg2, bangleImg2, braceletImg1, bangleImg1, necklaceImg1, necklaceImg2, necklaceImg3
  ]
  return (
    <div>
      <AppBarAdmin />

      <AddImage />

      <div className='grid grid-cols-3 w-[87%] m-auto gap-5 p-10 my-10'>
        {galleryList.map((image, idx) => <GalleryCard key={idx} img={image} />)}
      </div>

      <Footer/>
    </div>
  )
}

function AddImage(){
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    console.log(file)

    var reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return <div className='w-[77%] m-auto text-right pt-10'>
    <button
      onClick={() => setIsPopUpOpen(true)}
      type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-32">
      Add Image
    </button>

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

          <div className='flex flex-col justify-start'>
            <InputBox
              label={"Name"}
              placeholder={"Rings, Bangles, etc.,"}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />

          <input type="file" onChange={handleFileUpload} className='mt-4' />  

          </div>

          <button
            onClick={async (e) => {
              e.preventDefault();

              if(!preview) return;
              const response = await axios.post("http://localhost:3000/api/v1/admin/gallery", {
                name, 
                imageUrl: preview
              })

              console.log(response.data)
            }}
            type="button" 
            className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 mt-2 mb-2 shadow-md w-[20%]">Add</button>
        </div>
      </div>  
    )}
  </div>
}

export default AdminGallery