import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BsStopwatchFill, BsArrowLeft } from 'react-icons/bs';
import { FaHeart, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Footer from '../components/Footer';
import './ViewRecipe.css';

export default function ViewRecipe() {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipe/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setError('Recipe not found');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await axios.delete(`http://localhost:5000/recipe/${id}`);
                navigate('/home');
            } catch (error) {
                console.error('Error deleting recipe:', error);
                alert('Failed to delete recipe');
            }
        }
    };

    const favRecipes = (recipe) => {
        let favRecipe = JSON.parse(localStorage.getItem("fav")) || [];
        const isAlreadyFav = favRecipe.some(fav => fav._id === recipe._id);
        
        let updatedFavRecipes;
        if (isAlreadyFav) {
            updatedFavRecipes = favRecipe.filter(fav => fav._id !== recipe._id);
        } else {
            updatedFavRecipes = [...favRecipe, recipe];
        }
        
        localStorage.setItem("fav", JSON.stringify(updatedFavRecipes));
        // Refresh the page to update the heart icon
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="view-recipe-container">
                <div className="loading">Loading recipe...</div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="view-recipe-container">
                <div className="error-message">
                    <h2>{error || 'Recipe not found'}</h2>
                    <Link to="/home" className="back-button">
                        <BsArrowLeft /> Back to Recipes
                    </Link>
                </div>
            </div>
        );
    }

    const isFavourite = () => {
        const favRecipe = JSON.parse(localStorage.getItem("fav")) || [];
        return favRecipe.some(fav => fav._id === recipe._id);
    };

    return (
        <>
            <div className="view-recipe-container">
                <div className="recipe-header">
                    <Link to="/home" className="back-button">
                        <BsArrowLeft /> Back to Recipes
                    </Link>
                    
                    <div className="recipe-actions">
                        <button 
                            className={`favorite-btn ${isFavourite() ? 'active' : ''}`}
                            onClick={() => favRecipes(recipe)}
                        >
                            <FaHeart /> {isFavourite() ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                        
                        <Link to={`/edit-recipe/${recipe._id}`} className="edit-btn">
                            <FaEdit /> Edit Recipe
                        </Link>
                        
                        <button className="delete-btn" onClick={onDelete}>
                            <MdDelete /> Delete Recipe
                        </button>
                    </div>
                </div>

                <div className="recipe-content">
                    <div className="recipe-image-section">
                        <img 
                            src={`http://localhost:5000/images/${recipe.coverImage}`} 
                            alt={recipe.title}
                            className="recipe-image"
                        />
                    </div>

                    <div className="recipe-details">
                        <h1 className="recipe-title">{recipe.title}</h1>
                        
                        <div className="recipe-meta">
                            <div className="cooking-time">
                                <BsStopwatchFill />
                                <span>{recipe.time} minutes</span>
                            </div>
                            <div className="created-date">
                                Added on: {new Date(recipe.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="ingredients-section">
                            <h2>Ingredients</h2>
                            <ul className="ingredients-list">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="ingredient-item">
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="instructions-section">
                            <h2>Instructions</h2>
                            <div className="instructions-content">
                                {recipe.instructions.split('\n').map((paragraph, index) => (
                                    paragraph.trim() && (
                                        <p key={index} className="instruction-step">
                                            {paragraph}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}