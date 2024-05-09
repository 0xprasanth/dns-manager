import React from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useRoutes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';


function Router() {

    //  context provider
    const { isLoggedIn } = useAuthContext();

    return useRoutes([
        {
            path: "/",
            element: <Navigate to={"/login"} />
        },
        {
            path: "/login",
            element: isLoggedIn ? (
                <Navigate to="/dashboard" replace />
            ) : (
                <LoginPage />
            )
        },
        {
            path: "/signup",
            element: isLoggedIn ? (
                <Navigate to="/dashboard" replace />
            ) : (
                <SignupPage />
            )
        },
        {
            path: "/dashboard",
            element: isLoggedIn ? <>Dashabord</> : <Navigate to={"/login"} />
        }
    ])
}

export default Router;