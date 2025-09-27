import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ isLoggedIn, user, onLogout }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout(); // Call the logout function from props
        navigate('/home');
    }

    return (
        <>
            {/* Header Section */}
            <header>
                <h1>Kitchen Tales</h1>
            </header>

            {/* Navbar Section */}
            <div className="navbar navbar-dark bg-dark nav justify-content-center">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to="/favourites">Favourites</Link>
                    </li>
                </ul>
                
                <div className="nav-auth">
                    {isLoggedIn ? (
                        <div className="nav-user">
                            <span className="nav-welcome">Welcome, {user}!</span>
                            <button className="nav-link custom-link logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="nav-guest">
                            <Link to="/login" className="nav-link custom-link">Login</Link>
                            <Link to="/register" className="nav-link custom-link">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}