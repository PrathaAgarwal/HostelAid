import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/resetPassword/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('Password reset successfully');
      navigate('/login');
    } catch (err) {
      alert('Something went wrong');
      console.log(err);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-lg'>
        <h2 className='text-2xl font-bold mb-4'>Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="border w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-teal-600 text-white px-4 py-2 rounded'>Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
