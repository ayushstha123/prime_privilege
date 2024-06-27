import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashUsers = () => {
    const { currentUser, loading } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await res.json();
                const filteredUsers = data.users.filter(user => user.role === 'student' || user.role === 'idleStudent');
                setUsers(filteredUsers);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch users');
                setError(error.message);
            }
        };
        const fetchAllUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await res.json();
                const filteredUsers = data.users.filter(user => user.role === 'student' || user.role === 'idleStudent' || user.role === 'admin');
                setUsers(filteredUsers);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch users');
                setError(error.message);
            }
        };
        if (currentUser?.role === 'superAdmin') {
            fetchAllUsers();
        }
        if (currentUser?.role === 'admin') {
            fetchUsers();
        }
    }, [currentUser]);

    const handleDeleteUser = async (userId) => {
        try {
            const res = await fetch(`/api/user/delete/${userId}`, {
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
            const res = await fetch(`/api/user/update-role/${userId}`, {
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
            <h1 className='text-5xl font-bold my-5 mt-20 '>All Student</h1>
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
                                    <th className='p-3 border border-black'>Level</th>
                                    <th className='p-3 border border-black'>Address</th>
                                    <th className='p-3 border border-black'>ID-card</th>
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
                                        <td className='p-3 border border-black'>{user.username}</td>
                                        <td className='p-3 border overflow-auto border-black'>{user.email}</td>
                                        <td className='p-3 border border-black'>{user.level}</td>
                                        <td className='p-3 border border-black'>{user.address}</td>
                                        {user.document ?
                                            <td className='p-3 border border-black'>
                                                <img src={user.document} alt={user.username} className='w-24 h-24 object-cover rounded mx-auto bg-gray-500' />
                                            </td>
                                            :
                                            <td className='p-3 border bg-red-800 text-white border-white'>
                                                <div>not uploaded yet</div>
                                            </td>

                                        }

                                        <td className='p-3 border border-black'>

                                            {currentUser.role === 'admin' || currentUser.role === 'superAdmin' ?
                                                <>
                                                    <select className='bg-gray-200 p-5 rounded-lg text-black' onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                                                    {user.role === 'admin' ? <option value="admin" className='bg-green-600 text-white' selected disabled>Admin</option> : <option value="admin">Admin</option>}
                                                        {user.role === 'idleStudent' ? <option value="idleStudent" className='bg-green-600 text-white' selected disabled>Idle Student</option> : <option value="idleStudent">Idle Student</option>}
                                                        {user.role === 'student' ? <option value="student" className='bg-green-600 text-white' selected disabled>Student</option> : <option value="student">Student</option>}
                                                    </select>

                                                </>
                                                :
                                                <>
                                                    <select disabled className='bg-gray-200 p-5 rounded-lg text-black' >
                                                    <option value="student" selected disabled>{user.role}</option>
                                                    <option value="idleStudent" selected disabled>{user.role}</option>
                                                    </select>                                               
                                                     </>}

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

export default DashUsers;
