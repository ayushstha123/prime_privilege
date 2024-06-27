import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
 
    const fieldName = e.target.id;
    setFormData((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formData.email === "") {
      toast.error("Please enter your email!");
    }
    setLoading(true); // Set loading state to true while processing request
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Please Check Your Email');
      } else {
        toast.error('Failed to send link');
      }
    } catch (error) {
      console.error('Error sending link:', error);
      toast.error('Error sending link');
    } finally {
      setLoading(false); // Reset loading state after request is complete
    }
  };

  return (
<div className='font-aileron p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-bold my-7'>😒 Forgot Password ?</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> {/* Call handleSubmit on form submit */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className='bg-slate-200 p-3 rounded-lg'
          value={formData.email}
          placeholder='Enter your email here...'
          onChange={handleChange}
          disabled={loading} // Disable input while loading
        />
        <button type="submit" className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}> {/* Disable button while loading */}
          {loading ? 'Loading...' : 'Submit'}
          
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
