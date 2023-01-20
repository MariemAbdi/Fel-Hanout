import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext Must Be Used Inside A useAuthContextProvider')
    }
    
    return context
}