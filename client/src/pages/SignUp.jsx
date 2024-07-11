import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const validateForm = () => {
    const { username, email, password, phoneNum, address, name } = formData;
    if (!username || username.trim() === '') {
      setError('Username is required.');
      return false;
    }
    if (!name || name.trim() === '') {
      setError('name is required.');
      return false;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (!phoneNum || phoneNum.trim() === '') {
      toast.error('Phone Number is required.');
      return false;
    }

    // Check if level is selected
    
    if (!address) {
      toast.error('Please enter your address!');
      return false;
    }

   
    // Check if password is at least 10 characters
    if (!password || password.length < 10) {
      toast.error('Password must be at least 10 characters.');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const fieldName = e.target.id;
  
    
      setFormData((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
    
  
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
  
      const data = await res.json();
      setLoading(false);
  
      if (!data.success) {
        toast.error(`Sign-up failed: ${data.message || 'Unknown error'}`);
        console.log(res);
        setError(true);
        return;
      }
      toast.success("User Registered Successfully");
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      toast.error(`Error during sign-up: ${error.message || 'Unknown error'}`);
      setError(true);
    }
  };

  const handleVerifyEmail = async () => {
    try {    
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/sendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        toast.success('OTP sent successfully');
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Error sending OTP');
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div className='font-aileron p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Full Name'
          id='name'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
        type='button'
  onClick={handleVerifyEmail}
  className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95'
>
{loading ? 'Loading...' : 'Verify Email'}
</button>
<input
          type='text'
          placeholder='OTP from your email'
          id='otp'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='tel'
          placeholder='Phone Number'
          id='phoneNum'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <select
          id='role'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={(e) => setFormData((prevData) => ({ ...prevData, role: e.target.value }))}
        >
          <option default>Who are you?</option>
          <option value='idleStudent'>Student</option>
        </select> 
        <input
          type='text'
          placeholder='Address'
          id='address'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password (at least 10 characters)'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
        disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>      
      <p className='bg-blue-200 rounded-md my-5 p-2'>Are you a business owner . <Link className='text-blue-500 underline' to='/business-signup'>Click here!</Link></p>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
        
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  );
}
