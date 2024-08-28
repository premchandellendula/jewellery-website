import React, { useState } from 'react'
import Heading from '../../components/login/Heading'
import InputBox from '../../components/login/InputBox'
import Button from '../../components/login/Button'
import BottomWarning from '../../components/login/BottomWarning'
import PasswordInput from '../../components/login/PasswordInput'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  return (
    <div className='h-screen bg-gray-100 flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='bg-white w-[30rem] h-max text-center rounded-lg shadow-xl px-[3rem] py-[2rem]'>
          <Heading label={"Create your account"} />
          <InputBox 
            label={"Email"} 
            placeholder={"johndoe@gmail.com"} 
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <InputBox 
            label={"Full Name"} 
            placeholder={"John Doe"} 
            onChange={(e) => {
              setName(e.target.value)
            }}
          />

          <PasswordInput 
            label={"Password"} 
            placeholder={"123abc"} 
            onChange={(e) => {
              setPassword(e.target.value)
              // console.log(e.target.value)
            }}
          />

          <Button
           label={"Sign Up"}
           onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              email,
              name,
              password
            })

            console.log(response.data.token);
            localStorage.setItem("token" ,response.data.token)
            login();
            if(email && password){
              navigate('/')
            }
           }}
          />
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}

export default Signup