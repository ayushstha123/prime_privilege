import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const DashUsage = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [usages, setUsages] = useState([]);
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [products, setProducts] = useState([]); // State to store products
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await fetch(`/api/usuage/get-usages/${currentUser._id}`);
        if (res.ok) {
          const data = await res.json();
          setUsages(data);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch usage data');
        setError(error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/business/get-product/${currentUser._id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        } else {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    if (currentUser && currentUser._id) {
      fetchUsage();
      fetchProducts(); // Fetch products when currentUser is available
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/usuage/create-usage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: currentUser._id,
          studentEmail: email,
          expirationDate: new Date(), // Placeholder expiration date, adjust as needed
          productName,
          discountAmount: parseFloat(price), // Ensure price is parsed as float
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setUsages((prevUsages) => [...prevUsages, data]);
        toast.success('Usage added successfully');
      } else {
        const error = await res.json();
        const message = error.message || 'An error occurred';
        toast.error(message);
        
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add usage');
    }
  };

  // Function to download Excel file for a student's usage data
  const downloadExcel = (email) => {
    const filteredUsages = usages.filter((usage) => usage.studentEmail === email);
    const formattedData = filteredUsages.map((usage) => ({
      'Expiration Date': new Date(usage.expirationDate).toLocaleDateString(),
      'Usage Count': usage.usageCount,
      'Student Email': usage.studentEmail,
      'Product': usage.productName,
      'Amount': usage.discountAmount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${email}_usage_data.xlsx`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Group usages by studentEmail
  const groupedUsages = {};
  usages.forEach((usage) => {
    const key = `${usage.studentEmail}_${usage.productName}`;
    if (!groupedUsages[key]) {
      groupedUsages[key] = {
        ...usage,
        totalDiscount: parseFloat(usage.discountAmount), // Initialize totalDiscount
      };
    } else {
      groupedUsages[key].totalDiscount += parseFloat(usage.discountAmount);
    }
  });

  return (
    <div>
      <h2>Usage Details</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Student Email'
          required
        />
        {/* Dropdown for selecting Product Name */}
        <select
          id='productName'
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
            const selectedProduct = products.find(product => product.name === e.target.value);
            if (selectedProduct) {
              setDiscount(selectedProduct.discount);
              setPrice(selectedProduct.price * (1 - selectedProduct.discount / 100).toFixed(2) );
            }
          }}
          required
        >
          <option value=''>Select Product</option>
          {products.map((product) => (
            <option key={product._id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <input
        disabled
          type='number'
          id='discount'
          value={discount}
          placeholder='Discount Amount'
          required
        />
        <input
          type='number'
          id='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Discount Amount'
          required
        />
        <button type='submit'>Add Usage</button>
      </form>

      {Object.keys(groupedUsages).length === 0 ? (
        <p>No usage data available.</p>
      ) : (
        Object.keys(groupedUsages).map((key, index) => {
          const usage = groupedUsages[key];
          return (
            <div key={index} className='mt-4'>
              <h3>Discount Usages for {usage.studentEmail}</h3>
              <button className='bg-green-700 my-2 text-white font-bold py-2 px-4 rounded' onClick={() => downloadExcel(usage.studentEmail)}>Download Excel</button>
              <table className='border border-collapse border-gray-500 shadow-sm w-full'>
                <thead className='text-white' style={{ backgroundColor: '#263670' }}>
                  <tr className='border border-black'>
                    <th className='border border-black'>Expiration Date</th>
                    <th className='border border-black'>Usage Count</th>
                    <th className='border border-black'>Student Email</th>
                    <th className='border border-black'>Product</th>
                    <th className='border border-black'>Amount</th>
                  </tr>
                </thead>
                <tbody className='font-aileron'>
                  <tr className='border-b text-center border-gray-200'>
                    <td className='border border-black'>
                      {new Date(usage.expirationDate).toLocaleDateString()}
                    </td>
                    <td className='border border-black'>{usage.usageCount}</td>
                    <td className='border border-black'>{usage.studentEmail}</td>
                    <td className='border border-black'>{usage.productName}</td>
                    <td className='border border-black'>{usage.totalDiscount.toFixed(2)}</td>
                  </tr>
                  <tr className='border-b text-center bg-gray-400'>
                    <td colSpan='4' className='border border-black font-bold'>Total</td>
                    <td className='border border-black font-bold'>
                      Rs. {usage.totalDiscount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DashUsage;
