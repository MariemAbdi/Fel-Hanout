import {React, useState} from 'react'
import NavBar from './NavBar'
import { useLogin } from '../../hooks/useLogin'
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const{login, error, isLoading} = useLogin()

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await login(email,password).then((res)=>{
            if(email==="admin@gmail.com"){
                toast.success('Welcome back Admin!')
                navigate('/dashboard')
            }else{
                toast.success('Welcome Back!')
                navigate('/')
            }
        })
    }


    return(
        <>
        <NavBar/>
        <h1 className='has-text-centered mt-5 has-text-weight-bold is-size-1 mb-5 has-text-info'>Login</h1>
        <div className='container'>
        <div className="columns is-centered">
        <div className="column is-half">
        <form className='login mt-5' onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input type="email" className='input' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' required></input>
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input type="password" className='input' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' required></input>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button disabled={isLoading} type="submit" className="button is-success is-pulled-right is-rounded has-text-weight-medium">Login</button>
                </div>
            </div>
            {error && <div className='error'>{error}</div>}
        </form>
        </div>
        </div>
        </div>
        </>
    )
}

export default Login