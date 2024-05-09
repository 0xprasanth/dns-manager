import { createContext, useState } from "react";
import Cookies from "js-cookie";

// export const AuthContextType = {
//     isLoggedIn: false,
//     handleLoggedIn: (isLoggedIn)
// }

export const AuthContext = createContext({})


export const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        (Cookies.get("token") !== undefined) ? true : false
    );

    const handleLoggedIn = (isLoggedIn) => {
        setIsLoggedIn(isLoggedIn);
    }
    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn,
                handleLoggedIn
            }}    
        >
            {children}
        </AuthContext.Provider>
    )
}