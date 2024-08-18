import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='py-10 mt-10'>
        <div className='flex justify-between w-[85%] m-auto'>
            {/* logo side */}
            <div className='flex flex-col w-1/3 gap-8'>
                <Link to={"/"} className="flex flex-col justify-center text-2xl font-semibold cursor-pointer">
                    <div className="text-black text-3xl">
                        LogoReveal
                    </div>
                </Link>
                <p className="text-[15px] font-medium text-[#646464]">
                    Explore our handcrafted jewellery, designed with over 15 years of expertise to celebrate your unique style with timeless elegance.
                </p>

                <div className="flex gap-7 text-[18px] text-[#646464]">
                    <i style={{ transition: "all 0.3s" }} className='bx bxl-facebook bg-[#efefef] p-4 rounded-full px-[14px] hover:bg-violet-400 hover:text-white'></i>
                    <i style={{ transition: "all 0.3s" }} className='bx bxl-twitter bg-[#efefef] p-4 rounded-full px-[14px] hover:bg-violet-400 hover:text-white'></i>
                    <i style={{ transition: "all 0.3s" }} className='bx bxl-pinterest-alt bg-[#efefef] p-4 rounded-full px-[14px] hover:bg-violet-400 hover:text-white'></i>
                    <i style={{ transition: "all 0.3s" }} className='bx bxl-youtube bg-[#efefef] p-4 rounded-full px-[14px] hover:bg-violet-400 hover:text-white'></i>
                    {/* <i className='bx bxl-facebook'></i> */}
                </div>
                <p className="text-[16px] font-medium text-[#646464]">
                    Privacy Policy | © {new Date().getFullYear()} LogoReveal <br />{" "}
                </p>
            </div>

            {/* middle div */}
            <div className='flex flex-col gap-8 relative'>
                <p className="text-[22px] font-bold footer-main">Categories</p>

                <span className="top-[33px] absolute w-[7rem] h-[4px] bg-violet-400"></span>

                <p className="text-[16px] hover:text-violet-600 cursor-pointer text-[#646464] font-medium">
                Bangles
                </p>
                <p className="text-[16px] hover:text-violet-600 cursor-pointer text-[#646464] font-medium">
                Bracelets
                </p>
                <p className="text-[16px] hover:text-violet-600 cursor-pointer text-[#646464] font-medium">
                Chains
                </p>
                <p className="text-[16px] hover:text-violet-600 cursor-pointer text-[#646464] font-medium">
                Necklaces
                </p>
                <p className="text-[16px] hover:text-violet-600 cursor-pointer text-[#646464] font-medium">
                Rings
                </p>
                <p className="text-[16px] hover:text-violet-600 cursor-pointer text-[#646464] font-medium">
                Recent Works
                </p>
            </div>

            {/* right div */}
            <div className='flex flex-col gap-8 relative'>
                <p className="text-[22px] font-bold footer-main">Working Hours</p>

                <span className="top-[33px] absolute w-[7rem] h-[4px] bg-violet-400"></span>

                <p className="text-[16px]  text-[#646464] font-bold">
                Monday - Saturday:
                </p>
                <p className="text-[16px] text-[#646464] font-medium">
                7:00am - 21:00pm
                </p>
                <p className="text-[16px] text-[#646464] font-bold">Sunday:</p>
                <p className="text-[16px] text-[#646464] font-medium">
                9:00am - 12:00pm
                </p>
                
            </div>
        </div>
    </div>
  )
}

export default Footer