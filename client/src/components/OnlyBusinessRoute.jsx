import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function OnlyBusinessRoute() {
    const {currentUser} = useSelector((state) => state.user)

    const isBusiness=currentUser && currentUser.role === 'business';
    const isSuperAdmin=currentUser && currentUser.role === 'superAdmin';
    const isAdmin=currentUser && currentUser.role === 'admin';

    return (
        <div>
            {isBusiness ||isAdmin || isSuperAdmin ? <Outlet /> : <Navigate to='/sign-in' />}
        </div>
    );
}