import {React, useState} from "react"
import { Link } from "react-router-dom"

const Navbar = () =>{
  
    return(
        <nav className="navbar" style={{backgroundColor:'#d5d5d5'}} role="navigation" aria-label="main navigation">
             <div className="navbar-menu">
                <a className="navbar-start ml-5" href="/">
                <img src={require('../Admin/logo.png')} width="80" />
                <h1 className="is-size-2 has-text-weight-bold mt-2 ml-2" style={{color:'#f2532e'}}>Fel Hanout</h1>
                </a>
                
                    <div className="navbar-item is-pulled-right">
                    <Link to={"/signup"} className="navbar-end button is-rounded is-info is-small mr-5">SIGN UP</Link>
                    <Link to={"/login"} className="navbar-end button is-rounded is-success is-small mr-5">LOGIN</Link>
                    </div>
             
                
            </div>
        </nav>
    )
}

export default Navbar