import React, { useState } from "react";
import '../style/register.scss';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    const { loading, handleRegister } = useAuth();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await handleRegister(form);
            alert('Registered successfully');
            navigate("/Home", { replace: true });
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Registration failed');
        }
    };

    if (loading) {
        return <main><h1>Loading.....</h1></main>;
    }

    return(
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <p className="form-subtitle">AI Resume Analyzer</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your UserName"
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            id="password"
                        />

                        <button type="submit">Register</button>
                        {error ? <p style={{ color: 'red', marginTop: '0.75rem' }}>{error}</p> : null}
                        {success ? <p style={{ color: 'green', marginTop: '0.75rem' }}>{success}</p> : null}

                        <p className="login-link">Already registered? <Link to="/login">Login</Link></p>

                    </div>
                </form>

            </div>
        </main>
    )
}

export default RegisterUser;