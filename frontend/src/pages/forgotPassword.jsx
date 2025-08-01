import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail]=useState('');
    
    const handleSubmit= async (e) =>{
      e.preventDefault();
      try{
        const res= await fetch('http://localhost:5000/api/forgotPassword',{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({email}),
        });
        const data= await res.json();
        if (!res.ok) throw new Error(data.error);
      }
      catch(err){
        alert("server error");
        console.log(err);
      }
    }
  return (
    <div className='relative flex justify-center text-center px-10 py-10'>
        <form onSubmit={handleSubmit}>
            <h2 className='text-center text-4xl font-bold text-teal-800'>Forgot Password</h2>
            <div className='flex-col w-full shadow-lg border-2 rounded-lg border-teal-950 mx-10 my-10 bg-teal-800 px-10 py-10'>
            <label className='block text-white text-xl' >Email</label>
            <input type="email" className='w-full border-2 rounded bg-white' onChange={(e)=> setEmail(e.target.value)}></input>
            <button className='block text-xl text-white'>Send Link</button>
    </div>
        </form>
    </div>
  )
}

export default ForgotPassword