import React from 'react'
import Appbar from '../../components/appbar/Appbar'
import LeftCard from '../../components/profile/LeftCard'
import Footer from '../../components/footer/Footer'

const ChangePassword = () => {
  return (
    <div>
        <Appbar />

        <div className='w-[80%] m-auto my-12 flex justify-between'>
            <div>
                <LeftCard />
            </div>

            <div className='w-[70%]'>
                Change Password
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default ChangePassword