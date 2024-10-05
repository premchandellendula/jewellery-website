import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import AddressLoader from '../loaders/AddressLoader';

const ProfileCard = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [details, setDetails] = useState({})
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [isContactAdded, setIsContactAdded] = useState(false) 
    const [loading, setLoading] = useState(true)

    const fetchDetails = () => {
        axios.get('http://localhost:3000/api/v1/profile', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => {
            const {name} = response.data
            const phoneNumber = response.data.contactInfo.phoneNumber
            console.log(response.data.contactInfo.phoneNumber)
            console.log(phoneNumber)
            setDetails(response.data)
            setName(name || '')
            setPhoneNumber(phoneNumber || '')
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })

    }
    useEffect(() => {
        fetchDetails();
    }, []);

    const handleProfileDetailsSave = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.put('http://localhost:3000/api/v1/profile/details', {
                name,
                phoneNumber
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
        }catch(e){
            console.error('Failed to update the profile details: ', e)
        }
        setIsEditable(false);
        localStorage.setItem('isEditable', false)
        fetchDetails();
    }

    const handlePhoneNumberAdd = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/api/v1/profile/phonenumber', {
                phoneNumber
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
        }catch(e){
            console.error('Failed to update the profile details: ', e)
        }
        setIsPopUpOpen(false);
        fetchDetails();
    }

    const handlePopUp = async (e) => {
        setIsPopUpOpen(true);
        setIsContactAdded(true);
        localStorage.setItem('isContactAdded', true)
    }

    if(loading){
        return <div>
            <AddressLoader />
        </div>
    }
  return (
    <div>
        <h2 className='text-center text-[32px] mt-4'>Hey Premchand 👋</h2>
        
        {isEditable ? (
            <div className='shadow-custom rounded-xl h-full p-6 mt-6'>
                <div className=''>
                    <ProfileInput label={"Name"} onChange={(e) => setName(e.target.value)} value={name} />
                </div>

                <div className='flex mt-4'>
                    <div className='w-[50%]'>
                        <div className='text-lg'>
                            Email
                        </div>
                        <p className='bg-blue-50 p-3 w-[95%] rounded-xl mt-2 hover:cursor-not-allowed'>{details.email}</p>
                    </div>
                    <div className='w-[50%]'>
                        <ProfileInput label={"Contact Number"} onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                    </div>
                </div>

                <div className='flex justify-center mt-6'>
                    <button onClick={handleProfileDetailsSave} className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 mt-2 mb-2 shadow-md">Save</button>
                </div>
            </div>
        ) : (
            <div className='shadow-custom rounded-xl h-full p-6 mt-6'>
                <div className='flex justify-between'>
                    <div className='w-[50%]'>
                        <label htmlFor="" className='ml-2 text-lg'>Name</label>
                        <p className='bg-blue-50 p-3 rounded-xl mt-2 w-[95%]'>{details.name}</p>
                    </div>
                    <div className='cursor-pointer' onClick={() => {
                            setIsEditable(true)
                            localStorage.setItem('isEditable', true)
                            }}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="28" 
                            height="28" 
                            viewBox="0 0 24 24" 
                            style={{fill: 'rgba(0,0,0,0.8)',transform: "",msFilter: ""}}>
                                <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
                                <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
                        </svg>
                    </div>
                </div>

                <div className='flex mt-4'>
                    <div className='w-[50%]'>
                        <label htmlFor="" className='ml-2 text-lg'>Email</label>
                        <p className='bg-blue-50 p-3 w-[95%] rounded-xl mt-2'>{details.email}</p>
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="" className='ml-2 text-lg'>Contact Number</label>
                        <p className='bg-blue-50 p-3 w-[95%] rounded-xl mt-2'>{phoneNumber}</p>
                    </div>
                </div>
            </div>
        )}

        {isPopUpOpen ? (
            <div className='flex justify-end items-center gap-6 mt-6'>
                <div className='cursor-pointer' onClick={() => setIsPopUpOpen(false)}>
                    <i className='bx bx-x text-3xl hover:bg-gray-200 rounded-md'></i>
                </div>
                <PhoneInput
                    defaultCountry="in"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    className='focus:ring-2 focus:ring-violet-300 focus:outline-none'
                />
                <button onClick={handlePhoneNumberAdd} className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2 shadow-md">Save</button>
            </div>
        ) : (
            <div>
                {isContactAdded ? (
                    <div className='flex justify-end mt-6'>
                        <button className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2 shadow-md">Added</button>
                    </div>
                ) : (
                    <div className='flex justify-end mt-6'>
                        <button onClick={handlePopUp} className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2 shadow-md">Add Phone Number</button>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}


function ProfileInput({label, onChange, value }){
    return <div>
        <div className='text-base text-left font-medium py-2'>
            {label}
        </div>
        <input onChange={onChange} type="text" value={value} className='bg-blue-50 w-full h-10 px-2 py-1 border rounded border-slate-200 focus:ring-2 focus:ring-violet-300 focus:outline-none' />
    </div>
}

function ProfileLabel({label, placeholder}){
    return <div>
        <div className='text-base text-left font-medium py-2'>
            {label}
        </div>
        <p className='bg-blue-50 w-full h-10 px-2 py-1 border rounded border-slate-200 focus:ring-2 focus:ring-violet-300 focus:outline-none overflow-hidden whitespace-nowrap'>{placeholder}</p>
    </div>
}

export default ProfileCard