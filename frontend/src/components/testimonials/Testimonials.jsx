import React from 'react'

const Testimonials = () => {
    const testimonials = [
        {
            name: "Surekha",
            place: "Andhra Pradesh"
        },
        {
            name: "Arjun",
            place: "Telangana"
        },
        {
            name: "Neha",
            place: "Karnataka"
        }
    ]
    return (
        <div className='my-16'>
            <h2 className='text-center text-4xl font-bold'>Testimonials</h2>
            <div className='flex w-[87%] m-auto my-10'>
                {testimonials.map((t, id) => <TestimonialCard key={id} name={t.name} place={t.place} />)}
            </div>
        </div>
    )
}

function TestimonialCard({name, place}){
    return <div className='flex flex-col h-76 mx-4 bg-slate-200 p-4 rounded-md'>
        <div className='flex justify-center text-center items-center px-4 py-2'>
            <div className='bg-gray-500 text-white text-xl px-4 py-2 w-12 h-12 flex items-center justify-center rounded-full mr-6'>
                {name[0]}
            </div>
            <div>
                <h2 className='text-xl font-semibold'>{name}</h2>
                <p className='text-base text-gray-900'>{place}</p>
            </div>
        </div>
        <div className='text-center px-6 py-2 m-auto'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quidem iure fuga aut fugit. Ducimus, doloremque asperiores vitae aut consequatur obcaecati nulla omnis ratione tempora quasi iusto veritatis. Expedita esse odio corporis eveniet, iure ducimus numquam corrupti rem ea! Repellendus temporibus nostrum tempore molestiae necessitatibus.
        </div>
    </div>
}

export default Testimonials