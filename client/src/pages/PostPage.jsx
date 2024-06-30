import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const PostPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const [products, setProducts] = useState([]); // State to hold products
    const { postSlug } = useParams();
    const { currentUser } = useSelector((state) => state.user);

    const fetchPostDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/post/getposts?postID=${postSlug}`);
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            const fetchedPost = data.posts.find(post => post.slug === postSlug) || {};
            setPost(fetchedPost);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch posts: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsForPost = async (postId) => {
        try {
            const response = await fetch(`/api/business/get-product/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchPostDetails();
    }, [postSlug, currentUser]);

    useEffect(() => {
        if (post && post._id) {
            fetchProductsForPost(post._id);
        }
    }, [post]);

    const likePost = (postId) => {
        fetch(`/api/post/likes/${postId}?userId=${currentUser._id}`, {
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
                    throw new Error('Failed to like post');
                }
                return res.json();
            })
            .then(result => {
                console.log(result);
                setPost(result); // Update post data after liking
            })
            .catch(error => {
                console.error('Error liking post:', error);
            });
    };
    return (
        <div>
            {post ? (
                <div className='font-aileron p-5 flex justify-center bg-gray-100 font-light '>
                    <div className=' w-3/12 h-3/12 m-8 mt-10 '>
                        <img src={post.image} className='w-full object-cover shadow-lg shadow-gray-400 rounded-lg' alt={post.name} />
                        <p className=' p-5 '>Posted on: {new Date(post.updatedAt).toLocaleDateString()}</p>

                        <div className='bg-gray-200 items-center gap-3 p-2 flex flex-auto rounded-md justify-center text-xs'>
                            <svg
                                width="30px"
                                onClick={() => likePost(post._id)}
                                className={
                                    currentUser && post.likes.includes(currentUser._id)
                                        ? 'fill-blue-700 animate-bounce active:animate-bounce transition-transform cursor-pointer stroke-0'
                                        : 'fill-none active:animate-bounce cursor-pointer '
                                }
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#000000"
                                strokeWidth="1.70"
                                transform="rotate(0)"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M20.2699 16.265L20.9754 12.1852C21.1516 11.1662 20.368 10.2342 19.335 10.2342H14.1539C13.6404 10.2342 13.2494 9.77328 13.3325 9.26598L13.9952 5.22142C14.1028 4.56435 14.0721 3.892 13.9049 3.24752C13.7664 2.71364 13.3545 2.28495 12.8128 2.11093L12.6678 2.06435C12.3404 1.95918 11.9831 1.98365 11.6744 2.13239C11.3347 2.29611 11.0861 2.59473 10.994 2.94989L10.5183 4.78374C10.3669 5.36723 10.1465 5.93045 9.86218 6.46262C9.44683 7.24017 8.80465 7.86246 8.13711 8.43769L6.69838 9.67749C6.29272 10.0271 6.07968 10.5506 6.12584 11.0844L6.93801 20.4771C7.0125 21.3386 7.7328 22 8.59658 22H13.2452C16.7265 22 19.6975 19.5744 20.2699 16.265Z"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.96767 9.48508C3.36893 9.46777 3.71261 9.76963 3.74721 10.1698L4.71881 21.4063C4.78122 22.1281 4.21268 22.7502 3.48671 22.7502C2.80289 22.7502 2.25 22.1954 2.25 21.5129V10.2344C2.25 9.83275 2.5664 9.5024 2.96767 9.48508Z"
                                    ></path>
                                </g>
                            </svg>
                            <p>Likes: {post.likes.length}</p>

                        </div>
                        <div className='bg-gray-200 items-center gap-3 p-2 flex flex-auto justify-center my-2 rounded-md text-xs'>
                            <svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <p> views: {post.views.length}</p></div>
                    </div>
                    <div className='w-full m-5 rounded-lg'>
                        <div>
                            <h1 className='text-6xl px-5 mt-5 font-bold  text-black '>{post.name}</h1>
                            <p className=' p-5 text-xl'>{post.description}</p>


                           
                            <p className=' p-5'><b>category </b>: {post.category}</p>
                            <div className='items-center flex gap-5 '>

                                <h1 className='p-5 font-bold mr-5'>Social media :</h1>
                                <a href={post.socialMedia[0] ? post.socialMedia[0] : '#'} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 30 30">
                                        <path fill='#263675' d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                                </a>
                                <a href={post.socialMedia[1] ? post.socialMedia[1] : '#'} target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 30 24">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#000000"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#000000"></path>
                                    </svg>
                                </a></div>
                            <div className='inline-flex w-50 p-5 shadow-lg hover:shadow-none' dangerouslySetInnerHTML={{ __html: post.address }} />

                        </div>
                        <div className='mt-10'>
                            <h1 className='text-3xl'>Discount Details</h1>

                        <table className="min-w-full divide-y mt-10 divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discounted Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {products && products.map((product, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">Rs.{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.discount}%</td>
                        <td className='px-6 py-4 whitespace-nowrap'>Rs. {(product.price * (1 - product.discount / 100)).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {loading ?
                        (<>
                            <svg className="animate-spin" width="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#000000" stroke-width="3.55556" stroke-linecap="round"></path> </g></svg>

                        </>)
                        : "nopost"}
                </div>
            )}
        </div>
    );
};

export default PostPage;
