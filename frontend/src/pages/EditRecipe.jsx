import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: '',
        file: null
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                await axios.get(`http://localhost:5000/recipe/${id}`)
                    .then(response => {
                        let res = response.data;
                        setRecipeData({
                            title: res.title,
                            ingredients: res.ingredients.join(","),
                            instructions: res.instructions,
                            time: res.time,
                            file: null
                        });
                    });
            } catch (error) {
                console.error("Error fetching recipe:", error);
                alert("Failed to load recipe");
            }
        };
        getData();
    }, [id]); // Added id as dependency

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value : 
                 (e.target.name === "file") ? e.target.files[0] : e.target.value;
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', recipeData.title);
        formData.append('ingredients', recipeData.ingredients);
        formData.append('instructions', recipeData.instructions);
        formData.append('time', recipeData.time);
        if (recipeData.file) {
            formData.append('file', recipeData.file);
        }

        try {
            await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            navigate("/");
        } catch (error) {
            console.error("Error updating recipe:", error);
            alert("Failed to update recipe");
        }
    };

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
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
                        <label>Time (minutes)</label>
                        <input 
                            type="number" 
                            className='input' 
                            name="time" 
                            onChange={onHandleChange} 
                            value={recipeData.time}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Ingredients (comma separated)</label>
                        <textarea 
                            className='input-textarea' 
                            name="ingredients" 
                            rows="5" 
                            onChange={onHandleChange} 
                            value={recipeData.ingredients}
                            placeholder="Enter ingredients separated by commas"
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea 
                            className='input-textarea' 
                            name="instructions" 
                            rows="5" 
                            onChange={onHandleChange} 
                            value={recipeData.instructions}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image (leave empty to keep current)</label>
                        <input 
                            type="file" 
                            className='input' 
                            name="file" 
                            onChange={onHandleChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit">Update Recipe</button>
                </form>
            </div>
            <Footer/>
        </>
    );
}