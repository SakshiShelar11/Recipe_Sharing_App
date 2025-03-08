import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import RecipeItems from "./components/RecipeItems";
import AddRecipe from "./pages/AddRecipe"
import MainNavigation from "./components/MainNavigation";
// import { getRecipes } from "./api/getRecipes";
import './App.css'
import EditRecipe from "./pages/EditRecipe";
import Favourites from "./pages/Favourites";

import About from "./pages/About";
// import axios from "axios";




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);
  

  return (
    <Router>
      <MainNavigation setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <Routes>

      <Route path="/" element={<Navigate to="/home" /> }/>
        
        <Route path="/home" element={<Home /> } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/AddRecipe" element={<AddRecipe setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/EditRecipe/:id" element={<EditRecipe setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/Favourites" element={<Favourites setIsLoggedIn={setIsLoggedIn}/>} />
        
        <Route path="/About" element={<About />} />
        
      </Routes>
    </Router>
  );
}

export default App;
     