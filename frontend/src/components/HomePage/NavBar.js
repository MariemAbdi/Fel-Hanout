import {React, useState} from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

const Navbar = () =>{
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const navigate = useNavigate()
    
    const handleClick=()=>{
        logout()
        navigate("/")
    }

    const isAdmin=()=>{
        navigate("/dashboard")
    }
   

    return(
        <nav className="navbar" style={{backgroundColor:'#d5d5d5'}} role="navigation" aria-label="main navigation">
             <div className="navbar-menu">
                <a className="navbar-start ml-5" href="/">
                <img src={require('../Admin/logo.png')} width="80" />
                <h1 className="is-size-2 has-text-weight-bold mt-2 ml-2" style={{color:'#f2532e'}}>Fel Hanout</h1>
                </a>
                
                
                {(user!=null && user.email==="admin@gmail.com") &&
                <div className="navbar-item">
                <button className="navbar-end button is-rounded is-info is-small mr-5" onClick={isAdmin}>DASHBOARD</button>
                </div>}
                


                {!user && (
                    <div className="navbar-item is-pulled-right">
                    <Link to={"/signup"} className="navbar-end button is-rounded is-info is-small mr-5">SIGN UP</Link>
                    <Link to={"/login"} className="navbar-end button is-rounded is-success is-small mr-5">LOGIN</Link>
                    </div>
                )}
                
                {user && <div className="navbar-item is-pulled-right">
                {(user!=null && user.email==="admin@gmail.com")?<span className="mr-3">Welcome Back, Admin</span>:<span className="mr-3">Welcome Back, {user.email}</span>}
                <button className="navbar-end button is-rounded is-danger is-small" onClick={handleClick}>LOGOUT</button>
                </div>}

            </div>
        </nav>
    )
}

export default Navbar