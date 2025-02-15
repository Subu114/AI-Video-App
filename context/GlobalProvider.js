import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext) 

const GlobalProvider = ({children}) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
        .then((currentUser) => {
            if(currentUser) {
                setUser(currentUser)
                setIsLoggedIn(true)
            }
            else {
                setIsLoggedIn(false)
                setUser(null)
            }
        })
        .catch((error) => {
            console.log("Error : ", error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])
    return (
        <GlobalContext.Provider 
        value={{isLoading, isLoggedIn, setIsLoggedIn, user, setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider