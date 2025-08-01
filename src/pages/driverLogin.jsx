import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const DriverLogin = () => {
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const navigate=useNavigate();
    const handleSubmit= async (e) =>{
      e.preventDefault();
      try{
        console.log("handle submit")
        const res = await fetch('http://localhost:5000/api/auth/driver/login', {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({email, password, role:'driver'}),
        });
        console.log("fetched");
        const data = await res.json();
        if(res.ok){
          alert("login succ");
          navigate('/driver/location');
        }else{
          alert(data.message);

        }
      }
      catch(err){
        alert("server error");
        console.log(err);
      }
    }
  return (
    <div className=' bg-teal-50 relative flex justify-center text-center px-10 py-10'>
        <form onSubmit={handleSubmit}>
            <h2 className='text-center text-4xl font-bold text-teal-800'>Driver login</h2>
            <div className='flex-col w-full shadow-lg border-2 rounded-lg border-teal-950 mx-10 my-10 bg-teal-800 px-10 py-10'>
            <label className='block text-white text-xl' >Email</label>
            <input type="email" className='w-full border-2 rounded bg-white' onChange={(e)=> setEmail(e.target.value)}></input>
            <label className='block text-white text-xl' >Password</label>
            <input type={showPass? 'text': 'password'} className=' w-full border-2 rounded bg-white ' onChange={(e)=> setPassword(e.target.value)}></input>
            <button type='button' className='block text-white text-xl' onClick={()=> setShowPass(!showPass)}>{showPass?'Hide':'Show'}</button>
            <Link to='' className='block text-xl text-white'>Forgot password</Link>

            <button type='submit' className='border-2 rounded-2xl bg-white px-5 py-3 text-xl '>login</button></div>
           <p>Dont have an account?? <Link to='/driver/register' >Register</Link></p>
        </form>
    </div>
  )
}

export default DriverLogin