import React, { useState } from 'react';
// import './carousel.css'; // Import additional custom CSS for overflow styling if needed

const Slider = ({heading}) => {
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12'
  ];

  const itemsPerPage = 4; // Number of items visible at once
  const totalItems = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + totalItems) % totalItems);
  };

  const getVisibleItems = () => {
    const start = currentIndex;
    const end = (start + itemsPerPage) % totalItems;

    if (end > start) {
      return items.slice(start, end);
    } else {
      return [...items.slice(start), ...items.slice(0, end)];
    }
  };

  return (
    <div className='my-16'>
      <div className='flex items-center'>
          <h2 className='text-xl ml-2'>{heading}</h2>
          <button className="text-violet-700 rounded-full flex items-center relative group ml-2 gap-2 overflow-hidden w-20">
            <p className='absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs'>Explore all</p>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                style={{fill: 'rgba(147, 51, 234)', transform: '', msFilter: ''}}
                className="transition-transform duration-300 ease-in-out group-hover:translate-x-[52px]"
            >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </button>
      </div>

      <div className="relative w-full overflow-hidden">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 text-gray-400 rounded-full"
          onClick={prevSlide}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            style={{fill: 'rgba(0, 0, 0, 0.5)', transform: '', msFilter: ''}}
            className="transition-transform duration-200 ease-in-out hover:scale-125"
            >
              <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </button>
        <div className="relative flex overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * (100 / itemsPerPage))}%)`,
              width: `${totalItems * (100 / itemsPerPage)}%`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="min-w-[20%] p-2"
                style={{
                  flex: `0 0 ${100 / itemsPerPage}%`,
                }}
              >
                <div className="p-4 bg-gray-200 text-center h-40">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 text-gray-500 rounded-full"
          onClick={nextSlide}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            style={{fill: 'rgba(0, 0, 0, 0.5)',transform:'' ,msFilter: ''}}
            className="transition-transform duration-200 ease-in-out hover:scale-125"
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};


export default Slider;