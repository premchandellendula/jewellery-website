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
    const [isPopUpOpen, setIsPopUpOpen] = useState(localStorage.getItem('isPopUpOpen') === 'true')
    const [isContactAdded, setIsContactAdded] = useState(localStorage.getItem('isContactAdded') === 'true') 
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [addPhoneNumButtonLoading, setAddPhoneNumButtonLoading] = useState(false);

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
        setButtonLoading(true);

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
        }finally{
            setButtonLoading(false);
        }
        setIsEditable(false);
        localStorage.setItem('isEditable', false)
        fetchDetails();
    }

    const handlePhoneNumberAdd = async (e) => {
        e.preventDefault();
        setAddPhoneNumButtonLoading(true)
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
        }finally{
            setAddPhoneNumButtonLoading(false);
        }
        setIsPopUpOpen(false);
        localStorage.setItem('isPopUpOpen', false);
        setIsContactAdded(true);
        localStorage.setItem('isContactAdded', true);
        fetchDetails();
    }

    const handlePopUp = async (e) => {
        setIsPopUpOpen(true);
        localStorage.setItem('isPopUpOpen', true);
    }

    const handleEditCardPopDown = () => {
        setIsEditable(false);
        localStorage.setItem('isEditable', false)
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
            <div className='shadow-custom rounded-xl h-full px-6 py-2 mt-6'>
                <div className='flex justify-between'>
                    <div className='w-[47.5%]'>
                        <ProfileInput label={"Name"} onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className='cursor-pointer text-end w-[10%]' onClick={handleEditCardPopDown}>
                        <i className='bx bx-x text-2xl hover:bg-gray-200 rounded-md'></i>
                    </div>
                </div>

                <div className='flex mt-4'>
                    <div className='w-[50%]'>
                        <div className='text-base mt-1 font-medium'>
                            Email
                        </div>
                        <p className='bg-blue-50 px-3 py-2 w-[95%] rounded-sm border border-slate-200 mt-2.5 hover:cursor-not-allowed'>{details.email}</p>
                    </div>
                    <div className='w-[50%]'>
                        <ProfileInput label={"Contact Number"} onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                    </div>
                </div>

                <div className='flex justify-end mt-6'>
                    <button onClick={handleProfileDetailsSave} className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 mt-2 mb-2 shadow-md">
                    {buttonLoading ? (
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mx-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        ) : (
                        'Save'
                        )}
                    </button>
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
                <button onClick={handlePhoneNumberAdd} className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2 shadow-md">
                {addPhoneNumButtonLoading ? (
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mx-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    ) : (
                    'Save'
                    )}
                </button>
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