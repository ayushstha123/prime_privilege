import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashPost = () => {
    const { currentUser } = useSelector(state => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [post, setPost] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/post/getposts?userId=${currentUser._id}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await res.json();
                setUserPosts(data.posts);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };


        const fetchAllPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/post/getposts`);

                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await res.json();
                setUserPosts(data.posts);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.role === 'business') {
            fetchPosts();
        }
        if (currentUser?.role === 'admin' || currentUser?.role==='superAdmin') {
            fetchAllPosts();
        }
    }, [currentUser]);

    const handleDeletePost = async (postId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/post/deletepost/${postId}/${currentUser._id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete post');
            }
            // Update userPosts state to remove the deleted post
            setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    const handleStatusChange = async (postId, newStatus) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/post/update-status/${postId}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newStatus }),
            });
            if (res.ok) {
            // Update the userPosts state to reflect the changed status
            setUserPosts((prevPosts) =>
                prevPosts.map((post) =>
                        post._id === postId ? { ...post, status: newStatus } : post
                    )
                );
                toast.success("Post Status updated Successfully!")
                console.log(post.status)
            } else {
                console.error('Failed to update post status');
                toast.error("Cannot update status")
            }
        } catch (error) {
            console.error('Error updating post status:', error);
            toast.error(error.message)
        }
    };
    


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;



    return (
        <div className='font-aileron md:w-full table-auto m-2 md:px-5 px-2 overflow-x-scroll md:mx-auto'>
            <h1 className='text-3xl font-bold my-5 mt-10'>All Posts</h1>
            {userPosts.length > 0 ? (
                <table className='border border-collapse border-gray-500 shadow-sm w-full'>
                    <thead className='text-white' style={{ backgroundColor: '#263670' }}>
                        <tr className='border border-black'>
                            <th className='p-3 border border-black'>id</th>
                            <th className='p-3 border border-black'>Date updated</th>
                            <th className='p-3 border border-black'>Post image</th>
                            <th className='p-3 border border-black'>Post title</th>
                            <th className='p-3 border border-black'>Description</th>
                            <th className='p-3 border border-black'>Category</th>
                            <th className='p-3 border border-black'>Status</th>
                            <th className='p-3 border border-black'>Delete</th>
                            <th className='p-3 border border-black'>Edit</th>
                        </tr>
                    </thead>
                    <tbody className='font-light'>
                        {userPosts.map((post, index) => (
                            <tr key={post._id} id={index + 1} className='border-b text-center border-gray-200'>
                                <td className='p-3 border border-black'>{index + 1}</td>
                                <td className='p-3 border border-black'>{new Date(post.updatedAt).toLocaleDateString()}</td>
                                <td className='p-3 border border-black'>
                                    <Link to={`/post/${post.slug}`}>
                                        <img src={post.image} alt={post.name} className='w-20 h-20 object-cover rounded mx-auto bg-gray-500' />
                                    </Link>
                                </td>
                                <td className='p-3 border border-black'>{post.name}</td>
                                <td className='p-3 border overflow-hidden border-black'>{post.description}</td>
                                <td className='p-3 border border-black'>{post.category}</td>
                                <td className='p-3 border border-black'>

                                    <select
                                        value={post.status}
                                        className='bg-gray-200 p-2 rounded-lg text-black'
                                        onChange={(e) => handleStatusChange(post._id, e.target.value)}
                                        disabled={currentUser.role==='business'}
                                    >
                                    <option value="pending" >pending</option>
                                        <option value="posted">posted</option>
                              
                                        
                                    </select>
                                    </td>

                                <td className='p-3 border border-black'>
                                    <span className='font-medium hover:underline text-red-500 cursor-pointer' onClick={() => handleDeletePost(post._id)}>Delete</span>
                                </td>
                                <td className='p-3 text-center border border-black'>
                                    <Link to={`/update-post/${post._id}`} className='text-blue-500'>Edit</Link>
                                    {console.log(post._id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1>No posts</h1>
            )}
        </div>
    );
};

export default DashPost;
