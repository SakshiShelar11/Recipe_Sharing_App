import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; 
import img2 from '../Images/img2.jpg' 

import Footer from "../components/Footer";

const Register = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/register", { username, email, password });
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    navigate("/home");
  };

  return (
    <>

    <div className="register">

      <div className="imgs">

         <img src={img2} width="100%" alt="register" style={{ width: "100%", height: "100%"}}></img>

         <div className="register_content" style={{backgroundColor:'#F1F1F1', padding:"5rem"}}>

      <h1>Register</h1><br/>
      <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} /><br/>
      <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button><br/>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;
