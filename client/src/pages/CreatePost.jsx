import React from 'react'

const CreatePost = () => {
  return (
    <div>
      <div className="heading text-center font-bold text-3xl m-5 text-gray-800">New Post</div>

  <div className="mb-5 mx-auto w-10/12 flex flex-col rounded-md text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <input className="rounded-md  bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Name" type="text"/>
    <textarea className="rounded-md bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none resize-none mb-4" spellcheck="false" placeholder="Describe about the company here"></textarea>
        <input className="rounded-md bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Discount Rate (9%,10%,....)" type="text"/>
        <select className='bg-gray-200 p-2 font-semibold border border-gray-100 mb-4 rounded-md' name="" id="">
          <option className='text-gray-500' selected disabled>Product Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Fashion</option>
          <option>Lifestyle</option>
          <option>Entertainment</option>
          <option>Electronics</option>
          <option>Others</option>
        </select>

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-2 mb-3'>
       <input className='font-semibold bg-gray-300 rounded-md p-2' type='file'
          id='product_photo'
          accept='image/*'
        />
        <button className='bg-green-500 text-white p-2 cursor-pointer'>
          Upload image
        </button></div>

    <div className="flex">
      <div className="rounded-md border border-gray-400 p-2 px-5 font-semibold cursor-pointer text-gray-900 ml-auto">reset</div>
      <div className="rounded-md border border-indigo-500 p-2 px-5 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-500">Post</div>
    </div>
  </div>
    </div>
  )
}

export default CreatePost