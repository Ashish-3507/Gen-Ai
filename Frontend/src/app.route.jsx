import {createBrowserRouter} from 'react-router';
import Login from './features/auth/pages/Login.jsx';
import RegisterUser from './features/auth/pages/RegisterUser.jsx';





export const router = createBrowserRouter([
    
    {
        path: "/login",
        element:<Login/>
    },
    {
        path:"/Register",
        element:<RegisterUser/>
    },
])

