import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashBusiness = () => {
    const { currentUser, loading } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch(`/api/business/getusers`);
            if (!res.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            const filteredUsers = data.users.filter(user => user.role === 'idleBusiness' || user.role === 'business');
            setUsers(filteredUsers);
          } catch (error) {
            console.error(error);
            toast.error('Failed to fetch users');
            setError(error.message);
          }
        };
    
        if (currentUser?.role === 'admin' || currentUser?.role === 'superAdmin') {
          fetchUsers();
        }
      }, [currentUser]);

    const handleDeleteUser = async (userId) => {
        try {
            const res = await fetch(`/api/business/delete/${userId}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userId));
                toast.success("User deleted Successfully")
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await fetch(`/api/business/update-role/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newRole }),
            });
            if (res.ok) {
                // Update the user's role in the state
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userId ? { ...user, role: newRole } : user
                    )
                );
                toast.success("User Role updated Successfully!")
            } else {
                console.error('Failed to update user role');
                toast.error("Cannot update role")

            }
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error(error.message)

        }
    };

    return (
        <div className='font-aileron md:w-full table-auto m-2 md:px-5 px-2 overflow-x-scroll md:mx-auto'>
            <h1 className='text-5xl font-bold my-5 mt-20 '>All Business</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {users.length > 0 ? (
                        <table className='border  border-collapse border-gray-500 shadow-sm w-full'>
                            <thead className=' text-white' style={{ backgroundColor: '#263670' }}>
                                <tr className=' border border-black'>
                                    <th className='p-3 border border-black'>id</th>
                                    <th className='p-3 border border-black'>Date Created</th>
                                    <th className='p-3 border border-black'>Picture</th>
                                    <th className='p-3 border border-black'>Name</th>
                                    <th className='p-3 border border-black'>Email</th>
                                    <th className='p-3 border border-black'>Category</th>
                                    <th className='p-3 border border-black'>Description</th>
                                    <th className='p-3 border border-black'>Document</th>
                                    <th className='p-3 border border-black'>Role</th>
                                    <th className='p-3 border border-black'>permission</th>
                                    <th className='p-3 border border-black'>Delete</th>
                                </tr>
                            </thead>
                            <tbody className='font-light '>
                                {users.map((user, index) => (
                                    <tr key={user._id} id={index + 1} className='border-b text-center border-gray-200'>
                                        <td className='p-3 border border-black'>{index + 1}</td>
                                        <td className='p-3 border border-black'>{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className='p-3 border border-black'>

                                            <img src={user.profilePicture} alt={user.username} className='w-20 h-20 object-cover rounded-full mx-auto bg-gray-500' />
                                        </td>
                                        <td className='p-3 border border-black'>{user.name}</td>
                                        <td className='p-3 border overflow-auto border-black'>{user.email}</td>
                                        <td className='p-3 border border-black'>{user.category}</td>
                                        <td className='p-3 border border-black'>{user.description}</td>
                                        {user.document ?
                                            <td className='p-3 border border-black'>
                                                <img src={user.document} alt={user.username} className='w-24 h-24 object-cover rounded mx-auto bg-gray-500' />
                                            </td>
                                            :
                                            <td className='p-3 border bg-red-800 text-white border-white'>
                                                <div>not uploaded yet</div>
                                            </td>

                                        }
                                        <td className='p-3 border border-black'>{
                                            user.role === 'admin' ?
                                                <svg className='mx-auto fill-green-600' xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" enableBackground="new 0 0 64 64" viewBox="0 0 64 64">
                                                    <path d="m32 2c-16.569 0-30 13.432-30 30s13.432 30 30 30 30-13.432 30-30-13.432-30-30-30zm-6.975 48-.02-.02-.017.02-13.988-14.4 7.029-7.164 6.977 7.184 21-21.619 6.994 7.198z" /></svg>
                                            
                                                :
                                                    <svg className='mx-auto fill-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px" height="30px"><path d="m256 8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm121.6 313.1c4.7 4.7 4.7 12.3 0 17l-39.6 39.5c-4.7 4.7-12.3 4.7-17 0l-65-65.6-65.1 65.6c-4.7 4.7-12.3 4.7-17 0l-39.5-39.6c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17l-65.7 65z" /></svg>
                                        }
                                        </td>
                                        <td className='p-3 border border-black'>

                                            
                                                    <select
                                                        className={user.role === 'admin' ? 'bg-black text-white p-5 rounded-lg' : 'bg-gray-200 p-5 rounded-lg text-black'}
                                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                        >

                                                        {user.role === 'idleBusiness' ? <option value="idleBusiness" className='bg-green-600 text-white' selected disabled>Idle Business</option> : <option value="idleBusiness">Idle business</option>}
                                                        {user.role === 'business' ? <option value="business" className='bg-green-600 text-white' selected disabled>Business</option> : <option value="business">Business</option>}
                                                    </select>

                                        </td>
                                        <td className='p-3 border border-black'>
                                            <button className='font-medium hover:underline text-red-500 cursor-pointer' onClick={() => setUserIdToDelete(user._id)}>Delete</button>
                                            {userIdToDelete === user._id && (
                                                <div className="modal">
                                                    <div className="modal-content">
                                                        <p>Are you sure?</p>
                                                        <button className='bg-red-600 text-white m-2 px-2 rounded-md py-1' onClick={() => handleDeleteUser(user._id)}>Yes</button>
                                                        <button className='bg-blue-600 text-white m-2 px-2 rounded-md py-1' onClick={() => setUserIdToDelete('')}>No</button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h1>No Users</h1>
                    )}
                </>
            )
            }
        </div >
    );
};

export default DashBusiness;
