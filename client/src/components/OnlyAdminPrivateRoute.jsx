import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function OnlyAdminPrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
    const isAdmin = currentUser && currentUser.role === 'admin' ;
    const isSuperAdmin=currentUser && currentUser.role === 'superAdmin';
    return (
        <div>
            {isAdmin || isSuperAdmin ? <Outlet /> : <Navigate to='/sign-in' />}
        </div>
    );
}