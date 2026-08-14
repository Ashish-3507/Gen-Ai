import axios from 'axios';



const api  = axios.create({
    baseURL :import.meta.env.VITE_API_BASE_URL,
    withCredentials:true,
})


export async function register({username, email, password}) {
    try{
        const response = await api.post('/api/auth/register', 
            {username,email,password})
        return response.data;
    }
    catch(error)
    {
        const message = 
            error.response?.data?.message || error.message || "Registration failed";
        console.error(message);
        throw new Error(message);
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/loginUser", {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message || "Something went wrong";

        throw new Error(message);
    }
}

export async function refreshToken(){
    try{
        const response = await api.post('/api/auth/refreshToken');
        return response.data;
    }
    catch(error){
        console.error(error.response?.data||error.message);
        throw error;
    }
}
export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/me");

        return response.data;
    } catch (error) {
        console.log(error.response?.data?.message);

        throw error;
    }
};