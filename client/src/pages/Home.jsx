import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getApprovedPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const images = [
    './src/assests/images/img1.jpg',
    './src/assests/images/img2.jpg',
    './src/assests/images/img3.jpg',
    './src/assests/images/img4.jpg',
  ];

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const viewPost = (postId) => {
    fetch(`${import.meta.env.VITE_API_URL}/post/views/${postId}?userId=${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: postId,
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to view post');
        }
        return res.json();
      })
      .then(result => {
        console.log(result);
        const updatedPost = result;
        setPost(updatedPost); // Assuming you have a state variable to store the post data
      })
      .catch(error => {
        console.error('Error liking post:', error);
      });
  };

  return (
    <div>
      <div className="font-aileron relative w-full h-60 sm:h-screen">
        <div className="carousel-container aspect-w-16 aspect-h-9 object-scale-down overflow-hidden w-full h-60 sm:h-full">

          <div
            className="carousel-content flex transition-transform duration-300 ease-in-out transform"
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${(activeIndex / images.length) * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="carousel-item w-full h-96">
                <img loading='lazy' src={image} alt={`carousel-item-${index}`} className=" w-full" />
              </div>
            ))}
          </div>

        </div>
        <div className="overlay">
          <h1 className='text-7xl pt-24 text-white font-black text-center p-10 bg-transparent '>
            Nepal's Premier Student Discounts Hub!
          </h1>
          <p className='text-center pb-8 p-2 text-white bg-transparent font-medium'>Study More, Spend Less - Empowering Nepali Students with Unmatched Deals!</p>
        </div>
        <div className="absolute p-0 sm:p-5 top-1/2 left-0 transform -translate-y-1/2 w-full">
          <button className="carousel-arrow hover:bg-white hover:rounded-full p-2 transition-all animate-bounce carousel-prev float-left " onClick={handlePrev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8L8 12 12 16" />
            </svg>
          </button>
          <button className="carousel-arrow hover:bg-white hover:rounded-full p-2 transition-all animate-bounce carousel-next  float-right" onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8L16 12 12 16" />
            </svg>
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-center">
        {posts.map((post, index) => (
          <div onClick={() => viewPost(post._id)} key={index} className="p-5 mx-5 md:mx-2">
            <Link to={currentUser ? `/post/${post.slug}` : '/sign-in'} onClick={currentUser ? "" : () => toast.error("Please sign in first")} className="w-full bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-lg flex flex-col md:flex-column items-center">
              <div className="pt-5">
                <img
                  loading='lazy'
                  className="object-cover w-20 h-20 md:w-24 md:h-24 rounded-full md:rounded-xl shadow-lg"
                  src={post.image}
                  alt={post.name}
                />
              </div>
              <div className="flex font-aileron flex-col flex-grow pb-5 px-5 md:p-5">
                <h2 className="mb-1 text-center font-bold text-black">
                  {post.name}
                </h2>
                
                <div className='flex gap-1'>
                <div className='bg-gray-200 items-center gap-2 p-2 flex flex-auto rounded-md justify-center text-xs'>
                  <svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.70" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.2699 16.265L20.9754 12.1852C21.1516 11.1662 20.368 10.2342 19.335 10.2342H14.1539C13.6404 10.2342 13.2494 9.77328 13.3325 9.26598L13.9952 5.22142C14.1028 4.56435 14.0721 3.892 13.9049 3.24752C13.7664 2.71364 13.3545 2.28495 12.8128 2.11093L12.6678 2.06435C12.3404 1.95918 11.9831 1.98365 11.6744 2.13239C11.3347 2.29611 11.0861 2.59473 10.994 2.94989L10.5183 4.78374C10.3669 5.36723 10.1465 5.93045 9.86218 6.46262C9.44683 7.24017 8.80465 7.86246 8.13711 8.43769L6.69838 9.67749C6.29272 10.0271 6.07968 10.5506 6.12584 11.0844L6.93801 20.4771C7.0125 21.3386 7.7328 22 8.59658 22H13.2452C16.7265 22 19.6975 19.5744 20.2699 16.265Z" ></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.96767 9.48508C3.36893 9.46777 3.71261 9.76963 3.74721 10.1698L4.71881 21.4063C4.78122 22.1281 4.21268 22.7502 3.48671 22.7502C2.80289 22.7502 2.25 22.1954 2.25 21.5129V10.2344C2.25 9.83275 2.5664 9.5024 2.96767 9.48508Z" ></path> </g> </svg>
                  <p>{post.likes.length}</p>

                </div>
                <div className='bg-gray-200 items-center gap-2 p-2 flex flex-auto justify-center rounded-md text-xs'>
                  <svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  <p>{post.views.length}</p></div></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}