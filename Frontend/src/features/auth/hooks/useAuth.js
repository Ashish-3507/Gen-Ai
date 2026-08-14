import { useContext } from "react";
import { AuthContext } from '../auth.context.jsx';
import { login, register, refreshToken } from '../services/auth.Api';

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data?.data?.user || data?.user || null);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            return data;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, handleRegister, handleLogin, handleLogout };
};