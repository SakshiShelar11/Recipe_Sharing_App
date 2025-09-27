import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import img2 from '../Images/img2.jpg';
import Footer from '../components/Footer';

export default function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post("http://localhost:5000/login", formData);
            onLogin(res.data.username); 
            navigate("/home");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="auth-container">
                <div className="auth-image-section">
                    <img src={img2} alt="Cooking" />
                    <div className="auth-overlay">
                        <h2>Welcome Back!</h2>
                        <p>Sign in to continue sharing your culinary creations</p>
                    </div>
                </div>
                
                <div className="auth-form-section">
                    <div className="auth-form-container">
                        <h1>Sign In</h1>
                        <p className="auth-subtitle">Enter your credentials to access your account</p>
                        
                        {error && <div className="error-message">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                            
                            <button type="submit" disabled={loading} className="auth-button">
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                        
                        <p className="auth-switch">
                            Don't have an account? <Link to="/register">Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}