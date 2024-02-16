import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    console.log('Auth:', auth)
    console.log('Auth roles:', auth?.roles)
    console.log('Allowed roles:', allowedRoles)
    const location = useLocation()

    return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
