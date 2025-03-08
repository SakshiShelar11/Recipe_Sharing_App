import React, {useState} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import '../App.css'
import Footer from '../components/Footer';
import img2 from '../Images/img2.jpg';

export default function Login({setIsLoggedIn}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const res = await axios.post("http://localhost:5000/login", { email, password });
          localStorage.setItem("username", res.data.username);
          setIsLoggedIn(true);
          navigate("/home");
        } catch (error) {
          alert("Invalid Credentials");
        }
    }

  return (
    <>
    <div class="login" >
    
      <div class="img">
       
       <img src={img2} width="100%" alt="login" style={{ width: "100%", height: "100%"}} ></img>

        <div class="content" style={{backgroundColor:'#F1F1F1', padding:"5rem"}}>
          
          <h1>Login</h1><br/>
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} /><br/>
          <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} /><br/>
          <button onClick={handleLogin}>Login</button><br/>
          <p>New user? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
    
    
    <Footer/>
    </>
  )
}

