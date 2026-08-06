import React, { useState } from "react";
import '../style/Login.scss';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await handleLogin({ email, password });
            navigate("/Home", { replace: true });
            } 
        catch (err) {
            setError(
            err?.response?.data?.message ||
            err?.message ||
            "Login failed"
        );
    }
};

    if (loading) {
        return <main><h1>Loading.....</h1></main>;
    }
    return(
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <p className="form-subtitle">AI Resume Analyzer</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); }}
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            id="password"
                        />

                        <button type="submit">Login</button>
                        {error ? <p style={{ color: 'red', marginTop: '0.75rem' }}>{error}</p> : null}

                        <p className="login-link">Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>

            </div>
        </main>
    )
}

export default Login;