import { useContext } from "react";
import {AuthContext} from  '../auth.context';
import {login, register, logoutUser, refreshToken} from '../services/auth.Api'


export const useAuth = () =>{
    const context = useContext(AuthContext)
    const {user, setUser, loading, setloading} = context

    const handleLogin = async({email, password}) =>{
        setloading(true)
        const data = await login({email, password})

            setUser(data.user)
            setloading(false)
    }
    const handleRegister =  async ({username,email,password})=>{
        setloading(true)
        const data = await register({username, email, password})
        setUser(data.user)
        setloading(false)

    }

    const handleLogout = async ()=>{
        setloading(true)
        const data = await logoutUser()
            setUser(null)
            setloading(false)
    }

    return {user,loading,handleRegister, handleLogin,handleLogout}
}