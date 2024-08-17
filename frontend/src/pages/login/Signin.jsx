import React from 'react'
import Heading from '../../components/login/Heading'
import InputBox from '../../components/login/InputBox'
import Button from '../../components/login/Button'
import BottomWarning from '../../components/login/BottomWarning'
import PasswordInput from '../../components/login/PasswordInput'

const Signin = () => {
  return (
    <div className='h-screen bg-gray-100 flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='bg-white w-[30rem] h-max text-center rounded-lg shadow-xl px-[3rem] py-[2rem]'>
          <Heading label={"Sign in to your account"} />
          <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} />
          <PasswordInput label={"Password"} placeholder={"123abc"} />
          <Button label={"Sign In"} />
          <BottomWarning label={"Doesn't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}

export default Signin