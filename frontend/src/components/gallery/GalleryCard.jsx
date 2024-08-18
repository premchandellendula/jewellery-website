import React from 'react'

const GalleryCard = ({img}) => {
  return (
    <div>
        <img src={img} alt="" className='w-80 h-80 border' />
    </div>
  )
}

export default GalleryCard