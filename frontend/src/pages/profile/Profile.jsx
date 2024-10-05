import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import Footer from '../../components/footer/Footer'
import LeftCard from '../../components/profile/LeftCard'
import ProfileCard from '../../components/profile/ProfileCard'

const Profile = () => {
  return (
    <div>
        <Appbar />

        <div className='w-[80%] m-auto my-12 flex justify-between'>
            <div>
                <LeftCard />
            </div>

            <div className='w-[70%]'>
                <ProfileCard />
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default Profile