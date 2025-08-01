import React from 'react'

const Hero = () => {
    const features=[
        'See Driver Location',
    'Book Your Seat',
    'Get Day-to-Day Notices',
    'Lost & Found',
    'Mess Menu',
    'Mark Attendance',
    ];
  return (
    <div className='px-4 py-10 bg-teal-50'>
        <h1 className='text-center text-4xl font-bold text-teal-800'>Why Use This Website?</h1>
        <div className='flex flex-wrap gap-5 m-4 justify-center items-center '>
            {features.map((feature,index)=>(
             <div key={index} className='w-70 h-35 text-center bg-teal-800 text-white text-2xl m-5 p-10 rounded hover:shadow-2xl hover:scale-105 hover:-translate-y-4 transition-all duration-500 ease-in bg-[length:0%_100%] bg-left bg-no-repeat hover:bg-gradient-to-r hover:bg-[length:100%_100%] hover:from-teal-600 hover: to-teal-400 hover:text-black'>
                <p>{feature}</p>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default Hero