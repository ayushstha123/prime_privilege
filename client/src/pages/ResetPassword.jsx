import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { id, token } = useParams();
    const [formData, setFormData] = useState({
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate=useNavigate();

    const handleChange = (e) => {
        setFormData({ password: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Fetch request to reset password
            const res = await fetch(`/api/user/reset_password/${id}/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: formData.password }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Password changed successfully');
                // Redirect to login page or show success message
                navigate('/sign-in');
            } else {
                setError('Failed to change password!');
                toast.error('Failed to change password!');
            }
        } catch (error) {
            console.error('Error Changing password:', error);
            setError('Error changing password');
            toast.error('Error changing password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='font-aileron p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-center font-bold my-20'>🥴 Change your password</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    id="password"
                    className='bg-slate-200 p-3 rounded-lg'
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required // Add required attribute for HTML5 validation
                />
                <button type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>
                    {loading ? 'Loading...' : 'Change Password'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            </form>
        </div>
    );
};

export default ResetPassword;
