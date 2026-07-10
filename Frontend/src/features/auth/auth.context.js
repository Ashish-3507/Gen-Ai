import { createContext,useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({childeren}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return(
        <AuthContext.Provider value ={{user,setUser,loading,setLoading}}>
            {childeren}
        </AuthContext.Provider>
    )
}