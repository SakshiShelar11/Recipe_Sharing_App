import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Auth.css';

export default function AddRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: '',
        file: null
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value, files } = e.target;
        let val = name === "file" ? files[0] : value;
        setRecipeData(pre => ({ ...pre, [name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('title', recipeData.title);
            formData.append('ingredients', recipeData.ingredients);
            formData.append('instructions', recipeData.instructions);
            formData.append('time', recipeData.time);
            if (recipeData.file) {
                formData.append('file', recipeData.file);
            }

            console.log('Submitting recipe:', recipeData);

            await axios.post("http://localhost:5000/recipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            navigate("/home");
        } catch (error) {
            console.error('Error adding recipe:', error);
            setError(error.response?.data?.message || "Failed to add recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <h2>Add New Recipe</h2>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className='form-control'>
                        <label>Recipe Title *</label>
                        <input 
                            type="text" 
                            className='input' 
                            name="title" 
                            onChange={onHandleChange}
                            value={recipeData.title}
                            required 
                        />
                    </div>
                    
                    <div className='form-control'>
                        <label>Cooking Time (minutes)</label>
                        <input 
                            type="number" 
                            className='input' 
                            name="time" 
                            onChange={onHandleChange}
                            value={recipeData.time}
                            placeholder="e.g., 30" 
                        />
                    </div>
                    
                    <div className='form-control'>
                        <label>Ingredients *</label>
                        <textarea 
                            className='input-textarea' 
                            name="ingredients" 
                            rows="5" 
                            onChange={onHandleChange}
                            value={recipeData.ingredients}
                            placeholder="Enter ingredients separated by commas (e.g., flour, sugar, eggs)"
                            required
                        />
                    </div>
                    
                    <div className='form-control'>
                        <label>Instructions *</label>
                        <textarea 
                            className='input-textarea' 
                            name="instructions" 
                            rows="5" 
                            onChange={onHandleChange}
                            value={recipeData.instructions}
                            placeholder="Enter step-by-step instructions"
                            required
                        />
                    </div>
                    
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input 
                            type="file" 
                            className='input' 
                            name="file" 
                            onChange={onHandleChange}
                            accept="image/*"
                        />
                    </div>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding Recipe...' : 'Add Recipe'}
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    );
}