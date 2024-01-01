import React from 'react';
import Footer from '../components/Footer';
import offersData from '../assests/offers.json';
import { useSelector } from 'react-redux';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='bg-violet-600'>
      <h1 className='text-5xl font-sans pt-24 text-white font-black text-center p-10'>
      Nepal's Premier Student Discounts Hub!      
      </h1>
      <p className='text-center pb-8 p-2 font-light font-sans text-white'>Study More, Spend Less - Empowering Nepali Students with Unmatched Deals!</p>
             
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 justify-center">
        {offersData.map((offer, index) => (
          <div key={index} className="p-5 mx-5 md:mx-2">
            <div className="w-full bg-gradient-to-r from-white to-violet-200 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
              <div className="p-5">
                <img
                  className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full md:rounded-xl shadow-2xl"
                  src={offer.imgUrl}
                  alt={offer.name}
                />
              </div>
              <div className="flex flex-col flex-grow pb-5 px-5 md:p-5">
                <h2 className="mb-1 md:text-start text-center font-medium text-black">
                  {offer.name}
                </h2>
                
                 
                    <p href="#" className="inline-flex items-center my-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ">
                      Discount: {offer.discount}
                    </p>
                    <p href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-gray-300 rounded-lg">
                      Location: {offer.location}
                    </p>
               
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
