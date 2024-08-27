import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/gallery')
      .then(res => {
        setGallery(res.data.products)
      })
  }, []);
  return (
    <div>
      <Appbar />

      <div className='grid grid-cols-3 w-[87%] m-auto gap-5 p-10 my-10'>
        {gallery.map((product, idx) => <GalleryCard key={idx} img={product.imageUrl} id={product.id} />)}
      </div>

      <Footer/>
    </div>
  )
}

export default Gallery