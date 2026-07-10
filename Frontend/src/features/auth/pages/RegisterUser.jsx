import React from "react";
import '../style/register.scss'
import {Link} from 'react-router'

const RegisterUser = ()=>{

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    
    return(
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <p className="form-subtitle">AI Resume Analyzer</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your UserName" ></input>

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your Email" ></input>

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter your Password" id="password"></input>

                        <button>Register</button>

                        <p className="login-link">Already registered? <Link to="/login">Login</Link></p>

                    </div>
                </form>

            </div>
        </main>
    )
}

export default RegisterUser;