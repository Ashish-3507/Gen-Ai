import axios from 'axios';



const api  = axios.create({
    baseURL :"http://localhost:3000",
    withCredentials:true,
})


export async function register({username, email, password}) {
    try{
        const response = await api.post('/api/auth/register', {
            username,email,password
        })
        return response.data;
    }
    catch(error)
    {
        console.error(error.response?.data||error.message);
        throw error;
    }
}

export async function login({email,password}){
    try{
        const response = await api.post('/api/auth/loginUser',
        {
            email,password
        });
        return response.data;
    }
    catch(error){
        console.error(error.response?.data||error.message);
        throw error;
    }
}

export async function logoutUser(){

    try{
        const response = await api.post('/api/auth/logoutUser');
        return response.data;
    }
    catch(error){
        console.error(error.response?.data||error.message);
        throw error;
    }
}

export async function refreshToken(){
    try{
        const response = await api.get('/api/auth/refreshToken');
        return response.data;
    }
    catch(error){
        console.error(error.response?.data||error.message);
        throw error;
    }
}