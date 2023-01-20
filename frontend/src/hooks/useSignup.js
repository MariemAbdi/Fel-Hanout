import {useState} from 'react'
import {useAuthContext}from "./useAuthContext"

export const useSignup = () =>{
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (name,email,password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/auth/signup',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name,email,password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }else{
            //Save The User To Local Storage
            localStorage.setItem('user',JSON.stringify(json))
            //Update The Auth Context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }

    }

    return {signup, isLoading, error}

} 