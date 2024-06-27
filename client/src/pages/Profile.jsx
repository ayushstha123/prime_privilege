import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
  const profilePictureRef = useRef(null);
  const documentRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [document, setDocument] = useState(undefined);
  const [documentPercent, setDocumentPercent] = useState(0);
  const [documentError, setDocumentError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // New state for image URL
  const [publishError, setPublishError] = useState(null); // State for publish error
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (image) {
      handleImgUpload(image);
    }
  }, [image]);

  useEffect(() => {
    if (document) {
      handleFileUpload(document, 'document');
    }
  }, [document]);
const handleValidation=()=>{
  const regex = /^9[0-9]{6,11}$/; // Phone number must start with 9 and be between 7 to 12 digits long
  if(formData.username==='' || formData.address==='' || formData.email===''){
    toast.error("Please fill the required fields!")
    return false
  }
  if(formData.phoneNum){
    if(!regex.test(formData.phoneNum)){
  toast.error("The phone number should start from 9*********");
  return false;
 }
  }
  if(formData.name===''){
    toast.error("name is required!")
    return false
  }

 return true
}
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...currentUser,
        ...formData,
        imageUrl: formData.profilePicture || currentUser.profilePicture
      };

      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(postData)
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || "An error occurred");
        toast.error("Something went wrong!")
      } else {
        toast.success('Post published!');
        setPublishError(null);
        setFormData({});
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Error while publishing: " + error.message);
    }
  };

  const handleFileUpload = async (file, fieldName) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (fieldName === 'document') {
          setDocumentPercent(Math.round(progress));
        }
      },
      (error) => {
        console.error('Upload error:', error);
        if (fieldName === 'document') {
          setDocumentError(true);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevData) => ({ ...prevData, [fieldName]: downloadURL }))
        );
      }
    );
  };

  const handleImgUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = currentUser._id + image.name;
    const storageRef = ref(storage, "userProfile/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFormData((prevData) => ({ ...prevData, profilePicture: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    const fieldName = e.target.id;

    if (fieldName === 'document') {
      setDocument(e.target.files[0]);
    } else {
      setFormData((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
    }
  };

  const rolecheck = ['idleBusiness', 'business'].includes(currentUser.role) ? 'business' :
     'user';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!handleValidation()){
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/${rolecheck}/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

      if (currentUser.role === 'business') {
        const updatedPost = {
          ...formData,
          image: currentUser.profilePicture
        };
        const res2 = await fetch(`/api/post/updatepost/${currentUser._id}/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        });
        const data2 = await res2.json();
        if (!res2.ok) {
          setPublishError(data2.message || "An error occurred");
        } else {
          setPublishError(null);
          setFormData({});
          navigate(`/post/${data2.slug}`);
        }
      }
      
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser.role === 'idleStudent' || currentUser.role === 'idleBusiness' ?
        <div className='bg-yellow-400 fixed w-full font-bold text-sm p-2 font-aileron text-center'>
          <p>Please update your profile with required document and wait to get approved by the admin</p>
        </div>
        : ""
      }

      <div className='font-aileron my-12 p-3 max-w-lg mx-auto'>
        <h1 className='text-5xl font-bold text-center my-10'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='file'
            ref={profilePictureRef}
            hidden
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt='profile'
            className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
            onClick={() => profilePictureRef.current.click()}
          />
          <p className='text-sm self-center'>
            {imageError ? (
              <span className='text-red-700'>
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (
              ''
            )}
          </p>

          {(currentUser.role === 'student' || currentUser.role === 'idleStudent') ?
            <>
              <input
                defaultValue={currentUser.username}
                type='text'
                id='username'
                placeholder='Username'
                className='bg-slate-100 rounded-lg p-3'
                onChange={handleChange}
              />
              <select
                value={formData.level || currentUser.level}
                className='bg-slate-100 p-3 rounded-lg'
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option disabled>Update your level</option>
                <option value='+2'>+2</option>
                <option value='bachelor'>Bachelor</option>
                <option value='masters'>Masters</option>
              </select>
            </>
            : <></>}
          <input
            defaultValue={currentUser.name}
            type='text'
            id='name'
            placeholder='Full Name'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          {currentUser.role === 'idleBusiness' || currentUser.role === 'business' ?
            <>
              <input
                defaultValue={currentUser.description}
                type='text'
                id='description'
                placeholder='Business description'
                className='bg-slate-100 rounded-lg p-3'
                onChange={handleChange}
              />
              <select value={formData.category || currentUser.category}
                className='bg-gray-200 p-2 font-semibold border border-gray-100 mb-4 rounded-md' onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option className='text-gray-500' selected disabled>Product Category</option>
                <option value="Food">Food</option>
                <option value="Education">Education</option>
                <option value="Products">Products</option>
                <option value="Travel">Travel</option>
                <option value="Fashion">Fashion</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Electronics">Electronics</option>
                <option value="Others">Others</option>
              </select>
              
              <div>
                <h1>Social Media Handles</h1>
                <input
                  value={formData.socialMedia && formData.socialMedia[0] ? formData.socialMedia[0] : currentUser.socialMedia[0]}
                  className="rounded-md bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                  spellCheck="false"
                  placeholder="Facebook"
                  onChange={(e) => setFormData({ ...formData, socialMedia: [e.target.value, (formData.socialMedia && formData.socialMedia[1]) ? formData.socialMedia[1] : ''] })}
                  type="text"
                />
                <input
                  value={formData.socialMedia && formData.socialMedia[1] ? formData.socialMedia[1] : currentUser.socialMedia[1]}
                  className="rounded-md bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                  spellCheck="false"
                  placeholder="Instagram"
                  onChange={(e) => setFormData({ ...formData, socialMedia: [(formData.socialMedia && formData.socialMedia[0]) ? formData.socialMedia[0] : '', e.target.value] })}
                  type="text"
                />
              </div>
            </> : <></>
          }
          <input
            defaultValue={currentUser.email}
            type='email'
            id='email'
            placeholder='Email'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.address}
            placeholder='Address'
            id='address'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='file'
            id='document'
            hidden
            ref={documentRef}
            accept='image/*'
            onChange={(e) => setDocument(e.target.files[0])}
          />
          <label htmlFor='document' className='bg-green-500 p-2 cursor-pointer'>
            {(currentUser.role === "idleStudent" || currentUser.role === "student" || currentUser.role === "admin") ? "College ID" : "Business Documents"}
          </label>
          <p className='text-sm self-center'>
            {documentError ? (
              <span className='text-red-700'>Error uploading college ID</span>
            ) : documentPercent > 0 && documentPercent < 100 ? (
              <span className='text-slate-700'>{`Uploading College ID: ${documentPercent} %`}</span>
            ) : documentPercent === 100 ? (
              <span className='text-green-700'>College ID uploaded successfully</span>
            ) : (
              ''
            )}
            {currentUser.document ?
              <img src={currentUser.document} alt="Uploaded Image" className='w-full h-80 object-cover pb-5' />
              : ""
            }
          </p>
          <input
            placeholder='Phone Number'
            id='phoneNum'
            type='number'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='bg-slate-100 rounded-lg p-3'
            onChange={handleChange}
          />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Update'}
          </button>
          {currentUser.role === 'business' ?
            <div className="rounded-md border border-indigo-500 p-2 px-5 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-500" onClick={handlePostSubmit}>Confirm to post your business</div>
            : ''
          }
        </form>
        <div className='flex justify-between mt-5'>
          <span
            onClick={handleDeleteAccount}
            className='text-red-700 cursor-pointer'
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
            Sign out
          </span>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
        <p className='text-green-700 mt-5'>
          {updateSuccess && 'User is updated successfully!'}
        </p>
      </div>
    </>
  );
}
