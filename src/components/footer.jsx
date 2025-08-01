import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className=' bg-teal-800 text-white px-6 py-6'>
        <div className='text-center' >
          <p>{new Date().getFullYear()} My hostel. All rights are reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer