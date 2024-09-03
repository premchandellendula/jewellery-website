import React, { useEffect, useState } from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'
import GalleryCard from '../../components/gallery/GalleryCard'

import axios from 'axios'
import ProductSkeleton from '../../components/loaders/ProductSkeleton'

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/gallery')
      .then(res => {
        setGallery(res.data.products)
        setLoading(false)
      })
  }, []);

  if(loading){
    return <div>
      <Appbar />
        <div className='grid grid-cols-3 w-[85%] m-auto gap-y-10 my-20'>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      <Footer />
    </div>
  }
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