import {React, useState} from 'react'
import "./Auth.css"
import NavBar from './NavBar'
import { useSignup } from '../../hooks/useSignup'
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom"


const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const{signup, error, isLoading} = useSignup()

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        await signup(name,email,password).then((res)=>{
            toast.success('Account Created Successfully!')
            navigate('/login')
        })
    }

    return(
        <>
        <NavBar/>
        <h1 className='has-text-centered mt-5 has-text-weight-bold is-size-1 mb-5 has-text-info'>SignUp</h1>
        <div className='container'>
        <div className="columns is-centered">
        <div className="column is-half">
        <form className='signup mt-5' onSubmit={handleSubmit} >
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input type="text" className='input' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Username' required/>
                </div>
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input type="email" className='input' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email' required/>
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input type="password" className='input' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' required/>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button disabled={isLoading} type="submit" className="button is-success is-pulled-right is-rounded has-text-weight-medium">SignUp</button>
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

export default Signup