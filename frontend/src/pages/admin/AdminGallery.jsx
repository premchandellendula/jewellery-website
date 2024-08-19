import React, { useState } from 'react'
import Footer from '../../components/footer/Footer'
import GalleryCard from '../../components/gallery/GalleryCard'

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
  return <div className='w-[77%] m-auto text-right pt-10'>
    <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-32">Add Image</button>
  </div>
}

export default AdminGallery