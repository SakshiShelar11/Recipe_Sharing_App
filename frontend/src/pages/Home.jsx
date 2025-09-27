import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeItems from '../components/RecipeItems';
import SearchBar from '../components/SearchBar';
import './Home.css';
import heroImage from '../Images/img.jpg';

export default function Home({ isLoggedIn }) {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:5000/recipe");
                setRecipes(response.data);
                setFilteredRecipes(response.data);
            } catch (error) {
                setError("Failed to load recipes. Please try again later.");
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredRecipes(recipes);
            return;
        }

        const filtered = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredRecipes(filtered);
    };

    if (loading) {
        return <div className="loading">Loading recipes...</div>;
    }

    return (
        <>
            <section className="hero-section">
                <div className="hero-image-container">
                    <img src={heroImage} alt="Delicious Food" className="hero-image" />
                    <div className="hero-content">
                        <h1 className="hero-title">Kitchen Tales</h1>
                        <div className="hero-divider"></div>
                        <h2 className="hero-subtitle">A Recipe Sharing Community</h2>
                        <p className="hero-tagline">Better than any expensive cookbook</p>
                        <p className="hero-description">
                            Discover amazing recipes, share your culinary creations, and join a community 
                            of food lovers. Find recipes for every season, mood, and occasion.
                        </p>
                        {isLoggedIn ? (
                            <Link to="/add-recipe" className="cta-button">
                                Share Your Recipe
                            </Link>
                        ) : (
                            <Link to="/register" className="cta-button">
                                Join Our Community
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            <section className="recipes-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Recipes</h2>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    {filteredRecipes.length === 0 ? (
                        <div className="no-recipes">
                            <p>No recipes found. Try a different search term or be the first to share a recipe!</p>
                        </div>
                    ) : (
                        <RecipeItems recipes={filteredRecipes} />
                    )}
                </div>
            </section>
        </>
    );
}