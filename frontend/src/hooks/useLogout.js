import { useAuthContext } from "./useAuthContext"


export const useLogout = ()=>{

    const {dispatch} = useAuthContext()


    const logout=()=>{
        //Remove User From Storage
        localStorage.removeItem("user")

        //Dispatch Logout Action
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}