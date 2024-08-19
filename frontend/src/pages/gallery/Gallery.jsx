import React, { useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
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

const Gallery = () => {
  const galleryList = [
    ringImg1, ringImg2, braceletImg2, bangleImg2, braceletImg1, bangleImg1, necklaceImg1, necklaceImg2, necklaceImg3
  ]
  return (
    <div>
      <Appbar />

      <div className='grid grid-cols-3 w-[87%] m-auto gap-5 p-10 my-10'>
        {galleryList.map((image, idx) => <GalleryCard key={idx} img={image} />)}
      </div>

      <Footer/>
    </div>
  )
}

export default Gallery