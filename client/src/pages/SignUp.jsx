import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {toast} from 'react-toastify'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collegeId, setCollegeId] = useState(undefined);
  const [collegeIdPercent, setCollegeIdPercent] = useState(0);
  const [collegeIdError, setCollegeIdError] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const handleFileUpload = async (file, fieldName) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCollegeIdPercent(Math.round(progress));
      },
      (error) => {
        console.error('Upload error:', error);
        setCollegeIdError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, [fieldName]: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (collegeId) {
      handleFileUpload(collegeId, 'collegeId');
    }
  }, [collegeId]);

  const validateForm = () => {
    const { username, email, password, phoneNum, address, level, collegeId } = formData;
    if (!username || username.trim() === '') {
      setError('Username is required.');
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
    if (!level) {
      toast.error('Please select your education level.');
      return false;
    }
    if (!address) {
      toast.error('Please enter your address!');
      return false;
    }

    // Check if collegeId is uploaded
    if (!collegeId) {
      toast.error('Please upload your College ID.');
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
  
    if (fieldName === 'collegeId') {
      setCollegeId(e.target.files[0]);
    } else {
      setFormData((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
    }
  
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      setLoading(true);
      setError(false);
  
      const collegeElement = document.getElementById('college');
      const collegeValue = collegeElement ? collegeElement.value : '';
      const formDataWithCollege = {
        ...formData,
        collegeID: collegeValue,
      };

  
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithCollege),
      });
  
      const data = await res.json();
      setLoading(false);
  
      if (!data.success) {
        toast.error(`Sign-up failed: ${data.message || 'Unknown error'}`);
        console.log(res)
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
  
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch('/api/auth/sendotp', {
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
    <div className='p-3 max-w-lg mx-auto'>
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
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
  onClick={handleVerifyEmail} // Add this click event handler
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
          id='level'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={(e) => setFormData((prevData) => ({ ...prevData, level: e.target.value }))}
        >
          <option default>Select Education Level</option>
          <option value='+2'>+2</option>
          <option value='bachelor'>Bachelor</option>
          <option value='masters'>Masters</option>
        </select>
        <input
          type='file'
          id='collegeId'
          hidden
          ref={fileRef}
          accept='image/*'
          onChange={(e) => setCollegeId(e.target.files[0])}
        />
        <label htmlFor='collegeId' className='bg-green-500 p-2 cursor-pointer'>
          Upload Your College ID
        </label>
        <p className='text-sm self-center'>
          {collegeIdError ? (
            <span className='text-red-700'>Error uploading college ID</span>
          ) : collegeIdPercent > 0 && collegeIdPercent < 100 ? (
            <span className='text-slate-700'>{`Uploading College ID: ${collegeIdPercent} %`}</span>
          ) : collegeIdPercent === 100 ? (
            <span className='text-green-700'>College ID uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
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
      </form>
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
