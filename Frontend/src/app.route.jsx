import { createBrowserRouter, Navigate } from 'react-router';
import Login from './features/auth/pages/Login.jsx';
import RegisterUser from './features/auth/pages/RegisterUser.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <RegisterUser />
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
]);

