import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import LeftCard from '../../components/profile/LeftCard'
import Footer from '../../components/footer/Footer'
import ProfileOrdersCmp from '../../components/profile/ProfileOrdersCmp'

const ProfileOrders = () => {
  return (
    <div>
        <Appbar />

        <div className='w-[80%] m-auto my-12 flex justify-between'>
            <div className='w-[27%]'>
                <LeftCard />
            </div>

            <div className='w-[70%]'>
              <ProfileOrdersCmp />
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default ProfileOrders