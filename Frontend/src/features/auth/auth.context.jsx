import { createContext,useEffect,useState } from "react";
import { refreshToken,getMe } from "./services/auth.Api";



export const AuthContext = createContext();


export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const getAndSetUser = async () => {
        try {

            // Refresh the access token
            await refreshToken();

            // Fetch the logged-in user's details
            const data = await getMe();

            console.log("Current User:", data);

            setUser(data.data.user);

        } catch (error) {

            console.log("Authentication failed:", error);

            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    getAndSetUser();

}, []);

    return(
        <AuthContext.Provider value ={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}