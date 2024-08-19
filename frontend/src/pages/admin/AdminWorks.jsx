import React from 'react'
import AppBarAdmin from '../../components/admin/appbaradmin/AppBarAdmin'
import Footer from '../../components/footer/Footer'

const AdminWorks = () => {
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

  return (
    <div>
      <AppBarAdmin />

      <AddWork />

      <div className='grid grid-cols-3 w-[85%] m-auto my-8'>
        {items.map((d, idx) => <CategoryCard key={idx} img={d} />)}
      </div>

      <Footer />
    </div>
  )
}


function CategoryCard({img}){
  return <div className="border w-[90%] h-[15rem] m-6 border-gray-600 shadow-sm">
        {img}
    </div>
}


function AddWork(){
  return <div className='w-[84%] m-auto text-right pt-10'>
    <button type="button" className="text-white bg-violet-600 hover:bg-violet-800 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 shadow-md w-36">Add Work</button>
  </div>
}

export default AdminWorks