import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import MainNavigation from "./components/MainNavigation";
import EditRecipe from "./pages/EditRecipe";
import Favourites from "./pages/Favourites";
import About from "./pages/About";
import ViewRecipe from "./pages/ViewRecipe"; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
      setUser(username);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <MainNavigation 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout} 
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/add-recipe" element={isLoggedIn ? <AddRecipe /> : <Navigate to="/login" />} />
          <Route path="/edit-recipe/:id" element={isLoggedIn ? <EditRecipe /> : <Navigate to="/login" />} />
          <Route path="/view-recipe/:id" element={<ViewRecipe />} /> {/* Add this route */}
          <Route path="/favourites" element={isLoggedIn ? <Favourites /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;