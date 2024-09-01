import React, { useEffect, useRef, useState } from "react"; 
import FlyoutContent from "./FlyoutContent";

function FlyoutLink({children}){
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
  
    const handleClick = () => {
      setOpen(open => !open)
    }
  
    const handleClickOutside = (event) => {
      if(ref.current && !ref.current.contains(event.target)){
        setOpen(false);
      }
    }
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [])
  
    return <div ref={ref} onClick={handleClick} className='bg-gray-400 rounded-full p-2 relative z-50'>
      <div className='cursor-pointer'>
        {children}
      </div>
  
      {open && (
        <div className='absolute -right-[6px] top-12 bg-white text-black z-50'>
          {/* <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div> */}
          <FlyoutContent />
        </div> 
      )}
    </div>
  }

export default FlyoutLink
  