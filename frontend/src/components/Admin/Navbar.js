import React from "react"
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
        navigate("/")
    }

    return(
        <nav className="navbar"  style={{backgroundColor:'#d5d5d5'}}  role="navigation" aria-label="main navigation">
             <div className="navbar-menu">
                <a className="navbar-start ml-5" href="/dashboard">
                <img src={require('../Admin/logo.png')} width="80" />
                <h1 className="is-size-2 has-text-weight-bold mt-2 ml-2" style={{color:'#f2532e'}}>Admin Panel</h1>
                </a>

                <div className="navbar-item">
                <button className="navbar-end button is-rounded is-info is-small mr-5" onClick={isAdmin}>HomePage</button>
                </div>

                {user && <div className="navbar-item is-pulled-right">
                <span className="mr-3">Welcome Back, Admin</span>
                <button className="navbar-end button is-rounded is-danger is-small" onClick={handleClick}>LOGOUT</button>
                </div>}

            </div>
        </nav>
    )
}

export default Navbar