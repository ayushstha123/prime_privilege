import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const IdentityCard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [usages, setUsages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/usuage/user-usages/${currentUser._id}`);
        if (res.ok) {
          const data = await res.json();
          setUsages(data);
        } else {
          console.log(error);
                }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch usage data');
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser._id) {
      fetchUsages();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='font-aileron p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl m-10 text-center font-bold'>Digital Identity Card</h1>
      <div className='bg-gray-100 shadow-xl shadow-gray-600'>
        <div className='p-8 rounded-xl'>
          <img className='h-32 w-32 mx-auto' src='https://prime.edu.np/wp-content/uploads/2023/08/prime-logo.svg' alt='Logo' />
          <img className='h-36 w-36 mx-auto cursor-pointer rounded-full object-cover mt-2' src={currentUser.profilePicture} alt="Identity Card" />
          <div className='flex p-2 mt-5 w-2/6 justify-center items-center rounded-lg mx-auto bg-green-300'>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path fill="green" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
              <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
            </svg>
            <p className='text-center text-black font-bold rounded-lg'>
              <span className="sr-only">Icon description</span>
              Verified
            </p>
          </div>
          <h1 className='mt-5 text-3xl font-extrabold text-center'>{currentUser.name}</h1>
          <h1 className='text-sm font-light text-center'>{currentUser.username}</h1>
        </div>
        <div className='bg-gradient-to-bl to-[#263675] from-blue-600 text-white'>
          <div className='grid grid-cols-2 px-16 md:px-20 py-5 gap-2'>
            <p className='text-xl font-bold'>Email :</p><p>{currentUser.email}</p>
            <p className='text-xl font-bold'>College :</p><p>{currentUser.college}</p>
            <p className='text-xl font-bold'>Level :</p><p>{currentUser.level}</p>
            <p className='text-xl font-bold'>Address :</p><p>{currentUser.address}</p>
            <p className='text-xl font-bold'>Joined At :</p><p>{new Date(currentUser.createdAt).toLocaleDateString()}</p>
          </div>
          
        </div>
      </div>

      {/* Business Visit History */}
      <h2 className='text-3xl font-bold mt-10'>Businesses Visited</h2>
      {usages.length === 0 ? (
        <p>No usage data available.</p>
      ) : (
        <table className='border border-collapse border-gray-500 shadow-sm w-full mt-5'>
          <thead className='text-white' style={{ backgroundColor: '#263670' }}>
            <tr className='border border-black'>
              <th className='border border-black'>Business Name</th>
              <th className='border border-black'>Business Email</th>
              <th className='border border-black'>Business Product</th>
              <th className='border border-black'>Business Price</th>
              <th className='border border-black'>Usage Count</th>
              <th className='border border-black'>Expiration Date</th>
            </tr>
          </thead>
          <tbody className='font-aileron'>
            {usages.map((usage, index) => (
              <tr className='border-b text-center border-gray-200' key={index}>
                <td className='border border-black'>{usage.business.name}</td>
                <td className='border border-black'>{usage.business.email}</td>
                <td className='border border-black'>{usage.productName}</td>
                <td className='border border-black'>{usage.discountAmount}</td>
                <td className='border border-black'>{usage.usageCount}</td>
                <td className='border border-black'>{new Date(usage.expirationDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IdentityCard;
