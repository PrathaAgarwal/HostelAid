import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/image.png'
const Navbar = () => {
  const [loginClick, setLoginClick] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setLoginClick(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <nav className='bg-teal-800 px-6 py-6 text-xl'>
      <div className='flex justify-between items-center relative'>
      <div className='absolute left-1/2 transform -translate-x-1/2  flex text-center gap-4'>
        <img src={logo} alt='logo image' className='rounded-xl bg-amber-50 h-10'></img>
        <h1 className='text-white text-2xl'>HostelAid</h1>
        </div>        
        <div className='ml-auto mr-15 flex justify-end items-center gap-4 text-white relative'> 
        <Link to="/" className='hover:border-b-2'>
          Home </Link>
          <button className='hover:border-b-2 flex gap-1' onClick={()=> setLoginClick(!loginClick)}  ref={buttonRef}>Login 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </button>      
        </div>
        {loginClick && (
          <div  ref={dropdownRef} className='absolute right-5 mt-5 top-full bg-white  text-teal-800 flex-row rounded z-10'>
            <Link to='/student/login' className='block border-b-4 px-2 py-2 hover:bg-teal-800 hover:text-white border-b-teal-800 rounded'>Student</Link>
            <Link to='/warden/login' className='block border-b-4 px-2 py-2 hover:bg-teal-800 hover:text-white border-b-teal-800 rounded'>Admin</Link>
             <Link to='/driver/login' className='block border-b-4 px-2 py-2 hover:bg-teal-800 hover:text-white border-b-teal-800 rounded'>Driver</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;