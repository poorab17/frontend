import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, role, element, ...rest }) {
    console.log("from route", isAuthenticated, element);
    if (isAuthenticated && (role)) {
        return <Route {...rest} element={element} />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;

