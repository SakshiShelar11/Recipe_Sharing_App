import React from 'react'
import { BsStopwatchFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const RecipeItems = ({ recipes }) => {
    let favRecipe = JSON.parse(localStorage.getItem("fav")) || []
    const navigate = useNavigate()

    const onDelete = async (id, e) => {
        e.stopPropagation() // Prevent card click when deleting
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await axios.delete(`http://localhost:5000/recipe/${id}`)
                window.location.reload()
            } catch (error) {
                console.error("Error deleting recipe:", error)
                alert("Failed to delete recipe")
            }
        }
    }

    const favRecipes = (recipe, e) => {
        e.stopPropagation() // Prevent card click when favoriting
        const isAlreadyFav = favRecipe.some(fav => fav._id === recipe._id)
        let updatedFavRecipes
        
        if (isAlreadyFav) {
            updatedFavRecipes = favRecipe.filter(fav => fav._id !== recipe._id)
        } else {
            updatedFavRecipes = [...favRecipe, recipe]
        }
        
        localStorage.setItem("fav", JSON.stringify(updatedFavRecipes))
        window.location.reload()
    }

    const handleCardClick = (recipeId) => {
        navigate(`/view-recipe/${recipeId}`)
    }

    return (
        <div className='card-container'>
            {recipes.map((recipe) => (
                <div 
                    key={recipe._id} 
                    className='card recipe-card'
                    onClick={() => handleCardClick(recipe._id)}
                >
                    <img 
                        src={`http://localhost:5000/images/${recipe.coverImage}`} 
                        width="207px" 
                        height="150px" 
                        alt={recipe.title} 
                        style={{objectFit: 'cover'}}
                    />
                    <div className='card-body'>
                        <div className='title'>{recipe.title}</div>
                        <div className='icons'>
                            <div className='timer'>
                                <BsStopwatchFill />{recipe.time}
                            </div>
                            <FaHeart 
                                onClick={(e) => favRecipes(recipe, e)} 
                                style={{ 
                                    color: favRecipe.some(fav => fav._id === recipe._id) ? "red" : "gray",
                                    cursor: 'pointer'
                                }} 
                            />
                            <div className='action'>
                                <Link to={`/edit-recipe/${recipe._id}`} className="editIcon" onClick={(e) => e.stopPropagation()}>
                                    <FaEdit/>
                                </Link>
                                <MdDelete 
                                    onClick={(e) => onDelete(recipe._id, e)} 
                                    className='deleteIcon' 
                                    style={{cursor: 'pointer'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecipeItems