import React, { useEffect } from 'react'
import Select from "react-select";

const CountryDropDown = ({label, selectedCountry, onChange, countries}) => {
    const customStyles = {
        control: (provided) => ({
          ...provided,
          backgroundColor: 'rgb(239 246 255)', // Tailwind's bg-blue-50
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: 'rgb(239 246 255)', // Tailwind's bg-blue-50 for the dropdown
        }),
    };
    
    return (
        <div className='mt-2'>
          <label className='block mb-2'>{label}</label>
          <Select
            options={countries}
            value={selectedCountry}
            styles={customStyles}
            onChange={onChange}
          />
        </div>
    )
}

export default CountryDropDown