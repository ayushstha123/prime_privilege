import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
    const {currentUser}=useSelector((state)=>state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (postId) {
          const res = await fetch(`/api/post/getposts?postID=${postId}`);
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          const fetchedPost = data.posts.find(post => post._id === postId) || {}; // Find the post by postId
          setFormData(fetchedPost);

        }
      } catch (error) {
        setPublishError(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleReset = () => {

    setFormData({});
    setFile(null);
    setImageUrl(null);
    setImageUploadProgress(null);
    setImageUploadError(null);
    setPublishError(null);
    const inputElement = document.getElementById('product_photo');
    if (inputElement) {
      inputElement.value = '';
    }
  };

  console.log(formData);
  return (
    <div>
      <div className="font-aileron heading text-center font-bold text-3xl m-5 text-gray-800">Update Post</div>

      <div className="mb-5 mx-auto w-10/12 flex flex-col rounded-md text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="rounded-md bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          value={formData.name || ''}
          placeholder="name"
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-2 mb-3'>
          <input onChange={(e) => setFile(e.target.files[0])} className='font-semibold bg-gray-300 rounded-md p-2' type='file' id='product_photo' accept='image/jpeg,image/png' />

          <button className='bg-green-500 text-white p-2 cursor-pointer' onClick={handleUploadImage} disabled={imageUploadProgress}>
            {imageUploadProgress ? `Loading ${imageUploadProgress}%` : "Upload Image"}
          </button>

          {imageUploadError ? <p className='text-red-500'>{imageUploadError}</p> : null}

        </div>
<img  src={formData.image}alt="Uploaded Image" className='w-full h-80 object-cover pb-5' />

        <textarea className="rounded-md bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none resize-none mb-4" spellCheck="false" placeholder="Describe about the company here"
          value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
        <select value={formData.category || ""} className='bg-gray-200 p-2 font-semibold border border-gray-100 mb-4 rounded-md' name="" id="" onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
          <option className='text-gray-500' value="" selected disabled>Product Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Fashion">Fashion</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Electronics">Electronics</option>
          <option value="Others">Others</option>
        </select>

        <input
          className="rounded-md overflow-x-hidden bg-gray-100 border border-gray-300 p-2 mb-4 "
          spellCheck="false"
          value={formData.address || ''}
          placeholder="(add embedded address link here) from google maps"
          type="text"
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

<h1>Social Media Handles</h1>
  <input
    value={formData.socialMedia && formData.socialMedia[0] ? formData.socialMedia[0] : ''}
    className="rounded-md bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
    spellCheck="false"
    placeholder="Facebook"
    onChange={(e) => setFormData({ ...formData, socialMedia: [e.target.value, (formData.socialMedia && formData.socialMedia[1]) ? formData.socialMedia[1] : ''] })}
    type="text"
  />
  <input
    value={formData.socialMedia && formData.socialMedia[1] ? formData.socialMedia[1] : ''}
    className="rounded-md bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
    spellCheck="false"
    placeholder="Instagram"
    onChange={(e) => setFormData({ ...formData, socialMedia: [(formData.socialMedia && formData.socialMedia[0]) ? formData.socialMedia[0] : '', e.target.value] })}
    type="text"
  />
        
        <div className="flex">
          <div className="rounded-md border border-gray-400 p-2 px-5 font-semibold cursor-pointer text-gray-900 ml-auto" onClick={handleReset}>reset</div>
          <div className="rounded-md border border-indigo-500 p-2 px-5 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-500" onClick={handleSubmit}>Update</div>
        </div>
      </div>
    </div>
  );
};


export default UpdatePost;
  





  