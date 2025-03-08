// Navbar.jsx
import React from 'react'
// import { useState } from 'react'
// import Login from '../pages/Login'
// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



export default function Navbar({setIsLoggedIn}) {

  const [isLoggedIn, setIsLoggedInState] = useState(false);
    const navigate = useNavigate();
   

    // Check if user is logged in when component mounts
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setIsLoggedInState(true); // User is logged in
        } else {
            setIsLoggedInState(false); // User is not logged in
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username'); // Remove username from localStorage
        setIsLoggedInState(false); // Set logged-in state to false
        setIsLoggedIn(false); // Update the parent state (logged in status)
        navigate('/login'); // Redirect to login page
    };
    

  return (
    <>
    
    {/* Header Section */}

    <header>
        <h1>Kitchen Tales</h1>
    </header>

    {/* Navbar Section */}

    
    <div class="navbar navbar-dark bg-dark nav justify-content-center">
        <ul class="nav justify-content-center">
            <li class="nav-item ">
            <a class="nav-link custom-link" href="/home">Home</a>
            </li>
            <li class="nav-item ">
            <a class="nav-link custom-link" href="/About">About</a>
            </li>
            {/* <li class="nav-item">
            <a class="nav-link custom-link" href="/MyRecipe">My Recipe</a>
            </li> */}
            <li class="nav-item">
            <a class="nav-link custom-link" href="/favourites">Favourites</a>
            </li>
            
            
        </ul>
        {/* <a class="nav-link custom-link" href="/login">Login</a><a class="nav-link custom-link" href="/register">Register</a> */}
        
        {isLoggedIn ? (
                    <button className="nav-link custom-link" onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login" className="nav-link custom-link">Login</Link>
                        <Link to="/register" className="nav-link custom-link">Register</Link>
                     </>
                 )}
    </div>
    
    </>
  )
}
