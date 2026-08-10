import { createBrowserRouter, Navigate } from 'react-router';
import Login from './features/auth/pages/Login.jsx';
import RegisterUser from './features/auth/pages/RegisterUser.jsx';
import Protected from './features/auth/components/protected.jsx';
import Home from "./features/Report/pages/Home.jsx";
import Interview from "./features/Report/pages/report.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '*',
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
        path: '/Home',
        element: <Protected><Home/></Protected>
    },
    {
        path: '/report/:interviewId',
        element: <Protected><Interview/></Protected>
    }
]);

