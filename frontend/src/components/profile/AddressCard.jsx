import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineAddLocation  } from 'react-icons/md'
import AddressLoader from '../loaders/AddressLoader';

const AddressCard = () => {
    const [isAddressAdded, setIsAddressAdded] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [flat, setFlat] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchAddress =  () => {
        axios.get('http://localhost:3000/api/v1/profile/address', {
            headers: {
                Authorization: "Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => {
            const { flat, street, city, zipCode, state, country } = res.data.address;
            setAddress(res.data.address);
            setFlat(flat || '')
            setStreet(street || '')
            setCity(city || '')
            setZipCode(zipCode || '')
            setState(state || '')
            setCountry(country || '')
            console.log(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchAddress();
    }, []);

    useEffect(() => {
        const savedAddress = localStorage.getItem('isAddressAdded');
        const savedStatus = localStorage.getItem('isSaved');
        
        if (savedAddress) {
            setIsAddressAdded(JSON.parse(savedAddress));
        }
        if (savedStatus) {
            setIsSaved(JSON.parse(savedStatus));
        }
    }, []);

    const handleAddressSave = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/api/v1/profile/address', {
                flat,
                street,
                city,
                zipCode,
                state,
                country
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            setIsSaved(true)
            setIsAddressAdded(true)
            localStorage.setItem('isAddressAdded', true);
            localStorage.setItem('isSaved', true);
            // console.log(isSaved);
            // console.log(isAddressAdded)
            fetchAddress();
            console.log("post")
        }catch(e){
            console.error('Failed to add the address: ', e);
        }
    }

    const handleAddressUpdate = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.put('http://localhost:3000/api/v1/profile/address', {
                flat,
                street,
                city,
                zipCode,
                state,
                country
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            setIsSaved(true)
            setIsAddressAdded(true)
            localStorage.setItem('isAddressAdded', true);
            localStorage.setItem('isSaved', true);
            // console.log(isSaved);
            // console.log(isAddressAdded)
            console.log("put");
            fetchAddress();
        }catch(e){
            console.error('Failed to add the address: ', e);
        }
    }

    const handleAddressEdit = () => {
        setIsEditable(true);
        setIsSaved(false);
        localStorage.setItem('isEditable', true);
        localStorage.setItem('isSaved', false)
        console.log("PUT EDIT")
        console.log("isEditable: ", isEditable);
    };

    const handleAddresAdd = () => {
        setIsAddressAdded(true);
        setIsSaved(false)
        localStorage.setItem('isAddressAdded', true)
        localStorage.setItem('isSaved', false)
    }

    const handleAddressDelete = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.delete('http://localhost:3000/api/v1/profile/address', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            fetchAddress();
        }catch(e){
            console.error('Failed to delete the address: ', e)
        }
        setIsAddressAdded(false);
        localStorage.setItem('isAddressAdded', false)
        // localStorage.removeItem('isAddressAdded');
        // localStorage.removeItem('isSaved');
    }

    const handleAddCardPopDown = () => {
        setIsSaved(true);
        setIsEditable(false);
        localStorage.setItem('isSaved', true);
        localStorage.setItem('isEditable', false);
        console.log("post")
    }

    const handleEditCardPopDown = () => {
        setIsSaved(true);
        setIsEditable(false);
        localStorage.setItem('isSaved', true);
        localStorage.setItem('isEditable', false);
        console.log("edit")
        fetchAddress();
    }

    if(loading){
        return <div>
            <AddressLoader />
        </div>
    }

    return (
        <div>
            <h2 className='text-center text-[32px] mt-4'>Hey Premchand 👋</h2>

            {isAddressAdded ? (
                <div>
                    {isSaved ? (
                        <div className='shadow-custom rounded-xl p-6 mt-6'>
                            <div className='flex justify-between my-2'>
                                <div></div>
                                <h3 className='text-xl'>Your Delivery Address</h3>
                                <div className='cursor-pointer' onClick={handleAddressEdit}>
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
                            <div className='grid grid-cols-3 gap-3 mt-6'>
                                <AddressLabel label={"Address line 1"} placeholder={address.flat} />
                                <AddressLabel label={"Street"} placeholder={address.street} />
                                <AddressLabel label={"City"} placeholder={address.city} />
                                <AddressLabel label={"Zipcode"} placeholder={address.zipCode} />
                                <AddressLabel label={"State"} placeholder={address.state} />
                                <AddressLabel label={"Country"} placeholder={address.country} />
                            </div> 

                            <div className='flex justify-end mt-6'>
                                <button onClick={handleAddressDelete} className="text-violet-600  hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-base px-8 py-2.5 mt-2 mb-2 shadow-md border border-violet-300 w-28">Delete</button>
                            </div>                       
                        </div>
                    ): (
                        <div>
                            {isEditable ? (
                                <div className='shadow-custom rounded-xl p-6 mt-6'>
                                    <div className='flex justify-between mt-2'>
                                        <div></div>
                                        <h3 className='text-xl'>Edit Your Delivery Address</h3>
                                        <div className='cursor-pointer' onClick={handleEditCardPopDown}>
                                            <i className='bx bx-x text-2xl hover:bg-gray-200 rounded-md'></i>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 gap-3 mt-6'>
                                        <AddressInput label={"Address line 1"} onChange={(e) => {
                                            setFlat(e.target.value)
                                        }} value={flat} />
                                        <AddressInput label={"Street"} onChange={(e) => {
                                            setStreet(e.target.value)
                                        }} value={street} />
                                        <AddressInput label={"City"} onChange={(e) => {
                                            setCity(e.target.value)
                                        }} value={city} />
                                        <AddressInput label={"Zipcode"} onChange={(e) => {
                                            setZipCode(e.target.value)
                                        }} value={zipCode} />
                                        <AddressInput label={"State"} onChange={(e) => {
                                            setState(e.target.value)
                                        }} value={state} />
                                        <AddressInput label={"Country"} onChange={(e) => {
                                            setCountry(e.target.value)
                                        }} value={country} />
                                    </div>

                                    <div className='flex justify-end mt-6'>
                                        <button onClick={handleAddressUpdate} className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-8 py-2.5 mt-2 mb-2 shadow-md w-28">Save</button>
                                    </div>  
                                </div>
                            ):(
                                <div className='shadow-custom rounded-xl p-6 mt-6'>
                                    <div className='flex justify-between my-2'>
                                        <div></div>
                                        <h3 className='text-xl'>Add Your Delivery Address</h3>
                                        <div className='cursor-pointer' onClick={handleAddCardPopDown}>
                                            <i className='bx bx-x text-3xl hover:bg-gray-200 rounded-md'></i>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 gap-3 mt-6'>
                                        <AddressInput label={"Address line 1"} onChange={(e) => {
                                            setFlat(e.target.value)
                                        }} />
                                        <AddressInput label={"Street"} onChange={(e) => {
                                            setStreet(e.target.value)
                                        }} />
                                        <AddressInput label={"City"} onChange={(e) => {
                                            setCity(e.target.value)
                                        }} />
                                        <AddressInput label={"Zipcode"} onChange={(e) => {
                                            setZipCode(e.target.value)
                                        }} />
                                        <AddressInput label={"State"} onChange={(e) => {
                                            setState(e.target.value)
                                        }} />
                                        <AddressInput label={"Country"} onChange={(e) => {
                                            setCountry(e.target.value)
                                        }} />
                                    </div>

                                    <div className='flex justify-end mt-6'>
                                        <button onClick={handleAddressSave} className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-8 py-2.5 mt-2 mb-2 shadow-md w-28">Save</button>
                                    </div>  
                                </div> 
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className='shadow-custom rounded-xl p-6 mt-6'>
                    <div onClick={handleAddresAdd} className='shadow-custom rounded-xl p-6 flex flex-col justify-center items-center gap-y-2 cursor-pointer'>
                        <MdOutlineAddLocation  className='text-2xl text-violet-600' />
                        <p className='bg-violet-600 px-3 py-1.5 rounded-md text-white'>Add Address</p>
                    </div>
                    
                </div>
            )}
        </div>
    )
}

/*

*/

function AddressInput({label, onChange, value }){
    return <div>
        <div className='text-base text-left font-medium py-2'>
            {label}
        </div>
        <input onChange={onChange} type="text" value={value} className='bg-blue-50 w-full h-10 px-2 py-1 border rounded border-slate-200 focus:ring-2 focus:ring-violet-300 focus:outline-none' />
    </div>
}

function AddressLabel({label, placeholder}){
    return <div>
        <div className='text-base text-left font-medium py-2'>
            {label}
        </div>
        <p className='bg-blue-50 w-full h-10 px-2 py-1 border rounded border-slate-200 focus:ring-2 focus:ring-violet-300 focus:outline-none overflow-hidden whitespace-nowrap'>{placeholder}</p>
    </div>
}

export default AddressCard


