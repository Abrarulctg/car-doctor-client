import React, { useContext } from 'react';
import { AuthContex } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContex);
    const location = useLocation();

    console.log(location.pathname)
    if (loading) {
        return <div className='flex justify-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if (user?.email) {
        return children;
    }

    return (
        <Navigate to="/login" replace></Navigate>
    );
};

export default PrivateRoute;
