import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DashAllUsage = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [usages, setUsages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsages = async () => {
      try {
        const res = await fetch(`/api/usuage/all-usages`);
        if (res.ok) {
          const data = await res.json();
          setUsages(data);
        } else {
          throw new Error('Failed to fetch usage data');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch usage data');
        setError(error.message);
      }
    };

    fetchUsages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className='text-3xl font-bold mt-10'>All information about the transactions</h2>
      {usages.length === 0 ? (
        <p>No usage data available.</p>
      ) : (
        <table className='border border-collapse border-gray-500 shadow-sm w-full mt-5'>
          <thead className='text-white' style={{ backgroundColor: '#263670' }}>
            <tr className='border border-black'>
              <th className='border border-black'>Student Name</th>
              <th className='border border-black'>Business Name</th>
              <th className='border border-black'>Product Name</th>
              <th className='border border-black'>Amount</th>
              <th className='border border-black'>Usage Count</th>
              <th className='border border-black'>Expiration Date</th>
            </tr>
          </thead>
          <tbody className='font-aileron'>
            {usages.map((usage, index) => (
              <tr className='border-b text-center border-gray-200' key={index}>
                <td className='border border-black'>{usage.studentEmail}</td>
                <td className='border border-black'>{usage.businessId ? usage.businessId.name : 'Unknown'}</td>
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

export default DashAllUsage;
